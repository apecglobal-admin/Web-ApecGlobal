"use client";
import { useAdminData } from "@/lib/useAdminData";
import { SaveBar, fieldLabel, fieldInput, fieldTextarea, card, cardTitle, grid2 } from "@/components/admin/AdminUI";
import ImagePicker from "@/components/admin/ImagePicker";

export default function IntroPage() {
  const { data, setData, loading, saving, saved, save } = useAdminData("intro", {} as any);
  if (loading) return <p>Đang tải...</p>;
  const u = (k: string, v: any) => setData((p: any) => ({ ...p, [k]: v }));

  const navButtons = data.navButtons || [];
  const bottomItems = data.bottomItems || [];

  const updateNav = (idx: number, field: string, val: any) => {
    const arr = [...navButtons];
    arr[idx] = { ...arr[idx], [field]: val };
    u("navButtons", arr);
  };

  const updateBottom = (idx: number, field: string, val: any) => {
    const arr = [...bottomItems];
    arr[idx] = { ...arr[idx], [field]: val };
    u("bottomItems", arr);
  };

  return (
    <div>
      <h1 style={{ fontWeight: 800, fontSize: 22, color: "#0f172a", marginBottom: 4 }}>Trang Intro</h1>
      <p style={{ color: "#64748b", fontSize: 13, marginBottom: 24 }}>Nội dung trang giới thiệu đầu tiên khi vào website</p>

      {/* Headline & Description */}
      <div style={card}>
        <div style={cardTitle}>Tiêu đề & Mô tả</div>
        <div style={grid2}>
          <div>
            <label style={fieldLabel}>Tiêu đề dòng 1</label>
            <input style={fieldInput} value={data.headline1 || ""} onChange={e => u("headline1", e.target.value)} />
          </div>
          <div>
            <label style={fieldLabel}>Tiêu đề dòng 2</label>
            <input style={fieldInput} value={data.headline2 || ""} onChange={e => u("headline2", e.target.value)} />
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <label style={fieldLabel}>Slogan tiếng Anh</label>
          <input style={fieldInput} value={data.sloganEn || ""} onChange={e => u("sloganEn", e.target.value)} />
        </div>
        <div style={{ marginTop: 12 }}>
          <label style={fieldLabel}>Mô tả</label>
          <textarea style={{ ...fieldTextarea, minHeight: 80 }} value={data.description || ""} onChange={e => u("description", e.target.value)} />
        </div>
        <div style={{ marginTop: 12 }}>
          <label style={fieldLabel}>Nút vào trang chủ</label>
          <input style={fieldInput} value={data.enterButtonText || ""} onChange={e => u("enterButtonText", e.target.value)} />
        </div>
      </div>

      {/* Background */}
      <div style={card}>
        <div style={cardTitle}>Hình nền</div>
        <ImagePicker label="Hình nền trang intro (tỷ lệ 16:9)" value={data.backgroundImage || ""} onChange={v => u("backgroundImage", v)} />
      </div>

      {/* Nav Buttons */}
      <div style={card}>
        <div style={cardTitle}>Nút điều hướng (4 nút)</div>
        <div style={{ display: "grid", gap: 16 }}>
          {navButtons.map((btn: any, i: number) => (
            <div key={i} style={{ padding: 16, background: "#f8fafc", borderRadius: 10, border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1d4ed8", marginBottom: 10 }}>Nút {i + 1}</div>
              <div style={{ marginBottom: 12 }}>
                <ImagePicker
                  label="Icon (PNG trong suốt, kích thước 64x64 hoặc 128x128)"
                  value={btn.icon || ""}
                  onChange={v => updateNav(i, "icon", v)}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                <div>
                  <label style={fieldLabel}>Dòng 1</label>
                  <input style={fieldInput} value={btn.label || ""} onChange={e => updateNav(i, "label", e.target.value)} />
                </div>
                <div>
                  <label style={fieldLabel}>Dòng 2</label>
                  <input style={fieldInput} value={btn.sub || ""} onChange={e => updateNav(i, "sub", e.target.value)} />
                </div>
                <div>
                  <label style={fieldLabel}>Link</label>
                  <input style={fieldInput} value={btn.href || ""} onChange={e => updateNav(i, "href", e.target.value)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Items */}
      <div style={card}>
        <div style={cardTitle}>Thanh thông tin (4 mục)</div>
        <div style={{ display: "grid", gap: 16 }}>
          {bottomItems.map((item: any, i: number) => (
            <div key={i} style={{ padding: 16, background: "#f8fafc", borderRadius: 10, border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1d4ed8", marginBottom: 10 }}>Mục {i + 1}</div>
              <div style={{ marginBottom: 12 }}>
                <ImagePicker
                  label="Icon (PNG trong suốt, kích thước 64x64 hoặc 128x128)"
                  value={item.icon || ""}
                  onChange={v => updateBottom(i, "icon", v)}
                />
              </div>
              <div style={grid2}>
                <div>
                  <label style={fieldLabel}>Tiêu đề</label>
                  <input style={fieldInput} value={item.title || ""} onChange={e => updateBottom(i, "title", e.target.value)} />
                </div>
                <div>
                  <label style={fieldLabel}>Mô tả</label>
                  <textarea style={{ ...fieldTextarea, minHeight: 50 }} value={item.desc || ""} onChange={e => updateBottom(i, "desc", e.target.value)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SaveBar saving={saving} saved={saved} onSave={() => save()} />
    </div>
  );
}
