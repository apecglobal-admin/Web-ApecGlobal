import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Compass, Star, Users, Globe, Heart, Lightbulb, Target, Award, Shield, TrendingUp, Building2, Sun, HandHeart, Brain } from "lucide-react";
import PageBanner from "@/components/shared/PageBanner";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const ICON_MAP: any = {
  Sun, Heart, HandHeart, Brain, Users, Star, Globe, Lightbulb, Shield
};

function getJsonData(filename: string) {
  try {
    const filePath = path.join(process.cwd(), "data", `${filename}.json`);
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(fileData);
    }
  } catch (error) {
    console.error(`Error reading ${filename}.json:`, error);
  }
  return null;
}

function Section({ children, bg = "#fff" }: { children: React.ReactNode; bg?: string }) {
  return (
    <section style={{ background: bg, padding: "56px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>
        {children}
      </div>
    </section>
  );
}

export default function GioiThieuPage() {
  const data = getJsonData("about") || {};
  const vision = data.vision || {};
  const mission = data.mission || {};
  const coreValues = data.coreValues || [];
  const timeline = data.timeline || [];
  const leaders = data.leaders || [];

  return (
    <>
      <PageBanner 
        label={data.bannerLabel || "Về chúng tôi"} 
        title={data.bannerTitle || "Giới Thiệu APEC Global"} 
        desc={data.bannerDesc || "Tập đoàn đầu tư đa ngành hàng đầu Việt Nam – Kiến tạo giá trị, sở hữu tương lai"} 
      />

      {/* Tầm nhìn & Sứ mệnh */}
      <Section>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", color: "#2563eb", marginBottom: 8, textTransform: "uppercase" }}>Tầm nhìn & Sứ mệnh</div>
            <h2 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.4rem,2.6vw,2rem)", color: "#0f172a", lineHeight: 1.25, marginBottom: 18, whiteSpace: "pre-wrap" }}>
              {data.heading || "Kiến tạo hệ sinh thái vững bền toàn cầu"}
            </h2>
            <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
              <div style={{ flex: 1, padding: "18px 16px", background: "#f0f7ff", borderRadius: 12, border: "1px solid #dbeafe" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(37,99,235,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Eye size={16} style={{ color: "#2563eb" }} />
                  </div>
                  <span style={{ fontWeight: 700, fontSize: 13, color: "#0f172a" }}>{vision.title || "Tầm nhìn"}</span>
                </div>
                <p style={{ color: "#64748b", fontSize: 12.5, lineHeight: 1.65, margin: 0, whiteSpace: "pre-wrap" }}>{vision.content || "Trở thành tập đoàn đầu tư – tài chính dẫn đầu khu vực Đông Nam Á, kiến tạo hệ sinh thái doanh nghiệp Việt Nam vươn tầm quốc tế."}</p>
              </div>
              <div style={{ flex: 1, padding: "18px 16px", background: "#f0f7ff", borderRadius: 12, border: "1px solid #dbeafe" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(37,99,235,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Compass size={16} style={{ color: "#2563eb" }} />
                  </div>
                  <span style={{ fontWeight: 700, fontSize: 13, color: "#0f172a" }}>{mission.title || "Sứ mệnh"}</span>
                </div>
                <p style={{ color: "#64748b", fontSize: 12.5, lineHeight: 1.65, margin: 0, whiteSpace: "pre-wrap" }}>{mission.content || "Kết nối giá trị – Nâng đỡ doanh nghiệp – Kiến tạo tương lai bền vững cho cộng đồng và nền kinh tế quốc gia."}</p>
              </div>
            </div>
            <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.7, marginBottom: 20, whiteSpace: "pre-wrap" }}>
              {data.description1}
            </p>
            <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.75, whiteSpace: "pre-wrap" }}>
              {data.description2}
            </p>
          </div>
          <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "4/3" }}>
            <Image src={data.officeImg || "/images/area-realestate.jpg"} alt={data.officeTitle || "APEC Global Office"} fill style={{ objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 18px", background: "linear-gradient(0deg,rgba(0,0,0,0.75),transparent)" }}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{data.officeTitle || "Trụ sở APEC Global"}</div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>{data.officeAddress || "Tầng 15, Apec Tower, Hà Nội"}</div>
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
          {coreValues.map((v: any, i: number) => {
            const Icon = ICON_MAP[v.icon] || Star;
            return (
              <div key={i} style={{ padding: "22px 20px", background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", display: "flex", gap: 14, alignItems: "flex-start", transition: "box-shadow 0.3s", cursor: "pointer" }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(37,99,235,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={18} style={{ color: "#2563eb" }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a", marginBottom: 4 }}>{v.label}</div>
                  <p style={{ color: "#64748b", fontSize: 12.5, lineHeight: 1.6, margin: 0 }}>{v.desc}</p>
                </div>
              </div>
            );
          })}
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
          {timeline.map((t: any, i: number) => (
            <div key={i} style={{ position: "relative", marginBottom: 32, paddingLeft: 24 }}>
              <div style={{ position: "absolute", left: -32, top: 4, width: 28, height: 28, borderRadius: "50%", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 4px #dbeafe" }}>
                <span style={{ color: "#fff", fontSize: 9, fontWeight: 700 }}>{t.year}</span>
              </div>
              <div style={{ padding: "16px 20px", background: "#f8fafc", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                <div style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 14, color: "#0f172a", marginBottom: 4 }}>{t.title}</div>
                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6, margin: 0, whiteSpace: "pre-wrap" }}>{t.desc}</p>
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
          {leaders.map((l: any, i: number) => (
            <div key={i} style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #e2e8f0", textAlign: "center" }}>
              <div style={{ position: "relative", height: 180, background: "#0f172a" }}>
                <Image src={l.img || "/images/area-tech.jpg"} alt={l.name} fill style={{ objectFit: "cover", opacity: 0.8 }} />
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
