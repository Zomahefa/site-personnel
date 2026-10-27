"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  value: number;
  pad?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
};

function formatValue(value: number, pad = 0) {
  return String(value).padStart(pad, "0");
}

/**
 * Compteur qui s'incrémente de 0 à `value`, une seule fois,
 * dès que le chiffre entre dans le viewport.
 */
export function CountUp({
  value,
  pad = 0,
  prefix = "",
  suffix = "",
  duration = 900,
}: Props) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const frame = useRef(0);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (reduceMotion) return;

    const node = ref.current;
    if (!node) return;

    const run = () => {
      if (started.current) return;
      started.current = true;
      setDisplay(0);

      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(progress < 1 ? Math.round(eased * value) : value);
        if (progress < 1) frame.current = requestAnimationFrame(tick);
      };
      frame.current = requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === "undefined") {
      run();
      return () => cancelAnimationFrame(frame.current);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [duration, reduceMotion, value]);

  const visibleValue = reduceMotion ? value : display;

  return (
    <span
      ref={ref}
      className="hero-stat-value"
      aria-label={`${prefix}${formatValue(value, pad)}${suffix}`}
    >
      <span aria-hidden="true">
        {prefix}
        {formatValue(visibleValue, pad)}
        {suffix}
      </span>
    </span>
  );
}
