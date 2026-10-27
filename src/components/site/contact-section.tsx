import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Download,
  MapPin,
  Phone,
} from "lucide-react";
import { site } from "@/lib/content";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { CopyEmail } from "@/components/site/copy-email";
import { ContactForm } from "@/components/site/contact-form";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="section contact-section"
      aria-labelledby="contact-title"
    >
      <div className="contact-glow" aria-hidden="true" />
      <div className="site-shell">
        <SectionHeading
          index="05"
          label="Contact"
          title="Un projet à cadrer ? Une équipe à renforcer ?"
          intro="Décrivez le contexte en quelques lignes. Je vous réponds sous 48 h ouvrées, avec une première lecture du besoin et les prochaines étapes."
          id="contact-title"
        />

        <div className="contact-layout">
          <div className="contact-info">
            <Reveal distance={18}>
              <div className="contact-direct">
                <span className="mono text-muted-foreground">ÉCRIRE DIRECTEMENT</span>
                <CopyEmail />
                <a href={site.phoneHref} className="contact-phone">
                  <Phone className="size-4" aria-hidden="true" />
                  {site.phone}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.06} distance={18}>
              <div className="contact-paths">
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(
                    "Opportunité — recrutement",
                  )}`}
                  className="contact-path"
                >
                  <span className="contact-path-icon">
                    <BriefcaseBusiness className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="mono">RECRUTEUR</span>
                    <strong>Un poste, un stage ou une alternance</strong>
                    <small>CV, disponibilité et références de projets.</small>
                  </span>
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(
                    "Mission — cadrage de projet",
                  )}`}
                  className="contact-path"
                >
                  <span className="contact-path-icon">
                    <CalendarDays className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="mono">CLIENT</span>
                    <strong>Un produit à concevoir ou à fiabiliser</strong>
                    <small>Un premier échange de 30 minutes, sans engagement.</small>
                  </span>
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1} distance={18}>
              <div className="contact-meta">
                <span>
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {site.location} · remote possible
                </span>
                <span>
                  <span className="status-dot" aria-hidden="true" />
                  {site.availability}
                </span>
              </div>
              <div className="contact-socials">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  <GithubIcon className="size-4" />
                  GitHub
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  <LinkedinIcon className="size-4" />
                  LinkedIn
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
                <a href={site.cv} download className="text-link">
                  <Download className="size-4" />
                  CV PDF
                </a>
                <a
                  href={site.profileEn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  <Download className="size-4" />
                  Profile EN
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08} distance={24} className="contact-form-wrap">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
