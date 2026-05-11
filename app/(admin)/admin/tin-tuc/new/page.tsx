"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bold,
  Italic,
  List,
  Image,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Code,
  Quote,
  Save,
  Eye,
  Clock,
  Tag,
  Search,
  ChevronDown,
} from "lucide-react";

const categories = ["Sự kiện", "Công nghệ", "Đầu tư", "Phát triển bền vững", "Công bố", "Hợp tác"];

export default function NewsEditorPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [status, setStatus] = useState("draft");
  const [saving, setSaving] = useState(false);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(
      val
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, "d")
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-")
    );
    if (!metaTitle) setMetaTitle(val);
  };

  const handleSave = async (publishStatus: string) => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    alert(`Đã ${publishStatus === "published" ? "đăng" : "lưu nháp"} bài viết!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/tin-tuc"
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-electric-700/40 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-display font-bold text-white text-xl">Tạo bài viết mới</h1>
            <p className="text-slate-500 text-xs mt-0.5">Nhập nội dung và cấu hình SEO</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSave("draft")}
            disabled={saving}
            className="btn-outline text-sm"
          >
            <Save className="w-4 h-4" />
            Lưu nháp
          </button>
          <button
            onClick={() => handleSave("published")}
            disabled={saving}
            className="btn-primary text-sm"
            id="news-publish-btn"
          >
            {saving ? "Đang lưu..." : "Đăng bài"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Editor area */}
        <div className="xl:col-span-2 space-y-5">
          {/* Title */}
          <div className="admin-card">
            <label className="text-slate-400 text-xs mb-2 block">Tiêu đề bài viết *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Nhập tiêu đề bài viết..."
              className="input-apec text-white text-lg font-medium mb-3"
              id="news-title"
            />
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Slug:</span>
              <span className="text-electric-400 font-mono">{slug || "tu-dong-tao-tu-tieu-de"}</span>
            </div>
          </div>

          {/* Excerpt */}
          <div className="admin-card">
            <label className="text-slate-400 text-xs mb-2 block">Tóm tắt (mô tả ngắn)</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Nhập tóm tắt ngắn về bài viết (hiển thị ở trang danh sách)..."
              className="input-apec resize-none text-sm"
              rows={3}
              id="news-excerpt"
            />
            <div className="text-right text-xs text-slate-600 mt-1">
              {excerpt.length}/160 ký tự
            </div>
          </div>

          {/* Rich text editor */}
          <div className="admin-card">
            <label className="text-slate-400 text-xs mb-3 block">Nội dung bài viết</label>

            {/* Toolbar */}
            <div
              className="flex flex-wrap items-center gap-1 p-2 rounded-xl mb-3 border border-white/5"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              {[
                { icon: Bold, label: "In đậm", cmd: "bold" },
                { icon: Italic, label: "In nghiêng", cmd: "italic" },
                { icon: Quote, label: "Trích dẫn", cmd: "quote" },
                { icon: Code, label: "Code", cmd: "code" },
                { icon: List, label: "Danh sách", cmd: "list" },
                { icon: AlignLeft, label: "Căn trái", cmd: "left" },
                { icon: AlignCenter, label: "Căn giữa", cmd: "center" },
                { icon: AlignRight, label: "Căn phải", cmd: "right" },
                { icon: LinkIcon, label: "Chèn link", cmd: "link" },
                { icon: Image, label: "Chèn ảnh", cmd: "image" },
              ].map(({ icon: Icon, label, cmd }) => (
                <button
                  key={cmd}
                  title={label}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>

            {/* Content area */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Bắt đầu nhập nội dung bài viết... Hỗ trợ Markdown cơ bản."
              className="input-apec resize-none text-sm font-mono leading-relaxed"
              rows={16}
              id="news-content"
            />
            <div className="flex items-center justify-between mt-2 text-xs text-slate-600">
              <span>Hỗ trợ Markdown</span>
              <span>{content.split(/\s+/).filter(Boolean).length} từ</span>
            </div>
          </div>

          {/* SEO */}
          <div className="admin-card">
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-4 h-4 text-electric-500" />
              <h3 className="font-display font-bold text-white text-sm">SEO & Metadata</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-slate-400 text-xs mb-1.5 block">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="Tiêu đề SEO (khuyến nghị < 60 ký tự)"
                  className="input-apec text-sm"
                  id="news-meta-title"
                />
                <div className="flex justify-between text-xs text-slate-600 mt-1">
                  <span className={metaTitle.length > 60 ? "text-red-400" : ""}>
                    {metaTitle.length}/60 ký tự
                  </span>
                  {metaTitle.length > 60 && (
                    <span className="text-red-400">⚠ Quá giới hạn</span>
                  )}
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-xs mb-1.5 block">
                  Meta Description
                </label>
                <textarea
                  value={metaDesc}
                  onChange={(e) => setMetaDesc(e.target.value)}
                  placeholder="Mô tả SEO (khuyến nghị < 160 ký tự)"
                  className="input-apec text-sm resize-none"
                  rows={3}
                  id="news-meta-desc"
                />
                <div className="flex justify-between text-xs text-slate-600 mt-1">
                  <span className={metaDesc.length > 160 ? "text-red-400" : ""}>
                    {metaDesc.length}/160 ký tự
                  </span>
                </div>
              </div>

              {/* SEO preview */}
              {(metaTitle || metaDesc) && (
                <div
                  className="p-4 rounded-xl border border-white/5"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <div className="text-xs text-slate-500 mb-2">Xem trước kết quả tìm kiếm Google:</div>
                  <div className="text-blue-400 text-sm font-medium hover:underline cursor-pointer">
                    {metaTitle || title}
                  </div>
                  <div className="text-green-600 text-xs mt-0.5">
                    https://apecglobal.vn/tin-tuc/{slug}
                  </div>
                  <div className="text-slate-400 text-xs mt-1 line-clamp-2">
                    {metaDesc || excerpt}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Publish settings */}
          <div className="admin-card">
            <h3 className="font-display font-bold text-white text-sm mb-4">
              Cài đặt đăng bài
            </h3>

            <div className="space-y-4">
              {/* Status */}
              <div>
                <label className="text-slate-400 text-xs mb-1.5 block">Trạng thái</label>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="input-apec text-sm appearance-none pr-8"
                    id="news-status"
                  >
                    <option value="draft" className="bg-navy-900">Nháp</option>
                    <option value="published" className="bg-navy-900">Đã đăng</option>
                    <option value="scheduled" className="bg-navy-900">Lên lịch</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* Scheduled date */}
              {status === "scheduled" && (
                <div>
                  <label className="text-slate-400 text-xs mb-1.5 block">
                    Thời gian đăng
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="datetime-local"
                      className="input-apec text-sm pl-10"
                      id="news-schedule"
                    />
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-white/5 flex gap-2">
                <button
                  onClick={() => handleSave("draft")}
                  className="flex-1 btn-outline text-xs py-2"
                >
                  Lưu nháp
                </button>
                <button
                  onClick={() => handleSave("published")}
                  className="flex-1 btn-primary text-xs py-2"
                >
                  Đăng ngay
                </button>
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="admin-card">
            <h3 className="font-display font-bold text-white text-sm mb-4">Danh mục</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={category === cat}
                    onChange={() => setCategory(cat)}
                    className="w-3.5 h-3.5 accent-blue-600"
                  />
                  <span className="text-slate-400 text-sm group-hover:text-white transition-colors">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="admin-card">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-electric-500" />
              <h3 className="font-display font-bold text-white text-sm">Thẻ tag</h3>
            </div>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Nhập tag, cách nhau bằng dấu phẩy..."
              className="input-apec text-sm"
              id="news-tags"
            />
            {tags && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {tags
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-electric-900/20 border border-electric-700/20 text-electric-400 text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
              </div>
            )}
          </div>

          {/* Featured image */}
          <div className="admin-card">
            <h3 className="font-display font-bold text-white text-sm mb-4">Ảnh đại diện</h3>
            <div
              className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-electric-700/40 transition-colors cursor-pointer"
              onClick={() => {}}
            >
              <Image className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-slate-500 text-xs">
                Kéo thả hoặc click để tải ảnh lên
              </p>
              <p className="text-slate-600 text-[10px] mt-1">PNG, JPG, WebP tối đa 5MB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
