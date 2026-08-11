import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = "https://zomahefa.dev";

export const metadata: Metadata = {
  title: {
    default: "Zo Mahefa RANAIVO | Développeur Backend & DevOps Java Spring Boot Madagascar",
    template: "%s | Zo Mahefa RANAIVO",
  },
  description:
    "Portfolio de Zo Mahefa RANAIVO, développeur Backend & DevOps basé à Fianarantsoa, Madagascar. Expert Spring Boot, Java, Docker, Kubernetes, CI/CD et infrastructure cloud. Conception et déploiement d'applications modernes et industrialisées.",
  keywords: [
    "Zo Mahefa",
    "Zo Mahefa RANAIVO",
    "développeur Madagascar",
    "Backend Madagascar",
    "DevOps Madagascar",
    "Java Spring Boot",
    "développeur Java",
    "Spring Boot Madagascar",
    "Fianarantsoa",
    "ENI Madagascar",
    "portfolio développeur",
    "CI/CD",
    "Docker",
    "Kubernetes",
  ],
  icons: [{ rel: "icon", url: "/photo-ronde.png" }],
  verification: { google: "google81dfecfc5d73987c" },
  robots: { index: true, follow: true },
  alternates: {
    canonical: baseUrl,
    languages: { "fr-FR": baseUrl },
  },
  openGraph: {
    title: "Zo Mahefa RANAIVO | Développeur Backend & DevOps",
    description:
      "Portfolio de Zo Mahefa RANAIVO — Développeur Backend & DevOps spécialisé Java/Spring Boot, Docker, Kubernetes et CI/CD. Basé à Fianarantsoa, Madagascar.",
    url: baseUrl,
    type: "website",
    locale: "fr_FR",
    siteName: "Zo Mahefa RANAIVO",
    images: [{ url: `${baseUrl}/photo-cv.png`, width: 400, height: 400 }],
  },
  twitter: {
    card: "summary",
    title: "Zo Mahefa RANAIVO | Développeur Backend & DevOps",
    description:
      "Portfolio de Zo Mahefa RANAIVO — Java/Spring Boot, DevOps, Docker, Kubernetes, CI/CD.",
    images: [`${baseUrl}/photo-cv.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Zo Mahefa RANAIVO",
              givenName: "Zo Mahefa",
              familyName: "RANAIVO",
              jobTitle: "Développeur Backend & DevOps",
              description:
                "Développeur Backend & DevOps spécialisé Java/Spring Boot. Basé à Fianarantsoa, Madagascar.",
              url: baseUrl,
              image: `${baseUrl}/photo-cv.png`,
              email: "zomahefa.ranaivo@gmail.com",
              telephone: "+261385442252",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Fianarantsoa",
                addressCountry: "MG",
              },
              sameAs: [
                "https://github.com/Zomahefa",
                "https://www.linkedin.com/in/zo-mahefa-ranaivo-338026346/",
              ],
              knowsAbout: [
                "Java",
                "Spring Boot",
                "Spring Security",
                "Docker",
                "Kubernetes",
                "AWS",
                "GCP",
                "Terraform",
                "CI/CD",
                "DevOps",
                "PostgreSQL",
                "Next.js",
                "TypeScript",
              ],
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "ENI (École Nationale d'Informatique)",
              },
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                let theme = localStorage.getItem('theme');
                if (!theme) theme = 'light';
                document.documentElement.classList.remove('dark', 'light');
                document.documentElement.classList.add(theme);
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
