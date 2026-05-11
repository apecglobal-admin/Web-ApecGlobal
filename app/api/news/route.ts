import { NextResponse } from "next/server";
import { news } from "@/data/mock";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const limit = parseInt(searchParams.get("limit") || "10");
  const page = parseInt(searchParams.get("page") || "1");

  let filtered = [...news];
  if (category && category !== "all") {
    filtered = filtered.filter((n) => n.category === category);
  }

  const total = filtered.length;
  const items = filtered.slice((page - 1) * limit, page * limit);

  return NextResponse.json({
    success: true,
    data: items,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export async function POST(request: Request) {
  // Check auth header
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "Thiếu trường bắt buộc: title, content" },
        { status: 400 }
      );
    }

    // In production: save to database with Prisma
    const newArticle = {
      id: Date.now(),
      ...body,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { success: true, data: newArticle, message: "Bài viết đã được tạo" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Lỗi server, vui lòng thử lại" },
      { status: 500 }
    );
  }
}
