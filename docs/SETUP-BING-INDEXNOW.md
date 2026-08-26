# Bing Webmaster Tools + IndexNow (gratuit, ~5 minutes)

Google Search Console couvre Google. Ce guide ajoute le deuxième pilier gratuit : Bing Webmaster Tools (qui couvre aussi une partie du trafic Yahoo, propulsé par Bing) et le protocole IndexNow, qui prévient plusieurs moteurs à la fois dès qu'une page change au lieu d'attendre qu'ils la redécouvrent tout seuls.

## Pourquoi s'en occuper

Le site a 742 URLs indexables (147 communes × 5 services + les pages hub). Plus il y a de pages, plus l'attente d'une découverte 100% organique par les moteurs est longue. Bing Webmaster Tools donne une deuxième source de clics gratuits, et IndexNow réduit le délai de crawl de plusieurs semaines à quasiment immédiat sur les moteurs qui le supportent.

Important : **IndexNow ne couvre pas Google** (Google ne participe pas à ce protocole ouvert). Il couvre Bing, Yandex, Naver, Seznam.cz et Yep. C'est un complément à Search Console, pas un remplacement.

---

## Étape 1 — Créer le compte Bing Webmaster Tools (2 minutes)

1. Va sur [www.bing.com/webmasters](https://www.bing.com/webmasters)
2. Connecte-toi avec **le même compte Google que Search Console** (`Anas@neskagency.fr`) — Bing accepte la connexion directe via Google, pas besoin de créer un compte Microsoft séparé
3. Cherche le bouton **"Importer depuis Google Search Console"** (Import from Google Search Console)
4. Autorise l'accès en lecture à Search Console quand Google le demande
5. Sélectionne la propriété **`https://daliaprovence.vercel.app/`**
6. Valide — le site est ajouté et vérifié automatiquement, sans manipulation DNS ni fichier à uploader

Si l'import ne propose pas le bon site ou échoue, solution de secours : ajoute l'URL manuellement puis vérifie via balise meta (Bing en propose une à coller dans le `<head>`, comme celle déjà en place pour Google).

## Étape 2 — Soumettre le sitemap

1. Dans Bing Webmaster Tools, menu **Sitemaps**
2. **"Submit sitemap"**
3. Colle : `https://daliaprovence.vercel.app/sitemap.xml`
4. Valide

---

## Étape 3 — IndexNow (déjà configuré côté code, rien à faire ici)

Une clé IndexNow a été générée et un fichier public l'expose à la racine du site (`public/21cd6f1f85b287a18f7d9438d320d785.txt`) — c'est volontairement public, IndexNow l'exige pour prouver que celui qui soumet des URLs contrôle bien le domaine. Rien à voir avec la clé privée du compte de service Google (celle-là doit rester secrète, voir `docs/SETUP-GOOGLE-API.md`).

Ce que ça débloque une fois déployé :
- `scripts/indexnow-submit.mjs` : soumet les 742 URLs du site en un seul appel gratuit à `api.indexnow.org`, qui relaie ensuite à Bing/Yandex/Naver/Seznam.cz/Yep
- `.github/workflows/indexnow-submit.yml` : lance ce script automatiquement à chaque `git push` sur `main` qui touche les communes ou les pages de service — donc dès qu'une page change, les moteurs sont prévenus dans la minute, sans rien faire manuellement

**Ce fichier de workflow doit être placé à la main** (comme `seo-report.yml`) : GitHub bloque l'écriture automatique de fichiers `.github/workflows/*.yml` par les outils distants, pour des raisons de sécurité. Copie `.github/workflows/indexnow-submit.yml` dans ton dossier, puis committe/pousse avec le reste.

**Vérification** : une fois le site déployé avec le fichier de clé en ligne, lance `node scripts/indexnow-submit.mjs --dry-run` pour voir les URLs sans rien envoyer, ou sans `--dry-run` pour vraiment soumettre. Une réponse `200` ou `202` confirme que c'est pris en compte. Un `403` veut dire que `https://daliaprovence.vercel.app/21cd6f1f85b287a18f7d9438d320d785.txt` n'est pas encore accessible en ligne (attends que le déploiement Vercel soit terminé).

---

## Ce que ça débloque au global

Une fois les deux étapes manuelles faites (import Bing + sitemap), et le workflow IndexNow placé :
- Bing Webmaster Tools donne ses propres données de clics/impressions/position (comme Search Console mais côté Bing) — utile à ajouter au rapport SEO hebdomadaire plus tard si ça vaut le coup une fois qu'il y a du volume
- Chaque nouvelle commune ou page de service ajoutée au site est signalée à 5 moteurs de recherche en quelques secondes, automatiquement, gratuitement
