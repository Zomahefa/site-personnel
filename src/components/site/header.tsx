"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navItems, site } from "@/lib/content";
import { LocalClock } from "@/components/site/local-clock";
import { ThemeToggle } from "@/components/site/theme-toggle";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("");

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
        setScrolled(window.scrollY > 24);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0.05, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header
      className={`site-header ${scrolled ? "is-scrolled" : ""}`}
      data-open={open ? "true" : "false"}
    >
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
      <div className="site-shell header-inner">
        <Link href="#top" className="brand" aria-label="Zo Mahefa — retour en haut">
          <span className="brand-mark">
            ZM<span className="text-brand">.</span>
          </span>
          <span className="brand-name">
            Zo Mahefa RANAIVO
            <span className="brand-role">Ingénieur logiciel</span>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Navigation principale">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${active === item.id ? "is-active" : ""}`}
              aria-current={active === item.id ? "location" : undefined}
            >
              <span className="nav-index">{item.index}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <span className="availability-pill hidden xl:inline-flex">
            <span className="availability-dot" aria-hidden="true" />
            Disponible
          </span>
          <LocalClock />
          <ThemeToggle />
          <a href="#contact" className="button button-dark header-cta">
            Me contacter
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
          <button
            type="button"
            className="icon-button menu-toggle"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <noscript>
        <style>{`
          .site-header { height: auto; }
          .menu-toggle { display: none !important; }
          .nojs-nav { border-top: 1px solid var(--border); background: var(--background); }
          .nojs-nav .site-shell { display: flex; gap: 1rem; overflow-x: auto; padding: 0.65rem 0; }
          .nojs-nav a { font-size: 0.75rem; white-space: nowrap; }
          @media (min-width: 1180px) { .nojs-nav { display: none; } }
        `}</style>
        <div className="nojs-nav">
          <div className="site-shell">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </noscript>

      <div
        id="mobile-navigation"
        className="mobile-navigation"
        aria-hidden={!open}
      >
        <nav aria-label="Navigation mobile">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="mobile-nav-link"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
            >
              <span className="mono">{item.index}</span>
              <span>{item.label}</span>
              <span className="mobile-nav-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </nav>
        <div className="mobile-navigation-footer">
          <p>
            <span className="status-dot" aria-hidden="true" />
            {site.availability}
          </p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <p className="text-muted-foreground">
            {site.location} · sur site ou à distance
          </p>
        </div>
      </div>
    </header>
  );
}
