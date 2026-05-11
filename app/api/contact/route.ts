import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate
    const errors: string[] = [];
    if (!body.name?.trim()) errors.push("Họ tên không được để trống");
    if (!body.phone?.trim()) errors.push("Số điện thoại không được để trống");
    if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      errors.push("Email không hợp lệ");
    }

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // In production: save to database and send email notification
    const submission = {
      id: `sub_${Date.now()}`,
      name: body.name.trim(),
      email: body.email?.trim() || null,
      phone: body.phone.trim(),
      interest: body.interest || null,
      message: body.message?.trim() || null,
      createdAt: new Date().toISOString(),
      status: "NEW",
    };

    console.log("New contact submission:", submission);

    // TODO: Send email notification to admin
    // await sendEmail({ to: "admin@apecglobal.vn", ... })

    return NextResponse.json({
      success: true,
      message: "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ.",
      data: { id: submission.id },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Lỗi server, vui lòng thử lại sau" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  // Admin only - list all submissions
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // In production: fetch from database
  return NextResponse.json({
    success: true,
    data: [],
    meta: { total: 0 },
  });
}
