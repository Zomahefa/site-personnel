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

export const metadata: Metadata = {
  title: {
    default: "Zo Mahefa RANAIVO | Fullstack & DevOps",
    template: "%s | Zo Mahefa RANAIVO",
  },
  description:
    "Portfolio de Zo Mahefa RANAIVO - Développeur Fullstack & DevOps. Conception, développement et déploiement d'applications modernes.",
  icons: [{ rel: "icon", url: "/photo-ronde.png" }],
  verification: { google: "google81dfecfc5d73987c" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Zo Mahefa RANAIVO | Fullstack & DevOps",
    description:
      "Développeur Fullstack & DevOps spécialisé dans la conception, le développement et le déploiement d'applications web modernes.",
    type: "website",
    locale: "fr_FR",
    siteName: "Zo Mahefa RANAIVO",
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
