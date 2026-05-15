import { NextResponse } from "next/server";
import { getProjectById, updateProject, deleteProjectById } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) {
    return NextResponse.json({ error: "Projet non trouvé" }, { status: 404 });
  }
  return NextResponse.json({
    ...project,
    technologies: JSON.parse(project.technologies as string),
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authHeader = request.headers.get("authorization");
  if (!verifyPassword(authHeader)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const { title, description, category, technologies, image, github, demo } =
      await request.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: "Titre et description requis" },
        { status: 400 }
      );
    }

    const updated = await updateProject(
      id,
      title,
      description,
      category || "fullstack",
      technologies || [],
      image || "",
      github || "",
      demo || ""
    );

    if (!updated) {
      return NextResponse.json({ error: "Projet non trouvé" }, { status: 404 });
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
  const authHeader = request.headers.get("authorization");
  if (!verifyPassword(authHeader)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteProjectById(id);

  if (!deleted) {
    return NextResponse.json({ error: "Projet non trouvé" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
