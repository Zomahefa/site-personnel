import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV — Zo Mahefa RANAIVO",
  description:
    "CV de Zo Mahefa RANAIVO — Développeur Backend & DevOps. Compétences : Spring Boot, Java, Docker, Kubernetes, CI/CD, AWS, Terraform.",
  openGraph: {
    title: "CV — Zo Mahefa RANAIVO | Backend & DevOps",
    description:
      "Consultez le CV de Zo Mahefa RANAIVO — expert Spring Boot, DevOps et infrastructure cloud.",
  },
  alternates: {
    canonical: "https://zomahefa.dev/resume",
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
