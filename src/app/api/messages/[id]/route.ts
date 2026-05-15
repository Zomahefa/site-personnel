import { NextResponse } from "next/server";
import { removeMessage } from "@/lib/messages";
import { verifyPassword } from "@/lib/auth";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const authHeader = request.headers.get("authorization");

  if (!verifyPassword(authHeader)) {
    return NextResponse.json(
      { error: "Non autorisé" },
      { status: 401 }
    );
  }

  const deleted = removeMessage(id);
  if (!deleted) {
    return NextResponse.json(
      { error: "Message non trouvé" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
