"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { site } from "@/lib/content";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  }

  return (
    <div className="copy-email">
      <Mail className="size-4 shrink-0" aria-hidden="true" />
      <a href={`mailto:${site.email}`}>{site.email}</a>
      <button
        type="button"
        className="copy-email-button"
        onClick={copy}
        aria-label={
          copied
            ? "Adresse e-mail copiée"
            : "Copier l'adresse e-mail dans le presse-papiers"
        }
      >
        {copied ? (
          <Check className="size-3.5" aria-hidden="true" />
        ) : (
          <Copy className="size-3.5" aria-hidden="true" />
        )}
        <span className="mono">{copied ? "COPIÉ" : "COPIER"}</span>
      </button>
    </div>
  );
}
