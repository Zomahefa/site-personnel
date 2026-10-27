"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { ProjectCapture } from "@/lib/content";
import { useI18n } from "@/components/language-provider";

type Props = {
  captures: ProjectCapture[];
  title: string;
};

export function ProjectGallery({ captures, title }: Props) {
  const { c } = useI18n();
  const ui = c.ui;
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

  const stateLabel = count > 1
    ? reduceMotion
      ? ui.galleryManual
      : manualPaused
        ? ui.galleryPaused
        : hovered
          ? ui.galleryHover
          : ui.galleryAuto
    : ui.galleryPreview;

  return (
    <div
      ref={containerRef}
      className={`project-gallery ${paused ? "is-paused" : ""}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${ui.galleryRegion} — ${title}`}
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
        <span className="mono gallery-state">{stateLabel}</span>
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
            {ui.galleryCapture} {String(index + 1).padStart(2, "0")} /{" "}
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
                  manualPaused ? ui.galleryPlay : ui.galleryPause
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
              aria-label={`${ui.galleryPrev} — ${title}`}
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="gallery-arrow"
              onClick={() => goTo(index + 1)}
              aria-label={`${ui.galleryNext} — ${title}`}
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>

      <div className="gallery-footer">
        {count > 1 ? (
          <div className="gallery-pagination" aria-label={ui.galleryChoose}>
            {captures.map((capture, slideIndex) => (
              <button
                key={capture.src}
                type="button"
                className={`gallery-dot ${slideIndex === index ? "is-active" : ""}`}
                onClick={() => goTo(slideIndex)}
                aria-label={`${ui.galleryShow} : ${capture.label}`}
                aria-current={slideIndex === index ? "true" : undefined}
              >
                <span />
              </button>
            ))}
          </div>
        ) : (
          <span className="mono text-muted-foreground">01 {ui.galleryCapture}</span>
        )}
        <span className="sr-only" aria-live="polite">
          {ui.galleryCapture} {index + 1} {ui.galleryOf} {count} :{" "}
          {current.label}
        </span>
        <span className="mono gallery-hint">
          <ChevronLeft className="size-3" aria-hidden="true" />
          <ChevronRight className="size-3" aria-hidden="true" />
          {ui.galleryHint}
        </span>
      </div>
    </div>
  );
}
