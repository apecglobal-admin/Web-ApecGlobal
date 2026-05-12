"use client";
import { useAdminData } from "@/lib/useAdminData";
import { SaveBar, fieldLabel, fieldInput, fieldTextarea, card, cardTitle, grid2 } from "@/components/admin/AdminUI";
import ImagePicker from "@/components/admin/ImagePicker";
import { Plus, Trash2 } from "lucide-react";

export default function EcosystemPage() {
  const { data, setData, loading, saving, saved, save } = useAdminData<any>("ecosystem", { bannerLabel: "Ecosystem", bannerTitle: "Hệ Sinh Thái APEC Global", bannerDesc: "Hệ sinh thái đa ngành kết nối Công nghệ – Tài chính – Thương mại – Dịch vụ, tạo giá trị bền vững", items: [] });
  const stats = useAdminData<any[]>("stats", []);

  if (loading || stats.loading) return <p>Đang tải...</p>;

  const items = Array.isArray(data) ? data : (data.items || []);
  const u = (k: string, v: any) => setData((p: any) => ({ ...p, [k]: v }));
  
  const updateItem = (i: number, k: string, v: any) => { 
    const d = [...items]; 
    d[i] = { ...d[i], [k]: v }; 
    if (Array.isArray(data)) setData(d);
    else u("items", d);
  };
  const add = () => {
    const newItem = { id: String(Date.now()), icon: "🔧", title: "Mới", sub: "New", color: "#2563eb", items: ["Item 1"], img: "", desc: "" };
    if (Array.isArray(data)) setData([...data, newItem]);
    else u("items", [...items, newItem]);
  };
  const remove = (i: number) => {
    const d = items.filter((_: any, j: number) => j !== i);
    if (Array.isArray(data)) setData(d);
    else u("items", d);
  };

  // Stats logic
  const updateStat = (i: number, k: string, v: string) => {
    const d = [...stats.data]; d[i] = { ...d[i], [k]: v }; stats.setData(d);
  };
  const addStat = () => stats.setData([...stats.data, { id: String(Date.now()), icon: "Zap", value: "0", label: "Mới" }]);
  const removeStat = (i: number) => stats.setData(stats.data.filter((_: any, j: number) => j !== i));

  const handleSave = async () => {
    await save();
    await stats.save();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div><h1 style={{ fontWeight: 800, fontSize: 22, color: "#0f172a", marginBottom: 4 }}>Hệ Sinh Thái</h1><p style={{ color: "#64748b", fontSize: 13 }}>Quản lý nội dung trang Hệ sinh thái & Thống kê</p></div>
        <button onClick={add} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "#2563eb", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}><Plus size={14} /> Thêm trụ cột</button>
      </div>

      <div style={card}>
        <div style={cardTitle}>Banner trang Hệ sinh thái</div>
        <div><label style={fieldLabel}>Label Banner</label><input style={fieldInput} value={data.bannerLabel || ""} onChange={e => u("bannerLabel", e.target.value)} /></div>
        <div style={{ marginTop: 10 }}><label style={fieldLabel}>Tiêu đề Banner</label><input style={fieldInput} value={data.bannerTitle || ""} onChange={e => u("bannerTitle", e.target.value)} /></div>
        <div style={{ marginTop: 10 }}><label style={fieldLabel}>Mô tả Banner</label><textarea rows={2} style={fieldTextarea} value={data.bannerDesc || ""} onChange={e => u("bannerDesc", e.target.value)} /></div>
      </div>

      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={cardTitle}>Các con số thống kê (Hiển thị cả ở Trang chủ)</div>
          <button onClick={addStat} style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, background: "#f1f5f9", border: "1px solid #e2e8f0", cursor: "pointer" }}>+ Thêm chỉ số</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {stats.data.map((s: any, i: number) => (
            <div key={s.id || i} style={{ padding: 12, border: "1px solid #f1f5f9", borderRadius: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#64748b" }}>Chỉ số #{i + 1}</span>
                <button onClick={() => removeStat(i)} style={{ border: "none", background: "none", cursor: "pointer", color: "#ef4444" }}><Trash2 size={14} /></button>
              </div>
              <div style={grid2}>
                <div><label style={fieldLabel}>Icon (Lucide)</label><input style={fieldInput} value={s.icon || ""} onChange={e => updateStat(i, "icon", e.target.value)} /></div>
                <div><label style={fieldLabel}>Giá trị</label><input style={fieldInput} value={s.value || ""} onChange={e => updateStat(i, "value", e.target.value)} /></div>
              </div>
              <div style={{ marginTop: 8 }}><label style={fieldLabel}>Nhãn</label><input style={fieldInput} value={s.label || ""} onChange={e => updateStat(i, "label", e.target.value)} /></div>
            </div>
          ))}
        </div>
      </div>

      {items.map((item: any, i: number) => (
        <div key={item.id || i} style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>{item.title || `Trụ cột #${i + 1}`}</span>
            <button onClick={() => remove(i)} style={{ padding: 4, borderRadius: 6, color: "#ef4444", border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center" }}><Trash2 size={16} /></button>
          </div>
          <div style={grid2}>
            <div><label style={fieldLabel}>Icon (emoji)</label><input style={fieldInput} value={item.icon || ""} onChange={e => updateItem(i, "icon", e.target.value)} /></div>
            <div><label style={fieldLabel}>Màu chủ đạo</label><input type="color" value={item.color || "#2563eb"} onChange={e => updateItem(i, "color", e.target.value)} style={{ width: 60, height: 36, border: "none", cursor: "pointer" }} /></div>
            <div><label style={fieldLabel}>Tiêu đề</label><input style={fieldInput} value={item.title || ""} onChange={e => updateItem(i, "title", e.target.value)} /></div>
            <div><label style={fieldLabel}>Phụ đề (EN)</label><input style={fieldInput} value={item.sub || ""} onChange={e => updateItem(i, "sub", e.target.value)} /></div>
          </div>
          <div style={{ marginTop: 10 }}><label style={fieldLabel}>Mô tả chi tiết</label><textarea rows={3} style={fieldTextarea} value={item.desc || ""} onChange={e => updateItem(i, "desc", e.target.value)} /></div>
          <ImagePicker label="Hình ảnh nền (Tỷ lệ gợi ý: Ngang 16:9 hoặc 4:3)" value={item.img || ""} onChange={v => updateItem(i, "img", v)} />
          <div style={{ marginTop: 8 }}>
            <label style={fieldLabel}>Danh sách items (mỗi dòng 1 item)</label>
            <textarea rows={3} style={{ ...fieldInput, resize: "vertical" as const }} value={(item.items || []).join("\n")} onChange={e => updateItem(i, "items", e.target.value.split("\n").filter(Boolean))} />
          </div>
        </div>
      ))}

      <SaveBar saving={saving || stats.saving} saved={saved && stats.saved} onSave={handleSave} />
    </div>
  );
}
