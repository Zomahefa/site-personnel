"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  Download,
  MapPin,
  MoveUpRight,
} from "lucide-react";
import { site } from "@/lib/content";
import { useI18n } from "@/components/language-provider";
import { RotatingTypewriter } from "@/components/site/typewriter";
import { Reveal } from "@/components/site/reveal";
import { CountUp } from "@/components/site/count-up";

export function Hero() {
  const { c, locale } = useI18n();
  const { hero, roles } = c;

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="site-shell">
        <div className="hero-topline">
          <span className="mono">{hero.eyebrowLeft}</span>
          <span className="mono hidden sm:inline">{hero.eyebrowCenter}</span>
          <span className="mono">{hero.eyebrowRight}</span>
        </div>

        <div className="hero-layout">
          <div className="hero-content">
            <Reveal delay={0.05} distance={14}>
              <p className="hero-kicker">
                <span className="status-dot" aria-hidden="true" />
                {site.name} — {hero.kicker}
              </p>
            </Reveal>

            <Reveal delay={0.1} distance={26}>
              <h1 id="hero-title" className="hero-title">
                <span className="sr-only">{hero.title.sr}</span>
                <span aria-hidden="true">{hero.title.line1}</span>
                <span aria-hidden="true">
                  <em>{hero.title.line2Em}</em>
                  {hero.title.line2After}
                </span>
                <span aria-hidden="true">
                  <em>{hero.title.line3Em}</em>
                  {hero.title.line3After}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2} distance={16}>
              <p className="hero-role">
                <span className="hero-role-label mono">{hero.roleLabel}</span>
                <RotatingTypewriter roles={roles} />
              </p>
            </Reveal>

            <Reveal delay={0.27} distance={16}>
              <p className="hero-intro">{hero.intro}</p>
            </Reveal>

            <Reveal delay={0.34} distance={14}>
              <div className="hero-actions">
                <a href="#projets" className="button button-dark">
                  {hero.primaryCta}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
                <a href="#contact" className="button button-outline">
                  {hero.secondaryCta}
                  <MoveUpRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={site.cv}
                  download
                  className="text-link hero-cv"
                  aria-label={hero.cvAria}
                >
                  <Download className="size-4" aria-hidden="true" />
                  {hero.cvCta}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.4} distance={12}>
              <ul className="hero-facts" aria-label={hero.factsAria}>
                <li>
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {c.location}
                </li>
                <li>
                  <span className="fact-cross" aria-hidden="true">
                    +
                  </span>
                  {c.workModes}
                </li>
                <li>
                  <span className="fact-cross" aria-hidden="true">
                    +
                  </span>
                  {c.availability}
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal className="hero-aside" delay={0.22} distance={30}>
            <figure className="portrait-card">
              <div className="portrait-head">
                <span className="mono">{hero.figureLabel}</span>
                <span className="mono">{hero.year}</span>
              </div>
              <div className="portrait-window">
                <Image
                  src="/photo-cv.png"
                  alt={hero.portraitAlt}
                  width={252}
                  height={220}
                  priority
                  quality={92}
                  sizes="(max-width: 1023px) 80vw, 340px"
                  className="portrait-image"
                />
                <span className="portrait-badge">
                  <span className="status-dot" aria-hidden="true" />
                  {hero.portraitBadge}
                </span>
                <span
                  className="portrait-corner portrait-corner-tl"
                  aria-hidden="true"
                />
                <span
                  className="portrait-corner portrait-corner-br"
                  aria-hidden="true"
                />
              </div>
              <figcaption className="portrait-caption">
                <div>
                  <span className="mono text-muted-foreground">
                    {hero.focusLabel}
                  </span>
                  <p>{hero.focus}</p>
                </div>
                <span className="portrait-signature">{hero.signature}</span>
              </figcaption>
            </figure>
            <div className="portrait-note">
              <span className="mono">{hero.noteLeft}</span>
              <span className="mono text-right">{hero.noteRight}</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.46} distance={14}>
          <div className="hero-bottom">
            <div className="hero-stats">
              {hero.stats.map((stat) => (
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
            <a
              href="#projets"
              className="scroll-cue"
              aria-label={
                locale === "fr"
                  ? "Défiler vers les projets"
                  : "Scroll to projects"
              }
            >
              <span className="mono">{hero.scroll}</span>
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
