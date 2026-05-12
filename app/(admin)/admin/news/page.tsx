"use client";
import { useState, useEffect } from "react";
import { useAdminData } from "@/lib/useAdminData";
import { SaveBar, fieldLabel, fieldInput, fieldTextarea, card, cardTitle, grid2 } from "@/components/admin/AdminUI";
import ImagePicker from "@/components/admin/ImagePicker";
import HTMLEditor from "@/components/admin/HTMLEditor";
import { Plus, Trash2, ChevronRight, ChevronDown, Star } from "lucide-react";

function toSlug(str: string) {
  str = str.toLowerCase();
  str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a");
  str = str.replace(/[èéẹẻẽêềếệểễ]/g, "e");
  str = str.replace(/[ìíịỉĩ]/g, "i");
  str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o");
  str = str.replace(/[ùúụủũưừứựửữ]/g, "u");
  str = str.replace(/[ỳýỵỷỹ]/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/[^a-z0-9 -]/g, "");
  str = str.replace(/\s+/g, "-");
  str = str.replace(/-+/g, "-");
  return str.trim();
}

export default function NewsPage() {
  const { data, setData, loading, saving, saved, save } = useAdminData<any>("news", { bannerLabel: "News & Events", bannerTitle: "Tin Tức & Hoạt Động", bannerDesc: "Cập nhật thông tin mới nhất về các hoạt động, sự kiện và đầu tư của APEC Global", items: [] });
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  if (loading) return <p>Đang tải...</p>;

  const items = Array.isArray(data) ? data : (data.items || []);
  const u = (k: string, v: any) => setData((p: any) => ({ ...p, [k]: v }));

  const updateItem = (i: number, k: string, v: any) => { 
    const d = [...items]; 
    d[i] = { ...d[i], [k]: v }; 
    if (k === "title") d[i].slug = toSlug(v);
    if (Array.isArray(data)) setData(d);
    else u("items", d);
  };
  const add = () => {
    const newItem = { id: String(Date.now()), title: "Bài viết mới", slug: "bai-viet-moi", cat: "Sự kiện", date: new Date().toLocaleDateString("vi-VN"), img: "", excerpt: "", readTime: "3 phút", content: "", isFeatured: false, featuredOrder: 0 };
    const newItems = [newItem, ...items];
    if (Array.isArray(data)) setData(newItems);
    else u("items", newItems);
    setActiveIdx(0);
  };
  const remove = (i: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Xóa bài viết này?")) return;
    const d = items.filter((_: any, j: number) => j !== i);
    if (Array.isArray(data)) setData(d);
    else u("items", d);
    if (activeIdx === i) setActiveIdx(null);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div><h1 style={{ fontWeight: 800, fontSize: 22, color: "#0f172a", marginBottom: 4 }}>Tin Tức</h1><p style={{ color: "#64748b", fontSize: 13 }}>Quản lý bài viết tin tức và bài viết nổi bật</p></div>
        <button onClick={add} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "#2563eb", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}><Plus size={14} /> Thêm bài viết</button>
      </div>

      <div style={card}>
        <div style={cardTitle}>Banner trang Tin tức</div>
        <div><label style={fieldLabel}>Label Banner</label><input style={fieldInput} value={data.bannerLabel || ""} onChange={e => u("bannerLabel", e.target.value)} /></div>
        <div style={{ marginTop: 10 }}><label style={fieldLabel}>Tiêu đề Banner</label><input style={fieldInput} value={data.bannerTitle || ""} onChange={e => u("bannerTitle", e.target.value)} /></div>
        <div style={{ marginTop: 10 }}><label style={fieldLabel}>Mô tả Banner</label><textarea rows={2} style={fieldTextarea} value={data.bannerDesc || ""} onChange={e => u("bannerDesc", e.target.value)} /></div>
      </div>

      <div style={{ marginTop: 24 }}>
        <div style={{ marginBottom: 12, fontWeight: 700, color: "#0f172a", fontSize: 16 }}>Danh sách bài viết ({items.length})</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {items.map((n: any, i: number) => (
            <div key={n.id || i}>
              <div 
                onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                style={{ 
                  padding: "12px 16px", background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", 
                  display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer",
                  boxShadow: activeIdx === i ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
                  borderColor: activeIdx === i ? "#2563eb" : "#e2e8f0"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
                  {activeIdx === i ? <ChevronDown size={16} color="#64748b" /> : <ChevronRight size={16} color="#64748b" />}
                  {n.isFeatured && <Star size={14} fill="#eab308" color="#eab308" />}
                  <span style={{ fontWeight: 600, color: "#1e293b", fontSize: 14 }}>{n.title}</span>
                  <span style={{ fontSize: 11, color: "#94a3b8", marginLeft: 8 }}>{n.date} • {n.cat}</span>
                </div>
                <button onClick={(e) => remove(i, e)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: 4 }}><Trash2 size={16} /></button>
              </div>

              {activeIdx === i && (
                <div style={{ ...card, marginTop: 4, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                  <div style={grid2}>
                    <div><label style={fieldLabel}>Tiêu đề</label><input style={fieldInput} value={n.title || ""} onChange={e => updateItem(i, "title", e.target.value)} /></div>
                    <div><label style={fieldLabel}>Slug (Tự động)</label><input style={{ ...fieldInput, background: "#f1f5f9", color: "#475569", cursor: "not-allowed" }} readOnly value={n.slug || toSlug(n.title || "")} placeholder="Tự động tạo từ tiêu đề..." /></div>
                    
                    <div><label style={fieldLabel}>Danh mục</label>
                      <select style={fieldInput} value={n.cat || ""} onChange={e => updateItem(i, "cat", e.target.value)}>
                        <option value="Sự kiện">Sự kiện</option><option value="Công nghệ">Công nghệ</option><option value="Đầu tư">Đầu tư</option><option value="Phát triển bền vững">Phát triển bền vững</option>
                      </select>
                    </div>
                    <div><label style={fieldLabel}>Ngày đăng</label><input style={fieldInput} value={n.date || ""} onChange={e => updateItem(i, "date", e.target.value)} /></div>
                    
                    <div>
                      <label style={{ ...fieldLabel, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                        <input type="checkbox" checked={!!n.isFeatured} onChange={e => updateItem(i, "isFeatured", e.target.checked)} />
                        Bài viết nổi bật
                      </label>
                    </div>
                    {n.isFeatured && (
                      <div><label style={fieldLabel}>Thứ tự nổi bật (1, 2, 3)</label><input type="number" style={fieldInput} value={n.featuredOrder || 0} onChange={e => updateItem(i, "featuredOrder", parseInt(e.target.value))} /></div>
                    )}
                    
                    <div><label style={fieldLabel}>Thời gian đọc</label><input style={fieldInput} value={n.readTime || ""} onChange={e => updateItem(i, "readTime", e.target.value)} /></div>
                  </div>
                  <div style={{ marginTop: 10 }}><label style={fieldLabel}>Tóm tắt</label><textarea rows={2} style={{ ...fieldInput, resize: "vertical" as const }} value={n.excerpt || ""} onChange={e => updateItem(i, "excerpt", e.target.value)} /></div>
                  <HTMLEditor label="Nội dung chi tiết" value={n.content || ""} onChange={val => updateItem(i, "content", val)} />
                  <ImagePicker label="Ảnh đại diện" value={n.img || ""} onChange={v => updateItem(i, "img", v)} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <SaveBar saving={saving} saved={saved} onSave={() => save()} />
    </div>
  );
}
