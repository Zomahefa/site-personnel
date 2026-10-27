import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { siteUrl } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Découvrez les projets de Zo Mahefa RANAIVO — applications web fullstack, DevOps, mobile et administration système.",
  alternates: {
    canonical: `${siteUrl}/#projets`,
  },
  openGraph: {
    title: "Projets | Zo Mahefa RANAIVO",
    description:
      "Portfolio de projets — applications web, DevOps, mobile et administration système.",
    url: `${siteUrl}/#projets`,
  },
  robots: { index: false, follow: true },
};

export default function ProjetsRedirect() {
  redirect("/#projets");
}
