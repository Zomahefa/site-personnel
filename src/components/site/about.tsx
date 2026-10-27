"use client";

import Image from "next/image";
import { ArrowUpRight, Download, MapPin, MoveUpRight } from "lucide-react";
import { site } from "@/lib/content";
import { useI18n } from "@/components/language-provider";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

export function About() {
  const { c } = useI18n();
  const { about, sections } = c;

  return (
    <section
      id="parcours"
      className="section about-section"
      aria-labelledby="about-title"
    >
      <div className="site-shell">
        <SectionHeading
          index={sections.about.index}
          label={sections.about.label}
          title={sections.about.title}
          intro={sections.about.intro}
          id="about-title"
        />

        <div className="about-grid">
          <aside className="about-side">
            <Reveal distance={18}>
              <div className="about-bio">
                <p className="about-lead">{about.lead}</p>
                <p>{about.body1}</p>
                <p>{about.body2}</p>
              </div>
            </Reveal>

            <Reveal delay={0.08} distance={18}>
              <div className="target-card">
                <span className="mono">{about.targetKicker}</span>
                <p className="target-title">{c.availability}</p>
                <ul>
                  {about.targetItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="target-meta">
                  <span>
                    <MapPin className="size-3.5" aria-hidden="true" />
                    {c.location}
                  </span>
                  <span>{c.workModes}</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.14} distance={18}>
              <div className="about-extra">
                <div>
                  <span className="mono text-muted-foreground">
                    {about.languagesLabel}
                  </span>
                  <p>{about.languages}</p>
                </div>
                <div>
                  <span className="mono text-muted-foreground">
                    {about.formatLabel}
                  </span>
                  <p>{about.format}</p>
                </div>
                <a
                  href={site.cv}
                  download
                  className="button button-outline about-cv"
                >
                  <Download className="size-4" aria-hidden="true" />
                  {about.cvCta}
                  <span className="mono text-muted-foreground">PDF</span>
                </a>
              </div>
            </Reveal>
          </aside>

          <div className="about-main">
            <Reveal distance={18}>
              <div className="timeline-title-row">
                <h3 className="subsection-title">{about.experienceTitle}</h3>
                <span className="mono text-muted-foreground">
                  {about.experienceCount}
                </span>
              </div>
            </Reveal>

            <ol className="timeline">
              {about.experiences.map((experience, index) => (
                <li
                  className="timeline-item"
                  key={`${experience.period}-${experience.title}`}
                >
                  <div className="timeline-marker" aria-hidden="true">
                    <span />
                  </div>
                  <Reveal
                    className="timeline-content"
                    delay={index * 0.06}
                    distance={20}
                  >
                    <div className="timeline-meta">
                      <span className="mono">{experience.period}</span>
                      <span className="mono">{experience.company}</span>
                    </div>
                    <h4>{experience.title}</h4>
                    <p>{experience.text}</p>
                    <ul className="timeline-tags">
                      {experience.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </Reveal>
                </li>
              ))}
            </ol>

            <Reveal className="education-block" distance={18}>
              <div className="timeline-title-row">
                <h3 className="subsection-title">{about.educationTitle}</h3>
                <span className="mono text-muted-foreground">
                  {about.educationSchool}
                </span>
              </div>
              <div className="education-grid">
                {about.education.map((item) => (
                  <article className="education-card" key={item.title}>
                    <span className="mono">{item.period}</span>
                    <h4>{item.title}</h4>
                    <p className="education-school">{item.school}</p>
                    <p>{item.detail}</p>
                  </article>
                ))}
              </div>
            </Reveal>

            <Reveal className="certifications-block" distance={18}>
              <div className="timeline-title-row">
                <h3 className="subsection-title">
                  {about.certificationsTitle}
                </h3>
                <span className="mono text-muted-foreground">
                  {about.certificationsNote}
                </span>
              </div>
              <div className="certification-grid">
                {about.certifications.map((certification) => (
                  <a
                    href={certification.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="certification-card"
                    key={certification.title}
                    aria-label={`${about.certificationOpen} — ${certification.title}`}
                  >
                    <div className="certification-image">
                      <Image
                        src={certification.image}
                        alt={`${certification.title} — Zo Mahefa`}
                        width={1600}
                        height={1131}
                        sizes="(max-width: 767px) 90vw, 300px"
                        className="object-cover"
                      />
                      <span className="certification-open">
                        <MoveUpRight className="size-4" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="certification-copy">
                      <span className="mono">
                        {certification.issuer} · {certification.year}
                      </span>
                      <h4>{certification.title}</h4>
                      <span className="certification-link">
                        {about.certificationSee}
                        <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="soft-skills-block" distance={22}>
          <div className="soft-skills-head">
            <div>
              <span className="mono text-muted-foreground">
                {about.softKicker}
              </span>
              <h3>{about.softTitle}</h3>
            </div>
            <p>{about.softIntro}</p>
          </div>
          <div className="soft-skills-grid">
            {about.softSkills.map((skill, index) => (
              <article className="soft-skill" key={skill.title}>
                <span className="mono soft-skill-index">
                  S{String(index + 1).padStart(2, "0")}
                </span>
                <h4>{skill.title}</h4>
                <p>{skill.text}</p>
                <span className="soft-skill-proof">{skill.proof}</span>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
