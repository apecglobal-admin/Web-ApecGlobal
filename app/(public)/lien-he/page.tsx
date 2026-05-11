"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, User, Building2, MessageSquare, CheckCircle, Facebook, Youtube, Linkedin } from "lucide-react";
import PageBanner from "@/components/shared/PageBanner";
import { useInView } from "@/lib/hooks";

const OFFICES = [
  { city: "Hà Nội (Trụ sở)", addr: "Tầng 15, Apec Tower, 39 Láng Hạ, Đống Đa", phone: "024 3123 4567", email: "hanoi@apecglobal.vn" },
  { city: "TP. Hồ Chí Minh", addr: "Tầng 20, Landmark 81, Bình Thạnh", phone: "028 3987 6543", email: "hcm@apecglobal.vn" },
  { city: "Đà Nẵng", addr: "Tầng 10, Indochina Riverside, Hải Châu", phone: "0236 3456 789", email: "danang@apecglobal.vn" },
];

const INTERESTS = ["Bất động sản", "Năng lượng tái tạo", "Công nghệ", "Tài chính", "Thương mại", "Logistics", "Dịch vụ", "Khác"];

function Section({ children, bg = "#fff" }: { children: React.ReactNode; bg?: string }) {
  const { ref, isInView } = useInView(0.08);
  return (
    <section ref={ref} style={{ background: bg, padding: "56px 0" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
        style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>{children}</motion.div>
    </section>
  );
}

export default function LienHePage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", interest: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setDone(true);
  };

  const inp: React.CSSProperties = { width: "100%", padding: "11px 14px", borderRadius: 8, fontSize: 13.5, color: "#0f172a", background: "#fff", border: "1.5px solid #e2e8f0", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" };

  return (
    <>
      <PageBanner label="Contact Us" title="Liên Hệ Với Chúng Tôi" desc="Đội ngũ APEC Global luôn sẵn sàng hỗ trợ và tư vấn cho quý khách hàng" />

      <Section>
        <div className="contact-layout" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 36, alignItems: "start" }}>
          {/* Form */}
          <div>
            <h2 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 20, color: "#0f172a", marginBottom: 6 }}>
              Gửi Yêu Cầu <span style={{ color: "#2563eb" }}>Tư Vấn</span>
            </h2>
            <p style={{ color: "#64748b", fontSize: 13.5, marginBottom: 24, lineHeight: 1.6 }}>Vui lòng điền thông tin bên dưới, chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.</p>

            {done ? (
              <div style={{ textAlign: "center", padding: "48px 24px", background: "#f0f7ff", borderRadius: 16, border: "1px solid #dbeafe" }}>
                <CheckCircle size={52} style={{ color: "#2563eb", marginBottom: 14 }} />
                <h3 style={{ fontWeight: 700, fontSize: 18, color: "#0f172a", marginBottom: 8 }}>Gửi thành công!</h3>
                <p style={{ color: "#64748b", fontSize: 14, marginBottom: 20 }}>Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong 24 giờ.</p>
                <button onClick={() => { setDone(false); setForm({ name: "", email: "", phone: "", company: "", interest: "", message: "" }); }}
                  style={{ padding: "10px 24px", borderRadius: 8, background: "#2563eb", color: "#fff", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>
                  Gửi yêu cầu mới
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 5 }}>Họ và tên *</label>
                    <input type="text" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Nhập họ và tên" style={inp} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 5 }}>Email *</label>
                    <input type="email" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="email@example.com" style={inp} />
                  </div>
                </div>
                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 5 }}>Số điện thoại *</label>
                    <input type="tel" required value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="0xx xxx xxxx" style={inp} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 5 }}>Công ty</label>
                    <input type="text" value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} placeholder="Tên công ty (nếu có)" style={inp} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 5 }}>Lĩnh vực quan tâm</label>
                  <select value={form.interest} onChange={e => setForm(p => ({ ...p, interest: e.target.value }))} style={{ ...inp, appearance: "none", color: form.interest ? "#0f172a" : "#94a3b8" }}>
                    <option value="">Chọn lĩnh vực</option>
                    {INTERESTS.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 5 }}>Nội dung *</label>
                  <textarea required rows={4} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Mô tả yêu cầu tư vấn của bạn..." style={{ ...inp, resize: "vertical" }} />
                </div>
                <button type="submit" disabled={loading} style={{ width: "100%", padding: 13, borderRadius: 8, fontSize: 14, fontWeight: 700, color: "#fff", background: "linear-gradient(135deg,#1d4ed8,#2563eb)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 16px rgba(37,99,235,0.35)", opacity: loading ? 0.7 : 1 }}>
                  {loading ? "Đang gửi..." : <><span>GỬI YÊU CẦU TƯ VẤN</span><Send size={15} /></>}
                </button>
              </form>
            )}
            <style>{`@media(max-width:768px){.contact-layout{grid-template-columns:1fr!important}.form-row{grid-template-columns:1fr!important}}`}</style>
          </div>

          {/* Info sidebar */}
          <div>
            {/* Quick contact */}
            <div style={{ padding: "24px 22px", background: "linear-gradient(150deg,#1d4ed8,#2563eb,#0284c7)", borderRadius: 16, marginBottom: 20, color: "#fff" }}>
              <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 16, fontFamily: "Montserrat,sans-serif" }}>Liên Hệ Nhanh</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { icon: Phone, label: "Hotline", val: "1800 1234" },
                  { icon: Mail, label: "Email", val: "info@apecglobal.vn" },
                  { icon: Clock, label: "Giờ làm việc", val: "T2-T6: 8:00 – 17:30" },
                ].map(({ icon: I, label, val }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <I size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, opacity: 0.7 }}>{label}</div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{val}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
                {[Facebook, Youtube, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", textDecoration: "none" }}>
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Offices */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {OFFICES.map((o, i) => (
                <div key={i} style={{ padding: "18px 18px", background: "#f8fafc", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                    <MapPin size={14} style={{ color: "#2563eb" }} /> {o.city}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ fontSize: 12.5, color: "#64748b" }}>{o.addr}</div>
                    <div style={{ fontSize: 12.5, color: "#64748b" }}>☎ {o.phone}</div>
                    <div style={{ fontSize: 12.5, color: "#2563eb" }}>{o.email}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Map */}
      <Section bg="#f8fafc">
        <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #e2e8f0", height: 360 }}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096954095!2d105.8131!3d21.0285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDAxJzQyLjYiTiAxMDXCsDQ4JzQ3LjIiRQ!5e0!3m2!1svi!2svn!4v1234567890"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
        </div>
      </Section>
    </>
  );
}
