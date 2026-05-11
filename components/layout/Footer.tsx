"use client";
import type { MouseEvent } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Youtube, Linkedin, ArrowRight } from "lucide-react";

interface FooterCol { title: string; links: { label: string; href: string; }[] }
interface FooterData { columns?: FooterCol[]; copyright?: string; }
interface SiteData { brandName: string; phone: string; email: string; address: string; logo?: string; social?: { facebook?: string; youtube?: string; linkedin?: string; } }
interface Props { data?: FooterData; site?: SiteData; }

const DEFAULT_COLS = [
  { title: "Về APEC Global", links: [{ label: "Giới thiệu", href: "/gioi-thieu" }, { label: "Tầm nhìn & Sứ mệnh", href: "/gioi-thieu" }, { label: "Ban lãnh đạo", href: "/gioi-thieu" }, { label: "Tuyển dụng", href: "/tuyen-dung" }] },
  { title: "Hệ sinh thái", links: [{ label: "Bất động sản", href: "/he-sinh-thai" }, { label: "Năng lượng", href: "/he-sinh-thai" }, { label: "Sản xuất", href: "/he-sinh-thai" }, { label: "Công nghệ", href: "/he-sinh-thai" }] },
  { title: "Hỗ trợ", links: [{ label: "Liên hệ", href: "/lien-he" }, { label: "Chính sách bảo mật", href: "/chinh-sach" }, { label: "Điều khoản sử dụng", href: "/chinh-sach" }] },
];

export default function Footer({ data, site }: Props) {
  const brand = site?.brandName || "APEC GLOBAL";
  const contact = { phone: site?.phone || "1800 1234", email: site?.email || "info@apecglobal.vn", address: site?.address || "Tầng 15, Apec Tower, 39 Láng Hạ, Hà Nội" };
  const social = site?.social || { facebook: "#", youtube: "#", linkedin: "#" };
  const cols = data?.columns && data.columns.length > 0 ? data.columns : DEFAULT_COLS;
  const copyright = data?.copyright || `© ${new Date().getFullYear()} APEC Global. Tất cả quyền được bảo lưu.`;

  return (
    <footer className="section-padding-sm" style={{ background: "#040c1c", color: "#fff" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>
        <div className="ft-grid" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 40, marginBottom: 60 }}>
          
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 24 }}>
              {site?.logo ? (
                <img src={site.logo} alt={brand} style={{ height: 36, objectFit: "contain", flexShrink: 0 }} />
              ) : (
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#1d4ed8,#2563eb)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: "#fff", fontWeight: 900, fontSize: 13, fontFamily: "Montserrat,sans-serif" }}>AG</span>
                </div>
              )}
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 18, fontFamily: "Montserrat,sans-serif", letterSpacing: "0.04em" }}>{brand}</div>
            </Link>
            <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>Đầu tư và phát triển hệ sinh thái đa ngành, kiến tạo giá trị bền vững cho xã hội và cộng đồng.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#cbd5e1", fontSize: 13 }}><MapPin size={16} style={{ color: "#38bdf8" }} /> {contact.address}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#cbd5e1", fontSize: 13 }}><Phone size={16} style={{ color: "#38bdf8" }} /> {contact.phone}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#cbd5e1", fontSize: 13 }}><Mail size={16} style={{ color: "#38bdf8" }} /> {contact.email}</div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <a href={social.facebook} style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", transition: "background 0.2s" }} onMouseOver={e => e.currentTarget.style.background = "#2563eb"} onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}><Facebook size={16} /></a>
              <a href={social.youtube} style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", transition: "background 0.2s" }} onMouseOver={e => e.currentTarget.style.background = "#dc2626"} onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}><Youtube size={16} /></a>
              <a href={social.linkedin} style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", transition: "background 0.2s" }} onMouseOver={e => e.currentTarget.style.background = "#0284c7"} onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}><Linkedin size={16} /></a>
            </div>
          </div>

          {cols.map((col, i) => (
            <div key={i}>
              <h4 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 24 }}>{col.title}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link href={link.href} style={{ color: "#94a3b8", textDecoration: "none", fontSize: 14, transition: "color 0.2s", display: "flex", alignItems: "center", gap: 6 }} onMouseOver={(e: MouseEvent<HTMLAnchorElement>) => {
                      const target = e.currentTarget;
                      const icon = target.children[0] as HTMLElement | undefined;
                      target.style.color = "#38bdf8";
                      if (icon) {
                        icon.style.opacity = "1";
                        icon.style.transform = "translateX(0)";
                      }
                    }} onMouseOut={(e: MouseEvent<HTMLAnchorElement>) => {
                      const target = e.currentTarget;
                      const icon = target.children[0] as HTMLElement | undefined;
                      target.style.color = "#94a3b8";
                      if (icon) {
                        icon.style.opacity = "0";
                        icon.style.transform = "translateX(-5px)";
                      }
                    }}>
                      <ArrowRight size={12} style={{ opacity: 0, transform: "translateX(-5px)", transition: "all 0.2s" }} /> {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div style={{ padding: "24px 0", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div style={{ color: "#64748b", fontSize: 13 }}>{copyright}</div>
          <div style={{ display: "flex", gap: 20, fontSize: 13 }}>
            <Link href="#" style={{ color: "#64748b", textDecoration: "none" }}>Privacy Policy</Link>
            <Link href="#" style={{ color: "#64748b", textDecoration: "none" }}>Terms of Service</Link>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:960px){.ft-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:640px){.ft-grid{grid-template-columns:1fr!important}}`}</style>
    </footer>
  );
}
