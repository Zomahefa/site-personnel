"use client";

import { Phone, Quote } from "lucide-react";
import { useI18n } from "@/components/language-provider";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

export function Testimonials() {
  const { c } = useI18n();
  const { sections, testimonials, ui } = c;

  return (
    <section
      id="temoignages"
      className="section testimonials-section"
      aria-labelledby="testimonials-title"
    >
      <div className="site-shell">
        <SectionHeading
          index={sections.testimonials.index}
          label={sections.testimonials.label}
          title={sections.testimonials.title}
          intro={sections.testimonials.intro}
          id="testimonials-title"
        />

        <div className="testimonial-grid">
          {testimonials.items.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.06} distance={22}>
              <figure className="testimonial-card">
                <Quote className="testimonial-quote-icon" aria-hidden="true" />
                <blockquote>{testimonial.quote}</blockquote>
                <figcaption>
                  <span className="testimonial-avatar" aria-hidden="true">
                    {testimonial.name.charAt(0)}
                  </span>
                  <span className="testimonial-identity">
                    <strong>{testimonial.name}</strong>
                    <small>{testimonial.company}</small>
                  </span>
                </figcaption>
                <div className="testimonial-footer">
                  <span className="mono">{testimonial.context}</span>
                  <a
                    href={testimonial.phoneHref}
                    className="testimonial-phone"
                    aria-label={`${ui.testimonialPhone} — ${testimonial.name}`}
                  >
                    <Phone className="size-3.5" aria-hidden="true" />
                    {testimonial.phone}
                  </a>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>

        <p className="testimonial-note mono">{testimonials.note}</p>
      </div>
    </section>
  );
}
