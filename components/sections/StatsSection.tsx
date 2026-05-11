"use client";
import { motion } from "framer-motion";
import { Building2, Users, Globe2, TrendingUp, Target, LucideIcon } from "lucide-react";
import { useInView } from "@/lib/hooks";

const ICONS: Record<string, LucideIcon> = { Building2, Users, Globe2, TrendingUp, Target, Star: Target };

interface StatItem { id: string; icon: string; value: string; label: string; sub?: string; }
interface Props { data?: StatItem[] }

const DEFAULT_STATS: StatItem[] = [
  { id: "1", icon: "Building2", value: "15+", label: "Dự án đầu tư", sub: "Dự án quy mô lớn" },
  { id: "2", icon: "Users", value: "100+", label: "Doanh nghiệp", sub: "Thành viên hệ sinh thái" },
  { id: "3", icon: "Globe2", value: "7+", label: "Quốc gia", sub: "Mở rộng quốc tế" },
  { id: "4", icon: "TrendingUp", value: "2.868+", label: "tỷ VNĐ", sub: "Vốn đầu tư" },
];

export default function StatsSection({ data }: Props) {
  const { ref, isInView } = useInView(0.1);
  const items = data && data.length > 0 ? data : DEFAULT_STATS;

  return (
    <section ref={ref} className="section-padding-sm" style={{ background: "#fff", position: "relative", zIndex: 20 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>
        <div style={{ background: "#0f172a", borderRadius: 20, padding: "36px 40px", display: "grid", gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 30, boxShadow: "0 20px 40px rgba(0,0,0,0.1)", position: "relative", top: -80 }}>
          {items.map((stat, i) => {
            const Icon = ICONS[stat.icon] || Target;
            return (
              <motion.div key={stat.id || i} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.6 }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(37,99,235,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={20} style={{ color: "#60a5fa" }} />
                </div>
                <div>
                  <div style={{ color: "#fff", fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: "clamp(1.2rem,4vw,2.2rem)", lineHeight: 1.1, marginBottom: 4 }}>
                    {stat.value}
                  </div>
                  <div style={{ color: "#94a3b8", fontSize: 13, fontWeight: 600 }}>{stat.label}</div>
                  {stat.sub && <div style={{ color: "#64748b", fontSize: 11, marginTop: 4 }}>{stat.sub}</div>}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <style>{`@media(max-width:960px){div[style*="grid-template-columns"]{grid-template-columns:repeat(2,1fr)!important;gap:24px!important;padding:28px!important;top:-60px!important}}@media(max-width:560px){div[style*="grid-template-columns"]{grid-template-columns:repeat(2,1fr)!important;gap:16px!important;padding:24px 20px!important}}`}</style>
    </section>
  );
}
