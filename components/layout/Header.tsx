"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

interface NavItem { id: string; label: string; href: string; }
interface SiteData { brandName: string; slogan: string; logo: string; }
interface Props { nav?: NavItem[]; site?: SiteData; }

const DEFAULT_NAV: NavItem[] = [
  { id: "1", label: "TRANG CHỦ", href: "/trang-chu" },
  { id: "2", label: "GIỚI THIỆU", href: "/gioi-thieu" },
  { id: "3", label: "HỆ SINH THÁI", href: "/he-sinh-thai" },
  { id: "4", label: "DỰ ÁN", href: "/du-an" },
  { id: "5", label: "CHÍNH SÁCH ĐẦU TƯ", href: "/chinh-sach-dau-tu" },
  { id: "6", label: "CHÍNH SÁCH HỢP TÁC", href: "/chinh-sach-hop-tac" },
  { id: "7", label: "TIN TỨC", href: "/tin-tuc" },
  { id: "8", label: "LIÊN HỆ", href: "/lien-he" },
];

export default function Header({ nav, site }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const items = nav && nav.length > 0 ? nav : DEFAULT_NAV;
  const brand = site?.brandName || "APEC GLOBAL";
  const slogan = site?.slogan || "CREATING VALUE";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(6,17,38,0.98)" : "rgba(6,17,38,0.85)",
      backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      transition: "background 0.3s",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", height: 56 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0, marginRight: 32 }}>
          {site?.logo ? (
            <img src={site.logo} alt={brand} style={{ height: 32, objectFit: "contain", flexShrink: 0 }} />
          ) : (
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#1d4ed8,#2563eb)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: "#fff", fontWeight: 900, fontSize: 11, fontFamily: "Montserrat,sans-serif" }}>AG</span>
            </div>
          )}
          <div style={{ lineHeight: 1 }}>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 13.5, fontFamily: "Montserrat,sans-serif", letterSpacing: "0.04em" }}>{brand}</div>
            <div style={{ color: "#93c5fd", fontSize: 7.5, fontWeight: 600, letterSpacing: "0.18em", marginTop: 2 }}>{slogan}</div>
          </div>
        </Link>
        <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 0, flex: 1 }}>
          {items.map((n) => {
            const active = pathname === n.href;
            return (
              <Link key={n.href} href={n.href} style={{
                padding: "6px 11px", fontSize: 11, fontWeight: 600, letterSpacing: "0.03em",
                color: active ? "#93c5fd" : "rgba(255,255,255,0.78)",
                textDecoration: "none", whiteSpace: "nowrap", transition: "color 0.2s",
                fontFamily: "Inter,sans-serif",
              }}>{n.label}</Link>
            );
          })}
        </nav>
        <Link href="/lien-he" className="desktop-cta" style={{
          padding: "7px 18px", borderRadius: 6, fontSize: 11, fontWeight: 700,
          color: "#fff", background: "linear-gradient(135deg,#1d4ed8,#2563eb)",
          textDecoration: "none", flexShrink: 0, whiteSpace: "nowrap",
          letterSpacing: "0.04em", fontFamily: "Inter,sans-serif",
        }}>ĐĂNG KÝ HỢP TÁC</Link>
        <button className="mobile-menu-btn" onClick={() => setOpen(!open)} aria-label="Menu"
          style={{ display: "none", background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 4 }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div style={{ background: "rgba(6,17,38,0.99)", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "12px 28px 20px" }}>
          {items.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} style={{
              display: "block", padding: "10px 0", fontSize: 14, fontWeight: 500,
              color: pathname === n.href ? "#93c5fd" : "rgba(255,255,255,0.8)",
              textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.04)",
            }}>{n.label}</Link>
          ))}
        </div>
      )}
      <style>{`@media(max-width:960px){.desktop-nav{display:none!important}.desktop-cta{display:none!important}.mobile-menu-btn{display:block!important}}`}</style>
    </header>
  );
}
