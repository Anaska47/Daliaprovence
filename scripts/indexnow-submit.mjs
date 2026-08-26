#!/usr/bin/env node
// Notifie IndexNow (Bing, Yandex, Naver, Seznam.cz, Yep -- pas Google, qui ne
// participe pas au protocole) que les pages du site ont ete ajoutees/modifiees,
// pour un crawl quasi instantane au lieu d'attendre une decouverte organique.
//
// Gratuit, protocole ouvert (https://www.indexnow.org). Aucune dependance npm :
// utilise fetch (natif depuis Node 18) et le module fs standard.
//
// La cle ci-dessous N'EST PAS un secret : IndexNow exige au contraire qu'elle
// soit publiee publiquement à la racine du site (voir public/<cle>.txt), pour
// prouver que celui qui soumet des URLs controle bien le domaine. Rien a voir
// avec la cle privee du compte de service Google (celle-la doit rester secrete).
//
// Usage :
//   node indexnow-submit.mjs            -> soumet vraiment les URLs
//   node indexnow-submit.mjs --dry-run  -> affiche la charge utile sans rien envoyer

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const HOST = 'daliaprovence.vercel.app';
const BASE_URL = `https://${HOST}`;
const INDEXNOW_KEY = '21cd6f1f85b287a18f7d9438d320d785';
const KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

// Meme logique que generate-sitemap.js : on soumet exactement les URLs qui
// sont dans le sitemap (donc PAS /merci, qui est une page de remerciement
// post-formulaire sans valeur de positionnement -- deja exclue du sitemap).
const SERVICES = ['debroussaillage', 'elagage', 'terrassement', 'nettoyage-toiture', 'restanques'];

function buildUrlList() {
  const locations = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'src/data/locations.json'), 'utf-8')
  );

  const urls = [`${BASE_URL}/`, `${BASE_URL}/partenaires`];

  for (const service of SERVICES) {
    urls.push(`${BASE_URL}/${service}`);
    for (const { slug } of locations) {
      urls.push(`${BASE_URL}/${service}/${slug}`);
    }
  }

  return urls;
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const urlList = buildUrlList();

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  console.log(`IndexNow : ${urlList.length} URLs pretes a soumettre.`);

  if (dryRun) {
    console.log('--dry-run actif : rien envoye. Apercu :');
    console.log(JSON.stringify({ ...payload, urlList: urlList.slice(0, 3).concat(['...']) }, null, 2));
    return;
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  const messages = {
    200: 'OK -- URLs recues.',
    202: 'Accepte -- la cle sera verifiee avant traitement.',
    400: 'Requete invalide (format JSON ou parametres incorrects).',
    403: `Cle refusee -- verifie que ${KEY_LOCATION} est bien en ligne et contient exactement la cle.`,
    422: "Une ou plusieurs URLs n'appartiennent pas a l'hote declare, ou ne correspondent pas au chemin de la cle.",
    429: 'Trop de requetes envoyees -- reessaie plus tard.',
  };

  const detail = messages[res.status] || `Reponse inattendue (code ${res.status}).`;
  console.log(`IndexNow a repondu : ${res.status} ${res.statusText} -- ${detail}`);

  if (res.status !== 200 && res.status !== 202) {
    // Le code seul ne suffit pas toujours a comprendre le vrai probleme (ex:
    // un proxy reseau intermediaire peut renvoyer un 403 qui n'a rien a voir
    // avec IndexNow lui-meme). On journalise le corps + les en-tetes pour un
    // vrai diagnostic plutot que de se fier uniquement au code HTTP.
    const bodyText = await res.text().catch(() => '(impossible de lire le corps)');
    console.log('Corps de la reponse :', bodyText || '(vide)');
    console.log('En-tetes :', JSON.stringify(Object.fromEntries(res.headers.entries())));
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error('Echec de la soumission IndexNow :', err.message);
  process.exitCode = 1;
});
