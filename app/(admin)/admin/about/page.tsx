"use client";
import { useAdminData } from "@/lib/useAdminData";
import { SaveBar, fieldLabel, fieldInput, fieldTextarea, card, cardTitle, grid2 } from "@/components/admin/AdminUI";

export default function AboutPage() {
  const { data, setData, loading, saving, saved, save } = useAdminData("about", {} as any);
  if (loading) return <p>Đang tải...</p>;
  const u = (k: string, v: any) => setData((p: any) => ({ ...p, [k]: v }));
  const uNested = (parent: string, k: string, v: any) => setData((p: any) => ({ ...p, [parent]: { ...p[parent], [k]: v } }));

  return (
    <div>
      <h1 style={{ fontWeight: 800, fontSize: 22, color: "#0f172a", marginBottom: 4 }}>Giới Thiệu</h1>
      <p style={{ color: "#64748b", fontSize: 13, marginBottom: 24 }}>Nội dung section "Về ApecGlobal" trên trang chủ</p>

      <div style={card}>
        <div style={cardTitle}>Nội dung chính</div>
        <div><label style={fieldLabel}>Label section</label><input style={fieldInput} value={data.sectionLabel || ""} onChange={e => u("sectionLabel", e.target.value)} /></div>
        <div style={{ marginTop: 10 }}><label style={fieldLabel}>Tiêu đề lớn</label><textarea rows={3} style={fieldTextarea} value={data.heading || ""} onChange={e => u("heading", e.target.value)} /></div>
        <div style={{ ...grid2, marginTop: 10 }}>
          <div><label style={fieldLabel}>Đoạn mô tả 1</label><textarea rows={3} style={fieldTextarea} value={data.description1 || ""} onChange={e => u("description1", e.target.value)} /></div>
          <div><label style={fieldLabel}>Đoạn mô tả 2</label><textarea rows={3} style={fieldTextarea} value={data.description2 || ""} onChange={e => u("description2", e.target.value)} /></div>
        </div>
      </div>

      <div style={card}>
        <div style={cardTitle}>Tầm nhìn & Sứ mệnh</div>
        <div style={grid2}>
          <div>
            <label style={fieldLabel}>Tiêu đề Tầm nhìn</label><input style={fieldInput} value={data.vision?.title || ""} onChange={e => uNested("vision", "title", e.target.value)} />
            <label style={{ ...fieldLabel, marginTop: 10 }}>Nội dung</label><textarea rows={3} style={fieldTextarea} value={data.vision?.content || ""} onChange={e => uNested("vision", "content", e.target.value)} />
          </div>
          <div>
            <label style={fieldLabel}>Tiêu đề Sứ mệnh</label><input style={fieldInput} value={data.mission?.title || ""} onChange={e => uNested("mission", "title", e.target.value)} />
            <label style={{ ...fieldLabel, marginTop: 10 }}>Nội dung</label><textarea rows={3} style={fieldTextarea} value={data.mission?.content || ""} onChange={e => uNested("mission", "content", e.target.value)} />
          </div>
        </div>
      </div>

      <div style={card}>
        <div style={cardTitle}>Giá trị cốt lõi</div>
        {(data.coreValues || []).map((v: any, i: number) => (
          <div key={i} style={{ ...grid2, marginBottom: 8 }}>
            <div><label style={fieldLabel}>Icon</label><input style={fieldInput} value={v.icon || ""} onChange={e => { const a = [...data.coreValues]; a[i] = { ...a[i], icon: e.target.value }; u("coreValues", a); }} /></div>
            <div><label style={fieldLabel}>Nhãn</label><input style={fieldInput} value={v.label || ""} onChange={e => { const a = [...data.coreValues]; a[i] = { ...a[i], label: e.target.value }; u("coreValues", a); }} /></div>
          </div>
        ))}
      </div>

      <SaveBar saving={saving} saved={saved} onSave={() => save()} />
    </div>
  );
}
