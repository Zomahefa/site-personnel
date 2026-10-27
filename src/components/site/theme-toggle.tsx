"use client";

import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { useI18n } from "@/components/language-provider";

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const { c } = useI18n();

  function toggleTheme() {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <button
      type="button"
      className="icon-button"
      onClick={toggleTheme}
      aria-label={c.ui.themeLabel}
      title={c.ui.themeLabel}
    >
      <SunMoon className="size-4" aria-hidden="true" />
    </button>
  );
}
