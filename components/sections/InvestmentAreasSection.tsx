"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useInView } from "@/lib/hooks";

interface InvestmentItem { id: string; title: string; desc: string; img: string; }
interface Props { data?: InvestmentItem[] }

const DEFAULT_DATA: InvestmentItem[] = [
  { id: "1", title: "BẤT ĐỘNG SẢN", desc: "Phát triển các dự án bất động sản đô thị, khu công nghiệp và nghỉ dưỡng cao cấp với tiêu chuẩn quốc tế.", img: "/images/area-realestate.jpg" },
  { id: "2", title: "NĂNG LƯỢNG TÁI TẠO", desc: "Đầu tư các dự án năng lượng xanh, năng lượng mặt trời và điện gió nhằm hướng tới tương lai bền vững.", img: "/images/area-energy.jpg" },
  { id: "3", title: "SẢN XUẤT CÔNG NGHIỆP", desc: "Thúc đẩy sản xuất thông minh, ứng dụng công nghệ tự động hóa vào dây chuyền sản xuất.", img: "/images/area-manufacturing.jpg" },
  { id: "4", title: "LOGISTICS", desc: "Phát triển hạ tầng logistics hiện đại, kết nối chuỗi cung ứng toàn cầu chuyên nghiệp.", img: "/images/area-logistics.jpg" },
  { id: "5", title: "CÔNG NGHỆ", desc: "Đầu tư vào công nghệ tiên phong, trí tuệ nhân tạo và chuyển đổi số cho doanh nghiệp.", img: "/images/area-tech.jpg" },
];

export default function InvestmentAreasSection({ data }: Props) {
  const { ref, isInView } = useInView(0.1);
  const items = data && data.length > 0 ? data : DEFAULT_DATA;
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section ref={ref} className="section-padding" style={{ background: "#040c1c", color: "#fff", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(37,99,235,0.3),transparent)" }} />
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem,3vw,2.4rem)", marginBottom: 16 }}>
            Lĩnh Vực <span style={{ color: "#38bdf8" }}>Đầu Tư</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} style={{ color: "#94a3b8", fontSize: 14, maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
            Tập trung vào các lĩnh vực cốt lõi mang lại giá trị gia tăng cao và bền vững cho nền kinh tế.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 h-[auto] lg:h-[480px] inv-grid">
          {items.map((item, i) => (
            <motion.div key={item.id || i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ position: "relative", borderRadius: 20, overflow: "hidden", cursor: "pointer", transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)", transform: hovered === i ? "translateY(-10px)" : "translateY(0)", boxShadow: hovered === i ? "0 20px 40px rgba(0,0,0,0.4)" : "none" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${item.img}')`, backgroundSize: "cover", backgroundPosition: "center", transition: "transform 0.6s", transform: hovered === i ? "scale(1.08)" : "scale(1)" }} />
              <div style={{ position: "absolute", inset: 0, background: hovered === i ? "linear-gradient(0deg,rgba(4,12,28,0.9) 0%,rgba(4,12,28,0.2) 100%)" : "linear-gradient(0deg,rgba(4,12,28,0.8) 0%,rgba(4,12,28,0.4) 100%)", transition: "background 0.4s" }} />
              <div className="inv-overlay" style={{ position: "absolute", inset: 0, padding: 24, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <h3 className="inv-title" style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: "clamp(1rem,1.5vw,1.2rem)", color: "#fff", margin: 0, lineHeight: 1.3, marginBottom: hovered === i ? 12 : 0, transition: "margin 0.3s" }}>
                      {item.title}
                    </h3>
                    <AnimatePresence>
                      {hovered === i && (
                        <motion.p className="inv-desc" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.6, margin: 0, overflow: "hidden" }}>
                          {item.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: hovered === i ? "#2563eb" : "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.3s", transform: hovered === i ? "rotate(45deg)" : "rotate(0)" }}>
                    <ArrowUpRight size={18} style={{ color: "#fff" }} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:1024px){.inv-grid>div{height:300px}}@media(max-width:640px){.inv-grid>div{height:200px}.inv-overlay{padding:16px 12px!important}.inv-title{font-size:13px!important;line-height:1.2!important;margin-bottom:4px!important}.inv-desc{font-size:11px!important;line-height:1.4!important}}`}</style>
    </section>
  );
}
