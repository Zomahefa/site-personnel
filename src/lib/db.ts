import { createClient } from "@libsql/client";
import path from "path";

const isTurso = !!process.env.TURSO_DB_URL;

const db = createClient(
  isTurso
    ? {
        url: process.env.TURSO_DB_URL!,
        authToken: process.env.TURSO_DB_TOKEN,
      }
    : {
        url: `file:${path.join(process.cwd(), "data", "portfolio.db")}`,
      }
);

db.execute(`
  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL
  )
`);

db.execute(`
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'fullstack',
    technologies TEXT NOT NULL DEFAULT '[]',
    image TEXT DEFAULT '',
    github TEXT DEFAULT '',
    demo TEXT DEFAULT '',
    created_at TEXT NOT NULL
  )
`);

/* ───────── Messages ───────── */

export async function getAllMessages() {
  const rs = await db.execute("SELECT * FROM messages ORDER BY created_at DESC");
  return rs.rows as any[];
}

export async function addMessage(
  id: string,
  name: string,
  email: string,
  phone: string,
  message: string
) {
  await db.execute({
    sql: "INSERT INTO messages (id, name, email, phone, message, created_at) VALUES (?, ?, ?, ?, ?, ?)",
    args: [id, name, email, phone, message, new Date().toISOString()],
  });
}

export async function deleteMessageById(id: string): Promise<boolean> {
  const rs = await db.execute({
    sql: "DELETE FROM messages WHERE id = ?",
    args: [id],
  });
  return rs.rowsAffected > 0;
}

export async function getMessagesByDate() {
  const rs = await db.execute(
    `SELECT DATE(created_at) as date, COUNT(*) as count
     FROM messages
     GROUP BY DATE(created_at)
     ORDER BY date ASC`
  );
  return rs.rows as any[];
}

/* ───────── Projects ───────── */

export async function getAllProjects() {
  const rs = await db.execute("SELECT * FROM projects ORDER BY created_at DESC");
  return rs.rows as any[];
}

export async function getProjectById(id: string) {
  const rs = await db.execute({
    sql: "SELECT * FROM projects WHERE id = ?",
    args: [id],
  });
  return rs.rows[0] as any | undefined;
}

export async function createProject(
  id: string,
  title: string,
  description: string,
  category: string,
  technologies: string[],
  image: string,
  github: string,
  demo: string
) {
  await db.execute({
    sql: `INSERT INTO projects (id, title, description, category, technologies, image, github, demo, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [id, title, description, category, JSON.stringify(technologies), image, github, demo, new Date().toISOString()],
  });
}

export async function updateProject(
  id: string,
  title: string,
  description: string,
  category: string,
  technologies: string[],
  image: string,
  github: string,
  demo: string
): Promise<boolean> {
  const rs = await db.execute({
    sql: `UPDATE projects
          SET title = ?, description = ?, category = ?, technologies = ?, image = ?, github = ?, demo = ?
          WHERE id = ?`,
    args: [title, description, category, JSON.stringify(technologies), image, github, demo, id],
  });
  return rs.rowsAffected > 0;
}

export async function deleteProjectById(id: string): Promise<boolean> {
  const rs = await db.execute({
    sql: "DELETE FROM projects WHERE id = ?",
    args: [id],
  });
  return rs.rowsAffected > 0;
}
