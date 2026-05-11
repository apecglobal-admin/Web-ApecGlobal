"use client";
import { useAdminData } from "@/lib/useAdminData";
import { SaveBar, fieldLabel, fieldInput, card, cardTitle } from "@/components/admin/AdminUI";
import { Plus, Trash2 } from "lucide-react";

export default function FooterPage() {
  const { data, setData, loading, saving, saved, save } = useAdminData("footer", {} as any);
  if (loading) return <p>Đang tải...</p>;

  const updateCol = (ci: number, k: string, v: any) => {
    const cols = [...(data.columns || [])]; cols[ci] = { ...cols[ci], [k]: v };
    setData({ ...data, columns: cols });
  };
  const updateLink = (ci: number, li: number, k: string, v: string) => {
    const cols = [...(data.columns || [])];
    const links = [...(cols[ci].links || [])];
    links[li] = { ...links[li], [k]: v };
    cols[ci] = { ...cols[ci], links };
    setData({ ...data, columns: cols });
  };
  const addCol = () => setData({ ...data, columns: [...(data.columns || []), { title: "Cột mới", links: [] }] });
  const removeCol = (i: number) => setData({ ...data, columns: (data.columns || []).filter((_: any, j: number) => j !== i) });
  const addLink = (ci: number) => { const cols = [...(data.columns || [])]; cols[ci] = { ...cols[ci], links: [...(cols[ci].links || []), { label: "Link mới", href: "/" }] }; setData({ ...data, columns: cols }); };
  const removeLink = (ci: number, li: number) => { const cols = [...(data.columns || [])]; cols[ci] = { ...cols[ci], links: (cols[ci].links || []).filter((_: any, j: number) => j !== li) }; setData({ ...data, columns: cols }); };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div><h1 style={{ fontWeight: 800, fontSize: 22, color: "#0f172a", marginBottom: 4 }}>Footer</h1></div>
        <button onClick={addCol} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "#2563eb", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}><Plus size={14} /> Thêm cột</button>
      </div>

      <div style={card}>
        <label style={fieldLabel}>Copyright</label>
        <input style={fieldInput} value={data.copyright || ""} onChange={e => setData({ ...data, copyright: e.target.value })} />
      </div>

      {(data.columns || []).map((col: any, ci: number) => (
        <div key={ci} style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <input style={{ ...fieldInput, fontWeight: 700, width: 200 }} value={col.title || ""} onChange={e => updateCol(ci, "title", e.target.value)} />
            <button onClick={() => removeCol(ci)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}><Trash2 size={16} /></button>
          </div>
          {(col.links || []).map((link: any, li: number) => (
            <div key={li} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "center" }}>
              <input style={{ ...fieldInput, flex: 1 }} value={link.label || ""} onChange={e => updateLink(ci, li, "label", e.target.value)} placeholder="Label" />
              <input style={{ ...fieldInput, flex: 1 }} value={link.href || ""} onChange={e => updateLink(ci, li, "href", e.target.value)} placeholder="/path" />
              <button onClick={() => removeLink(ci, li)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}><Trash2 size={14} /></button>
            </div>
          ))}
          <button onClick={() => addLink(ci)} style={{ fontSize: 12, color: "#2563eb", background: "none", border: "none", cursor: "pointer", fontWeight: 600, marginTop: 4 }}>+ Thêm link</button>
        </div>
      ))}
      <SaveBar saving={saving} saved={saved} onSave={() => save()} />
    </div>
  );
}
