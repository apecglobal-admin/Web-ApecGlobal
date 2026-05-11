"use client";
import { useAdminData } from "@/lib/useAdminData";
import { SaveBar, fieldLabel, fieldInput, card, cardTitle, grid2 } from "@/components/admin/AdminUI";
import ImagePicker from "@/components/admin/ImagePicker";

export default function SitePage() {
  const { data, setData, loading, saving, saved, save } = useAdminData("site", {} as any);
  if (loading) return <p>Đang tải...</p>;
  const u = (k: string, v: any) => setData((p: any) => ({ ...p, [k]: v }));

  return (
    <div>
      <h1 style={{ fontWeight: 800, fontSize: 22, color: "#0f172a", marginBottom: 4 }}>Cấu Hình Chung</h1>
      <p style={{ color: "#64748b", fontSize: 13, marginBottom: 24 }}>Logo, thương hiệu, thông tin liên hệ</p>

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
