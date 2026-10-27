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
| libSQL / Turso | Stockage des messages du formulaire |
| Vercel | Déploiement |
| PDF | CV français + profil anglais d'une page |

## Sections

- Hero avec rôles animés lettre par lettre
- Projets sélectionnés avec problème, rôle, résultat et liens de code
- Expertise (web/mobile, DevOps, QA) et stack par niveau réel
- Méthode de collaboration et engagements
- Chaîne de livraison illustrée
- Parcours, formation et attestations PDF
- Contact avec formulaire, parcours recruteur et parcours client
- CV français et profil anglais (`/profile-en.pdf`)

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

# Accès à l'inbox privée /admin (mot de passe fort recommandé)
ADMIN_PASSWORD=

# Optionnel — base distante Turso pour conserver les messages en production
TURSO_DB_URL=
TURSO_DB_TOKEN=
```

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
