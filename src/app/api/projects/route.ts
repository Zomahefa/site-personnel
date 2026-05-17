import { NextResponse } from "next/server";
import { getAllProjects, createProject } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";

export async function GET() {
  const projects = await getAllProjects();
  return NextResponse.json(
    projects.map((p: any) => ({
      ...p,
      technologies: JSON.parse(p.technologies),
    })),
    {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=120",
      },
    },
  );
}

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!verifyPassword(authHeader)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { title, description, category, technologies, image, github, demo } =
      await request.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: "Titre et description requis" },
        { status: 400 },
      );
    }

    const id = Date.now().toString();
    await createProject(
      id,
      title,
      description,
      category || "fullstack",
      technologies || [],
      image || "",
      github || "",
      demo || "",
    );

    return NextResponse.json({ id, success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
