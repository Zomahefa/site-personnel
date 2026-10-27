import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  Download,
  MapPin,
  MoveUpRight,
} from "lucide-react";
import { roles, site } from "@/lib/content";
import { RotatingTypewriter } from "@/components/site/typewriter";
import { Reveal } from "@/components/site/reveal";
import { CountUp } from "@/components/site/count-up";

const stats: Array<{
  value: number;
  label: string;
  pad?: number;
  prefix?: string;
  suffix?: string;
}> = [
  { value: 9, pad: 2, label: "projets documentés" },
  { value: 3, pad: 2, label: "pôles d'expertise" },
  { value: 8, pad: 2, label: "dépôts publics" },
  { value: 48, prefix: "<", suffix: "h", label: "délai de réponse" },
];

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="site-shell">
        <div className="hero-topline">
          <span className="mono">PORTFOLIO / ÉDITION 2026</span>
          <span className="mono hidden sm:inline">
            FIANARANTSOA, MADAGASCAR · UTC+3
          </span>
          <span className="mono">DISPONIBLE POUR COLLABORER</span>
        </div>

        <div className="hero-layout">
          <div className="hero-content">
            <Reveal delay={0.05} distance={14}>
              <p className="hero-kicker">
                <span className="status-dot" aria-hidden="true" />
                {site.name} — Ingénieur logiciel
              </p>
            </Reveal>

            <Reveal delay={0.1} distance={26}>
              <h1 id="hero-title" className="hero-title">
                <span className="sr-only">Zo Mahefa RANAIVO — </span>
                <span>Du premier</span>
                <span>
                  <em>commit</em> au
                </span>
                <span>
                  dernier <em>test.</em>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2} distance={16}>
              <p className="hero-role">
                <span className="hero-role-label mono">RÔLE_</span>
                <RotatingTypewriter roles={roles} />
              </p>
            </Reveal>

            <Reveal delay={0.27} distance={16}>
              <p className="hero-intro">
                Je conçois des applications web et mobiles, j&apos;automatise
                leur mise en production et je m&apos;assure qu&apos;elles
                restent fiables une fois en ligne. Un profil produit, cloud et
                qualité — sans jargon inutile.
              </p>
            </Reveal>

            <Reveal delay={0.34} distance={14}>
              <div className="hero-actions">
                <a href="#projets" className="button button-dark">
                  Voir mes preuves
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
                <a href="#contact" className="button button-outline">
                  Parler d&apos;un projet
                  <MoveUpRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={site.cv}
                  download
                  className="text-link hero-cv"
                  aria-label="Télécharger le CV de Zo Mahefa en PDF"
                >
                  <Download className="size-4" aria-hidden="true" />
                  CV PDF
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.4} distance={12}>
              <ul className="hero-facts" aria-label="Informations pratiques">
                <li>
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {site.location}
                </li>
                <li>
                  <span className="fact-cross" aria-hidden="true">
                    +
                  </span>
                  {site.workModes}
                </li>
                <li>
                  <span className="fact-cross" aria-hidden="true">
                    +
                  </span>
                  {site.availability}
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal className="hero-aside" delay={0.22} distance={30}>
            <figure className="portrait-card">
              <div className="portrait-head">
                <span className="mono">FIG. 01 / PORTRAIT</span>
                <span className="mono">2026</span>
              </div>
              <div className="portrait-window">
                <Image
                  src="/photo-cv.png"
                  alt="Portrait de Zo Mahefa RANAIVO"
                  width={252}
                  height={220}
                  priority
                  quality={92}
                  sizes="(max-width: 1023px) 80vw, 340px"
                  className="portrait-image"
                />
                <span className="portrait-badge">
                  <span className="status-dot" aria-hidden="true" />
                  Open to work
                </span>
                <span className="portrait-corner portrait-corner-tl" aria-hidden="true" />
                <span className="portrait-corner portrait-corner-br" aria-hidden="true" />
              </div>
              <figcaption className="portrait-caption">
                <div>
                  <span className="mono text-muted-foreground">FOCUS</span>
                  <p>Web · Cloud · Quality</p>
                </div>
                <span className="portrait-signature">Zo Mahefa</span>
              </figcaption>
            </figure>
            <div className="portrait-note">
              <span className="mono">BASÉ À FIANARANTSOA</span>
              <span className="mono text-right">REMOTE FRIENDLY ↗</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.46} distance={14}>
          <div className="hero-bottom">
            <div className="hero-stats">
              {stats.map((stat) => (
                <div className="hero-stat" key={stat.label}>
                  <CountUp
                    value={stat.value}
                    pad={stat.pad}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                  <span className="hero-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
            <a href="#projets" className="scroll-cue" aria-label="Défiler vers les projets">
              <span className="mono">SCROLL</span>
              <span className="scroll-line" aria-hidden="true">
                <span className="scroll-line-dot" />
              </span>
              <ArrowDown className="scroll-cue-arrow size-3.5" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
