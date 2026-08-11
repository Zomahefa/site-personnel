"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Printer, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const skills = {
  Backend: [
    "Java",
    "Spring Boot",
    "Spring Security (JWT / OAuth2)",
    "Spring Data JPA / Hibernate",
    "REST API / GraphQL",
    "Microservices / Spring Cloud",
    "Springdoc OpenAPI (Swagger UI)",
    "Tests : JUnit / Mockito / AssertJ",
    "Maven / Gradle",
    "Lombok / MapStruct",
    "Node.js / Express",
    "Python / FastAPI",
  ],
  DevOps: [
    "Docker",
    "Kubernetes",
    "Terraform / IaC",
    "Ansible",
    "CI/CD (GitHub Actions, Jenkins, ArgoCD)",
    "Helm",
    "Prometheus / Grafana",
    "ELK Stack",
  ],
  Cloud: ["AWS (EC2, ECS, S3, RDS)", "GCP", "Vault", "Nginx", "Traefik"],
  BasesDeDonnées: ["PostgreSQL", "MongoDB", "Redis"],
  Frontend: [
    "Next.js / React",
    "TypeScript",
    "Tailwind CSS",
    "Tests : Vitest / Jest / Testing Library",
  ],
  Outils: [
    "Git / GitHub",
    "Linux (Ubuntu, Debian)",
    "SonarQube",
    "Trivy",
    "UML / Merise / 2TUP",
  ],
};

const experiences = [
  {
    title: "Développeur Backend & DevOps",
    company: "Freelance · Projets personnels",
    period: "2024 - Présent",
    description:
      "Conception et développement d'applications backend avec Spring Boot (API REST, Spring Security, JPA/Hibernate). Mise en place d'infrastructures cloud (AWS/GCP), automatisation CI/CD, conteneurisation Docker, orchestration Kubernetes, Infrastructure as Code avec Terraform, et monitoring (Prometheus/Grafana/ELK).",
  },
  {
    title: "Stage L3 — Pipeline CI/CD Sécurisé & Monitoring",
    company: "Stage professionnel",
    period: "2024",
    description:
      "Mise en place complète d'un pipeline CI/CD pour une application web Fullstack (React.js/Django/MySQL). Automatisation du build, test et déploiement sur VPS avec Docker/Docker Compose. Implémentation du monitoring avec Prometheus, Grafana, Loki. Configuration Nginx en reverse proxy et sécurisation de l'infrastructure.",
  },
  {
    title: "Stage L2 — Serveur Moodle & Administration Système",
    company: "Spray Info — Fianarantsoa",
    period: "2023-2024",
    description:
      "Installation et configuration d'un serveur Moodle sur Ubuntu. Intégration de visioconférence. Administration système Linux, gestion des utilisateurs, sécurité et routage IP (GNS3, PfSense).",
  },
];

const education = [
  {
    degree: "Master 1 en Informatique",
    school: "ENI (École Nationale d'Informatique)",
    period: "2025 - 2026",
  },
  {
    degree: "Licence en Informatique Générale",
    school: "ENI (École Nationale d'Informatique)",
    period: "2022 - 2025",
  },
  {
    degree: "Formation Admin Réseau & Système",
    school: "Spray Info — Fianarantsoa",
    period: "3 mois",
  },
];

const certifications = [
  {
    name: "Licence en Informatique Générale — Mention Très Bien",
    issuer: "ENI",
    year: "2025",
  },
  { name: "Certification Spring Boot", issuer: "Mind Luster", year: "2026" },
  { name: "Certification UML", issuer: "Mind Luster", year: "2026" },
  {
    name: "Baccalauréat Série D — Mention Assez Bien",
    issuer: "LPJC Ambohimahasoa",
    year: "2022",
  },
  { name: "DELF B2", issuer: "Alliance Française", year: "2026" },
];

export default function ResumePage() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end gap-3 mb-8 print:hidden">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" />
            Télécharger en PDF
          </Button>
          <p className="text-xs text-muted-foreground">
            (Choisissez &quot;Enregistrer au format PDF&quot; dans
            l&apos;imprimante)
          </p>
        </div>

        <div
          ref={ref}
          className="bg-card border border-border/50 rounded-2xl p-8 md:p-12 shadow-sm print:shadow-none print:rounded-none print:border-0"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-border/40">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30 shrink-0">
              <Image
                src="/photo-cv.png"
                alt="Zo Mahefa RANAIVO"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl font-bold">
                Zo Mahefa <span className="text-primary">RANAIVO</span>
              </h1>
              <p className="text-primary font-medium">
                Développeur Backend Java/Spring Boot & DevOps
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                zomahefa.ranaivo@gmail.com · +261 38 54 422 52
              </p>
              <p className="text-sm text-muted-foreground">
                github.com/Zomahefa · linkedin.com/in/zo-mahefa-ranaivo
              </p>
            </div>
          </div>

          {/* Profil */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Profil
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Développeur Backend spécialisé en
              <strong>Java / Spring Boot</strong>, avec une solide expertise
              DevOps. Je conçois des API robustes, sécurisées et scalables avec
              tout l&apos;écosystème Spring (Security, JPA/Hibernate, Cloud,
              Microservices). Chaque projet est pensé pour la production :{" "}
              <strong>
                testé, containerisé (Docker), orchestré (Kubernetes), et déployé
                en continu (CI/CD)
              </strong>
              . Rigoureux et force de proposition, je recherche un poste où je
              pourrai mettre à profit mes compétences techniques et ma passion
              pour l'ingénierie logicielle.
            </p>
          </section>

          {/* Compétences techniques */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Compétences techniques
            </h2>
            <div className="space-y-4">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    {category === "BasesDeDonnées"
                      ? "Bases de données"
                      : category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-[10px] px-2 py-0.5"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Expérience */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Expérience professionnelle
            </h2>
            <div className="space-y-5">
              {experiences.map((exp, i) => (
                <div key={i}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold">{exp.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-[11px] text-muted-foreground whitespace-nowrap font-medium">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Formation */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Formation
            </h2>
            <div className="space-y-3">
              {education.map((edu, i) => (
                <div key={i} className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold">{edu.degree}</h3>
                    <p className="text-xs text-muted-foreground">
                      {edu.school}
                    </p>
                  </div>
                  <span className="text-[11px] text-muted-foreground whitespace-nowrap font-medium">
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Certifications
            </h2>
            <div className="space-y-2">
              {certifications.map((cert, i) => (
                <div key={i} className="flex items-start justify-between gap-4">
                  <p className="text-sm font-medium">{cert.name}</p>
                  <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                    {cert.issuer} · {cert.year}
                  </span>
                </div>
              ))}
              <div className="flex items-start justify-between gap-4 text-muted-foreground/60">
                <p className="text-sm italic">
                  DevOps from A to Z — Formation en cours
                </p>
                <span className="text-[11px] whitespace-nowrap">2026</span>
              </div>
            </div>
          </section>

          {/* Portfolio */}
          <section className="pt-6 border-t border-border/40">
            <p className="text-xs text-muted-foreground text-center">
              Portfolio complet :{" "}
              <Link
                href="https://zomahefa.dev"
                target="_blank"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                zomahefa.dev
                <ExternalLink className="h-3 w-3" />
              </Link>
              {" · "}CV mis à jour le {new Date().toLocaleDateString("fr-FR")}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
