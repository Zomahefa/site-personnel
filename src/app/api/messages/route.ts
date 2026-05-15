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

  const messages = getMessages();
  const dailyStats = getMessagesByDate();
  return NextResponse.json({ messages, dailyStats });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    const newMessage = addNewMessage(name, email, phone, message);
    return NextResponse.json(newMessage, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
