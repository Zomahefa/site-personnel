"use client";

import { ArrowUp, Mail, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/content";
import { useI18n } from "@/components/language-provider";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { LocalClock } from "@/components/site/local-clock";

export function Footer() {
  const { c } = useI18n();
  const { footer, nav, ui } = c;
  const pathname = usePathname();
  const onHome = pathname === "/";
  const anchor = (id: string) => (onHome ? `#${id}` : `/#${id}`);
  const homeHref = onHome ? "#top" : "/";

  return (
    <footer className="site-footer">
      <div className="site-shell">
        <div className="footer-top">
          <div className="footer-identity">
            <a href={homeHref} className="footer-brand" aria-label={ui.brandAria}>
              ZM<span className="text-brand">.</span>
            </a>
            <p>
              {footer.taglineLine1}
              <br />
              {footer.taglineLine2}
            </p>
            <div className="footer-coordinates">
              <span title={ui.coordinatesAria}>
                <MapPin className="size-3.5" aria-hidden="true" />
                {c.location}
              </span>
              <span className="mono footer-gps" title={ui.coordinatesAria}>
                {site.coordinates}
              </span>
              <LocalClock />
            </div>
          </div>

          <nav className="footer-nav" aria-label={footer.navLabel}>
            <span className="mono">INDEX</span>
            {nav.map((item) => (
              <a href={anchor(item.id)} key={item.id}>
                <span className="mono">{item.index}</span>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="footer-contact">
            <span className="mono">{footer.contactLabel}</span>
            <a href={`mailto:${site.email}`}>
              <Mail className="size-3.5" aria-hidden="true" />
              {site.email}
            </a>
            <a href={site.phoneHref}>{site.phone}</a>
            <div className="footer-socials">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub — Zo Mahefa"
              >
                <GithubIcon className="size-4" />
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn — Zo Mahefa"
              >
                <LinkedinIcon className="size-4" />
              </a>
              <a href={site.cv} download className="footer-cv">
                {footer.cv}
              </a>
            </div>
          </div>
        </div>

        <div className="footer-wordmark" aria-hidden="true">
          <span>ZO MAHEFA</span>
          <span className="text-brand">.</span>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Zo Mahefa RANAIVO. {footer.rights}
          </p>
          <p className="footer-built">{footer.built}</p>
          <a href={homeHref} className="footer-back">
            {footer.backToTop}
            <ArrowUp className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
