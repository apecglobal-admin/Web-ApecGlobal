"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Newspaper, FolderOpen, Handshake, Image as ImgIcon, Settings, FileText, Layers } from "lucide-react";

const CARDS = [
  { label: "Tin tức", key: "news", icon: Newspaper, href: "/admin/news", color: "#2563eb" },
  { label: "Dự án", key: "projects", icon: FolderOpen, href: "/admin/projects", color: "#16a34a" },
  { label: "Đối tác", key: "partners", icon: Handshake, href: "/admin/partners", color: "#ea580c" },
  { label: "Hệ sinh thái", key: "ecosystem", icon: Layers, href: "/admin/ecosystem", color: "#9333ea" },
];

const QUICK = [
  { label: "Cấu hình chung", href: "/admin/site", icon: Settings },
  { label: "Hero Banner", href: "/admin/hero", icon: ImgIcon },
  { label: "CS Đầu tư", href: "/admin/investment-policy", icon: FileText },
  { label: "CS Hợp tác", href: "/admin/cooperation-policy", icon: Handshake },
];

export default function DashboardPage() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    ["news", "projects", "partners", "ecosystem"].forEach(async (key) => {
      try {
        const res = await fetch(`/api/admin/${key}`);
        const data = await res.json();
        setCounts(p => ({ ...p, [key]: Array.isArray(data) ? data.length : 0 }));
      } catch { /* ignore */ }
    });
  }, []);

  return (
    <div>
      <h1 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 22, color: "#0f172a", marginBottom: 6 }}>Dashboard</h1>
      <p style={{ color: "#64748b", fontSize: 14, marginBottom: 28 }}>Tổng quan quản trị nội dung website APEC Global</p>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
        {CARDS.map(c => (
          <Link key={c.key} href={c.href} style={{ textDecoration: "none", padding: "22px 20px", background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", transition: "box-shadow 0.2s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: `${c.color}10`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <c.icon size={20} style={{ color: c.color }} />
              </div>
            </div>
            <div style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: 28, color: "#0f172a" }}>{counts[c.key] ?? "..."}</div>
            <div style={{ color: "#64748b", fontSize: 13, fontWeight: 500 }}>{c.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick access */}
      <h3 style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", marginBottom: 14 }}>Truy cập nhanh</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        {QUICK.map(q => (
          <Link key={q.href} href={q.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", textDecoration: "none", color: "#334155", fontSize: 13, fontWeight: 500, transition: "border-color 0.2s" }}>
            <q.icon size={16} style={{ color: "#2563eb" }} /> {q.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
