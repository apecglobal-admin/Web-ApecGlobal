"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Cpu, LineChart, ShoppingBag, HeartPulse, CheckCircle2, ArrowRight, Layers, Zap, Globe, Users } from "lucide-react";
import PageBanner from "@/components/shared/PageBanner";
import { useInView } from "@/lib/hooks";

const ECOSYSTEMS = [
  {
    icon: Cpu, title: "APEC TECHNOLOGY", sub: "Công nghệ & Chuyển đổi số", color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe", img: "/images/area-tech.jpg",
    desc: "Phát triển các giải pháp công nghệ tiên phong, ứng dụng AI, Big Data và IoT vào doanh nghiệp.",
    items: ["Super App đa dịch vụ", "Sàn thương mại điện tử", "AI & Chuyển đổi số", "Giải pháp IoT doanh nghiệp", "Cloud & SaaS Platform"],
  },
  {
    icon: LineChart, title: "APEC CAPITAL", sub: "Tài chính & Đầu tư", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", img: "/images/area-energy.jpg",
    desc: "Quản lý quỹ đầu tư, tư vấn M&A và cung cấp giải pháp tài chính toàn diện.",
    items: ["Quỹ đầu tư Capital", "M&A doanh nghiệp", "Tư vấn tài chính", "Đầu tư chứng khoán", "Quản lý tài sản"],
  },
  {
    icon: ShoppingBag, title: "APEC COMMERCE", sub: "Thương mại & Phân phối", color: "#ea580c", bg: "#fff7ed", border: "#fed7aa", img: "/images/area-logistics.jpg",
    desc: "Xây dựng chuỗi cung ứng thông minh, nền tảng thương mại và logistics hiện đại.",
    items: ["Chuỗi cung ứng thông minh", "Nền tảng Renner", "Logistics & kho bãi", "Phân phối đa kênh", "Xuất nhập khẩu"],
  },
  {
    icon: HeartPulse, title: "APEC SERVICES", sub: "Dịch vụ & Chăm sóc", color: "#9333ea", bg: "#faf5ff", border: "#e9d5ff", img: "/images/area-manufacturing.jpg",
    desc: "Cung cấp dịch vụ y tế, chăm sóc sức khỏe và các dịch vụ cao cấp cho cộng đồng.",
    items: ["Phòng khám đa khoa", "Spa & Làm đẹp", "Dịch vụ xuất khẩu lao động", "Đào tạo nhân sự", "Tư vấn doanh nghiệp"],
  },
];

const STATS = [
  { icon: Layers, value: "4", label: "Trụ cột chiến lược" },
  { icon: Users, value: "100+", label: "Doanh nghiệp thành viên" },
  { icon: Globe, value: "7+", label: "Quốc gia hoạt động" },
  { icon: Zap, value: "20+", label: "Sản phẩm & dịch vụ" },
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

export default function HeSinhThaiPage() {
  return (
    <>
      <PageBanner label="Ecosystem" title="Hệ Sinh Thái APEC Global" desc="Hệ sinh thái đa ngành kết nối Công nghệ – Tài chính – Thương mại – Dịch vụ, tạo giá trị bền vững" />

      {/* Stats overview */}
      <Section>
        <div className="eco-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "24px 16px", background: "#f0f7ff", borderRadius: 14, border: "1px solid #dbeafe" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(37,99,235,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                <s.icon size={22} style={{ color: "#2563eb" }} />
              </div>
              <div style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: 28, color: "#2563eb", marginBottom: 4 }}>{s.value}</div>
              <div style={{ color: "#64748b", fontSize: 13, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){.eco-stats{grid-template-columns:repeat(2,1fr)!important}}`}</style>
      </Section>

      {/* Each ecosystem */}
      {ECOSYSTEMS.map((eco, i) => (
        <Section key={i} bg={i % 2 === 1 ? "#f8fafc" : "#fff"}>
          <div className={`eco-detail eco-detail-${i}`} style={{ display: "grid", gridTemplateColumns: i % 2 === 0 ? "1fr 1.2fr" : "1.2fr 1fr", gap: 36, alignItems: "center" }}>
            {i % 2 === 1 && (
              <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "4/3" }}>
                <Image src={eco.img} alt={eco.title} fill style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg,${eco.color}22,transparent)` }} />
              </div>
            )}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: eco.bg, border: `1.5px solid ${eco.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <eco.icon size={20} style={{ color: eco.color }} />
                </div>
                <div>
                  <div style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 16, color: eco.color, letterSpacing: "0.03em" }}>{eco.title}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>{eco.sub}</div>
                </div>
              </div>
              <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.75, marginBottom: 18 }}>{eco.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {eco.items.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, color: "#334155", fontSize: 13.5 }}>
                    <CheckCircle2 size={15} style={{ color: eco.color, flexShrink: 0 }} /> {item}
                  </div>
                ))}
              </div>
            </div>
            {i % 2 === 0 && (
              <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "4/3" }}>
                <Image src={eco.img} alt={eco.title} fill style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg,${eco.color}22,transparent)` }} />
              </div>
            )}
          </div>
          <style>{`@media(max-width:768px){.eco-detail{grid-template-columns:1fr!important}}`}</style>
        </Section>
      ))}
    </>
  );
}
