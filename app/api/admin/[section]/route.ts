import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// Generic CRUD for any section JSON
export async function GET(req: NextRequest, { params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const data = readJSON(`${section}.json`);
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Editor cannot modify users or site config
  if (user.role === "editor" && ["users", "site"].includes(section)) {
    return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 403 });
  }

  try {
    const data = await req.json();
    writeJSON(`${section}.json`, data);
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const newItem = await req.json();
    const data = readJSON<any[]>(`${section}.json`);
    if (!Array.isArray(data)) return NextResponse.json({ error: "Section không hỗ trợ thêm mới" }, { status: 400 });

    newItem.id = String(Date.now());
    data.push(newItem);
    writeJSON(`${section}.json`, data);
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, item: newItem });
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await req.json();
    const data = readJSON<any[]>(`${section}.json`);
    if (!Array.isArray(data)) return NextResponse.json({ error: "Not supported" }, { status: 400 });

    const filtered = data.filter((item: any) => item.id !== id);
    writeJSON(`${section}.json`, filtered);
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Lỗi" }, { status: 400 });
  }
}
