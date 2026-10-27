import { createHmac, timingSafeEqual } from "node:crypto";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export const SESSION_COOKIE = "zm_admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 8;

export function checkRateLimit(
  ip: string,
  maxAttempts = 5,
  windowMs = 60000,
): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= maxAttempts) {
    return false;
  }

  entry.count++;
  return true;
}

export function isWeakPassword(pw: string): boolean {
  return (
    pw.length < 12 ||
    !/[a-z]/.test(pw) ||
    !/[A-Z]/.test(pw) ||
    !/\d/.test(pw) ||
    !/[^A-Za-z0-9]/.test(pw) ||
    /^(1234|password|admin|12345)/i.test(pw)
  );
}

if (typeof process !== "undefined" && process.env?.ADMIN_PASSWORD) {
  const pw = process.env.ADMIN_PASSWORD;
  if (isWeakPassword(pw)) {
    console.warn(
      "⚠️  ADMIN_PASSWORD est faible. Utilisez au moins 12 caractères avec majuscules, minuscules, chiffres et symboles.",
    );
  }
}

export function verifyPassword(authHeader: string | null): boolean {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }

  const token = authHeader.slice(7);
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    console.error("ADMIN_PASSWORD not set in environment");
    return false;
  }

  if (token.length !== password.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ password.charCodeAt(i);
  }
  return result === 0;
}

function sign(payload: string): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return "";
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createSessionToken(now = Date.now()): string {
  const expiresAt = now + SESSION_MAX_AGE * 1000;
  const payload = String(expiresAt);
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | null | undefined): boolean {
  if (!token) return false;

  const [expiresRaw, signature] = token.split(".");
  if (!expiresRaw || !signature) return false;

  const expiresAt = Number(expiresRaw);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;

  const expected = sign(expiresRaw);
  if (!expected) return false;

  const provided = Buffer.from(signature);
  const wanted = Buffer.from(expected);

  return (
    provided.length === wanted.length && timingSafeEqual(provided, wanted)
  );
}

export function getCookieValue(
  cookieHeader: string | null,
  name: string,
): string | null {
  if (!cookieHeader) return null;

  for (const part of cookieHeader.split(";")) {
    const separator = part.indexOf("=");
    if (separator === -1) continue;
    const key = part.slice(0, separator).trim();
    if (key === name) {
      return decodeURIComponent(part.slice(separator + 1).trim());
    }
  }

  return null;
}

/** Accepte soit le cookie de session, soit l'ancien en-tête Bearer. */
export function isAuthorized(request: Request): boolean {
  if (verifyPassword(request.headers.get("authorization"))) {
    return true;
  }

  const token = getCookieValue(
    request.headers.get("cookie"),
    SESSION_COOKIE,
  );
  return verifySessionToken(token);
}
