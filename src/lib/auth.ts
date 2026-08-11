const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  ip: string,
  maxAttempts = 5,
  windowMs = 60000
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
  return pw.length < 8 || /^(1234|password|admin|12345)/i.test(pw);
}

if (typeof process !== "undefined" && process.env?.ADMIN_PASSWORD) {
  const pw = process.env.ADMIN_PASSWORD;
  if (isWeakPassword(pw)) {
    console.warn(
      "⚠️  ADMIN_PASSWORD est faible. Utilisez au moins 8 caractères avec lettres, chiffres et symboles."
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
