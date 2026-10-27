export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://zo-mahefa-it.vercel.app";

export const site = {
  name: "Zo Mahefa RANAIVO",
  shortName: "Zo Mahefa",
  initials: "ZM",
  title: "Développeur web & mobile, ingénieur DevOps et testeur QA",
  email: "zomahefaranaivo@gmail.com",
  phone: "+261 38 54 422 52",
  phoneHref: "tel:+261385442252",
  location: "Fianarantsoa, Madagascar",
  timezone: "Indian/Antananarivo",
  github: "https://github.com/Zomahefa",
  linkedin:
    "https://www.linkedin.com/in/zo-mahefa-ranaivo-338026346/",
  cv: "/cv-zomahefa-ranaivo-2026-10.pdf",
  profileEn: "/profile-en.pdf",
  availability: "Stage · Alternance · Mission",
  workModes: "Sur site ou à distance",
  responseTime: "Réponse sous 48 h ouvrées",
};

export const roles = [
  "Développeur web & mobile",
  "Ingénieur DevOps",
  "Testeur QA",
] as const;

export const navItems = [
  { id: "projets", label: "Projets", index: "01" },
  { id: "expertise", label: "Expertise", index: "02" },
  { id: "methode", label: "Méthode", index: "03" },
  { id: "parcours", label: "Parcours", index: "04" },
  { id: "contact", label: "Contact", index: "05" },
];

export type ProjectVisualKind = "incident" | "erp" | "pipeline";

export type ProjectCapture = {
  src: string;
  alt: string;
  label: string;
};

export type FeaturedProject = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  year: string;
  category: string;
  summary: string;
  context: string;
  problem: string;
  role: string;
  outcome: string;
  stack: string[];
  visual: ProjectVisualKind;
  gallery?: ProjectCapture[];
  repo?: string;
  demo?: string;
  demoLabel?: string;
  privateCode?: boolean;
};

export const featuredProjects: FeaturedProject[] = [
  {
    id: "signaleo",
    index: "01",
    title: "Signaleo",
    subtitle: "Signalement de pannes · terrain & supervision",
    year: "2025",
    category: "Web app / DevOps",
    summary:
      "Un outil unique pour signaler une panne, la localiser et suivre sa résolution en temps réel.",
    context:
      "Projet de licence L3, conduit du cadrage jusqu'à la mise en production et à la supervision.",
    problem:
      "Les interventions étaient suivies sans vue d'ensemble : statuts dispersés, faible traçabilité et priorités difficiles à établir sur le terrain.",
    role:
      "Conception du parcours de signalement, tableau de bord d'administration, suivi des statuts, carte Leaflet, puis conteneurisation, CI/CD, déploiement blue/green et supervision.",
    outcome:
      "Une application déployée et observée, avec un flux de livraison reproductible et une vision claire des interventions en cours.",
    stack: [
      "React",
      "Django",
      "MySQL",
      "Docker",
      "GitHub Actions",
      "Nginx",
      "Prometheus",
      "Grafana",
    ],
    visual: "incident",
    gallery: [
      {
        src: "/projects/signaleo-signalement.png",
        alt: "Capture de l'écran de signalement d'une panne sur Signaleo",
        label: "Signalement d'une panne",
      },
    ],
    repo: "https://github.com/Zomahefa/gestion-de-panne-devops",
    demo: "https://signaleo.onrender.com/",
    demoLabel: "Consulter la démo",
  },
  {
    id: "e-fandrosoana",
    index: "02",
    title: "E-Fandrosoana",
    subtitle: "ERP quincaillerie · Boutique de l'Évolution",
    year: "2024 — 2025",
    category: "Produit / Fullstack",
    summary:
      "Un ERP pour centraliser stocks, ventes, fournisseurs, clients et trésorerie.",
    context:
      "Projet freelance : un outil de pilotage quotidien pensé pour une activité de quincaillerie.",
    problem:
      "La gestion reposait sur des fichiers et des saisies dispersées, avec un suivi des stocks et de la trésorerie difficile à fiabiliser.",
    role:
      "Modélisation des données, API REST Spring Boot sécurisée, tableaux de bord React, base PostgreSQL et environnement Docker.",
    outcome:
      "Un socle unique pour piloter l'activité, structuré pour accueillir de nouveaux modules sans repartir de zéro.",
    stack: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "PostgreSQL",
      "React",
      "TypeScript",
      "Docker",
    ],
    visual: "erp",
    gallery: [
      {
        src: "/projects/efandrosoana-dashboard.png",
        alt: "Capture du tableau de bord de E-Fandrosoana",
        label: "Tableau de bord",
      },
      {
        src: "/projects/efandrosoana-stock.png",
        alt: "Capture de la gestion de stock de E-Fandrosoana",
        label: "Stock & réassort",
      },
      {
        src: "/projects/efandrosoana-clients.png",
        alt: "Capture de la gestion des clients de E-Fandrosoana",
        label: "Clients & crédits",
      },
      {
        src: "/projects/efandrosoana-factures.png",
        alt: "Capture de la facturation de E-Fandrosoana",
        label: "Factures & devis",
      },
      {
        src: "/projects/efandrosoana-parametres.png",
        alt: "Capture des paramètres de E-Fandrosoana",
        label: "Paramètres & taxes",
      },
    ],
    privateCode: true,
  },
  {
    id: "pipeline-ci-cd",
    index: "03",
    title: "Pipeline CI/CD & observabilité",
    subtitle: "Une chaîne de livraison de bout en bout",
    year: "2024",
    category: "DevOps / Plateforme",
    summary:
      "Automatiser le build, le déploiement et la surveillance d'une application web sur VPS.",
    context:
      "Projet mené en stage L3, de l'infrastructure jusqu'à la supervision de production.",
    problem:
      "Les déploiements manuels rallongeaient les cycles et rendaient la détection d'incident difficile.",
    role:
      "Dockerisation des services, pipeline GitHub Actions, reverse proxy Nginx, déploiement blue/green, métriques Prometheus/Grafana et logs centralisés avec Loki.",
    outcome:
      "Un flux de livraison automatisé, reproductible et observable, du commit à la production.",
    stack: [
      "Docker",
      "Docker Compose",
      "Make",
      "GitHub Actions",
      "Blue/Green",
      "Nginx",
      "Prometheus",
      "Grafana",
      "Loki",
      "Linux",
    ],
    visual: "pipeline",
    repo: "https://github.com/Zomahefa/gestion-de-panne-devops",
  },
];

export type ArchiveProject = {
  title: string;
  category: string;
  year: string;
  stack: string;
  href?: string;
  label?: string;
};

export const archiveProjects: ArchiveProject[] = [
  {
    title: "Gestion de station essence",
    category: "Desktop · JavaFX",
    year: "2024",
    stack: "JavaFX · PostgreSQL",
    href: "https://github.com/Zomahefa/Gestion-de-station-essence",
    label: "Code",
  },
  {
    title: "Messagerie instantanée TCP/IP",
    category: "Réseau · Python",
    year: "2024",
    stack: "Python · Sockets · SQLite · bcrypt",
    href: "https://github.com/Zomahefa/serveur-de-messagerie-mousti-socket-",
    label: "Code",
  },
  {
    title: "Gestion des affectations",
    category: "Java EE · Web",
    year: "ENI",
    stack: "JSP · Servlets · Hibernate",
    href: "https://github.com/Zomahefa/Gestion-des-affectations-des-employ-s",
    label: "Code",
  },
  {
    title: "Portfolio personnel",
    category: "Site · Next.js",
    year: "2026",
    stack: "Next.js · TypeScript · Tailwind",
    href: "https://github.com/Zomahefa/site-personnel",
    label: "Code",
  },
  {
    title: "Administration Linux & Windows Server",
    category: "Systèmes · ENI",
    year: "2023 — 2024",
    stack: "Active Directory · Bash · iptables",
    label: "Lab",
  },
  {
    title: "Réseaux, pfSense, Moodle & VoIP",
    category: "Infrastructure · ENI",
    year: "2023 — 2024",
    stack: "GNS3 · pfSense · Asterisk · Moodle",
    label: "Labs",
  },
];

export type Practice = {
  index: string;
  title: string;
  intro: string;
  deliverables: string[];
  code: string;
};

export const practices: Practice[] = [
  {
    index: "A",
    title: "Web & mobile",
    intro:
      "Des interfaces claires et des API solides pour transformer un processus métier en produit utilisable.",
    deliverables: [
      "Applications métier et tableaux de bord",
      "API REST sécurisées et modélisation des données",
      "Interfaces React/Next.js responsive et accessibles",
      "Applications Flutter/Kotlin selon le besoin",
    ],
    code: "UI / API / DATA",
  },
  {
    index: "B",
    title: "DevOps & cloud",
    intro:
      "Une livraison reproductible, des environnements maîtrisés et une production que l'on peut observer.",
    deliverables: [
      "Pipelines CI/CD et environnements reproductibles",
      "Docker, Kubernetes et Infrastructure as Code",
      "Reverse proxy, secrets et durcissement",
      "Monitoring, logs et alerting",
    ],
    code: "BUILD / SHIP / RUN",
  },
  {
    index: "C",
    title: "Qualité & tests",
    intro:
      "La qualité se construit avant la mise en production, pas après le premier incident.",
    deliverables: [
      "Stratégie de tests unitaires, intégration et E2E",
      "Tests d'API et scénarios de non-régression",
      "Quality gates avec SonarQube et Trivy",
      "Checklists de recette et documentation",
    ],
    code: "TEST / VERIFY / DOCUMENT",
  },
];

export const stackLevels = [
  {
    level: "Maîtrisé en production",
    note: "Utilisé sur un projet complet, défendable en entretien.",
    items: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
      "Linux",
      "React / Next.js",
    ],
  },
  {
    level: "Opérationnel",
    note: "Mis en œuvre sur des projets et environnements réels.",
    items: [
      "Kubernetes",
      "Prometheus / Grafana",
      "Terraform",
      "Nginx",
      "Redis",
      "Django",
      "TypeScript",
      "JUnit / Vitest",
    ],
  },
  {
    level: "Notions",
    note: "Bases solides, en progression continue.",
    items: ["AWS", "GCP", "ArgoCD", "Ansible", "Vault", "Flutter", "Kotlin", "ELK"],
  },
];

export const softSkills = [
  {
    title: "Résolution de problèmes",
    text: "Partir du symptôme, isoler la cause, choisir la correction la plus simple et vérifier qu'elle tient.",
    proof: "Diagnostics sur les pipelines, les environnements et les incidents de production.",
  },
  {
    title: "Communication",
    text: "Traduire un besoin métier en décisions techniques compréhensibles, sans masquer les contraintes.",
    proof: "Cadrage, documentation et restitution de projets à des interlocuteurs non techniques.",
  },
  {
    title: "Adaptabilité",
    text: "Passer d'un contexte web à un contexte DevOps ou QA sans perdre le fil du produit.",
    proof: "Projets menés de React à Spring Boot, puis de Docker à la supervision.",
  },
  {
    title: "Apprentissage rapide",
    text: "Apprendre un outil parce qu'un projet en a besoin, puis le mettre réellement en pratique.",
    proof: "Docker, GitHub Actions, Prometheus, Grafana et Terraform appris par la mise en œuvre.",
  },
  {
    title: "Autonomie & ownership",
    text: "Prendre un sujet du cadrage à la mise en production, y compris les parties ingrates.",
    proof: "Projets freelance et de licence pilotés de bout en bout.",
  },
  {
    title: "Travail en équipe",
    text: "Partager le contexte, documenter les choix et rendre le travail suivant plus simple.",
    proof: "Projets académiques, stages et collaboration autour de dépôts Git.",
  },
  {
    title: "Rigueur",
    text: "Préférer une procédure reproductible à une réussite accidentelle.",
    proof: "Tests, checklists de recette, documentation et déploiements rejouables.",
  },
  {
    title: "Curiosité technique",
    text: "Comprendre ce qui se passe sous l'abstraction avant d'ajouter une nouvelle couche.",
    proof: "Veille et expérimentation régulières autour de l'infrastructure et de la qualité.",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Cadrer",
    text: "Objectif, périmètre, risques et critères de réussite. On aligne le besoin avant d'écrire la première ligne.",
    deliverable: "Mini-cahier des charges",
  },
  {
    number: "02",
    title: "Construire",
    text: "Des itérations courtes, une démo à chaque étape et des décisions documentées. Pas de boîte noire.",
    deliverable: "Incréments testés",
  },
  {
    number: "03",
    title: "Livrer",
    text: "Tests, pipeline, environnements et sauvegardes. La mise en ligne doit être une procédure, pas un exploit.",
    deliverable: "Déploiement reproductible",
  },
  {
    number: "04",
    title: "Veiller",
    text: "Métriques, logs, corrections et passation. Le produit reste compréhensible après la livraison.",
    deliverable: "Runbook & documentation",
  },
];

export const engagements = [
  "Premier échange de 30 min",
  "Devis sous 5 jours ouvrés",
  "Code et documentation remis",
  "Réponse sous 48 h ouvrées",
];

export const pipelineSteps = [
  {
    number: "01",
    title: "Commit",
    label: "Git push",
    text: "Une branche, une intention, un historique lisible.",
  },
  {
    number: "02",
    title: "Test",
    label: "Qualité",
    text: "Tests automatisés et analyse statique avant tout déploiement.",
  },
  {
    number: "03",
    title: "Build",
    label: "Artefact",
    text: "Une image Docker immuable, construite une seule fois.",
  },
  {
    number: "04",
    title: "Ship",
    label: "Livraison",
    text: "Déploiement contrôlé, avec une stratégie de retour arrière.",
  },
  {
    number: "05",
    title: "Observe",
    label: "Production",
    text: "Métriques, logs et alertes pour voir venir les incidents.",
  },
];

export const experiences = [
  {
    period: "2024 — Présent",
    title: "Développeur web & DevOps",
    company: "Freelance · Projets personnels",
    text: "Conception et développement d'applications métier : API Spring Boot ou Django, interfaces React, conteneurisation Docker, pipelines CI/CD et supervision. Une pratique de bout en bout, du besoin jusqu'à la production.",
    tags: ["Spring Boot", "React", "Docker", "CI/CD"],
  },
  {
    period: "2024",
    title: "Stage L3 — CI/CD & monitoring",
    company: "Stage professionnel",
    text: "Mise en place d'une chaîne de livraison pour une application React/Django/MySQL sur VPS : Docker Compose, GitHub Actions, Nginx, déploiement blue/green, Prometheus, Grafana et Loki.",
    tags: ["Docker", "GitHub Actions", "Nginx", "Observabilité"],
  },
  {
    period: "2023 — 2024",
    title: "Stage L2 — Systèmes & réseau",
    company: "Spray Info · Fianarantsoa",
    text: "Déploiement d'un serveur Moodle sous Ubuntu avec visioconférence, administration Linux, gestion des utilisateurs et sécurisation. Travaux pratiques de routage et de pare-feu avec GNS3 et pfSense.",
    tags: ["Linux", "Moodle", "GNS3", "pfSense"],
  },
];

export const education = [
  {
    period: "2025 — 2026",
    title: "Master 1 en informatique",
    school: "ENI — École Nationale d'Informatique",
    detail: "Ingénierie des systèmes d'information. Formation en cours.",
  },
  {
    period: "2022 — 2025",
    title: "Licence en informatique générale",
    school: "ENI — École Nationale d'Informatique",
    detail: "Mention Très Bien. Développement, systèmes, réseaux et sécurité.",
  },
];

export const certifications = [
  {
    title: "Certification Spring Boot",
    issuer: "Mind Luster",
    year: "2026",
    image: "/certifcatSping-boot2.jpeg",
    href: "/certificatSpringBoot.pdf",
  },
  {
    title: "Certification UML",
    issuer: "Mind Luster",
    year: "2026",
    image: "/uml-certification.jpeg",
    href: "/uml-certification-zo.pdf",
  },
];

export const contactTypes = [
  "Site ou application web",
  "Application mobile",
  "DevOps / CI-CD",
  "Qualité & tests",
  "Recrutement",
  "Autre",
];

export const socialLinks = [
  { label: "GitHub", href: site.github, handle: "@Zomahefa" },
  {
    label: "LinkedIn",
    href: site.linkedin,
    handle: "Zo Mahefa RANAIVO",
  },
];

export function mailtoForProject(title: string) {
  const subject = encodeURIComponent(`Étude de cas — ${title}`);
  return `mailto:${site.email}?subject=${subject}`;
}
