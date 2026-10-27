"use client";

import { useId, useMemo, useState } from "react";
import { ArrowUpRight, CheckCircle2, Loader2, Send } from "lucide-react";
import { site } from "@/lib/content";
import { useI18n } from "@/components/language-provider";

type FormState = {
  name: string;
  email: string;
  phone: string;
  typeIndex: number;
  message: string;
  website: string;
  consent: boolean;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  typeIndex: 0,
  message: "",
  website: "",
  consent: false,
};

export function ContactForm() {
  const { c } = useI18n();
  const formCopy = c.contact.form;
  const types = c.contact.types;
  const formId = useId();
  const [form, setForm] = useState<FormState>(initialState);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fallbackHref, setFallbackHref] = useState("");

  const projectType = types[form.typeIndex] ?? types[0];

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(
      `${formCopy.head} — ${projectType || "portfolio"}`,
    );
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}${
        form.phone ? `\n${form.phone}` : ""
      }\n${projectType ? `${formCopy.type} : ${projectType}` : ""}`,
    );
    return `mailto:${site.email}?subject=${subject}&body=${body}`;
  }, [form, formCopy.head, formCopy.type, projectType]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (error) setError("");
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setFallbackHref("");

    if (form.website) {
      setSuccess(true);
      return;
    }

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError(formCopy.errorRequired);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError(formCopy.errorEmail);
      return;
    }

    if (!form.consent) {
      setError(formCopy.errorConsent);
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          projectType,
        }),
      });

      if (!response.ok) {
        throw new Error("send-failed");
      }

      setSuccess(true);
      setForm(initialState);
    } catch {
      setError(formCopy.errorSend);
      setFallbackHref(mailtoHref);
    } finally {
      setPending(false);
    }
  }

  if (success) {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <CheckCircle2 className="size-8" aria-hidden="true" />
        <h3>{formCopy.successTitle}</h3>
        <p>{formCopy.successText}</p>
        <div className="form-success-actions">
          <a href={`mailto:${site.email}`} className="button button-dark">
            {formCopy.writeDirectly}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            className="text-link"
            onClick={() => {
              setSuccess(false);
              setForm(initialState);
            }}
          >
            {formCopy.another}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-head">
        <span className="mono">{formCopy.head}</span>
        <span className="mono text-muted-foreground">{formCopy.response}</span>
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor={`${formId}-name`}>
            {formCopy.name} <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            placeholder={formCopy.namePlaceholder}
            value={form.name}
            maxLength={120}
            onChange={(event) => update("name", event.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor={`${formId}-email`}>
            {formCopy.email} <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={formCopy.emailPlaceholder}
            value={form.email}
            maxLength={180}
            onChange={(event) => update("email", event.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor={`${formId}-phone`}>{formCopy.phone}</label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={formCopy.phonePlaceholder}
            value={form.phone}
            maxLength={30}
            onChange={(event) => update("phone", event.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor={`${formId}-type`}>{formCopy.type}</label>
          <select
            id={`${formId}-type`}
            name="projectType"
            value={String(form.typeIndex)}
            onChange={(event) =>
              update("typeIndex", Number(event.target.value))
            }
          >
            {types.map((type, index) => (
              <option key={type} value={index}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field form-field-full">
          <label htmlFor={`${formId}-message`}>
            {formCopy.message} <span aria-hidden="true">*</span>
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={5}
            maxLength={5000}
            placeholder={formCopy.messagePlaceholder}
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Ne pas remplir</label>
        <input
          id={`${formId}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>

      <label className="form-consent" htmlFor={`${formId}-consent`}>
        <input
          id={`${formId}-consent`}
          type="checkbox"
          checked={form.consent}
          onChange={(event) => update("consent", event.target.checked)}
        />
        <span>{formCopy.consent}</span>
      </label>

      {error ? (
        <div className="form-error" role="alert">
          <p>{error}</p>
          {fallbackHref ? (
            <a href={fallbackHref} className="text-link">
              {formCopy.fallbackLink}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      ) : null}

      <div className="form-submit-row">
        <button type="submit" className="button button-dark" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              {formCopy.pending}
            </>
          ) : (
            <>
              <Send className="size-4" aria-hidden="true" />
              {formCopy.submit}
            </>
          )}
        </button>
        <p className="form-note">{formCopy.note}</p>
      </div>
    </form>
  );
}
