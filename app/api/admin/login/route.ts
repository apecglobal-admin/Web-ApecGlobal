import { NextRequest, NextResponse } from "next/server";
import { readJSON } from "@/lib/db";
import { verifyPassword, createToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: "Vui lòng nhập đầy đủ thông tin" }, { status: 400 });
    }
    const users = readJSON<any[]>("users.json");
    const user = users.find((u: any) => u.username === username);
    if (!user || !verifyPassword(password, user.password)) {
      return NextResponse.json({ error: "Sai tên đăng nhập hoặc mật khẩu" }, { status: 401 });
    }
    const token = createToken({ userId: user.id, username: user.username, role: user.role });
    const res = NextResponse.json({ success: true, user: { id: user.id, username: user.username, role: user.role, name: user.name } });
    res.cookies.set("admin_token", token, { httpOnly: true, path: "/", maxAge: 86400, sameSite: "lax" });
    return res;
  } catch {
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
