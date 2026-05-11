"use client";
import { motion } from "framer-motion";
import { Handshake, Building2, TrendingUp, Globe, Share2, Target, Users, Award, Shield, CheckCircle2, ArrowRight } from "lucide-react";
import PageBanner from "@/components/shared/PageBanner";
import { useInView } from "@/lib/hooks";
import Link from "next/link";

const MODELS = [
  { icon: Building2, title: "Hợp tác doanh nghiệp", desc: "Liên doanh, liên kết và đồng đầu tư với các doanh nghiệp trong và ngoài nước.", features: ["Cùng đầu tư phát triển dự án", "Chia sẻ nguồn lực & hạ tầng", "Đồng quản trị doanh nghiệp"] },
  { icon: TrendingUp, title: "Hợp tác đầu tư", desc: "Các gói đầu tư linh hoạt với mức sinh lời hấp dẫn và rủi ro được kiểm soát.", features: ["Đầu tư trực tiếp", "Quỹ đầu tư chung", "Trái phiếu doanh nghiệp"] },
  { icon: Handshake, title: "M&A", desc: "Tư vấn và thực hiện M&A chuyên nghiệp, tối ưu giá trị doanh nghiệp.", features: ["Mua bán sáp nhập", "Tái cấu trúc doanh nghiệp", "Định giá & thẩm định"] },
  { icon: Globe, title: "Hợp tác quốc tế", desc: "Mở rộng cơ hội hợp tác với các đối tác và tổ chức quốc tế.", features: ["FDI & Đầu tư nước ngoài", "Chuyển giao công nghệ", "Hợp tác xuyên biên giới"] },
  { icon: Share2, title: "Đối tác phân phối", desc: "Mạng lưới phân phối rộng khắp, tối ưu chuỗi cung ứng.", features: ["Đại lý phân phối", "Nhượng quyền thương hiệu", "Chuỗi bán lẻ"] },
  { icon: Target, title: "Hợp tác chiến lược", desc: "Liên minh chiến lược dài hạn cùng phát triển bền vững.", features: ["Đối tác chiến lược dài hạn", "Cùng phát triển thị trường", "Chia sẻ lợi ích bền vững"] },
];

const PROCESS = [
  { step: "01", title: "Tiếp nhận hồ sơ", desc: "Tiếp nhận và xử lý hồ sơ hợp tác trong vòng 24 giờ làm việc" },
  { step: "02", title: "Đánh giá & Thẩm định", desc: "Đội ngũ chuyên gia đánh giá tiềm năng và tính khả thi" },
  { step: "03", title: "Đàm phán & Ký kết", desc: "Thương thảo các điều khoản hợp tác và ký kết hợp đồng" },
  { step: "04", title: "Triển khai & Đồng hành", desc: "Triển khai hợp tác và đồng hành trong suốt quá trình" },
];

const BENEFITS = [
  { icon: Award, title: "Thương hiệu uy tín", desc: "Đồng hành cùng thương hiệu hàng đầu Việt Nam" },
  { icon: Shield, title: "Bảo vệ quyền lợi", desc: "Hợp đồng minh bạch, bảo vệ quyền lợi đối tác" },
  { icon: Users, title: "Đội ngũ hỗ trợ", desc: "Đội ngũ chuyên gia hỗ trợ 24/7" },
  { icon: TrendingUp, title: "Tăng trưởng bền vững", desc: "Chiến lược phát triển dài hạn, tăng trưởng ổn định" },
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

export default function ChinhSachHopTacPage() {
  return (
    <>
      <PageBanner label="Partnership Policy" title="Chính Sách Hợp Tác" desc="Đa dạng mô hình hợp tác – Tối ưu giá trị cho đối tác – Cùng phát triển bền vững" />

      {/* Mô hình hợp tác */}
      <Section>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "#0f172a" }}>
            Mô Hình <span style={{ color: "#2563eb" }}>Hợp Tác</span>
          </h2>
        </div>
        <div className="coop-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {MODELS.map((m, i) => (
            <div key={i} style={{ padding: "24px 20px", background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)", transition: "box-shadow 0.3s" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(37,99,235,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <m.icon size={20} style={{ color: "#2563eb" }} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", marginBottom: 6 }}>{m.title}</div>
              <p style={{ color: "#64748b", fontSize: 12.5, lineHeight: 1.6, marginBottom: 14 }}>{m.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {m.features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#475569" }}>
                    <CheckCircle2 size={13} style={{ color: "#2563eb", flexShrink: 0 }} /> {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){.coop-grid{grid-template-columns:1fr!important}}`}</style>
      </Section>

      {/* Quy trình */}
      <Section bg="#f8fafc">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "#0f172a" }}>
            Quy Trình <span style={{ color: "#2563eb" }}>Hợp Tác</span>
          </h2>
        </div>
        <div className="coop-process" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {PROCESS.map((p, i) => (
            <div key={i} style={{ position: "relative" }}>
              <div style={{ padding: "24px 20px", background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", height: "100%", textAlign: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#1d4ed8,#2563eb)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <span style={{ color: "#fff", fontWeight: 900, fontSize: 16, fontFamily: "Montserrat,sans-serif" }}>{p.step}</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a", marginBottom: 6 }}>{p.title}</div>
                <p style={{ color: "#64748b", fontSize: 12.5, lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
              </div>
              {i < PROCESS.length - 1 && <div style={{ position: "absolute", right: -12, top: "50%", transform: "translateY(-50%)", color: "#cbd5e1", fontSize: 18, zIndex: 2 }}>→</div>}
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){.coop-process{grid-template-columns:1fr!important}}`}</style>
      </Section>

      {/* Lợi ích */}
      <Section>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "#0f172a" }}>
            Lợi Ích <span style={{ color: "#2563eb" }}>Đối Tác</span>
          </h2>
        </div>
        <div className="benefits-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {BENEFITS.map((b, i) => (
            <div key={i} style={{ textAlign: "center", padding: "28px 18px", background: "#f0f7ff", borderRadius: 14, border: "1px solid #dbeafe" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(37,99,235,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                <b.icon size={22} style={{ color: "#2563eb" }} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a", marginBottom: 6 }}>{b.title}</div>
              <p style={{ color: "#64748b", fontSize: 12.5, lineHeight: 1.6, margin: 0 }}>{b.desc}</p>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){.benefits-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
      </Section>

      {/* CTA */}
      <Section bg="#f8fafc">
        <div style={{ textAlign: "center", padding: "32px 0" }}>
          <h3 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 20, color: "#0f172a", marginBottom: 12 }}>Trở thành đối tác của APEC Global</h3>
          <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>Liên hệ để khám phá cơ hội hợp tác phù hợp</p>
          <Link href="/lien-he" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 8, background: "linear-gradient(135deg,#1d4ed8,#2563eb)", color: "#fff", fontWeight: 700, fontSize: 14, textDecoration: "none", boxShadow: "0 4px 16px rgba(37,99,235,0.4)" }}>
            ĐĂNG KÝ HỢP TÁC <ArrowRight size={16} />
          </Link>
        </div>
      </Section>
    </>
  );
}
