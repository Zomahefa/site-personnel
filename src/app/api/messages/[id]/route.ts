import { NextResponse } from "next/server";
import { removeMessage } from "@/lib/messages";
import { isAuthorized } from "@/lib/auth";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Non autorisé" },
      { status: 401 }
    );
  }

  const deleted = await removeMessage(id);
  if (!deleted) {
    return NextResponse.json(
      { error: "Message non trouvé" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
