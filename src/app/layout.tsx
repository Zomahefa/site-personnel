import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Toaster } from "@/components/ui/sonner";
import { VisitTracker } from "@/components/site/visit-tracker";
import { site, siteUrl } from "@/lib/content";
import "./globals.css";

const title =
  "Zo Mahefa RANAIVO — Développeur web & mobile, DevOps, QA";
const description =
  "Web & mobile, DevOps et QA à Madagascar. Je conçois, déploie et teste des applications fiables. Disponible en remote pour un stage, une alternance ou une mission.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Zo Mahefa RANAIVO",
  },
  description,
  applicationName: "Zo Mahefa RANAIVO — Portfolio",
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/",
    },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Zo Mahefa RANAIVO",
    title,
    description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zo Mahefa RANAIVO — Développeur web, DevOps et QA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: { google: "google81dfecfc5d73987c" },
  other: {
    "profile:first_name": "Zo Mahefa",
    "profile:last_name": "RANAIVO",
    "profile:username": "Zomahefa",
  },
  formatDetection: { email: false, address: false, telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f0e8" },
    { media: "(prefers-color-scheme: dark)", color: "#10110d" },
  ],
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: site.name,
      alternateName: ["Zomahefa", "Zo Mahefa", "Zo Mahefa RANAIVO"],
      givenName: "Zo Mahefa",
      familyName: "RANAIVO",
      jobTitle: [
        "Développeur web & mobile",
        "Ingénieur DevOps",
        "Testeur QA",
      ],
      description:
        "Développeur web & mobile, ingénieur DevOps et testeur QA basé à Fianarantsoa, Madagascar.",
      url: siteUrl,
      image: `${siteUrl}/photo-cv.png`,
      email: site.email,
      telephone: "+261385442252",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Fianarantsoa",
        addressCountry: "MG",
      },
      sameAs: [site.github, site.linkedin, siteUrl],
      mainEntityOfPage: { "@id": `${siteUrl}/#profile` },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "ENI — École Nationale d'Informatique",
      },
      knowsLanguage: ["fr", "en", "mg"],
      knowsAbout: [
        "Java",
        "Spring Boot",
        "PostgreSQL",
        "Docker",
        "GitHub Actions",
        "Kubernetes",
        "Next.js",
        "Quality Assurance",
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "Ingénieur logiciel",
        occupationLocation: {
          "@type": "Country",
          name: "Madagascar",
        },
        skills:
          "Développement web et mobile, DevOps, CI/CD, tests logiciels, supervision",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Zo Mahefa RANAIVO — Portfolio",
      alternateName: "Zomahefa",
      inLanguage: "fr-FR",
      publisher: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile`,
      url: siteUrl,
      name: title,
      description,
      inLanguage: "fr-FR",
      dateModified: "2026-10-26",
      mainEntity: { "@id": `${siteUrl}/#person` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${siteUrl}/og-image.png`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/instrument-serif-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/geist-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="me" href={site.github} />
        <link rel="me" href={site.linkedin} />
        <meta name="author" content={site.name} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.classList.add('js');
              try {
                var theme = localStorage.getItem('theme') || 'light';
                document.documentElement.classList.remove('dark', 'light');
                document.documentElement.classList.add(theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Aller au contenu
        </a>
        <ThemeProvider>
          <VisitTracker />
          <div className="site-frame">
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </div>
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
