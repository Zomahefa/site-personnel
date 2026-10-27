"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Bot,
  RotateCcw,
  Send,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { site } from "@/lib/content";
import { useI18n } from "@/components/language-provider";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function AiAssistant() {
  const { c } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const node = listRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, pending, error]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (pathname.startsWith("/admin")) return null;

  const visible: Message[] = messages.length
    ? messages
    : [{ role: "assistant", content: c.ai.greeting }];

  async function send(text: string) {
    const content = text.trim();
    if (!content || pending) return;

    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setError("");
    setPending(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      const data = (await response.json()) as { reply?: string };

      if (!response.ok || !data.reply) {
        throw new Error("assistant-unavailable");
      }

      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch {
      setError(c.ai.error);
    } finally {
      setPending(false);
    }
  }

  function reset() {
    setMessages([]);
    setError("");
    setInput("");
    inputRef.current?.focus();
  }

  return (
    <div className="ai-root">
      {open ? (
        <section
          className="ai-panel"
          role="dialog"
          aria-label={c.ai.title}
        >
          <header className="ai-header">
            <div className="ai-header-title">
              <span className="ai-avatar" aria-hidden="true">
                <Bot className="size-4" />
              </span>
              <span>
                <strong>{c.ai.title}</strong>
                <small>{c.ai.subtitle}</small>
              </span>
            </div>
            <div className="ai-header-actions">
              {messages.length ? (
                <button
                  type="button"
                  className="ai-icon-button"
                  onClick={reset}
                  aria-label={c.ai.clear}
                  title={c.ai.clear}
                >
                  <RotateCcw className="size-3.5" aria-hidden="true" />
                </button>
              ) : null}
              <button
                type="button"
                className="ai-icon-button"
                onClick={() => setOpen(false)}
                aria-label={c.ai.close}
                title={c.ai.close}
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          </header>

          <div className="ai-messages" ref={listRef} aria-live="polite">
            {visible.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`ai-message ai-message-${message.role}`}
              >
                <span className="ai-message-role" aria-hidden="true">
                  {message.role === "assistant" ? (
                    <Sparkles className="size-3.5" />
                  ) : (
                    <User className="size-3.5" />
                  )}
                </span>
                <p>{message.content}</p>
              </div>
            ))}

            {pending ? (
              <div className="ai-message ai-message-assistant">
                <span className="ai-message-role" aria-hidden="true">
                  <Sparkles className="size-3.5" />
                </span>
                <span className="ai-typing" aria-label={c.ai.thinking}>
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            ) : null}

            {error ? (
              <div className="ai-error" role="alert">
                <p>{error}</p>
                <a href={`mailto:${site.email}`} className="text-link">
                  {site.email}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            ) : null}
          </div>

          {messages.length === 0 ? (
            <div className="ai-suggestions">
              {c.ai.suggestions.map((suggestion) => (
                <button
                  type="button"
                  key={suggestion}
                  onClick={() => send(suggestion)}
                  className="ai-suggestion"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          ) : null}

          <form
            className="ai-form"
            onSubmit={(event) => {
              event.preventDefault();
              send(input);
            }}
          >
            <label htmlFor="ai-question" className="sr-only">
              {c.ai.placeholder}
            </label>
            <input
              id="ai-question"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={c.ai.placeholder}
              maxLength={1200}
              autoComplete="off"
            />
            <button
              type="submit"
              className="ai-send"
              disabled={pending || !input.trim()}
              aria-label={c.ai.send}
            >
              <Send className="size-4" aria-hidden="true" />
            </button>
          </form>

          <p className="ai-disclaimer">{c.ai.disclaimer}</p>
        </section>
      ) : null}

      <button
        type="button"
        className="ai-fab"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? c.ai.close : c.ai.open}
      >
        {open ? (
          <X className="size-5" aria-hidden="true" />
        ) : (
          <>
            <Bot className="size-5" aria-hidden="true" />
            <span className="ai-fab-label">{c.ai.title}</span>
            <span className="ai-fab-dot" aria-hidden="true" />
          </>
        )}
      </button>
    </div>
  );
}
