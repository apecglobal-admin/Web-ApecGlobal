import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Read site.json to get the logo path
    const siteFile = path.join(process.cwd(), "data", "site.json");
    if (!fs.existsSync(siteFile)) {
      return new NextResponse(null, { status: 404 });
    }

    const site = JSON.parse(fs.readFileSync(siteFile, "utf-8"));
    const logoPath = site.logo;

    if (!logoPath) {
      return new NextResponse(null, { status: 404 });
    }

    // Resolve the logo file from public directory
    const fullPath = path.join(process.cwd(), "public", logoPath);
    if (!fs.existsSync(fullPath)) {
      return new NextResponse(null, { status: 404 });
    }

    const buffer = fs.readFileSync(fullPath);
    const ext = path.extname(fullPath).toLowerCase();

    const mimeMap: Record<string, string> = {
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".svg": "image/svg+xml",
      ".ico": "image/x-icon",
      ".webp": "image/webp",
      ".gif": "image/gif",
    };

    const contentType = mimeMap[ext] || "image/png";

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=300, s-maxage=300",
      },
    });
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
