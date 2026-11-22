"use client";

import { ArrowRight, Check } from "lucide-react";
import { useI18n } from "@/components/language-provider";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

export function Process() {
  const { c } = useI18n();
  const { sections, process, ui } = c;

  return (
    <section
      id="methode"
      className="section process-section"
      aria-labelledby="process-title"
    >
      <div className="site-shell">
        <SectionHeading
          index={sections.method.index}
          label={sections.method.label}
          title={sections.method.title}
          intro={sections.method.intro}
          id="process-title"
        />

        <Reveal className="process-split" distance={18}>
          <div className="process-split-copy">
            <span className="mono">{process.calloutKicker}</span>
            <p className="process-split-lead">{process.calloutLead}</p>
            <p className="process-split-text">{process.calloutText}</p>
            <div className="process-split-bar" aria-hidden="true">
              <span className="bar-code" />
              <span className="bar-method" />
            </div>
          </div>

          <div className="process-roles">
            <div className="process-role is-chief">
              <span className="mono">{process.aiChiefLabel}</span>
              <p>{process.aiChiefText}</p>
            </div>
            <div className="process-role is-copilot">
              <span className="mono">{process.aiCopilotLabel}</span>
              <p>{process.aiCopilotText}</p>
            </div>
          </div>
        </Reveal>

        <div className="process-grid">
          {process.steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.07} distance={20}>
              <article className="process-step">
                <div className="process-number">{step.number}</div>
                <div className="process-dot" aria-hidden="true" />
                {step.accent ? (
                  <span className="process-tag mono">{process.accentTag}</span>
                ) : null}
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <div className="process-deliverable">
                  <span className="mono">{ui.deliverableLabel}</span>
                  <span>{step.deliverable}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal distance={14}>
          <p className="process-question">{process.question}</p>
        </Reveal>

        <Reveal className="engagements" distance={18}>
          <div className="engagements-copy">
            <span className="mono">{process.engagementsKicker}</span>
            <p>{process.engagementsTitle}</p>
          </div>
          <ul className="engagement-list">
            {process.engagements.map((item) => (
              <li key={item}>
                <Check className="size-3.5" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <a href="#contact" className="text-link engagements-link">
            {process.cta}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
