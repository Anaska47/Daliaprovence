// prerender.mjs
//
// Post-build static prerendering for the DaliaProvence SPA.
//
// Problem: this is a client-side-only React app (Vite + react-router).
// Vercel serves the SAME dist/index.html for every route (catch-all rewrite),
// and the per-page <title>/<meta description>/<link rel=canonical>/JSON-LD are
// only injected client-side via useEffect. Search engine crawlers that don't
// execute JS (and even Googlebot on a slow/throttled render) see identical,
// generic HTML for all ~735 city x service pages. That kills the local-SEO
// value of having one page per commune.
//
// Fix: after `vite build`, for every real route, take the built dist/index.html
// and stamp in the exact same title/meta description/canonical/OG/JSON-LD that
// the matching React page would set client-side (see the useEffect in each
// src/pages/*.tsx + src/components/SeoSchema.tsx), then write it to
// dist/<route>/index.html.
//
// Vercel (and most static hosts) resolve a matching static file BEFORE
// applying vercel.json rewrites (confirmed in Vercel's own docs: "precedence
// is given to the filesystem prior to rewrites being applied"). So once
// dist/debroussaillage/aix-en-provence/index.html exists, a request to
// /debroussaillage/aix-en-provence is served that file directly and the
// catch-all SPA rewrite only kicks in for routes that were NOT prerendered.
// No vercel.json change is required.
//
// The app still ships the same JS bundle. On load, src/index.tsx calls
// ReactDOM.createRoot(root).render(...) (NOT hydrateRoot), so React simply
// takes over and re-renders the SPA client-side on top of the prerendered
// markup -- same technique used by tools like react-snap. No hydration
// mismatch warnings, full interactivity preserved.
//
// v2 (2026-08-26): the original version of this script used Playwright to
// render every route in a real headless Chromium and snapshot the DOM. That
// worked in testing but the very first real Vercel build failed with "Host
// system is missing dependencies to run browsers" -- Vercel's build
// containers don't allow installing the OS-level libraries Chromium needs,
// and that failure took down EVERY deploy (npm run build exited 1), not just
// the prerendering step. Since the exact HTML each page needs is fully
// deterministic (it's just string templates keyed by service + commune, see
// SERVICE_CONFIG below), there was never a need for a real browser: this
// version does plain string/HTML templating in Node, with zero external
// processes and zero system dependencies. It cannot hit this class of build
// failure again, and it also runs in well under a second instead of minutes.
//
// Safety philosophy, kept from v1 and more important than ever after the
// incident above: prerendering is an SEO enhancement, not a build
// requirement. Every failure mode in this file is caught and logged as a
// warning; nothing in here is allowed to make `npm run build` exit non-zero.
// Worst case, a route silently keeps the plain client-side-rendered
// experience that existed before this whole file did.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, 'dist');
const SITE_BASE_URL = 'https://daliaprovence.vercel.app';

// Kept in sync by hand with src/data/faqContent.ts (used for the FAQPage
// JSON-LD block, exactly like src/components/SeoSchema.tsx does client-side).
// These are short, rarely-changed marketing/legal FAQ answers -- if they're
// ever edited in faqContent.ts, update the matching array here too.
const FAQS = {
  faqDebroussaillage: [
    { question: "Qu'est-ce que l'obligation de débroussaillage (OLD) dans le Var ?", answer: "Dans le Var, la loi impose de débroussailler dans un rayon de 50 mètres autour de toute construction (maison, piscine, cabanon). Cette distance peut être portée à 100 mètres par arrêté préfectoral. L'objectif est de protéger votre habitation et de ralentir la progression des incendies." },
    { question: "Quelle est la période idéale pour faire débroussailler mon terrain ?", answer: "Il est fortement conseillé d'intervenir entre l'automne et le printemps (avant le 1er juin). Au-delà de cette date, l'utilisation d'outils mécaniques peut être interdite ou réglementée par la préfecture en raison des risques de départ de feu." },
    { question: "Quels sont les risques si je ne débroussaille pas ?", answer: "Le non-respect de l'obligation vous expose à une amende pouvant aller jusqu'à 30€ par m² non débroussaillé, une mise en demeure du maire, et surtout le refus d'indemnisation par votre assurance en cas de sinistre." },
    { question: "Proposez-vous l'évacuation des déchets verts ?", answer: "Oui, nous proposons deux solutions : soit l'évacuation complète vers un centre de valorisation agréé, soit le broyage sur place (mulching) qui permet de fertiliser votre sol naturellement et de limiter la repousse." },
    { question: "Peut-on obtenir un crédit d'impôt pour ces travaux ?", answer: "Le débroussaillage est considéré comme un travail d'entretien de jardin. Selon votre situation, vous pouvez bénéficier d'un crédit d'impôt de 50% au titre des services à la personne pour les travaux réalisés chez vous (résidence principale ou secondaire)." },
  ],
  faqElagage: [
    { question: "Faut-il une autorisation pour abattre ou élaguer un arbre dans le Var ?", answer: "Sur un terrain privé, la taille est en général libre. L'abattage peut en revanche être soumis à déclaration préalable si l'arbre est classé, remarquable, en alignement, ou situé en zone protégée par le PLU de votre commune. Nous vous conseillons avant travaux si un doute existe." },
    { question: "Quelle est la meilleure période pour élaguer un arbre ?", answer: "L'automne et l'hiver (novembre à février), en dehors de la période de nidification des oiseaux (mars à août, protégée par la réglementation sur la biodiversité) et de la montée de sève, pour limiter le stress de l'arbre." },
    { question: "Intervenez-vous en urgence sur un arbre dangereux ou penché ?", answer: "Oui, nos grimpeurs-élagueurs certifiés interviennent rapidement pour sécuriser un arbre menaçant, avec démontage par tronçons si l'accès ou la proximité d'une habitation l'exige." },
    { question: "Que faites-vous des branches et du bois après l'élagage ?", answer: "Évacuation en déchetterie agréée ou broyage sur place selon le volume, une option pratique pour valoriser les déchets verts directement sur votre terrain." },
    { question: "Le crédit d'impôt s'applique-t-il à l'élagage ?", answer: "Les travaux d'entretien courant des arbres à votre domicile peuvent être éligibles au crédit d'impôt services à la personne, dans la limite d'un plafond annuel. Nous vous fournissons une facture détaillée pour votre déclaration." },
  ],
  faqTerrassement: [
    { question: "Ai-je besoin d'une autorisation pour des travaux de terrassement ?", answer: "Une simple mise à niveau ne nécessite généralement pas d'autorisation. En revanche, un exhaussement ou affouillement important (hauteur et surface au-delà de certains seuils) peut nécessiter une déclaration préalable, voire un permis d'aménager. Nous vous orientons selon votre projet et votre commune." },
    { question: "Combien de temps durent des travaux de terrassement ?", answer: "Cela dépend de la surface, de l'accès au chantier et de la nature du sol : quelques jours pour une plateforme de piscine ou une terrasse, davantage pour la préparation complète d'un terrain à bâtir." },
    { question: "Gérez-vous l'évacuation des terres et gravats ?", answer: "Oui, nous évacuons les déblais vers un site agréé ou les réutilisons sur place pour du remblai lorsque c'est possible, ce qui limite les coûts de transport." },
    { question: "Intervenez-vous avant une construction, une piscine ou un mur de soutènement ?", answer: "Oui, nous préparons plateformes, tranchées pour réseaux, et terrassements en pente avec du matériel adapté à l'accès de votre terrain." },
    { question: "Quelles garanties couvrent vos travaux de terrassement ?", answer: "Les ouvrages de gros œuvre liés au terrassement (fondations, soutènements) sont couverts par la garantie décennale de l'entreprise qui réalise les travaux." },
  ],
  faqNettoyageToiture: [
    { question: "À quelle fréquence faut-il nettoyer sa toiture en Provence ?", answer: "Le climat méditerranéen et la végétation environnante favorisent mousses et lichens, surtout sur les pans orientés nord. Un nettoyage tous les 3 à 5 ans est généralement recommandé selon l'exposition de votre toiture." },
    { question: "Le traitement hydrofuge est-il vraiment nécessaire ?", answer: "Oui : appliqué après le démoussage, il protège la porosité des tuiles, limite les infiltrations et prolonge la durée de vie de la toiture, généralement pour plusieurs années." },
    { question: "Utilisez-vous des produits dangereux pour le jardin ou l'environnement ?", answer: "Nous utilisons des produits biodégradables à dosage contrôlé et protégeons vos plantations et évacuations d'eaux pluviales pendant le traitement." },
    { question: "Intervenez-vous aussi sur les façades ?", answer: "Oui, nous proposons le nettoyage et le traitement anti-mousse des façades en complément de la toiture pour une protection complète de votre habitation." },
    { question: "Faut-il une autorisation pour nettoyer sa toiture ?", answer: "Pour un entretien standard sur une maison individuelle, non. En copropriété, l'accord du syndic peut être requis si l'intervention nécessite un échafaudage sur parties communes." },
  ],
  faqRestanques: [
    { question: "Qu'est-ce qu'une restanque et pourquoi en construire une ?", answer: "Une restanque est un mur de soutènement traditionnel en pierre sèche, typique du paysage provençal. Elle permet de terrasser un terrain en pente pour l'aménager ou le cultiver, tout en gérant l'écoulement des eaux et en limitant l'érosion." },
    { question: "Travaillez-vous en pierre sèche, sans mortier, comme les bâtisseurs traditionnels ?", answer: "Oui, nous maîtrisons la technique traditionnelle de pierre sèche (savoir-faire reconnu à l'UNESCO) : des murs qui respirent, drainent naturellement l'eau et durent des décennies sans ciment." },
    { question: "Faut-il une autorisation pour construire un mur de soutènement ?", answer: "Selon la hauteur du mur et son emplacement par rapport aux limites de propriété, une déclaration préalable de travaux peut être nécessaire, notamment en zone classée. Nous vous conseillons avant de démarrer le chantier." },
    { question: "Réparez-vous les restanques existantes qui s'effondrent ?", answer: "Oui, nous diagnostiquons l'état du mur et proposons une reprise partielle ou totale selon le degré de dégradation, en réutilisant si possible les pierres d'origine." },
    { question: "Combien de temps dure la construction d'une restanque ?", answer: "Cela dépend du linéaire et de la hauteur du mur : de quelques jours pour un muret court à plusieurs semaines pour un chantier de restanques important sur une grande parcelle." },
  ],
};

// Kept in sync by hand with the useEffect + <SeoSchema> block in each
// src/pages/*.tsx. Same reasoning as FAQS above: small, stable templates,
// not worth a fragile TS-parsing step in a script that must never break.
const SERVICE_CONFIG = {
  'debroussaillage': {
    serviceName: 'Débroussaillage',
    faqs: FAQS.faqDebroussaillage,
    title: (loc) => loc ? `Débroussaillage à ${loc.name} (${loc.zipCode}) - Devis Gratuit 24h` : 'Débroussaillage Brignoles & Var (83) - Devis Gratuit 24h - Dalia Provence',
    description: (loc) => loc ? `Besoin d'un débroussaillage à ${loc.name} ? Mise en conformité OLD / DFCI rapide. Devis gratuit sous 24h par des experts locaux.` : 'Service de débroussaillage professionnel dans le Var. Mise en conformité incendie légale (OLD), intervention rapide à Brignoles et alentours.',
  },
  'elagage': {
    serviceName: "Élagage et abattage d'arbres",
    faqs: FAQS.faqElagage,
    title: (loc) => loc ? `Élagage et Abattage à ${loc.name} (${loc.zipCode}) - Devis Gratuit 24h` : "Élagage & Abattage d'arbres dans le Var (83) - Devis Gratuit 24h - Dalia Provence",
    description: (loc) => loc ? `Services d'élagage et abattage d'arbres à ${loc.name}. Intervention en toute sécurité par des arboristes experts. Devis gratuit sous 24h.` : "Experts en élagage et abattage d'arbres délicats dans le Var. Taille douce, démontage d'arbres dangereux et évacuation. Devis rapide à Brignoles et 83.",
  },
  'terrassement': {
    serviceName: 'Terrassement',
    faqs: FAQS.faqTerrassement,
    title: (loc) => loc ? `Terrassement à ${loc.name} (${loc.zipCode}) - Devis Gratuit` : 'Entreprise de Terrassement dans le Var (83) - Devis Gratuit - Dalia Provence',
    description: (loc) => loc ? `Travaux de terrassement, nivellement et aménagement de terrain à ${loc.name}. Équipe équipée et expérimentée. Devis gratuit rapide.` : 'Spécialistes du terrassement et de la préparation de terrain dans le Var. Fondations, piscines, nivellement. Consultez-nous pour un devis gratuit au meilleur prix.',
  },
  'nettoyage-toiture': {
    serviceName: 'Nettoyage et démoussage de toiture',
    faqs: FAQS.faqNettoyageToiture,
    title: (loc) => loc ? `Démoussage & Nettoyage de Toiture à ${loc.name} (${loc.zipCode})` : 'Nettoyage & Traitement Toiture dans le Var (83) - Devis Gratuit',
    description: (loc) => loc ? `Redonnez l'éclat du neuf à votre toiture ou façade à ${loc.name}. Démoussage, traitement hydrofuge et nettoyage professionnel. Devis gratuit.` : "Spécialistes du nettoyage, démoussage et traitement hydrofuge de toitures et façades dans le Var. Protégez votre maison des infiltrations et redonnez-lui son éclat.",
  },
  'restanques': {
    serviceName: 'Création et restauration de restanques',
    faqs: FAQS.faqRestanques,
    title: (loc) => loc ? `Création de Restanques & Murs en Pierre à ${loc.name} (${loc.zipCode})` : 'Murs en Pierre Sèche et Restanques Var (83) - Devis Gratuit',
    description: (loc) => loc ? `Artisan spécialiste de la création et réparation de restanques à ${loc.name}. Murets en pierre naturelle, aménagement paysager traditionnel provençal.` : "Maîtrise de la pierre sèche et création de restanques dans le Var. Aménagez les pentes de votre terrain avec l'authenticité de la Provence.",
  },
};

const SERVICES = Object.keys(SERVICE_CONFIG);
const BUSINESS_ID = `${SITE_BASE_URL}/#business`;

function loadLocations() {
  const raw = fs.readFileSync(path.join(__dirname, 'src/data/locations.json'), 'utf-8');
  return JSON.parse(raw);
}

function buildRoutes() {
  const locations = loadLocations();
  const routes = ['/'];
  for (const service of SERVICES) {
    routes.push(`/${service}`);
    for (const loc of locations) {
      routes.push(`/${service}/${loc.slug}`);
    }
  }
  routes.push('/merci', '/partenaires');
  routes.push(...Object.keys(GUIDE_CONFIG));
  return routes;
}

function outputPathFor(route) {
  if (route === '/') return path.join(DIST_DIR, 'index.html');
  return path.join(DIST_DIR, route.replace(/^\//, ''), 'index.html');
}

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(str) {
  return escapeHtml(str).replace(/"/g, '&quot;');
}

function replaceOrInsert(html, findRegex, replacement) {
  if (findRegex.test(html)) {
    return html.replace(findRegex, replacement);
  }
  return html.replace('</head>', `  ${replacement}\n</head>`);
}

function buildJsonLd({ serviceName, serviceDescription, cityName, canonicalUrl, faqs }) {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HomeAndConstructionBusiness',
        '@id': BUSINESS_ID,
        name: 'Dalia Provence',
        telephone: '+33619926923',
        url: SITE_BASE_URL,
        areaServed: { '@type': 'City', name: cityName },
        address: { '@type': 'PostalAddress', addressRegion: "Provence-Alpes-Côte d'Azur", addressCountry: 'FR' },
      },
      {
        '@type': 'Service',
        serviceType: serviceName,
        description: serviceDescription,
        provider: { '@id': BUSINESS_ID },
        areaServed: { '@type': 'City', name: cityName },
        url: canonicalUrl,
      },
      ...(faqs.length > 0 ? [{
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }] : []),
    ],
  };
  // Defensive: prevent a "</script>" sequence inside the JSON from ever being
  // able to close the script tag early (none of our current content contains
  // this, but it costs nothing to guard against it).
  return JSON.stringify(graph).replace(/</g, '\\u003c');
}

// Pages statiques hors service (pas de variante par ville, pas de JSON-LD --
// un schema Service/HomeAndConstructionBusiness n'aurait pas de sens ici).
// Avant l'ajout de cette config, '/merci' et '/partenaires' passaient par le
// `if (!config) return baseHtml` ci-dessous et heritaient donc TEL QUEL le
// <title>/<meta description>/OG de la page d'accueil (debroussaillage a
// Brignoles) -- trompeur pour les deux, et carrement un doublon de contenu
// pour /merci puisqu'elle n'avait pas de canonical propre.
const STATIC_PAGE_CONFIG = {
  '/merci': {
    title: 'Demande Envoyée avec Succès - Dalia Provence',
    description: "Votre demande a bien été reçue. Un expert Dalia Provence vous recontacte sous 24 à 48h pour organiser votre devis gratuit de débroussaillage.",
    // Page de remerciement post-formulaire, sans valeur de positionnement et
    // deja absente de sitemap.xml -- mais l'absence du sitemap n'est qu'une
    // indication, pas une directive de crawl. Le noindex explicite est la
    // seule garantie que Google ne l'indexe pas si elle est decouverte
    // autrement (lien direct, partage, etc.) avec un contenu qui dupliquerait
    // celui de la home.
    robots: 'noindex, follow',
  },
  '/partenaires': {
    title: 'Devenez Partenaire - Recevez des Leads Qualifiés dans le Var - Dalia Provence',
    description: "Devenez partenaire Dalia Provence dans le Var : recevez des leads qualifiés en débroussaillage, sans publicité à payer, secteur exclusif. Inscription gratuite.",
    // Page de recrutement B2B, presente dans sitemap.xml : contrairement a
    // /merci elle doit etre normalement indexee, donc pas de robots meta ici.
  },
};

// Guides/articles de fond (contenu editorial, pas de variante par ville).
// Meme mecanique que STATIC_PAGE_CONFIG (garde separee car conceptuellement
// distincte : un guide est destine a grandir -- un par service a terme, voir
// docs/SETUP-*.md) ; a synchroniser a la main avec le useEffect du composant
// React correspondant et avec l'entree GUIDES de generate-sitemap.js.
const GUIDE_CONFIG = {
  '/guides/obligation-debroussaillement-var': {
    title: 'Obligation de Débroussaillement (OLD) dans le Var : Guide Complet - Dalia Provence',
    description: "Rayon 50-100m, amende jusqu'à 30€/m², période légale, crédit d'impôt : tout savoir sur l'obligation de débroussaillement (OLD) dans le Var. Devis gratuit Dalia Provence.",
  },
};

function renderStaticPageHtml(baseHtml, route, { title, description, robots }) {
  const canonicalUrl = `${SITE_BASE_URL}${route}`;

  let html = baseHtml;
  html = replaceOrInsert(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  html = replaceOrInsert(html, /<meta\s+name="description"[\s\S]*?>/, `<meta name="description" content="${escapeAttr(description)}">`);
  html = replaceOrInsert(html, /<meta\s+property="og:title"[\s\S]*?>/, `<meta property="og:title" content="${escapeAttr(title)}">`);
  html = replaceOrInsert(html, /<meta\s+property="og:description"[\s\S]*?>/, `<meta property="og:description" content="${escapeAttr(description)}">`);
  html = replaceOrInsert(html, /<meta\s+property="og:url"[\s\S]*?>/, `<meta property="og:url" content="${escapeAttr(canonicalUrl)}">`);
  html = replaceOrInsert(html, /<link\s+rel="canonical"[\s\S]*?>/, `<link rel="canonical" href="${escapeAttr(canonicalUrl)}">`);
  if (robots) {
    html = replaceOrInsert(html, /<meta\s+name="robots"[\s\S]*?>/, `<meta name="robots" content="${escapeAttr(robots)}">`);
  }

  return html;
}

function renderRouteHtml(baseHtml, route) {
  const staticConfig = STATIC_PAGE_CONFIG[route] || GUIDE_CONFIG[route];
  if (staticConfig) return renderStaticPageHtml(baseHtml, route, staticConfig);

  const parts = route.split('/').filter(Boolean); // e.g. ['debroussaillage', 'aix-en-provence']
  const service = parts[0];
  const citySlug = parts[1];
  const config = SERVICE_CONFIG[service];
  if (!config) return baseHtml; // route ni service ni statique connue : ne devrait pas arriver (buildRoutes() est la seule source de routes), ship as-is par securite

  const locations = loadLocations();
  const location = citySlug ? locations.find((l) => l.slug === citySlug.toLowerCase()) || null : null;
  const cityName = location ? location.name : 'Brignoles';
  const canonicalUrl = citySlug ? `${SITE_BASE_URL}/${service}/${citySlug}` : `${SITE_BASE_URL}/${service}`;
  const pageTitle = config.title(location);
  const pageDescription = config.description(location);

  let html = baseHtml;
  html = replaceOrInsert(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(pageTitle)}</title>`);
  html = replaceOrInsert(html, /<meta\s+name="description"[\s\S]*?>/, `<meta name="description" content="${escapeAttr(pageDescription)}">`);
  html = replaceOrInsert(html, /<meta\s+property="og:title"[\s\S]*?>/, `<meta property="og:title" content="${escapeAttr(pageTitle)}">`);
  html = replaceOrInsert(html, /<meta\s+property="og:description"[\s\S]*?>/, `<meta property="og:description" content="${escapeAttr(pageDescription)}">`);
  html = replaceOrInsert(html, /<meta\s+property="og:url"[\s\S]*?>/, `<meta property="og:url" content="${escapeAttr(canonicalUrl)}">`);
  html = replaceOrInsert(html, /<link\s+rel="canonical"[\s\S]*?>/, `<link rel="canonical" href="${escapeAttr(canonicalUrl)}">`);

  const jsonLd = buildJsonLd({
    serviceName: config.serviceName,
    serviceDescription: pageDescription,
    cityName,
    canonicalUrl,
    faqs: config.faqs,
  });
  html = replaceOrInsert(
    html,
    /<script\s+id="seo-schema-jsonld"[\s\S]*?<\/script>/,
    `<script id="seo-schema-jsonld" type="application/ld+json">${jsonLd}</script>`
  );

  return html;
}

function main() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error('dist/ not found - run `npm run build` first.');
    return;
  }

  const baseIndexPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(baseIndexPath)) {
    console.warn('⚠️  dist/index.html introuvable, prerendering ignoré (le site se déploiera sans ce boost SEO).');
    return;
  }

  // Read the pristine build output ONCE. We write dist/index.html itself as
  // part of the loop (the '/' route IS the Debroussaillage page), so every
  // other route must template off this in-memory copy, never off whatever
  // is currently on disk at dist/index.html.
  const baseHtml = fs.readFileSync(baseIndexPath, 'utf-8');

  const routes = buildRoutes();
  console.log(`Prerendering ${routes.length} routes (string templating, no browser)...`);

  let done = 0;
  const failures = [];
  for (const route of routes) {
    try {
      const html = renderRouteHtml(baseHtml, route);
      const outPath = outputPathFor(route);
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, html);
      done++;
    } catch (err) {
      failures.push({ route, error: String(err && err.message || err) });
    }
  }

  console.log(`Done. ${done}/${routes.length} routes prerendered.`);
  if (failures.length) {
    console.warn(`\n${failures.length} route(s) ont échoué (elles garderont simplement le rendu côté client) :`);
    for (const f of failures.slice(0, 20)) {
      console.warn(`  ${f.route}: ${f.error}`);
    }
  }
}

try {
  main();
} catch (err) {
  // Same safety net as everywhere else in this file: prerendering must never
  // be able to fail `npm run build`. vite build already succeeded by the
  // time this script runs -- worst case here, the site deploys exactly as it
  // did before this whole prerendering feature existed.
  console.warn('\n⚠️  Prerendering interrompu par une erreur inattendue, ignoré :');
  console.warn(`   ${String(err && err.message || err)}`);
  console.warn('   Le site sera déployé normalement (rendu côté client).\n');
}
