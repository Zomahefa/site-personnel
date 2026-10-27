"use client";

import { Languages } from "lucide-react";
import { useI18n } from "@/components/language-provider";

export function LanguageToggle() {
  const { locale, toggleLocale, c } = useI18n();

  return (
    <button
      type="button"
      className="icon-button language-toggle"
      onClick={toggleLocale}
      aria-label={c.ui.languageSwitch}
      title={`${c.ui.languageLabel} — ${locale.toUpperCase()}`}
    >
      <Languages className="size-4" aria-hidden="true" />
      <span className="mono language-code">{locale.toUpperCase()}</span>
    </button>
  );
}
