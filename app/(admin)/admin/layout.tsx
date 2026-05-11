"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, Settings, Image as ImgIcon, BarChart3, Info, Layers, Building2,
  FolderOpen, FileText, Newspaper, Users, Handshake, Menu as MenuIcon, Navigation,
  LogOut, ChevronRight, X, Footprints, Globe
} from "lucide-react";

interface User { userId: string; username: string; role: "admin" | "editor"; }
const UserCtx = createContext<User | null>(null);
export const useAdminUser = () => useContext(UserCtx);

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { divider: true, label: "NỘI DUNG" },
  { label: "Trang Intro", href: "/admin/intro", icon: Globe },
  { label: "Cấu hình chung", href: "/admin/site", icon: Settings, adminOnly: true },
  { label: "Hero Banner", href: "/admin/hero", icon: ImgIcon },
  { label: "Thống kê", href: "/admin/stats", icon: BarChart3 },
  { label: "Giới thiệu", href: "/admin/about", icon: Info },
  { label: "Hệ sinh thái", href: "/admin/ecosystem", icon: Layers },
  { label: "Lĩnh vực đầu tư", href: "/admin/investment", icon: Building2 },
  { label: "Dự án", href: "/admin/projects", icon: FolderOpen },
  { label: "Chính sách", href: "/admin/policies", icon: FileText },
  { label: "Tin tức", href: "/admin/news", icon: Newspaper },
  { label: "Đối tác", href: "/admin/partners", icon: Handshake },
  { divider: true, label: "CẤU TRÚC" },
  { label: "Menu điều hướng", href: "/admin/nav", icon: Navigation },
  { label: "Footer", href: "/admin/footer", icon: Footprints },
  { label: "Thư viện ảnh", href: "/admin/media", icon: ImgIcon },
  { divider: true, label: "HỆ THỐNG" },
  { label: "Người dùng", href: "/admin/users", icon: Users, adminOnly: true },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    if (isLogin) { setLoading(false); return; }
    fetch("/api/admin/me").then(r => r.json()).then(d => {
      if (d.user) setUser(d.user);
      else router.push("/admin/login");
    }).catch(() => router.push("/admin/login")).finally(() => setLoading(false));
  }, [router, isLogin]);

  // Skip layout for login page
  if (isLogin) return <>{children}</>;

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f5f9" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 40, height: 40, border: "3px solid #e2e8f0", borderTopColor: "#2563eb", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
        <p style={{ color: "#64748b", fontSize: 14 }}>Đang tải...</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );

  const side: React.CSSProperties = {
    position: "fixed", top: 0, left: 0, bottom: 0, width: sidebarOpen ? 250 : 0,
    background: "#0f172a", transition: "width 0.3s", overflow: "hidden", zIndex: 50,
    display: "flex", flexDirection: "column",
  };

  return (
    <UserCtx.Provider value={user}>
      <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>
        {/* Sidebar */}
        <aside style={side}>
          <div style={{ padding: "16px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#1d4ed8,#2563eb)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: "#fff", fontWeight: 900, fontSize: 11, fontFamily: "Montserrat,sans-serif" }}>AG</span>
            </div>
            <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>APEC Admin</div>
              <div style={{ color: "#64748b", fontSize: 10 }}>Quản trị nội dung</div>
            </div>
          </div>

          <nav style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
            {NAV.map((item, i) => {
              if (item.divider) return (
                <div key={i} style={{ padding: "14px 18px 6px", fontSize: 10, fontWeight: 700, color: "#475569", letterSpacing: "0.1em" }}>{item.label}</div>
              );
              if (item.adminOnly && user?.role !== "admin") return null;
              const active = pathname === item.href;
              const Icon = item.icon!;
              return (
                <Link key={item.href} href={item.href!} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "9px 18px", margin: "1px 8px", borderRadius: 8,
                  fontSize: 13, fontWeight: 500, textDecoration: "none", transition: "all 0.15s",
                  background: active ? "rgba(37,99,235,0.15)" : "transparent",
                  color: active ? "#60a5fa" : "#94a3b8",
                }}>
                  <Icon size={16} />
                  <span style={{ overflow: "hidden", whiteSpace: "nowrap" }}>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div style={{ padding: "12px 18px", borderTop: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(37,99,235,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Users size={14} style={{ color: "#60a5fa" }} />
              </div>
              <div style={{ overflow: "hidden" }}>
                <div style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>{user?.username}</div>
                <div style={{ color: "#64748b", fontSize: 10, textTransform: "capitalize" }}>{user?.role}</div>
              </div>
            </div>
            <button onClick={logout} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
              <LogOut size={14} /> Đăng xuất
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div style={{ marginLeft: sidebarOpen ? 250 : 0, transition: "margin-left 0.3s", minHeight: "100vh" }}>
          {/* Top bar */}
          <header style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 24px", height: 52, display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 40 }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", padding: 4 }}>
              {sidebarOpen ? <X size={18} /> : <MenuIcon size={18} />}
            </button>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>
              {NAV.find(n => n.href === pathname)?.label || "Admin"}
            </div>
            <div style={{ marginLeft: "auto" }}>
              <Link href="/" target="_blank" style={{ fontSize: 12, color: "#2563eb", textDecoration: "none", fontWeight: 500 }}>Xem website →</Link>
            </div>
          </header>
          <main style={{ padding: 24 }}>{children}</main>
        </div>
      </div>
    </UserCtx.Provider>
  );
}
