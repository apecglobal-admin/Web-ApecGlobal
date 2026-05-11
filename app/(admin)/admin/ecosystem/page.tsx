"use client";
import { useAdminData } from "@/lib/useAdminData";
import { SaveBar, fieldLabel, fieldInput, card, cardTitle, grid2 } from "@/components/admin/AdminUI";
import ImagePicker from "@/components/admin/ImagePicker";
import { Plus, Trash2 } from "lucide-react";

export default function EcosystemPage() {
  const { data, setData, loading, saving, saved, save } = useAdminData<any[]>("ecosystem", []);
  if (loading) return <p>Đang tải...</p>;

  const update = (i: number, k: string, v: any) => { const d = [...data]; d[i] = { ...d[i], [k]: v }; setData(d); };
  const add = () => setData([...data, { id: String(Date.now()), icon: "🔧", title: "Mới", sub: "New", color: "#2563eb", items: ["Item 1"], img: "" }]);
  const remove = (i: number) => setData(data.filter((_: any, j: number) => j !== i));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div><h1 style={{ fontWeight: 800, fontSize: 22, color: "#0f172a", marginBottom: 4 }}>Hệ Sinh Thái</h1><p style={{ color: "#64748b", fontSize: 13 }}>Quản lý 4 trụ cột hệ sinh thái</p></div>
        <button onClick={add} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "#2563eb", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}><Plus size={14} /> Thêm</button>
      </div>

      {data.map((item: any, i: number) => (
        <div key={item.id || i} style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>{item.title || `Trụ cột #${i + 1}`}</span>
            <button onClick={() => remove(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}><Trash2 size={16} /></button>
          </div>
          <div style={grid2}>
            <div><label style={fieldLabel}>Icon (emoji)</label><input style={fieldInput} value={item.icon || ""} onChange={e => update(i, "icon", e.target.value)} /></div>
            <div><label style={fieldLabel}>Màu chủ đạo</label><input type="color" value={item.color || "#2563eb"} onChange={e => update(i, "color", e.target.value)} style={{ width: 60, height: 36, border: "none", cursor: "pointer" }} /></div>
            <div><label style={fieldLabel}>Tiêu đề</label><input style={fieldInput} value={item.title || ""} onChange={e => update(i, "title", e.target.value)} /></div>
            <div><label style={fieldLabel}>Phụ đề (EN)</label><input style={fieldInput} value={item.sub || ""} onChange={e => update(i, "sub", e.target.value)} /></div>
          </div>
          <ImagePicker label="Hình ảnh nền (Tỷ lệ gợi ý: Ngang 16:9 hoặc 4:3)" value={item.img || ""} onChange={v => update(i, "img", v)} />
          <div style={{ marginTop: 8 }}>
            <label style={fieldLabel}>Danh sách items (mỗi dòng 1 item)</label>
            <textarea rows={3} style={{ ...fieldInput, resize: "vertical" as const }} value={(item.items || []).join("\n")} onChange={e => update(i, "items", e.target.value.split("\n").filter(Boolean))} />
          </div>
        </div>
      ))}

      <SaveBar saving={saving} saved={saved} onSave={() => save()} />
    </div>
  );
}
