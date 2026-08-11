import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Compétences",
  description:
    "Compétences techniques de Zo Mahefa RANAIVO — Spring Boot, DevOps, Docker, Kubernetes, AWS, CI/CD, et plus.",
  alternates: {
    canonical: "https://zomahefa.dev/competences",
  },
  openGraph: {
    title: "Compétences | Zo Mahefa RANAIVO",
    description:
      "Stack technique complet — Backend, DevOps, Cloud, Mobile et plus.",
    url: "https://zomahefa.dev/competences",
  },
};

export default function CompetencesRedirect() {
  redirect("/#competences");
}
