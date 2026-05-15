import sharp from "sharp";
import path from "path";
import fs from "fs";

export async function GET() {
  const imagePath = path.join(process.cwd(), "public", "photo-cv.png");
  const size = 64;

  const circleSvg = Buffer.from(
    `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/>
    </svg>`
  );

  const buffer = await sharp(imagePath)
    .resize(size, size, { fit: "cover" })
    .composite([{ input: circleSvg, blend: "dest-in" }])
    .png()
    .toBuffer();

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
