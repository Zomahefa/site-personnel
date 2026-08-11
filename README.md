# Portfolio — Zo Mahefa RANAIVO

Portfolio personnel de **Zo Mahefa RANAIVO**, développeur Backend & DevOps.

**Site web :** [zomahefa.dev](https://zomahefa.dev)

---

## Stack technique

| Technologie | Usage |
|---|---|
| **Next.js 16** (App Router) | Framework |
| **React 19** | UI |
| **TypeScript** | Langage |
| **Tailwind CSS v4** | Styling |
| **shadcn/ui** (base-nova) | Composants UI |
| **Framer Motion** | Animations |
| **libSQL / SQLite** | Base de données |
| **Groq (LLaMA 3.3)** | Chatbot IA & matching |
| **Docker** | Conteneurisation |

## Fonctionnalités

- Portfolio one-page avec sections : Hero, Services, Projets, Compétences, Expérience, Contact
- Panneau d'administration avec CRUD projets et messagerie
- Chatbot IA interactif
- Moteur de recommandation de projets par IA
- Thème clair/sombre
- CV interactif imprimable
- SEO optimisé (sitemap, robots.txt, Open Graph)
- API REST complète

## Développement

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Build production

```bash
npm run build
npm start
```

## Docker

```bash
docker build -t zomahefa/portfolio .
docker run -p 3000:3000 -v ./data:/app/data --env-file .env.local zomahefa/portfolio
```

## Variables d'environnement

Créer un fichier `.env.local` :

```
ADMIN_PASSWORD=your_password
GROQ_API_KEY=your_groq_api_key
# Optionnel — Turso distants
# TURSO_DB_URL=libsql://...
# TURSO_DB_TOKEN=...
```

## Licence

Projet personnel — tous droits réservés.
