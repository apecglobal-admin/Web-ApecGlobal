"use client";
import { useAdminData } from "@/lib/useAdminData";
import { SaveBar, fieldLabel, fieldInput, fieldTextarea, card, cardTitle, grid2 } from "@/components/admin/AdminUI";
import ImagePicker from "@/components/admin/ImagePicker";

export default function HeroPage() {
  const { data, setData, loading, saving, saved, save } = useAdminData("hero", {} as any);
  if (loading) return <p>Đang tải...</p>;
  const u = (k: string, v: any) => setData((p: any) => ({ ...p, [k]: v }));

  return (
    <div>
      <h1 style={{ fontWeight: 800, fontSize: 22, color: "#0f172a", marginBottom: 4 }}>Hero Banner</h1>
      <p style={{ color: "#64748b", fontSize: 13, marginBottom: 24 }}>Tiêu đề chính, mô tả và hình nền trang chủ</p>

      <div style={card}>
        <div style={cardTitle}>Nội dung</div>
        <div style={grid2}>
          <div><label style={fieldLabel}>Dòng 1 (Title)</label><input style={fieldInput} value={data.title1 || ""} onChange={e => u("title1", e.target.value)} /></div>
          <div><label style={fieldLabel}>Dòng 2 (Gradient)</label><input style={fieldInput} value={data.title2 || ""} onChange={e => u("title2", e.target.value)} /></div>
        </div>
        <div style={{ marginTop: 12 }}>
          <label style={fieldLabel}>Mô tả</label>
          <textarea rows={3} style={fieldTextarea} value={data.description || ""} onChange={e => u("description", e.target.value)} />
        </div>
      </div>

      <div style={card}>
        <div style={cardTitle}>Hình nền</div>
        <ImagePicker label="Background Image (Tỷ lệ gợi ý: Ngang 16:9 hoặc siêu rộng 21:9, độ phân giải cao >= 1920px)" value={data.backgroundImage || ""} onChange={v => u("backgroundImage", v)} />
      </div>

      <div style={card}>
        <div style={cardTitle}>Nút CTA</div>
        <div style={grid2}>
          <div>
            <label style={fieldLabel}>Nút 1 – Label</label><input style={fieldInput} value={data.cta1?.label || ""} onChange={e => u("cta1", { ...data.cta1, label: e.target.value })} />
            <label style={{ ...fieldLabel, marginTop: 10 }}>Nút 1 – Link</label><input style={fieldInput} value={data.cta1?.href || ""} onChange={e => u("cta1", { ...data.cta1, href: e.target.value })} />
          </div>
          <div>
            <label style={fieldLabel}>Nút 2 – Label</label><input style={fieldInput} value={data.cta2?.label || ""} onChange={e => u("cta2", { ...data.cta2, label: e.target.value })} />
            <label style={{ ...fieldLabel, marginTop: 10 }}>Nút 2 – Link</label><input style={fieldInput} value={data.cta2?.href || ""} onChange={e => u("cta2", { ...data.cta2, href: e.target.value })} />
          </div>
        </div>
      </div>

      <SaveBar saving={saving} saved={saved} onSave={() => save()} />
    </div>
  );
}
