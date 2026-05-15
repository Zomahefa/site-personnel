import { NextResponse } from "next/server";
import { verifyPassword } from "@/lib/auth";

const validTables = [
  "experiences",
  "education",
  "certifications",
  "skill_groups",
] as const;
type Table = (typeof validTables)[number];

function isValidTable(t: string): t is Table {
  return validTables.includes(t as Table);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const url = new URL(request.url);
  const table = url.searchParams.get("table");

  if (!table || !isValidTable(table)) {
    return NextResponse.json({ error: "Table invalide" }, { status: 400 });
  }

  const authHeader = request.headers.get("authorization");
  if (!verifyPassword(authHeader)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { updateTable } = await import("@/lib/db");

    const data = { ...body };
    delete data.id;

    if (table === "skill_groups" && Array.isArray(data.items)) {
      data.items = JSON.stringify(data.items);
    }

    const updated = updateTable(table, id, data);
    if (!updated) {
      return NextResponse.json({ error: "Élément non trouvé" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const url = new URL(request.url);
  const table = url.searchParams.get("table");

  if (!table || !isValidTable(table)) {
    return NextResponse.json({ error: "Table invalide" }, { status: 400 });
  }

  const authHeader = request.headers.get("authorization");
  if (!verifyPassword(authHeader)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { deleteFromTable } = await import("@/lib/db");
  const deleted = deleteFromTable(table, id);
  if (!deleted) {
    return NextResponse.json({ error: "Élément non trouvé" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
