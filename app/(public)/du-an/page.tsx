"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Calendar, DollarSign, Building2, Zap, Factory, Truck, Cpu } from "lucide-react";
import PageBanner from "@/components/shared/PageBanner";
import { useInView } from "@/lib/hooks";

const TABS = ["Tất cả", "Bất động sản", "Năng lượng", "Sản xuất", "Logistics", "Công nghệ"];
const PROJECTS = [
  { name: "APEC TOWER", sector: "Bất động sản", status: "Đang vận hành", loc: "Hà Nội", cap: "1.200 tỷ", year: "2021", img: "/images/area-realestate.jpg", desc: "Tòa nhà văn phòng hạng A 35 tầng tại trung tâm Hà Nội, chuẩn LEED Gold." },
  { name: "APEC SOLAR FARM", sector: "Năng lượng", status: "Đang vận hành", loc: "Ninh Thuận", cap: "500 tỷ", year: "2022", img: "/images/area-energy.jpg", desc: "Nhà máy điện mặt trời công suất 50MW, cung cấp năng lượng sạch cho miền Nam." },
  { name: "APEC SMART FACTORY", sector: "Sản xuất", status: "Đang đầu tư", loc: "Bắc Ninh", cap: "800 tỷ", year: "2023", img: "/images/area-manufacturing.jpg", desc: "Nhà máy sản xuất thông minh ứng dụng AI và tự động hóa." },
  { name: "APEC LOGISTICS HUB", sector: "Logistics", status: "Đang đầu tư", loc: "TP.HCM", cap: "350 tỷ", year: "2023", img: "/images/area-logistics.jpg", desc: "Trung tâm logistics hiện đại kết nối chuỗi cung ứng khu vực." },
  { name: "APEC TECH CAMPUS", sector: "Công nghệ", status: "Đang vận hành", loc: "Đà Nẵng", cap: "600 tỷ", year: "2022", img: "/images/area-tech.jpg", desc: "Khu phức hợp công nghệ với co-working space và trung tâm đào tạo." },
  { name: "ECO GREEN PARK", sector: "Bất động sản", status: "Đang đầu tư", loc: "TP.HCM", cap: "2.000 tỷ", year: "2024", img: "/images/news-1.jpg", desc: "Khu đô thị xanh với 5.000 căn hộ cao cấp và tiện ích đầy đủ." },
  { name: "WIND POWER CENTRAL", sector: "Năng lượng", status: "Đang đầu tư", loc: "Bạc Liêu", cap: "750 tỷ", year: "2024", img: "/images/news-2.jpg", desc: "Trang trại điện gió ngoài khơi công suất 100MW." },
  { name: "APEC SPACE", sector: "Công nghệ", status: "Đang vận hành", loc: "Hà Nội", cap: "50 tỷ", year: "2020", img: "/images/news-3.jpg", desc: "Không gian làm việc chung dành cho startup và doanh nghiệp nhỏ." },
];

function Section({ children, bg = "#fff" }: { children: React.ReactNode; bg?: string }) {
  const { ref, isInView } = useInView(0.05);
  return (
    <section ref={ref} style={{ background: bg, padding: "56px 0" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
        style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>{children}</motion.div>
    </section>
  );
}

export default function DuAnPage() {
  const [tab, setTab] = useState("Tất cả");
  const filtered = tab === "Tất cả" ? PROJECTS : PROJECTS.filter(p => p.sector === tab);

  return (
    <>
      <PageBanner label="Projects" title="Dự Án Đầu Tư" desc="Danh mục các dự án tiêu biểu đã và đang đầu tư của APEC Global trên toàn quốc" />

      <Section>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "8px 18px", borderRadius: 999, fontSize: 12.5, fontWeight: 600, cursor: "pointer", border: "1.5px solid", transition: "all 0.2s",
              background: tab === t ? "#2563eb" : "#fff", color: tab === t ? "#fff" : "#475569", borderColor: tab === t ? "#2563eb" : "#e2e8f0",
            }}>{t}</button>
          ))}
        </div>

        {/* Grid */}
        <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {filtered.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)", cursor: "pointer", transition: "box-shadow 0.3s" }}>
              <div style={{ position: "relative", height: 180, background: "#0f172a" }}>
                <Image src={p.img} alt={p.name} fill style={{ objectFit: "cover", opacity: 0.85 }} />
                <div style={{ position: "absolute", top: 10, left: 10 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 6, background: p.status.includes("vận hành") ? "rgba(34,197,94,0.9)" : "rgba(37,99,235,0.9)", color: "#fff" }}>{p.status}</span>
                </div>
              </div>
              <div style={{ padding: "16px 18px" }}>
                <div style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 15, color: "#0f172a", marginBottom: 6 }}>{p.name}</div>
                <p style={{ color: "#64748b", fontSize: 12.5, lineHeight: 1.6, marginBottom: 14, minHeight: 40 }}>{p.desc}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {[{ icon: MapPin, val: p.loc }, { icon: Calendar, val: p.year }, { icon: DollarSign, val: p.cap }, { icon: Building2, val: p.sector }].map(({ icon: I, val }, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#64748b" }}>
                      <I size={12} style={{ color: "#94a3b8" }} /> {val}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <style>{`@media(max-width:768px){.projects-grid{grid-template-columns:1fr!important}}`}</style>
      </Section>
    </>
  );
}
