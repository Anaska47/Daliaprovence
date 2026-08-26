// scripts/seo-report.mjs
//
// Rapport SEO hebdomadaire gratuit pour Dalia Provence, sans Supermetrics.
//
// Recupere directement via les API officielles Google (gratuites, dans les
// limites larges du forfait gratuit pour un site de cette taille) :
//   - Search Console : clics/impressions/position/pages/requetes (7j + 28j)
//   - Search Console : statut d'indexation d'un echantillon d'URLs (rotation
//     hebdomadaire, car l'API d'inspection est limitee en volume/jour)
//   - Google Analytics 4 (Data API) : trafic, canaux, pages, evenements (7j + 28j)
//
// Authentification : un compte de service Google (voir docs/SETUP-GOOGLE-API.md).
// La cle peut arriver de 2 facons :
//   - GSC_GA4_SERVICE_ACCOUNT_KEY : le contenu JSON complet de la cle (utilise
//     par le workflow GitHub Actions, stocke comme secret chiffre)
//   - GOOGLE_APPLICATION_CREDENTIALS : chemin vers le fichier .json (pratique
//     pour un test en local)
//
// Sortie : reports/seo/<YYYY-MM-DD>.md + reports/seo/latest.md (copie stable).
// Google My Business n'a pas d'API gratuite equivalente (acces sur demande
// approuvee par Google) -> volontairement absent de ce rapport, cf. le
// paragraphe de rappel en fin de fichier genere.

import { google } from 'googleapis';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const REPORTS_DIR = path.join(ROOT_DIR, 'reports', 'seo');
const LOCATIONS_PATH = path.join(ROOT_DIR, 'src', 'data', 'locations.json');

const SERVICES = ['debroussaillage', 'elagage', 'terrassement', 'nettoyage-toiture', 'restanques'];
const SITE_BASE_URL = process.env.SITE_BASE_URL || 'https://daliaprovence.vercel.app';
const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID || '551438256';
const URL_INSPECTION_SAMPLE_SIZE = 25;

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

function loadCredentials() {
  const raw = process.env.GSC_GA4_SERVICE_ACCOUNT_KEY;
  if (raw && raw.trim()) {
    try {
      return JSON.parse(raw);
    } catch (err) {
      throw new Error(`GSC_GA4_SERVICE_ACCOUNT_KEY n'est pas un JSON valide : ${err.message}`);
    }
  }
  const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (keyPath && fs.existsSync(keyPath)) {
    return JSON.parse(fs.readFileSync(keyPath, 'utf-8'));
  }
  throw new Error(
    "Aucun identifiant trouve. Definis GSC_GA4_SERVICE_ACCOUNT_KEY (contenu JSON) ou GOOGLE_APPLICATION_CREDENTIALS (chemin vers le fichier .json). Voir docs/SETUP-GOOGLE-API.md."
  );
}

// ---------------------------------------------------------------------------
// Helpers generaux
// ---------------------------------------------------------------------------

function fmtDate(d) {
  return d.toISOString().slice(0, 10);
}

function addDays(date, days) {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

function isoWeekNumber(date) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

function loadLocations() {
  const raw = fs.readFileSync(LOCATIONS_PATH, 'utf-8');
  return JSON.parse(raw);
}

function buildAllCityServiceUrls() {
  const locations = loadLocations();
  const urls = [];
  for (const service of SERVICES) {
    for (const loc of locations) {
      urls.push(`${SITE_BASE_URL}/${service}/${loc.slug}`);
    }
  }
  return urls;
}

function pickWeeklySample(allUrls, sampleSize, weekNumber) {
  if (allUrls.length <= sampleSize) return allUrls;
  const start = (weekNumber * sampleSize) % allUrls.length;
  const sample = [];
  for (let i = 0; i < sampleSize; i++) {
    sample.push(allUrls[(start + i) % allUrls.length]);
  }
  return sample;
}

function fmtNum(n) {
  if (n === undefined || n === null || Number.isNaN(n)) return 'n/a';
  return new Intl.NumberFormat('fr-FR').format(n);
}

function fmtPct(n) {
  if (n === undefined || n === null || Number.isNaN(n)) return 'n/a';
  return `${(n * 100).toFixed(2)} %`;
}

function fmtPos(n) {
  if (n === undefined || n === null || Number.isNaN(n)) return 'n/a';
  return n.toFixed(1);
}

// ---------------------------------------------------------------------------
// Search Console
// ---------------------------------------------------------------------------

async function resolveSiteUrl(searchconsole) {
  if (process.env.GSC_SITE_URL) return process.env.GSC_SITE_URL;
  const { data } = await searchconsole.sites.list();
  const sites = data.siteEntry || [];
  const match = sites.find((s) => s.siteUrl.includes('daliaprovence'));
  if (!match) {
    const available = sites.map((s) => s.siteUrl).join(', ') || '(aucune propriete visible par ce compte de service)';
    throw new Error(
      `Aucune propriete Search Console ne correspond a "daliaprovence" parmi : ${available}. Verifie l'etape 5 de docs/SETUP-GOOGLE-API.md (le compte de service doit etre ajoute comme utilisateur sur la bonne propriete).`
    );
  }
  return match.siteUrl;
}

async function querySearchAnalytics(searchconsole, siteUrl, { startDate, endDate, dimensions, rowLimit }) {
  const { data } = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: { startDate, endDate, dimensions, rowLimit: rowLimit || 1000 },
  });
  return data.rows || [];
}

async function getSearchConsoleSection(searchconsole, siteUrl, days) {
  const end = addDays(new Date(), -3); // la donnee GSC a ~2-3 jours de latence
  const start = addDays(end, -(days - 1));
  const startDate = fmtDate(start);
  const endDate = fmtDate(end);

  const [totalsRows, queryRows, pageRows] = await Promise.all([
    querySearchAnalytics(searchconsole, siteUrl, { startDate, endDate, dimensions: [] }),
    querySearchAnalytics(searchconsole, siteUrl, { startDate, endDate, dimensions: ['query'], rowLimit: 10 }),
    querySearchAnalytics(searchconsole, siteUrl, { startDate, endDate, dimensions: ['page'], rowLimit: 10 }),
  ]);

  const totals = totalsRows[0] || {};
  return {
    startDate,
    endDate,
    totals: {
      clicks: totals.clicks || 0,
      impressions: totals.impressions || 0,
      ctr: totals.ctr,
      position: totals.position,
    },
    topQueries: queryRows.map((r) => ({ query: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position })),
    topPages: pageRows.map((r) => ({ page: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position })),
  };
}

async function inspectUrlSample(searchconsole, siteUrl, weekNumber) {
  const hubUrls = ['/', ...SERVICES.map((s) => `/${s}`)].map((p) => `${SITE_BASE_URL}${p}`);
  const allCityUrls = buildAllCityServiceUrls();
  const citySample = pickWeeklySample(allCityUrls, URL_INSPECTION_SAMPLE_SIZE, weekNumber);
  const urlsToCheck = [...hubUrls, ...citySample];

  const results = [];
  for (const url of urlsToCheck) {
    try {
      const { data } = await searchconsole.urlInspection.index.inspect({
        requestBody: { inspectionUrl: url, siteUrl },
      });
      const verdict = data.inspectionResult?.indexStatusResult?.verdict || 'INCONNU';
      const coverageState = data.inspectionResult?.indexStatusResult?.coverageState || '';
      results.push({ url, verdict, coverageState });
    } catch (err) {
      results.push({ url, verdict: 'ERREUR', coverageState: String(err.message || err).split('\n')[0] });
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// Google Analytics 4
// ---------------------------------------------------------------------------

async function getGa4Section(analyticsClient, propertyId, period) {
  const property = `properties/${propertyId}`;
  const dateRanges = [{ startDate: period, endDate: 'today' }];

  const [totalsResp] = await analyticsClient.runReport({
    property,
    dateRanges,
    metrics: [
      { name: 'sessions' },
      { name: 'activeUsers' },
      { name: 'screenPageViews' },
      { name: 'conversions' },
    ],
  });

  const [channelResp] = await analyticsClient.runReport({
    property,
    dateRanges,
    dimensions: [{ name: 'sessionDefaultChannelGroup' }],
    metrics: [{ name: 'sessions' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 8,
  });

  const [pageResp] = await analyticsClient.runReport({
    property,
    dateRanges,
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'sessions' }, { name: 'screenPageViews' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 12,
  });

  const [eventResp] = await analyticsClient.runReport({
    property,
    dateRanges,
    dimensions: [{ name: 'eventName' }],
    metrics: [{ name: 'eventCount' }],
    orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
    limit: 15,
  });

  const row = (resp) => resp.rows?.[0];
  const totalsRow = row(totalsResp);
  const dim = (r, i) => r.dimensionValues[i]?.value;
  const met = (r, i) => Number(r.metricValues[i]?.value ?? 0);

  return {
    totals: {
      sessions: totalsRow ? met(totalsRow, 0) : 0,
      activeUsers: totalsRow ? met(totalsRow, 1) : 0,
      pageViews: totalsRow ? met(totalsRow, 2) : 0,
      conversions: totalsRow ? met(totalsRow, 3) : 0,
    },
    channels: (channelResp.rows || []).map((r) => ({ channel: dim(r, 0), sessions: met(r, 0) })),
    topPages: (pageResp.rows || []).map((r) => ({ page: dim(r, 0), sessions: met(r, 0), pageViews: met(r, 1) })),
    topEvents: (eventResp.rows || []).map((r) => ({ event: dim(r, 0), count: met(r, 0) })),
  };
}

// ---------------------------------------------------------------------------
// Rendu Markdown
// ---------------------------------------------------------------------------

function renderSearchConsoleSection(title, section) {
  if (section.error) {
    return `### ${title}\n\n⚠️ Donnees indisponibles : ${section.error}\n`;
  }
  const s = section.data;
  const lines = [];
  lines.push(`### ${title} (${s.startDate} → ${s.endDate})`);
  lines.push('');
  lines.push(`- Clics : **${fmtNum(s.totals.clicks)}**`);
  lines.push(`- Impressions : **${fmtNum(s.totals.impressions)}**`);
  lines.push(`- CTR moyen : **${fmtPct(s.totals.ctr)}**`);
  lines.push(`- Position moyenne : **${fmtPos(s.totals.position)}**`);
  lines.push('');
  lines.push('**Top requêtes :**');
  lines.push('');
  if (s.topQueries.length === 0) {
    lines.push('_(aucune donnée sur cette période)_');
  } else {
    lines.push('| Requête | Clics | Impressions | Position |');
    lines.push('|---|---:|---:|---:|');
    for (const q of s.topQueries) {
      lines.push(`| ${q.query} | ${fmtNum(q.clicks)} | ${fmtNum(q.impressions)} | ${fmtPos(q.position)} |`);
    }
  }
  lines.push('');
  lines.push('**Top pages :**');
  lines.push('');
  if (s.topPages.length === 0) {
    lines.push('_(aucune donnée sur cette période)_');
  } else {
    lines.push('| Page | Clics | Impressions | Position |');
    lines.push('|---|---:|---:|---:|');
    for (const p of s.topPages) {
      lines.push(`| ${p.page.replace(SITE_BASE_URL, '')} | ${fmtNum(p.clicks)} | ${fmtNum(p.impressions)} | ${fmtPos(p.position)} |`);
    }
  }
  lines.push('');
  return lines.join('\n');
}

function renderIndexationSection(section) {
  if (section.error) {
    return `### Indexation (échantillon hebdomadaire)\n\n⚠️ Donnees indisponibles : ${section.error}\n`;
  }
  const lines = [];
  lines.push('### Indexation (échantillon hebdomadaire)');
  lines.push('');
  lines.push(
    `_Échantillon tournant de ${section.data.length} URLs (les 5 pages services + une rotation des pages ville, ~1 fois toutes les ${Math.ceil(735 / URL_INSPECTION_SAMPLE_SIZE)} semaines pour couvrir les 735 pages ville×service)._`
  );
  lines.push('');
  const notIndexed = section.data.filter((r) => r.verdict !== 'PASS');
  if (notIndexed.length === 0) {
    lines.push('✅ Toutes les URLs de l\'échantillon de cette semaine sont indexées (verdict PASS).');
  } else {
    lines.push(`⚠️ **${notIndexed.length}/${section.data.length}** URLs de l'échantillon ne sont pas indexées ou en erreur :`);
    lines.push('');
    lines.push('| URL | Verdict | Détail |');
    lines.push('|---|---|---|');
    for (const r of notIndexed) {
      lines.push(`| ${r.url.replace(SITE_BASE_URL, '')} | ${r.verdict} | ${r.coverageState} |`);
    }
  }
  lines.push('');
  return lines.join('\n');
}

function renderGa4Section(title, section) {
  if (section.error) {
    return `### ${title}\n\n⚠️ Donnees indisponibles : ${section.error}\n`;
  }
  const g = section.data;
  const lines = [];
  lines.push(`### ${title}`);
  lines.push('');
  lines.push(`- Sessions : **${fmtNum(g.totals.sessions)}**`);
  lines.push(`- Utilisateurs actifs : **${fmtNum(g.totals.activeUsers)}**`);
  lines.push(`- Pages vues : **${fmtNum(g.totals.pageViews)}**`);
  lines.push(`- Conversions (evenements marques "key event" dans GA4) : **${fmtNum(g.totals.conversions)}**`);
  lines.push('');
  lines.push('**Canaux d\'acquisition :**');
  lines.push('');
  if (g.channels.length === 0) {
    lines.push('_(aucune donnée sur cette période)_');
  } else {
    lines.push('| Canal | Sessions |');
    lines.push('|---|---:|');
    for (const c of g.channels) lines.push(`| ${c.channel || '(non défini)'} | ${fmtNum(c.sessions)} |`);
  }
  lines.push('');
  lines.push('**Top pages (par sessions) :**');
  lines.push('');
  if (g.topPages.length === 0) {
    lines.push('_(aucune donnée sur cette période)_');
  } else {
    lines.push('| Page | Sessions | Vues |');
    lines.push('|---|---:|---:|');
    for (const p of g.topPages) lines.push(`| ${p.page} | ${fmtNum(p.sessions)} | ${fmtNum(p.pageViews)} |`);
  }
  lines.push('');
  lines.push('**Top événements :**');
  lines.push('');
  if (g.topEvents.length === 0) {
    lines.push('_(aucune donnée sur cette période)_');
  } else {
    lines.push('| Événement | Nombre |');
    lines.push('|---|---:|');
    for (const e of g.topEvents) lines.push(`| ${e.event} | ${fmtNum(e.count)} |`);
  }
  lines.push('');
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function safe(fn) {
  try {
    return { data: await fn() };
  } catch (err) {
    return { error: String(err.message || err).split('\n')[0] };
  }
}

async function main() {
  const credentials = loadCredentials();
  const now = new Date();
  const weekNumber = isoWeekNumber(now);

  const gscAuth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  const searchconsole = google.searchconsole({ version: 'v1', auth: gscAuth });

  // fallback: true => REST/HTTP1.1 au lieu de gRPC. Plus robuste dans les
  // environnements avec proxy/pare-feu restrictif (certains runners CI,
  // reseaux d'entreprise) qui bloquent parfois les connexions gRPC alors
  // qu'ils laissent passer de simples requetes HTTPS.
  const analyticsClient = new BetaAnalyticsDataClient({ credentials, fallback: true });

  console.log('Resolution de la propriete Search Console...');
  const siteUrlResult = await safe(() => resolveSiteUrl(searchconsole));
  const siteUrl = siteUrlResult.data;

  console.log('Recuperation Search Console (7j)...');
  const gsc7 = siteUrl ? await safe(() => getSearchConsoleSection(searchconsole, siteUrl, 7)) : { error: siteUrlResult.error };
  console.log('Recuperation Search Console (28j)...');
  const gsc28 = siteUrl ? await safe(() => getSearchConsoleSection(searchconsole, siteUrl, 28)) : { error: siteUrlResult.error };
  console.log(`Inspection d'un echantillon d'URLs (semaine ISO ${weekNumber})...`);
  const indexation = siteUrl ? await safe(() => inspectUrlSample(searchconsole, siteUrl, weekNumber)) : { error: siteUrlResult.error };

  console.log('Recuperation Google Analytics (7j)...');
  const ga7 = await safe(() => getGa4Section(analyticsClient, GA4_PROPERTY_ID, '7daysAgo'));
  console.log('Recuperation Google Analytics (28j)...');
  const ga28 = await safe(() => getGa4Section(analyticsClient, GA4_PROPERTY_ID, '28daysAgo'));

  // Le client GA4 (gRPC) garde une connexion ouverte en arriere-plan. Sans la
  // fermer explicitement, le process peut planter APRES coup avec un
  // ECONNRESET non attrape (deja constate en test) alors que le rapport est
  // deja ecrit correctement -> on ferme proprement avant de continuer.
  await analyticsClient.close().catch(() => {});

  const dateStr = fmtDate(now);
  const parts = [];
  parts.push(`# Rapport SEO Dalia Provence — ${dateStr}`);
  parts.push('');
  parts.push(`_Genere automatiquement (API Google directes, sans Supermetrics). Site : ${SITE_BASE_URL}_`);
  parts.push('');
  parts.push('## Search Console');
  parts.push('');
  parts.push(renderSearchConsoleSection('7 derniers jours', gsc7));
  parts.push(renderSearchConsoleSection('28 derniers jours', gsc28));
  parts.push(renderIndexationSection(indexation));
  parts.push('## Google Analytics (GA4)');
  parts.push('');
  parts.push(renderGa4Section('7 derniers jours', ga7));
  parts.push(renderGa4Section('28 derniers jours', ga28));
  parts.push('## Google My Business');
  parts.push('');
  parts.push(
    "⚠️ Pas d'API gratuite disponible pour ce compte (acces sur demande approuvee par Google). A verifier manuellement de temps en temps sur business.google.com/manage."
  );
  parts.push('');

  const markdown = parts.join('\n');

  fs.mkdirSync(REPORTS_DIR, { recursive: true });
  fs.writeFileSync(path.join(REPORTS_DIR, `${dateStr}.md`), markdown);
  fs.writeFileSync(path.join(REPORTS_DIR, 'latest.md'), markdown);

  console.log(`\nRapport ecrit dans reports/seo/${dateStr}.md (+ latest.md)`);

  const hadErrors = [gsc7, gsc28, indexation, ga7, ga28].some((s) => s.error);
  if (hadErrors) {
    console.log('\n⚠️ Une ou plusieurs sections ont echoue (voir le rapport pour le detail).');
  }

  // Sortie explicite : les clients Google (gRPC/HTTP keep-alive) peuvent
  // laisser trainer des sockets qui emettent une erreur non-attrapee bien
  // apres la fin de main() (deja observe en test). Le rapport est deja ecrit
  // sur disque a ce stade, donc on force une sortie propre plutot que de
  // laisser Node attendre que ces handles se ferment tout seuls.
  process.exit(hadErrors ? 1 : 0);
}

main().catch((err) => {
  console.error('Erreur fatale :', err);
  process.exit(1);
});
