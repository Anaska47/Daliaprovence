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
// Fix: after `vite build`, boot a local static server for dist/, use a headless
// browser to visit every real route, wait for the existing useEffect-driven SEO
// injection to finish, then snapshot the fully-updated DOM as a static
// dist/<route>/index.html file.
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

import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, 'dist');
const PORT = 4321;
const BASE_URL = `http://localhost:${PORT}`;
const CONCURRENCY = 10;

const SERVICES = ['debroussaillage', 'elagage', 'terrassement', 'nettoyage-toiture', 'restanques'];

function loadLocations() {
  const raw = fs.readFileSync(path.join(__dirname, 'src/data/locations.json'), 'utf-8');
  return JSON.parse(raw);
}

function buildRoutes({ limit } = {}) {
  const locations = limit ? loadLocations().slice(0, limit) : loadLocations();
  const routes = ['/'];
  for (const service of SERVICES) {
    routes.push(`/${service}`);
    for (const loc of locations) {
      routes.push(`/${service}/${loc.slug}`);
    }
  }
  routes.push('/merci', '/partenaires');
  return routes;
}

function outputPathFor(route) {
  if (route === '/') return path.join(DIST_DIR, 'index.html');
  return path.join(DIST_DIR, route.replace(/^\//, ''), 'index.html');
}

async function waitForServer(url, tries = 60) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status === 404) return true;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server at ${url} did not respond in time`);
}

async function pool(items, worker, concurrency) {
  const results = new Array(items.length);
  let idx = 0;
  async function runOne() {
    while (idx < items.length) {
      const current = idx++;
      results[current] = await worker(items[current], current);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, runOne));
  return results;
}

async function main() {
  const args = process.argv.slice(2);
  const limitArg = args.find((a) => a.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : undefined;

  if (!fs.existsSync(DIST_DIR)) {
    console.error('dist/ not found - run `npm run build` first.');
    process.exit(1);
  }

  const routes = buildRoutes({ limit });
  console.log(`Prerendering ${routes.length} routes${limit ? ` (limited to ${limit} communes/service for testing)` : ''}...`);

  console.log('Starting preview server...');
  const preview = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    cwd: __dirname,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let previewLog = '';
  preview.stdout.on('data', (d) => (previewLog += d.toString()));
  preview.stderr.on('data', (d) => (previewLog += d.toString()));

  try {
    await waitForServer(BASE_URL);

    let browser;
    try {
      browser = await chromium.launch();
    } catch (err) {
      // Le prerendering est une amelioration SEO progressive, pas une etape
      // obligatoire : le site fonctionne deja sans lui (rendu cote client).
      // S'il n'y a pas de navigateur utilisable sur cette machine de build
      // (dependances systeme manquantes, environnement restreint, etc.), on
      // ne doit JAMAIS faire echouer tout le deploiement pour ca -> on
      // abandonne proprement et dist/ garde le rendu SPA classique.
      console.warn('\n⚠️  Impossible de lancer Chromium sur cette machine de build, prerendering ignore :');
      console.warn(`   ${String(err.message || err).split('\n')[0]}`);
      console.warn('   Le site sera deploye normalement (rendu cote client), sans le boost SEO du prerendering.\n');
      return;
    }

    const context = await browser.newContext();

    // Block everything that isn't our local preview server: analytics/fonts/GTM
    // would otherwise slow down (or hang, in a sandboxed/offline environment)
    // hundreds of page loads for no benefit to a DOM snapshot.
    await context.route('**/*', (route) => {
      const url = route.request().url();
      if (url.startsWith(BASE_URL)) return route.continue();
      return route.abort();
    });

    let done = 0;
    const failures = [];

    await pool(
      routes,
      async (route) => {
        const page = await context.newPage();
        try {
          await page.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
          await page.waitForFunction(
            () => !!document.title && !!document.querySelector('#seo-schema-jsonld') && !!document.querySelector('link[rel="canonical"]'),
            { timeout: 10000 }
          );
          const html = await page.content();
          const outPath = outputPathFor(route);
          fs.mkdirSync(path.dirname(outPath), { recursive: true });
          fs.writeFileSync(outPath, html);
        } catch (err) {
          failures.push({ route, error: String(err) });
        } finally {
          await page.close();
          done++;
          if (done % 50 === 0 || done === routes.length) {
            console.log(`  ${done}/${routes.length}`);
          }
        }
      },
      CONCURRENCY
    );

    await browser.close();

    console.log(`\nDone. ${routes.length - failures.length}/${routes.length} routes prerendered.`);
    if (failures.length) {
      console.log(`\n${failures.length} FAILURES (ces routes garderont simplement le rendu cote client) :`);
      for (const f of failures.slice(0, 20)) {
        console.log(`  ${f.route}: ${f.error.split('\n')[0]}`);
      }
    }
    // Volontairement pas de process.exitCode = 1 ici, meme en cas d'echecs
    // partiels : le prerendering est une amelioration, pas un prerequis. Une
    // poignee de pages non-prerendues continuent de fonctionner normalement
    // (rendu cote client), ca ne doit jamais bloquer tout le deploiement.
  } finally {
    preview.kill();
  }
}

main().catch((err) => {
  // Meme filet de securite qu'au-dessus, au cas ou une erreur inattendue
  // remonterait jusqu'ici : on log clairement mais on n'echoue jamais le
  // build a cause du prerendering (vite build a deja reussi a ce stade).
  console.warn('\n⚠️  Prerendering interrompu par une erreur inattendue, ignore :');
  console.warn(`   ${String(err && err.message || err)}`);
  console.warn('   Le site sera deploye normalement (rendu cote client).\n');
});
