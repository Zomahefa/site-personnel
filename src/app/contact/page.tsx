import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { siteUrl } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Zo Mahefa RANAIVO — développeur web, DevOps et QA à Fianarantsoa, Madagascar. Discutons de votre projet.",
  alternates: {
    canonical: `${siteUrl}/#contact`,
  },
  openGraph: {
    title: "Contact | Zo Mahefa RANAIVO",
    description:
      "Discutons de votre projet — formulaire de contact et coordonnées.",
    url: `${siteUrl}/#contact`,
  },
  robots: { index: false, follow: true },
};

export default function ContactRedirect() {
  redirect("/#contact");
}
