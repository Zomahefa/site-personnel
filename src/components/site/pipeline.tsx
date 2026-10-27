import { ArrowUpRight, GitBranch, ShieldCheck } from "lucide-react";
import { pipelineSteps } from "@/lib/content";
import { Reveal } from "@/components/site/reveal";
import { TypewriterHeading } from "@/components/site/typewriter";

export function Pipeline() {
  return (
    <section
      className="pipeline-section"
      aria-labelledby="pipeline-title"
      id="livraison"
    >
      <div className="pipeline-grid-bg" aria-hidden="true" />
      <div className="site-shell">
        <div className="pipeline-head">
          <Reveal distance={12}>
            <div className="section-kicker is-dark">
              <span className="section-index mono">↳</span>
              <span className="section-label mono">Chaîne de livraison</span>
              <span className="section-kicker-line" aria-hidden="true" />
            </div>
          </Reveal>
          <div className="pipeline-title-row">
            <TypewriterHeading
              text="Du commit au monitoring."
              id="pipeline-title"
              className="pipeline-title type-title"
            />
            <p className="pipeline-intro">
              Une livraison ne s&apos;arrête pas au déploiement. Chaque étape
              laisse une trace, chaque incident peut être compris.
            </p>
          </div>
        </div>

        <div className="pipeline-diagram">
          <div className="pipeline-track" aria-hidden="true">
            <span className="pipeline-traveler" />
          </div>
          {pipelineSteps.map((step, index) => (
            <Reveal
              key={step.number}
              delay={index * 0.08}
              distance={18}
              className="pipeline-node-wrap"
            >
              <article className="pipeline-node">
                <div className="pipeline-node-top">
                  <span className="mono">{step.number}</span>
                  <span className="pipeline-node-label mono">{step.label}</span>
                </div>
                <div className="pipeline-node-dot" aria-hidden="true" />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="pipeline-footer" distance={18}>
          <div className="pipeline-principle">
            <ShieldCheck className="size-5" aria-hidden="true" />
            <p>
              <strong>Principe :</strong> un déploiement doit pouvoir être
              rejoué, observé et annulé. Pas de copier-coller en production.
            </p>
          </div>
          <div className="pipeline-site-card">
            <div>
              <span className="mono">LIVRABLES / RUNBOOK</span>
              <p>
                Pipeline, procédure de rollback et documentation de supervision
                remis avec le projet.
              </p>
            </div>
            <a href="#contact" className="button button-ghost-dark">
              Cadrer un projet
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        <div className="pipeline-bottomline">
          <span className="mono">
            <GitBranch className="inline size-3.5" aria-hidden="true" /> FLUX
            REJOUABLE · TESTS · LOGS · MÉTRIQUES
          </span>
          <span className="mono">DOCKER / GH ACTIONS / PROMETHEUS / VERCEL</span>
        </div>
      </div>
    </section>
  );
}
