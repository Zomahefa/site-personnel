"use client";

import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", hash: "", label: "Accueil" },
  { href: "/", hash: "projets", label: "Mes projets" },
  { href: "/", hash: "competences", label: "Compétences & Parcours" },
  { href: "/", hash: "contact", label: "Contactez moi" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    if (isHome && window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  }, [isHome]);

  function handleNav(href: string, hash: string) {
    setIsOpen(false);
    if (isHome) {
      if (!hash) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    } else {
      window.location.href = hash ? `/#${hash}` : "/";
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <button
          onClick={() => handleNav("/", "")}
          className="group text-sm md:text-base font-bold tracking-tight cursor-pointer transition-colors relative"
        >
          <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
            Zo Mahefa<span className="text-primary">~</span>IT
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.hash || "/"}
              onClick={() => handleNav(link.href, link.hash)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              {link.label}
            </button>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <nav className="container mx-auto flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.hash || "/"}
                onClick={() => handleNav(link.href, link.hash)}
                className="px-4 py-3 rounded-lg text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-accent text-left cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
