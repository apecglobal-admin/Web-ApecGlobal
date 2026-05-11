"use client";
import { useAdminData } from "@/lib/useAdminData";
import { SaveBar, fieldLabel, fieldInput, card } from "@/components/admin/AdminUI";
import { Plus, Trash2, GripVertical } from "lucide-react";

export default function NavPage() {
  const { data, setData, loading, saving, saved, save } = useAdminData<any[]>("nav", []);
  if (loading) return <p>Đang tải...</p>;
  const update = (i: number, k: string, v: string) => { const d = [...data]; d[i] = { ...d[i], [k]: v }; setData(d); };
  const add = () => setData([...data, { id: String(Date.now()), label: "Trang mới", href: "/trang-moi" }]);
  const remove = (i: number) => setData(data.filter((_: any, j: number) => j !== i));
  const moveUp = (i: number) => { if (i === 0) return; const d = [...data]; [d[i-1], d[i]] = [d[i], d[i-1]]; setData(d); };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div><h1 style={{ fontWeight: 800, fontSize: 22, color: "#0f172a", marginBottom: 4 }}>Menu Điều Hướng</h1><p style={{ color: "#64748b", fontSize: 13 }}>Quản lý thứ tự và nội dung menu</p></div>
        <button onClick={add} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "#2563eb", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}><Plus size={14} /> Thêm</button>
      </div>

      {data.map((item: any, i: number) => (
        <div key={item.id || i} style={{ ...card, display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={() => moveUp(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}><GripVertical size={18} /></button>
          <span style={{ fontSize: 13, color: "#94a3b8", width: 28 }}>#{i + 1}</span>
          <div style={{ flex: 1 }}><input style={fieldInput} value={item.label || ""} onChange={e => update(i, "label", e.target.value)} placeholder="Label" /></div>
          <div style={{ flex: 1 }}><input style={fieldInput} value={item.href || ""} onChange={e => update(i, "href", e.target.value)} placeholder="/path" /></div>
          <button onClick={() => remove(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}><Trash2 size={16} /></button>
        </div>
      ))}
      <SaveBar saving={saving} saved={saved} onSave={() => save()} />
    </div>
  );
}
