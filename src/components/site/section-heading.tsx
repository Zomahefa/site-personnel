import { Reveal } from "@/components/site/reveal";
import { TypewriterHeading } from "@/components/site/typewriter";

type Props = {
  index: string;
  label: string;
  title: string;
  intro?: string;
  id?: string;
  align?: "left" | "split";
  tone?: "light" | "dark";
};

export function SectionHeading({
  index,
  label,
  title,
  intro,
  id,
  align = "split",
  tone = "light",
}: Props) {
  return (
    <div
      className={`section-heading section-heading-${align} ${
        tone === "dark" ? "is-dark" : ""
      }`}
    >
      <Reveal distance={12}>
        <div className="section-kicker">
          <span className="section-index mono">{index}</span>
          <span className="section-label mono">{label}</span>
          <span className="section-kicker-line" aria-hidden="true" />
        </div>
      </Reveal>
      <div className="section-title-row">
        <TypewriterHeading
          text={title}
          id={id}
          className="section-title type-title"
        />
        {intro ? (
          <Reveal delay={0.12} distance={14} className="section-intro-wrap">
            <p className="section-intro">{intro}</p>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
