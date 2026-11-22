"use client";

import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/language-provider";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

export function Capabilities() {
  const { c } = useI18n();
  const { practices, stack, sections } = c;

  return (
    <section
      id="expertise"
      className="section capabilities-section"
      aria-labelledby="expertise-title"
    >
      <div className="site-shell">
        <SectionHeading
          index={sections.expertise.index}
          label={sections.expertise.label}
          title={stack.title}
          intro={stack.intro}
          id="expertise-title"
        />

        <Reveal className="stack-panel stack-panel-solo" distance={24}>
          <div className="stack-panel-head stack-panel-head-solo">
            <span className="mono text-muted-foreground">{stack.kicker}</span>
          </div>

          <div className="stack-levels">
            {stack.levels.map((level, index) => (
              <div className="stack-level" key={level.level}>
                <div className="stack-level-head">
                  <span className="mono">0{index + 1}</span>
                  <h4>{level.level}</h4>
                </div>
                <p className="stack-level-note">{level.note}</p>
                <ul className="stack-tags">
                  {level.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="stack-footnote mono">{stack.footnote}</p>
        </Reveal>

        <div className="expertise-subhead">
          <h3>{sections.expertise.title}</h3>
          <p>{sections.expertise.intro}</p>
        </div>

        <div className="practice-grid">
          {practices.map((practice, index) => (
            <Reveal key={practice.title} delay={index * 0.06} distance={24}>
              <article className="practice-card">
                <div className="practice-top">
                  <span className="practice-letter">{practice.index}</span>
                  <span className="mono text-muted-foreground">
                    {practice.code}
                  </span>
                </div>
                <h3>{practice.title}</h3>
                <p className="practice-intro">{practice.intro}</p>
                <ul className="practice-list">
                  {practice.deliverables.map((item) => (
                    <li key={item}>
                      <span className="check-mark" aria-hidden="true">
                        +
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="practice-arrow" aria-hidden="true">
                  <ArrowUpRight className="size-5" />
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
