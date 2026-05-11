import { cookies } from "next/headers";
import crypto from "crypto";

const SECRET = process.env.AUTH_SECRET || "apec-global-secret-key-2024";

// Simple password hashing
export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + SECRET).digest("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// Token creation & verification
interface TokenPayload {
  userId: string;
  username: string;
  role: "admin" | "editor";
  exp: number;
}

export function createToken(payload: Omit<TokenPayload, "exp">): string {
  const data: TokenPayload = { ...payload, exp: Date.now() + 24 * 60 * 60 * 1000 }; // 24h
  const json = JSON.stringify(data);
  const encoded = Buffer.from(json).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(encoded).digest("base64url");
  return `${encoded}.${sig}`;
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const [encoded, sig] = token.split(".");
    const expectedSig = crypto.createHmac("sha256", SECRET).update(encoded).digest("base64url");
    if (sig !== expectedSig) return null;
    const payload: TokenPayload = JSON.parse(Buffer.from(encoded, "base64url").toString());
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

// Get current user from cookies
export async function getCurrentUser(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

// Check if user has required role
export function hasRole(user: TokenPayload | null, requiredRole: "admin" | "editor"): boolean {
  if (!user) return false;
  if (user.role === "admin") return true;
  return user.role === requiredRole;
}
