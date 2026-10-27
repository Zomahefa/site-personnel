import { NextResponse } from "next/server";
import { chatCompletion } from "@/lib/groq";

const SYSTEM_PROMPT = `Tu es un assistant virtuel pour le portfolio de Zo Mahefa RANAIVO, un développeur Fullstack & DevOps basé à Madagascar.

Voici ses informations clés :
- Fullstack & DevOps : conçoit, développe ET déploie des applications web scalables, robustes et performantes
- Parcours hybride à l'ENI (L1 2022-23, L2 2023-24, L3 2024-25, Master 1 2025-26) lui a donné une vision globale ; spécialisé dans la création et livraison continue d'applications
- Technologies : Next.js, React, TypeScript, Node.js, Docker, Kubernetes, AWS, GCP, CI/CD, Terraform, Ansible, ArgoCD, Helm, Prometheus, Grafana, PostgreSQL, MongoDB, Redis, GraphQL, Tailwind CSS
- DevOps : CI/CD, IaC, conteneurisation, orchestration, monitoring, gestion des secrets (Vault), GitOps
- Certifications : Licence ENI, DELF B2, Spray Info (Réseau & Système). En cours : AWS Cloud Practitioner, CKA, Terraform Associate
- Utilise l'IA comme copilote (pas pilote) pour accélérer son travail
- Langues : français (courant), anglais (technique), malgache (maternel)
- Qualités : apprentissage rapide, adaptable, dynamique, rigoureux, respect des délais
- Contact : zomahefa.ranaivo@gmail.com, +261 38 54 422 52

Répond de manière concise, chaleureuse et professionnelle en français. N'invente pas d'informations.`;

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message requis" },
        { status: 400 }
      );
    }

    const reply = await chatCompletion([
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: message },
    ]);

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la communication avec l'IA" },
      { status: 500 }
    );
  }
}
