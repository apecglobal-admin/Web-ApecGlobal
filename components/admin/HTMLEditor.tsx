"use client";
import { useState, useRef, useEffect } from "react";
import { Bold, Italic, List, ListOrdered, Link, Image as ImageIcon, Code, Type } from "lucide-react";

interface HTMLEditorProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

export default function HTMLEditor({ label, value, onChange }: HTMLEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Initialize content only once
    if (editorRef.current && value) {
      editorRef.current.innerHTML = value;
    }
  }, []);

  const execCommand = (command: string, cmdValue: string = "") => {
    document.execCommand(command, false, cmdValue);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const onInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      if (html !== value) {
        onChange(html);
      }
    }
  };

  if (!isMounted) return null;

  return (
    <div style={{ marginTop: 16 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 8 }}>{label}</label>
      <div style={{ border: "1.5px solid #e2e8f0", borderRadius: 12, overflow: "hidden", background: "#fff" }}>
        {/* Toolbar */}
        <div style={{ padding: "8px", borderBottom: "1.5px solid #e2e8f0", background: "#f8fafc", display: "flex", gap: 4, flexWrap: "wrap" }}>
          <button type="button" onClick={() => execCommand("bold")} title="In đậm" style={btnStyle}><Bold size={16} /></button>
          <button type="button" onClick={() => execCommand("italic")} title="In nghiêng" style={btnStyle}><Italic size={16} /></button>
          <div style={divider} />
          <button type="button" onClick={() => execCommand("insertUnorderedList")} title="Danh sách" style={btnStyle}><List size={16} /></button>
          <button type="button" onClick={() => execCommand("insertOrderedList")} title="Danh sách số" style={btnStyle}><ListOrdered size={16} /></button>
          <div style={divider} />
          <button type="button" onClick={() => {
            const url = prompt("Nhập link:");
            if (url) execCommand("createLink", url);
          }} title="Chèn link" style={btnStyle}><Link size={16} /></button>
          <button type="button" onClick={() => {
            const url = prompt("Nhập link ảnh:");
            if (url) execCommand("insertImage", url);
          }} title="Chèn ảnh" style={btnStyle}><ImageIcon size={16} /></button>
          <div style={divider} />
          <button type="button" onClick={() => execCommand("formatBlock", "h2")} title="Tiêu đề 2" style={btnStyle}>H2</button>
          <button type="button" onClick={() => execCommand("formatBlock", "h3")} title="Tiêu đề 3" style={btnStyle}>H3</button>
          <button type="button" onClick={() => execCommand("formatBlock", "p")} title="Văn bản" style={btnStyle}><Type size={16} /></button>
          <div style={divider} />
          <button type="button" onClick={() => {
            const html = prompt("Dán mã HTML vào đây:", value);
            if (html !== null) {
              if (editorRef.current) editorRef.current.innerHTML = html;
              onChange(html);
            }
          }} title="Sửa HTML" style={btnStyle}><Code size={16} /></button>
        </div>

        {/* Editable Area */}
        <div
          ref={editorRef}
          contentEditable
          onInput={onInput}
          onBlur={onInput}
          style={{ 
            minHeight: "300px", 
            padding: "16px 20px", 
            outline: "none",
            fontSize: "14.5px",
            lineHeight: "1.7",
            color: "#1e293b"
          }}
        />
      </div>
      <style>{`
        .article-content-editor h2 { font-size: 1.5rem; font-weight: 700; margin-top: 1em; }
        .article-content-editor h3 { font-size: 1.25rem; font-weight: 700; margin-top: 1em; }
        .article-content-editor ul, .article-content-editor ol { padding-left: 1.5em; margin: 1em 0; }
        .article-content-editor img { max-width: 100%; border-radius: 8px; }
      `}</style>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  width: 32,
  height: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  background: "transparent",
  borderRadius: 6,
  cursor: "pointer",
  color: "#64748b",
  transition: "all 0.2s",
};

const divider: React.CSSProperties = {
  width: 1,
  height: 20,
  background: "#e2e8f0",
  margin: "6px 4px"
};
