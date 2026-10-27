import { NextResponse } from "next/server";
import { addPageView, getVisitStats } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";

const rateLimits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = rateLimits.get(ip);

  if (!current || now > current.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return false;
  }

  if (current.count >= 60) return true;
  current.count += 1;
  return false;
}

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function getDevice(userAgent: string) {
  if (/ipad|tablet/i.test(userAgent)) return "Tablet";
  if (/mobi|android|iphone/i.test(userAgent)) return "Mobile";
  return "Desktop";
}

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) return new NextResponse(null, { status: 204 });

    const userAgent = request.headers.get("user-agent") ?? "";
    if (/bot|crawler|spider|headless|lighthouse/i.test(userAgent)) {
      return new NextResponse(null, { status: 204 });
    }

    const body = await request.json();
    const path = clean(body.path, 200) || "/";
    if (!path.startsWith("/") || path.startsWith("/admin")) {
      return new NextResponse(null, { status: 204 });
    }

    const referrer = clean(body.referrer, 300);
    const visitorId = clean(body.visitorId, 80) || "anonymous";
    const country = (
      request.headers.get("x-vercel-ip-country") ??
      request.headers.get("cf-ipcountry") ??
      ""
    )
      .slice(0, 2)
      .toUpperCase();

    await addPageView(
      crypto.randomUUID(),
      path,
      referrer,
      country,
      getDevice(userAgent),
      visitorId,
    );

    return new NextResponse(null, {
      status: 204,
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return new NextResponse(null, { status: 204 });
  }
}

export async function GET(request: Request) {
  if (!verifyPassword(request.headers.get("authorization"))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const stats = await getVisitStats();
    return NextResponse.json(stats, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { error: "Statistiques indisponibles" },
      { status: 503 },
    );
  }
}
