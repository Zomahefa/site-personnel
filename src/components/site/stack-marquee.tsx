"use client";

import { useI18n } from "@/components/language-provider";

const stack = [
  "Spring Boot",
  "Next.js",
  "PostgreSQL",
  "Docker",
  "GitHub Actions",
  "Prometheus",
  "Django",
  "Playwright",
  "Kubernetes",
  "TypeScript",
  "Cypress",
  "Postman",
  "K6",
  "Nginx",
];

export function StackMarquee() {
  const { c } = useI18n();

  return (
    <div className="marquee border-y border-border bg-card/60">
      <p className="sr-only">
        {c.ui.stackLabel} : {stack.join(", ")}.
      </p>
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy}>
            {stack.map((item) => (
              <span className="marquee-item" key={`${copy}-${item}`}>
                {item}
                <span className="marquee-star">✳</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
