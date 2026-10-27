import { ArrowUpRight, ExternalLink, Lock } from "lucide-react";
import {
  archiveProjects,
  featuredProjects,
  mailtoForProject,
  site,
} from "@/lib/content";
import { GithubIcon } from "@/components/icons";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { ProjectVisual } from "@/components/site/project-visual";
import { ProjectGallery } from "@/components/site/project-gallery";

export function SelectedWork() {
  return (
    <section
      id="projets"
      className="section projects-section"
      aria-labelledby="projects-title"
    >
      <div className="site-shell">
        <SectionHeading
          index="01"
          label="Travaux sélectionnés"
          title="Des preuves, pas des promesses."
          intro="Trois projets, trois problèmes réels. Le contexte, mon rôle et le résultat — sans chiffre que je ne peux pas défendre en entretien."
          id="projects-title"
        />

        <div className="project-list">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.04} distance={28}>
              <article className={`project-row ${index % 2 === 1 ? "is-reversed" : ""}`}>
                <div className="project-visual-col">
                  {project.gallery?.length ? (
                    <ProjectGallery
                      captures={project.gallery}
                      title={project.title}
                    />
                  ) : (
                    <ProjectVisual kind={project.visual} title={project.title} />
                  )}
                </div>

                <div className="project-content">
                  <div className="project-meta">
                    <span className="project-index mono">{project.index}</span>
                    <span className="mono">{project.year}</span>
                    <span className="mono">{project.category}</span>
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-subtitle">{project.subtitle}</p>
                  <p className="project-summary">{project.summary}</p>
                  <p className="project-context">{project.context}</p>

                  <dl className="case-study">
                    <div>
                      <dt>Le problème</dt>
                      <dd>{project.problem}</dd>
                    </div>
                    <div>
                      <dt>Mon rôle</dt>
                      <dd>{project.role}</dd>
                    </div>
                    <div>
                      <dt>Le résultat</dt>
                      <dd>{project.outcome}</dd>
                    </div>
                  </dl>

                  <div className="project-bottom">
                    <ul className="tag-list" aria-label="Technologies utilisées">
                      {project.stack.map((tech) => (
                        <li className="tag" key={tech}>
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <div className="project-links">
                      {project.demo ? (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button button-dark project-demo"
                          aria-label={`${project.demoLabel ?? "Voir la démo"} de ${project.title}`}
                        >
                          <ExternalLink className="size-3.5" aria-hidden="true" />
                          {project.demoLabel ?? "Voir la démo"}
                        </a>
                      ) : null}
                      {project.repo ? (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-link"
                          aria-label={`Voir le code source de ${project.title} sur GitHub`}
                        >
                          <GithubIcon className="size-4" />
                          Code source
                          <ArrowUpRight className="size-3.5" aria-hidden="true" />
                        </a>
                      ) : null}
                      {project.privateCode ? (
                        <a
                          href={mailtoForProject(project.title)}
                          className="text-link"
                          aria-label={`Demander l'étude de cas du projet ${project.title}`}
                        >
                          <Lock className="size-3.5" aria-hidden="true" />
                          Étude de cas sur demande
                          <ArrowUpRight className="size-3.5" aria-hidden="true" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="archive" distance={22}>
          <div className="archive-header">
            <div>
              <span className="mono text-muted-foreground">ARCHIVE / 06</span>
              <h3 className="archive-title">Autres projets & labs</h3>
            </div>
            <p className="archive-copy">
              Le reste du terrain : desktop, réseau, systèmes et projets
              académiques. Les dépôts publics sont ouverts.
            </p>
          </div>

          <div className="archive-list" role="list">
            {archiveProjects.map((project, index) => {
              const content = (
                <>
                  <span className="archive-index mono">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="archive-main">
                    <span className="archive-name">{project.title}</span>
                    <span className="archive-meta">
                      {project.category} · {project.year}
                    </span>
                  </span>
                  <span className="archive-stack mono">{project.stack}</span>
                  <span className="archive-action">
                    {project.href ? (
                      <>
                        Code
                        <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      </>
                    ) : (
                      <span className="archive-lab">{project.label}</span>
                    )}
                  </span>
                </>
              );

              return project.href ? (
                <a
                  className="archive-row"
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={project.title}
                  role="listitem"
                  aria-label={`${project.title} — voir le code sur GitHub`}
                >
                  {content}
                </a>
              ) : (
                <div className="archive-row is-static" key={project.title} role="listitem">
                  {content}
                </div>
              );
            })}
          </div>

          <div className="archive-footer">
            <span className="mono text-muted-foreground">
              ZÉRO LIEN MORT — LES PROJETS PRIVÉS SONT SIGNALÉS
            </span>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              <GithubIcon className="size-4" />
              Tous mes dépôts publics
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
