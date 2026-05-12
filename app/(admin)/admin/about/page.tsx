"use client";
import { useAdminData } from "@/lib/useAdminData";
import { SaveBar, fieldLabel, fieldInput, fieldTextarea, card, cardTitle, grid2 } from "@/components/admin/AdminUI";
import ImagePicker from "@/components/admin/ImagePicker";

export default function AboutPage() {
  const { data, setData, loading, saving, saved, save } = useAdminData("about", {} as any);
  if (loading) return <p>Đang tải...</p>;
  const u = (k: string, v: any) => setData((p: any) => ({ ...p, [k]: v }));
  const uNested = (parent: string, k: string, v: any) => setData((p: any) => ({ ...p, [parent]: { ...p[parent], [k]: v } }));

  return (
    <div>
      <h1 style={{ fontWeight: 800, fontSize: 22, color: "#0f172a", marginBottom: 4 }}>Giới Thiệu</h1>
      <p style={{ color: "#64748b", fontSize: 13, marginBottom: 24 }}>Quản lý nội dung trang Giới thiệu và mục giới thiệu trang chủ</p>

      <div style={card}>
        <div style={cardTitle}>Banner trang Giới thiệu</div>
        <div><label style={fieldLabel}>Label (ví dụ: VỀ CHÚNG TÔI)</label><input style={fieldInput} value={data.bannerLabel || ""} onChange={e => u("bannerLabel", e.target.value)} /></div>
        <div style={{ marginTop: 10 }}><label style={fieldLabel}>Tiêu đề Banner</label><input style={fieldInput} value={data.bannerTitle || ""} onChange={e => u("bannerTitle", e.target.value)} /></div>
        <div style={{ marginTop: 10 }}><label style={fieldLabel}>Mô tả Banner</label><textarea rows={2} style={fieldTextarea} value={data.bannerDesc || ""} onChange={e => u("bannerDesc", e.target.value)} /></div>
      </div>

      <div style={card}>
        <div style={cardTitle}>Trụ sở APEC Global (Hình ảnh & Địa chỉ)</div>
        <ImagePicker label="Ảnh văn phòng / Trụ sở" value={data.officeImg || ""} onChange={v => u("officeImg", v)} />
        <div style={{ ...grid2, marginTop: 10 }}>
          <div><label style={fieldLabel}>Tên hiển thị (vd: Trụ sở APEC Global)</label><input style={fieldInput} value={data.officeTitle || ""} onChange={e => u("officeTitle", e.target.value)} /></div>
          <div><label style={fieldLabel}>Địa chỉ chi tiết</label><input style={fieldInput} value={data.officeAddress || ""} onChange={e => u("officeAddress", e.target.value)} /></div>
        </div>
      </div>

      <div style={card}>
        <div style={cardTitle}>Nội dung Giới thiệu (Hiển thị cả ở Trang chủ)</div>
        <div><label style={fieldLabel}>Nhãn mục (vd: VỀ CHÚNG TÔI)</label><input style={fieldInput} value={data.sectionLabel || ""} onChange={e => u("sectionLabel", e.target.value)} /></div>
        <div style={{ marginTop: 10 }}><label style={fieldLabel}>Tiêu đề chính</label><textarea rows={3} style={fieldTextarea} value={data.heading || ""} onChange={e => u("heading", e.target.value)} /></div>
        <div style={{ ...grid2, marginTop: 10 }}>
          <div><label style={fieldLabel}>Đoạn mô tả 1 (Xuống dòng sẽ được giữ nguyên)</label><textarea rows={4} style={fieldTextarea} value={data.description1 || ""} onChange={e => u("description1", e.target.value)} /></div>
          <div><label style={fieldLabel}>Đoạn mô tả 2</label><textarea rows={4} style={fieldTextarea} value={data.description2 || ""} onChange={e => u("description2", e.target.value)} /></div>
        </div>
      </div>

      <div style={card}>
        <div style={cardTitle}>Tầm nhìn & Sứ mệnh</div>
        <div style={grid2}>
          <div>
            <label style={fieldLabel}>Tiêu đề Tầm nhìn</label><input style={fieldInput} value={data.vision?.title || ""} onChange={e => uNested("vision", "title", e.target.value)} />
            <label style={{ ...fieldLabel, marginTop: 10 }}>Nội dung</label><textarea rows={3} style={fieldTextarea} value={data.vision?.content || ""} onChange={e => uNested("vision", "content", e.target.value)} />
          </div>
          <div>
            <label style={fieldLabel}>Tiêu đề Sứ mệnh</label><input style={fieldInput} value={data.mission?.title || ""} onChange={e => uNested("mission", "title", e.target.value)} />
            <label style={{ ...fieldLabel, marginTop: 10 }}>Nội dung</label><textarea rows={3} style={fieldTextarea} value={data.mission?.content || ""} onChange={e => uNested("mission", "content", e.target.value)} />
          </div>
        </div>
      </div>

      <div style={card}>
        <div style={cardTitle}>Giá trị cốt lõi</div>
        {(data.coreValues || []).map((v: any, i: number) => (
          <div key={i} style={{ padding: 12, border: "1px solid #f1f5f9", borderRadius: 10, marginBottom: 10 }}>
            <div style={grid2}>
              <div><label style={fieldLabel}>Icon (ví dụ: Sun, Heart, Users...)</label><input style={fieldInput} value={v.icon || ""} onChange={e => { const a = [...data.coreValues]; a[i] = { ...a[i], icon: e.target.value }; u("coreValues", a); }} /></div>
              <div><label style={fieldLabel}>Tên giá trị</label><input style={fieldInput} value={v.label || ""} onChange={e => { const a = [...data.coreValues]; a[i] = { ...a[i], label: e.target.value }; u("coreValues", a); }} /></div>
            </div>
            <div style={{ marginTop: 8 }}><label style={fieldLabel}>Mô tả</label><textarea rows={2} style={fieldTextarea} value={v.desc || ""} onChange={e => { const a = [...data.coreValues]; a[i] = { ...a[i], desc: e.target.value }; u("coreValues", a); }} /></div>
          </div>
        ))}
      </div>

      <div style={card}>
        <div style={cardTitle}>Lịch sử phát triển (Milestones)</div>
        {(data.timeline || []).map((t: any, i: number) => (
          <div key={i} style={{ padding: 12, border: "1px solid #f1f5f9", borderRadius: 10, marginBottom: 10 }}>
            <div style={grid2}>
              <div><label style={fieldLabel}>Năm</label><input style={fieldInput} value={t.year || ""} onChange={e => { const a = [...data.timeline]; a[i] = { ...a[i], year: e.target.value }; u("timeline", a); }} /></div>
              <div><label style={fieldLabel}>Tiêu đề</label><input style={fieldInput} value={t.title || ""} onChange={e => { const a = [...data.timeline]; a[i] = { ...a[i], title: e.target.value }; u("timeline", a); }} /></div>
            </div>
            <div style={{ marginTop: 8 }}><label style={fieldLabel}>Mô tả ngắn</label><textarea rows={2} style={fieldTextarea} value={t.desc || ""} onChange={e => { const a = [...data.timeline]; a[i] = { ...a[i], desc: e.target.value }; u("timeline", a); }} /></div>
          </div>
        ))}
      </div>

      <div style={card}>
        <div style={cardTitle}>Đội ngũ lãnh đạo</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {(data.leaders || []).map((l: any, i: number) => (
            <div key={i} style={{ padding: 12, border: "1px solid #f1f5f9", borderRadius: 10 }}>
              <ImagePicker label="Ảnh" value={l.img || ""} onChange={v => { const a = [...data.leaders]; a[i] = { ...a[i], img: v }; u("leaders", a); }} />
              <div style={{ marginTop: 8 }}><label style={fieldLabel}>Họ tên</label><input style={fieldInput} value={l.name || ""} onChange={e => { const a = [...data.leaders]; a[i] = { ...a[i], name: e.target.value }; u("leaders", a); }} /></div>
              <div style={{ marginTop: 8 }}><label style={fieldLabel}>Chức vụ</label><input style={fieldInput} value={l.role || ""} onChange={e => { const a = [...data.leaders]; a[i] = { ...a[i], role: e.target.value }; u("leaders", a); }} /></div>
            </div>
          ))}
        </div>
      </div>

      <SaveBar saving={saving} saved={saved} onSave={() => save()} />
    </div>
  );
}
