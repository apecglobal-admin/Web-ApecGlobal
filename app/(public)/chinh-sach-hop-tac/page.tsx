import { Handshake, Building2, TrendingUp, Globe, Share2, Target, Users, Award, Shield, CheckCircle2, ArrowRight } from "lucide-react";
import PageBanner from "@/components/shared/PageBanner";
import Link from "next/link";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const ICON_MAP: any = {
  Handshake, Building2, TrendingUp, Globe, Share2, Target, Users, Award, Shield
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
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>{children}</div>
    </section>
  );
}

export default function ChinhSachHopTacPage() {
  const data = getJsonData("cooperation-policy") || {};
  const cooperationTypes = data.cooperationTypes || [];
  const coopModels = data.coopModels || [];
  const coopProcess = data.coopProcess || [];

  return (
    <>
      <PageBanner 
        label={data.coopBannerLabel || "Partnership Policy"} 
        title={data.coopBannerTitle || "Chính Sách Hợp Tác"} 
        desc={data.coopBannerDesc || "Đa dạng mô hình hợp tác – Tối ưu giá trị cho đối tác – Cùng phát triển bền vững"} 
      />

      {/* Các loại hình hợp tác từ Admin */}
      {cooperationTypes.length > 0 && (
        <Section>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "#0f172a" }}>
              Các Loại Hình <span style={{ color: "#2563eb" }}>Đối Tác</span>
            </h2>
          </div>
          <div className="coop-types-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {cooperationTypes.map((c: any, i: number) => (
              <div key={i} style={{ padding: "20px", background: "#f0f7ff", borderRadius: 12, border: "1px solid #dbeafe", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <CheckCircle2 size={18} style={{ color: "#2563eb" }} />
                <span style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>{c.label}</span>
              </div>
            ))}
          </div>
          <style>{`@media(max-width:768px){.coop-types-grid{grid-template-columns:1fr!important}}`}</style>
        </Section>
      )}

      {/* Mô hình hợp tác */}
      <Section bg={cooperationTypes.length > 0 ? "#f8fafc" : "#fff"}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "#0f172a" }}>
            Mô Hình <span style={{ color: "#2563eb" }}>Hợp Tác</span>
          </h2>
        </div>
        <div className="coop-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {coopModels.map((m: any, i: number) => {
            const Icon = ICON_MAP[m.icon] || Handshake;
            const features = (m.features || "").split("\n").filter(Boolean);
            return (
              <div key={i} style={{ padding: "24px 20px", background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)", transition: "box-shadow 0.3s" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(37,99,235,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <Icon size={20} style={{ color: "#2563eb" }} />
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", marginBottom: 6 }}>{m.title}</div>
                <p style={{ color: "#64748b", fontSize: 12.5, lineHeight: 1.6, marginBottom: 14, whiteSpace: "pre-wrap" }}>{m.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {features.map((f: string) => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#475569" }}>
                      <CheckCircle2 size={13} style={{ color: "#2563eb", flexShrink: 0 }} /> {f}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <style>{`@media(max-width:768px){.coop-grid{grid-template-columns:1fr!important}}`}</style>
      </Section>

      {/* Quy trình */}
      <Section bg={cooperationTypes.length > 0 ? "#fff" : "#f8fafc"}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "#0f172a" }}>
            Quy Trình <span style={{ color: "#2563eb" }}>Hợp Tác</span>
          </h2>
        </div>
        <div className="coop-process" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {coopProcess.map((p: any, i: number) => (
            <div key={i} style={{ position: "relative" }}>
              <div style={{ padding: "24px 20px", background: "#f8fafc", borderRadius: 14, border: "1px solid #e2e8f0", height: "100%", textAlign: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#1d4ed8,#2563eb)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <span style={{ color: "#fff", fontWeight: 900, fontSize: 16, fontFamily: "Montserrat,sans-serif" }}>{p.step}</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a", marginBottom: 6 }}>{p.title}</div>
                <p style={{ color: "#64748b", fontSize: 12.5, lineHeight: 1.6, margin: 0, whiteSpace: "pre-wrap" }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){.coop-process{grid-template-columns:1fr!important}}`}</style>
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
