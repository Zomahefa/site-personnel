import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "portfolio.db");

let db: Database.Database;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.exec(`
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT 'fullstack',
        technologies TEXT NOT NULL DEFAULT '[]',
        image TEXT DEFAULT '',
        github TEXT DEFAULT '',
        demo TEXT DEFAULT '',
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS experiences (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        company TEXT NOT NULL DEFAULT '',
        period TEXT NOT NULL DEFAULT '',
        description TEXT NOT NULL DEFAULT '',
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS education (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        company TEXT NOT NULL DEFAULT '',
        period TEXT NOT NULL DEFAULT '',
        description TEXT NOT NULL DEFAULT '',
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS certifications (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        issuer TEXT NOT NULL DEFAULT '',
        year TEXT NOT NULL DEFAULT '',
        status TEXT NOT NULL DEFAULT 'Obtenu',
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS skill_groups (
        id TEXT PRIMARY KEY,
        category TEXT NOT NULL,
        items TEXT NOT NULL DEFAULT '[]',
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `);
  }
  return db;
}

/* ───────── Messages ───────── */

export interface MessageRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

export function getAllMessages(): MessageRow[] {
  return getDb()
    .prepare("SELECT * FROM messages ORDER BY created_at DESC")
    .all() as MessageRow[];
}

export function addMessage(
  id: string,
  name: string,
  email: string,
  phone: string,
  message: string
) {
  getDb()
    .prepare(
      "INSERT INTO messages (id, name, email, phone, message, created_at) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .run(id, name, email, phone, message, new Date().toISOString());
}

export function deleteMessageById(id: string): boolean {
  const result = getDb()
    .prepare("DELETE FROM messages WHERE id = ?")
    .run(id);
  return result.changes > 0;
}

export function getMessageCount(): number {
  const row = getDb()
    .prepare("SELECT COUNT(*) as count FROM messages")
    .get() as { count: number };
  return row.count;
}

export function getMessagesByDate(): { date: string; count: number }[] {
  const rows = getDb()
    .prepare(
      `SELECT DATE(created_at) as date, COUNT(*) as count
       FROM messages
       GROUP BY DATE(created_at)
       ORDER BY date ASC`
    )
    .all() as { date: string; count: number }[];
  return rows;
}

/* ───────── Projects ───────── */

export interface ProjectRow {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string;
  image: string;
  github: string;
  demo: string;
  created_at: string;
}

export function getAllProjects(): ProjectRow[] {
  return getDb()
    .prepare("SELECT * FROM projects ORDER BY created_at DESC")
    .all() as ProjectRow[];
}

export function getProjectById(id: string): ProjectRow | undefined {
  return getDb()
    .prepare("SELECT * FROM projects WHERE id = ?")
    .get(id) as ProjectRow | undefined;
}

export function createProject(
  id: string,
  title: string,
  description: string,
  category: string,
  technologies: string[],
  image: string,
  github: string,
  demo: string
) {
  getDb()
    .prepare(
      `INSERT INTO projects (id, title, description, category, technologies, image, github, demo, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      id,
      title,
      description,
      category,
      JSON.stringify(technologies),
      image,
      github,
      demo,
      new Date().toISOString()
    );
}

export function updateProject(
  id: string,
  title: string,
  description: string,
  category: string,
  technologies: string[],
  image: string,
  github: string,
  demo: string
): boolean {
  const result = getDb()
    .prepare(
      `UPDATE projects
       SET title = ?, description = ?, category = ?, technologies = ?, image = ?, github = ?, demo = ?
       WHERE id = ?`
    )
    .run(title, description, category, JSON.stringify(technologies), image, github, demo, id);
  return result.changes > 0;
}

export function deleteProjectById(id: string): boolean {
  const result = getDb()
    .prepare("DELETE FROM projects WHERE id = ?")
    .run(id);
  return result.changes > 0;
}

/* ───────── Generic CRUD helpers ───────── */

type TableName = "experiences" | "education" | "certifications" | "skill_groups";

export function getAllFromTable(table: TableName, orderBy = "sort_order ASC") {
  return getDb()
    .prepare(`SELECT * FROM ${table} ORDER BY ${orderBy}`)
    .all();
}

export function insertIntoTable(table: TableName, data: Record<string, any>) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map(() => "?").join(", ");
  getDb()
    .prepare(
      `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${placeholders})`
    )
    .run(...values);
}

export function updateTable(
  table: TableName,
  id: string,
  data: Record<string, any>
): boolean {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const setClause = keys.map((k) => `${k} = ?`).join(", ");
  const result = getDb()
    .prepare(`UPDATE ${table} SET ${setClause} WHERE id = ?`)
    .run(...values, id);
  return result.changes > 0;
}

export function deleteFromTable(table: TableName, id: string): boolean {
  const result = getDb()
    .prepare(`DELETE FROM ${table} WHERE id = ?`)
    .run(id);
  return result.changes > 0;
}
