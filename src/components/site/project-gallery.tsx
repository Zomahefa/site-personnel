"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { ProjectCapture } from "@/lib/content";

type Props = {
  captures: ProjectCapture[];
  title: string;
};

export function ProjectGallery({ captures, title }: Props) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [manualPaused, setManualPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const count = captures.length;
  const current = captures[index] ?? captures[0];
  const paused = hovered || manualPaused;

  useEffect(() => {
    if (count <= 1 || reduceMotion || paused) return;

    const interval = window.setInterval(() => {
      setIndex((value) => (value + 1) % count);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [count, paused, reduceMotion]);

  if (!current) return null;

  const goTo = (next: number) => {
    setIndex((next + count) % count);
  };

  return (
    <div
      ref={containerRef}
      className={`project-gallery ${paused ? "is-paused" : ""}`}
      role="region"
      aria-roledescription="carrousel"
      aria-label={`Captures du projet ${title}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => {
        if (!containerRef.current?.contains(document.activeElement)) {
          setHovered(false);
        }
      }}
    >
      <div className="gallery-chrome">
        <span className="gallery-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="mono gallery-app-name">{title}</span>
        <span className="mono gallery-state">
          {count > 1
            ? reduceMotion
              ? "manuel"
              : manualPaused
                ? "pause"
                : hovered
                  ? "survol"
                  : "auto · 5s"
            : "aperçu"}
        </span>
      </div>

      <div
        className="gallery-viewport"
        tabIndex={0}
        onKeyDown={(event) => {
          if (count <= 1) return;
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            goTo(index - 1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            goTo(index + 1);
          }
        }}
      >
        <div
          className="gallery-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {captures.map((capture, slideIndex) => (
            <div
              className="gallery-slide"
              key={capture.src}
              aria-hidden={slideIndex !== index}
            >
              <Image
                src={capture.src}
                alt={capture.alt}
                fill
                quality={85}
                sizes="(max-width: 900px) 100vw, 48vw"
                className="gallery-image"
              />
            </div>
          ))}
        </div>

        <div className="gallery-overlay">
          <span className="mono">
            CAPTURE {String(index + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
          </span>
          <span className="gallery-caption">{current.label}</span>
        </div>

        {count > 1 ? (
          <div className="gallery-controls">
            {!reduceMotion ? (
              <button
                type="button"
                className="gallery-arrow gallery-pause"
                onClick={() => setManualPaused((value) => !value)}
                aria-label={
                  manualPaused
                    ? "Reprendre le défilement automatique"
                    : "Mettre le défilement automatique en pause"
                }
                aria-pressed={manualPaused}
              >
                {manualPaused ? (
                  <Play className="size-3.5" aria-hidden="true" />
                ) : (
                  <Pause className="size-3.5" aria-hidden="true" />
                )}
              </button>
            ) : null}
            <button
              type="button"
              className="gallery-arrow"
              onClick={() => goTo(index - 1)}
              aria-label={`Capture précédente de ${title}`}
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="gallery-arrow"
              onClick={() => goTo(index + 1)}
              aria-label={`Capture suivante de ${title}`}
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>

      <div className="gallery-footer">
        {count > 1 ? (
          <div className="gallery-pagination" aria-label="Choisir une capture">
            {captures.map((capture, slideIndex) => (
              <button
                key={capture.src}
                type="button"
                className={`gallery-dot ${slideIndex === index ? "is-active" : ""}`}
                onClick={() => goTo(slideIndex)}
                aria-label={`Afficher : ${capture.label}`}
                aria-current={slideIndex === index ? "true" : undefined}
              >
                <span />
              </button>
            ))}
          </div>
        ) : (
          <span className="mono text-muted-foreground">01 CAPTURE</span>
        )}
        <span className="sr-only">
          Capture {index + 1} sur {count} : {current.label}
        </span>
        <span className="mono gallery-hint">
          <ChevronLeft className="size-3" aria-hidden="true" />
          <ChevronRight className="size-3" aria-hidden="true" />
          flèches / survol
        </span>
      </div>
    </div>
  );
}
