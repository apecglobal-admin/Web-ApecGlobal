"use client";
import { useState, useCallback } from "react";
import { Upload, Image as ImgIcon, X, Check } from "lucide-react";

interface Props { value: string; onChange: (url: string) => void; label?: string; }

export default function ImagePicker({ value, onChange, label }: Props) {
  const [uploading, setUploading] = useState(false);
  const [showLib, setShowLib] = useState(false);
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) onChange(data.url);
    } catch (err) { console.error(err); }
    setUploading(false);
  };

  const loadLibrary = async () => {
    const res = await fetch("/api/admin/upload");
    const data = await res.json();
    setFiles(data);
    setShowLib(true);
  };

  return (
    <div style={{ marginBottom: 12 }}>
      {label && <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 6 }}>{label}</label>}
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        {value && (
          <div style={{ position: "relative", width: 80, height: 80, borderRadius: 8, overflow: "hidden", border: "1px solid #e2e8f0", flexShrink: 0 }}>
            <img src={value} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <button onClick={() => onChange("")} style={{ position: "absolute", top: 2, right: 2, width: 20, height: 20, borderRadius: "50%", background: "rgba(0,0,0,0.6)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
              <X size={12} />
            </button>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 6, border: "1px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", fontSize: 12, color: "#475569", fontWeight: 500 }}>
            <Upload size={14} /> {uploading ? "Đang tải..." : "Tải ảnh lên"}
            <input type="file" accept="image/*" onChange={upload} style={{ display: "none" }} />
          </label>
          <button type="button" onClick={loadLibrary} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 6, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", fontSize: 12, color: "#475569", fontWeight: 500 }}>
            <ImgIcon size={14} /> Thư viện ảnh
          </button>
          {value && <input type="text" value={value} onChange={e => onChange(e.target.value)} style={{ padding: "5px 10px", borderRadius: 6, border: "1px solid #e2e8f0", fontSize: 11, color: "#64748b", width: 200, boxSizing: "border-box" }} />}
        </div>
      </div>

      {showLib && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 700, maxHeight: "80vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "14px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", margin: 0 }}>Thư viện ảnh</h3>
              <button onClick={() => setShowLib(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}><X size={18} /></button>
            </div>
            <div style={{ padding: 20, overflowY: "auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
              {files.map(f => (
                <div key={f.name} onClick={() => { onChange(f.url); setShowLib(false); }} style={{ cursor: "pointer", borderRadius: 8, overflow: "hidden", border: value === f.url ? "2px solid #2563eb" : "1px solid #e2e8f0", aspectRatio: "1", position: "relative" }}>
                  <img src={f.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  {value === f.url && <div style={{ position: "absolute", top: 4, right: 4, width: 20, height: 20, borderRadius: "50%", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}><Check size={12} color="#fff" /></div>}
                </div>
              ))}
              {files.length === 0 && <p style={{ gridColumn: "1/-1", color: "#94a3b8", textAlign: "center", padding: 40 }}>Chưa có ảnh nào</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
