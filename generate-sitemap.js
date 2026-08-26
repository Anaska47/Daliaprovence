import fs from 'fs';

// Simple script to generate sitemap index and 5 sub-sitemaps
// Location slugs are read from src/data/locations.json (single source of truth,
// shared with src/data/locations.ts) to avoid drift with the live pages.
const locationsData = JSON.parse(
  fs.readFileSync(new URL('./src/data/locations.json', import.meta.url), 'utf-8')
);
const locations = locationsData.map(({ slug }) => ({ slug }));

const BASE_URL = 'https://daliaprovence.vercel.app';
const SERVICES = ['debroussaillage', 'elagage', 'terrassement', 'nettoyage-toiture', 'restanques'];

// Guides/articles de fond : un par service a terme (voir GUIDE_CONFIG dans
// prerender.mjs, a garder synchronise). Chaque guide est ajoute au sitemap
// de SON service, pas dans un fichier a part, pour rester coherent avec le
// decoupage par service deja en place ci-dessous.
const GUIDES = {
  debroussaillage: '/guides/obligation-debroussaillement-var',
  elagage: '/guides/elagage-reglementation-var',
  terrassement: '/guides/terrassement-autorisation-var',
  'nettoyage-toiture': '/guides/nettoyage-toiture-frequence-var',
  restanques: '/guides/restanques-pierre-seche-var',
};

const getCurrentDate = () => {
  const d = new Date();
  return d.toISOString().split('T')[0];
};

// Generate Index Sitemap
let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

SERVICES.forEach(service => {
  sitemapIndex += `  <sitemap>
    <loc>${BASE_URL}/sitemap-${service}.xml</loc>
    <lastmod>${getCurrentDate()}</lastmod>
  </sitemap>
`;
});

sitemapIndex += `</sitemapindex>`;
fs.writeFileSync('public/sitemap.xml', sitemapIndex);

// Generate individual Service Sitemaps
SERVICES.forEach((service, index) => {
  let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Include general pages only in the first sitemap
  if (index === 0) {
    xmlContent += `  <!-- General Pages -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/partenaires</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  }

  xmlContent += `  <!-- Main Service: ${service} -->
  <url>
    <loc>${BASE_URL}/${service}</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;

  if (GUIDES[service]) {
    xmlContent += `  <!-- Guide -->
  <url>
    <loc>${BASE_URL}${GUIDES[service]}</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  }

  locations.forEach(loc => {
    xmlContent += `  <url>
    <loc>${BASE_URL}/${service}/${loc.slug}</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });

  xmlContent += `</urlset>`;
  fs.writeFileSync(`public/sitemap-${service}.xml`, xmlContent);
  console.log(`Sitemap generated: public/sitemap-${service}.xml`);
});

console.log('Sitemap Index and sub-sitemaps successfully generated!');
