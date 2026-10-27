#!/usr/bin/env node
/**
 * Initialise la base de données utilisée par le portfolio.
 *
 * - Sans TURSO_DB_URL : base SQLite locale `data/portfolio.db`.
 * - Avec TURSO_DB_URL + TURSO_DB_TOKEN : base Turso distante.
 *
 * Utilisation :
 *   npm run db:init
 */

import path from "node:path";
import fs from "node:fs";
import nextEnv from "@next/env";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const { createClient } = await import("@libsql/client");

const localDbPath = path.join(process.cwd(), "data", "portfolio.db");
const url = process.env.TURSO_DB_URL ?? `file:${localDbPath}`;

if (!process.env.TURSO_DB_URL) {
  fs.mkdirSync(path.dirname(localDbPath), { recursive: true });
}

const client = createClient({
  url,
  authToken: process.env.TURSO_DB_TOKEN,
});

const statements = [
  `CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS page_views (
    id TEXT PRIMARY KEY,
    path TEXT NOT NULL,
    referrer TEXT NOT NULL DEFAULT '',
    country TEXT NOT NULL DEFAULT '',
    device TEXT NOT NULL DEFAULT '',
    visitor_id TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL
  )`,
  "CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at)",
  "CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at)",
  "CREATE INDEX IF NOT EXISTS idx_page_views_visitor ON page_views(visitor_id)",
];

try {
  for (const statement of statements) {
    await client.execute(statement);
  }

  const messages = await client.execute("SELECT COUNT(*) AS count FROM messages");
  const views = await client.execute("SELECT COUNT(*) AS count FROM page_views");
  const messageCount = Number(messages.rows[0]?.count ?? 0);
  const viewCount = Number(views.rows[0]?.count ?? 0);

  console.log("✓ Base initialisée");
  console.log(`  cible        : ${process.env.TURSO_DB_URL ? "Turso" : "SQLite locale"}`);
  console.log(`  messages     : ${messageCount}`);
  console.log(`  pages vues   : ${viewCount}`);
  console.log("  tables       : messages, page_views");
} catch (error) {
  console.error("✗ Initialisation impossible :", error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  client.close();
}
