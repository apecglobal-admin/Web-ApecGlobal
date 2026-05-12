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
  principles: [],
  process: [],
};

export default function InvestmentPolicyPage() {
  const { data, setData, loading, saving, saved, save } = useAdminData("investment-policy", DEFAULT);
  if (loading) return <p>Đang tải...</p>;
  const d = { ...DEFAULT, ...data } as any;

  const u = (k: string, v: any) => setData((p: any) => ({ ...p, [k]: v }));

  const updateModel = (i: number, k: string, v: string) => {
    const arr = [...(d.investmentModel || [])]; arr[i] = { ...arr[i], [k]: v };
    setData({ ...d, investmentModel: arr });
  };
  const updatePolicy = (i: number, k: string, v: string) => {
    const arr = [...(d.investmentPolicies || [])]; arr[i] = { ...arr[i], [k]: v };
    setData({ ...d, investmentPolicies: arr });
  };
  const updatePrinciple = (i: number, k: string, v: string) => {
    const arr = [...(d.principles || [])]; arr[i] = { ...arr[i], [k]: v };
    setData({ ...d, principles: arr });
  };
  const updateProcess = (i: number, k: string, v: string) => {
    const arr = [...(d.process || [])]; arr[i] = { ...arr[i], [k]: v };
    setData({ ...d, process: arr });
  };

  return (
    <div>
      <h1 style={{ fontWeight: 800, fontSize: 22, color: "#0f172a", marginBottom: 4 }}>Chính Sách Đầu Tư</h1>
      <p style={{ color: "#64748b", fontSize: 13, marginBottom: 24 }}>Quản lý nội dung trang Chính sách đầu tư</p>

      <div style={card}>
        <div style={cardTitle}>Banner trang Chính sách đầu tư</div>
        <div><label style={fieldLabel}>Label Banner</label><input style={fieldInput} value={d.bannerLabel || ""} onChange={e => u("bannerLabel", e.target.value)} /></div>
        <div style={{ marginTop: 10 }}><label style={fieldLabel}>Tiêu đề Banner</label><input style={fieldInput} value={d.bannerTitle || ""} onChange={e => u("bannerTitle", e.target.value)} /></div>
        <div style={{ marginTop: 10 }}><label style={fieldLabel}>Mô tả Banner</label><textarea rows={2} style={fieldTextarea} value={d.bannerDesc || ""} onChange={e => u("bannerDesc", e.target.value)} /></div>
      </div>

      <div style={card}>
        <div style={cardTitle}>Chính sách đầu tư</div>
        {(d.investmentPolicies || []).map((p: any, i: number) => (
          <div key={i} style={{ ...grid2, marginBottom: 8 }}>
            <div><label style={fieldLabel}>Tiêu đề</label><input style={fieldInput} value={p.title || ""} onChange={e => updatePolicy(i, "title", e.target.value)} /></div>
            <div><label style={fieldLabel}>Mô tả</label><input style={fieldInput} value={p.desc || ""} onChange={e => updatePolicy(i, "desc", e.target.value)} /></div>
          </div>
        ))}
      </div>

      <div style={card}>
        <div style={cardTitle}>Nguyên tắc đầu tư</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {(d.principles || []).map((p: any, i: number) => (
            <div key={i} style={{ padding: 12, border: "1px solid #f1f5f9", borderRadius: 10 }}>
              <div><label style={fieldLabel}>Icon (Lucide)</label><input style={fieldInput} value={p.icon || ""} onChange={e => updatePrinciple(i, "icon", e.target.value)} /></div>
              <div style={{ marginTop: 8 }}><label style={fieldLabel}>Tiêu đề</label><input style={fieldInput} value={p.title || ""} onChange={e => updatePrinciple(i, "title", e.target.value)} /></div>
              <div style={{ marginTop: 8 }}><label style={fieldLabel}>Mô tả</label><textarea rows={2} style={fieldTextarea} value={p.desc || ""} onChange={e => updatePrinciple(i, "desc", e.target.value)} /></div>
            </div>
          ))}
        </div>
      </div>

      <div style={card}>
        <div style={cardTitle}>Quy trình đầu tư</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {(d.process || []).map((p: any, i: number) => (
            <div key={i} style={{ padding: 12, border: "1px solid #f1f5f9", borderRadius: 10 }}>
              <div style={grid2}>
                <div><label style={fieldLabel}>Bước (ví dụ: 01)</label><input style={fieldInput} value={p.step || ""} onChange={e => updateProcess(i, "step", e.target.value)} /></div>
                <div><label style={fieldLabel}>Tiêu đề</label><input style={fieldInput} value={p.title || ""} onChange={e => updateProcess(i, "title", e.target.value)} /></div>
              </div>
              <div style={{ marginTop: 8 }}><label style={fieldLabel}>Mô tả</label><textarea rows={2} style={fieldTextarea} value={p.desc || ""} onChange={e => updateProcess(i, "desc", e.target.value)} /></div>
            </div>
          ))}
        </div>
      </div>

      <div style={card}>
        <div style={cardTitle}>Mô hình đầu tư (5 bước)</div>
        {(d.investmentModel || []).map((m: any, i: number) => (
          <div key={i} style={{ ...grid2, marginBottom: 8 }}>
            <div><label style={fieldLabel}>Bước {i + 1}: Label</label><input style={fieldInput} value={m.label || ""} onChange={e => updateModel(i, "label", e.target.value)} /></div>
            <div><label style={fieldLabel}>Mô tả</label><input style={fieldInput} value={m.sub || ""} onChange={e => updateModel(i, "sub", e.target.value)} /></div>
          </div>
        ))}
      </div>

      <SaveBar saving={saving} saved={saved} onSave={() => save()} />
    </div>
  );
}
