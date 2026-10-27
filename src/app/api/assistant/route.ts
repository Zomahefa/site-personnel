import { NextResponse } from "next/server";
import { buildAssistantSystemPrompt } from "@/lib/assistant-prompt";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const rateLimits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = rateLimits.get(ip);

  if (!current || now > current.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return false;
  }

  if (current.count >= 25) return true;
  current.count += 1;
  return false;
}

function cleanMessages(value: unknown): ChatMessage[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter(
      (item): item is ChatMessage =>
        !!item &&
        typeof item === "object" &&
        (item as ChatMessage).role !== undefined &&
        ((item as ChatMessage).role === "user" ||
          (item as ChatMessage).role === "assistant") &&
        typeof (item as ChatMessage).content === "string",
    )
    .slice(-8)
    .map((item) => ({
      role: item.role,
      content: item.content.trim().slice(0, 1200),
    }))
    .filter((item) => item.content.length > 0);
}

function resolveProvider() {
  const explicit = process.env.AI_PROVIDER?.toLowerCase();
  if (explicit === "google" && process.env.GOOGLE_AI_API_KEY) return "google";
  if (explicit === "groq" && process.env.GROQ_API_KEY) return "groq";
  if (process.env.GROQ_API_KEY) return "groq";
  if (process.env.GOOGLE_AI_API_KEY) return "google";
  return null;
}

async function askGroq(messages: ChatMessage[], system: string) {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL ?? "openai/gpt-oss-120b",
        temperature: 0.35,
        max_tokens: 900,
        // Modèle de raisonnement : sans cet effort réduit, les tokens de
        // réflexion peuvent consommer tout le budget et vider la réponse.
        reasoning_effort: "low",
        messages: [{ role: "system", content: system }, ...messages],
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Groq error ${response.status}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

async function askGoogle(messages: ChatMessage[], system: string) {
  const model = process.env.GOOGLE_AI_MODEL ?? "gemini-2.5-flash";
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GOOGLE_AI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: messages.map((message) => ({
          role: message.role === "assistant" ? "model" : "user",
          parts: [{ text: message.content }],
        })),
        generationConfig: {
          temperature: 0.35,
          maxOutputTokens: 450,
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Google AI error ${response.status}`);
  }

  const data = (await response.json()) as {
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }> };
    }>;
  };

  return (
    data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? "")
      .join("")
      .trim() ?? ""
  );
}

export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "rate-limited", fallback: true },
      { status: 429, headers: { "Cache-Control": "no-store" } },
    );
  }

  const provider = resolveProvider();
  if (!provider) {
    return NextResponse.json(
      { error: "not-configured", fallback: true },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const body = (await request.json()) as { messages?: unknown };
    const messages = cleanMessages(body.messages);

    if (!messages.length) {
      return NextResponse.json(
        { error: "empty", fallback: false },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      );
    }

    const system = buildAssistantSystemPrompt();
    const reply =
      provider === "google"
        ? await askGoogle(messages, system)
        : await askGroq(messages, system);

    if (!reply) {
      throw new Error("empty-reply");
    }

    return NextResponse.json(
      { reply, provider },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { error: "provider-error", fallback: true },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
