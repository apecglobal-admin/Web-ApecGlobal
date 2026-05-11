"use client";

import { useState } from "react";
import { Save, Eye, EyeOff, Image, Upload, RefreshCcw } from "lucide-react";

export default function AdminBannerPage() {
  const [visible, setVisible] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    badge: "Tập đoàn đầu tư đa ngành",
    headline1: "CREATING VALUE",
    headline2: "OWNING THE FUTURE",
    description: "APEC Global đầu tư và phát triển hệ sinh thái đa ngành, kiến tạo giá trị bền vững và đồng hành cùng doanh nghiệp tiến hành hành trình phát triển dài hạn.",
    cta1Text: "Tìm hiểu hệ sinh thái",
    cta1Link: "/he-sinh-thai",
    cta2Text: "Đăng ký hợp tác",
    cta2Link: "/lien-he",
    showParticles: true,
    showLightLines: true,
    overlayOpacity: "85",
  });

  const handleChange = (field: string, value: string | boolean) => {
    setForm((p) => ({ ...p, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    alert("Đã lưu cài đặt Banner!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-white text-2xl">Quản lý Banner Hero</h1>
          <p className="text-slate-500 text-sm mt-1">Chỉnh sửa nội dung và hiệu ứng banner trang chủ</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setVisible((v) => !v)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
              visible
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"
            }`}
          >
            {visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {visible ? "Đang hiện" : "Đang ẩn"}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary text-sm"
          >
            <Save className="w-4 h-4" />
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </div>

      {/* Preview mini */}
      <div
        className="relative rounded-2xl overflow-hidden border border-white/10"
        style={{
          background: "linear-gradient(135deg, #020B1A 0%, #0A1628 60%, #0D2847 100%)",
          height: "160px",
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-center px-8">
          <div className="text-electric-400 text-xs font-semibold mb-2">⬥ {form.badge}</div>
          <div className="font-black text-white text-2xl leading-tight">
            {form.headline1}
          </div>
          <div
            className="font-black text-2xl leading-tight"
            style={{
              background: "linear-gradient(135deg, #0066FF, #00D4FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {form.headline2}
          </div>
        </div>
        <div className="absolute top-3 right-3 text-xs text-slate-500 bg-black/40 px-2 py-1 rounded">
          Xem trước
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Text content */}
        <div className="admin-card space-y-5">
          <h2 className="font-display font-bold text-white text-sm">Nội dung văn bản</h2>

          <div>
            <label className="text-slate-400 text-xs mb-1.5 block">Badge / Label nhỏ</label>
            <input
              type="text"
              value={form.badge}
              onChange={(e) => handleChange("badge", e.target.value)}
              className="input-apec text-sm"
            />
          </div>

          <div>
            <label className="text-slate-400 text-xs mb-1.5 block">Dòng tiêu đề 1 (trắng)</label>
            <input
              type="text"
              value={form.headline1}
              onChange={(e) => handleChange("headline1", e.target.value)}
              className="input-apec text-sm font-bold"
            />
          </div>

          <div>
            <label className="text-slate-400 text-xs mb-1.5 block">Dòng tiêu đề 2 (gradient xanh)</label>
            <input
              type="text"
              value={form.headline2}
              onChange={(e) => handleChange("headline2", e.target.value)}
              className="input-apec text-sm font-bold"
            />
          </div>

          <div>
            <label className="text-slate-400 text-xs mb-1.5 block">Mô tả ngắn</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="input-apec text-sm resize-none"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 text-xs mb-1.5 block">Nút CTA 1 - Text</label>
              <input
                type="text"
                value={form.cta1Text}
                onChange={(e) => handleChange("cta1Text", e.target.value)}
                className="input-apec text-sm"
              />
            </div>
            <div>
              <label className="text-slate-400 text-xs mb-1.5 block">Nút CTA 1 - Link</label>
              <input
                type="text"
                value={form.cta1Link}
                onChange={(e) => handleChange("cta1Link", e.target.value)}
                className="input-apec text-sm"
              />
            </div>
            <div>
              <label className="text-slate-400 text-xs mb-1.5 block">Nút CTA 2 - Text</label>
              <input
                type="text"
                value={form.cta2Text}
                onChange={(e) => handleChange("cta2Text", e.target.value)}
                className="input-apec text-sm"
              />
            </div>
            <div>
              <label className="text-slate-400 text-xs mb-1.5 block">Nút CTA 2 - Link</label>
              <input
                type="text"
                value={form.cta2Link}
                onChange={(e) => handleChange("cta2Link", e.target.value)}
                className="input-apec text-sm"
              />
            </div>
          </div>
        </div>

        {/* Background & Effects */}
        <div className="space-y-5">
          {/* Background image */}
          <div className="admin-card">
            <h2 className="font-display font-bold text-white text-sm mb-4">Ảnh nền</h2>
            <div
              className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-electric-700/40 transition-colors cursor-pointer"
            >
              <Image className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-slate-500 text-xs">Tải ảnh nền hero lên</p>
              <p className="text-slate-600 text-[10px] mt-1">Khuyến nghị: 1920×1080px, JPEG/WebP</p>
              <button className="btn-outline text-xs mt-3 py-1.5 px-3">
                <Upload className="w-3 h-3" />
                Chọn ảnh
              </button>
            </div>
          </div>

          {/* Effects */}
          <div className="admin-card space-y-5">
            <h2 className="font-display font-bold text-white text-sm">Hiệu ứng</h2>

            <div className="space-y-3">
              {[
                { key: "showParticles", label: "Hiệu ứng hạt (particles)" },
                { key: "showLightLines", label: "Đường ánh sáng chạy ngang" },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center justify-between cursor-pointer">
                  <span className="text-slate-300 text-sm">{label}</span>
                  <div
                    className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                      form[key as keyof typeof form]
                        ? "bg-electric-600"
                        : "bg-white/10"
                    }`}
                    onClick={() =>
                      handleChange(key, !form[key as keyof typeof form])
                    }
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full m-1 transition-transform duration-200 ${
                        form[key as keyof typeof form]
                          ? "translate-x-5"
                          : "translate-x-0"
                      }`}
                    />
                  </div>
                </label>
              ))}
            </div>

            <div>
              <label className="text-slate-400 text-xs mb-2 flex justify-between">
                <span>Độ mờ overlay</span>
                <span className="text-white">{form.overlayOpacity}%</span>
              </label>
              <input
                type="range"
                min="40"
                max="95"
                value={form.overlayOpacity}
                onChange={(e) => handleChange("overlayOpacity", e.target.value)}
                className="w-full accent-blue-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
