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

        <div className="process-grid">
          {process.steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.07} distance={20}>
              <article className="process-step">
                <div className="process-number">{step.number}</div>
                <div className="process-dot" aria-hidden="true" />
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
