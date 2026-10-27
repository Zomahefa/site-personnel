"use client";

import { ArrowUpRight, Bug, ShieldCheck } from "lucide-react";
import { useI18n } from "@/components/language-provider";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

export function Capabilities() {
  const { c } = useI18n();
  const { practices, stack, qa, sections } = c;

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
          title={sections.expertise.title}
          intro={sections.expertise.intro}
          id="expertise-title"
        />

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

        <Reveal className="qa-panel" distance={24}>
          <div className="qa-panel-head">
            <div>
              <span className="mono text-muted-foreground">{qa.kicker}</span>
              <h3>{qa.title}</h3>
            </div>
            <p>{qa.intro}</p>
          </div>

          <div className="qa-grid">
            {qa.categories.map((category, index) => (
              <article className="qa-card" key={category.title}>
                <div className="qa-card-head">
                  <span className="mono">0{index + 1}</span>
                  <Bug className="size-4" aria-hidden="true" />
                </div>
                <h4>{category.title}</h4>
                <p>{category.note}</p>
                <ul className="qa-tools">
                  {category.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="qa-mindset">
            <span className="mono text-muted-foreground">
              <ShieldCheck className="inline size-3.5" aria-hidden="true" />{" "}
              QA MINDSET
            </span>
            <ul>
              {qa.mindset.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <p className="qa-footnote mono">{qa.footnote}</p>
        </Reveal>

        <Reveal className="stack-panel" distance={24}>
          <div className="stack-panel-head">
            <div>
              <span className="mono text-muted-foreground">{stack.kicker}</span>
              <h3>{stack.title}</h3>
            </div>
            <p>{stack.intro}</p>
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
      </div>
    </section>
  );
}
