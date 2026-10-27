import { NextResponse } from "next/server";
import { getMessages, addNewMessage } from "@/lib/messages";
import { getMessagesByDate } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";

const rateLimits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = rateLimits.get(ip);

  if (!current || now > current.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return false;
  }

  if (current.count >= 5) return true;
  current.count += 1;
  return false;
}

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!verifyPassword(authHeader)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const messages = await getMessages();
  const dailyStats = await getMessagesByDate();
  return NextResponse.json({ messages, dailyStats });
}

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Trop de demandes. Réessayez dans quelques minutes." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const name = clean(body.name, 120);
    const email = clean(body.email, 180);
    const phone = clean(body.phone, 30);
    const message = clean(body.message, 5000);
    const projectType = clean(body.projectType, 80);

    if (!name) {
      return NextResponse.json({ error: "Le nom est requis" }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }
    if (phone && !/^[\d\s\-+()]{6,30}$/.test(phone)) {
      return NextResponse.json(
        { error: "Numéro de téléphone invalide" },
        { status: 400 },
      );
    }
    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: "Le message doit contenir au moins 10 caractères" },
        { status: 400 },
      );
    }

    const fullMessage = projectType
      ? `Type de besoin : ${projectType}\n\n${message}`
      : message;

    const newMessage = await addNewMessage(name, email, phone, fullMessage);
    return NextResponse.json(newMessage, {
      status: 201,
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "L'envoi direct est temporairement indisponible. Écrivez-moi directement par e-mail.",
        fallback: "email",
      },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
