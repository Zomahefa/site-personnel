import { NextResponse } from "next/server";
import { getMessages, addNewMessage } from "@/lib/messages";
import { getMessagesByDate } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!verifyPassword(authHeader)) {
    return NextResponse.json(
      { error: "Non autorisé" },
      { status: 401 }
    );
  }

  const messages = await getMessages();
  const dailyStats = await getMessagesByDate();
  return NextResponse.json({ messages, dailyStats });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Le nom est requis" },
        { status: 400 }
      );
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Email invalide" },
        { status: 400 }
      );
    }
    if (!phone || !/^[\d\s\-\+\(\)]{6,20}$/.test(phone)) {
      return NextResponse.json(
        { error: "Numéro de téléphone invalide" },
        { status: 400 }
      );
    }
    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: "Le message est requis" },
        { status: 400 }
      );
    }

    const newMessage = await addNewMessage(name.trim(), email.trim(), phone.trim(), message.trim());
    return NextResponse.json(newMessage, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
