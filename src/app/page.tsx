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
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/animated-section";
import { ProjectMatcher } from "@/components/project-matcher";
import { ProjectCard } from "@/components/project-card";
import { ContactForm } from "@/components/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Eye, Loader2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "zomahefaranaivo@gmail.com",
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
    title: "Développement Web Backend avec Spring Boot",
    description:
      "Architecte d'applications robustes avec Spring Boot et tous son écosystème (Spring Security, JPA/Hibernate, Spring Cloud, microservices). Je conçois des API REST performantes, sécurisées et prêtes pour la production.",
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
    description:
      "Solutions cross-platform avec Flutter et Kotlin (Android natif).",
  },
];

const techStack = [
  "Spring Boot",
  "React/Next.js",
  "Docker",
  "Docker compose",
  "Kubernetes",
  "Terraform",
  "Ansible",
  "GitHub Actions",
  "ArgoCD",
  "Prometheus",
  "Grafana",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Git",
  "Linux",
];

const skills = [
  {
    category: "Frontend",
    items: [
      "Next.js / React",
      "TypeScript / JavaScript",
      "Tailwind CSS / Shadcn UI",
      "Framer Motion",
      "Tests : Vitest / Jest",
      "ESLint / Prettier",
    ],
  },
  {
    category: "Backend",
    items: [
      "Java / Spring Boot",
      "Spring Security (JWT / OAuth2)",
      "Spring Data JPA / Hibernate",
      "REST API / Microservices / Spring Cloud",
      "Spring Web / Validation (Bean Validation)",
      "Spring Actuator / AOP",
      "Springdoc OpenAPI (Swagger UI)",
      "Tests : JUnit / Mockito / AssertJ",
      "Maven / Gradle",
      "Lombok / MapStruct",
      "Node.js / Nest.js",
      "Python / Django & Socket & Scripts",
      "PostgreSQL / MongoDB / Redis",
    ],
  },
  {
    category: "Mobile",
    items: ["Flutter (cross-platform)", "Kotlin (Android natif)"],
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
    category: "Soft Skills",
    items: [
      "Problem Solving",
      "Autonomie & Ownership",
      "Pensée analytique",
      "Communication technique",
      "Esprit d'équipe & Collaboration",
      "Adaptabilité",
      "Apprentissage continu",
      "Rigueur & Sens des responsabilités",
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
    title: "Développeur Backend & DevOps",
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
    title: "Licence en Informatique Générale — Mention Très Bien",
    issuer: "ENI (École Nationale d'Informatique)",
    year: "2025",
    status: "Obtenu",
  },
  {
    title: "Baccalauréat Série D — Mention Assez Bien",
    issuer: "LPJC Ambohimahasoa",
    year: "2022",
    status: "Obtenu",
  },
  {
    title: "Certification Spring Boot",
    issuer: "Mind Luster",
    year: "2026",
    status: "Obtenu",
    image: "/certifcatSping-boot2.jpeg",
    pdf: "/certificatSpringBoot.pdf",
  },
  {
    title: "Certification UML",
    issuer: "Mind Luster",
    year: "2026",
    status: "Obtenu",
    image: "/uml-certification.jpeg",
    pdf: "/uml-certification-zo.pdf",
  },
  {
    title: "DevOps from A to Z",
    issuer: "Formation en cours",
    year: "2026",
    status: "En cours",
  },
  {
    title: "DELF B2",
    issuer: "Alliance Française",
    year: "2026",
    status: "En cours",
  },
];

function CertCard({
  cert,
  index,
}: {
  cert: (typeof certifications)[0];
  index: number;
}) {
  const [open, setOpen] = useState(false);

  if (!cert.image) {
    return (
      <AnimatedSection delay={index * 0.08}>
        <motion.div
          whileHover={{ y: -4 }}
          className="group overflow-hidden rounded-xl border border-border/50 bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-md h-full"
        >
          <div className="h-40 flex flex-col items-center justify-center text-center p-6">
            <span
              className={`mb-3 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                cert.status === "Obtenu"
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-amber-500/15 text-amber-600"
              }`}
            >
              {cert.status}
            </span>
            <h4 className="font-semibold text-sm leading-snug mb-1">
              {cert.title}
            </h4>
            <div className="text-xs text-muted-foreground">{cert.issuer}</div>
            <div className="text-xs text-muted-foreground/60 mt-0.5">
              {cert.year}
            </div>
          </div>
        </motion.div>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection delay={index * 0.08}>
      <motion.div
        whileHover={{ y: -4 }}
        className="group overflow-hidden rounded-xl border border-border/50 bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-md"
      >
        <div className="relative h-40 overflow-hidden bg-muted">
          <Image
            src={cert.image}
            alt={cert.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
          <div className="absolute top-3 right-3">
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                cert.status === "Obtenu"
                  ? "bg-emerald-500/15 text-emerald-500 backdrop-blur-xs"
                  : "bg-amber-500/15 text-amber-600 backdrop-blur-xs"
              }`}
            >
              {cert.status}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-sm leading-snug mb-1">
            {cert.title}
          </h4>
          <div className="text-xs text-muted-foreground">{cert.issuer}</div>
          <div className="text-xs text-muted-foreground/60 mt-0.5">
            {cert.year}
          </div>
          <button
            onClick={() => setOpen(true)}
            className="mt-3 inline-flex active-scale-97 items-center justify-center h-8 px-3 rounded-lg border border-border bg-background text-[0.75rem] font-medium hover:bg-muted transition-[background,transform] duration-200 ease-out cursor-pointer"
          >
            <Eye className="mr-1.5 h-3.5 w-3.5" />
            Plus de détails
          </button>
        </div>
      </motion.div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogTitle className="text-lg font-bold">{cert.title}</DialogTitle>
          <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden bg-muted mt-2">
            <Image
              src={cert.image}
              alt={cert.title}
              fill
              className="object-contain"
            />
          </div>
          <DialogDescription className="text-sm text-muted-foreground">
            Délivré par {cert.issuer} — {cert.year}
          </DialogDescription>
          {cert.pdf && (
            <a
              href={cert.pdf}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex active-scale-97 items-center justify-center h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-[background,transform] duration-200 ease-out"
            >
              <Download className="mr-2 h-4 w-4" />
              Télécharger le PDF
            </a>
          )}
        </DialogContent>
      </Dialog>
    </AnimatedSection>
  );
}

function MarqueeCards({ children }: { children: React.ReactNode }) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-6 w-max"
          animate={isPaused ? {} : { x: [0, -1800] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          {children}
          {children}
        </motion.div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-accent/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-accent/80 to-transparent z-10" />
    </div>
  );
}

export default function Home() {
  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => setAllProjects(data))
      .catch(() => {})
      .finally(() => setProjectsLoading(false));
  }, []);

  const webProjects = allProjects.filter((p) => p.category === "fullstack");
  const devopsProjects = allProjects.filter((p) => p.category === "devops");

  return (
    <div className="min-h-full">
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
                Backend & DevOps
              </motion.div>
            </motion.div>

            <div className="flex-1 text-center lg:text-left">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-primary font-semibold mb-2 tracking-wide uppercase text-sm"
              >
                Développeur Backend & DevOps
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
              >
                Zo Mahefa <span className="gradient-text">RANAIVO</span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-muted-foreground max-w-xl mb-6 leading-relaxed space-y-3"
              >
                <p>
                  Passionné par <strong>Java / Spring Boot</strong>{" "}
                  <span> </span>et l&apos;écosystème backend, je conçois des{" "}
                  <strong>API robustes, sécurisées et scalables</strong>, en
                  m&apos;appuyant sur <strong>Spring Security</strong>,{" "}
                  <strong>JPA/Hibernate</strong> et{" "}
                  <strong>Spring Cloud</strong>. Mon approche ne s&apos;arrête
                  pas au développement : je m&apos;intéresse à l&apos;ensemble
                  du <strong>cycle de vie</strong> d&apos;une application, de la
                  conception à la mise en production. J&apos;automatise,
                  conteneurise et déploie mes applications en appliquant les
                  bonnes pratiques <strong>DevOps</strong> :{" "}
                  <strong>CI/CD</strong>, <strong>IaC</strong>,{" "}
                  <strong>monitoring</strong> et{" "}
                  <strong>gestion des secrets</strong>. Chaque solution que je
                  développe est pensée pour être <strong>testable</strong>,{" "}
                  <strong>documentée</strong>, <strong>maintenable</strong>
                  <span> </span> et prête pour la production. Habitué au travail
                  collaboratif à l&apos;ENI, je suis animé par la résolution de
                  problèmes, l&apos;apprentissage continu et la recherche de
                  solutions concrètes. Je cherche constamment à approfondir mes
                  compétences et à relever de nouveaux défis dans le
                  développement backend et le DevOps.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-3 justify-center lg:justify-start"
              >
                <Link
                  href="#projets"
                  className="inline-flex active-scale-97 items-center justify-center h-10 px-6 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-[background,box-shadow,transform] duration-200 ease-out hover:shadow-lg hover:shadow-primary/25"
                >
                  Voir mes projets
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex active-scale-97 items-center justify-center h-10 px-6 rounded-full border border-border bg-background text-sm font-medium hover:bg-accent transition-[background,transform] duration-200 ease-out"
                >
                  Me contacter
                </Link>
                <a
                  href="/cv-zomahefa-latest-2026.pdf"
                  download="cv-zomahefa-latest-2026.pdf"
                  className="inline-flex active-scale-97 items-center justify-center h-10 px-6 rounded-full border border-primary/30 text-primary text-sm font-medium hover:bg-primary/5 transition-[background,transform] duration-200 ease-out cursor-pointer"
                >
                  <Download className="mr-2 h-4 w-4" />
                  CV (PDF)
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground/60 font-medium tracking-wider uppercase">
            Défiler
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 h-1.5 rounded-full bg-muted-foreground/60"
            />
          </div>
        </motion.div>
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
                  whileHover={{ y: -3 }}
                  className="group relative rounded-xl border border-border/50 bg-card p-6 hover:border-primary/50 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:shadow-md"
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
              Stack technique centré Spring Boot, constamment mis à jour.
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
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, type: "spring", stiffness: 120 }}
                whileHover={{ scale: 1.08 }}
              >
                <Badge
                  variant="secondary"
                  className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-[background,color,transform] duration-200 ease-out cursor-default"
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
              Des projets concrets qui démontrent mon expertise backend et
              DevOps, de la conception au déploiement. Chaque projet est ouvert
              à vos contributions et suggestions.
            </p>
          </AnimatedSection>

          {projectsLoading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <AnimatedSection className="mb-12">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-primary" />
                  Applications Web
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {webProjects.map((project, i) => (
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
                  Au-delà du développement, je maîtrise l&apos;ensemble de la
                  chaîne de livraison logicielle : automatisation,
                  conteneurisation, orchestration, monitoring et déploiement
                  continu. Chaque projet que je développe est pensé pour être
                  industrialisé et mis en production avec les bonnes pratiques
                  DevOps.
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
                      <ProjectCard
                        key={project.id}
                        project={project}
                        index={i}
                      />
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
                  j&apos;ai acquis une solide expérience en administration
                  système et réseau à travers mes projets à l&apos;ENI et en
                  stage.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allProjects
                    .filter((p) => p.category === "admin")
                    .map((project, i) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        index={i}
                      />
                    ))}
                  {allProjects.filter((p) => p.category === "admin").length ===
                    0 && (
                    <p className="text-sm text-muted-foreground col-span-full text-center py-8">
                      Projets d&apos;administration à venir.
                    </p>
                  )}
                </div>
              </AnimatedSection>
            </>
          )}
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
            <h2 className="text-3xl font-bold mb-3">Compétences</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un parcours généraliste qui m&apos;a permis d&apos;acquérir une
              vision globale, avant de me spécialiser dans la création et la
              livraison d&apos;applications web.
            </p>
          </AnimatedSection>

          {/* Self-description */}

          {/* Skills cards — grid layout */}
          <div className="mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {skills.map((group, gi) => {
                const dotColors = [
                  "bg-violet-500",
                  "bg-emerald-500",
                  "bg-amber-500",
                  "bg-sky-500",
                  "bg-rose-500",
                  "bg-primary",
                ];
                const dc = dotColors[gi % dotColors.length];

                return (
                  <div key={group.category}>
                    <Card className="h-full border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border hover:shadow-md transition-all duration-300">
                      <CardContent className="p-6">
                        <h3
                          className={`font-semibold mb-4 text-lg ${dc.replace("bg-", "text-")}`}
                        >
                          {group.category}
                        </h3>
                        <ul className="space-y-3">
                          {group.items.map((item) => {
                            const pctMatch = item.match(/: (\d+)%$/);
                            if (pctMatch) {
                              const pct = parseInt(pctMatch[1]);
                              const label = item.replace(/: \d+%$/, "");
                              return (
                                <li key={item}>
                                  <div className="flex items-center justify-between text-sm mb-1">
                                    <span className="text-muted-foreground/80">
                                      {label}
                                    </span>
                                    <span className="text-xs font-semibold text-muted-foreground/60">
                                      {pct}%
                                    </span>
                                  </div>
                                  <div className="h-1.5 rounded-full bg-muted-foreground/10 overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      whileInView={{ width: `${pct}%` }}
                                      viewport={{ once: true }}
                                      transition={{
                                        duration: 0.8,
                                        ease: "easeOut",
                                        delay: 0.2,
                                      }}
                                      className={`h-full rounded-full ${dc}`}
                                    />
                                  </div>
                                </li>
                              );
                            }
                            return (
                              <motion.li
                                key={item}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-2"
                              >
                                <div
                                  className={`h-1.5 w-1.5 rounded-full ${dc} shrink-0`}
                                />
                                <span className="text-sm text-muted-foreground/80">
                                  {item}
                                </span>
                              </motion.li>
                            );
                          })}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Download CV */}
          <AnimatedSection className="text-center mb-16">
            <motion.div
              className="inline-block"
              animate={{ y: [0, -4, 0, -2, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1,
              }}
            >
              <Link
                href="/cv-zomahefa-latest-2026.pdf"
                target="_blank"
                className="inline-flex active-scale-97 items-center justify-center h-11 px-8 rounded-full bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/30 hover:bg-primary/90 transition-[background,box-shadow,transform] duration-200 ease-out hover:shadow-xl hover:shadow-primary/40"
              >
                <Download className="mr-2 h-5 w-5" />
                Télécharger mon CV complet
              </Link>
            </motion.div>
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {certifications.map((cert, i) => (
                <CertCard key={i} cert={cert} index={i} />
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
                    <Card className="border-border/50 hover:border-primary/30 transition-[border-color,box-shadow,transform] duration-200 ease-out">
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
