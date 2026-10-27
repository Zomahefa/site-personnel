import { ArrowRight, Check } from "lucide-react";
import { engagements, processSteps } from "@/lib/content";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

export function Process() {
  return (
    <section
      id="methode"
      className="section process-section"
      aria-labelledby="process-title"
    >
      <div className="site-shell">
        <SectionHeading
          index="03"
          label="Méthode"
          title="Un cadre simple. Zéro surprise."
          intro="Le même fil rouge pour une mission client ou une intégration en équipe : clarifier, livrer par étapes, documenter. La technique sert le résultat, pas l'inverse."
          id="process-title"
        />

        <div className="process-grid">
          {processSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.07} distance={20}>
              <article className="process-step">
                <div className="process-number">{step.number}</div>
                <div className="process-dot" aria-hidden="true" />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <div className="process-deliverable">
                  <span className="mono">LIVRABLE</span>
                  <span>{step.deliverable}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="engagements" distance={18}>
          <div className="engagements-copy">
            <span className="mono">ENGAGEMENTS / SIMPLES</span>
            <p>Des règles lisibles avant même de commencer.</p>
          </div>
          <ul className="engagement-list">
            {engagements.map((item) => (
              <li key={item}>
                <Check className="size-3.5" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <a href="#contact" className="text-link engagements-link">
            Cadrer un besoin
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
