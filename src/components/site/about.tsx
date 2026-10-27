import Image from "next/image";
import { ArrowUpRight, Download, MapPin, MoveUpRight } from "lucide-react";
import {
  certifications,
  education,
  experiences,
  site,
  softSkills,
} from "@/lib/content";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

export function About() {
  return (
    <section
      id="parcours"
      className="section about-section"
      aria-labelledby="about-title"
    >
      <div className="site-shell">
        <SectionHeading
          index="04"
          label="Parcours"
          title="Ingénieur, pas collectionneur de logos."
          intro="Une formation d'ingénieur, des stages qui touchent à la production et une pratique régulière du code, de l'infrastructure et des tests."
          id="about-title"
        />

        <div className="about-grid">
          <aside className="about-side">
            <Reveal distance={18}>
              <div className="about-bio">
                <p className="about-lead">
                  Je m&apos;appelle Zo Mahefa RANAIVO. Je construis des
                  applications utiles, puis je m&apos;assure qu&apos;elles
                  tiennent debout.
                </p>
                <p>
                  Formé à l&apos;ENI, j&apos;ai appris à relier le produit, le
                  système et la qualité. Mes projets vont de l&apos;ERP métier
                  au pipeline CI/CD, en passant par la supervision et les tests.
                  Ce qui m&apos;intéresse : comprendre le besoin, choisir le
                  juste niveau de complexité et laisser un système
                  compréhensible derrière moi.
                </p>
                <p>
                  Je documente mes décisions, je teste ce que je livre et je
                  considère la mise en production comme une partie du travail —
                  pas comme une formalité.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08} distance={18}>
              <div className="target-card">
                <span className="mono">CE QUE JE RECHERCHE</span>
                <p className="target-title">{site.availability}</p>
                <ul>
                  <li>Web & mobile · backend</li>
                  <li>DevOps & cloud</li>
                  <li>Qualité & automatisation</li>
                </ul>
                <div className="target-meta">
                  <span>
                    <MapPin className="size-3.5" aria-hidden="true" />
                    {site.location}
                  </span>
                  <span>{site.workModes}</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.14} distance={18}>
              <div className="about-extra">
                <div>
                  <span className="mono text-muted-foreground">LANGUES</span>
                  <p>
                    Français courant · Anglais technique (documentation et
                    échanges écrits) · Malgache natif
                  </p>
                </div>
                <div>
                  <span className="mono text-muted-foreground">FORMAT</span>
                  <p>Remote friendly · réponse sous 48 h ouvrées</p>
                </div>
                <a
                  href={site.cv}
                  download
                  className="button button-outline about-cv"
                >
                  <Download className="size-4" aria-hidden="true" />
                  Télécharger le CV
                  <span className="mono text-muted-foreground">PDF</span>
                </a>
              </div>
            </Reveal>
          </aside>

          <div className="about-main">
            <Reveal distance={18}>
              <div className="timeline-title-row">
                <h3 className="subsection-title">Expérience</h3>
                <span className="mono text-muted-foreground">
                  03 POSITIONS / STAGES
                </span>
              </div>
            </Reveal>

            <ol className="timeline">
              {experiences.map((experience, index) => (
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
                <h3 className="subsection-title">Formation</h3>
                <span className="mono text-muted-foreground">
                  ENI FIANARANTSOA
                </span>
              </div>
              <div className="education-grid">
                {education.map((item) => (
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
                <h3 className="subsection-title">Certifications</h3>
                <span className="mono text-muted-foreground">
                  ATTESTATIONS VÉRIFIABLES
                </span>
              </div>
              <div className="certification-grid">
                {certifications.map((certification) => (
                  <a
                    href={certification.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="certification-card"
                    key={certification.title}
                    aria-label={`Ouvrir l'attestation ${certification.title} au format PDF`}
                  >
                    <div className="certification-image">
                      <Image
                        src={certification.image}
                        alt={`Attestation ${certification.title}`}
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
                        Voir l&apos;attestation PDF
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
                SAVOIR-ÊTRE / CE QUI SE VOIT DANS LE TRAVAIL
              </span>
              <h3>La technique se prouve. Le comportement aussi.</h3>
            </div>
            <p>
              Pas une liste de mots dans un coin du CV : chaque qualité est
              reliée à une situation concrète de projet, de stage ou
              d&apos;équipe.
            </p>
          </div>
          <div className="soft-skills-grid">
            {softSkills.map((skill, index) => (
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
