# Portfolio — Zo Mahefa RANAIVO

Portfolio personnel de **Zo Mahefa RANAIVO**, développeur web & mobile, ingénieur DevOps et testeur QA.

**Site :** [zo-mahefa-it.vercel.app](https://zo-mahefa-it.vercel.app)

## Stack

| Technologie | Usage |
|---|---|
| Next.js 16 (App Router) | Framework, rendu serveur, SEO |
| React 19 + TypeScript | Interface |
| Tailwind CSS v4 | Design system |
| Framer Motion | Animations et révélations au scroll |
| Instrument Serif · Geist · Geist Mono | Direction typographique |
| libSQL / Turso | Messages du formulaire + statistiques de visites |
| Groq / Google Gemini | Assistant IA du portfolio |
| Vercel | Déploiement |
| PDF | CV français d'une page |

## Sections

- Hero avec rôles animés, compteurs incrémentaux et indicateur de scroll
- Sélecteur de langue FR/EN dans l'en-tête (à côté du thème)
- Projets sélectionnés avec problème, rôle, résultat et liens de code
- Expertise (web/mobile, DevOps, QA) et stack par niveau réel
- Bloc QA détaillé : gestion de recette, tests d'API, automatisation, charge, CI/CD
- Méthode de collaboration et engagements
- Chaîne de livraison illustrée
- Parcours, formation, attestations PDF et savoir-être
- Témoignages clients avec contact
- Contact avec formulaire, parcours recruteur et parcours client
- Assistant IA flottant, limité au périmètre du portfolio

## Développement

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Vérifications

```bash
npm run lint
npm run build
npm test
```

## Variables d'environnement

Créer un fichier `.env.local` :

```bash
# Domaine public utilisé pour canonical, Open Graph, robots et sitemap
NEXT_PUBLIC_SITE_URL=https://zo-mahefa-it.vercel.app

# Accès à l'inbox privée /admin (12 caractères minimum, majuscules,
# chiffres et symboles recommandés)
ADMIN_PASSWORD=

# Base Turso (recommandé en production ; SQLite locale sinon)
TURSO_DB_URL=
TURSO_DB_TOKEN=

# Assistant IA — groq (rapide) ou google (Gemini)
AI_PROVIDER=groq
GROQ_API_KEY=
GOOGLE_AI_API_KEY=
# Optionnels : surcharger les modèles par défaut
# GROQ_MODEL=openai/gpt-oss-120b
# GOOGLE_AI_MODEL=gemini-2.5-flash
```

## Base de données

Le portfolio ne stocke **que** les messages du formulaire et les visites.
Aucun projet n'est lu depuis la base : le contenu éditorial reste dans
`src/lib/content.ts`, ce qui garantit un affichage instantané.

```bash
npm run db:init
```

Le script crée les tables `messages` et `page_views` (et leurs index) sur
Turso si `TURSO_DB_URL` est défini, sinon dans `data/portfolio.db`.

## Administration

- URL : `/admin` (en `noindex`, exclue de l'indexation).
- Connexion par mot de passe (`ADMIN_PASSWORD`), session signée HMAC en
  cookie `HttpOnly` valable 8 heures.
- Onglets : messages reçus (lecture + suppression) et audience (vues
  totales, 7 derniers jours, visiteurs uniques, pages, appareils, pays,
  visites récentes).

## Assistant IA

- Widget flottant sur le site, route serveur `/api/assistant`.
- Le prompt système est construit à partir du contenu public
  (`src/lib/assistant-prompt.ts`) : le modèle ne voit aucune donnée privée.
- Groq est utilisé par défaut, Gemini en alternative via `AI_PROVIDER`.
- Limitation de débit basique et repli vers l'e-mail si le fournisseur
  est indisponible.

Si la base n'est pas accessible en production, le formulaire affiche un repli vers la messagerie du visiteur : aucun message n'est perdu silencieusement.

## Sécurité et SEO

- Route `/admin` non listée, en `noindex`, protégée par mot de passe.
- En-têtes de sécurité (CSP, HSTS, `X-Frame-Options`, `Permissions-Policy`).
- Canonical, Open Graph, JSON-LD `Person` / `ProfilePage`, sitemap et robots alignés sur le domaine réel.
- Animations désactivées si `prefers-reduced-motion` est actif.
- Formulaire avec validation, honeypot et limitation de débit basique.
- Dépendances de production auditées : `npm audit --omit=dev` sans vulnérabilité.

## Licence

Projet personnel — tous droits réservés.
