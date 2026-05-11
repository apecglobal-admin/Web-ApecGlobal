"use client";
import { useAdminData } from "@/lib/useAdminData";
import { SaveBar, fieldLabel, fieldInput, card, grid2 } from "@/components/admin/AdminUI";
import ImagePicker from "@/components/admin/ImagePicker";
import { Plus, Trash2 } from "lucide-react";

export default function PartnersPage() {
  const { data, setData, loading, saving, saved, save } = useAdminData<any[]>("partners", []);
  if (loading) return <p>Đang tải...</p>;
  const update = (i: number, k: string, v: any) => { const d = [...data]; d[i] = { ...d[i], [k]: v }; setData(d); };
  const add = () => setData([...data, { id: String(Date.now()), name: "Đối tác mới", color: "#2563eb" }]);
  const remove = (i: number) => setData(data.filter((_: any, j: number) => j !== i));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div><h1 style={{ fontWeight: 800, fontSize: 22, color: "#0f172a", marginBottom: 4 }}>Đối Tác</h1></div>
        <button onClick={add} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "#2563eb", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}><Plus size={14} /> Thêm</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {data.map((p: any, i: number) => (
          <div key={p.id || i} style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontWeight: 700, color: p.color }}>{p.name}</span>
              <button onClick={() => remove(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}><Trash2 size={14} /></button>
            </div>
            <div><label style={fieldLabel}>Tên</label><input style={fieldInput} value={p.name || ""} onChange={e => update(i, "name", e.target.value)} /></div>
            <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <label style={fieldLabel}>Màu</label><input type="color" value={p.color || "#2563eb"} onChange={e => update(i, "color", e.target.value)} style={{ width: 40, height: 30, border: "none", cursor: "pointer" }} />
            </div>
            <ImagePicker label="Logo đối tác (PNG nền trong suốt, trắng đen hoặc màu chuẩn)" value={p.logo || ""} onChange={v => update(i, "logo", v)} />
          </div>
        ))}
      </div>
      <SaveBar saving={saving} saved={saved} onSave={() => save()} />
    </div>
  );
}
