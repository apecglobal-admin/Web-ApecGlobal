import { Shield, TrendingUp, Scale, Leaf, Building2, Globe, Cpu, LineChart, ShoppingBag, ArrowRight } from "lucide-react";
import PageBanner from "@/components/shared/PageBanner";
import Link from "next/link";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const ICON_MAP: any = {
  Shield, TrendingUp, Scale, Leaf, Building2, Globe, Cpu, LineChart, ShoppingBag
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

export default function ChinhSachDauTuPage() {
  const data = getJsonData("investment-policy") || {};
  const investmentPolicies = data.investmentPolicies || [];
  const principles = data.principles || [];
  const process = data.process || [];

  return (
    <>
      <PageBanner 
        label={data.bannerLabel || "Investment Policy"} 
        title={data.bannerTitle || "Chính Sách Đầu Tư"} 
        desc={data.bannerDesc || "Quy trình đầu tư minh bạch, hiệu quả và bền vững – Tạo giá trị dài hạn cho nhà đầu tư"} 
      />

      {/* Chính sách từ Admin */}
      <Section>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "#0f172a" }}>
            Chính Sách <span style={{ color: "#2563eb" }}>Đầu Tư</span>
          </h2>
        </div>
        <div className="policies-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
          {investmentPolicies.map((p: any, i: number) => (
            <div key={i} style={{ padding: "24px 20px", background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(37,99,235,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Shield size={20} style={{ color: "#2563eb" }} />
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#0f172a" }}>{p.title}</div>
              </div>
              <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.6, margin: 0, whiteSpace: "pre-wrap" }}>{p.desc}</p>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){.policies-grid{grid-template-columns:1fr!important}}`}</style>
      </Section>

      {/* Nguyên tắc */}
      <Section bg="#f8fafc">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "#0f172a" }}>
            Nguyên Tắc <span style={{ color: "#2563eb" }}>Đầu Tư</span>
          </h2>
        </div>
        <div className="principles-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {principles.map((p: any, i: number) => {
            const Icon = ICON_MAP[p.icon] || Shield;
            return (
              <div key={i} style={{ padding: "24px 20px", background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", textAlign: "center", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: `rgba(37,99,235,0.1)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                  <Icon size={22} style={{ color: "#2563eb" }} />
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", marginBottom: 6 }}>{p.title}</div>
                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6, margin: 0, whiteSpace: "pre-wrap" }}>{p.desc}</p>
              </div>
            );
          })}
        </div>
        <style>{`@media(max-width:768px){.principles-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
      </Section>

      {/* Quy trình */}
      <Section>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "#0f172a" }}>
            Quy Trình <span style={{ color: "#2563eb" }}>Đầu Tư</span>
          </h2>
        </div>
        <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {process.map((p: any, i: number) => (
            <div key={i} style={{ position: "relative" }}>
              <div style={{ padding: "24px 20px", background: "#f8fafc", borderRadius: 14, border: "1px solid #e2e8f0", height: "100%" }}>
                <div style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: 32, color: "#dbeafe", marginBottom: 10 }}>{p.step}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a", marginBottom: 6 }}>{p.title}</div>
                <p style={{ color: "#64748b", fontSize: 12.5, lineHeight: 1.6, margin: 0, whiteSpace: "pre-wrap" }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){.process-grid{grid-template-columns:1fr!important}}`}</style>
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
