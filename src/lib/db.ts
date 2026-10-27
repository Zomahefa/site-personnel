import { createClient } from "@libsql/client";
import fs from "node:fs";
import path from "path";

const isTurso = !!process.env.TURSO_DB_URL;
const localDbPath = path.join(process.cwd(), "data", "portfolio.db");

if (!isTurso) {
  // Sur un clone neuf, le dossier n'existe pas encore.
  fs.mkdirSync(path.dirname(localDbPath), { recursive: true });
}

const db = createClient(
  isTurso
    ? {
        url: process.env.TURSO_DB_URL!,
        authToken: process.env.TURSO_DB_TOKEN,
      }
    : {
        url: `file:${localDbPath}`,
      },
);

let schemaPromise: Promise<void> | null = null;

/**
 * Crée les tables une seule fois par instance, avec une erreur remontée
 * au premier appelant au lieu d'une promesse non gérée au chargement.
 */
async function ensureSchema(): Promise<void> {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS messages (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          message TEXT NOT NULL,
          created_at TEXT NOT NULL
        )
      `);

      await db.execute(`
        CREATE TABLE IF NOT EXISTS page_views (
          id TEXT PRIMARY KEY,
          path TEXT NOT NULL,
          referrer TEXT NOT NULL DEFAULT '',
          country TEXT NOT NULL DEFAULT '',
          device TEXT NOT NULL DEFAULT '',
          visitor_id TEXT NOT NULL DEFAULT '',
          created_at TEXT NOT NULL
        )
      `);

      await db.execute(
        "CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at)",
      );
      await db.execute(
        "CREATE INDEX IF NOT EXISTS idx_page_views_visitor ON page_views(visitor_id)",
      );
      await db.execute(
        "CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at)",
      );
    })().catch((error) => {
      schemaPromise = null;
      throw error;
    });
  }

  return schemaPromise;
}

export type MessageRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
};

export type DailyCountRow = {
  date: string;
  count: number;
};

export type PageViewRow = {
  id: string;
  path: string;
  referrer: string;
  country: string;
  device: string;
  visitor_id: string;
  created_at: string;
};

export type VisitStats = {
  total: number;
  last7: number;
  today: number;
  uniqueVisitors: number;
  daily: DailyCountRow[];
  topPages: Array<{ path: string; count: number }>;
  topCountries: Array<{ country: string; count: number }>;
  topDevices: Array<{ device: string; count: number }>;
  recent: PageViewRow[];
};

/* ───────── Messages ───────── */

export async function getAllMessages(): Promise<MessageRow[]> {
  await ensureSchema();
  const result = await db.execute(
    "SELECT * FROM messages ORDER BY created_at DESC",
  );
  return result.rows as unknown as MessageRow[];
}

export async function addMessage(
  id: string,
  name: string,
  email: string,
  phone: string,
  message: string,
) {
  await ensureSchema();
  await db.execute({
    sql: "INSERT INTO messages (id, name, email, phone, message, created_at) VALUES (?, ?, ?, ?, ?, ?)",
    args: [id, name, email, phone, message, new Date().toISOString()],
  });
}

export async function deleteMessageById(id: string): Promise<boolean> {
  await ensureSchema();
  const result = await db.execute({
    sql: "DELETE FROM messages WHERE id = ?",
    args: [id],
  });
  return result.rowsAffected > 0;
}

/* ───────── Audience ───────── */

export async function addPageView(
  id: string,
  path: string,
  referrer: string,
  country: string,
  device: string,
  visitorId: string,
) {
  await ensureSchema();
  await db.execute({
    sql: `INSERT INTO page_views (id, path, referrer, country, device, visitor_id, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      path,
      referrer,
      country,
      device,
      visitorId,
      new Date().toISOString(),
    ],
  });
}

async function countQuery(sql: string): Promise<number> {
  const result = await db.execute(sql);
  const row = result.rows[0] as unknown as { count?: number } | undefined;
  return Number(row?.count ?? 0);
}

export async function getVisitStats(): Promise<VisitStats> {
  await ensureSchema();

  const [
    total,
    last7,
    today,
    uniqueVisitors,
    daily,
    topPages,
    topCountries,
    topDevices,
    recent,
  ] = await Promise.all([
    countQuery("SELECT COUNT(*) AS count FROM page_views"),
    countQuery(
      "SELECT COUNT(*) AS count FROM page_views WHERE julianday(created_at) >= julianday('now', '-7 days')",
    ),
    countQuery(
      "SELECT COUNT(*) AS count FROM page_views WHERE date(created_at) = date('now')",
    ),
    countQuery(
      "SELECT COUNT(DISTINCT visitor_id) AS count FROM page_views WHERE visitor_id <> ''",
    ),
    db.execute(
      `SELECT date(created_at) AS date, COUNT(*) AS count
       FROM page_views
       WHERE julianday(created_at) >= julianday('now', '-14 days')
       GROUP BY date(created_at)
       ORDER BY date(created_at) ASC`,
    ),
    db.execute(
      `SELECT path, COUNT(*) AS count
       FROM page_views
       GROUP BY path
       ORDER BY count DESC
       LIMIT 5`,
    ),
    db.execute(
      `SELECT country, COUNT(*) AS count
       FROM page_views
       WHERE country <> ''
       GROUP BY country
       ORDER BY count DESC
       LIMIT 5`,
    ),
    db.execute(
      `SELECT device, COUNT(*) AS count
       FROM page_views
       WHERE device <> ''
       GROUP BY device
       ORDER BY count DESC
       LIMIT 5`,
    ),
    db.execute(
      `SELECT id, path, referrer, country, device, visitor_id, created_at
       FROM page_views
       ORDER BY created_at DESC
       LIMIT 25`,
    ),
  ]);

  return {
    total,
    last7,
    today,
    uniqueVisitors,
    daily: daily.rows as unknown as DailyCountRow[],
    topPages: topPages.rows as unknown as Array<{ path: string; count: number }>,
    topCountries: topCountries.rows as unknown as Array<{
      country: string;
      count: number;
    }>,
    topDevices: topDevices.rows as unknown as Array<{
      device: string;
      count: number;
    }>,
    recent: recent.rows as unknown as PageViewRow[],
  };
}
