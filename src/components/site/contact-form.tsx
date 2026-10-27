"use client";

import { useId, useMemo, useState } from "react";
import { ArrowUpRight, CheckCircle2, Loader2, Send } from "lucide-react";
import { contactTypes, site } from "@/lib/content";

type FormState = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  website: string;
  consent: boolean;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  projectType: contactTypes[0],
  message: "",
  website: "",
  consent: false,
};

export function ContactForm() {
  const formId = useId();
  const [form, setForm] = useState<FormState>(initialState);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fallbackHref, setFallbackHref] = useState("");

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(
      `Nouveau projet — ${form.projectType || "contact portfolio"}`,
    );
    const body = encodeURIComponent(
      `Bonjour Zo Mahefa,\n\n${form.message}\n\n— ${form.name}\n${form.email}${
        form.phone ? `\n${form.phone}` : ""
      }\n${form.projectType ? `Type de besoin : ${form.projectType}` : ""}`,
    );
    return `mailto:${site.email}?subject=${subject}&body=${body}`;
  }, [form]);

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
      setError("Merci de renseigner votre nom, votre e-mail et votre message.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("L'adresse e-mail ne semble pas valide.");
      return;
    }

    if (!form.consent) {
      setError(
        "Merci de confirmer que vos coordonnées peuvent être utilisées pour vous répondre.",
      );
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
          projectType: form.projectType,
        }),
      });

      if (!response.ok) {
        throw new Error("send-failed");
      }

      setSuccess(true);
      setForm(initialState);
    } catch {
      setError(
        "L'envoi direct est indisponible pour le moment. Votre message est prêt : ouvrez votre messagerie pour me l'adresser.",
      );
      setFallbackHref(mailtoHref);
    } finally {
      setPending(false);
    }
  }

  if (success) {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <CheckCircle2 className="size-8" aria-hidden="true" />
        <h3>Message reçu.</h3>
        <p>
          Merci pour votre confiance. Je vous réponds sous 48 h ouvrées à
          l&apos;adresse indiquée.
        </p>
        <div className="form-success-actions">
          <a href={`mailto:${site.email}`} className="button button-dark">
            Écrire directement
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
            Envoyer un autre message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-head">
        <span className="mono">BRIEF / CONTACT</span>
        <span className="mono text-muted-foreground">RÉPONSE &lt; 48 H</span>
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor={`${formId}-name`}>
            Nom complet <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            placeholder="Votre nom"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor={`${formId}-email`}>
            E-mail <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="vous@entreprise.com"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor={`${formId}-phone`}>Téléphone (optionnel)</label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+261 ..."
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor={`${formId}-type`}>Type de besoin</label>
          <select
            id={`${formId}-type`}
            name="projectType"
            value={form.projectType}
            onChange={(event) => update("projectType", event.target.value)}
          >
            {contactTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field form-field-full">
          <label htmlFor={`${formId}-message`}>
            Votre message <span aria-hidden="true">*</span>
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={5}
            placeholder="Le contexte, l'objectif, l'échéance... Quelques lignes suffisent pour commencer."
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
        <span>
          J&apos;accepte que mes coordonnées soient utilisées uniquement pour
          répondre à cette demande.
        </span>
      </label>

      {error ? (
        <div className="form-error" role="alert">
          <p>{error}</p>
          {fallbackHref ? (
            <a href={fallbackHref} className="text-link">
              Ouvrir ma messagerie
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
              Envoi en cours...
            </>
          ) : (
            <>
              <Send className="size-4" aria-hidden="true" />
              Envoyer le message
            </>
          )}
        </button>
        <p className="form-note">
          Pas de newsletter, pas de revente de données. Seulement une réponse.
        </p>
      </div>
    </form>
  );
}
