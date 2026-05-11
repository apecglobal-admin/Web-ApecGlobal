"use client";
import { useAdminData } from "@/lib/useAdminData";
import { SaveBar, fieldLabel, fieldInput, card, cardTitle, grid2 } from "@/components/admin/AdminUI";
import { Plus, Trash2, GripVertical } from "lucide-react";

export default function StatsPage() {
  const { data, setData, loading, saving, saved, save } = useAdminData<any[]>("stats", []);
  if (loading) return <p>Đang tải...</p>;

  const update = (i: number, k: string, v: string) => {
    const d = [...data]; d[i] = { ...d[i], [k]: v }; setData(d);
  };
  const add = () => setData([...data, { id: String(Date.now()), icon: "Star", value: "0", label: "Mới", sub: "" }]);
  const remove = (i: number) => setData(data.filter((_: any, j: number) => j !== i));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontWeight: 800, fontSize: 22, color: "#0f172a", marginBottom: 4 }}>Thống Kê</h1>
          <p style={{ color: "#64748b", fontSize: 13 }}>Quản lý các chỉ số hiển thị trên trang chủ</p>
        </div>
        <button onClick={add} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "#2563eb", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}><Plus size={14} /> Thêm</button>
      </div>

      {data.map((item: any, i: number) => (
        <div key={item.id || i} style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>Chỉ số #{i + 1}</span>
            <button onClick={() => remove(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: 4 }}><Trash2 size={16} /></button>
          </div>
          <div style={grid2}>
            <div><label style={fieldLabel}>Icon (Lucide)</label><input style={fieldInput} value={item.icon || ""} onChange={e => update(i, "icon", e.target.value)} /></div>
            <div><label style={fieldLabel}>Giá trị</label><input style={fieldInput} value={item.value || ""} onChange={e => update(i, "value", e.target.value)} /></div>
            <div><label style={fieldLabel}>Nhãn</label><input style={fieldInput} value={item.label || ""} onChange={e => update(i, "label", e.target.value)} /></div>
            <div><label style={fieldLabel}>Mô tả phụ</label><input style={fieldInput} value={item.sub || ""} onChange={e => update(i, "sub", e.target.value)} /></div>
          </div>
        </div>
      ))}

      <SaveBar saving={saving} saved={saved} onSave={() => save()} />
    </div>
  );
}
