"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Mail, Phone, MapPin, Send } from "lucide-react";
import Link from "next/link";
import { useInView } from "@/lib/hooks";

interface NewsItem { id: string; title: string; cat: string; date: string; img: string; excerpt?: string; slug?: string; }
interface SiteData { phone: string; email: string; address: string; }
interface Props { data?: NewsItem[]; site?: SiteData; }

const DEFAULT_NEWS: NewsItem[] = [
  { id: "1", title: "APEC Global ký kết hợp tác chiến lược với tập đoàn hàng đầu Nhật Bản", cat: "Sự kiện", date: "15/03/2024", img: "/images/news-1.jpg", slug: "apec-global-ky-ket-hop-tac-chien-luoc" },
  { id: "2", title: "Ra mắt nền tảng AI hàng đầu Việt Nam – APEC AI Assistant", cat: "Công nghệ", date: "08/03/2024", img: "/images/news-2.jpg", slug: "ra-mat-nen-tang-ai-hang-dau-viet-nam" },
  { id: "3", title: "Quỹ đầu tư APEC Capital đạt mốc 1.000 tỷ VNĐ tổng tài sản", cat: "Đầu tư", date: "01/03/2024", img: "/images/news-3.jpg", slug: "quy-dau-tu-apec-capital-dat-moc-1000-ty" },
];

export default function NewsAndContactSection({ data, site }: Props) {
  const { ref, isInView } = useInView(0.1);
  const [form, setForm] = useState({ name: "", phone: "", email: "", note: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const newsItems = Array.isArray(data) ? data : (data as any)?.items || [];
  const news = newsItems.length > 0 ? newsItems.slice(0, 3) : DEFAULT_NEWS;
  const contact = { phone: site?.phone || "1800 1234", email: site?.email || "info@apecglobal.vn", address: site?.address || "Tầng 15, Apec Tower, 39 Láng Hạ, Hà Nội" };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false); setSent(true);
  };

  const inp: React.CSSProperties = { width: "100%", padding: "12px 16px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13, color: "#0f172a", outline: "none", background: "#f8fafc", boxSizing: "border-box" };

  return (
    <section ref={ref} className="section-padding" style={{ background: "#fff" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-[60px]">
          
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, background: "rgba(37,99,235,0.08)", color: "#2563eb", fontWeight: 700, fontSize: 11, letterSpacing: "0.06em", marginBottom: 16 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2563eb" }} /> TIN TỨC MỚI NHẤT
            </div>
            <h2 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#0f172a", marginBottom: 32 }}>
              Hoạt Động <span style={{ color: "#2563eb" }}>Sự Kiện</span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 32 }}>
              {news.map((item: NewsItem, i: number) => (
                <Link key={item.id || i} href={`/tin-tuc/${item.slug || item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="news-item" style={{ display: "flex", gap: 20, alignItems: "center", padding: 16, borderRadius: 16, background: "#f8fafc", border: "1px solid #e2e8f0", transition: "all 0.3s", cursor: "pointer" }} onMouseOver={e => e.currentTarget.style.borderColor = "#93c5fd"} onMouseOut={e => e.currentTarget.style.borderColor = "#e2e8f0"}>
                    <div className="news-img" style={{ width: 120, height: 90, borderRadius: 10, overflow: "hidden", flexShrink: 0, position: "relative", background: "#0f172a" }}>
                      <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${item.img}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
                    </div>
                    <div>
                      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: "#2563eb", background: "rgba(37,99,235,0.1)", padding: "2px 8px", borderRadius: 4, textTransform: "uppercase" }}>{item.cat}</span>
                        <span style={{ fontSize: 11, color: "#64748b", display: "flex", alignItems: "center", gap: 4 }}><Calendar size={12} /> {item.date}</span>
                      </div>
                      <h3 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 15, color: "#0f172a", lineHeight: 1.4, margin: 0 }}>{item.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/tin-tuc" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700, color: "#0f172a", textDecoration: "none" }}>
              XEM TẤT CẢ TIN TỨC <ArrowRight size={16} style={{ color: "#2563eb" }} />
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
            <div style={{ background: "#0f172a", borderRadius: 24, padding: 40, color: "#fff", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, background: "radial-gradient(circle,rgba(37,99,235,0.3),transparent 70%)", filter: "blur(40px)" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <h3 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 24, marginBottom: 8 }}>Liên Hệ Tư Vấn</h3>
                <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 28, lineHeight: 1.6 }}>Để lại thông tin, đội ngũ chuyên gia của chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
                {sent ? (
                  <div style={{ background: "rgba(22,163,74,0.1)", border: "1px solid rgba(22,163,74,0.2)", borderRadius: 12, padding: 24, textAlign: "center" }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#16a34a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>✓</div>
                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Gửi thành công!</div>
                    <div style={{ color: "#cbd5e1", fontSize: 13 }}>Chúng tôi sẽ phản hồi trong 24h tới.</div>
                  </div>
                ) : (
                  <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <input style={inp} placeholder="Họ và tên *" required value={form.name} onChange={e => setForm((p: any) => ({ ...p, name: e.target.value }))} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input style={inp} placeholder="Số điện thoại *" type="tel" required value={form.phone} onChange={e => setForm((p: any) => ({ ...p, phone: e.target.value }))} />
                      <input style={inp} placeholder="Email" type="email" value={form.email} onChange={e => setForm((p: any) => ({ ...p, email: e.target.value }))} />
                    </div>
                    <textarea style={{ ...inp, resize: "vertical", minHeight: 80 }} placeholder="Nội dung cần tư vấn..." value={form.note} onChange={e => setForm((p: any) => ({ ...p, note: e.target.value }))} />
                    <button type="submit" disabled={loading} style={{ background: "linear-gradient(135deg,#1d4ed8,#2563eb)", color: "#fff", border: "none", borderRadius: 8, padding: 14, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 8, opacity: loading ? 0.7 : 1 }}>
                      {loading ? "Đang gửi..." : <>GỬI YÊU CẦU <Send size={16} /></>}
                    </button>
                  </form>
                )}
                <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13, color: "#cbd5e1" }}><Phone size={16} style={{ color: "#38bdf8" }} /> {contact.phone}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13, color: "#cbd5e1" }}><Mail size={16} style={{ color: "#38bdf8" }} /> {contact.email}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13, color: "#cbd5e1" }}><MapPin size={16} style={{ color: "#38bdf8" }} /> {contact.address}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`@media(max-width:640px){.news-item{flex-direction:column!important;align-items:stretch!important;gap:12px!important}.news-img{width:100%!important;height:180px!important}}`}</style>
    </section>
  );
}
