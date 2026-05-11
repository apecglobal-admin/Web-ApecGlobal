"use client";
import { Save, CheckCircle, Loader } from "lucide-react";

export const fieldLabel: React.CSSProperties = { display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 5 };
export const fieldInput: React.CSSProperties = { width: "100%", padding: "10px 14px", borderRadius: 8, fontSize: 13.5, color: "#0f172a", background: "#fff", border: "1.5px solid #e2e8f0", outline: "none", boxSizing: "border-box" };
export const fieldTextarea: React.CSSProperties = { ...fieldInput, resize: "vertical" as const };
export const card: React.CSSProperties = { background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", padding: "22px 24px", marginBottom: 16 };
export const cardTitle: React.CSSProperties = { fontWeight: 700, fontSize: 15, color: "#0f172a", marginBottom: 16 };
export const grid2: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 };

interface SaveBarProps { saving: boolean; saved: boolean; onSave: () => void; }

export function SaveBar({ saving, saved, onSave }: SaveBarProps) {
  return (
    <div style={{ position: "sticky", bottom: 0, background: "#fff", borderTop: "1px solid #e2e8f0", padding: "12px 24px", margin: "24px -24px -24px", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12 }}>
      {saved && (
        <span style={{ display: "flex", alignItems: "center", gap: 5, color: "#16a34a", fontSize: 13, fontWeight: 500 }}>
          <CheckCircle size={15} /> Đã lưu thành công
        </span>
      )}
      <button onClick={onSave} disabled={saving} style={{
        padding: "10px 24px", borderRadius: 8, fontSize: 13, fontWeight: 700, color: "#fff",
        background: "linear-gradient(135deg,#1d4ed8,#2563eb)", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", gap: 8, boxShadow: "0 2px 8px rgba(37,99,235,0.3)",
        opacity: saving ? 0.7 : 1,
      }}>
        {saving ? <><Loader size={14} style={{ animation: "spin 1s linear infinite" }} /> Đang lưu...</> : <><Save size={14} /> Lưu thay đổi</>}
      </button>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
