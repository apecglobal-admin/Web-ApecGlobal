import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif"];
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: "Chỉ hỗ trợ JPG, PNG, WEBP, SVG, GIF" }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File tối đa 5MB" }, { status: 400 });
    }

    if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

    const ext = file.name.split(".").pop() || "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(path.join(UPLOAD_DIR, filename), buffer);

    return NextResponse.json({ success: true, url: `/uploads/${filename}`, filename });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

// List uploaded files
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!fs.existsSync(UPLOAD_DIR)) return NextResponse.json([]);

  const files = fs.readdirSync(UPLOAD_DIR)
    .filter(f => /\.(jpg|jpeg|png|webp|svg|gif)$/i.test(f))
    .map(f => ({
      name: f,
      url: `/uploads/${f}`,
      size: fs.statSync(path.join(UPLOAD_DIR, f)).size,
      modified: fs.statSync(path.join(UPLOAD_DIR, f)).mtime.toISOString(),
    }))
    .sort((a, b) => b.modified.localeCompare(a.modified));

  return NextResponse.json(files);
}
