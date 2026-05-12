import Image from "next/image";
import { Cpu, LineChart, ShoppingBag, HeartPulse, CheckCircle2, ArrowRight, Layers, Zap, Globe, Users, MapPin, Star, Globe2 } from "lucide-react";
import PageBanner from "@/components/shared/PageBanner";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const ICON_MAP: any = {
  Cpu, LineChart, ShoppingBag, HeartPulse, Layers, Zap, Globe, Users, MapPin, Star, Globe2
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
  return [];
}

function Section({ children, bg = "#fff" }: { children: React.ReactNode; bg?: string }) {
  return (
    <section style={{ background: bg, padding: "56px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>{children}</div>
    </section>
  );
}

export default function HeSinhThaiPage() {
  const data = getJsonData("ecosystem") as any;
  const ECOSYSTEMS = data?.items || [];
  const STATS = getJsonData("stats") || [];

  return (
    <>
      <PageBanner 
        label={data?.bannerLabel || "Ecosystem"} 
        title={data?.bannerTitle || "Hệ Sinh Thái APEC Global"} 
        desc={data?.bannerDesc || "Hệ sinh thái đa ngành kết nối Công nghệ – Tài chính – Thương mại – Dịch vụ, tạo giá trị bền vững"} 
      />

      {/* Stats overview */}
      <Section>
        <div className="eco-stats" style={{ display: "grid", gridTemplateColumns: `repeat(${STATS.length || 4},1fr)`, gap: 16 }}>
          {STATS.map((s: any, i: number) => {
            const Icon = ICON_MAP[s.icon] || Zap;
            return (
              <div key={i} style={{ textAlign: "center", padding: "24px 16px", background: "#f0f7ff", borderRadius: 14, border: "1px solid #dbeafe" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(37,99,235,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <Icon size={22} style={{ color: "#2563eb" }} />
                </div>
                <div style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: 28, color: "#2563eb", marginBottom: 4 }}>{s.value}</div>
                <div style={{ color: "#64748b", fontSize: 13, fontWeight: 500 }}>{s.label}</div>
              </div>
            );
          })}
        </div>
        <style>{`@media(max-width:768px){.eco-stats{grid-template-columns:repeat(2,1fr)!important}}`}</style>
      </Section>

      {/* Each ecosystem */}
      {ECOSYSTEMS.map((eco: any, i: number) => (
        <Section key={i} bg={i % 2 === 1 ? "#f8fafc" : "#fff"}>
          <div className={`eco-detail eco-detail-${i}`} style={{ display: "grid", gridTemplateColumns: i % 2 === 0 ? "1fr 1.2fr" : "1.2fr 1fr", gap: 36, alignItems: "center" }}>
            {i % 2 === 1 && (
              <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "4/3" }}>
                <Image src={eco.img || "/images/area-tech.jpg"} alt={eco.title} fill style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg,${eco.color}22,transparent)` }} />
              </div>
            )}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${eco.color}10`, border: `1.5px solid ${eco.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 20 }}>{eco.icon}</span>
                </div>
                <div>
                  <div style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 16, color: eco.color, letterSpacing: "0.03em" }}>{eco.title}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>{eco.sub}</div>
                </div>
              </div>
              <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.75, marginBottom: 18, whiteSpace: "pre-wrap" }}>{eco.desc || "Kiến tạo giá trị bền vững và đồng hành cùng sự phát triển thịnh vượng."}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {(eco.items || []).map((item: string) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, color: "#334155", fontSize: 13.5 }}>
                    <CheckCircle2 size={15} style={{ color: eco.color, flexShrink: 0 }} /> {item}
                  </div>
                ))}
              </div>
            </div>
            {i % 2 === 0 && (
              <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "4/3" }}>
                <Image src={eco.img || "/images/area-tech.jpg"} alt={eco.title} fill style={{ objectFit: "cover" }} />
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
