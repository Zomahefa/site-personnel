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

export function CountUp({
  value,
  pad = 0,
  prefix = "",
  suffix = "",
  duration = 900,
}: Props) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduceMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setDisplay(0);
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion, value]);

  useEffect(() => {
    if (!started || reduceMotion) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, reduceMotion, started, value]);

  return (
    <span
      ref={ref}
      className="hero-stat-value"
      aria-label={`${prefix}${formatValue(value, pad)}${suffix}`}
    >
      <span aria-hidden="true">
        {prefix}
        {formatValue(display, pad)}
        {suffix}
      </span>
    </span>
  );
}
