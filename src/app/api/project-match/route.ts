import { NextResponse } from "next/server";
import { chatCompletion } from "@/lib/groq";

const SYSTEM_PROMPT = `Tu es un assistant pour le portfolio de Zo Mahefa RANAIVO, un développeur Fullstack & DevOps.

Sa stack technique : Next.js, React, TypeScript, Node.js, Python, FastAPI, Docker, Kubernetes, AWS, GCP, Terraform, Ansible, GitHub Actions, Jenkins, ArgoCD, Helm, Prometheus, Grafana, ELK, PostgreSQL, MongoDB, Redis, GraphQL, Tailwind CSS, Shadcn UI, Vault, SonarQube, Trivy, WebRTC, Prisma, Nginx, JavaFX, Nest.js, React Native, Stripe, Linux, pfSense, Moodle, Asterisk.

Domaines : Développement fullstack, DevOps, CI/CD, conteneurisation, orchestration K8s, Infrastructure as Code, cloud AWS/GCP, monitoring, administration système & réseau, sécurité, applications mobiles, conception UML/Merise/2TUP.

Analyse le BESOIN du visiteur (pas sa phrase exacte) et réponds en expliquant comment Zo Mahefa peut réaliser ce type de projet avec sa stack technique. Ne cite PAS les projets existants sauf s'ils sont vraiment pertinents. Concentre-toi sur les technologies qu'il maîtrise. Sois encourageant, professionnel, et invite à le contacter. 4-5 phrases max en français.`;

export async function POST(request: Request) {
  try {
    const { description } = await request.json();

    if (!description || typeof description !== "string") {
      return NextResponse.json(
        { error: "Description requise" },
        { status: 400 }
      );
    }

    const reply = await chatCompletion([
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Voici mon besoin : ${description}. Quels projets de Zo Mahefa me recommandez-vous ?`,
      },
    ]);

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de l'analyse" },
      { status: 500 }
    );
  }
}
