"use client";
import { motion } from "framer-motion";
import { Shield, TrendingUp, Scale, Leaf, BarChart3, FileCheck, CheckCircle2, Building2, RefreshCw, Globe, Cpu, LineChart, ShoppingBag, ArrowRight } from "lucide-react";
import PageBanner from "@/components/shared/PageBanner";
import { useInView } from "@/lib/hooks";
import Link from "next/link";

const PRINCIPLES = [
  { icon: Shield, title: "Minh bạch", desc: "Công khai toàn bộ quy trình đầu tư, báo cáo tài chính định kỳ cho nhà đầu tư.", color: "#2563eb" },
  { icon: Scale, title: "Tuân thủ pháp lý", desc: "Đảm bảo tuân thủ đầy đủ quy định pháp luật Việt Nam và quốc tế.", color: "#16a34a" },
  { icon: Leaf, title: "Bền vững (ESG)", desc: "Ưu tiên dự án phát triển bền vững, đáp ứng tiêu chuẩn ESG quốc tế.", color: "#ea580c" },
  { icon: TrendingUp, title: "Hiệu quả cao", desc: "Tối ưu lợi nhuận trên vốn đầu tư thông qua quản trị chuyên nghiệp.", color: "#9333ea" },
];

const PROCESS = [
  { step: "01", title: "Thẩm định dự án", desc: "Phân tích kỹ thuật, pháp lý, tài chính và đánh giá rủi ro toàn diện" },
  { step: "02", title: "Phê duyệt đầu tư", desc: "Hội đồng đầu tư xem xét và phê duyệt trên tiêu chí minh bạch" },
  { step: "03", title: "Triển khai & Giám sát", desc: "Quản lý dự án chuyên nghiệp, báo cáo tiến độ định kỳ" },
  { step: "04", title: "Thoái vốn & Lợi nhuận", desc: "Chiến lược thoái vốn tối ưu, phân phối lợi nhuận minh bạch" },
];

const SECTORS = [
  { icon: Building2, label: "Bất động sản", pct: "35%", color: "#2563eb" },
  { icon: Cpu, label: "Công nghệ", pct: "25%", color: "#16a34a" },
  { icon: LineChart, label: "Tài chính", pct: "20%", color: "#ea580c" },
  { icon: ShoppingBag, label: "Thương mại", pct: "15%", color: "#9333ea" },
  { icon: Globe, label: "Khác", pct: "5%", color: "#64748b" },
];

const BENEFITS = [
  "Lãi suất cạnh tranh từ 12-18%/năm",
  "Đội ngũ quản lý quỹ chuyên nghiệp",
  "Báo cáo đầu tư minh bạch hàng quý",
  "Bảo hiểm rủi ro đầu tư toàn diện",
  "Hỗ trợ pháp lý đầy đủ",
  "Quyền tham gia quản trị doanh nghiệp",
];

function Section({ children, bg = "#fff" }: { children: React.ReactNode; bg?: string }) {
  const { ref, isInView } = useInView(0.08);
  return (
    <section ref={ref} style={{ background: bg, padding: "56px 0" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
        style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>{children}</motion.div>
    </section>
  );
}

export default function ChinhSachDauTuPage() {
  return (
    <>
      <PageBanner label="Investment Policy" title="Chính Sách Đầu Tư" desc="Quy trình đầu tư minh bạch, hiệu quả và bền vững – Tạo giá trị dài hạn cho nhà đầu tư" />

      {/* Nguyên tắc */}
      <Section>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "#0f172a" }}>
            Nguyên Tắc <span style={{ color: "#2563eb" }}>Đầu Tư</span>
          </h2>
        </div>
        <div className="principles-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {PRINCIPLES.map((p, i) => (
            <div key={i} style={{ padding: "24px 20px", background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", textAlign: "center", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: `${p.color}10`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                <p.icon size={22} style={{ color: p.color }} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", marginBottom: 6 }}>{p.title}</div>
              <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){.principles-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
      </Section>

      {/* Quy trình */}
      <Section bg="#f8fafc">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "#0f172a" }}>
            Quy Trình <span style={{ color: "#2563eb" }}>Đầu Tư</span>
          </h2>
        </div>
        <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {PROCESS.map((p, i) => (
            <div key={i} style={{ position: "relative" }}>
              <div style={{ padding: "24px 20px", background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", height: "100%" }}>
                <div style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: 32, color: "#dbeafe", marginBottom: 10 }}>{p.step}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a", marginBottom: 6 }}>{p.title}</div>
                <p style={{ color: "#64748b", fontSize: 12.5, lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
              </div>
              {i < PROCESS.length - 1 && (
                <div style={{ position: "absolute", right: -12, top: "50%", transform: "translateY(-50%)", color: "#cbd5e1", fontSize: 18, zIndex: 2 }}>→</div>
              )}
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){.process-grid{grid-template-columns:1fr!important}}`}</style>
      </Section>

      {/* Phân bổ & Lợi ích */}
      <Section>
        <div className="alloc-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          {/* Phân bổ */}
          <div>
            <h3 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 18, color: "#0f172a", marginBottom: 20 }}>
              Cơ Cấu <span style={{ color: "#2563eb" }}>Phân Bổ Đầu Tư</span>
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {SECTORS.map((s, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <s.icon size={14} style={{ color: s.color }} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>{s.label}</span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.pct}</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: "#f1f5f9", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: s.pct, background: s.color, borderRadius: 3, transition: "width 1s ease" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lợi ích */}
          <div>
            <h3 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 18, color: "#0f172a", marginBottom: 20 }}>
              Quyền Lợi <span style={{ color: "#2563eb" }}>Nhà Đầu Tư</span>
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {BENEFITS.map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "#f0f7ff", borderRadius: 10, border: "1px solid #dbeafe" }}>
                  <CheckCircle2 size={16} style={{ color: "#2563eb", flexShrink: 0 }} />
                  <span style={{ fontSize: 13.5, color: "#334155" }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){.alloc-grid{grid-template-columns:1fr!important}}`}</style>
      </Section>

      {/* CTA */}
      <Section bg="#f8fafc">
        <div style={{ textAlign: "center", padding: "32px 0" }}>
          <h3 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 20, color: "#0f172a", marginBottom: 12 }}>Bắt đầu hành trình đầu tư cùng APEC Global</h3>
          <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>Liên hệ ngay để nhận tư vấn chi tiết về các cơ hội đầu tư</p>
          <Link href="/lien-he" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 8, background: "linear-gradient(135deg,#1d4ed8,#2563eb)", color: "#fff", fontWeight: 700, fontSize: 14, textDecoration: "none", boxShadow: "0 4px 16px rgba(37,99,235,0.4)" }}>
            ĐĂNG KÝ TƯ VẤN <ArrowRight size={16} />
          </Link>
        </div>
      </Section>
    </>
  );
}
