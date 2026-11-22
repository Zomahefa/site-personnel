"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown, ExternalLink, Lock } from "lucide-react";
import {
  mailtoForProject,
  site,
  type FeaturedProject,
} from "@/lib/content";
import { useI18n } from "@/components/language-provider";
import { GithubIcon } from "@/components/icons";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { ProjectVisual } from "@/components/site/project-visual";
import { ProjectGallery } from "@/components/site/project-gallery";

export function SelectedWork() {
  const { c } = useI18n();
  const { featuredProjects, archive, sections, ui } = c;

  return (
    <section
      id="projets"
      className="section projects-section"
      aria-labelledby="projects-title"
    >
      <div className="site-shell">
        <SectionHeading
          index={sections.projects.index}
          label={sections.projects.label}
          title={sections.projects.title}
          intro={sections.projects.intro}
          id="projects-title"
        />

        <div className="project-list">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectRow
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        <Reveal className="archive" distance={22}>
          <div className="archive-header">
            <div>
              <span className="mono text-muted-foreground">{archive.kicker}</span>
              <h3 className="archive-title">{archive.title}</h3>
            </div>
            <p className="archive-copy">{archive.copy}</p>
          </div>

          <div className="archive-list" role="list">
            {archive.projects.map((project, index) => {
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
                        {ui.archiveCode}
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
                  aria-label={`${project.title} · ${ui.archiveRepoAria}`}
                >
                  {content}
                </a>
              ) : (
                <div
                  className="archive-row is-static"
                  key={project.title}
                  role="listitem"
                >
                  {content}
                </div>
              );
            })}
          </div>

          <div className="archive-footer">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              <GithubIcon className="size-4" />
              {archive.allRepos}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FeaturedProjectRow({
  project,
  index,
}: {
  project: FeaturedProject;
  index: number;
}) {
  const { c } = useI18n();
  const { ui } = c;
  const [expanded, setExpanded] = useState(false);
  const detailsId = `project-details-${project.id}`;

  return (
    <Reveal delay={index * 0.04} distance={28}>
      <article
        className={`project-row ${index % 2 === 1 ? "is-reversed" : ""} ${
          expanded ? "is-expanded" : ""
        }`}
      >
        <div className="project-visual-col">
          {project.gallery?.length ? (
            <ProjectGallery captures={project.gallery} title={project.title} />
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

          <button
            type="button"
            className="project-toggle"
            aria-expanded={expanded}
            aria-controls={detailsId}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? ui.lessDetails : ui.moreDetails}
            <ChevronDown className="size-3.5" aria-hidden="true" />
          </button>

          <div className="project-details" id={detailsId}>
            <p className="project-subtitle">{project.subtitle}</p>
            <p className="project-summary">{project.summary}</p>
            <p className="project-context">{project.context}</p>

            <dl className="case-study">
              <div>
                <dt>{ui.caseProblem}</dt>
                <dd>{project.problem}</dd>
              </div>
              <div>
                <dt>{ui.caseRole}</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>{ui.caseOutcome}</dt>
                <dd>{project.outcome}</dd>
              </div>
            </dl>

            <div className="project-bottom">
              <ul className="tag-list" aria-label={ui.technologies}>
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
                    aria-label={`${project.demoLabel ?? ui.viewDemo} · ${project.title}`}
                  >
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                    {project.demoLabel ?? ui.viewDemo}
                  </a>
                ) : null}
                {project.repo ? (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                    aria-label={`${project.title} · ${ui.archiveRepoAria}`}
                  >
                    <GithubIcon className="size-4" />
                    {ui.viewCode}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                ) : null}
                {project.privateCode ? (
                  <a
                    href={mailtoForProject(project.title)}
                    className="text-link"
                    aria-label={`${ui.caseStudy} · ${project.title}`}
                  >
                    <Lock className="size-3.5" aria-hidden="true" />
                    {ui.caseStudy}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
