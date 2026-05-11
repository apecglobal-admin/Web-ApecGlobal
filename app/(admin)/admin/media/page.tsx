"use client";
import { useState, useEffect } from "react";
import { Upload, Trash2, Image as ImgIcon } from "lucide-react";

interface FileInfo { name: string; url: string; size: number; modified: string; }

export default function MediaPage() {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const res = await fetch("/api/admin/upload");
    setFiles(await res.json());
  };
  useEffect(() => { load(); }, []);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData(); fd.append("file", file);
    await fetch("/api/admin/upload", { method: "POST", body: fd });
    setUploading(false);
    load();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + "B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + "KB";
    return (bytes / 1048576).toFixed(1) + "MB";
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div><h1 style={{ fontWeight: 800, fontSize: 22, color: "#0f172a", marginBottom: 4 }}>Thư Viện Ảnh</h1><p style={{ color: "#64748b", fontSize: 13 }}>{files.length} hình ảnh</p></div>
        <label style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "#2563eb", color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
          <Upload size={14} /> {uploading ? "Đang tải..." : "Upload ảnh"}
          <input type="file" accept="image/*" onChange={upload} style={{ display: "none" }} />
        </label>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12 }}>
        {files.map(f => (
          <div key={f.name} style={{ background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #e2e8f0" }}>
            <div style={{ aspectRatio: "1", position: "relative", background: "#f1f5f9" }}>
              <img src={f.url} alt={f.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ padding: "8px 10px" }}>
              <div style={{ fontSize: 11, color: "#334155", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</div>
              <div style={{ fontSize: 10, color: "#94a3b8" }}>{formatSize(f.size)}</div>
            </div>
          </div>
        ))}
        {files.length === 0 && (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 60, color: "#94a3b8" }}>
            <ImgIcon size={40} style={{ marginBottom: 12, opacity: 0.4 }} />
            <p>Chưa có ảnh nào. Nhấn "Upload ảnh" để bắt đầu.</p>
          </div>
        )}
      </div>
    </div>
  );
}
