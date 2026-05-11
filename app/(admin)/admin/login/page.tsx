"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  const inp: React.CSSProperties = { width: "100%", padding: "12px 14px 12px 42px", borderRadius: 10, fontSize: 14, color: "#0f172a", background: "#f8fafc", border: "1.5px solid #e2e8f0", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#040c1c,#0c2450,#1d4ed8)", padding: 20 }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "linear-gradient(rgba(100,160,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(100,160,255,0.3) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
      <div style={{ position: "relative", width: "100%", maxWidth: 420, background: "#fff", borderRadius: 20, padding: "40px 32px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg,#1d4ed8,#2563eb)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
            <span style={{ color: "#fff", fontWeight: 900, fontSize: 18, fontFamily: "Montserrat,sans-serif" }}>AG</span>
          </div>
          <h1 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 20, color: "#0f172a", margin: "0 0 4px" }}>APEC GLOBAL</h1>
          <p style={{ color: "#64748b", fontSize: 13 }}>Đăng nhập trang quản trị</p>
        </div>

        {error && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 8, background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: 13, marginBottom: 16 }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 6 }}>Tên đăng nhập</label>
            <div style={{ position: "relative" }}>
              <User size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input type="text" required value={form.username} onChange={e => setForm(p => ({ ...p, username: e.target.value }))} placeholder="admin" style={inp} />
            </div>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 6 }}>Mật khẩu</label>
            <div style={{ position: "relative" }}>
              <Lock size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input type={showPw ? "text" : "password"} required value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="••••••••" style={inp} />
              <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 2 }}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} style={{ width: "100%", padding: 13, borderRadius: 10, fontSize: 14, fontWeight: 700, color: "#fff", background: "linear-gradient(135deg,#1d4ed8,#2563eb)", border: "none", cursor: "pointer", marginTop: 4, boxShadow: "0 4px 16px rgba(37,99,235,0.35)", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Đang đăng nhập..." : "ĐĂNG NHẬP"}
          </button>
        </form>

        <p style={{ textAlign: "center", color: "#94a3b8", fontSize: 11, marginTop: 20 }}>
          CHÀO MỪNG ĐẾN TRANG QUẢN TRỊ
        </p>
      </div>
    </div>
  );
}
