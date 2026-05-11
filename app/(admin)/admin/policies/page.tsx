"use client";
import { useAdminData } from "@/lib/useAdminData";
import { SaveBar, fieldLabel, fieldInput, fieldTextarea, card, cardTitle, grid2 } from "@/components/admin/AdminUI";

const DEFAULT = {
  investmentModel: [
    { label: "Doanh nghiệp", sub: "Tham gia & đóng góp" },
    { label: "Đầu tư", sub: "Vốn và giá trị" },
    { label: "Chuyển đổi số", sub: "Tối ưu và số hoá" },
    { label: "Thương mại hoá", sub: "Phân phối & doanh thu" },
    { label: "Mở rộng quốc tế", sub: "Vươn tầm toàn cầu" },
  ],
  investmentPolicies: [
    { title: "Quy trình minh bạch", desc: "Đảm bảo công khai, minh bạch" },
    { title: "Đòn bẩy đầu tư", desc: "Hỗ trợ toàn diện nguồn vốn" },
    { title: "Tuân thủ pháp lý", desc: "Đảm bảo tuân thủ quy định" },
    { title: "ESG & Bền vững", desc: "Ưu tiên phát triển bền vững" },
  ],
  cooperationTypes: [
    { label: "Doanh nghiệp" }, { label: "Nhà đầu tư" },
    { label: "M&A" }, { label: "Hợp tác quốc tế" },
    { label: "Đối tác phân phối" }, { label: "Hợp tác chiến lược" },
  ],
};

export default function PoliciesPage() {
  const { data, setData, loading, saving, saved, save } = useAdminData("policies", DEFAULT);
  if (loading) return <p>Đang tải...</p>;
  const d = { ...DEFAULT, ...data } as any;

  const updateModel = (i: number, k: string, v: string) => {
    const arr = [...(d.investmentModel || [])]; arr[i] = { ...arr[i], [k]: v };
    setData({ ...d, investmentModel: arr });
  };
  const updatePolicy = (i: number, k: string, v: string) => {
    const arr = [...(d.investmentPolicies || [])]; arr[i] = { ...arr[i], [k]: v };
    setData({ ...d, investmentPolicies: arr });
  };
  const updateCoop = (i: number, k: string, v: string) => {
    const arr = [...(d.cooperationTypes || [])]; arr[i] = { ...arr[i], [k]: v };
    setData({ ...d, cooperationTypes: arr });
  };

  return (
    <div>
      <h1 style={{ fontWeight: 800, fontSize: 22, color: "#0f172a", marginBottom: 4 }}>Chính Sách</h1>
      <p style={{ color: "#64748b", fontSize: 13, marginBottom: 24 }}>Mô hình đầu tư, chính sách đầu tư, chính sách hợp tác</p>

      <div style={card}>
        <div style={cardTitle}>Mô hình đầu tư (5 bước)</div>
        {(d.investmentModel || []).map((m: any, i: number) => (
          <div key={i} style={{ ...grid2, marginBottom: 8 }}>
            <div><label style={fieldLabel}>Bước {i + 1}: Label</label><input style={fieldInput} value={m.label || ""} onChange={e => updateModel(i, "label", e.target.value)} /></div>
            <div><label style={fieldLabel}>Mô tả</label><input style={fieldInput} value={m.sub || ""} onChange={e => updateModel(i, "sub", e.target.value)} /></div>
          </div>
        ))}
      </div>

      <div style={card}>
        <div style={cardTitle}>Chính sách đầu tư (4 mục)</div>
        {(d.investmentPolicies || []).map((p: any, i: number) => (
          <div key={i} style={{ ...grid2, marginBottom: 8 }}>
            <div><label style={fieldLabel}>Tiêu đề</label><input style={fieldInput} value={p.title || ""} onChange={e => updatePolicy(i, "title", e.target.value)} /></div>
            <div><label style={fieldLabel}>Mô tả</label><input style={fieldInput} value={p.desc || ""} onChange={e => updatePolicy(i, "desc", e.target.value)} /></div>
          </div>
        ))}
      </div>

      <div style={card}>
        <div style={cardTitle}>Mô hình hợp tác (6 loại)</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
          {(d.cooperationTypes || []).map((c: any, i: number) => (
            <div key={i}><label style={fieldLabel}>Loại {i + 1}</label><input style={fieldInput} value={c.label || ""} onChange={e => updateCoop(i, "label", e.target.value)} /></div>
          ))}
        </div>
      </div>

      <SaveBar saving={saving} saved={saved} onSave={() => save()} />
    </div>
  );
}
