"use client";
import { motion } from "framer-motion";
import { Shield, TrendingUp, Handshake, CheckCircle2, ChevronRight, Activity, Zap } from "lucide-react";
import { useInView } from "@/lib/hooks";

interface PolicyData {
  investmentModel?: { label: string; sub: string }[];
  investmentPolicies?: { title: string; desc: string }[];
  cooperationTypes?: { label: string }[];
}
interface Props { data?: PolicyData }

const DEFAULT: PolicyData = {
  investmentModel: [
    { label: "Doanh nghiệp", sub: "Tham gia & đóng góp" },
    { label: "Đầu tư", sub: "Vốn và giá trị" },
    { label: "Chuyển đổi số", sub: "Tối ưu và số hoá" },
    { label: "Thương mại hoá", sub: "Phân phối & doanh thu" },
    { label: "Mở rộng quốc tế", sub: "Vươn tầm toàn cầu" },
  ],
  investmentPolicies: [
    { title: "Quy trình minh bạch", desc: "Đảm bảo công khai, minh bạch mọi thông tin" },
    { title: "Đòn bẩy đầu tư", desc: "Hỗ trợ toàn diện về nguồn vốn" },
    { title: "Tuân thủ pháp lý", desc: "Đảm bảo tuân thủ các quy định" },
    { title: "ESG & Bền vững", desc: "Ưu tiên phát triển bền vững" },
  ],
  cooperationTypes: [
    { label: "Doanh nghiệp" }, { label: "Nhà đầu tư" }, { label: "M&A" },
    { label: "Hợp tác quốc tế" }, { label: "Đối tác phân phối" }, { label: "Hợp tác chiến lược" }
  ]
};

export default function ModelAndPoliciesSection({ data }: Props) {
  const { ref, isInView } = useInView(0.1);
  const d = data && Object.keys(data).length > 0 ? data : DEFAULT;

  return (
    <section ref={ref} className="section-padding" style={{ background: "#f8fafc", position: "relative" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#0f172a", marginBottom: 16 }}>
            Mô Hình & <span style={{ color: "#2563eb" }}>Chính Sách</span>
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0 }} style={{ background: "#fff", borderRadius: 24, padding: 32, border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#1d4ed8,#2563eb)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><Activity size={20} /></div>
              <h3 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 18, color: "#0f172a", margin: 0 }}>Mô Hình Đầu Tư</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {(d.investmentModel || DEFAULT.investmentModel!).map((item, i, arr) => (
                <div key={i} style={{ position: "relative" }}>
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start", position: "relative", zIndex: 1 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#f1f5f9", color: "#2563eb", fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "2px solid #fff", boxShadow: "0 0 0 1px #e2e8f0" }}>{i + 1}</div>
                    <div><div style={{ fontWeight: 700, fontSize: 14, color: "#1e293b", marginBottom: 2 }}>{item.label}</div><div style={{ fontSize: 12, color: "#64748b" }}>{item.sub}</div></div>
                  </div>
                  {i < arr.length - 1 && <div style={{ position: "absolute", left: 16, top: 32, bottom: -16, width: 2, background: "#e2e8f0", zIndex: 0 }} />}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} style={{ background: "#fff", borderRadius: 24, padding: 32, border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#15803d,#16a34a)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><Shield size={20} /></div>
              <h3 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 18, color: "#0f172a", margin: 0 }}>Chính Sách</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {(d.investmentPolicies || DEFAULT.investmentPolicies!).map((item, i) => (
                <div key={i} style={{ padding: "16px 20px", borderRadius: 12, background: "#f8fafc", border: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><CheckCircle2 size={16} style={{ color: "#16a34a" }} /><span style={{ fontWeight: 700, fontSize: 14, color: "#1e293b" }}>{item.title}</span></div>
                  <div style={{ fontSize: 12.5, color: "#64748b", paddingLeft: 24, lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} style={{ background: "#fff", borderRadius: 24, padding: 32, border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#c2410c,#ea580c)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><Handshake size={20} /></div>
              <h3 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 18, color: "#0f172a", margin: 0 }}>Hợp Tác</h3>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {(d.cooperationTypes || DEFAULT.cooperationTypes!).map((item, i) => (
                <div key={i} style={{ padding: "10px 16px", borderRadius: 100, background: "#fff0e6", color: "#c2410c", fontSize: 13, fontWeight: 600, border: "1px solid #ffedd5" }}>
                  {item.label}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 32, padding: 24, borderRadius: 16, background: "#0f172a", color: "#fff", textAlign: "center" }}>
              <Zap size={24} style={{ color: "#ea580c", marginBottom: 12 }} />
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>Sẵn sàng đồng hành</div>
              <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 16 }}>Liên hệ ngay để nhận thông tin hợp tác chi tiết</div>
              <button style={{ width: "100%", padding: "10px 0", borderRadius: 8, background: "#ea580c", color: "#fff", border: "none", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>LIÊN HỆ NGAY</button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
