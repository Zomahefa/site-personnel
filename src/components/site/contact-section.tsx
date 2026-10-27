"use client";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Download,
  MapPin,
  Phone,
} from "lucide-react";
import { site } from "@/lib/content";
import { useI18n } from "@/components/language-provider";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { CopyEmail } from "@/components/site/copy-email";
import { ContactForm } from "@/components/site/contact-form";

export function ContactSection() {
  const { c, locale } = useI18n();
  const { contact, sections } = c;
  const isFr = locale === "fr";

  return (
    <section
      id="contact"
      className="section contact-section"
      aria-labelledby="contact-title"
    >
      <div className="contact-glow" aria-hidden="true" />
      <div className="site-shell">
        <SectionHeading
          index={sections.contact.index}
          label={sections.contact.label}
          title={sections.contact.title}
          intro={sections.contact.intro}
          id="contact-title"
        />

        <div className="contact-layout">
          <div className="contact-info">
            <Reveal distance={18}>
              <div className="contact-direct">
                <span className="mono text-muted-foreground">
                  {contact.directLabel}
                </span>
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
                    isFr
                      ? "Opportunité — recrutement"
                      : "Opportunity — recruitment",
                  )}`}
                  className="contact-path"
                >
                  <span className="contact-path-icon">
                    <BriefcaseBusiness className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="mono">{contact.recruiterLabel}</span>
                    <strong>{contact.recruiterTitle}</strong>
                    <small>{contact.recruiterText}</small>
                  </span>
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(
                    isFr
                      ? "Mission — cadrage de projet"
                      : "Mission — project scoping",
                  )}`}
                  className="contact-path"
                >
                  <span className="contact-path-icon">
                    <CalendarDays className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="mono">{contact.clientLabel}</span>
                    <strong>{contact.clientTitle}</strong>
                    <small>{contact.clientText}</small>
                  </span>
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1} distance={18}>
              <div className="contact-meta">
                <span>
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {c.location} · {contact.locationNote}
                </span>
                <span>
                  <span className="status-dot" aria-hidden="true" />
                  {c.availability}
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
                  {contact.cv}
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
