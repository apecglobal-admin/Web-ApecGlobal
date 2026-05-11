"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/lib/hooks";

interface EcosystemItem { id: string; icon: string; title: string; sub: string; color: string; items: string[]; img: string; }
interface Props { data?: EcosystemItem[] }

const DEFAULT_DATA: EcosystemItem[] = [
  { id: "1", icon: "💻", title: "CÔNG NGHỆ", sub: "Technology", color: "#1d4ed8", items: ["Super App", "Sàn TMĐT", "AI & Chuyển đổi số"], img: "/images/area-tech.jpg" },
  { id: "2", icon: "📈", title: "TÀI CHÍNH", sub: "Finance", color: "#15803d", items: ["Quỹ đầu tư", "M&A doanh nghiệp", "Đầu tư tài chính"], img: "/images/area-realestate.jpg" },
  { id: "3", icon: "🛒", title: "THƯƠNG MẠI", sub: "Commerce", color: "#c2410c", items: ["Renner", "Chuỗi cung ứng", "Logistics"], img: "/images/area-logistics.jpg" },
  { id: "4", icon: "🏥", title: "DỊCH VỤ", sub: "Services", color: "#7e22ce", items: ["Phòng khám", "Spa & Sắc đẹp", "Xuất khẩu lao động"], img: "/images/area-energy.jpg" }
];

export default function EcosystemSection({ data }: Props) {
  const { ref, isInView } = useInView(0.1);
  const items = data && data.length > 0 ? data : DEFAULT_DATA;

  return (
    <section ref={ref} className="section-padding" style={{ background: "#f8fafc" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, background: "rgba(37,99,235,0.08)", color: "#2563eb", fontWeight: 700, fontSize: 11, letterSpacing: "0.06em", marginBottom: 16 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2563eb" }} /> HỆ SINH THÁI
            </div>
            <h2 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#0f172a", marginBottom: 16 }}>
              Đa Ngành – <span style={{ color: "#2563eb" }}>Toàn Diện</span>
            </h2>
            <p style={{ color: "#64748b", fontSize: 14, maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
              Hệ sinh thái APEC Global liên kết chặt chẽ, hỗ trợ lẫn nhau tạo thành chuỗi giá trị khép kín, mang lại hiệu quả tối ưu cho đối tác và khách hàng.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 eco-grid">
          {items.map((item, i) => (
            <motion.div key={item.id || i} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ background: "#fff", borderRadius: 20, padding: 32, border: "1px solid #e2e8f0", position: "relative", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.02)", display: "flex", flexDirection: "column" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 4, background: item.color }} />
              <div style={{ position: "absolute", right: -20, top: -20, fontSize: 120, opacity: 0.03, filter: "grayscale(100%)", pointerEvents: "none" }}>{item.icon}</div>
              
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, position: "relative", zIndex: 1 }}>
                <div className="eco-icon" style={{ width: 48, height: 48, borderRadius: 12, background: `${item.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="eco-title" style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 16, color: "#0f172a", margin: 0 }}>{item.title}</h3>
                  <div className="eco-sub" style={{ fontSize: 11, fontWeight: 600, color: item.color, letterSpacing: "0.05em", textTransform: "uppercase" }}>{item.sub}</div>
                </div>
              </div>

              <div className="eco-items" style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1, position: "relative", zIndex: 1 }}>
                {item.items.map((li, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: item.color, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#475569", fontWeight: 500, lineHeight: 1.4 }}>{li}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid #f1f5f9", position: "relative", zIndex: 1 }}>
                <Link href="/he-sinh-thai" className="eco-link" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: item.color, textDecoration: "none" }}>
                  TÌM HIỂU THÊM <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:640px){.eco-grid>div{padding:16px!important}.eco-icon{width:36px!important;height:36px!important;font-size:18px!important}.eco-title{font-size:13px!important;line-height:1.2!important}.eco-sub{font-size:10px!important}.eco-items span{font-size:11px!important}.eco-link{font-size:11px!important}}`}</style>
    </section>
  );
}
