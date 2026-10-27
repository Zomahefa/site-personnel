export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://zo-mahefa-it.vercel.app";

export type Locale = "fr" | "en";

/** Informations neutres (identiques dans les deux langues). */
export const site = {
  name: "Zo Mahefa RANAIVO",
  shortName: "Zo Mahefa",
  initials: "ZM",
  email: "zomahefaranaivo@gmail.com",
  phone: "+261 38 54 422 52",
  phoneHref: "tel:+261385442252",
  location: "Fianarantsoa, Madagascar",
  coordinates: "21°27′S 47°05′E",
  timezone: "Indian/Antananarivo",
  github: "https://github.com/Zomahefa",
  linkedin: "https://www.linkedin.com/in/zo-mahefa-ranaivo-338026346/",
  cv: "/cv-zomahefa-ranaivo-2026-10.pdf",
  responseTime: "Réponse sous 48 h ouvrées",
} as const;

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

export type ArchiveProject = {
  title: string;
  category: string;
  year: string;
  stack: string;
  href?: string;
  label?: string;
};

export type Practice = {
  index: string;
  title: string;
  intro: string;
  deliverables: string[];
  code: string;
};

export type StackLevel = {
  level: string;
  note: string;
  items: string[];
};

export type QaCategory = {
  title: string;
  note: string;
  tools: string[];
};

export type SoftSkill = {
  title: string;
  text: string;
  proof: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  text: string;
  deliverable: string;
};

export type PipelineStep = {
  number: string;
  title: string;
  label: string;
  text: string;
};

export type Experience = {
  period: string;
  title: string;
  company: string;
  text: string;
  tags: string[];
};

export type Education = {
  period: string;
  title: string;
  school: string;
  detail: string;
};

export type Certification = {
  title: string;
  issuer: string;
  year: string;
  image: string;
  href: string;
};

export type Testimonial = {
  name: string;
  company: string;
  phone: string;
  phoneHref: string;
  quote: string;
  context: string;
};

export type NavItem = { id: string; label: string; index: string };

export type SectionCopy = {
  index: string;
  label: string;
  title: string;
  intro: string;
};

export type HeroStat = {
  value: number;
  label: string;
  pad?: number;
  prefix?: string;
  suffix?: string;
};

export type HeroContent = {
  eyebrowLeft: string;
  eyebrowCenter: string;
  eyebrowRight: string;
  kicker: string;
  title: {
    sr: string;
    line1: string;
    line2Em: string;
    line2After: string;
    line3Em: string;
    line3After: string;
  };
  roleLabel: string;
  intro: string;
  primaryCta: string;
  secondaryCta: string;
  cvCta: string;
  cvAria: string;
  factsAria: string;
  figureLabel: string;
  year: string;
  portraitAlt: string;
  portraitBadge: string;
  focusLabel: string;
  focus: string;
  signature: string;
  noteLeft: string;
  noteRight: string;
  stats: HeroStat[];
  scroll: string;
};

export type SiteContent = {
  availability: string;
  workModes: string;
  location: string;
  roles: string[];
  nav: NavItem[];
  hero: HeroContent;
  sections: {
    projects: SectionCopy;
    expertise: SectionCopy;
    method: SectionCopy;
    about: SectionCopy;
    testimonials: SectionCopy;
    contact: SectionCopy;
  };
  featuredProjects: FeaturedProject[];
  archive: {
    kicker: string;
    title: string;
    copy: string;
    footerNote: string;
    allRepos: string;
    projects: ArchiveProject[];
  };
  practices: Practice[];
  stack: {
    kicker: string;
    title: string;
    intro: string;
    footnote: string;
    levels: StackLevel[];
  };
  qa: {
    kicker: string;
    title: string;
    intro: string;
    categories: QaCategory[];
    mindset: string[];
    footnote: string;
  };
  process: {
    steps: ProcessStep[];
    engagements: string[];
    engagementsKicker: string;
    engagementsTitle: string;
    cta: string;
  };
  pipeline: {
    label: string;
    title: string;
    intro: string;
    principleLabel: string;
    principle: string;
    deliverablesLabel: string;
    deliverables: string;
    cta: string;
    footerLeft: string;
    footerRight: string;
    steps: PipelineStep[];
  };
  about: {
    lead: string;
    body1: string;
    body2: string;
    targetKicker: string;
    targetItems: string[];
    languagesLabel: string;
    languages: string;
    formatLabel: string;
    format: string;
    cvCta: string;
    experienceTitle: string;
    experienceCount: string;
    educationTitle: string;
    educationSchool: string;
    certificationsTitle: string;
    certificationsNote: string;
    certificationOpen: string;
    certificationSee: string;
    softKicker: string;
    softTitle: string;
    softIntro: string;
    experiences: Experience[];
    education: Education[];
    certifications: Certification[];
    softSkills: SoftSkill[];
  };
  testimonials: {
    items: Testimonial[];
    note: string;
  };
  contact: {
    directLabel: string;
    recruiterLabel: string;
    recruiterTitle: string;
    recruiterText: string;
    clientLabel: string;
    clientTitle: string;
    clientText: string;
    locationNote: string;
    cv: string;
    form: {
      head: string;
      response: string;
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      type: string;
      message: string;
      messagePlaceholder: string;
      consent: string;
      submit: string;
      pending: string;
      note: string;
      errorRequired: string;
      errorEmail: string;
      errorConsent: string;
      errorSend: string;
      fallbackLink: string;
      successTitle: string;
      successText: string;
      writeDirectly: string;
      another: string;
    };
    types: string[];
  };
  footer: {
    taglineLine1: string;
    taglineLine2: string;
    navLabel: string;
    contactLabel: string;
    cv: string;
    backToTop: string;
    rights: string;
    built: string;
  };
  ui: {
    viewDemo: string;
    viewCode: string;
    caseStudy: string;
    caseProblem: string;
    caseRole: string;
    caseOutcome: string;
    technologies: string;
    archiveCode: string;
    archiveLab: string;
    archiveRepoAria: string;
    visualAria: string;
    visualSystem: string;
    visualReported: string;
    visualInProgress: string;
    visualResolved: string;
    visualHighPriority: string;
    visualTimeline: string;
    visualDashboard: string;
    visualYear: string;
    visualStock: string;
    visualSales: string;
    visualClients: string;
    visualTreasury: string;
    visualAutoTests: string;
    visualLogs: string;
    visualAlerts: string;
    visualConcept: string;
    galleryRegion: string;
    galleryPrev: string;
    galleryNext: string;
    galleryPause: string;
    galleryPlay: string;
    galleryChoose: string;
    galleryCapture: string;
    galleryHint: string;
    galleryAuto: string;
    galleryHover: string;
    galleryPaused: string;
    galleryManual: string;
    galleryPreview: string;
    galleryOf: string;
    galleryShow: string;
    stackLabel: string;
    copyEmail: string;
    copied: string;
    copyEmailAria: string;
    copiedAria: string;
    themeLabel: string;
    languageLabel: string;
    languageSwitch: string;
    localTime: string;
    testimonialPhone: string;
    contactCta: string;
    menuOpen: string;
    menuClose: string;
    navMain: string;
    navMobile: string;
    brandAria: string;
    availability: string;
    skipLink: string;
    deliverableLabel: string;
    coordinatesAria: string;
  };
  ai: {
    title: string;
    subtitle: string;
    open: string;
    close: string;
    placeholder: string;
    send: string;
    thinking: string;
    disclaimer: string;
    fallback: string;
    suggestions: string[];
    greeting: string;
    error: string;
    clear: string;
  };
};

const fr: SiteContent = {
  availability: "Stage · Alternance · Mission",
  workModes: "Sur site ou à distance",
  location: "Fianarantsoa, Madagascar",
  roles: [
    "Développeur web & mobile",
    "Ingénieur DevOps",
    "Testeur QA",
  ],
  nav: [
    { id: "projets", label: "Projets", index: "01" },
    { id: "expertise", label: "Expertise", index: "02" },
    { id: "methode", label: "Méthode", index: "03" },
    { id: "parcours", label: "Parcours", index: "04" },
    { id: "temoignages", label: "Témoignages", index: "05" },
    { id: "contact", label: "Contact", index: "06" },
  ],
  hero: {
    eyebrowLeft: "PORTFOLIO / ÉDITION 2026",
    eyebrowCenter: "FIANARANTSOA, MADAGASCAR · UTC+3",
    eyebrowRight: "DISPONIBLE POUR COLLABORER",
    kicker: "Ingénieur logiciel",
    title: {
      sr: "Zo Mahefa RANAIVO — Développeur web & mobile, ingénieur DevOps et testeur QA",
      line1: "Du premier",
      line2Em: "commit",
      line2After: " au",
      line3Em: "dernier",
      line3After: " test.",
    },
    roleLabel: "RÔLE_",
    intro:
      "Je conçois des applications web et mobiles, j'automatise leur mise en production et je m'assure qu'elles restent fiables une fois en ligne. Un profil produit, cloud et qualité — sans jargon inutile.",
    primaryCta: "Voir mes preuves",
    secondaryCta: "Parler d'un projet",
    cvCta: "CV PDF",
    cvAria: "Télécharger le CV de Zo Mahefa en PDF",
    factsAria: "Informations pratiques",
    figureLabel: "FIG. 01 / PORTRAIT",
    year: "2026",
    portraitAlt: "Portrait de Zo Mahefa RANAIVO",
    portraitBadge: "Open to work",
    focusLabel: "FOCUS",
    focus: "Web · Cloud · Quality",
    signature: "Zo Mahefa",
    noteLeft: "BASÉ À FIANARANTSOA",
    noteRight: "REMOTE FRIENDLY ↗",
    stats: [
      { value: 9, pad: 2, label: "projets documentés" },
      { value: 3, pad: 2, label: "pôles d'expertise" },
      { value: 8, pad: 2, label: "dépôts publics" },
      { value: 48, prefix: "<", suffix: "h", label: "délai de réponse" },
    ],
    scroll: "SCROLL",
  },
  sections: {
    projects: {
      index: "01",
      label: "Travaux sélectionnés",
      title: "Des preuves, pas des promesses.",
      intro:
        "Trois projets, trois problèmes réels. Le contexte, mon rôle et le résultat — sans chiffre que je ne peux pas défendre en entretien.",
    },
    expertise: {
      index: "02",
      label: "Expertise",
      title: "Trois façons de rendre un produit fiable.",
      intro:
        "Je ne juxtapose pas des technologies : je relie le produit, l'infrastructure et la qualité pour réduire les mauvaises surprises entre la démo et la production.",
    },
    method: {
      index: "03",
      label: "Méthode",
      title: "Un cadre simple. Zéro surprise.",
      intro:
        "Le même fil rouge pour une mission client ou une intégration en équipe : clarifier, livrer par étapes, documenter. La technique sert le résultat, pas l'inverse.",
    },
    about: {
      index: "04",
      label: "Parcours",
      title: "Ingénieur, pas collectionneur de logos.",
      intro:
        "Une formation d'ingénieur, des stages qui touchent à la production et une pratique régulière du code, de l'infrastructure et des tests.",
    },
    testimonials: {
      index: "05",
      label: "Témoignages",
      title: "Ils m'ont confié leur outil de travail.",
      intro:
        "Trois clients, trois besoins concrets. Leur retour porte sur ce qui compte vraiment : la fiabilité au quotidien et la simplicité d'usage.",
    },
    contact: {
      index: "06",
      label: "Contact",
      title: "Un projet à cadrer ? Une équipe à renforcer ?",
      intro:
        "Décrivez le contexte en quelques lignes. Je vous réponds sous 48 h ouvrées, avec une première lecture du besoin et les prochaines étapes.",
    },
  },
  featuredProjects: [
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
  ],
  archive: {
    kicker: "ARCHIVE / 06",
    title: "Autres projets & labs",
    copy:
      "Le reste du terrain : desktop, réseau, systèmes et projets académiques. Les dépôts publics sont ouverts.",
    footerNote: "ZÉRO LIEN MORT — LES PROJETS PRIVÉS SONT SIGNALÉS",
    allRepos: "Tous mes dépôts publics",
    projects: [
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
    ],
  },
  practices: [
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
      title: "Qualité & tests (QA)",
      intro:
        "Le test n'est pas une étape finale : c'est une discipline qui sécurise chaque livraison, du scénario manuel au pipeline automatisé.",
      deliverables: [
        "Plans de test, cas de recette et rapports d'anomalies",
        "Tests manuels : parcours utilisateurs, ergonomie et règles métier",
        "Automatisation E2E avec Playwright et Cypress",
        "Tests d'API avec Postman, Bruno et cURL",
        "Tests de charge K6 / JMeter et quality gates CI/CD",
        "Suivi des campagnes sur Jira, Xray, Zephyr ou TestRail",
      ],
      code: "TEST / AUTOMATE / VERIFY",
    },
  ],
  stack: {
    kicker: "CORE STACK / NIVEAUX RÉELS",
    title: "Ce que je peux défendre en entretien.",
    intro:
      "Pas de pourcentage inventé. Chaque niveau correspond à un usage réel : production, projet complet ou notions en progression.",
    footnote:
      "UNE TECHNOLOGIE N'EST PAS UNE COMPÉTENCE TANT QU'ELLE N'A PAS ÉTÉ LIVRÉE, TESTÉE ET EXPLIQUÉE.",
    levels: [
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
          "Playwright",
          "Postman",
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
          "Cypress",
          "K6",
          "Jira / Xray",
        ],
      },
      {
        level: "Notions",
        note: "Bases solides, en progression continue.",
        items: [
          "AWS",
          "GCP",
          "ArgoCD",
          "Ansible",
          "Vault",
          "Flutter",
          "Kotlin",
          "ELK",
          "Selenium",
          "Appium",
          "JMeter",
          "TestRail",
        ],
      },
    ],
  },
  qa: {
    kicker: "QA / MANUAL & AUTOMATION",
    title: "La qualité, du scénario au pipeline.",
    intro:
      "Je couvre les deux profils du test : le QA manuel qui challenge le parcours et les règles métier, et le QA automation / SDET qui industrialise les tests dans la CI/CD.",
    categories: [
      {
        title: "Gestion & recette",
        note: "Plans de test, campagnes, anomalies et traçabilité.",
        tools: ["Jira", "Xray", "Zephyr", "TestRail"],
      },
      {
        title: "Tests d'API",
        note: "Endpoints REST/GraphQL, statuts HTTP, JSON, JWT/OAuth.",
        tools: ["Postman", "Bruno", "Insomnia", "cURL"],
      },
      {
        title: "Automatisation",
        note: "E2E web et mobile, multi-navigateurs, TypeScript/Python.",
        tools: ["Playwright", "Cypress", "Selenium", "Appium"],
      },
      {
        title: "Performance & charge",
        note: "Scénarios réalistes, montée en charge, intégration CI.",
        tools: ["K6", "JMeter"],
      },
      {
        title: "CI/CD & environnements",
        note: "Suites exécutées à chaque push, conteneurs éphémères.",
        tools: ["GitHub Actions", "GitLab CI", "Docker"],
      },
    ],
    mindset: [
      "QA manuel & SDET",
      "Esprit critique",
      "Sens du détail",
      "Priorisation par le risque",
      "Rapports d'anomalies reproductibles",
    ],
    footnote:
      "UN BUG TROUVÉ AVANT LA PRODUCTION COÛTE MOINS CHER QU'UN INCIDENT SUBI PAR L'UTILISATEUR.",
  },
  process: {
    steps: [
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
    ],
    engagements: [
      "Premier échange de 30 min",
      "Devis sous 5 jours ouvrés",
      "Code et documentation remis",
      "Réponse sous 48 h ouvrées",
    ],
    engagementsKicker: "ENGAGEMENTS / SIMPLES",
    engagementsTitle: "Des règles lisibles avant même de commencer.",
    cta: "Cadrer un besoin",
  },
  pipeline: {
    label: "Chaîne de livraison",
    title: "Du commit au monitoring.",
    intro:
      "Une livraison ne s'arrête pas au déploiement. Chaque étape laisse une trace, chaque incident peut être compris.",
    principleLabel: "Principe :",
    principle:
      "un déploiement doit pouvoir être rejoué, observé et annulé. Pas de copier-coller en production.",
    deliverablesLabel: "LIVRABLES / RUNBOOK",
    deliverables:
      "Pipeline, procédure de rollback et documentation de supervision remis avec le projet.",
    cta: "Cadrer un projet",
    footerLeft: "FLUX REJOUABLE · TESTS · LOGS · MÉTRIQUES",
    footerRight: "DOCKER / GH ACTIONS / PROMETHEUS / VERCEL",
    steps: [
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
    ],
  },
  about: {
    lead:
      "Je m'appelle Zo Mahefa RANAIVO. Je construis des applications utiles, puis je m'assure qu'elles tiennent debout.",
    body1:
      "Formé à l'ENI, j'ai appris à relier le produit, le système et la qualité. Mes projets vont de l'ERP métier au pipeline CI/CD, en passant par la supervision et les tests. Ce qui m'intéresse : comprendre le besoin, choisir le juste niveau de complexité et laisser un système compréhensible derrière moi.",
    body2:
      "Je documente mes décisions, je teste ce que je livre et je considère la mise en production comme une partie du travail — pas comme une formalité.",
    targetKicker: "CE QUE JE RECHERCHE",
    targetItems: [
      "Web & mobile · backend",
      "DevOps & cloud",
      "Qualité & automatisation",
    ],
    languagesLabel: "LANGUES",
    languages:
      "Français courant · Anglais technique (documentation et échanges écrits) · Malgache natif",
    formatLabel: "FORMAT",
    format: "Remote friendly · réponse sous 48 h ouvrées",
    cvCta: "Télécharger le CV",
    experienceTitle: "Expérience",
    experienceCount: "03 POSITIONS / STAGES",
    educationTitle: "Formation",
    educationSchool: "ENI FIANARANTSOA",
    certificationsTitle: "Certifications",
    certificationsNote: "ATTESTATIONS VÉRIFIABLES",
    certificationOpen: "Ouvrir l'attestation",
    certificationSee: "Voir l'attestation PDF",
    softKicker: "SAVOIR-ÊTRE / CE QUI SE VOIT DANS LE TRAVAIL",
    softTitle: "La technique se prouve. Le comportement aussi.",
    softIntro:
      "Pas une liste de mots dans un coin du CV : chaque qualité est reliée à une situation concrète de projet, de stage ou d'équipe.",
    experiences: [
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
    ],
    education: [
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
    ],
    certifications: [
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
    ],
    softSkills: [
      {
        title: "Résolution de problèmes",
        text: "Partir du symptôme, isoler la cause, choisir la correction la plus simple et vérifier qu'elle tient.",
        proof:
          "Diagnostics sur les pipelines, les environnements et les incidents de production.",
      },
      {
        title: "Communication",
        text: "Traduire un besoin métier en décisions techniques compréhensibles, sans masquer les contraintes.",
        proof:
          "Cadrage, documentation et restitution de projets à des interlocuteurs non techniques.",
      },
      {
        title: "Adaptabilité",
        text: "Passer d'un contexte web à un contexte DevOps ou QA sans perdre le fil du produit.",
        proof:
          "Projets menés de React à Spring Boot, puis de Docker à la supervision.",
      },
      {
        title: "Apprentissage rapide",
        text: "Apprendre un outil parce qu'un projet en a besoin, puis le mettre réellement en pratique.",
        proof:
          "Docker, GitHub Actions, Prometheus, Grafana et Terraform appris par la mise en œuvre.",
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
        title: "Esprit critique (QA)",
        text: "Chercher ce qui peut casser avant l'utilisateur, sans supposer que le chemin nominal suffit.",
        proof:
          "Cas limites, tests de non-régression et revue systématique des scénarios.",
      },
      {
        title: "Sens du détail",
        text: "Un libellé, un statut, un cas limite : les détails invisibles font la différence en recette.",
        proof:
          "Rapports d'anomalies reproductibles et checklists de recette fonctionnelle.",
      },
      {
        title: "Curiosité technique",
        text: "Comprendre ce qui se passe sous l'abstraction avant d'ajouter une nouvelle couche.",
        proof:
          "Veille et expérimentation régulières autour de l'infrastructure et de la qualité.",
      },
    ],
  },
  testimonials: {
    items: [
      {
        name: "Quincaillerie Boutique de l'Évolution",
        company: "Boutique de l'Évolution · Quincaillerie",
        phone: "034 16 118 50",
        phoneHref: "tel:+261341611850",
        quote:
          "Nous suivions nos stocks et nos ventes sur des cahiers. Aujourd'hui tout est centralisé : je vois ce qui manque, ce qui se vend et ce que je dois commander, sans ressaisir deux fois.",
        context: "ERP — stocks, ventes & trésorerie",
      },
      {
        name: "Tsena Fandrosoana",
        company: "Tsena Fandrosoana",
        phone: "038 98 18 975",
        phoneHref: "tel:+261389818975",
        quote:
          "L'application a remplacé nos fichiers Excel. Les encaissements, les clients et les rapports sont clairs, et l'équipe a été formée rapidement.",
        context: "Gestion commerciale & rapports",
      },
      {
        name: "Boulangerie Ando",
        company: "Boulangerie Ando",
        phone: "038 26 48 310",
        phoneHref: "tel:+261382648310",
        quote:
          "Nous avions besoin d'un outil simple pour la production et les ventes. Le résultat est fiable au quotidien et nous avons gagné du temps sur le suivi.",
        context: "Suivi de production & ventes",
      },
    ],
    note:
      "Témoignages recueillis auprès de clients dont j'ai conçu et livré l'application.",
  },
  contact: {
    directLabel: "ÉCRIRE DIRECTEMENT",
    recruiterLabel: "RECRUTEUR",
    recruiterTitle: "Un poste, un stage ou une alternance",
    recruiterText: "CV, disponibilité et références de projets.",
    clientLabel: "CLIENT",
    clientTitle: "Un produit à concevoir ou à fiabiliser",
    clientText: "Un premier échange de 30 minutes, sans engagement.",
    locationNote: "remote possible",
    cv: "CV PDF",
    types: [
      "Site ou application web",
      "Application mobile",
      "DevOps / CI-CD",
      "Qualité & tests",
      "Recrutement",
      "Autre",
    ],
    form: {
      head: "BRIEF / CONTACT",
      response: "RÉPONSE < 48 H",
      name: "Nom complet",
      namePlaceholder: "Votre nom",
      email: "E-mail",
      emailPlaceholder: "vous@entreprise.com",
      phone: "Téléphone (optionnel)",
      phonePlaceholder: "+261 ...",
      type: "Type de besoin",
      message: "Votre message",
      messagePlaceholder:
        "Le contexte, l'objectif, l'échéance... Quelques lignes suffisent pour commencer.",
      consent:
        "J'accepte que mes coordonnées soient utilisées uniquement pour répondre à cette demande.",
      submit: "Envoyer le message",
      pending: "Envoi en cours...",
      note: "Pas de newsletter, pas de revente de données. Seulement une réponse.",
      errorRequired:
        "Merci de renseigner votre nom, votre e-mail et votre message.",
      errorEmail: "L'adresse e-mail ne semble pas valide.",
      errorConsent:
        "Merci de confirmer que vos coordonnées peuvent être utilisées pour vous répondre.",
      errorSend:
        "L'envoi direct est indisponible pour le moment. Votre message est prêt : ouvrez votre messagerie pour me l'adresser.",
      fallbackLink: "Ouvrir ma messagerie",
      successTitle: "Message reçu.",
      successText:
        "Merci pour votre confiance. Je vous réponds sous 48 h ouvrées à l'adresse indiquée.",
      writeDirectly: "Écrire directement",
      another: "Envoyer un autre message",
    },
  },
  footer: {
    taglineLine1: "Ingénieur logiciel — web, mobile,",
    taglineLine2: "DevOps et testeur QA.",
    navLabel: "Navigation de pied de page",
    contactLabel: "CONTACT",
    cv: "CV PDF",
    backToTop: "Haut de page",
    rights: "Tous droits réservés.",
    built: "Conçu, développé et déployé avec Next.js.",
  },
  ui: {
    viewDemo: "Voir la démo",
    viewCode: "Code source",
    caseStudy: "Étude de cas sur demande",
    caseProblem: "Le problème",
    caseRole: "Mon rôle",
    caseOutcome: "Le résultat",
    technologies: "Technologies utilisées",
    archiveCode: "Code",
    archiveLab: "Lab",
    archiveRepoAria: "voir le code sur GitHub",
    visualAria: "Schéma conceptuel du projet",
    visualSystem: "SYSTEM_VIEW",
    visualReported: "Signalées",
    visualInProgress: "En cours",
    visualResolved: "Résolues",
    visualHighPriority: "Panne · priorité haute",
    visualTimeline: "Signalée → Assignée → Résolue",
    visualDashboard: "Tableau de bord",
    visualYear: "Exercice 2026",
    visualStock: "Stock",
    visualSales: "Ventes",
    visualClients: "Clients",
    visualTreasury: "Trésorerie",
    visualAutoTests: "Tests auto",
    visualLogs: "Logs",
    visualAlerts: "Alertes",
    visualConcept: "SCHÉMA CONCEPTUEL",
    galleryRegion: "Captures du projet",
    galleryPrev: "Capture précédente",
    galleryNext: "Capture suivante",
    galleryPause: "Mettre le défilement automatique en pause",
    galleryPlay: "Reprendre le défilement automatique",
    galleryChoose: "Choisir une capture",
    galleryCapture: "CAPTURE",
    galleryHint: "flèches / survol",
    galleryAuto: "auto · 5s",
    galleryHover: "survol",
    galleryPaused: "pause",
    galleryManual: "manuel",
    galleryPreview: "aperçu",
    galleryOf: "sur",
    galleryShow: "Afficher",
    stackLabel: "Technologies principales",
    copyEmail: "COPIER",
    copied: "COPIÉ",
    copyEmailAria: "Copier l'adresse e-mail dans le presse-papiers",
    copiedAria: "Adresse e-mail copiée",
    themeLabel: "Changer de thème clair ou sombre",
    languageLabel: "Langue du site",
    languageSwitch: "Passer le site en anglais",
    localTime: "heure locale",
    testimonialPhone: "Téléphone",
    contactCta: "Me contacter",
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
    navMain: "Navigation principale",
    navMobile: "Navigation mobile",
    brandAria: "Zo Mahefa — retour en haut",
    availability: "Disponible",
    skipLink: "Aller au contenu",
    deliverableLabel: "LIVRABLE",
    coordinatesAria:
      "Coordonnées GPS de Fianarantsoa : 21 degrés 27 minutes sud, 47 degrés 5 minutes est",
  },
  ai: {
    title: "Assistant IA",
    subtitle: "Posez une question sur mon parcours, mes projets ou mes compétences.",
    open: "Ouvrir l'assistant IA",
    close: "Fermer l'assistant",
    placeholder: "Votre question...",
    send: "Envoyer",
    thinking: "L'assistant réfléchit...",
    disclaimer:
      "Réponses générées par IA à partir de mon portfolio. Pour un échange humain, écrivez-moi.",
    fallback:
      "L'assistant est momentanément indisponible. Vous pouvez m'écrire directement.",
    suggestions: [
      "Quels sont tes projets les plus solides ?",
      "Quelles technologies QA maîtrises-tu ?",
      "Es-tu disponible pour un stage ou une mission ?",
    ],
    greeting:
      "Bonjour ! Je suis l'assistant du portfolio de Zo Mahefa. Posez-moi une question sur son parcours, ses projets, son stack ou sa disponibilité.",
    error:
      "Je n'ai pas pu répondre. Réessayez dans un instant ou écrivez directement à Zo Mahefa.",
    clear: "Nouvelle conversation",
  },
};

const en: SiteContent = {
  availability: "Internship · Apprenticeship · Mission",
  workModes: "On-site or remote",
  location: "Fianarantsoa, Madagascar",
  roles: ["Web & mobile developer", "DevOps engineer", "QA tester"],
  nav: [
    { id: "projets", label: "Work", index: "01" },
    { id: "expertise", label: "Expertise", index: "02" },
    { id: "methode", label: "Method", index: "03" },
    { id: "parcours", label: "Background", index: "04" },
    { id: "temoignages", label: "Testimonials", index: "05" },
    { id: "contact", label: "Contact", index: "06" },
  ],
  hero: {
    eyebrowLeft: "PORTFOLIO / 2026 EDITION",
    eyebrowCenter: "FIANARANTSOA, MADAGASCAR · UTC+3",
    eyebrowRight: "AVAILABLE FOR COLLABORATION",
    kicker: "Software engineer",
    title: {
      sr: "Zo Mahefa RANAIVO — Web & mobile developer, DevOps engineer and QA tester",
      line1: "From the first",
      line2Em: "commit",
      line2After: " to the",
      line3Em: "final",
      line3After: " test.",
    },
    roleLabel: "ROLE_",
    intro:
      "I build web and mobile applications, automate their delivery and make sure they stay reliable once live. A product, cloud and quality profile — without unnecessary jargon.",
    primaryCta: "See the proof",
    secondaryCta: "Discuss a project",
    cvCta: "CV PDF",
    cvAria: "Download Zo Mahefa's CV as a PDF",
    factsAria: "Practical information",
    figureLabel: "FIG. 01 / PORTRAIT",
    year: "2026",
    portraitAlt: "Portrait of Zo Mahefa RANAIVO",
    portraitBadge: "Open to work",
    focusLabel: "FOCUS",
    focus: "Web · Cloud · Quality",
    signature: "Zo Mahefa",
    noteLeft: "BASED IN FIANARANTSOA",
    noteRight: "REMOTE FRIENDLY ↗",
    stats: [
      { value: 9, pad: 2, label: "documented projects" },
      { value: 3, pad: 2, label: "areas of expertise" },
      { value: 8, pad: 2, label: "public repositories" },
      { value: 48, prefix: "<", suffix: "h", label: "response time" },
    ],
    scroll: "SCROLL",
  },
  sections: {
    projects: {
      index: "01",
      label: "Selected work",
      title: "Proof, not promises.",
      intro:
        "Three projects, three real problems. The context, my role and the outcome — with no number I cannot defend in an interview.",
    },
    expertise: {
      index: "02",
      label: "Expertise",
      title: "Three ways to make a product reliable.",
      intro:
        "I do not stack technologies for the sake of it: I connect the product, the infrastructure and quality to reduce surprises between demo and production.",
    },
    method: {
      index: "03",
      label: "Method",
      title: "A simple framework. Zero surprises.",
      intro:
        "The same thread for a client mission or joining a team: clarify, deliver in steps, document. Technology serves the outcome, not the other way around.",
    },
    about: {
      index: "04",
      label: "Background",
      title: "An engineer, not a logo collector.",
      intro:
        "An engineering education, internships close to production, and regular practice across code, infrastructure and testing.",
    },
    testimonials: {
      index: "05",
      label: "Testimonials",
      title: "They trusted me with their working tool.",
      intro:
        "Three clients, three concrete needs. Their feedback is about what really matters: day-to-day reliability and ease of use.",
    },
    contact: {
      index: "06",
      label: "Contact",
      title: "A project to scope? A team to strengthen?",
      intro:
        "Describe the context in a few lines. I reply within 48 business hours with a first read of the need and the next steps.",
    },
  },
  featuredProjects: [
    {
      id: "signaleo",
      index: "01",
      title: "Signaleo",
      subtitle: "Incident reporting · field & monitoring",
      year: "2025",
      category: "Web app / DevOps",
      summary:
        "A single tool to report an outage, locate it and track its resolution in real time.",
      context:
        "Final-year bachelor project, taken from scoping to production deployment and monitoring.",
      problem:
        "Interventions were tracked without a global view: scattered statuses, weak traceability and priorities that were hard to set in the field.",
      role:
        "Designed the reporting flow and admin dashboard, tracked statuses and built the Leaflet map, then containerisation, CI/CD, blue/green deployment and monitoring.",
      outcome:
        "A deployed and observed application, with a reproducible delivery pipeline and a clear view of ongoing interventions.",
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
          alt: "Screenshot of the incident reporting screen in Signaleo",
          label: "Reporting an incident",
        },
      ],
      repo: "https://github.com/Zomahefa/gestion-de-panne-devops",
      demo: "https://signaleo.onrender.com/",
      demoLabel: "Open the demo",
    },
    {
      id: "e-fandrosoana",
      index: "02",
      title: "E-Fandrosoana",
      subtitle: "Hardware store ERP · Boutique de l'Évolution",
      year: "2024 — 2025",
      category: "Product / Fullstack",
      summary:
        "An ERP to centralise stock, sales, suppliers, customers and cash flow.",
      context:
        "Freelance project: a daily management tool designed for a hardware retail business.",
      problem:
        "Management relied on spreadsheets and scattered entries, making stock and cash flow difficult to trust.",
      role:
        "Data modelling, secured Spring Boot REST API, React dashboards, PostgreSQL database and Docker environment.",
      outcome:
        "A single foundation to run the business, structured to welcome new modules without starting over.",
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
          alt: "Screenshot of the E-Fandrosoana dashboard",
          label: "Dashboard",
        },
        {
          src: "/projects/efandrosoana-stock.png",
          alt: "Screenshot of stock management in E-Fandrosoana",
          label: "Stock & replenishment",
        },
        {
          src: "/projects/efandrosoana-clients.png",
          alt: "Screenshot of customer management in E-Fandrosoana",
          label: "Customers & credit",
        },
        {
          src: "/projects/efandrosoana-factures.png",
          alt: "Screenshot of invoicing in E-Fandrosoana",
          label: "Invoices & quotes",
        },
        {
          src: "/projects/efandrosoana-parametres.png",
          alt: "Screenshot of E-Fandrosoana settings",
          label: "Settings & taxes",
        },
      ],
      privateCode: true,
    },
    {
      id: "pipeline-ci-cd",
      index: "03",
      title: "CI/CD pipeline & observability",
      subtitle: "An end-to-end delivery chain",
      year: "2024",
      category: "DevOps / Platform",
      summary:
        "Automate the build, deployment and monitoring of a web application on a VPS.",
      context:
        "Project carried out during a third-year internship, from infrastructure to production monitoring.",
      problem:
        "Manual deployments lengthened cycles and made incident detection difficult.",
      role:
        "Service containerisation, GitHub Actions pipeline, Nginx reverse proxy, blue/green deployment, Prometheus/Grafana metrics and centralised logs with Loki.",
      outcome:
        "An automated, reproducible and observable delivery flow, from commit to production.",
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
  ],
  archive: {
    kicker: "ARCHIVE / 06",
    title: "Other projects & labs",
    copy:
      "The rest of the field: desktop, networking, systems and academic projects. Public repositories are open.",
    footerNote: "NO DEAD LINKS — PRIVATE PROJECTS ARE FLAGGED",
    allRepos: "All my public repositories",
    projects: [
      {
        title: "Fuel station management",
        category: "Desktop · JavaFX",
        year: "2024",
        stack: "JavaFX · PostgreSQL",
        href: "https://github.com/Zomahefa/Gestion-de-station-essence",
        label: "Code",
      },
      {
        title: "TCP/IP instant messaging",
        category: "Network · Python",
        year: "2024",
        stack: "Python · Sockets · SQLite · bcrypt",
        href: "https://github.com/Zomahefa/serveur-de-messagerie-mousti-socket-",
        label: "Code",
      },
      {
        title: "Assignment management",
        category: "Java EE · Web",
        year: "ENI",
        stack: "JSP · Servlets · Hibernate",
        href: "https://github.com/Zomahefa/Gestion-des-affectations-des-employ-s",
        label: "Code",
      },
      {
        title: "Personal portfolio",
        category: "Website · Next.js",
        year: "2026",
        stack: "Next.js · TypeScript · Tailwind",
        href: "https://github.com/Zomahefa/site-personnel",
        label: "Code",
      },
      {
        title: "Linux & Windows Server administration",
        category: "Systems · ENI",
        year: "2023 — 2024",
        stack: "Active Directory · Bash · iptables",
        label: "Lab",
      },
      {
        title: "Networking, pfSense, Moodle & VoIP",
        category: "Infrastructure · ENI",
        year: "2023 — 2024",
        stack: "GNS3 · pfSense · Asterisk · Moodle",
        label: "Labs",
      },
    ],
  },
  practices: [
    {
      index: "A",
      title: "Web & mobile",
      intro:
        "Clear interfaces and solid APIs to turn a business process into a usable product.",
      deliverables: [
        "Business applications and dashboards",
        "Secured REST APIs and data modelling",
        "Responsive and accessible React/Next.js interfaces",
        "Flutter/Kotlin applications when needed",
      ],
      code: "UI / API / DATA",
    },
    {
      index: "B",
      title: "DevOps & cloud",
      intro:
        "Reproducible delivery, controlled environments and a production you can observe.",
      deliverables: [
        "CI/CD pipelines and reproducible environments",
        "Docker, Kubernetes and Infrastructure as Code",
        "Reverse proxy, secrets and hardening",
        "Monitoring, logs and alerting",
      ],
      code: "BUILD / SHIP / RUN",
    },
    {
      index: "C",
      title: "Quality & testing (QA)",
      intro:
        "Testing is not a final step: it is a discipline that secures every delivery, from manual scenarios to automated pipelines.",
      deliverables: [
        "Test plans, acceptance cases and defect reports",
        "Manual testing: user journeys, usability and business rules",
        "E2E automation with Playwright and Cypress",
        "API testing with Postman, Bruno and cURL",
        "Load testing with K6 / JMeter and CI/CD quality gates",
        "Campaign tracking in Jira, Xray, Zephyr or TestRail",
      ],
      code: "TEST / AUTOMATE / VERIFY",
    },
  ],
  stack: {
    kicker: "CORE STACK / REAL LEVELS",
    title: "What I can defend in an interview.",
    intro:
      "No invented percentages. Each level reflects real usage: production, a complete project or notions in progress.",
    footnote:
      "A TECHNOLOGY IS NOT A SKILL UNTIL IT HAS BEEN DELIVERED, TESTED AND EXPLAINED.",
    levels: [
      {
        level: "Production-ready",
        note: "Used on a complete project, defensible in an interview.",
        items: [
          "Java",
          "Spring Boot",
          "Spring Security",
          "PostgreSQL",
          "Docker",
          "GitHub Actions",
          "Linux",
          "React / Next.js",
          "Playwright",
          "Postman",
        ],
      },
      {
        level: "Operational",
        note: "Applied on real projects and environments.",
        items: [
          "Kubernetes",
          "Prometheus / Grafana",
          "Terraform",
          "Nginx",
          "Redis",
          "Django",
          "TypeScript",
          "JUnit / Vitest",
          "Cypress",
          "K6",
          "Jira / Xray",
        ],
      },
      {
        level: "Foundations",
        note: "Solid basics, continuously progressing.",
        items: [
          "AWS",
          "GCP",
          "ArgoCD",
          "Ansible",
          "Vault",
          "Flutter",
          "Kotlin",
          "ELK",
          "Selenium",
          "Appium",
          "JMeter",
          "TestRail",
        ],
      },
    ],
  },
  qa: {
    kicker: "QA / MANUAL & AUTOMATION",
    title: "Quality, from scenario to pipeline.",
    intro:
      "I cover both testing profiles: the manual QA who challenges user journeys and business rules, and the QA automation / SDET who industrialises tests in CI/CD.",
    categories: [
      {
        title: "Management & acceptance",
        note: "Test plans, campaigns, defects and traceability.",
        tools: ["Jira", "Xray", "Zephyr", "TestRail"],
      },
      {
        title: "API testing",
        note: "REST/GraphQL endpoints, HTTP statuses, JSON, JWT/OAuth.",
        tools: ["Postman", "Bruno", "Insomnia", "cURL"],
      },
      {
        title: "Automation",
        note: "Web and mobile E2E, cross-browser, TypeScript/Python.",
        tools: ["Playwright", "Cypress", "Selenium", "Appium"],
      },
      {
        title: "Performance & load",
        note: "Realistic scenarios, load ramps, CI integration.",
        tools: ["K6", "JMeter"],
      },
      {
        title: "CI/CD & environments",
        note: "Suites on every push, ephemeral containers.",
        tools: ["GitHub Actions", "GitLab CI", "Docker"],
      },
    ],
    mindset: [
      "Manual QA & SDET",
      "Critical thinking",
      "Attention to detail",
      "Risk-based prioritisation",
      "Reproducible defect reports",
    ],
    footnote:
      "A BUG FOUND BEFORE PRODUCTION COSTS LESS THAN AN INCIDENT SUFFERED BY THE USER.",
  },
  process: {
    steps: [
      {
        number: "01",
        title: "Scope",
        text: "Goal, perimeter, risks and success criteria. We align the need before writing the first line.",
        deliverable: "Mini project brief",
      },
      {
        number: "02",
        title: "Build",
        text: "Short iterations, a demo at every step and documented decisions. No black box.",
        deliverable: "Tested increments",
      },
      {
        number: "03",
        title: "Deliver",
        text: "Tests, pipeline, environments and backups. Going live must be a procedure, not a feat.",
        deliverable: "Reproducible deployment",
      },
      {
        number: "04",
        title: "Observe",
        text: "Metrics, logs, fixes and handover. The product stays understandable after delivery.",
        deliverable: "Runbook & documentation",
      },
    ],
    engagements: [
      "First 30-minute conversation",
      "Quote within 5 business days",
      "Code and documentation delivered",
      "Reply within 48 business hours",
    ],
    engagementsKicker: "COMMITMENTS / SIMPLE",
    engagementsTitle: "Clear rules before we even start.",
    cta: "Scope a need",
  },
  pipeline: {
    label: "Delivery chain",
    title: "From commit to monitoring.",
    intro:
      "Delivery does not stop at deployment. Every step leaves a trace, every incident can be understood.",
    principleLabel: "Principle:",
    principle:
      "a deployment must be replayable, observable and reversible. No copy-paste into production.",
    deliverablesLabel: "DELIVERABLES / RUNBOOK",
    deliverables:
      "Pipeline, rollback procedure and monitoring documentation delivered with the project.",
    cta: "Scope a project",
    footerLeft: "REPLAYABLE FLOW · TESTS · LOGS · METRICS",
    footerRight: "DOCKER / GH ACTIONS / PROMETHEUS / VERCEL",
    steps: [
      {
        number: "01",
        title: "Commit",
        label: "Git push",
        text: "One branch, one intent, one readable history.",
      },
      {
        number: "02",
        title: "Test",
        label: "Quality",
        text: "Automated tests and static analysis before any deployment.",
      },
      {
        number: "03",
        title: "Build",
        label: "Artifact",
        text: "An immutable Docker image, built only once.",
      },
      {
        number: "04",
        title: "Ship",
        label: "Delivery",
        text: "Controlled deployment with a rollback strategy.",
      },
      {
        number: "05",
        title: "Observe",
        label: "Production",
        text: "Metrics, logs and alerts to see incidents coming.",
      },
    ],
  },
  about: {
    lead:
      "My name is Zo Mahefa RANAIVO. I build useful applications, then make sure they hold up.",
    body1:
      "Trained at ENI, I learned to connect the product, the system and quality. My projects range from business ERPs to CI/CD pipelines, through monitoring and testing. What drives me: understand the need, choose the right level of complexity and leave a system that others can understand.",
    body2:
      "I document my decisions, test what I deliver and treat going live as part of the work — not a formality.",
    targetKicker: "WHAT I AM LOOKING FOR",
    targetItems: [
      "Web & mobile · backend",
      "DevOps & cloud",
      "Quality & automation",
    ],
    languagesLabel: "LANGUAGES",
    languages:
      "French fluent · Technical English (documentation and written exchanges) · Malagasy native",
    formatLabel: "FORMAT",
    format: "Remote friendly · reply within 48 business hours",
    cvCta: "Download CV",
    experienceTitle: "Experience",
    experienceCount: "03 POSITIONS / INTERNSHIPS",
    educationTitle: "Education",
    educationSchool: "ENI FIANARANTSOA",
    certificationsTitle: "Certifications",
    certificationsNote: "VERIFIABLE CERTIFICATES",
    certificationOpen: "Open the certificate",
    certificationSee: "View the PDF certificate",
    softKicker: "SOFT SKILLS / WHAT SHOWS IN THE WORK",
    softTitle: "Technical skill is proven. Behaviour too.",
    softIntro:
      "Not a list of words in a CV corner: every quality is tied to a concrete project, internship or team situation.",
    experiences: [
      {
        period: "2024 — Present",
        title: "Web developer & DevOps",
        company: "Freelance · Personal projects",
        text: "Design and development of business applications: Spring Boot or Django APIs, React interfaces, Docker containerisation, CI/CD pipelines and monitoring. An end-to-end practice, from need to production.",
        tags: ["Spring Boot", "React", "Docker", "CI/CD"],
      },
      {
        period: "2024",
        title: "Third-year internship — CI/CD & monitoring",
        company: "Professional internship",
        text: "Built a delivery chain for a React/Django/MySQL application on a VPS: Docker Compose, GitHub Actions, Nginx, blue/green deployment, Prometheus, Grafana and Loki.",
        tags: ["Docker", "GitHub Actions", "Nginx", "Observability"],
      },
      {
        period: "2023 — 2024",
        title: "Second-year internship — Systems & networking",
        company: "Spray Info · Fianarantsoa",
        text: "Deployed a Moodle server on Ubuntu with video conferencing, Linux administration, user management and hardening. Routing and firewall labs with GNS3 and pfSense.",
        tags: ["Linux", "Moodle", "GNS3", "pfSense"],
      },
    ],
    education: [
      {
        period: "2025 — 2026",
        title: "Master 1 in Computer Science",
        school: "ENI — École Nationale d'Informatique",
        detail: "Information systems engineering. Currently enrolled.",
      },
      {
        period: "2022 — 2025",
        title: "Bachelor's degree in Computer Science",
        school: "ENI — École Nationale d'Informatique",
        detail: "Graduated with honours. Development, systems, networking and security.",
      },
    ],
    certifications: [
      {
        title: "Spring Boot certification",
        issuer: "Mind Luster",
        year: "2026",
        image: "/certifcatSping-boot2.jpeg",
        href: "/certificatSpringBoot.pdf",
      },
      {
        title: "UML certification",
        issuer: "Mind Luster",
        year: "2026",
        image: "/uml-certification.jpeg",
        href: "/uml-certification-zo.pdf",
      },
    ],
    softSkills: [
      {
        title: "Problem solving",
        text: "Start from the symptom, isolate the cause, choose the simplest fix and verify it holds.",
        proof:
          "Diagnostics on pipelines, environments and production incidents.",
      },
      {
        title: "Communication",
        text: "Turn a business need into understandable technical decisions, without hiding constraints.",
        proof:
          "Scoping, documentation and project handovers to non-technical stakeholders.",
      },
      {
        title: "Adaptability",
        text: "Move from a web context to DevOps or QA without losing sight of the product.",
        proof:
          "Projects taken from React to Spring Boot, then from Docker to monitoring.",
      },
      {
        title: "Fast learning",
        text: "Learn a tool because a project needs it, then put it into real practice.",
        proof:
          "Docker, GitHub Actions, Prometheus, Grafana and Terraform learned by doing.",
      },
      {
        title: "Autonomy & ownership",
        text: "Own a topic from scoping to production, including the unglamorous parts.",
        proof: "Freelance and academic projects led end to end.",
      },
      {
        title: "Teamwork",
        text: "Share context, document choices and make the next person's work easier.",
        proof:
          "Academic projects, internships and collaboration around Git repositories.",
      },
      {
        title: "Rigour",
        text: "Prefer a reproducible procedure over an accidental success.",
        proof:
          "Tests, acceptance checklists, documentation and replayable deployments.",
      },
      {
        title: "Critical thinking (QA)",
        text: "Look for what can break before the user does, without assuming the happy path is enough.",
        proof:
          "Edge cases, non-regression tests and systematic scenario reviews.",
      },
      {
        title: "Attention to detail",
        text: "A label, a status, an edge case: invisible details make the difference in acceptance.",
        proof:
          "Reproducible defect reports and functional acceptance checklists.",
      },
      {
        title: "Technical curiosity",
        text: "Understand what happens under the abstraction before adding another layer.",
        proof:
          "Regular watch and experimentation around infrastructure and quality.",
      },
    ],
  },
  testimonials: {
    items: [
      {
        name: "Quincaillerie Boutique de l'Évolution",
        company: "Boutique de l'Évolution · Hardware store",
        phone: "034 16 118 50",
        phoneHref: "tel:+261341611850",
        quote:
          "We used to track stock and sales in notebooks. Now everything is centralised: I can see what is missing, what sells and what to order, without entering data twice.",
        context: "ERP — stock, sales & cash flow",
      },
      {
        name: "Tsena Fandrosoana",
        company: "Tsena Fandrosoana",
        phone: "038 98 18 975",
        phoneHref: "tel:+261389818975",
        quote:
          "The app replaced our Excel files. Payments, customers and reports are clear, and the team was trained quickly.",
        context: "Sales management & reporting",
      },
      {
        name: "Boulangerie Ando",
        company: "Boulangerie Ando",
        phone: "038 26 48 310",
        phoneHref: "tel:+261382648310",
        quote:
          "We needed a simple tool for production and sales. The result is reliable every day and we save time on tracking.",
        context: "Production & sales tracking",
      },
    ],
    note:
      "Testimonials collected from clients whose application I designed and delivered.",
  },
  contact: {
    directLabel: "WRITE DIRECTLY",
    recruiterLabel: "RECRUITER",
    recruiterTitle: "A job, an internship or an apprenticeship",
    recruiterText: "CV, availability and project references.",
    clientLabel: "CLIENT",
    clientTitle: "A product to design or make reliable",
    clientText: "A first 30-minute conversation, no strings attached.",
    locationNote: "remote possible",
    cv: "CV PDF",
    types: [
      "Website or web application",
      "Mobile application",
      "DevOps / CI-CD",
      "Quality & testing",
      "Recruitment",
      "Other",
    ],
    form: {
      head: "BRIEF / CONTACT",
      response: "REPLY < 48 H",
      name: "Full name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@company.com",
      phone: "Phone (optional)",
      phonePlaceholder: "+261 ...",
      type: "Type of need",
      message: "Your message",
      messagePlaceholder:
        "The context, the goal, the deadline... A few lines are enough to start.",
      consent:
        "I agree that my contact details will be used only to reply to this request.",
      submit: "Send message",
      pending: "Sending...",
      note: "No newsletter, no data resale. Just an answer.",
      errorRequired: "Please fill in your name, email and message.",
      errorEmail: "This email address does not look valid.",
      errorConsent:
        "Please confirm that your contact details can be used to reply to you.",
      errorSend:
        "Direct sending is unavailable right now. Your message is ready: open your mail app to send it to me.",
      fallbackLink: "Open my mail app",
      successTitle: "Message received.",
      successText:
        "Thank you for your trust. I will reply within 48 business hours to the address provided.",
      writeDirectly: "Write directly",
      another: "Send another message",
    },
  },
  footer: {
    taglineLine1: "Software engineer — web, mobile,",
    taglineLine2: "DevOps and QA tester.",
    navLabel: "Footer navigation",
    contactLabel: "CONTACT",
    cv: "CV PDF",
    backToTop: "Back to top",
    rights: "All rights reserved.",
    built: "Designed, built and deployed with Next.js.",
  },
  ui: {
    viewDemo: "View demo",
    viewCode: "Source code",
    caseStudy: "Case study on request",
    caseProblem: "The problem",
    caseRole: "My role",
    caseOutcome: "The outcome",
    technologies: "Technologies used",
    archiveCode: "Code",
    archiveLab: "Lab",
    archiveRepoAria: "view the code on GitHub",
    visualAria: "Conceptual diagram of the project",
    visualSystem: "SYSTEM_VIEW",
    visualReported: "Reported",
    visualInProgress: "In progress",
    visualResolved: "Resolved",
    visualHighPriority: "Outage · high priority",
    visualTimeline: "Reported → Assigned → Resolved",
    visualDashboard: "Dashboard",
    visualYear: "Fiscal year 2026",
    visualStock: "Stock",
    visualSales: "Sales",
    visualClients: "Customers",
    visualTreasury: "Cash flow",
    visualAutoTests: "Automated tests",
    visualLogs: "Logs",
    visualAlerts: "Alerts",
    visualConcept: "CONCEPTUAL DIAGRAM",
    galleryRegion: "Project screenshots",
    galleryPrev: "Previous screenshot",
    galleryNext: "Next screenshot",
    galleryPause: "Pause automatic scrolling",
    galleryPlay: "Resume automatic scrolling",
    galleryChoose: "Choose a screenshot",
    galleryCapture: "CAPTURE",
    galleryHint: "arrows / hover",
    galleryAuto: "auto · 5s",
    galleryHover: "hover",
    galleryPaused: "paused",
    galleryManual: "manual",
    galleryPreview: "preview",
    galleryOf: "of",
    galleryShow: "Show",
    stackLabel: "Main technologies",
    copyEmail: "COPY",
    copied: "COPIED",
    copyEmailAria: "Copy the email address to the clipboard",
    copiedAria: "Email address copied",
    themeLabel: "Switch between light and dark theme",
    languageLabel: "Site language",
    languageSwitch: "Switch the site to French",
    localTime: "local time",
    testimonialPhone: "Phone",
    contactCta: "Contact me",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    navMain: "Main navigation",
    navMobile: "Mobile navigation",
    brandAria: "Zo Mahefa — back to top",
    availability: "Available",
    skipLink: "Skip to content",
    deliverableLabel: "DELIVERABLE",
    coordinatesAria:
      "GPS coordinates of Fianarantsoa: 21 degrees 27 minutes south, 47 degrees 5 minutes east",
  },
  ai: {
    title: "AI assistant",
    subtitle: "Ask a question about my background, projects or skills.",
    open: "Open the AI assistant",
    close: "Close the assistant",
    placeholder: "Your question...",
    send: "Send",
    thinking: "The assistant is thinking...",
    disclaimer:
      "AI-generated answers based on my portfolio. For a human conversation, write to me.",
    fallback:
      "The assistant is temporarily unavailable. You can write to me directly.",
    suggestions: [
      "What are your strongest projects?",
      "Which QA tools do you master?",
      "Are you available for an internship or a mission?",
    ],
    greeting:
      "Hello! I am the assistant for Zo Mahefa's portfolio. Ask me anything about his background, projects, stack or availability.",
    error:
      "I could not answer. Please try again in a moment or write directly to Zo Mahefa.",
    clear: "New conversation",
  },
};

export const contentByLocale: Record<Locale, SiteContent> = { fr, en };
export const defaultContent = fr;

export function getContent(locale: Locale): SiteContent {
  return contentByLocale[locale] ?? fr;
}

export function mailtoForProject(title: string) {
  const subject = encodeURIComponent(`Étude de cas — ${title}`);
  return `mailto:${site.email}?subject=${subject}`;
}
