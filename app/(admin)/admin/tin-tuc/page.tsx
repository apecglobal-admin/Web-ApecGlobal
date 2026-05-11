"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { news } from "@/data/mock";

const categories = ["Tất cả", "Sự kiện", "Công nghệ", "Đầu tư", "Phát triển bền vững"];
const statusOptions = ["Tất cả", "Đã đăng", "Nháp", "Lên lịch"];

export default function AdminNewsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");

  const filtered = news.filter((n) => {
    const matchSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      selectedCategory === "Tất cả" || n.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-white text-2xl">Quản lý Tin tức</h1>
          <p className="text-slate-500 text-sm mt-1">
            {filtered.length} bài viết
          </p>
        </div>
        <Link
          href="/admin/tin-tuc/new"
          className="btn-primary text-sm flex-shrink-0"
          id="news-add-btn"
        >
          <Plus className="w-4 h-4" />
          Thêm tin tức
        </Link>
      </div>

      {/* Filters */}
      <div className="admin-card">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-apec pl-10 text-sm"
              id="news-search"
            />
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-electric-700 text-white"
                    : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News table */}
      <div className="admin-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left py-3 px-4 text-slate-500 text-xs font-medium">
                BÀI VIẾT
              </th>
              <th className="text-left py-3 px-4 text-slate-500 text-xs font-medium hidden md:table-cell">
                DANH MỤC
              </th>
              <th className="text-left py-3 px-4 text-slate-500 text-xs font-medium hidden lg:table-cell">
                NGÀY
              </th>
              <th className="text-left py-3 px-4 text-slate-500 text-xs font-medium">
                TRẠNG THÁI
              </th>
              <th className="text-right py-3 px-4 text-slate-500 text-xs font-medium">
                THAO TÁC
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((article) => (
              <tr
                key={article.id}
                className="hover:bg-white/[0.02] transition-colors group"
              >
                {/* Title */}
                <td className="py-4 px-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-16 h-12 rounded-lg flex-shrink-0 flex items-center justify-center text-lg"
                      style={{
                        background: "rgba(0,102,255,0.1)",
                        border: "1px solid rgba(0,102,255,0.15)",
                      }}
                    >
                      📰
                    </div>
                    <div className="min-w-0">
                      <div className="text-white text-sm font-medium line-clamp-1">
                        {article.title}
                      </div>
                      <div className="text-slate-500 text-xs mt-0.5 line-clamp-1">
                        {article.excerpt}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="py-4 px-4 hidden md:table-cell">
                  <span className="px-2 py-1 rounded-md bg-electric-900/20 border border-electric-700/20 text-electric-400 text-xs">
                    {article.category}
                  </span>
                </td>

                {/* Date */}
                <td className="py-4 px-4 hidden lg:table-cell">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </div>
                </td>

                {/* Status */}
                <td className="py-4 px-4">
                  <span className="badge-status badge-active">
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    Đã đăng
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 px-4">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      href={`/tin-tuc/${article.slug}`}
                      target="_blank"
                      className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-slate-500 hover:text-white transition-colors"
                      title="Xem bài"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/admin/tin-tuc/${article.id}/edit`}
                      className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-electric-900/20 text-slate-500 hover:text-electric-400 transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors"
                      title="Xóa"
                      onClick={() => {
                        if (confirm("Bạn có chắc muốn xóa bài viết này?")) {
                          // Handle delete
                        }
                      }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-500 text-sm">
                  Không tìm thấy bài viết nào
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
          <div className="text-slate-500 text-xs">
            Hiển thị <span className="text-white">{filtered.length}</span> bài viết
          </div>
          <div className="flex items-center gap-2">
            <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-slate-500 hover:text-white transition-colors disabled:opacity-30" disabled>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-white text-xs px-3 py-1 rounded-lg bg-electric-900/20 border border-electric-700/20">
              1
            </span>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-slate-500 hover:text-white transition-colors disabled:opacity-30" disabled>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
