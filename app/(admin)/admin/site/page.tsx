"use client";
import { useAdminData } from "@/lib/useAdminData";
import { SaveBar, fieldLabel, fieldInput, card, cardTitle, grid2 } from "@/components/admin/AdminUI";
import ImagePicker from "@/components/admin/ImagePicker";

export default function SitePage() {
  const { data, setData, loading, saving, saved, save } = useAdminData("site", {} as any);
  if (loading) return <p>Đang tải...</p>;
  const u = (k: string, v: any) => setData((p: any) => ({ ...p, [k]: v }));

  const updateOffice = (i: number, k: string, v: string) => {
    const arr = [...(data.offices || [])]; arr[i] = { ...arr[i], [k]: v };
    u("offices", arr);
  };

  return (
    <div>
      <h1 style={{ fontWeight: 800, fontSize: 22, color: "#0f172a", marginBottom: 4 }}>Cấu Hình Chung</h1>
      <p style={{ color: "#64748b", fontSize: 13, marginBottom: 24 }}>Logo, thương hiệu, thông tin liên hệ và văn phòng</p>

      <div style={card}>
        <div style={cardTitle}>Banner trang Liên hệ</div>
        <div><label style={fieldLabel}>Label Banner</label><input style={fieldInput} value={data.contactBannerLabel || ""} onChange={e => u("contactBannerLabel", e.target.value)} /></div>
        <div style={{ marginTop: 10 }}><label style={fieldLabel}>Tiêu đề Banner</label><input style={fieldInput} value={data.contactBannerTitle || ""} onChange={e => u("contactBannerTitle", e.target.value)} /></div>
        <div style={{ marginTop: 10 }}><label style={fieldLabel}>Mô tả Banner</label><input style={fieldInput} value={data.contactBannerDesc || ""} onChange={e => u("contactBannerDesc", e.target.value)} /></div>
      </div>

      <div style={card}>
        <div style={cardTitle}>Danh sách văn phòng (Trang Liên hệ)</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {(data.offices || []).map((o: any, i: number) => (
            <div key={i} style={{ padding: 12, border: "1px solid #f1f5f9", borderRadius: 10 }}>
              <div><label style={fieldLabel}>Tên / Thành phố</label><input style={fieldInput} value={o.city || ""} onChange={e => updateOffice(i, "city", e.target.value)} /></div>
              <div style={{ marginTop: 8 }}><label style={fieldLabel}>Địa chỉ</label><input style={fieldInput} value={o.addr || ""} onChange={e => updateOffice(i, "addr", e.target.value)} /></div>
              <div style={{ marginTop: 8 }}><label style={fieldLabel}>Điện thoại</label><input style={fieldInput} value={o.phone || ""} onChange={e => updateOffice(i, "phone", e.target.value)} /></div>
              <div style={{ marginTop: 8 }}><label style={fieldLabel}>Email</label><input style={fieldInput} value={o.email || ""} onChange={e => updateOffice(i, "email", e.target.value)} /></div>
            </div>
          ))}
        </div>
      </div>

      <div style={card}>
        <div style={cardTitle}>Lĩnh vực quan tâm (Trang Liên hệ)</div>
        <textarea rows={3} style={{ ...fieldInput, resize: "vertical" as const }} 
          value={(data.interests || []).join("\n")} 
          onChange={e => u("interests", e.target.value.split("\n").filter(Boolean))} 
          placeholder="Mỗi dòng một lĩnh vực..."
        />
      </div>

      <div style={card}>
        <div style={cardTitle}>Thương hiệu</div>
        <ImagePicker label="Logo (Tỷ lệ gợi ý: Vuông 1:1 hoặc Chữ nhật ngang 3:1, nền trong suốt PNG)" value={data.logo || ""} onChange={v => u("logo", v)} />
        <div style={grid2}>
          <div><label style={fieldLabel}>Tên thương hiệu</label><input style={fieldInput} value={data.brandName || ""} onChange={e => u("brandName", e.target.value)} /></div>
          <div><label style={fieldLabel}>Slogan</label><input style={fieldInput} value={data.slogan || ""} onChange={e => u("slogan", e.target.value)} /></div>
        </div>
      </div>

      <div style={card}>
        <div style={cardTitle}>Liên hệ</div>
        <div style={grid2}>
          <div><label style={fieldLabel}>Số điện thoại</label><input style={fieldInput} value={data.phone || ""} onChange={e => u("phone", e.target.value)} /></div>
          <div><label style={fieldLabel}>Email</label><input style={fieldInput} value={data.email || ""} onChange={e => u("email", e.target.value)} /></div>
        </div>
        <div style={{ marginTop: 12 }}><label style={fieldLabel}>Địa chỉ</label><input style={fieldInput} value={data.address || ""} onChange={e => u("address", e.target.value)} /></div>
      </div>

      <div style={card}>
        <div style={cardTitle}>Mạng xã hội</div>
        <div style={grid2}>
          <div><label style={fieldLabel}>Facebook</label><input style={fieldInput} value={data.social?.facebook || ""} onChange={e => u("social", { ...data.social, facebook: e.target.value })} /></div>
          <div><label style={fieldLabel}>Youtube</label><input style={fieldInput} value={data.social?.youtube || ""} onChange={e => u("social", { ...data.social, youtube: e.target.value })} /></div>
          <div><label style={fieldLabel}>LinkedIn</label><input style={fieldInput} value={data.social?.linkedin || ""} onChange={e => u("social", { ...data.social, linkedin: e.target.value })} /></div>
        </div>
      </div>

      <SaveBar saving={saving} saved={saved} onSave={() => save()} />
    </div>
  );
}
