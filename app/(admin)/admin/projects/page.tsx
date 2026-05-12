"use client";
import { useAdminData } from "@/lib/useAdminData";
import { SaveBar, fieldLabel, fieldInput, fieldTextarea, card, cardTitle, grid2 } from "@/components/admin/AdminUI";
import ImagePicker from "@/components/admin/ImagePicker";
import { Plus, Trash2 } from "lucide-react";

export default function ProjectsPage() {
  const { data, setData, loading, saving, saved, save } = useAdminData<any>("projects", { bannerLabel: "Projects", bannerTitle: "Dự Án Đầu Tư", bannerDesc: "Danh mục các dự án tiêu biểu đã và đang đầu tư của APEC Global trên toàn quốc", items: [] });
  if (loading) return <p>Đang tải...</p>;

  const items = Array.isArray(data) ? data : (data.items || []);
  const u = (k: string, v: any) => setData((p: any) => ({ ...p, [k]: v }));

  const updateItem = (i: number, k: string, v: any) => { 
    const d = [...items]; 
    d[i] = { ...d[i], [k]: v }; 
    if (Array.isArray(data)) setData(d);
    else u("items", d);
  };
  const add = () => {
    const newItem = { id: String(Date.now()), name: "Dự án mới", sector: "", status: "Đang đầu tư", loc: "", cap: "", year: new Date().getFullYear().toString(), img: "", desc: "" };
    if (Array.isArray(data)) setData([...data, newItem]);
    else u("items", [...items, newItem]);
  };
  const remove = (i: number) => {
    const d = items.filter((_: any, j: number) => j !== i);
    if (Array.isArray(data)) setData(d);
    else u("items", d);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div><h1 style={{ fontWeight: 800, fontSize: 22, color: "#0f172a", marginBottom: 4 }}>Dự Án</h1><p style={{ color: "#64748b", fontSize: 13 }}>Quản lý danh sách dự án đầu tư</p></div>
        <button onClick={add} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "#2563eb", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}><Plus size={14} /> Thêm dự án</button>
      </div>

      <div style={card}>
        <div style={cardTitle}>Banner trang Dự án</div>
        <div><label style={fieldLabel}>Label Banner</label><input style={fieldInput} value={data.bannerLabel || ""} onChange={e => u("bannerLabel", e.target.value)} /></div>
        <div style={{ marginTop: 10 }}><label style={fieldLabel}>Tiêu đề Banner</label><input style={fieldInput} value={data.bannerTitle || ""} onChange={e => u("bannerTitle", e.target.value)} /></div>
        <div style={{ marginTop: 10 }}><label style={fieldLabel}>Mô tả Banner</label><textarea rows={2} style={fieldTextarea} value={data.bannerDesc || ""} onChange={e => u("bannerDesc", e.target.value)} /></div>
      </div>

      {items.map((p: any, i: number) => (
        <div key={p.id || i} style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontWeight: 700, color: "#0f172a" }}>{p.name || `Dự án #${i + 1}`}</span>
            <button onClick={() => remove(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}><Trash2 size={16} /></button>
          </div>
          <div style={grid2}>
            <div><label style={fieldLabel}>Tên dự án</label><input style={fieldInput} value={p.name || ""} onChange={e => updateItem(i, "name", e.target.value)} /></div>
            <div><label style={fieldLabel}>Lĩnh vực</label><input style={fieldInput} value={p.sector || ""} onChange={e => updateItem(i, "sector", e.target.value)} /></div>
            <div><label style={fieldLabel}>Trạng thái</label>
              <select style={fieldInput} value={p.status || ""} onChange={e => updateItem(i, "status", e.target.value)}>
                <option value="Đang đầu tư">Đang đầu tư</option><option value="Đang vận hành">Đang vận hành</option><option value="Hoàn thành">Hoàn thành</option>
              </select>
            </div>
            <div><label style={fieldLabel}>Địa điểm</label><input style={fieldInput} value={p.loc || ""} onChange={e => updateItem(i, "loc", e.target.value)} /></div>
            <div><label style={fieldLabel}>Vốn đầu tư</label><input style={fieldInput} value={p.cap || ""} onChange={e => updateItem(i, "cap", e.target.value)} /></div>
            <div><label style={fieldLabel}>Năm</label><input style={fieldInput} value={p.year || ""} onChange={e => updateItem(i, "year", e.target.value)} /></div>
          </div>
          <div style={{ marginTop: 10 }}><label style={fieldLabel}>Mô tả</label><textarea rows={2} style={{ ...fieldInput, resize: "vertical" as const }} value={p.desc || ""} onChange={e => updateItem(i, "desc", e.target.value)} /></div>
          <ImagePicker label="Hình ảnh dự án (Tỷ lệ gợi ý: Ngang 16:9 hoặc 4:3)" value={p.img || ""} onChange={v => updateItem(i, "img", v)} />
        </div>
      ))}
      <SaveBar saving={saving} saved={saved} onSave={() => save()} />
    </div>
  );
}
