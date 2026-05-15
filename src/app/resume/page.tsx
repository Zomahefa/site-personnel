"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const services = [
  "Développement Fullstack (Next.js, React, TypeScript, Node.js)",
  "DevOps (Docker, Kubernetes, Terraform, CI/CD, Monitoring)",
  "Infrastructure Cloud (AWS, GCP, IaC, automatisation)",
  "Applications mobiles cross-platform",
];

const skills = [
  "Next.js / React / TypeScript",
  "Node.js / Nest.js / Prisma / Python / FastAPI",
  "PostgreSQL / MongoDB / Redis / Postman / Swagger",
  "Docker /Docker compose / Kubernetes / Helm ",
  "AWS / GCP / Terraform / Ansible",
  "CI/CD (GitHub Actions, Jenkins, ArgoCD)",
  "Prometheus / Grafana / ELK",
  "Vault / SonarQube / Trivy",
];

const projects = [
  "NexaFlow — SaaS workflow avec déploiement AWS ECS",
  "EcoTrack — Microservices K8s avec monitoring",
  "MediConnect — Télémédecine avec WebRTC",
  "CryptoSight — Dashboard crypto serverless",
  "InfraStack — IaC multi-cloud complète",
  "PipeLine Pro — Pipeline CI/CD générique",
  "CloudGuard — Sécurité cloud automatisée",
];

export default function ResumePage() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end gap-3 mb-8 print:hidden">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" />
            Imprimer / PDF
          </Button>
        </div>

        <div
          ref={ref}
          className="bg-card border border-border/50 rounded-2xl p-8 md:p-12 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-border/40">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30 shrink-0">
              <Image
                src="/photo-cv.png"
                alt="Zo Mahefa RANAIVO"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold">
                Zo Mahefa <span className="text-primary">RANAIVO</span>
              </h1>
              <p className="text-primary font-medium">
                Développeur Fullstack & DevOps
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                zomahefa.ranaivo@gmail.com · +261 38 54 422 52 ·
                github.com/Zomahefa
              </p>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Profil</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Fullstack & DevOps spécialisé dans la conception, le développement
              et le déploiement d&apos;applications web scalables et robustes.
              Passionné, dynamique et rigoureux avec un parcours hybride alliant
              développement, infrastructure cloud et automatisation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Services</h2>
            <ul className="space-y-1.5">
              {services.map((s) => (
                <li
                  key={s}
                  className="text-sm text-muted-foreground flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              Compétences techniques
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <Badge key={s} variant="secondary" className="text-xs">
                  {s}
                </Badge>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Projets clés</h2>
            <ul className="space-y-1.5">
              {projects.map((p) => (
                <li
                  key={p}
                  className="text-sm text-muted-foreground flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">Formation</h2>
            <div className="text-sm text-muted-foreground">
              <p>Master 1 en Informatique — ENI (2025-2026)</p>
              <p>Licence en Informatique Générale — ENI (2022-2025)</p>
              <p>Formation Admin Réseau & Système — Spray Info (3 mois)</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
