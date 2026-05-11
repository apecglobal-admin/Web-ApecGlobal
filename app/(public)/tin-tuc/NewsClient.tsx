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

export default function NewsClient({ articles = [] }: { articles: any[] }) {
  const [cat, setCat] = useState("Tất cả");
  const filtered = cat === "Tất cả" ? articles : articles.filter(a => a.cat === cat);
  const featured = articles.length > 0 ? articles[0] : null;

  return (
    <>
      <PageBanner label="News & Events" title="Tin Tức & Hoạt Động" desc="Cập nhật thông tin mới nhất về các hoạt động, sự kiện và đầu tư của APEC Global" />

      <Section>
        {/* Featured */}
        {featured && (
          <div className="featured-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 28, marginBottom: 40 }}>
            <Link href={`/tin-tuc/${featured.id}`} style={{ textDecoration: "none", display: "block" }}>
              <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "16/10", background: "#0f172a" }}>
                {featured.img && <Image src={featured.img} alt={featured.title} fill style={{ objectFit: "cover", opacity: 0.8 }} />}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg,rgba(0,0,0,0.8) 0%,transparent 60%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 24 }}>
                  <span style={{ display: "inline-block", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 6, background: "rgba(37,99,235,0.9)", color: "#fff", marginBottom: 10, width: "fit-content" }}>BÀI VIẾT NỔI BẬT</span>
                  <h2 style={{ color: "#fff", fontWeight: 800, fontSize: 20, lineHeight: 1.3, marginBottom: 8 }}>{featured.title}</h2>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.6 }}>{featured.excerpt}</p>
                </div>
              </div>
            </Link>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {articles.slice(1, 4).map((a, i) => {
                const cc = CAT_COLORS[a.cat] || "#2563eb";
                return (
                  <Link key={a.id || i} href={`/tin-tuc/${a.id}`} style={{ display: "flex", gap: 14, padding: 12, borderRadius: 10, border: "1px solid #e2e8f0", cursor: "pointer", transition: "border-color 0.2s", flex: 1, textDecoration: "none", color: "inherit" }} onMouseOver={e => e.currentTarget.style.borderColor = cc} onMouseOut={e => e.currentTarget.style.borderColor = "#e2e8f0"}>
                    <div style={{ flexShrink: 0, width: 100, borderRadius: 8, overflow: "hidden", position: "relative", background: "#0f172a" }}>
                      {a.img && <Image src={a.img} alt={a.title} fill style={{ objectFit: "cover" }} />}
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: `${cc}14`, color: cc, textTransform: "uppercase" }}>{a.cat}</span>
                        <span style={{ fontSize: 10, color: "#94a3b8", display: "flex", alignItems: "center", gap: 3 }}><Calendar size={10} />{a.date}</span>
                      </div>
                      <h3 style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.4, color: "#0f172a", margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{a.title}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
        <style>{`@media(max-width:768px){.featured-grid{grid-template-columns:1fr!important}}`}</style>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: "7px 16px", borderRadius: 999, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1.5px solid", transition: "all 0.2s",
              background: cat === c ? "#2563eb" : "#fff", color: cat === c ? "#fff" : "#475569", borderColor: cat === c ? "#2563eb" : "#e2e8f0",
            }}>{c}</button>
          ))}
        </div>

        {/* Articles grid */}
        <div className="news-articles-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {filtered.map((a, i) => {
            const cc = CAT_COLORS[a.cat] || "#2563eb";
            return (
              <motion.article key={a.id || i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} style={{ height: "100%" }}>
                <Link href={`/tin-tuc/${a.id}`} style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #e2e8f0", cursor: "pointer", transition: "all 0.3s", textDecoration: "none", color: "inherit", display: "block", height: "100%" }} onMouseOver={e => { e.currentTarget.style.borderColor = cc; e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.05)"; }} onMouseOut={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ position: "relative", height: 170, background: "#0f172a" }}>
                    {a.img && <Image src={a.img} alt={a.title} fill style={{ objectFit: "cover", opacity: 0.85 }} />}
                    <div style={{ position: "absolute", top: 10, left: 10 }}>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 6, background: `${cc}dd`, color: "#fff", textTransform: "uppercase", letterSpacing: "0.04em" }}>{a.cat}</span>
                    </div>
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", gap: 12, marginBottom: 8, fontSize: 11, color: "#94a3b8" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Calendar size={11} />{a.date}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Clock size={11} />{a.readTime}</span>
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.4, color: "#0f172a", marginBottom: 6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{a.title}</h3>
                    <p style={{ color: "#64748b", fontSize: 12.5, lineHeight: 1.6, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{a.excerpt}</p>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
        <style>{`@media(max-width:768px){.news-articles-grid{grid-template-columns:1fr!important}}`}</style>
      </Section>
    </>
  );
}
