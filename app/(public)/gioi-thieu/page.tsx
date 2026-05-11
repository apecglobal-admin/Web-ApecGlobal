"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Compass, Star, Users, Globe, Heart, Lightbulb, Target, Award, Shield, TrendingUp, Building2 } from "lucide-react";
import PageBanner from "@/components/shared/PageBanner";
import { useInView } from "@/lib/hooks";

const TIMELINE = [
  { year: "2015", title: "Thành lập APEC Global", desc: "Bắt đầu hành trình với tầm nhìn trở thành tập đoàn đầu tư hàng đầu Việt Nam" },
  { year: "2017", title: "Mở rộng hệ sinh thái", desc: "Phát triển hệ sinh thái đa ngành: Công nghệ, Tài chính, Thương mại" },
  { year: "2019", title: "Hợp tác quốc tế", desc: "Ký kết hợp tác chiến lược với các đối tác tại 5 quốc gia châu Á" },
  { year: "2021", title: "APEC Tech & APEC Capital", desc: "Ra mắt hai công ty con chủ lực trong lĩnh vực công nghệ và tài chính" },
  { year: "2023", title: "Vươn tầm khu vực", desc: "Mở rộng hoạt động sang 7 quốc gia, vốn đầu tư đạt 2.868 tỷ VNĐ" },
];

const VALUES = [
  { icon: Star, label: "Tận tâm", desc: "Luôn đặt lợi ích đối tác lên hàng đầu" },
  { icon: Heart, label: "Tin tưởng", desc: "Xây dựng niềm tin vững chắc" },
  { icon: Globe, label: "Toàn cầu", desc: "Tầm nhìn quốc tế, hành động địa phương" },
  { icon: Lightbulb, label: "Đổi mới", desc: "Không ngừng sáng tạo và cải tiến" },
  { icon: Users, label: "Tận lực", desc: "Đội ngũ chuyên nghiệp tận tâm" },
  { icon: Shield, label: "Bền vững", desc: "Phát triển bền vững cho cộng đồng" },
];

const LEADERS = [
  { name: "Nguyễn Văn A", role: "Chủ tịch HĐQT", img: "/images/area-tech.jpg" },
  { name: "Trần Thị B", role: "Tổng Giám Đốc", img: "/images/area-realestate.jpg" },
  { name: "Lê Văn C", role: "Phó TGĐ Tài Chính", img: "/images/area-energy.jpg" },
  { name: "Phạm Thị D", role: "Phó TGĐ Công Nghệ", img: "/images/area-manufacturing.jpg" },
];

function Section({ children, bg = "#fff" }: { children: React.ReactNode; bg?: string }) {
  const { ref, isInView } = useInView(0.08);
  return (
    <section ref={ref} style={{ background: bg, padding: "56px 0" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
        style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>
        {children}
      </motion.div>
    </section>
  );
}

export default function GioiThieuPage() {
  return (
    <>
      <PageBanner label="Về chúng tôi" title="Giới Thiệu APEC Global" desc="Tập đoàn đầu tư đa ngành hàng đầu Việt Nam – Kiến tạo giá trị, sở hữu tương lai" />

      {/* Tầm nhìn & Sứ mệnh */}
      <Section>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", color: "#2563eb", marginBottom: 8, textTransform: "uppercase" }}>Tầm nhìn & Sứ mệnh</div>
            <h2 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.4rem,2.6vw,2rem)", color: "#0f172a", lineHeight: 1.25, marginBottom: 18 }}>
              Kiến tạo hệ sinh thái<br /><span style={{ color: "#2563eb" }}>vững bền toàn cầu</span>
            </h2>
            <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
              <div style={{ flex: 1, padding: "18px 16px", background: "#f0f7ff", borderRadius: 12, border: "1px solid #dbeafe" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(37,99,235,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Eye size={16} style={{ color: "#2563eb" }} />
                  </div>
                  <span style={{ fontWeight: 700, fontSize: 13, color: "#0f172a" }}>Tầm nhìn</span>
                </div>
                <p style={{ color: "#64748b", fontSize: 12.5, lineHeight: 1.65, margin: 0 }}>Trở thành tập đoàn đầu tư – tài chính dẫn đầu khu vực Đông Nam Á, kiến tạo hệ sinh thái doanh nghiệp Việt Nam vươn tầm quốc tế.</p>
              </div>
              <div style={{ flex: 1, padding: "18px 16px", background: "#f0f7ff", borderRadius: 12, border: "1px solid #dbeafe" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(37,99,235,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Compass size={16} style={{ color: "#2563eb" }} />
                  </div>
                  <span style={{ fontWeight: 700, fontSize: 13, color: "#0f172a" }}>Sứ mệnh</span>
                </div>
                <p style={{ color: "#64748b", fontSize: 12.5, lineHeight: 1.65, margin: 0 }}>Kết nối giá trị – Nâng đỡ doanh nghiệp – Kiến tạo tương lai bền vững cho cộng đồng và nền kinh tế quốc gia.</p>
              </div>
            </div>
            <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.75 }}>
              Với hơn 8 năm hoạt động, APEC Global đã xây dựng hệ sinh thái đầu tư đa ngành vững chắc, kết nối hơn 100 doanh nghiệp thành viên và mở rộng ra 7 quốc gia trong khu vực.
            </p>
          </div>
          <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "4/3" }}>
            <Image src="/images/area-realestate.jpg" alt="APEC Global Office" fill style={{ objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 18px", background: "linear-gradient(0deg,rgba(0,0,0,0.75),transparent)" }}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Trụ sở APEC Global</div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>Tầng 15, Apec Tower, Hà Nội</div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr!important}}`}</style>
      </Section>

      {/* Giá trị cốt lõi */}
      <Section bg="#f8fafc">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", color: "#64748b", marginBottom: 6 }}>CORE VALUES</div>
          <h2 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "#0f172a" }}>
            Giá Trị <span style={{ color: "#2563eb" }}>Cốt Lõi</span>
          </h2>
        </div>
        <div className="values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {VALUES.map((v, i) => (
            <div key={i} style={{ padding: "22px 20px", background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", display: "flex", gap: 14, alignItems: "flex-start", transition: "box-shadow 0.3s", cursor: "pointer" }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(37,99,235,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <v.icon size={18} style={{ color: "#2563eb" }} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a", marginBottom: 4 }}>{v.label}</div>
                <p style={{ color: "#64748b", fontSize: 12.5, lineHeight: 1.6, margin: 0 }}>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){.values-grid{grid-template-columns:1fr!important}}`}</style>
      </Section>

      {/* Lịch sử phát triển */}
      <Section>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", color: "#64748b", marginBottom: 6 }}>MILESTONES</div>
          <h2 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "#0f172a" }}>
            Hành Trình <span style={{ color: "#2563eb" }}>Phát Triển</span>
          </h2>
        </div>
        <div style={{ position: "relative", paddingLeft: 40 }}>
          <div style={{ position: "absolute", left: 16, top: 0, bottom: 0, width: 2, background: "linear-gradient(180deg,#2563eb,#93c5fd)" }} />
          {TIMELINE.map((t, i) => (
            <div key={i} style={{ position: "relative", marginBottom: 32, paddingLeft: 24 }}>
              <div style={{ position: "absolute", left: -32, top: 4, width: 28, height: 28, borderRadius: "50%", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 4px #dbeafe" }}>
                <span style={{ color: "#fff", fontSize: 9, fontWeight: 700 }}>{t.year}</span>
              </div>
              <div style={{ padding: "16px 20px", background: "#f8fafc", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                <div style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 14, color: "#0f172a", marginBottom: 4 }}>{t.title}</div>
                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Đội ngũ lãnh đạo */}
      <Section bg="#f8fafc">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", color: "#64748b", marginBottom: 6 }}>LEADERSHIP</div>
          <h2 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "#0f172a" }}>
            Đội Ngũ <span style={{ color: "#2563eb" }}>Lãnh Đạo</span>
          </h2>
        </div>
        <div className="leaders-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {LEADERS.map((l, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #e2e8f0", textAlign: "center" }}>
              <div style={{ position: "relative", height: 180, background: "#0f172a" }}>
                <Image src={l.img} alt={l.name} fill style={{ objectFit: "cover", opacity: 0.8 }} />
              </div>
              <div style={{ padding: "16px 14px" }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a", marginBottom: 2 }}>{l.name}</div>
                <div style={{ fontSize: 12, color: "#2563eb", fontWeight: 600 }}>{l.role}</div>
              </div>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){.leaders-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
      </Section>
    </>
  );
}
