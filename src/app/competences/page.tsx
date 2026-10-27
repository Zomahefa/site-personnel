import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { siteUrl } from "@/lib/content";

export const metadata: Metadata = {
  title: "Compétences",
  description:
    "Compétences techniques de Zo Mahefa RANAIVO — Spring Boot, DevOps, Docker, Kubernetes, AWS, CI/CD, et plus.",
  alternates: {
    canonical: `${siteUrl}/#competences`,
  },
  openGraph: {
    title: "Compétences | Zo Mahefa RANAIVO",
    description:
      "Stack technique complet — Backend, DevOps, Cloud, Mobile et plus.",
    url: `${siteUrl}/#competences`,
  },
  robots: { index: false, follow: true },
};

export default function CompetencesRedirect() {
  redirect("/#expertise");
}
