import { NextResponse } from "next/server";
import { getAllProjects, createProject } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";

const seedProjects = [
  {
    title: "NexaFlow",
    description:
      "Plateforme SaaS de gestion de workflow avec éditeur drag-and-drop, authentification JWT, notifications temps réel via WebSockets. Déploiement automatisé sur AWS ECS via pipeline CI/CD GitHub Actions avec infrastructure Terraform et monitoring Prometheus.",
    category: "fullstack",
    technologies: [
      "Next.js 16",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "Docker",
      "AWS ECS",
      "Terraform",
      "GitHub Actions",
    ],
    image: "/images/NexaFlow.jpeg",
    github: "https://github.com/Zomahefa",
    demo: "https://github.com/Zomahefa",
  },
  {
    title: "EcoTrack",
    description:
      "Application de suivi d'empreinte carbone avec dashboard analytique, microservices Node.js conteneurisés, déploiement Kubernetes avec auto-scaling, monitoring Prometheus/Grafana et pipeline CI/CD ArgoCD.",
    category: "fullstack",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Docker",
      "Kubernetes",
      "ArgoCD",
      "Prometheus",
      "Grafana",
    ],
    image: "/images/ecoTrack.jpeg",
    github: "https://github.com/Zomahefa",
    demo: "https://github.com/Zomahefa",
  },
  {
    title: "MediConnect",
    description:
      "Application de télémédecine avec visioconférence WebRTC, système de rendez-vous intelligent, gestion sécurisée RGPD. Déploiement AWS avec infrastructure Terraform, conteneurisation Docker et monitoring de bout en bout.",
    category: "fullstack",
    technologies: [
      "Next.js",
      "TypeScript",
      "WebRTC",
      "PostgreSQL",
      "Redis",
      "Terraform",
      "AWS",
      "Docker",
    ],
    image: "",
    github: "https://github.com/Zomahefa",
  },
  {
    title: "CryptoSight",
    description:
      "Dashboard temps réel pour le suivi des cryptomonnaies avec graphiques interactifs, alertes personnalisées, API gateway avec rate limiting et caching Redis. Architecture serverless AWS (Lambda + DynamoDB) déployée via Terraform.",
    category: "fullstack",
    technologies: [
      "React",
      "Node.js",
      "GraphQL",
      "Redis",
      "Docker",
      "AWS Lambda",
      "DynamoDB",
      "Terraform",
    ],
    image: "/images/criptoSight.jpeg",
    github: "https://github.com/Zomahefa",
    demo: "https://github.com/Zomahefa",
  },
  {
    title: "Gestion de Station Essence — JavaFX",
    description:
      "Application de bureau pour la gestion complète d'une station essence : gestion des pompes, ventes de carburant, inventaire, clients, fournisseurs, rapports financiers et statistiques. Conception et développement JavaFX avec base de données PostgreSQL. Projet ENI — L2.",
    category: "fullstack",
    technologies: ["JavaFX", "PostgreSQL", "Java", "SQL", "Java FXML"],
    image: "/images/essence.png",
    github: "https://github.com/Zomahefa",
  },
  {
    title: "ERP Quincaillerie — Boutique de l'Évolution",
    description:
      "Application ERP complète pour la gestion d'une quincallerie. Gestion des stocks, produits, ventes, fournisseurs, clients, trésorerie, rapports financiers et tableaux de bord. Projet personnel / Freelance.",
    category: "fullstack",
    technologies: [
      "Nest.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Docker",
      "Tailwind CSS",
    ],
    image: "/images/ERP.png",
    github: "https://github.com/Zomahefa",
  },
  {
    title: "CI/CD Sécurisé & Scalable",
    description:
      "Pipeline CI/CD complet pour une application React.js/Django/MySQL. Build, test, déploiement sur VPS avec Docker/Docker Compose. Monitoring Prometheus/Grafana/Loki. Infrastructure sécurisée Nginx reverse proxy. Projet créé de A à Z lors du Stage L3.",
    category: "devops",
    technologies: [
      "Docker",
      "Docker Compose",
      "GitHub Actions",
      "Nginx",
      "VPS",
      "Prometheus",
      "Grafana",
      "Loki",
      "Node Exporter",
      "MySQL Exporter",
    ],
    image: "/images/pipeline pro.png",
    github: "https://github.com/Zomahefa",
  },
  {
    title: "InfraStack — IaC Multi-Cloud",
    description:
      "Infrastructure as Code complète avec Terraform pour déploiement multi-cloud (AWS + GCP). CI/CD GitHub Actions, GitOps ArgoCD, monitoring Prometheus/Grafana/ELK, gestion des secrets Vault. Infrastructure scalable et reproductible.",
    category: "devops",
    technologies: [
      "Terraform",
      "Kubernetes",
      "Docker",
      "GitHub Actions",
      "ArgoCD",
      "Prometheus",
      "Grafana",
      "ELK Stack",
      "Vault",
    ],
    image: "/images/infraStack.jpeg",
    github: "https://github.com/Zomahefa",
  },
  {
    title: "PipeLine Pro — CI/CD Générique",
    description:
      "Pipeline CI/CD générique : analyse statique SonarQube, tests, scanning Trivy, build multi-stage Docker, déploiement blue/green Kubernetes via Helm. Gestion centralisée des secrets avec Vault. Solution réutilisable pour tout projet.",
    category: "devops",
    technologies: [
      "Jenkins",
      "Docker",
      "Kubernetes",
      "SonarQube",
      "Trivy",
      "Helm",
      "Vault",
      "ArgoCD",
    ],
    image: "/images/pipeline pro.png",
    github: "https://github.com/Zomahefa",
  },
  {
    title: "CloudGuard — Sécurité Cloud",
    description:
      "Solution de sécurité cloud : détection d'intrusion Wazuh, analyse logs ELK, automatisation des réponses aux incidents via Ansible. Infrastructure Terraform, conteneurs Docker orchestrés. Protection des applications en production.",
    category: "devops",
    technologies: [
      "AWS",
      "Ansible",
      "Wazuh",
      "ELK",
      "Python",
      "Docker",
      "Terraform",
      "Kubernetes",
    ],
    image: "/images/infraStack.jpeg",
    github: "https://github.com/Zomahefa",
  },
  {
    title: "ZM Portfolio",
    description:
      "Portfolio nouvelle génération : Next.js 16, Shadcn UI, Framer Motion, intégration IA Groq, base SQLite/Turso. Déploiement automatisé et bonnes pratiques DevOps.",
    category: "fullstack",
    technologies: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "Framer Motion",
      "Groq AI",
      "Docker",
    ],
    image: "/portfolio-image.png",
    github: "https://github.com/Zomahefa",
    demo: "https://github.com/Zomahefa",
  },
  {
    title: "VeloTrack — Application Mobile Sportive",
    description:
      "Application mobile cross-platform (React Native) pour suivi d'activités cyclistes : GPS, statistiques, objectifs, partage social. API backend Node.js/PostgreSQL, déploiement automatisé et monitoring DevOps.",
    category: "mobile",
    technologies: [
      "React Native",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
    ],
    image: "/images/veloTrack.jpeg",
    github: "https://github.com/Zomahefa",
    /* demo: "", */
  },
  {
    title: "MarchéExpress — E-commerce Mobile",
    description:
      "Application mobile e-commerce : catalogue, panier, paiement mobile, livraison. Architecture microservices, CI/CD, monitoring complet.",
    category: "mobile",
    technologies: [
      "React Native",
      "FastAPI",
      "Redis",
      "Docker",
      "Kubernetes",
      "Stripe",
    ],
    image: "/images/MarcheExpress.jpeg",
    github: "https://github.com/Zomahefa",
    /* demo: "", */
  },
  {
    title: "Portail Captif & Pare-feu — pfSense",
    description:
      "Portail captif avec tickets/voucher et pare-feu pfSense : règles de filtrage, NAT, VLAN, QoS. Projet L3 ENI — Administration Réseau.",
    category: "admin",
    technologies: ["pfSense", "VLAN", "NAT", "Captive Portal", "Firewall"],
    image: "/images/pfsens.png",
    github: "",
    /* demo: "", */
  },
  {
    title: "Serveur VOIP sous Ubuntu",
    description:
      "Serveur VOIP complet Ubuntu/Asterisk/FreePBX : routage d'appels, messagerie vocale, conférence téléphonique. Projet L3 ENI — Téléphonie IP.",
    category: "admin",
    technologies: ["Ubuntu", "Asterisk", "FreePBX", "VOIP", "SIP"],
    image: "/images/VOIP server.png",
    github: "",
    /* demo: "", */
  },
  {
    title: "Serveur Moodle avec Visioconférence",
    description:
      "Déploiement Moodle + BigBlueButton pour visioconférence. Gestion utilisateurs, cours, plugins. Stage L2 — Spray Info.",
    category: "admin",
    technologies: ["Moodle", "BigBlueButton", "Linux", "Apache", "MySQL"],
    image: "/images/moodle server.png",
    github: "",
    /* demo: "", */
  },
  {
    title: "Administration Windows Server",
    description:
      "Configuration Windows Server complète : Active Directory, GPO, DHCP, DNS, partage fichiers, gestion utilisateurs. Infrastructure sécurisée pour domaine d'entreprise. Projet L2 ENI.",
    category: "admin",
    technologies: ["Windows Server", "Active Directory", "DHCP", "DNS", "GPO"],
    image: "/images/windows server.png",
    github: "",
    /* demo: "", */
  },
  {
    title: "Administration Système Linux",
    description:
      "Administration serveurs Linux : configuration réseau, gestion utilisateurs, scripts bash, durcissement sécurité, iptables, monitoring. Projet L2 ENI.",
    category: "admin",
    technologies: ["Linux", "Bash", "iptables", "Apache", "Monitoring"],
    image: "/images/linux server.png",
    github: "",
    /* demo: "", */
  },
  {
    title: "Routage IP avec GNS3",
    description:
      "Simulation réseaux complexes GNS3 : routage OSPF/BGP, VLAN, STP, NAT, sécurisation. Conception architecture réseau PME.",
    category: "admin",
    technologies: ["GNS3", "Cisco IOS", "OSPF", "BGP", "VLAN"],
    image: "/images/GNS3.png",
    github: "",
    /* demo: "", */
  },
];

async function seedIfEmpty() {
  const existing = await getAllProjects();
  const existingCategories = new Set(existing.map((p: any) => p.category));
  const neededCategories = new Set(seedProjects.map((p) => p.category));

  for (const cat of neededCategories) {
    if (!existingCategories.has(cat)) {
      for (const p of seedProjects.filter((sp) => sp.category === cat)) {
        await createProject(
          Date.now().toString() + Math.random().toString(36).slice(2, 6),
          p.title,
          p.description,
          p.category,
          p.technologies,
          p.image || "",
          p.github || "",
          p.demo || "",
        );
      }
    }
  }
}

export async function GET() {
  await seedIfEmpty();
  const projects = await getAllProjects();
  return NextResponse.json(
    projects.map((p: any) => ({
      ...p,
      technologies: JSON.parse(p.technologies),
    })),
  );
}

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!verifyPassword(authHeader)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { title, description, category, technologies, image, github, demo } =
      await request.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: "Titre et description requis" },
        { status: 400 },
      );
    }

    const id = Date.now().toString();
    await createProject(
      id,
      title,
      description,
      category || "fullstack",
      technologies || [],
      image || "",
      github || "",
      demo || "",
    );

    return NextResponse.json({ id, success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
