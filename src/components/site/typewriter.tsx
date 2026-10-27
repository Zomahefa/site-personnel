"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type RotatingTypewriterProps = {
  roles: readonly string[];
  className?: string;
};

export function RotatingTypewriter({
  roles,
  className = "",
}: RotatingTypewriterProps) {
  const reduceMotion = useReducedMotion();
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const tick = () => {
      if (cancelled) return;
      const role = roles[roleIndex] ?? "";

      if (!isDeleting) {
        charIndex += 1;
        setText(role.slice(0, charIndex));

        if (charIndex >= role.length) {
          isDeleting = true;
          setDeleting(true);
          timer = setTimeout(tick, 1900);
          return;
        }
        timer = setTimeout(tick, 42 + Math.random() * 26);
        return;
      }

      charIndex -= 1;
      setText(role.slice(0, Math.max(charIndex, 0)));

      if (charIndex <= 0) {
        isDeleting = false;
        setDeleting(false);
        roleIndex = (roleIndex + 1) % roles.length;
        timer = setTimeout(tick, 360);
        return;
      }
      timer = setTimeout(tick, 22);
    };

    timer = setTimeout(tick, 520);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [reduceMotion, roles]);

  const label = useMemo(() => roles.join(" · "), [roles]);

  if (reduceMotion) {
    return (
      <span className={className}>
        <span className="sr-only">{label}</span>
        <span aria-hidden="true">
          {roles.map((role, index) => (
            <span key={role}>
              {role}
              {index < roles.length - 1 ? (
                <span className="text-brand"> · </span>
              ) : null}
            </span>
          ))}
        </span>
      </span>
    );
  }

  return (
    <span className={className}>
      <span className="sr-only">{label}</span>
      <span className="role-nojs" aria-hidden="true">
        {roles[0]}
      </span>
      <span className="role-typed" aria-hidden="true">
        {text}
        <span className={`type-caret ${deleting ? "is-deleting" : ""}`} />
      </span>
    </span>
  );
}

type TypewriterHeadingProps = {
  text: string;
  className?: string;
  id?: string;
  speed?: number;
  delay?: number;
};

export function TypewriterHeading({
  text,
  className = "",
  id,
  speed = 22,
  delay = 90,
}: TypewriterHeadingProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(text.length);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduceMotion) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      const fallback = setTimeout(() => setStarted(true), 0);
      return () => clearTimeout(fallback);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion, text.length]);

  useEffect(() => {
    if (!started || reduceMotion) {
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let index = 0;
    // The reset to zero is the starting point of the typing timeline.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCount(0);

    const tick = () => {
      if (cancelled) return;
      index += 1;
      setCount(index);
      if (index < text.length) {
        timer = setTimeout(tick, speed);
      }
    };

    timer = setTimeout(tick, delay);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [started, reduceMotion, text.length, speed, delay, text]);

  const visibleCount = reduceMotion ? text.length : count;
  const done = visibleCount >= text.length;

  return (
    <h2 ref={ref} id={id} className={className} aria-label={text}>
      <span className="relative block" aria-hidden="true">
        <span className="invisible">{text}</span>
        <span className="absolute inset-0">
          {text.slice(0, visibleCount)}
          {!done && <span className="type-caret" />}
        </span>
      </span>
    </h2>
  );
}
