import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Zo Mahefa RANAIVO — développeur Backend & DevOps basé à Fianarantsoa, Madagascar. Discutons de votre projet.",
  alternates: {
    canonical: "https://zomahefa.dev/contact",
  },
  openGraph: {
    title: "Contact | Zo Mahefa RANAIVO",
    description:
      "Discutons de votre projet — formulaire de contact et coordonnées.",
    url: "https://zomahefa.dev/contact",
  },
};

export default function ContactRedirect() {
  redirect("/#contact");
}
