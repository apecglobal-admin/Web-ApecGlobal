import Image from "next/image";
import { MapPin, Calendar, DollarSign, Building2 } from "lucide-react";
import PageBanner from "@/components/shared/PageBanner";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

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

export default function DuAnPage() {
  const data = getJsonData("projects") as any;
  const projects = data?.items || [];

  return (
    <>
      <PageBanner 
        label={data?.bannerLabel || "Projects"} 
        title={data?.bannerTitle || "Dự Án Đầu Tư"} 
        desc={data?.bannerDesc || "Danh mục các dự án tiêu biểu đã và đang đầu tư của APEC Global trên toàn quốc"} 
      />

      <section style={{ padding: "56px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>
          {/* Grid */}
          <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {projects.map((p: any, i: number) => (
              <div key={p.id || i}
                style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)", cursor: "pointer", transition: "box-shadow 0.3s" }}>
                <div style={{ position: "relative", height: 180, background: "#0f172a" }}>
                  <Image src={p.img || "/images/area-tech.jpg"} alt={p.name} fill style={{ objectFit: "cover", opacity: 0.85 }} />
                  <div style={{ position: "absolute", top: 10, left: 10 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 6, background: "rgba(37,99,235,0.9)", color: "#fff" }}>{p.status}</span>
                  </div>
                </div>
                <div style={{ padding: "16px 18px" }}>
                  <div style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 15, color: "#0f172a", marginBottom: 6 }}>{p.name}</div>
                  <p style={{ color: "#64748b", fontSize: 12.5, lineHeight: 1.6, marginBottom: 14, minHeight: 40, whiteSpace: "pre-wrap" }}>{p.desc}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {[
                      { icon: MapPin, val: p.loc }, 
                      { icon: Calendar, val: p.year }, 
                      { icon: DollarSign, val: p.cap }, 
                      { icon: Building2, val: p.sector }
                    ].map(({ icon: I, val }, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#64748b" }}>
                        <I size={12} style={{ color: "#94a3b8" }} /> {val}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){.projects-grid{grid-template-columns:1fr!important}}`}</style>
      </section>
    </>
  );
}
