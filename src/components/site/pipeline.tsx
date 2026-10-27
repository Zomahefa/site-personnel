"use client";

import { ArrowUpRight, GitBranch, ShieldCheck } from "lucide-react";
import { useI18n } from "@/components/language-provider";
import { Reveal } from "@/components/site/reveal";
import { TypewriterHeading } from "@/components/site/typewriter";

export function Pipeline() {
  const { c } = useI18n();
  const { pipeline } = c;

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
              <span className="section-label mono">{pipeline.label}</span>
              <span className="section-kicker-line" aria-hidden="true" />
            </div>
          </Reveal>
          <div className="pipeline-title-row">
            <TypewriterHeading
              text={pipeline.title}
              id="pipeline-title"
              className="pipeline-title type-title"
            />
            <p className="pipeline-intro">{pipeline.intro}</p>
          </div>
        </div>

        <div className="pipeline-diagram">
          <div className="pipeline-track" aria-hidden="true">
            <span className="pipeline-traveler" />
          </div>
          {pipeline.steps.map((step, index) => (
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
              <strong>{pipeline.principleLabel}</strong> {pipeline.principle}
            </p>
          </div>
          <div className="pipeline-site-card">
            <div>
              <span className="mono">{pipeline.deliverablesLabel}</span>
              <p>{pipeline.deliverables}</p>
            </div>
            <a href="#contact" className="button button-ghost-dark">
              {pipeline.cta}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        <div className="pipeline-bottomline">
          <span className="mono">
            <GitBranch className="inline size-3.5" aria-hidden="true" />{" "}
            {pipeline.footerLeft}
          </span>
          <span className="mono">{pipeline.footerRight}</span>
        </div>
      </div>
    </section>
  );
}
