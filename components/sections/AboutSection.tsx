"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Heart, Globe, Lightbulb, Users as UsersIcon, Sun, HandHeart, Brain, LucideIcon } from "lucide-react";
import { useInView } from "@/lib/hooks";

const ICONS: Record<string, LucideIcon> = { Star, Heart, Globe, Lightbulb, Users: UsersIcon, Sun, HandHeart, Brain };

interface CoreValue { icon: string; label: string; desc?: string; }
interface AboutData { sectionLabel: string; heading: string; description1: string; description2: string; vision?: any; mission?: any; coreValues?: CoreValue[]; }
interface Props { data?: AboutData }

const DEFAULT_DATA: AboutData = {
  sectionLabel: "VỀ APECGLOBAL",
  heading: "Kiến tạo giá trị\nvững bền – Đồng hành\nphát triển dài hạn",
  description1: "ApecGlobal đầu tư và phát triển hệ sinh thái đa ngành, kiến tạo giá trị bền vững và đồng hành cùng doanh nghiệp trên hành trình phát triển dài hạn.",
  description2: "Với triết lý đầu tư bền vững, APEC Global không chỉ là nhà đầu tư mà còn là đối tác chiến lược đồng hành cùng sự phát triển của doanh nghiệp.",
  coreValues: [
    { icon: "Star", label: "Tận tâm" }, { icon: "Heart", label: "Tin tưởng" },
    { icon: "Globe", label: "Toàn cầu" }, { icon: "Lightbulb", label: "Đổi mới" },
    { icon: "Users", label: "Tận lực" }
  ]
};

export default function AboutSection({ data }: Props) {
  const { ref, isInView } = useInView(0.2);
  const d = data || DEFAULT_DATA;
  const values = d.coreValues || DEFAULT_DATA.coreValues!;

  return (
    <section ref={ref} className="section-padding" style={{ background: "#fff", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: "-10%", top: 0, width: "50%", height: "100%", background: "radial-gradient(ellipse,rgba(37,99,235,0.04),transparent 70%)", pointerEvents: "none" }} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center max-w-[1280px] mx-auto px-[28px] about-grid">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, background: "rgba(37,99,235,0.08)", color: "#2563eb", fontWeight: 700, fontSize: 11, letterSpacing: "0.06em", marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2563eb" }} /> {d.sectionLabel}
          </div>
          <h2 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.6rem,5vw,2.8rem)", color: "#0f172a", lineHeight: 1.15, marginBottom: 28, whiteSpace: "pre-line" }}>
            {d.heading}
          </h2>
          <div style={{ width: 60, height: 4, background: "linear-gradient(90deg,#1d4ed8,#60a5fa)", borderRadius: 2, marginBottom: 28 }} />
          <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.7, marginBottom: 20, whiteSpace: "pre-wrap" }}>{d.description1}</p>
          <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7, marginBottom: 36, whiteSpace: "pre-wrap" }}>{d.description2}</p>
          <div style={{ display: "flex", gap: 16 }}>
            <Link href="/gioi-thieu" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 26px", borderRadius: 8, background: "#0f172a", color: "#fff", fontWeight: 600, fontSize: 13, textDecoration: "none", transition: "background 0.2s" }}>
              XEM CHI TIẾT <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} style={{ position: "relative" }}>
          <div style={{ position: "absolute", inset: "-20px", background: "linear-gradient(135deg,rgba(37,99,235,0.05),rgba(37,99,235,0.01))", borderRadius: 30, transform: "rotate(-3deg)", zIndex: 0 }} />
          <div style={{ position: "relative", zIndex: 1, background: "#fff", borderRadius: 24, padding: 40, boxShadow: "0 20px 50px rgba(0,0,0,0.06)", border: "1px solid rgba(226,232,240,0.8)" }}>
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-x-6 lg:gap-y-8 about-inner-grid">
              {values.map((v, i) => {
                const Icon = ICONS[v.icon] || Star;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,rgba(37,99,235,0.1),rgba(37,99,235,0.05))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid rgba(37,99,235,0.1)" }}>
                      <Icon size={22} style={{ color: "#2563eb" }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: "#1e293b", marginBottom: v.desc ? 4 : 0 }}>{v.label}</div>
                      {v.desc && <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>{v.desc}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 40, paddingTop: 30, borderTop: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: 48, color: "#2563eb", lineHeight: 1 }}>15<span style={{ fontSize: 24 }}>+</span></div>
              <div style={{ color: "#64748b", fontSize: 13, fontWeight: 500, lineHeight: 1.5 }}>Năm kinh nghiệm<br />đầu tư & phát triển</div>
            </div>
          </div>
        </motion.div>
      </div>
      <style>{`@media(max-width:640px){.about-inner-grid>div{flex-direction:column;align-items:center;text-align:center;gap:8px!important}.about-inner-grid>div>div:first-child{width:40px!important;height:40px!important}.about-inner-grid>div>div:last-child{font-size:13px!important}}`}</style>
    </section>
  );
}
