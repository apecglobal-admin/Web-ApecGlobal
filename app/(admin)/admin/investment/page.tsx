"use client";
import { useAdminData } from "@/lib/useAdminData";
import { SaveBar, fieldLabel, fieldInput, card, grid2 } from "@/components/admin/AdminUI";
import ImagePicker from "@/components/admin/ImagePicker";
import { Plus, Trash2 } from "lucide-react";

export default function InvestmentPage() {
  const { data, setData, loading, saving, saved, save } = useAdminData<any[]>("investment", []);
  if (loading) return <p>Đang tải...</p>;
  const update = (i: number, k: string, v: any) => { const d = [...data]; d[i] = { ...d[i], [k]: v }; setData(d); };
  const add = () => setData([...data, { id: String(Date.now()), title: "Lĩnh vực mới", desc: "", img: "" }]);
  const remove = (i: number) => setData(data.filter((_: any, j: number) => j !== i));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div><h1 style={{ fontWeight: 800, fontSize: 22, color: "#0f172a", marginBottom: 4 }}>Lĩnh Vực Đầu Tư</h1></div>
        <button onClick={add} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "#2563eb", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}><Plus size={14} /> Thêm</button>
      </div>
      {data.map((item: any, i: number) => (
        <div key={item.id || i} style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontWeight: 700, color: "#0f172a" }}>{item.title}</span>
            <button onClick={() => remove(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}><Trash2 size={16} /></button>
          </div>
          <div style={grid2}>
            <div><label style={fieldLabel}>Tiêu đề</label><input style={fieldInput} value={item.title || ""} onChange={e => update(i, "title", e.target.value)} /></div>
            <div><label style={fieldLabel}>Mô tả</label><input style={fieldInput} value={item.desc || ""} onChange={e => update(i, "desc", e.target.value)} /></div>
          </div>
          <ImagePicker label="Hình ảnh (Tỷ lệ gợi ý: Ngang dọc 16:9 hoặc 4:3)" value={item.img || ""} onChange={v => update(i, "img", v)} />
        </div>
      ))}
      <SaveBar saving={saving} saved={saved} onSave={() => save()} />
    </div>
  );
}
