"use client";
import { useAdminData } from "@/lib/useAdminData";
import { SaveBar, fieldLabel, fieldInput, card, grid2 } from "@/components/admin/AdminUI";
import ImagePicker from "@/components/admin/ImagePicker";
import { Plus, Trash2 } from "lucide-react";

export default function NewsPage() {
  const { data, setData, loading, saving, saved, save } = useAdminData<any[]>("news", []);
  if (loading) return <p>Đang tải...</p>;
  const update = (i: number, k: string, v: any) => { const d = [...data]; d[i] = { ...d[i], [k]: v }; setData(d); };
  const add = () => setData([...data, { id: String(Date.now()), title: "Bài viết mới", cat: "Sự kiện", date: new Date().toLocaleDateString("vi-VN"), img: "", excerpt: "", readTime: "3 phút", content: "", fontSize: "16px" }]);
  const remove = (i: number) => setData(data.filter((_: any, j: number) => j !== i));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div><h1 style={{ fontWeight: 800, fontSize: 22, color: "#0f172a", marginBottom: 4 }}>Tin Tức</h1><p style={{ color: "#64748b", fontSize: 13 }}>Quản lý bài viết tin tức</p></div>
        <button onClick={add} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "#2563eb", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}><Plus size={14} /> Thêm bài viết</button>
      </div>

      {data.map((n: any, i: number) => (
        <div key={n.id || i} style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontWeight: 700, color: "#0f172a" }}>{n.title}</span>
            <button onClick={() => remove(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}><Trash2 size={16} /></button>
          </div>
          <div style={grid2}>
            <div><label style={fieldLabel}>Tiêu đề</label><input style={fieldInput} value={n.title || ""} onChange={e => update(i, "title", e.target.value)} /></div>
            <div><label style={fieldLabel}>Danh mục</label>
              <select style={fieldInput} value={n.cat || ""} onChange={e => update(i, "cat", e.target.value)}>
                <option value="Sự kiện">Sự kiện</option><option value="Công nghệ">Công nghệ</option><option value="Đầu tư">Đầu tư</option><option value="Phát triển bền vững">Phát triển bền vững</option>
              </select>
            </div>
            <div><label style={fieldLabel}>Ngày đăng</label><input style={fieldInput} value={n.date || ""} onChange={e => update(i, "date", e.target.value)} /></div>
            <div><label style={fieldLabel}>Thời gian đọc</label><input style={fieldInput} value={n.readTime || ""} onChange={e => update(i, "readTime", e.target.value)} /></div>
            <div><label style={fieldLabel}>Cỡ chữ nội dung</label>
              <select style={fieldInput} value={n.fontSize || "16px"} onChange={e => update(i, "fontSize", e.target.value)}>
                <option value="14px">Nhỏ (14px)</option>
                <option value="15px">Hơi nhỏ (15px)</option>
                <option value="16px">Chuẩn (16px)</option>
                <option value="17px">Hơi lớn (17px)</option>
                <option value="18px">Lớn (18px)</option>
                <option value="20px">Rất lớn (20px)</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: 10 }}><label style={fieldLabel}>Tóm tắt</label><textarea rows={2} style={{ ...fieldInput, resize: "vertical" as const }} value={n.excerpt || ""} onChange={e => update(i, "excerpt", e.target.value)} /></div>
          <div style={{ marginTop: 10 }}><label style={fieldLabel}>Nội dung chi tiết (hỗ trợ HTML / văn bản)</label><textarea rows={8} style={{ ...fieldInput, resize: "vertical" as const }} value={n.content || ""} onChange={e => update(i, "content", e.target.value)} /></div>
          <ImagePicker label="Ảnh đại diện (Tỷ lệ gợi ý: Ngang 16:9 hoặc 16:10)" value={n.img || ""} onChange={v => update(i, "img", v)} />
        </div>
      ))}
      <SaveBar saving={saving} saved={saved} onSave={() => save()} />
    </div>
  );
}
