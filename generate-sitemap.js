import fs from 'fs';

// Simple script to generate sitemap index and 5 sub-sitemaps
const locations = [
  { slug: 'les-adrets-de-l-esterel' }, { slug: 'aiguines' }, { slug: 'ampus' }, { slug: 'les-arcs' },
  { slug: 'artignosc-sur-verdon' }, { slug: 'artigues' }, { slug: 'aups' }, { slug: 'bagnols-en-foret' },
  { slug: 'bandol' }, { slug: 'bargeme' }, { slug: 'bargemon' }, { slug: 'barjols' }, { slug: 'la-bastide' },
  { slug: 'baudinard-sur-verdon' }, { slug: 'bauduen' }, { slug: 'le-beausset' }, { slug: 'belgentier' },
  { slug: 'besse-sur-issole' }, { slug: 'bormes-les-mimosas' }, { slug: 'le-bourguet' }, { slug: 'bras' },
  { slug: 'brenon' }, { slug: 'brignoles' }, { slug: 'brue-auriac' }, { slug: 'cabasse' }, { slug: 'la-cadiere-d-azur' },
  { slug: 'callas' }, { slug: 'callian' }, { slug: 'camps-la-source' }, { slug: 'le-cannet-des-maures' },
  { slug: 'carces' }, { slug: 'carnoules' }, { slug: 'carqueiranne' }, { slug: 'le-castellet' },
  { slug: 'cavalaire-sur-mer' }, { slug: 'la-celle' }, { slug: 'chateaudouble' }, { slug: 'chateauvert' },
  { slug: 'chateauvieux' }, { slug: 'claviers' }, { slug: 'cogolin' }, { slug: 'collobrieres' },
  { slug: 'comps-sur-artuby' }, { slug: 'correns' }, { slug: 'cotignac' }, { slug: 'la-crau' },
  { slug: 'la-croix-valmer' }, { slug: 'cuers' }, { slug: 'draguignan' }, { slug: 'entrecasteaux' },
  { slug: 'esparron' }, { slug: 'evenos' }, { slug: 'la-farlede' }, { slug: 'fayence' }, { slug: 'figanieres' },
  { slug: 'flassans-sur-issole' }, { slug: 'flayosc' }, { slug: 'forcalqueiret' }, { slug: 'fox-amphoux' },
  { slug: 'frejus' }, { slug: 'la-garde' }, { slug: 'la-garde-freinet' }, { slug: 'gareoult' },
  { slug: 'gassin' }, { slug: 'ginasservis' }, { slug: 'gonfaron' }, { slug: 'grimaud' }, { slug: 'hyeres' },
  { slug: 'le-lavandou' }, { slug: 'lorgues' }, { slug: 'le-luc' }, { slug: 'la-londe-les-maures' },
  { slug: 'la-martre' }, { slug: 'les-mayons' }, { slug: 'mazaugues' }, { slug: 'moissac-bellevue' },
  { slug: 'la-mole' }, { slug: 'mons' }, { slug: 'montauroux' }, { slug: 'montferrat' },
  { slug: 'montfort-sur-argens' }, { slug: 'montmeyan' }, { slug: 'la-motte' }, { slug: 'le-muy' },
  { slug: 'nans-les-pins' }, { slug: 'ollieres' }, { slug: 'ollioules' }, { slug: 'pierrefeu-du-var' },
  { slug: 'pignans' }, { slug: 'plan-d-aups-sainte-baume' }, { slug: 'le-plan-de-la-tour' },
  { slug: 'ponteves' }, { slug: 'pourcieux' }, { slug: 'pourrieres' }, { slug: 'le-pradet' },
  { slug: 'puget-sur-argens' }, { slug: 'puget-ville' }, { slug: 'ramatuelle' }, { slug: 'rayol-canadel-sur-mer' },
  { slug: 'regusse' }, { slug: 'le-revest-les-eaux' }, { slug: 'rians' }, { slug: 'riboux' },
  { slug: 'rocbaron' }, { slug: 'roquebrune-sur-argens' }, { slug: 'la-roquebrussanne' }, { slug: 'la-roque-esclapon' },
  { slug: 'rougiers' }, { slug: 'saint-antonin-du-var' }, { slug: 'saint-cyr-sur-mer' }, { slug: 'saint-julien' },
  { slug: 'saint-martin-de-pallieres' }, { slug: 'sainte-maxime' }, { slug: 'saint-maximin-la-sainte-baume' },
  { slug: 'saint-paul-en-foret' }, { slug: 'saint-raphael' }, { slug: 'saint-tropez' }, { slug: 'saint-zacharie' },
  { slug: 'salernes' }, { slug: 'les-salles-sur-verdon' }, { slug: 'sanary-sur-mer' }, { slug: 'seillans' },
  { slug: 'seillons-source-d-argens' }, { slug: 'la-seyne-sur-mer' }, { slug: 'signes' }, { slug: 'sillans-la-cascade' },
  { slug: 'six-fours-les-plages' }, { slug: 'sollies-pont' }, { slug: 'sollies-toucas' }, { slug: 'sollies-ville' },
  { slug: 'tanneron' }, { slug: 'taradeau' }, { slug: 'tavernes' }, { slug: 'le-thoronet' }, { slug: 'toulon' },
  { slug: 'tourrettes' }, { slug: 'tourtour' }, { slug: 'tourves' }, { slug: 'trans-en-provence' },
  { slug: 'trigance' }, { slug: 'la-valette-du-var' }, { slug: 'varages' }, { slug: 'la-verdiere' },
  { slug: 'verignon' }, { slug: 'vidauban' }, { slug: 'villecroze' }, { slug: 'vins-sur-caramy' }
];

const BASE_URL = 'https://daliaprovence.vercel.app';
const SERVICES = ['debroussaillage', 'elagage', 'terrassement', 'nettoyage-toiture', 'restanques'];

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
