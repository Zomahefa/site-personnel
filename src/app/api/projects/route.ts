import { NextResponse } from "next/server";
import { getAllProjects, createProject, getDb } from "@/lib/db";
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
    image: "",
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
    image: "",
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
    image: "",
    github: "https://github.com/Zomahefa",
    demo: "https://github.com/Zomahefa",
  },
  {
    title: "InfraStack",
    description:
      "Infrastructure as Code complète avec Terraform pour déploiement multi-cloud (AWS + GCP). Automatisation CI/CD avec GitHub Actions, GitOps via ArgoCD, monitoring centralisé (Prometheus/Grafana/ELK) et gestion des secrets avec Vault.",
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
    image: "",
    github: "https://github.com/Zomahefa",
  },
  {
    title: "PipeLine Pro",
    description:
      "Pipeline CI/CD générique automatisant l'analyse statique (SonarQube), les tests, le scanning de vulnérabilités (Trivy), le build multi-stage Docker et le déploiement blue/green sur Kubernetes via Helm. Gestion centralisée des secrets avec Vault.",
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
    image: "",
    github: "https://github.com/Zomahefa",
  },
  {
    title: "CloudGuard",
    description:
      "Solution de sécurité cloud avec détection d'intrusion (Wazuh), analyse de logs temps réel (ELK), automatisation des réponses aux incidents via playbooks Ansible. Infrastructure déployée et versionnée avec Terraform, conteneurs Docker orchestrés.",
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
    image: "",
    github: "https://github.com/Zomahefa",
  },
  {
    title: "ZM Portfolio",
    description:
      "Portfolio nouvelle génération : Next.js 16, Shadcn UI, Framer Motion, intégration IA Groq, base SQLite. Déploiement Docker automatisé via CI/CD GitHub Actions, monitoring, et application des bonnes pratiques DevOps.",
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
    image: "",
    github: "https://github.com/Zomahefa",
    demo: "https://github.com/Zomahefa",
  },
  {
    title: "VeloTrack — Application Mobile de Suivi Sportif",
    description:
      "Application mobile cross-platform (React Native) pour le suivi d'activités cyclistes : GPS, statistiques, objectifs et partage social. API backend Node.js/PostgreSQL, déploiement automatisé et monitoring DevOps.",
    category: "mobile",
    technologies: ["React Native", "Node.js", "PostgreSQL", "Docker", "GitHub Actions"],
    image: "",
    github: "https://github.com/Zomahefa",
    demo: "",
  },
  {
    title: "MarchéExpress — Application Mobile E-commerce",
    description:
      "Application mobile de e-commerce local avec catalogue, panier, paiement mobile et livraison. Architecture microservices, CI/CD, et monitoring complet.",
    category: "mobile",
    technologies: ["React Native", "FastAPI", "Redis", "Docker", "Kubernetes", "Stripe"],
    image: "",
    github: "https://github.com/Zomahefa",
    demo: "",
  },
  {
    title: "Portail Captif & Pare-feu — pfSense",
    description:
      "Mise en place d'un portail captif avec système de tickets/voucher et gestion de pare-feu sur pfSense. Configuration des règles de filtrage, NAT, VLAN et QoS. Projet L3 ENI — Administration Réseau.",
    category: "admin",
    technologies: ["pfSense", "VLAN", "NAT", "Captive Portal", "Firewall"],
    image: "",
    github: "",
    demo: "",
  },
  {
    title: "Serveur VOIP sous Ubuntu",
    description:
      "Déploiement et configuration d'un serveur VOIP complet sous Ubuntu avec Asterisk/FreePBX. Routage d'appels, messagerie vocale, conférence téléphonique. Projet L3 ENI — Téléphonie sur IP.",
    category: "admin",
    technologies: ["Ubuntu", "Asterisk", "FreePBX", "VOIP", "SIP"],
    image: "",
    github: "",
    demo: "",
  },
  {
    title: "Mise en place d'un serveur Moodle avec Visioconférence",
    description:
      "Déploiement d'un serveur Moodle intégré avec solution de visioconférence (BigBlueButton). Gestion des utilisateurs, cours, et plugins. Stage L2 — Spray Info.",
    category: "admin",
    technologies: ["Moodle", "BigBlueButton", "Linux", "Apache", "MySQL"],
    image: "",
    github: "",
    demo: "",
  },
  {
    title: "Administration Windows Server",
    description:
      "Configuration complète d'un environnement Windows Server : Active Directory, GPO, DHCP, DNS, partage de fichiers et gestion des utilisateurs. Mise en place d'une infrastructure sécurisée pour un domaine d'entreprise. Projet L2 ENI.",
    category: "admin",
    technologies: ["Windows Server", "Active Directory", "DHCP", "DNS", "GPO"],
    image: "",
    github: "",
    demo: "",
  },
  {
    title: "Administration Système Linux",
    description:
      "Administration de serveurs Linux : configuration réseau, gestion des utilisateurs, automatisation des tâches avec scripts bash, durcissement de sécurité, pare-feu iptables et monitoring système. Projet L2 ENI.",
    category: "admin",
    technologies: ["Linux", "Bash", "iptables", "Apache", "Monitoring"],
    image: "",
    github: "",
    demo: "",
  },
  {
    title: "Routage IP avec GNS3",
    description:
      "Simulation et configuration de réseaux complexes avec GNS3 : routage statique et dynamique (OSPF, BGP), VLAN, STP, NAT, et sécurisation des accès. Conception d'architecture réseau pour une PME.",
    category: "admin",
    technologies: ["GNS3", "Cisco IOS", "OSPF", "BGP", "VLAN"],
    image: "",
    github: "",
    demo: "",
  },
];

function seedIfEmpty() {
  const existing = getAllProjects();
  const existingCategories = new Set(existing.map((p) => p.category));
  const neededCategories = new Set(seedProjects.map((p) => p.category));

  for (const cat of neededCategories) {
    if (!existingCategories.has(cat)) {
      for (const p of seedProjects.filter((sp) => sp.category === cat)) {
        createProject(
          Date.now().toString() + Math.random().toString(36).slice(2, 6),
          p.title,
          p.description,
          p.category,
          p.technologies,
          p.image || "",
          p.github || "",
          p.demo || ""
        );
      }
    }
  }
}

export async function GET() {
  seedIfEmpty();
  const projects = getAllProjects().map((p) => ({
    ...p,
    technologies: JSON.parse(p.technologies),
  }));
  return NextResponse.json(projects);
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
        { status: 400 }
      );
    }

    const id = Date.now().toString();
    createProject(
      id,
      title,
      description,
      category || "fullstack",
      technologies || [],
      image || "",
      github || "",
      demo || ""
    );

    return NextResponse.json({ id, success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
