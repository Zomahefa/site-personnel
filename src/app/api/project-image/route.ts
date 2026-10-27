import { NextRequest } from "next/server";

const gradients = [
  ["#6366f1", "#8b5cf6"],
  ["#06b6d4", "#3b82f6"],
  ["#ec4899", "#8b5cf6"],
  ["#f59e0b", "#ef4444"],
  ["#10b981", "#06b6d4"],
  ["#8b5cf6", "#ec4899"],
  ["#3b82f6", "#6366f1"],
  ["#14b8a6", "#10b981"],
  ["#e11d48", "#f97316"],
  ["#7c3aed", "#2563eb"],
];

const categories = [
  "FULLSTACK",
  "DEVOPS",
  "MOBILE",
  "ADMIN",
  "CLOUD",
  "WEB",
  "API",
  "UI",
  "DB",
  "SECURITY",
];

function hashToIndex(s: string, max: number) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h) % max;
}

export async function GET(request: NextRequest) {
  const title =
    request.nextUrl.searchParams.get("title") || "Projet";
  const category =
    request.nextUrl.searchParams.get("category") || "fullstack";
  const gi = hashToIndex(title, gradients.length);
  const [c1, c2] = gradients[gi];
  const catLabel = category.toUpperCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${c1};stop-opacity:0.15" />
      <stop offset="100%" style="stop-color:${c2};stop-opacity:0.15" />
    </linearGradient>
    <linearGradient id="bar" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${c1}" />
      <stop offset="100%" style="stop-color:${c2}" />
    </linearGradient>
    <clipPath id="rounded">
      <rect width="800" height="500" rx="16" />
    </clipPath>
  </defs>

  <!-- Card background -->
  <rect width="800" height="500" rx="16" fill="#1a1a2e" />

  <!-- Gradient accent bar -->
  <rect x="0" y="0" width="800" height="6" fill="url(#bar)" />

  <!-- Mock browser UI -->
  <rect x="24" y="24" width="48" height="12" rx="6" fill="${c1}40" />
  <rect x="84" y="24" width="48" height="12" rx="6" fill="${c2}40" />
  <rect x="144" y="24" width="160" height="12" rx="6" fill="#ffffff10" />
  <circle cx="756" cy="30" r="6" fill="#ffffff15" />
  <circle cx="740" cy="30" r="6" fill="#ffffff15" />

  <!-- Mock content blocks -->
  <rect x="40" y="60" width="200" height="160" rx="12" fill="url(#bg)" stroke="#ffffff08" stroke-width="1" />
  <rect x="60" y="80" width="120" height="16" rx="4" fill="#ffffff20" />
  <rect x="60" y="104" width="160" height="8" rx="4" fill="#ffffff10" />
  <rect x="60" y="120" width="140" height="8" rx="4" fill="#ffffff10" />
  <rect x="60" y="144" width="80" height="24" rx="6" fill="${c1}30" />

  <rect x="260" y="60" width="200" height="160" rx="12" fill="url(#bg)" stroke="#ffffff08" stroke-width="1" />
  <rect x="280" y="80" width="100" height="16" rx="4" fill="#ffffff20" />
  <rect x="280" y="104" width="160" height="8" rx="4" fill="#ffffff10" />
  <rect x="280" y="120" width="130" height="8" rx="4" fill="#ffffff10" />
  <rect x="280" y="144" width="80" height="24" rx="6" fill="${c2}30" />

  <rect x="480" y="60" width="280" height="160" rx="12" fill="url(#bg)" stroke="#ffffff08" stroke-width="1" />
  <rect x="500" y="80" width="140" height="16" rx="4" fill="#ffffff20" />
  <rect x="500" y="104" width="240" height="8" rx="4" fill="#ffffff10" />
  <rect x="500" y="120" width="200" height="8" rx="4" fill="#ffffff10" />
  <rect x="500" y="144" width="100" height="24" rx="6" fill="#6366f130" />

  <!-- Bottom chart mockup -->
  <rect x="40" y="240" width="720" height="140" rx="12" fill="url(#bg)" stroke="#ffffff08" stroke-width="1" />
  <rect x="60" y="260" width="100" height="12" rx="4" fill="#ffffff20" />
  <rect x="60" y="286" width="680" height="4" rx="2" fill="#ffffff08" />
  <rect x="60" y="300" width="40" height="60" rx="4" fill="${c1}25" />
  <rect x="110" y="320" width="40" height="40" rx="4" fill="${c2}25" />
  <rect x="160" y="290" width="40" height="70" rx="4" fill="${c1}25" />
  <rect x="210" y="310" width="40" height="50" rx="4" fill="${c2}25" />
  <rect x="260" y="280" width="40" height="80" rx="4" fill="${c1}25" />
  <rect x="310" y="330" width="40" height="30" rx="4" fill="${c2}25" />
  <rect x="360" y="270" width="40" height="90" rx="4" fill="${c1}25" />
  <rect x="410" y="300" width="40" height="60" rx="4" fill="${c2}25" />
  <rect x="460" y="260" width="40" height="100" rx="4" fill="${c1}25" />
  <rect x="510" y="285" width="40" height="75" rx="4" fill="${c2}25" />
  <rect x="560" y="310" width="40" height="50" rx="4" fill="${c1}25" />
  <rect x="610" y="275" width="40" height="85" rx="4" fill="${c2}25" />
  <rect x="660" y="295" width="40" height="65" rx="4" fill="${c1}25" />
  <rect x="710" y="320" width="40" height="40" rx="4" fill="${c2}25" />

  <!-- Category badge -->
  <rect x="40" y="400" width="90" height="24" rx="12" fill="${c1}30" />
  <text x="85" y="416" font-family="system-ui, sans-serif" font-size="10" font-weight="600" fill="${c1}" text-anchor="middle" dominant-baseline="middle">${catLabel}</text>

  <!-- Project title -->
  <text x="140" y="416" font-family="system-ui, sans-serif" font-size="18" font-weight="700" fill="#ffffff" text-anchor="start" dominant-baseline="middle">${escapeXml(title)}</text>

  <!-- Footer bar -->
  <rect x="40" y="450" width="12" height="12" rx="3" fill="${c1}40" />
  <rect x="60" y="450" width="60" height="12" rx="6" fill="#ffffff10" />
  <rect x="700" y="450" width="60" height="12" rx="6" fill="#ffffff10" />
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
