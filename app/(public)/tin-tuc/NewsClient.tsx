"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import PageBanner from "@/components/shared/PageBanner";
import { useInView } from "@/lib/hooks";

const CATS = ["Tất cả", "Sự kiện", "Công nghệ", "Đầu tư", "Phát triển bền vững"];
const CAT_COLORS: Record<string, string> = { "Sự kiện": "#2563eb", "Công nghệ": "#16a34a", "Đầu tư": "#ea580c", "Phát triển bền vững": "#9333ea" };

function Section({ children, bg = "#fff" }: { children: React.ReactNode; bg?: string }) {
  const { ref, isInView } = useInView(0.05);
  return (
    <section ref={ref} style={{ background: bg, padding: "56px 0" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
        style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>{children}</motion.div>
    </section>
  );
}

export default function NewsClient({ articles = [], banner = {} as any }: { articles: any[]; banner?: any }) {
  const [cat, setCat] = useState("Tất cả");

  // Get featured articles sorted by order (1, 2, 3)
  const featured = articles
    .filter(a => !!a.isFeatured)
    .sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99))
    .slice(0, 3);

  const featuredIds = featured.map(f => f.id);
  
  // Filter remaining articles
  const remaining = articles.filter(a => !featuredIds.includes(a.id));
  const filtered = cat === "Tất cả" ? remaining : remaining.filter(a => a.cat === cat);

  return (
    <>
      <PageBanner 
        label={banner.bannerLabel || "News & Events"} 
        title={banner.bannerTitle || "Tin Tức & Hoạt Động"} 
        desc={<div style={{ whiteSpace: "pre-wrap" }}>{banner.bannerDesc || "Cập nhật thông tin mới nhất về các hoạt động, sự kiện và đầu tư của APEC Global"}</div>} 
      />

      <Section>
        {/* Featured Section (1 Large + 2 Small) */}
        {featured.length > 0 && (
          <div className="featured-layout" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24, marginBottom: 48 }}>
            {/* Left: Main Featured (Order 1) */}
            <Link href={`/tin-tuc/${featured[0].slug || featured[0].id}`} style={{ textDecoration: "none", display: "block" }}>
              <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "16/10", background: "#0f172a", height: "100%" }}>
                {featured[0].img && <Image src={featured[0].img} alt={featured[0].title} fill style={{ objectFit: "cover", opacity: 0.8 }} />}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg,rgba(0,0,0,0.9) 0%,transparent 70%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "32px" }}>
                  <span style={{ display: "inline-block", fontSize: 10, fontWeight: 700, padding: "4px 12px", borderRadius: 8, background: "#2563eb", color: "#fff", marginBottom: 12, width: "fit-content", letterSpacing: "0.05em" }}>BÀI VIẾT NỔI BẬT</span>
                  <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", lineHeight: 1.25, marginBottom: 12 }}>{featured[0].title}</h2>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{featured[0].excerpt}</p>
                </div>
              </div>
            </Link>

            {/* Right: Small Featured (Order 2, 3) */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {featured.slice(1, 3).map((a: any, i: number) => {
                const cc = CAT_COLORS[a.cat] || "#2563eb";
                return (
                  <Link key={a.id || i} href={`/tin-tuc/${a.slug || a.id}`} style={{ display: "flex", gap: 16, padding: 16, borderRadius: 16, border: "1.5px solid #e2e8f0", background: "#fff", transition: "all 0.3s", flex: 1, textDecoration: "none", color: "inherit" }} onMouseOver={e => { e.currentTarget.style.borderColor = cc; e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.05)"; }} onMouseOut={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "none"; }}>
                    <div style={{ flexShrink: 0, width: "120px", borderRadius: 12, overflow: "hidden", position: "relative", background: "#0f172a", aspectRatio: "4/3" }}>
                      {a.img && <Image src={a.img} alt={a.title} fill style={{ objectFit: "cover" }} />}
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                        <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 6, background: `${cc}15`, color: cc, textTransform: "uppercase" }}>{a.cat}</span>
                        <span style={{ fontSize: 10, color: "#94a3b8", display: "flex", alignItems: "center", gap: 4 }}><Calendar size={12} />{a.date}</span>
                      </div>
                      <h3 style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.4, color: "#0f172a", margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{a.title}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
        <style>{`@media(max-width:960px){.featured-layout{grid-template-columns:1fr!important}}`}</style>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap", justifyContent: "center" }}>
          {CATS.map((c: string) => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: "8px 20px", borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "2px solid", transition: "all 0.2s",
              background: cat === c ? "#2563eb" : "#fff", color: cat === c ? "#fff" : "#64748b", borderColor: cat === c ? "#2563eb" : "#f1f5f9",
            }}>{c}</button>
          ))}
        </div>

        {/* Articles grid */}
        <div className="news-articles-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {filtered.map((a: any, i: number) => {
            const cc = CAT_COLORS[a.cat] || "#2563eb";
            return (
              <motion.article key={a.id || i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} style={{ height: "100%" }}>
                <Link href={`/tin-tuc/${a.slug || a.id}`} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #e2e8f0", cursor: "pointer", transition: "all 0.3s", textDecoration: "none", color: "inherit", display: "block", height: "100%" }} onMouseOver={e => { e.currentTarget.style.borderColor = cc; e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.06)"; }} onMouseOut={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ position: "relative", height: 180, background: "#0f172a" }}>
                    {a.img && <Image src={a.img} alt={a.title} fill style={{ objectFit: "cover", opacity: 0.9 }} />}
                    <div style={{ position: "absolute", top: 12, left: 12 }}>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "4px 10px", borderRadius: 8, background: `${cc}`, color: "#fff", textTransform: "uppercase", letterSpacing: "0.04em" }}>{a.cat}</span>
                    </div>
                  </div>
                  <div style={{ padding: "20px" }}>
                    <div style={{ display: "flex", gap: 14, marginBottom: 12, fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Calendar size={12} />{a.date}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={12} />{a.readTime}</span>
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.45, color: "#0f172a", marginBottom: 10, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{a.title}</h3>
                    <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6, margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", whiteSpace: "pre-wrap" }}>{a.excerpt}</p>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
        <style>{`@media(max-width:960px){.news-articles-grid{grid-template-columns:repeat(2,1fr)!important}} @media(max-width:640px){.news-articles-grid{grid-template-columns:1fr!important}}`}</style>
      </Section>
    </>
  );
}
