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

export async function GET(request: Request) {
  const url = new URL(request.url);
  const table = url.searchParams.get("table");

  if (!table || !isValidTable(table)) {
    return NextResponse.json({ error: "Table invalide" }, { status: 400 });
  }

  const authHeader = request.headers.get("authorization");
  if (!verifyPassword(authHeader)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { getAllFromTable } = await import("@/lib/db");
  const rows = getAllFromTable(table);
  return NextResponse.json(
    rows.map((r: any) => {
      if (table === "skill_groups" && r.items) {
        try {
          r.items = JSON.parse(r.items);
        } catch {}
      }
      return r;
    })
  );
}

export async function POST(request: Request) {
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
    const { insertIntoTable } = await import("@/lib/db");

    const id = Date.now().toString();
    const data: Record<string, any> = { id, ...body };

    if (table === "skill_groups" && Array.isArray(data.items)) {
      data.items = JSON.stringify(data.items);
    }

    insertIntoTable(table, data);
    return NextResponse.json({ id, success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
