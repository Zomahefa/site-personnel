"use client";

import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  function toggleTheme() {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <button
      type="button"
      className="icon-button"
      onClick={toggleTheme}
      aria-label="Changer de thème clair ou sombre"
      title="Changer de thème"
    >
      <SunMoon className="size-4" aria-hidden="true" />
    </button>
  );
}
