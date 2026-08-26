# Configurer l'accès gratuit aux données Google (Search Console + Analytics)

Ce guide remplace Supermetrics (payant) par un accès **direct et gratuit** aux API officielles de Google. Compte environ **15 minutes**, une seule fois. Ensuite tout est automatique.

Pourquoi ça marche : Google fournit un "compte de service" — un compte robot à qui on donne un accès en lecture seule à Search Console et Analytics, sans jamais partager ton mot de passe. Ce compte peut ensuite interroger les API gratuitement (largement dans les limites du forfait gratuit pour un site de cette taille).

Ce qu'il faut avant de commencer : **deux comptes Google différents** sont impliqués (vérifié le 26/08 en regardant directement dans les deux, après une confusion avec des tentatives de vérification DNS impossibles à finaliser) :
- **`Anas@neskagency.fr`** → a l'accès Search Console réel et vérifié sur `https://daliaprovence.vercel.app/` (propriété "Préfixe d'URL", pas "Domaine")
- **`daliaprovence@gmail.com`** → a l'accès Google Analytics (GA4, propriété `daliaprovence`, ID `551438256`)

Ignore toute propriété Search Console de type **"Domaine"** pour `daliaprovence.vercel.app` ou `daliaprovence.app.vercel.app` que tu verrais ailleurs (sous `daliaprovence@gmail.com`) : ce sont des tentatives mortes, impossibles à vérifier car personne ne contrôle le DNS d'un sous-domaine `.vercel.app` partagé. La vraie propriété qui marche est celle en "Préfixe d'URL" sous `Anas@neskagency.fr`.

---

## Étape 1 — Créer un projet Google Cloud (gratuit, pas de carte bancaire)

1. Va sur [console.cloud.google.com](https://console.cloud.google.com/)
2. En haut, clique sur le sélecteur de projet, puis **"Nouveau projet"**
3. Nom du projet : `dalia-provence-seo` (ou ce que tu veux)
4. Clique **"Créer"** et attends ~30 secondes
5. Vérifie que ce nouveau projet est bien sélectionné en haut de la page

## Étape 2 — Activer les 2 API nécessaires

Dans le menu de gauche : **APIs & Services → Library** (Bibliothèque)

Cherche et active, une par une (bouton **"Enable"/"Activer"** sur chaque fiche) :
- **Google Search Console API**
- **Google Analytics Data API**

## Étape 3 — Créer le compte de service

1. Menu de gauche : **IAM & Admin → Service Accounts** (Comptes de service)
2. Clique **"Create service account"** (Créer un compte de service)
3. Nom : `dalia-seo-bot`
4. Clique **"Create and continue"**, puis **"Done"** (tu peux ignorer les étapes optionnelles de rôles)

## Étape 4 — Générer la clé JSON

1. Clique sur le compte `dalia-seo-bot` que tu viens de créer
2. Onglet **"Keys"** (Clés)
3. **"Add key" → "Create new key"**
4. Format **JSON** → **"Create"**
5. Un fichier `.json` se télécharge automatiquement — garde-le précieusement, c'est comme un mot de passe. **Ne le mets jamais en ligne publiquement ni dans le repo GitHub directement.**

Ouvre ce fichier avec le Bloc-notes une seconde et repère le champ `"client_email"` — ça ressemble à :
`dalia-seo-bot@dalia-provence-seo.iam.gserviceaccount.com`
C'est cette adresse qu'on va "inviter" dans Search Console et Analytics (comme un collègue à qui on donne un accès lecture seule).

## Étape 5 — Autoriser ce compte dans Search Console

**Connecte-toi avec `Anas@neskagency.fr`** (pas daliaprovence@gmail.com — c'est ce compte-là qui a la vraie propriété vérifiée).

1. Va sur [search.google.com/search-console](https://search.google.com/search-console)
2. Sélectionne bien la propriété **https://daliaprovence.vercel.app/** (celle en "Préfixe d'URL", avec de vraies données de clics — pas une des propriétés "Domaine" non confirmées)
3. Menu de gauche : **Paramètres → Utilisateurs et autorisations**
4. **"Ajouter un utilisateur"**
5. Colle l'adresse `client_email` du fichier JSON
6. Autorisation : **"Complète" (Full)**
7. Valider

## Étape 6 — Autoriser ce compte dans Google Analytics (GA4)

**Reconnecte-toi avec `daliaprovence@gmail.com`** cette fois (celui-ci a bien l'accès Analytics, contrairement à Search Console).

1. Va sur [analytics.google.com](https://analytics.google.com/), propriété **daliaprovence** (ID `551438256`, tag `G-MCDFJ35X1S`)
2. En bas à gauche : **Admin**
3. Colonne "Propriété" → **"Gestion des accès à la propriété"** (Property access management)
4. Bouton **"+"** → **"Ajouter des utilisateurs"**
5. Colle la même adresse `client_email`
6. **Décoche** "Envoyer un e-mail de notification" (c'est un robot, pas la peine)
7. Rôle : **"Lecteur" (Viewer)**
8. Valider

## Étape 7 — Transmettre la clé en sécurité

Deux options, choisis celle que tu préfères :

**Option A (recommandée, la plus sûre)** — Tu ajoutes toi-même la clé comme secret GitHub, elle ne transite jamais par la conversation :
1. Va sur `github.com/Anaska47/Daliaprovence` → **Settings → Secrets and variables → Actions**
2. **"New repository secret"**
3. Nom : `GSC_GA4_SERVICE_ACCOUNT_KEY`
4. Valeur : ouvre le fichier `.json` téléchargé, copie-colle **tout son contenu**
5. **"Add secret"**
6. Dis-moi "c'est fait" et je branche le script dessus.

**Option B** — Tu m'envoies directement le fichier `.json` dans la conversation, je teste le script et je te guide pour l'ajouter ensuite au secret GitHub.

---

## Ce que ça débloque

Une fois ceci fait, un script automatique (déjà prêt côté code) ira chercher chaque semaine, gratuitement et sans limite de temps :
- Search Console : clics, impressions, position moyenne, pages/requêtes qui montent, sur 7 et 28 jours
- Analytics (GA4) : trafic organique et conversions (formulaires de devis) par page

Seule limite : **Google My Business n'a pas d'équivalent gratuit en API libre** (Google verrouille cet accès derrière une demande d'approbation manuelle). Pour les stats de fiche établissement, il faudra continuer à jeter un œil de temps en temps sur [business.google.com/manage](https://business.google.com/manage) directement.
