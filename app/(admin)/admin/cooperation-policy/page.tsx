"use client";
import { useAdminData } from "@/lib/useAdminData";
import { SaveBar, fieldLabel, fieldInput, fieldTextarea, card, cardTitle, grid2 } from "@/components/admin/AdminUI";

const DEFAULT = {
  cooperationTypes: [
    { label: "Doanh nghiệp" }, { label: "Nhà đầu tư" },
    { label: "M&A" }, { label: "Hợp tác quốc tế" },
    { label: "Đối tác phân phối" }, { label: "Hợp tác chiến lược" },
  ],
  coopModels: [],
  coopProcess: [],
};

export default function CooperationPolicyPage() {
  const { data, setData, loading, saving, saved, save } = useAdminData("cooperation-policy", DEFAULT);
  if (loading) return <p>Đang tải...</p>;
  const d = { ...DEFAULT, ...data } as any;

  const u = (k: string, v: any) => setData((p: any) => ({ ...p, [k]: v }));

  const updateCoop = (i: number, k: string, v: string) => {
    const arr = [...(d.cooperationTypes || [])]; arr[i] = { ...arr[i], [k]: v };
    setData({ ...d, cooperationTypes: arr });
  };
  const updateCoopModel = (i: number, k: string, v: string) => {
    const arr = [...(d.coopModels || [])]; arr[i] = { ...arr[i], [k]: v };
    setData({ ...d, coopModels: arr });
  };
  const updateCoopProcess = (i: number, k: string, v: string) => {
    const arr = [...(d.coopProcess || [])]; arr[i] = { ...arr[i], [k]: v };
    setData({ ...d, coopProcess: arr });
  };

  return (
    <div>
      <h1 style={{ fontWeight: 800, fontSize: 22, color: "#0f172a", marginBottom: 4 }}>Chính Sách Hợp Tác</h1>
      <p style={{ color: "#64748b", fontSize: 13, marginBottom: 24 }}>Quản lý nội dung trang Chính sách hợp tác</p>

      <div style={card}>
        <div style={cardTitle}>Banner trang Chính sách hợp tác</div>
        <div><label style={fieldLabel}>Label Banner</label><input style={fieldInput} value={d.coopBannerLabel || ""} onChange={e => u("coopBannerLabel", e.target.value)} /></div>
        <div style={{ marginTop: 10 }}><label style={fieldLabel}>Tiêu đề Banner</label><input style={fieldInput} value={d.coopBannerTitle || ""} onChange={e => u("coopBannerTitle", e.target.value)} /></div>
        <div style={{ marginTop: 10 }}><label style={fieldLabel}>Mô tả Banner</label><textarea rows={2} style={fieldTextarea} value={d.coopBannerDesc || ""} onChange={e => u("coopBannerDesc", e.target.value)} /></div>
      </div>

      <div style={card}>
        <div style={cardTitle}>Loại Hình Đối Tác (Danh mục)</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
          {(d.cooperationTypes || []).map((c: any, i: number) => (
            <div key={i}><label style={fieldLabel}>Loại {i + 1}</label><input style={fieldInput} value={c.label || ""} onChange={e => updateCoop(i, "label", e.target.value)} /></div>
          ))}
        </div>
      </div>

      <div style={card}>
        <div style={cardTitle}>Mô hình hợp tác (Partnership Models)</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {(d.coopModels || []).map((m: any, i: number) => (
            <div key={i} style={{ padding: 12, border: "1px solid #f1f5f9", borderRadius: 10 }}>
              <div style={grid2}>
                <div><label style={fieldLabel}>Icon (Lucide)</label><input style={fieldInput} value={m.icon || ""} onChange={e => updateCoopModel(i, "icon", e.target.value)} /></div>
                <div><label style={fieldLabel}>Tiêu đề</label><input style={fieldInput} value={m.title || ""} onChange={e => updateCoopModel(i, "title", e.target.value)} /></div>
              </div>
              <div style={{ marginTop: 8 }}><label style={fieldLabel}>Mô tả</label><textarea rows={2} style={fieldTextarea} value={m.desc || ""} onChange={e => updateCoopModel(i, "desc", e.target.value)} /></div>
              <div style={{ marginTop: 8 }}><label style={fieldLabel}>Đặc điểm (mỗi dòng 1 ý)</label><textarea rows={3} style={fieldTextarea} value={m.features || ""} onChange={e => updateCoopModel(i, "features", e.target.value)} /></div>
            </div>
          ))}
        </div>
      </div>

      <div style={card}>
        <div style={cardTitle}>Quy trình hợp tác (Cooperation Process)</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {(d.coopProcess || []).map((p: any, i: number) => (
            <div key={i} style={{ padding: 12, border: "1px solid #f1f5f9", borderRadius: 10 }}>
              <div style={grid2}>
                <div><label style={fieldLabel}>Bước (ví dụ: 01)</label><input style={fieldInput} value={p.step || ""} onChange={e => updateCoopProcess(i, "step", e.target.value)} /></div>
                <div><label style={fieldLabel}>Tiêu đề</label><input style={fieldInput} value={p.title || ""} onChange={e => updateCoopProcess(i, "title", e.target.value)} /></div>
              </div>
              <div style={{ marginTop: 8 }}><label style={fieldLabel}>Mô tả</label><textarea rows={2} style={fieldTextarea} value={p.desc || ""} onChange={e => updateCoopProcess(i, "desc", e.target.value)} /></div>
            </div>
          ))}
        </div>
      </div>

      

      <SaveBar saving={saving} saved={saved} onSave={() => save()} />
    </div>
  );
}
