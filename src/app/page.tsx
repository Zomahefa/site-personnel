"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Cloud,
  Smartphone,
  Download,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/animated-section";
import { ProjectMatcher } from "@/components/project-matcher";
import { ProjectCard } from "@/components/project-card";
import { ContactForm } from "@/components/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "zomahefa.ranaivo@gmail.com",
    href: "mailto:zomahefa.ranaivo@gmail.com",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+261 38 54 422 52",
    href: "tel:+261385442252",
  },
  {
    icon: MapPin,
    label: "Localisation",
    value: "Fianarantsoa, Madagascar",
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "github.com/Zomahefa",
    href: "https://github.com/Zomahefa",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "Zo Mahefa RANAIVO",
    href: "https://www.linkedin.com/in/zo-mahefa-ranaivo-338026346/",
  },
];

const services = [
  {
    icon: Code2,
    title: "Développement Fullstack",
    description:
      "Applications web modernes de la conception au déploiement. Frontend réactif, API robustes, bases de données optimisées.",
  },
  {
    icon: Cloud,
    title: "DevOps & Infrastructure",
    description:
      "CI/CD, conteneurisation Docker, orchestration Kubernetes, Infrastructure as Code (Terraform), cloud AWS/GCP, monitoring et automatisation complète.",
  },
  {
    icon: Smartphone,
    title: "Applications Mobiles",
    description: "Solutions cross-platform avec React Native.",
  },
];

const techStack = [
  "Next.js",
  "React.js",
  "Tailwind CSS",
  "Shadcn UI",
  "React native",
  "TypeScript",
  "Node.js",
  "Python",
  "Nest.js",
  "FastAPI",
  "Nginx",
  "Traefik",
  "Rest API",
  "Docker",
  "Docker Compose",
  "Kubernetes",
  "AWS",
  "CI/CD",
  "Terraform",
  "Ansible",
  "GitHub Actions",
  "ArgoCD",
  "Helm",
  "Prometheus",
  "Grafana",
  "ELK",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "GraphQL",
  "Vault",
  "SonarQube",
];

const PortfolioProjectStatic = {
  id: "portfolio",
  title: "Ce Portfolio — ZM Portfolio",
  description:
    "Portfolio nouvelle génération : Next.js 16, Shadcn UI, Framer Motion, base SQLite. Déploiement Docker automatisé via CI/CD GitHub Actions, monitoring, et application des bonnes pratiques DevOps.",
  category: "fullstack" as const,
  technologies: [
    "Next.js 16",
    "TypeScript",
    "Tailwind CSS",
    "Shadcn UI",
    "Framer Motion",
    "Docker",
  ],
  image: "/portfolio-image.png",
  github: "https://github.com/Zomahefa",
  demo: "https://github.com/Zomahefa",
};

const mobileProjects = [
  {
    id: "mobile1",
    title: "EcoMobile",
    description:
      "Application mobile cross-platform pour le suivi de l'empreinte carbone personnelle. Interface réactive avec React Native, gestion hors-ligne, synchronisation cloud et dashboard analytique. Déploiement sur les stores avec pipeline CI/CD.",
    category: "mobile" as const,
    technologies: [
      "React Native",
      "TypeScript",
      "Redux",
      "Firebase",
      "Docker",
      "GitHub Actions",
    ],
    github: "https://github.com/Zomahefa",
  },
  {
    id: "mobile2",
    title: "ShopConnect",
    description:
      "Application mobile e-commerce avec gestion des produits, panier, paiement et notifications. Architecture modulaire avec React Native, API REST Node.js/Express, base de données PostgreSQL. Expérience utilisateur fluide et performances optimisées.",
    category: "mobile" as const,
    technologies: [
      "React Native",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Stripe",
      "Docker",
    ],
    github: "https://github.com/Zomahefa",
  },
  {
    id: "mobile3",
    title: "TaskFlow Mobile",
    description:
      "Application de gestion de tâches et de projets collaboration mobile. Fonctionnalités temps réel, synchronisation multi-devices, mode hors-ligne. Interface intuitive avec React Native et backend Nest.js.",
    category: "mobile" as const,
    technologies: [
      "React Native",
      "Nest.js",
      "TypeScript",
      "Socket.io",
      "MongoDB",
      "Docker",
    ],
    github: "https://github.com/Zomahefa",
  },
];

const sysadminProjects = [
  {
    id: "sys1",
    title: "Portail Captif & Voucher — PfSense",
    description:
      "Mise en place d'un portail captif professionnel avec système de vouchers sur PfSense. Gestion des accès Wi-Fi, authentification par tickets temporaires, configuration des règles de filtrage et gestion de la bande passante. Solution déployée pour un hotspot professionnel.",
    category: "sysadmin" as const,
    technologies: ["PfSense", "FreeRADIUS", "Wi-Fi", "Réseau", "Firewall"],
  },
  {
    id: "sys2",
    title: "Administration Windows Server",
    description:
      "Administration complète d'un parc Windows Server : Active Directory (gestion des utilisateurs, unités organisationnelles, stratégies de groupe), gestion des permissions, services DHCP/DNS, sauvegarde et restauration, maintenance et sécurité. Gestion quotidienne de l'infrastructure Windows de l'entreprise.",
    category: "sysadmin" as const,
    technologies: [
      "Windows Server",
      "Active Directory",
      "GPO",
      "DHCP",
      "DNS",
      "PowerShell",
    ],
  },
  {
    id: "sys3",
    title: "Administration Système Linux",
    description:
      "Administration de serveurs Linux (Ubuntu/Debian/CentOS) : gestion des utilisateurs et permissions, services (Apache, Nginx, MySQL, PostgreSQL), automatisation avec Bash scripts, monitoring système, sécurité et hardening, sauvegardes et restauration.",
    category: "sysadmin" as const,
    technologies: [
      "Linux",
      "Ubuntu",
      "Debian",
      "Bash",
      "Apache",
      "Nginx",
      "MySQL",
      "PostgreSQL",
    ],
  },
  {
    id: "sys4",
    title: "Serveur Moodle & Visio Conférence",
    description:
      "Mise en place complète d'un serveur Moodle pour une plateforme e-learning avec intégration visio conférence (BigBlueButton ou Jitsi). Configuration du serveur Ubuntu, installation Moodle, personnalisation des cours, gestion des utilisateurs et rôles, intégration visioconférence pour lesclasses virtuelles. Stage L2 chez Spray Info.",
    category: "sysadmin" as const,
    technologies: [
      "Ubuntu Server",
      "Moodle",
      "BigBlueButton",
      "Jitsi",
      "Apache",
      "MySQL",
      "Linux",
    ],
  },
  {
    id: "sys5",
    title: "Routage IP avec GNS3",
    description:
      "Simulation et configuration de réseaux IP complexes avec GNS3. Routage statique et dynamique (RIP, OSPF, EIGRP), VLAN, NAT, VPN, administration des routeurs Cisco. Étude pratique des architectures réseau et protocoles de routage.",
    category: "sysadmin" as const,
    technologies: ["GNS3", "Cisco", "RIP", "OSPF", "VLAN", "VPN", "Routage"],
  },
  {
    id: "sys6",
    title: "Administration Réseau PfSense",
    description:
      "Configuration et administration d'un pare-feu PfSense : règles de firewall, NAT, redirections de ports, VPN (OpenVPN/IPSec), gestion du trafic, filtrage DNS, détection d'intrusion (Snort/Suricata), équilibrage de charge et haute disponibilité.",
    category: "sysadmin" as const,
    technologies: [
      "PfSense",
      "Firewall",
      "VPN",
      "NAT",
      "Snort",
      "Suricata",
      "Réseau",
    ],
  },
  {
    id: "sys7",
    title: "Serveur VOIP Ubuntu",
    description:
      "Mise en place d'un serveur de téléphonie IP (VOIP) sur Ubuntu avec Asterisk ou FreePBX. Configuration des extensions SIP, планграмм звонков, messagerie vocale,FILE TRANSFERT PROTOCOLE et intégration avec le réseau existant. Projet L3.",
    category: "sysadmin" as const,
    technologies: ["Ubuntu", "Asterisk", "FreePBX", "SIP", "VOIP", "Linux"],
  },
];

const skills = [
  {
    category: "Frontend",
    items: [
      "Next.js / React",
      "TypeScript / JavaScript",
      "Tailwind CSS / Shadcn UI",
      "Framer Motion",
      "React Native",
    ],
  },
  {
    category: "Backend",
    items: [
      "Nest.js (forte préférence)",
      "Spring Boot",
      "FastAPI",
      "PostgreSQL / MongoDB",
      "GraphQL / REST API",
      "Redis / RabbitMQ",
    ],
  },
  {
    category: "DevOps & Cloud",
    items: [
      "Docker / Kubernetes (orchestration)",
      "AWS / GCP (cloud provider)",
      "Terraform (Infra as Code)",
      "Ansible (automatisation)",
      "CI/CD (GitHub Actions, Jenkins, ArgoCD)",
      "Helm (package manager K8s)",
      "Prometheus / Grafana / ELK (monitoring)",
      "Vault (gestion des secrets)",
      "SonarQube / Trivy (qualité & sécurité)",
      "GitOps / Blue-Green / Canary",
    ],
  },
  {
    category: "Outils & Méthodologies",
    items: [
      "Git / GitHub",
      "Agile / Scrum",
      "UML / Merise / 2TUP",
      "Conception & Modélisation",
      "Linux / Administration",
      "IA comme copilote (Groq, OpenAI)",
      "Monitoring & Logging",
    ],
  },
  {
    category: "Langues",
    items: [
      "Français : Courant",
      "Anglais : Technique",
      "Malgache : Langue maternelle",
    ],
  },
];

const experiences = [
  {
    title: "Développeur Fullstack & DevOps",
    company: "Freelance · Projets personnels",
    period: "2024 - Présent",
    description:
      "Conception, développement et déploiement d'applications modernes. Mise en place d'infrastructures cloud (AWS/GCP), automatisation CI/CD, conteneurisation Docker, orchestration Kubernetes, Infrastructure as Code avec Terraform, et monitoring complet (Prometheus/Grafana/ELK). Projets notables : ERP Quincaillerie Boutique de l'Évolution, application de gestion de station essence (ENI), applications mobiles cross-platform.",
  },
  {
    title: "Stage L3 — Pipeline CI/CD Sécurisé & Monitoring",
    company: "Stage professionnel — L3",
    period: "2024",
    description:
      "Mise en place complète d'un pipeline CI/CD pour une application web Fullstack (React.js/Django/MySQL). Automatisation du build, test et déploiement sur VPS avec Docker/Docker Compose. Implémentation du monitoring complet avec Prometheus, Grafana, Loki et exporters (node-exporter, mysql-exporter). Configuration Nginx en reverse proxy et sécurisation de l'infrastructure. Création complète du projet de A à Z.",
  },
  {
    title: "Stage L2 — Serveur Moodle & Administration Système",
    company: "Spray Info — Imandry, Fianarantsoa",
    period: "2023-2024",
    description:
      "Installation et configuration d'un serveur Moodle sur Ubuntu pour la plateforme e-learning de l'entreprise. Intégration de visio conférence pour les classes virtuelles. Administration système Linux, gestion des utilisateurs, maintenance et sécurité. Mise en place du routage IP avec GNS3 et administration réseau avec PfSense.",
  },
];

const education = [
  {
    title: "Master 1 en Informatique",
    company: "ENI (École Nationale d'Informatique)",
    period: "2025 - 2026",
    description:
      "Master 1 — poursuite de mon parcours en informatique avec une spécialisation en ingénierie des systèmes d'information.",
  },
  {
    title: "Licence en Informatique Générale — L3",
    company: "ENI (École Nationale d'Informatique)",
    period: "2024 - 2025",
    description:
      "Troisième année — parcours généraliste couvrant le développement, les réseaux, les systèmes et la cybersécurité.",
  },
  {
    title: "Informatique Générale — L2",
    company: "ENI (École Nationale d'Informatique)",
    period: "2023 - 2024",
    description:
      "Deuxième année — approfondissement en développement web, bases de données et administration système.",
  },
  {
    title: "Informatique Générale — L1",
    company: "ENI (École Nationale d'Informatique)",
    period: "2022 - 2023",
    description:
      "Première année — fondations en algorithmique, programmation et architecture des ordinateurs.",
  },
  {
    title: "Formation Admin Réseau & Système",
    company: "Spray Info — Imandry, Fianarantsoa",
    period: "3 mois",
    description:
      "Formation intensive en administration des systèmes et réseaux, complétant mon parcours généraliste.",
  },
];

const certifications = [
  {
    title: "Licence en Informatique Générale",
    issuer: "ENI (École Nationale d'Informatique)",
    year: "2025",
    status: "Obtenu",
  },
  {
    title: "DELF B2 — Français",
    issuer: "Ministère français de l'Éducation nationale",
    year: "2025",
    status: "Obtenu",
  },
  {
    title: "Certification Administration Réseau & Système",
    issuer: "Spray Info, Fianarantsoa",
    year: "2024",
    status: "Obtenu",
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "En cours",
    status: "En cours",
  },
  {
    title: "Certified Kubernetes Administrator (CKA)",
    issuer: "CNCF",
    year: "En cours",
    status: "En cours",
  },
  {
    title: "HashiCorp Terraform Associate",
    issuer: "HashiCorp",
    year: "En cours",
    status: "En cours",
  },
];

export default function Home() {
  const [allProjects, setAllProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => setAllProjects(data))
      .catch(() => {});
  }, []);

  const fullstackProjects = allProjects.filter(
    (p) => p.category === "fullstack",
  );
  const devopsProjects = allProjects.filter((p) => p.category === "devops");

  return (
    <div>
      {/* ========== HERO ========== */}
      <section
        id="accueil"
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-background via-50% to-primary/10" />
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 bg-primary/8 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="relative shrink-0"
            >
              <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20">
                <Image
                  src="/photo-cv.png"
                  alt="Zo Mahefa RANAIVO"
                  fill
                  sizes="(max-width: 768px) 224px, 288px"
                  className="object-cover"
                  priority
                />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-semibold shadow-lg"
              >
                Fullstack & DevOps
              </motion.div>
            </motion.div>

            <div className="flex-1 text-center lg:text-left">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-primary font-semibold mb-2 tracking-wide uppercase text-sm"
              >
                Développeur Fullstack & DevOps
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
              >
                Zo Mahefa <span className="gradient-text">RANAIVO</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-muted-foreground max-w-xl mb-6 leading-relaxed"
              >
                Passionné, dynamique et rigoureux, je suis un{" "}
                <strong>Fullstack & DevOps</strong> spécialisé dans la{" "}
                <strong>conception, le développement et le déploiement</strong>{" "}
                d&apos;applications web{" "}
                <strong>scalables, robustes et performantes</strong>. Mon
                approche va bien au-delà du code : j&apos;automatise, je
                conteneurise, j&apos;orchestre et je déploie avec les{" "}
                <strong>bonnes pratiques DevOps</strong> (CI/ CD, IaC,
                monitoring, gestion des secrets). Mon parcours hybride à
                l&apos;ENI m&apos;a offert une vision globale, mais c&apos;est
                dans la{" "}
                <strong>
                  création et livraison continue d&apos;applications
                </strong>{" "}
                que j&apos;excelle. Je sais travailler en équipe,nos projets à
                l&apos;ENI sont souvent collaboratifs.J&apos;aime résoudre des
                problèmes complexes. Je pratique régulièrement sur LeetCode et
                Codewars car Je recherche toujours de nouveaux défis pour
                continuer à apprendre et à évoluer dans ce domaine passionnant.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-3 justify-center lg:justify-start"
              >
                <Link
                  href="#projets"
                  className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25"
                >
                  Voir mes projets
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center h-10 px-6 rounded-full border border-border bg-background text-sm font-medium hover:bg-accent transition-all"
                >
                  Me contacter
                </Link>
                <a
                  href="/cv-zomahefa.pdf"
                  download="CV_Zo_Mahefa_RANAIVO.pdf"
                  className="inline-flex items-center justify-center h-10 px-6 rounded-full border border-primary/30 text-primary text-sm font-medium hover:bg-primary/5 transition-all cursor-pointer"
                >
                  <Download className="mr-2 h-4 w-4" />
                  CV (PDF)
                </a>
                <Link
                  href="/resume"
                  target="_blank"
                  className="inline-flex items-center justify-center h-10 px-6 rounded-full border border-primary/30 text-primary text-sm font-medium hover:bg-primary/5 transition-all"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Résumé portfolio
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SERVICES ========== */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-125 h-125 bg-primary/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">
              Mes domaines d&apos;expertise
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un profil hybride couvrant l&apos;ensemble du cycle de vie
              d&apos;un projet, de l&apos;idée au déploiement.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {services.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="group relative rounded-xl border border-border/50 bg-card p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex p-3 rounded-xl bg-linear-to-br from-primary/10 to-primary/10 text-primary">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TECH STACK ========== */}
      <section className="py-16 bg-accent/30 relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Technologies maîtrisées</h2>
            <p className="text-muted-foreground">
              Un stack technique moderne, complet et constamment mis à jour.
            </p>
          </AnimatedSection>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto"
          >
            {techStack.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, type: "spring" }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge
                  variant="secondary"
                  className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== PROJETS ========== */}
      <section id="projets" className="py-20 relative overflow-hidden">
        <div className="absolute top-20 -left-40 w-125 h-125 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -right-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">Mes projets</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des projets concrets qui démontrent mon expertise fullstack et
              DevOps, de la conception au déploiement. Chaque projet est ouvert
              à vos contributions et suggestions.
            </p>
          </AnimatedSection>

          <AnimatedSection className="mb-12">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              Applications Fullstack
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fullstackProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="mb-12">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Cloud className="h-5 w-5 text-primary" />
              DevOps — Infrastructure scalable et robuste
            </h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
              Au-delà du développement, je maîtrise l&apos;ensemble de la chaîne
              de livraison logicielle : automatisation, conteneurisation,
              orchestration, monitoring et déploiement continu. Chaque projet
              que je développe est pensé pour être industrialisé et mis en
              production avec les bonnes pratiques DevOps.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {devopsProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="mb-12">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-primary" />
              Applications Mobiles
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProjects
                .filter((p) => p.category === "mobile")
                .map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              {allProjects.filter((p) => p.category === "mobile").length ===
                0 && (
                <p className="text-sm text-muted-foreground col-span-full text-center py-8">
                  Projets mobiles à venir — bientôt disponibles.
                </p>
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection className="mb-12">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="text-primary">🖥</span>
              Administration Système & Réseau
            </h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
              En complément de mes compétences en développement et DevOps,
              j&apos;ai acquis une solide expérience en administration système
              et réseau à travers mes projets à l&apos;ENI et en stage.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProjects
                .filter((p) => p.category === "admin")
                .map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              {allProjects.filter((p) => p.category === "admin").length ===
                0 && (
                <p className="text-sm text-muted-foreground col-span-full text-center py-8">
                  Projets d&apos;administration à venir.
                </p>
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              Projet Remarquable
            </h3>
            <div className="max-w-md">
              <ProjectCard project={PortfolioProjectStatic} index={0} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ========== AI PROJECT MATCH ========== */}
      <ProjectMatcher />

      {/* ========== COMPÉTENCES & PARCOURS ========== */}
      <section
        id="competences"
        className="py-20 bg-accent/30 relative overflow-hidden"
      >
        <div className="absolute -top-20 right-0 w-80 h-80 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-125 h-125 bg-primary/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">Compétences & Parcours</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un parcours généraliste qui m&apos;a permis d&apos;acquérir une
              vision globale, avant de me spécialiser dans la création et la
              livraison d&apos;applications web.
            </p>
          </AnimatedSection>

          {/* Self-description */}
          <AnimatedSection>
            <div className="max-w-3xl mx-auto mb-16 p-8 rounded-2xl border border-primary/20 bg-linear-to-br from-primary/5 to-primary/5 text-center">
              <p className="text-lg leading-relaxed text-muted-foreground italic">
                &ldquo;Je suis quelqu&apos;un qui apprend vite, s&apos;adapte
                rapidement aux nouvelles technologies et aux environnements
                changeants. Dynamique et passionné, je donne toujours le
                meilleur de moi-même pour livrer un travail de qualité dans les
                délais impartis. Mon objectif : créer des solutions qui font la
                différence, avec rigueur et créativité. J&apos;aime résoudre des
                problèmes complexes et je m&apos;entraîne régulièrement sur des
                plateformes comme LeetCode et Codewars pour perfectionner mes
                compétences en algorithmique et en conception.&rdquo;
              </p>
            </div>
          </AnimatedSection>

          {/* Skills grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {skills.map((group, i) => (
              <AnimatedSection key={group.category} delay={i * 0.1}>
                <Card className="h-full border-border/50 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-primary">
                      {group.category}
                    </h3>
                    <ul className="space-y-2.5">
                      {group.items.map((item) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-2"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                          <span className="text-sm text-muted-foreground">
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>

          {/* Download CV */}
          <AnimatedSection className="text-center mb-16">
            <Link
              href="/cv-zomahefa.pdf"
              target="_blank"
              className="inline-flex items-center justify-center h-11 px-8 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              <Download className="mr-2 h-5 w-5" />
              Télécharger mon CV complet
            </Link>
          </AnimatedSection>

          {/* Experience Timeline */}
          <AnimatedSection className="mb-12">
            <h3 className="text-xl font-semibold mb-8 flex items-center gap-2 justify-center">
              <span className="text-primary">●</span>
              Expérience
            </h3>
            <div className="max-w-3xl mx-auto">
              {experiences.map((exp, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ x: 3 }}
                    className="relative pl-8 pb-8 border-l-2 border-primary/20 last:pb-0 group"
                  >
                    <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary transition-transform group-hover:scale-125" />
                    <div className="mb-1 text-sm text-primary font-medium">
                      {exp.period}
                    </div>
                    <h4 className="text-lg font-semibold">{exp.title}</h4>
                    <div className="text-sm text-muted-foreground mb-2">
                      {exp.company}
                    </div>
                    <p className="text-sm text-muted-foreground/80">
                      {exp.description}
                    </p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>

          {/* Education Timeline */}
          <AnimatedSection>
            <h3 className="text-xl font-semibold mb-8 flex items-center gap-2 justify-center">
              <span className="text-primary">●</span>
              Formation
            </h3>
            <div className="max-w-3xl mx-auto">
              {education.map((edu, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ x: 3 }}
                    className="relative pl-8 pb-8 border-l-2 border-primary/20 last:pb-0 group"
                  >
                    <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary transition-transform group-hover:scale-125" />
                    <div className="mb-1 text-sm text-primary font-medium">
                      {edu.period}
                    </div>
                    <h4 className="text-lg font-semibold">{edu.title}</h4>
                    <div className="text-sm text-muted-foreground mb-2">
                      {edu.company}
                    </div>
                    <p className="text-sm text-muted-foreground/80">
                      {edu.description}
                    </p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>

          {/* Certifications */}
          <AnimatedSection className="mt-16">
            <h3 className="text-xl font-semibold mb-8 flex items-center gap-2 justify-center">
              <span className="text-primary">●</span>
              Certifications & Diplômes
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {certifications.map((cert, i) => (
                <AnimatedSection key={i} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="relative p-5 rounded-xl border border-border/50 bg-card hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-sm leading-snug">
                        {cert.title}
                      </h4>
                      <span
                        className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          cert.status === "Obtenu"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-amber-500/10 text-amber-500"
                        }`}
                      >
                        {cert.status}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {cert.issuer}
                    </div>
                    <div className="text-xs text-muted-foreground/60 mt-1">
                      {cert.year}
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ========== CONTACT ========== */}
      <section id="contact" className="py-20 relative overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-96 h-96 bg-primary/12 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">Contactez moi</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discutons de votre projet. Laissez-moi vos coordonnées et je vous
              répondrai rapidement.
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
            <div className="lg:col-span-2 space-y-4">
              {contactInfo.map((info, i) => (
                <AnimatedSection key={info.label} delay={i * 0.08}>
                  <motion.div whileHover={{ x: 3 }}>
                    <Card className="border-border/50 hover:border-primary/30 transition-all duration-300">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-linear-to-br from-primary/10 to-blue-500/10 text-primary shrink-0">
                          <info.icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs text-muted-foreground">
                            {info.label}
                          </div>
                          {info.href ? (
                            <Link
                              href={info.href}
                              target={
                                info.href.startsWith("http")
                                  ? "_blank"
                                  : undefined
                              }
                              rel={
                                info.href.startsWith("http")
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className="text-sm font-medium hover:text-primary transition-colors truncate block"
                            >
                              {info.value}
                            </Link>
                          ) : (
                            <div className="text-sm font-medium truncate">
                              {info.value}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>

            <div className="lg:col-span-3">
              <AnimatedSection delay={0.15}>
                <Card className="border-border/50 shadow-md">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      Discuter de votre projet
                    </h3>
                    <Suspense
                      fallback={
                        <div className="h-64 animate-pulse rounded-lg bg-muted" />
                      }
                    >
                      <ContactForm />
                    </Suspense>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
