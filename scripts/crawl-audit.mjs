#!/usr/bin/env node
// Audit gratuit de crawlabilite/indexabilite du site prerendere, a executer
// APRES `npm run build` (qui declenche deja `node prerender.mjs` via
// postbuild -- donc dist/ est deja pret quand ce script tourne).
//
// Objectif : verifier automatiquement, sans aucun outil payant (l'equivalent
// gratuit d'un crawl Screaming Frog/Sitebulb taille sur mesure pour ce site),
// que les 743 pages generees dans dist/ ont un <title>/<meta
// description>/canonical/OG corrects, coherents entre elles (pas de doublon)
// et coherents avec les 5 sitemaps + robots.txt.
//
// C'est exactement la classe de bug qui touchait /merci et /partenaires
// avant leur correction dans prerender.mjs : elles heritaient silencieusement
// les balises de la page d'accueil (meme titre, meme description, meme
// canonical que /), sans qu'aucun test ne le detecte. Ce script existe pour
// qu'un futur bug similaire (nouvelle page oubliee, config manquante, regex
// cassee) soit visible immediatement au lieu d'attendre un rapport Search
// Console des semaines plus tard.
//
// Perimetre volontairement limite au <head> : ce site ne prerend que le
// <head> (voir prerender.mjs), pas le contenu de la page -- le <body> de
// chaque fichier dist/**/index.html est toujours le meme <div id="root">
// vide, rempli plus tard cote client par React. Auditer le corps (H1, texte,
// liens internes, images) n'aurait donc aucun sens sur ces fichiers et ne
// donnerait que des faux positifs ; ce serait a faire cote site en ligne
// (hors scope ici, mais une piste pour un futur script complementaire).
//
// Usage :
//   npm run build && node scripts/crawl-audit.mjs
//   (ou : npm run audit:crawl, qui fait les deux)
//
// Gratuit, zero dependance npm (fs/path/url standard uniquement). Pense pour
// tourner en CI : code de sortie 1 si un vrai probleme est trouve, 0 si tout
// est propre ou seulement des avertissements. Contrairement a prerender.mjs,
// ce script N'EST PAS appele par postbuild -- c'est un controle a part,
// jamais un bloqueur silencieux du build/deploy.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DIST_DIR = path.join(ROOT, 'dist');
const SITE_BASE_URL = 'https://daliaprovence.vercel.app';
const SERVICES = ['debroussaillage', 'elagage', 'terrassement', 'nettoyage-toiture', 'restanques'];

// Pages volontairement hors sitemap (voir prerender.mjs / STATIC_PAGE_CONFIG).
const EXCLUDED_FROM_SITEMAP = new Set(['/merci']);

const errors = [];
const warnings = [];
const fail = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);

// ---------------------------------------------------------------------------
// 1. Charger les URLs attendues depuis les sitemaps (verite terrain de ce qui
//    DOIT etre indexable, generee par generate-sitemap.js).
// ---------------------------------------------------------------------------
function loadSitemapUrls() {
  const urls = new Set();
  for (const service of SERVICES) {
    const file = path.join(DIST_DIR, `sitemap-${service}.xml`);
    if (!fs.existsSync(file)) {
      fail(`sitemap-${service}.xml est introuvable dans dist/ (as-tu lance "npm run sitemap" au moins une fois ? le fichier vit dans public/ et est copie tel quel par vite build).`);
      continue;
    }
    const xml = fs.readFileSync(file, 'utf-8');
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.add(m[1]);
  }
  return urls;
}

// ---------------------------------------------------------------------------
// 2. Lister les pages reellement generees par prerender.mjs (parcours de
//    dist/, inverse de outputPathFor() dans prerender.mjs).
// ---------------------------------------------------------------------------
function loadGeneratedRoutes() {
  const routes = [];
  function walk(dir, routePrefix) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), `${routePrefix}/${entry.name}`);
      } else if (entry.name === 'index.html') {
        routes.push(routePrefix === '' ? '/' : routePrefix);
      }
    }
  }
  walk(DIST_DIR, '');
  return routes;
}

function routeToUrl(route) {
  // Convention utilisee partout ailleurs dans le projet (og:url de la home
  // dans index.html, <loc> de generate-sitemap.js) : la home garde son slash
  // final, contrairement aux autres routes qui n'en ont pas.
  return route === '/' ? `${SITE_BASE_URL}/` : `${SITE_BASE_URL}${route}`;
}

// Decode les quelques entites HTML que escapeHtml()/escapeAttr() de
// prerender.mjs peuvent produire, pour mesurer la longueur "affichee" reelle
// d'un titre/description plutot que la longueur du HTML brut (ex: "&amp;"
// compte pour 5 caracteres alors qu'il n'en affiche qu'un seul).
function decodeBasicEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

// ---------------------------------------------------------------------------
// 3. Extraction par regex -- coherent avec le style de prerender.mjs, pas de
//    parseur HTML pour rester a zero dependance.
// ---------------------------------------------------------------------------
function extractAttr(html, regex) {
  const m = html.match(regex);
  return m ? m[1] : null;
}

function auditPage(route) {
  const filePath = route === '/' ? path.join(DIST_DIR, 'index.html') : path.join(DIST_DIR, route.replace(/^\//, ''), 'index.html');
  const html = fs.readFileSync(filePath, 'utf-8');
  const expectedCanonical = routeToUrl(route);

  const title = extractAttr(html, /<title>([\s\S]*?)<\/title>/);
  const description = extractAttr(html, /<meta\s+name="description"\s+content="([^"]*)"/);
  const canonical = extractAttr(html, /<link\s+rel="canonical"\s+href="([^"]*)"/);
  const robots = extractAttr(html, /<meta\s+name="robots"\s+content="([^"]*)"/);
  const ogTitle = extractAttr(html, /<meta\s+property="og:title"\s+content="([^"]*)"/);
  const ogDescription = extractAttr(html, /<meta\s+property="og:description"\s+content="([^"]*)"/);
  const jsonLdRaw = extractAttr(html, /<script\s+id="seo-schema-jsonld"[^>]*>([\s\S]*?)<\/script>/);

  if (!title) fail(`${route} : aucun <title> trouve.`);
  else {
    const visibleLength = decodeBasicEntities(title).length;
    if (visibleLength < 10 || visibleLength > 70) warn(`${route} : titre de longueur inhabituelle (${visibleLength} caracteres) -- "${title}"`);
  }

  if (!description) fail(`${route} : aucune <meta name="description"> trouvee.`);
  else {
    const visibleLength = decodeBasicEntities(description).length;
    if (visibleLength < 50 || visibleLength > 165) warn(`${route} : description de longueur inhabituelle (${visibleLength} caracteres).`);
  }

  if (!canonical) fail(`${route} : aucun <link rel="canonical"> trouve.`);
  else if (canonical !== expectedCanonical) fail(`${route} : canonical = "${canonical}" au lieu de "${expectedCanonical}" attendu.`);

  if (!ogTitle) warn(`${route} : og:title manquant.`);
  if (!ogDescription) warn(`${route} : og:description manquant.`);

  if (jsonLdRaw) {
    try {
      JSON.parse(jsonLdRaw);
    } catch (e) {
      fail(`${route} : JSON-LD invalide (${e.message}).`);
    }
  }

  return { route, title, description, canonical, robots };
}

// ---------------------------------------------------------------------------
function findDuplicates(pages, key) {
  const seen = new Map();
  for (const page of pages) {
    const value = page[key];
    if (!value) continue;
    if (!seen.has(value)) seen.set(value, []);
    seen.get(value).push(page.route);
  }
  for (const [value, routesForValue] of seen) {
    if (routesForValue.length > 1) {
      const sample = routesForValue.slice(0, 5).join(', ');
      const more = routesForValue.length > 5 ? `, +${routesForValue.length - 5} autres` : '';
      fail(`${key} en double sur ${routesForValue.length} pages ("${value}") : ${sample}${more}`);
    }
  }
}

function auditRobotsTxt() {
  const robotsPath = path.join(DIST_DIR, 'robots.txt');
  if (!fs.existsSync(robotsPath)) {
    fail('robots.txt est introuvable dans dist/.');
    return;
  }
  const robotsTxt = fs.readFileSync(robotsPath, 'utf-8');
  if (/^Disallow:\s*\/\s*$/m.test(robotsTxt)) {
    fail('robots.txt contient "Disallow: /" -- bloque le crawl de tout le site.');
  }
  if (!/Sitemap:/i.test(robotsTxt)) {
    warn('robots.txt ne reference aucun "Sitemap:".');
  }
}

function writeReport({ pages, sitemapUrls }) {
  const today = new Date().toISOString().split('T')[0];
  const lines = [
    `# Audit de crawl -- ${today}`,
    '',
    `${pages.length} pages auditees, ${sitemapUrls.size} URLs dans les sitemaps.`,
    '',
    `**${errors.length} probleme(s) bloquant(s)**, ${warnings.length} avertissement(s).`,
    '',
  ];
  if (errors.length) {
    lines.push('## Problemes', '');
    for (const e of errors) lines.push(`- ${e}`);
    lines.push('');
  }
  if (warnings.length) {
    lines.push('## Avertissements', '');
    for (const w of warnings) lines.push(`- ${w}`);
    lines.push('');
  }
  if (!errors.length && !warnings.length) {
    lines.push('Tout est propre.', '');
  }
  const content = lines.join('\n');
  const reportDir = path.join(ROOT, 'reports', 'crawl-audit');
  fs.mkdirSync(reportDir, { recursive: true });
  fs.writeFileSync(path.join(reportDir, 'latest.md'), content);
  fs.writeFileSync(path.join(reportDir, `${today}.md`), content);
}

function main() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error('dist/ introuvable -- lance `npm run build` avant cet audit.');
    process.exitCode = 1;
    return;
  }

  const sitemapUrls = loadSitemapUrls();
  const routes = loadGeneratedRoutes();
  console.log(`Audit de ${routes.length} pages generees, ${sitemapUrls.size} URLs attendues dans les sitemaps...\n`);

  const pages = routes.map(auditPage);

  // --- Coherence sitemaps <-> fichiers generes ------------------------------
  const routeUrls = new Set(routes.map(routeToUrl));
  for (const url of sitemapUrls) {
    if (!routeUrls.has(url)) {
      fail(`Le sitemap reference ${url} mais aucun fichier dist/ correspondant n'existe (lien mort depuis le sitemap).`);
    }
  }
  for (const route of routes) {
    if (!sitemapUrls.has(routeToUrl(route)) && !EXCLUDED_FROM_SITEMAP.has(route)) {
      warn(`${route} existe dans dist/ mais n'est dans aucun sitemap (oubli involontaire dans generate-sitemap.js ?).`);
    }
  }

  // --- Coherence noindex <-> sitemap ----------------------------------------
  for (const page of pages) {
    const isNoindex = page.robots && page.robots.includes('noindex');
    if (isNoindex && sitemapUrls.has(routeToUrl(page.route))) {
      fail(`${page.route} est en noindex MAIS presente dans un sitemap -- contradiction (retire-la du sitemap ou retire le noindex).`);
    }
  }

  // --- Doublons (title / description / canonical) --------------------------
  findDuplicates(pages, 'title');
  findDuplicates(pages, 'description');
  findDuplicates(pages, 'canonical');

  // --- robots.txt ------------------------------------------------------------
  auditRobotsTxt();

  // --- Rapport console -------------------------------------------------------
  console.log(`${pages.length} pages auditees.`);
  console.log(`${errors.length} probleme(s) bloquant(s), ${warnings.length} avertissement(s).\n`);
  if (errors.length) {
    console.log('PROBLEMES :');
    for (const e of errors) console.log(`  x ${e}`);
    console.log('');
  }
  if (warnings.length) {
    console.log('AVERTISSEMENTS :');
    for (const w of warnings.slice(0, 30)) console.log(`  ! ${w}`);
    if (warnings.length > 30) console.log(`  ... et ${warnings.length - 30} de plus (voir reports/crawl-audit/latest.md).`);
    console.log('');
  }
  if (!errors.length && !warnings.length) console.log('Tout est propre.');

  writeReport({ pages, sitemapUrls });

  if (errors.length) process.exitCode = 1;
}

main();
