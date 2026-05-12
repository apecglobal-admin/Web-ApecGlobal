"use client";
import { useAdminData } from "@/lib/useAdminData";
import { SaveBar, fieldLabel, fieldInput, fieldTextarea, card, cardTitle, grid2 } from "@/components/admin/AdminUI";
import { Plus, Trash2, MapPin, List, Facebook, Youtube, Linkedin, Instagram, Twitter, Globe, MessageCircle, Send } from "lucide-react";
import { TiktokIcon as Tiktok } from "@/components/shared/Icons";

const SOCIAL_ICONS: Record<string, any> = {
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
  tiktok: Tiktok,
  zalo: MessageCircle,
  telegram: Send,
  website: Globe,
};

export default function ContactAdminPage() {
  const { data, setData, loading, saving, saved, save } = useAdminData<any>("site", {});

  if (loading) return <p>Đang tải...</p>;

  const u = (k: string, v: any) => setData((p: any) => ({ ...p, [k]: v }));
  
  const offices = data.offices || [];
  const interests = data.interests || ["Bất động sản", "Năng lượng tái tạo", "Công nghệ", "Tài chính", "Thương mại", "Logistics", "Dịch vụ", "Khác"];
  const social = data.social || {};

  const updateOffice = (i: number, k: string, v: string) => {
    const arr = [...offices];
    arr[i] = { ...arr[i], [k]: v };
    u("offices", arr);
  };

  const addOffice = () => u("offices", [...offices, { city: "", addr: "", phone: "", email: "" }]);
  const removeOffice = (i: number) => u("offices", offices.filter((_: any, j: number) => j !== i));

  const SOCIAL_PLATFORMS = [
    { id: "facebook", label: "Facebook" },
    { id: "youtube", label: "Youtube" },
    { id: "linkedin", label: "LinkedIn" },
    { id: "tiktok", label: "TikTok" },
    { id: "instagram", label: "Instagram" },
    { id: "twitter", label: "Twitter (X)" },
    { id: "zalo", label: "Zalo" },
    { id: "telegram", label: "Telegram" },
    { id: "website", label: "Website" },
  ];

  const updateSocial = (k: string, v: string) => {
    u("social", { ...social, [k]: v });
  };
  const removeSocial = (k: string) => {
    const newSocial = { ...social };
    delete newSocial[k];
    u("social", newSocial);
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontWeight: 800, fontSize: 22, color: "#0f172a", marginBottom: 4 }}>Quản Lý Liên Hệ</h1>
        <p style={{ color: "#64748b", fontSize: 13 }}>Cấu hình Banner, Thông tin nhanh, Văn phòng và Bản đồ</p>
      </div>

      <div style={card}>
        <div style={cardTitle}>Banner trang Liên hệ</div>
        <div><label style={fieldLabel}>Label Banner</label><input style={fieldInput} value={data.contactBannerLabel || ""} onChange={e => u("contactBannerLabel", e.target.value)} /></div>
        <div style={{ marginTop: 10 }}><label style={fieldLabel}>Tiêu đề Banner</label><input style={fieldInput} value={data.contactBannerTitle || ""} onChange={e => u("contactBannerTitle", e.target.value)} /></div>
        <div style={{ marginTop: 10 }}><label style={fieldLabel}>Mô tả Banner</label><textarea rows={2} style={fieldTextarea} value={data.contactBannerDesc || ""} onChange={e => u("contactBannerDesc", e.target.value)} /></div>
      </div>

      <div style={card}>
        <div style={cardTitle}>Thông tin Liên hệ nhanh</div>
        <div style={grid2}>
          <div><label style={fieldLabel}>Hotline chính</label><input style={fieldInput} value={data.phone || ""} onChange={e => u("phone", e.target.value)} /></div>
          <div><label style={fieldLabel}>Email chính</label><input style={fieldInput} value={data.email || ""} onChange={e => u("email", e.target.value)} /></div>
        </div>
        <div style={{ marginTop: 10 }}><label style={fieldLabel}>Giờ làm việc (Có thể xuống dòng)</label><textarea rows={2} style={fieldTextarea} value={data.workingHours || "T2-T6: 8:00 – 17:30"} onChange={e => u("workingHours", e.target.value)} /></div>
      </div>

      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={cardTitle}>Mạng xã hội (Social Media)</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#64748b" }}>Thêm mới:</span>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
              {SOCIAL_PLATFORMS.filter(p => !social[p.id]).map(p => {
                const Icon = SOCIAL_ICONS[p.id] || Globe;
                return (
                  <button 
                    key={p.id}
                    onClick={() => updateSocial(p.id, "")}
                    style={{ 
                      display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", 
                      borderRadius: 6, background: "#fff", border: "1px solid #e2e8f0", 
                      cursor: "pointer", fontSize: 11, fontWeight: 600, color: "#1e293b",
                      transition: "all 0.2s"
                    }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = "#2563eb"; e.currentTarget.style.color = "#2563eb"; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#1e293b"; }}
                  >
                    <Icon size={12} /> {p.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {Object.entries(social).map(([k, v]: any) => {
            const Icon = SOCIAL_ICONS[k] || Globe;
            return (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 130, fontSize: 12, fontWeight: 700, color: "#1e293b", background: "#f1f5f9", padding: "8px 12px", borderRadius: 6, display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon size={14} style={{ color: "#2563eb" }} />
                  <span style={{ textTransform: "capitalize" }}>{SOCIAL_PLATFORMS.find(p => p.id === k)?.label || k}</span>
                </div>
                <input style={fieldInput} value={v} onChange={e => updateSocial(k, e.target.value)} placeholder={`Nhập đường dẫn ${k}...`} />
                <button onClick={() => removeSocial(k)} style={{ border: "none", background: "none", cursor: "pointer", color: "#ef4444", padding: 4 }}><Trash2 size={16} /></button>
              </div>
            );
          })}
          {Object.keys(social).length === 0 && <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", fontStyle: "italic" }}>Chưa có mạng xã hội nào được thêm.</p>}
        </div>
      </div>

      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={cardTitle}>Danh sách Văn phòng / Chi nhánh</div>
          <button onClick={addOffice} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 6, background: "#f1f5f9", border: "1px solid #e2e8f0", cursor: "pointer", fontSize: 12, fontWeight: 600 }}><Plus size={14} /> Thêm văn phòng</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {offices.map((o: any, i: number) => (
            <div key={i} style={{ padding: 16, border: "1px solid #f1f5f9", borderRadius: 12, position: "relative" }}>
              <button onClick={() => removeOffice(i)} style={{ position: "absolute", top: 12, right: 12, border: "none", background: "none", cursor: "pointer", color: "#ef4444" }}><Trash2 size={16} /></button>
              <div style={grid2}>
                <div><label style={fieldLabel}>Tên chi nhánh / Thành phố</label><input style={fieldInput} value={o.city || ""} onChange={e => updateOffice(i, "city", e.target.value)} /></div>
                <div><label style={fieldLabel}>Số điện thoại</label><input style={fieldInput} value={o.phone || ""} onChange={e => updateOffice(i, "phone", e.target.value)} /></div>
              </div>
              <div style={{ marginTop: 10 }}><label style={fieldLabel}>Địa chỉ chi tiết</label><input style={fieldInput} value={o.addr || ""} onChange={e => updateOffice(i, "addr", e.target.value)} /></div>
              <div style={{ marginTop: 10 }}><label style={fieldLabel}>Email chi nhánh</label><input style={fieldInput} value={o.email || ""} onChange={e => updateOffice(i, "email", e.target.value)} /></div>
            </div>
          ))}
        </div>
      </div>

      <div style={card}>
        <div style={cardTitle}>Cấu hình Google Map (Iframe Embed URL)</div>
        <p style={{ fontSize: 12, color: "#64748b", marginBottom: 10 }}>Vào Google Maps, chọn "Chia sẻ" -> "Nhúng bản đồ" -> Copy phần URL trong thuộc tính src="..."</p>
        <textarea rows={3} style={fieldTextarea} value={data.mapUrl || ""} onChange={e => u("mapUrl", e.target.value)} placeholder="https://www.google.com/maps/embed?pb=..." />
      </div>

      <div style={card}>
        <div style={cardTitle}>Lĩnh vực quan tâm (Trong Form Liên hệ)</div>
        <label style={fieldLabel}>Danh sách các lựa chọn (Mỗi dòng 1 lĩnh vực)</label>
        <textarea rows={5} style={fieldTextarea} value={interests.join("\n")} onChange={e => u("interests", e.target.value.split("\n").filter(Boolean))} />
      </div>

      <SaveBar saving={saving} saved={saved} onSave={() => save()} />
    </div>
  );
}
