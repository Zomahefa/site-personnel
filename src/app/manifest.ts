import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zo Mahefa RANAIVO — Portfolio",
    short_name: "Zo Mahefa",
    description:
      "Développeur web & mobile, ingénieur DevOps et testeur QA. Projets, parcours et contact.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f0e8",
    theme_color: "#12130e",
    lang: "fr",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
