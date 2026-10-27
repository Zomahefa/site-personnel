import { ArrowUpRight } from "lucide-react";
import { practices, stackLevels } from "@/lib/content";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

export function Capabilities() {
  return (
    <section
      id="expertise"
      className="section capabilities-section"
      aria-labelledby="expertise-title"
    >
      <div className="site-shell">
        <SectionHeading
          index="02"
          label="Expertise"
          title="Trois façons de rendre un produit fiable."
          intro="Je ne juxtapose pas des technologies : je relie le produit, l'infrastructure et la qualité pour réduire les mauvaises surprises entre la démo et la production."
          id="expertise-title"
        />

        <div className="practice-grid">
          {practices.map((practice, index) => (
            <Reveal key={practice.title} delay={index * 0.06} distance={24}>
              <article className="practice-card">
                <div className="practice-top">
                  <span className="practice-letter">{practice.index}</span>
                  <span className="mono text-muted-foreground">{practice.code}</span>
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

        <Reveal className="stack-panel" distance={24}>
          <div className="stack-panel-head">
            <div>
              <span className="mono text-muted-foreground">CORE STACK / NIVEAUX RÉELS</span>
              <h3>Ce que je peux défendre en entretien.</h3>
            </div>
            <p>
              Pas de pourcentage inventé. Chaque niveau correspond à un usage
              réel : production, projet complet ou notions en progression.
            </p>
          </div>

          <div className="stack-levels">
            {stackLevels.map((level, index) => (
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

          <p className="stack-footnote mono">
            UNE TECHNOLOGIE N&apos;EST PAS UNE COMPÉTENCE TANT QU&apos;ELLE N&apos;A
            PAS ÉTÉ LIVRÉE, TESTÉE ET EXPLIQUÉE.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
