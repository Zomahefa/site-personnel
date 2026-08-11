import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Découvrez les projets de Zo Mahefa RANAIVO — applications web fullstack, DevOps, mobile et administration système.",
  alternates: {
    canonical: "https://zomahefa.dev/projets",
  },
  openGraph: {
    title: "Projets | Zo Mahefa RANAIVO",
    description:
      "Portfolio de projets — applications web, DevOps, mobile et administration système.",
    url: "https://zomahefa.dev/projets",
  },
};

export default function ProjetsRedirect() {
  redirect("/#projets");
}
