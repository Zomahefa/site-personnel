const stack = [
  "Spring Boot",
  "Next.js",
  "PostgreSQL",
  "Docker",
  "GitHub Actions",
  "Prometheus",
  "Django",
  "Linux",
  "Kubernetes",
  "TypeScript",
  "Grafana",
  "Nginx",
];

export function StackMarquee() {
  return (
    <div className="marquee border-y border-border bg-card/60">
      <p className="sr-only">
        Technologies principales : {stack.join(", ")}.
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
