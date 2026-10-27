"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";
import { useI18n } from "@/components/language-provider";

export function LocalClock() {
  const { locale, c } = useI18n();
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: site.timezone,
      hour12: false,
    });

    const update = () => setTime(formatter.format(new Date()));
    update();
    const interval = window.setInterval(update, 30_000);
    return () => window.clearInterval(interval);
  }, [locale]);

  return (
    <span
      className="tabular-nums"
      suppressHydrationWarning
      title={c.ui.localTime}
    >
      {time || "--:--"} <span className="text-muted-foreground">FIA</span>
    </span>
  );
}
