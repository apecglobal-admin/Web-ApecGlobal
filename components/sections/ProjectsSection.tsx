"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useInView } from "@/lib/hooks";

interface ProjectItem { id: string; name: string; sector: string; status: string; loc: string; cap: string; year: string; img: string; desc: string; }
interface Props { data?: { bannerLabel?: string; bannerTitle?: string; items?: ProjectItem[] } | ProjectItem[] }

const DEFAULT_ITEMS: ProjectItem[] = [
  { id: "1", name: "APEC TOWER", sector: "Bất động sản", status: "Đang vận hành", loc: "Hà Nội", cap: "1.200 tỷ", year: "2021", img: "/images/area-realestate.jpg", desc: "Tòa nhà văn phòng hạng A 35 tầng tại trung tâm Hà Nội." },
  { id: "2", name: "APEC SOLAR FARM", sector: "Năng lượng", status: "Đang vận hành", loc: "Ninh Thuận", cap: "500 tỷ", year: "2022", img: "/images/area-energy.jpg", desc: "Nhà máy điện mặt trời công suất 50MW." },
  { id: "3", name: "APEC SMART FACTORY", sector: "Sản xuất", status: "Đang đầu tư", loc: "Bắc Ninh", cap: "800 tỷ", year: "2023", img: "/images/area-manufacturing.jpg", desc: "Nhà máy sản xuất thông minh ứng dụng AI." }
];

export default function ProjectsSection({ data }: Props) {
  const { ref, isInView } = useInView(0.1);
  const items = Array.isArray(data) ? data : (data?.items || DEFAULT_ITEMS);
  const label = !Array.isArray(data) && data?.bannerLabel ? data.bannerLabel : "DỰ ÁN NỔI BẬT";
  const title = !Array.isArray(data) && data?.bannerTitle ? data.bannerTitle : "Dấu Ấn APEC Global";
  const [idx, setIdx] = useState(0);

  const next = () => setIdx(i => (i + 1) % items.length);
  const prev = () => setIdx(i => (i === 0 ? items.length - 1 : i - 1));

  const btn: React.CSSProperties = { width: 44, height: 44, borderRadius: "50%", background: "#fff", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#0f172a", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", transition: "all 0.2s" };

  return (
    <section ref={ref} className="section-padding" style={{ background: "#f8fafc", overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 20 }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, background: "rgba(37,99,235,0.08)", color: "#2563eb", fontWeight: 700, fontSize: 11, letterSpacing: "0.06em", marginBottom: 16 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2563eb" }} /> {label}
            </div>
            <h2 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#0f172a", margin: 0, whiteSpace: "pre-line" }}>
              {title}
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} style={{ display: "flex", gap: 12 }}>
            <button onClick={prev} style={btn} onMouseOver={e => e.currentTarget.style.background = "#f1f5f9"} onMouseOut={e => e.currentTarget.style.background = "#fff"}><ChevronLeft size={20} /></button>
            <button onClick={next} style={btn} onMouseOver={e => e.currentTarget.style.background = "#f1f5f9"} onMouseOut={e => e.currentTarget.style.background = "#fff"}><ChevronRight size={20} /></button>
          </motion.div>
        </div>

        <div style={{ position: "relative", minHeight: 450 }}>
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.4 }} style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 0, background: "#fff", borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.08)" }} className="proj-grid">
              <div style={{ position: "relative", minHeight: 400 }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${items[idx].img}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ position: "absolute", top: 24, left: 24, padding: "6px 14px", borderRadius: 8, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)", fontSize: 12, fontWeight: 700, color: "#2563eb", letterSpacing: "0.05em" }}>
                  {items[idx].sector}
                </div>
              </div>
              <div style={{ padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h3 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.5rem,2vw,2rem)", color: "#0f172a", marginBottom: 12, lineHeight: 1.2 }}>{items[idx].name}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#64748b", fontSize: 14, marginBottom: 24 }}><MapPin size={16} /> {items[idx].loc}</div>
                <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>{items[idx].desc}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 36, paddingBottom: 24, borderBottom: "1px solid #e2e8f0" }}>
                  <div><div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, marginBottom: 4, textTransform: "uppercase" }}>Tổng vốn</div><div style={{ fontSize: 16, fontWeight: 800, color: "#0f172a" }}>{items[idx].cap}</div></div>
                  <div><div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, marginBottom: 4, textTransform: "uppercase" }}>Năm hoàn thành</div><div style={{ fontSize: 16, fontWeight: 800, color: "#0f172a" }}>{items[idx].year}</div></div>
                </div>
                <Link href="/du-an" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700, color: "#2563eb", textDecoration: "none" }}>
                  XEM TẤT CẢ DỰ ÁN <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <style>{`@media(max-width:960px){.proj-grid{grid-template-columns:1fr!important}.proj-grid>div:first-child{min-height:250px!important}}@media(max-width:640px){.proj-grid>div:last-child{padding:32px 24px!important}}`}</style>
    </section>
  );
}
