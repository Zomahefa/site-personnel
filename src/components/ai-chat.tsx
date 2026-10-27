"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Désolé, une erreur est survenue. Réessayez plus tard.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-xl border border-border/50 bg-card shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-primary/5">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <span className="font-semibold text-sm">
                  Assistant IA
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="h-80 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center text-sm text-muted-foreground py-8">
                  <Bot className="h-8 w-8 mx-auto mb-2 text-primary/50" />
                  <p>
                    Posez-moi des questions sur mon parcours, mes compétences ou
                    mes projets !
                  </p>
                </div>
              )}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${
                    msg.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="p-2 rounded-lg bg-muted">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-xl px-3 py-2 bg-muted">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
            <form
              onSubmit={handleSend}
              className="flex items-center gap-2 p-3 border-t border-border/40"
            >
              <Input
                placeholder="Posez votre question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="h-9 text-sm"
              />
              <Button
                type="submit"
                size="icon"
                className="h-9 w-9 shrink-0"
                disabled={loading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-4 z-50 p-3.5 rounded-full bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 transition-colors"
        aria-label="Assistant IA"
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageCircle className="h-5 w-5" />
        )}
      </motion.button>
    </>
  );
}
