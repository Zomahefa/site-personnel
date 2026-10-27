import { ArrowUp, Mail, MapPin } from "lucide-react";
import { navItems, site } from "@/lib/content";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { LocalClock } from "@/components/site/local-clock";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-shell">
        <div className="footer-top">
          <div className="footer-identity">
            <a href="#top" className="footer-brand" aria-label="Retour en haut">
              ZM<span className="text-brand">.</span>
            </a>
            <p>
              Ingénieur logiciel — web, mobile,
              <br />
              cloud et qualité.
            </p>
            <div className="footer-coordinates">
              <span>
                <MapPin className="size-3.5" aria-hidden="true" />
                {site.location}
              </span>
              <LocalClock />
            </div>
          </div>

          <nav className="footer-nav" aria-label="Navigation de pied de page">
            <span className="mono">INDEX</span>
            {navItems.map((item) => (
              <a href={`#${item.id}`} key={item.id}>
                <span className="mono">{item.index}</span>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="footer-contact">
            <span className="mono">CONTACT</span>
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
                aria-label="GitHub de Zo Mahefa"
              >
                <GithubIcon className="size-4" />
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Zo Mahefa"
              >
                <LinkedinIcon className="size-4" />
              </a>
              <a href={site.cv} download className="footer-cv">
                CV PDF
              </a>
              <a
                href={site.profileEn}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-cv"
              >
                Profile EN
              </a>
            </div>
          </div>
        </div>

        <div className="footer-wordmark" aria-hidden="true">
          <span>ZO MAHEFA</span>
          <span className="text-brand">.</span>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Zo Mahefa RANAIVO. Tous droits réservés.</p>
          <p className="footer-built">
            Conçu, développé et déployé avec Next.js.
          </p>
          <a href="#top" className="footer-back">
            Haut de page
            <ArrowUp className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
