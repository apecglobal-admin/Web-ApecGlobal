"use client";
import { motion } from "framer-motion";
import { useInView } from "@/lib/hooks";

interface PartnerItem { id: string; name: string; color: string; logo?: string; }
interface Props { data?: PartnerItem[] }

const DEFAULT: PartnerItem[] = [
  { id: "1", name: "Mitsubishi", color: "#e11d48" },
  { id: "2", name: "Samsung C&T", color: "#1d4ed8" },
  { id: "3", name: "Hyundai", color: "#0369a1" },
  { id: "4", name: "Vingroup", color: "#b91c1c" },
  { id: "5", name: "Vietcombank", color: "#15803d" },
  { id: "6", name: "Marriott", color: "#b45309" },
  { id: "7", name: "Savills", color: "#dc2626" },
  { id: "8", name: "CBRE", color: "#15803d" },
];

export default function PartnersSection({ data }: Props) {
  const { ref, isInView } = useInView(0.1);
  const items = data && data.length > 0 ? data : DEFAULT;

  return (
    <section ref={ref} className="section-padding-sm" style={{ background: "#f1f5f9", borderTop: "1px solid #e2e8f0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} style={{ textAlign: "center", marginBottom: 30 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase" }}>Đối Tác Chiến Lược</div>
        </motion.div>
        <div style={{ overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(90deg,#f1f5f9,transparent)", zIndex: 2 }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(270deg,#f1f5f9,transparent)", zIndex: 2 }} />
          <div style={{ display: "flex", gap: 40, width: "max-content", animation: "scroll 30s linear infinite" }}>
            {[...items, ...items].map((p, i) => (
              <div key={i} style={{ padding: "16px 32px", background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", filter: "grayscale(100%)", opacity: 0.6, transition: "all 0.3s", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", minWidth: 160 }} onMouseOver={e => { e.currentTarget.style.filter = "grayscale(0%)"; e.currentTarget.style.opacity = "1"; e.currentTarget.style.borderColor = p.color; e.currentTarget.style.boxShadow = `0 10px 20px ${p.color}15`; }} onMouseOut={e => { e.currentTarget.style.filter = "grayscale(100%)"; e.currentTarget.style.opacity = "0.6"; e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "none"; }}>
                {p.logo ? (
                  <img src={p.logo} alt={p.name} style={{ maxHeight: 40, maxWidth: 120, objectFit: "contain" }} />
                ) : (
                  <span style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: 18, color: p.color }}>{p.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </section>
  );
}
