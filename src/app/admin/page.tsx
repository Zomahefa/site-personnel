"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Eye,
  Inbox,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Monitor,
  Phone,
  RefreshCw,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import type { Message } from "@/types";

type Tab = "messages" | "visits";

type VisitStats = {
  total: number;
  last7: number;
  today: number;
  uniqueVisitors: number;
  daily: Array<{ date: string; count: number }>;
  topPages: Array<{ path: string; count: number }>;
  topCountries: Array<{ country: string; count: number }>;
  topDevices: Array<{ device: string; count: number }>;
  recent: Array<{
    id: string;
    path: string;
    referrer: string;
    country: string;
    device: string;
    created_at: string;
  }>;
};

const countryNames: Record<string, string> = {
  MG: "Madagascar",
  FR: "France",
  RE: "La Réunion",
  MU: "Maurice",
  US: "États-Unis",
  CA: "Canada",
  DE: "Allemagne",
  GB: "Royaume-Uni",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Indian/Antananarivo",
  }).format(new Date(value));
}

function formatDay(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
  }).format(new Date(`${value}T12:00:00Z`));
}

function shortReferrer(value: string) {
  if (!value) return "direct";
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return "direct";
  }
}

function lastDays(data: Array<{ date: string; count: number }>, count: number) {
  const byDate = new Map(data.map((entry) => [entry.date, entry.count]));
  return Array.from({ length: count }, (_, index) => {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() - (count - 1 - index));
    const key = date.toISOString().slice(0, 10);
    return { date: key, count: byDate.get(key) ?? 0 };
  });
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [visits, setVisits] = useState<VisitStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<Tab>("messages");

  const filteredMessages = messages.filter((message) => {
    const query = search.toLowerCase();
    return (
      message.name.toLowerCase().includes(query) ||
      message.email.toLowerCase().includes(query) ||
      message.message.toLowerCase().includes(query)
    );
  });

  async function loadAll(currentPassword = password) {
    setLoading(true);
    setError("");

    try {
      const [messagesResponse, visitsResponse] = await Promise.all([
        fetch("/api/messages", {
          headers: { Authorization: `Bearer ${currentPassword}` },
        }),
        fetch("/api/visits", {
          headers: { Authorization: `Bearer ${currentPassword}` },
        }),
      ]);

      if (!messagesResponse.ok) {
        setAuthenticated(false);
        setError("Mot de passe incorrect ou session expirée.");
        return;
      }

      const messagesData = (await messagesResponse.json()) as {
        messages: Message[];
      };
      setMessages(messagesData.messages ?? []);
      setAuthenticated(true);

      if (visitsResponse.ok) {
        setVisits((await visitsResponse.json()) as VisitStats);
      } else {
        setVisits(null);
      }
    } catch {
      setError("Connexion impossible. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await loadAll(password);
  }

  async function handleDelete(id: string) {
    const response = await fetch(`/api/messages/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${password}` },
    });

    if (response.ok) {
      setMessages((current) => current.filter((message) => message.id !== id));
    } else {
      setError("Suppression impossible. Vérifiez votre session.");
    }
  }

  if (!authenticated) {
    return (
      <section className="flex min-h-[75vh] items-center justify-center px-5 py-20">
        <div className="w-full max-w-sm border border-border bg-card p-7 shadow-[8px_8px_0_var(--brand-soft)]">
          <span className="mono text-brand">ACCÈS PRIVÉ</span>
          <div className="mt-5 flex size-12 items-center justify-center border border-border text-brand">
            <Lock className="size-5" aria-hidden="true" />
          </div>
          <h1 className="mt-5 font-display text-4xl leading-none tracking-tight">
            Administration
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Messages reçus et audience du portfolio. Accès réservé.
          </p>
          <form onSubmit={handleLogin} className="mt-6 space-y-3">
            <label className="mono text-muted-foreground" htmlFor="admin-password">
              Mot de passe
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-11 w-full border border-border bg-background px-3 text-sm outline-none focus:border-brand"
              autoComplete="current-password"
              required
            />
            {error ? (
              <p className="text-xs text-destructive" role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={loading}
              className="button button-dark w-full"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </div>
      </section>
    );
  }

  const daily = visits ? lastDays(visits.daily, 14) : [];
  const maxDaily = Math.max(...daily.map((day) => day.count), 1);

  return (
    <section className="py-12">
      <div className="site-shell">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
          <div>
            <span className="mono text-brand">ADMIN / PORTFOLIO</span>
            <h1 className="mt-2 font-display text-5xl leading-none tracking-tight">
              Tableau de bord
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {messages.length} message{messages.length > 1 ? "s" : ""} ·{" "}
              {visits?.total ?? 0} vue{(visits?.total ?? 0) > 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="button button-outline"
              onClick={() => loadAll()}
              disabled={loading}
            >
              <RefreshCw
                className={`size-3.5 ${loading ? "animate-spin" : ""}`}
                aria-hidden="true"
              />
              Actualiser
            </button>
            <button
              type="button"
              className="button button-outline"
              onClick={() => {
                setAuthenticated(false);
                setPassword("");
                setMessages([]);
                setVisits(null);
              }}
            >
              <LogOut className="size-3.5" aria-hidden="true" />
              Quitter
            </button>
          </div>
        </div>

        <div className="mt-5 flex gap-1 border-b border-border" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "messages"}
            onClick={() => setTab("messages")}
            className={`inline-flex items-center gap-2 border-b-2 px-3 py-2.5 text-sm transition-colors ${
              tab === "messages"
                ? "border-brand text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Inbox className="size-4" aria-hidden="true" />
            Messages
            <span className="mono text-muted-foreground">{messages.length}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "visits"}
            onClick={() => setTab("visits")}
            className={`inline-flex items-center gap-2 border-b-2 px-3 py-2.5 text-sm transition-colors ${
              tab === "visits"
                ? "border-brand text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <BarChart3 className="size-4" aria-hidden="true" />
            Visites
          </button>
        </div>

        {error ? (
          <p className="mt-5 border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            {error}
          </p>
        ) : null}

        {tab === "messages" ? (
          <>
            <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <label className="relative block w-full max-w-sm">
                <span className="sr-only">Rechercher dans les messages</span>
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Nom, e-mail, contenu..."
                  className="h-10 w-full border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-brand"
                />
              </label>
              <span className="mono text-muted-foreground">
                {filteredMessages.length} RÉSULTAT
                {filteredMessages.length > 1 ? "S" : ""}
              </span>
            </div>

            {filteredMessages.length === 0 ? (
              <div className="mt-10 flex flex-col items-center justify-center border border-dashed border-border py-20 text-center">
                <Inbox className="size-8 text-muted-foreground" aria-hidden="true" />
                <p className="mt-4 text-sm font-medium">
                  Aucun message à afficher.
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Les nouveaux messages du formulaire apparaîtront ici.
                </p>
              </div>
            ) : (
              <div className="mt-6 divide-y divide-border border-y border-border">
                {filteredMessages.map((message) => (
                  <article
                    key={message.id}
                    className="grid gap-4 py-5 md:grid-cols-[1fr_auto]"
                  >
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h2 className="text-base font-semibold">
                          {message.name}
                        </h2>
                        <span className="mono text-muted-foreground">
                          {formatDate(message.createdAt)}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <a
                          href={`mailto:${message.email}`}
                          className="inline-flex items-center gap-1 hover:text-brand"
                        >
                          <Mail className="size-3.5" aria-hidden="true" />
                          {message.email}
                        </a>
                        {message.phone ? (
                          <a
                            href={`tel:${message.phone}`}
                            className="inline-flex items-center gap-1 hover:text-brand"
                          >
                            <Phone className="size-3.5" aria-hidden="true" />
                            {message.phone}
                          </a>
                        ) : null}
                      </div>
                      <p className="mt-3 max-w-4xl whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                        {message.message}
                      </p>
                      <a
                        href={`mailto:${message.email}?subject=${encodeURIComponent(
                          "Réponse à votre message — portfolio",
                        )}`}
                        className="text-link mt-3"
                      >
                        Répondre
                        <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      </a>
                    </div>
                    <div className="flex items-start md:justify-end">
                      <button
                        type="button"
                        onClick={() => handleDelete(message.id)}
                        className="inline-flex items-center gap-1.5 border border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
                        aria-label={`Supprimer le message de ${message.name}`}
                      >
                        <Trash2 className="size-3.5" aria-hidden="true" />
                        Supprimer
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="mt-6">
            {!visits ? (
              <div className="flex flex-col items-center justify-center border border-dashed border-border py-20 text-center">
                <BarChart3
                  className="size-8 text-muted-foreground"
                  aria-hidden="true"
                />
                <p className="mt-4 text-sm font-medium">
                  Statistiques indisponibles.
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  La base de données n&apos;est pas accessible.
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    {
                      label: "Vues totales",
                      value: visits.total,
                      icon: Eye,
                    },
                    {
                      label: "7 derniers jours",
                      value: visits.last7,
                      icon: CalendarDays,
                    },
                    {
                      label: "Visiteurs uniques",
                      value: visits.uniqueVisitors,
                      icon: Users,
                    },
                    {
                      label: "Aujourd'hui",
                      value: visits.today,
                      icon: Monitor,
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="border border-border bg-card p-4"
                    >
                      <div className="flex items-center justify-between gap-2 text-muted-foreground">
                        <span className="mono">{stat.label}</span>
                        <stat.icon className="size-4" aria-hidden="true" />
                      </div>
                      <p className="mt-3 font-display text-4xl leading-none">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
                  <div className="border border-border bg-card p-4">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-sm font-semibold">
                        Vues · 14 derniers jours
                      </h2>
                      <span className="mono text-muted-foreground">
                        TOTAL {visits.total}
                      </span>
                    </div>
                    <div className="mt-5 flex h-44 items-end gap-1.5">
                      {daily.map((day) => (
                        <div
                          key={day.date}
                          className="group flex h-full flex-1 flex-col justify-end gap-1"
                          title={`${formatDay(day.date)} : ${day.count} vue${
                            day.count > 1 ? "s" : ""
                          }`}
                        >
                          <span className="text-center font-mono text-[9px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                            {day.count}
                          </span>
                          <span
                            className="block min-h-[2px] w-full bg-brand transition-opacity group-hover:opacity-75"
                            style={{
                              height: `${Math.max((day.count / maxDaily) * 100, 2)}%`,
                            }}
                          />
                          <span className="mono text-center text-[8px] text-muted-foreground">
                            {formatDay(day.date)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border border-border bg-card p-4">
                    <h2 className="text-sm font-semibold">Sources</h2>
                    <div className="mt-3 space-y-3">
                      {(visits.topCountries.length
                        ? visits.topCountries
                        : [{ country: "—", count: 0 }]
                      ).map((country) => (
                        <div key={country.country}>
                          <div className="flex items-center justify-between text-xs">
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin
                                className="size-3 text-muted-foreground"
                                aria-hidden="true"
                              />
                              {countryNames[country.country] ??
                                country.country ??
                                "Inconnu"}
                            </span>
                            <span className="mono text-muted-foreground">
                              {country.count}
                            </span>
                          </div>
                          <div className="mt-1.5 h-1 bg-muted">
                            <div
                              className="h-full bg-brand"
                              style={{
                                width: `${
                                  visits.total
                                    ? (country.count / visits.total) * 100
                                    : 0
                                }%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 border-t border-border pt-3">
                      <span className="mono text-muted-foreground">
                        APPAREILS
                      </span>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {visits.topDevices.length ? (
                          visits.topDevices.map((device) => (
                            <span
                              key={device.device}
                              className="border border-border px-2 py-1 text-xs"
                            >
                              {device.device} · {device.count}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            Aucune donnée
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.5fr]">
                  <div className="border border-border bg-card p-4">
                    <h2 className="text-sm font-semibold">Pages vues</h2>
                    <div className="mt-3 divide-y divide-border">
                      {visits.topPages.length ? (
                        visits.topPages.map((page) => (
                          <div
                            key={page.path}
                            className="flex items-center justify-between gap-3 py-2 text-xs"
                          >
                            <span className="truncate font-mono">
                              {page.path}
                            </span>
                            <span className="mono text-muted-foreground">
                              {page.count}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="py-2 text-xs text-muted-foreground">
                          Aucune visite enregistrée.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="border border-border bg-card p-4">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-sm font-semibold">
                        Dernières visites
                      </h2>
                      <span className="mono text-muted-foreground">
                        SANS IP NI COOKIE
                      </span>
                    </div>
                    <div className="mt-3 overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="mono text-muted-foreground">
                          <tr>
                            <th className="py-1.5 pr-3 font-normal">Date</th>
                            <th className="py-1.5 pr-3 font-normal">Page</th>
                            <th className="py-1.5 pr-3 font-normal">Pays</th>
                            <th className="py-1.5 pr-3 font-normal">Appareil</th>
                            <th className="py-1.5 font-normal">Source</th>
                          </tr>
                        </thead>
                        <tbody>
                          {visits.recent.length ? (
                            visits.recent.map((visit) => (
                              <tr
                                key={visit.id}
                                className="border-t border-border"
                              >
                                <td className="whitespace-nowrap py-2 pr-3 text-muted-foreground">
                                  {formatDate(visit.created_at)}
                                </td>
                                <td className="py-2 pr-3 font-mono">
                                  {visit.path}
                                </td>
                                <td className="py-2 pr-3">
                                  {countryNames[visit.country] ??
                                    visit.country ??
                                    "—"}
                                </td>
                                <td className="py-2 pr-3">
                                  {visit.device || "—"}
                                </td>
                                <td className="py-2 text-muted-foreground">
                                  {shortReferrer(visit.referrer)}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan={5}
                                className="py-4 text-center text-muted-foreground"
                              >
                                Aucune visite enregistrée.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
                  Mesure sans cookie et sans adresse IP : un identifiant anonyme
                  local permet de distinguer les visiteurs. Les données sont
                  agrégées pour suivre l&apos;audience du portfolio.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

