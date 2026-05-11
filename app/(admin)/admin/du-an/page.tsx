"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, GripVertical, Eye, EyeOff, MapPin, TrendingUp } from "lucide-react";
import { projects } from "@/data/mock";

export default function AdminProjectsPage() {
  const [items, setItems] = useState(projects);

  const toggleStatus = (id: number) => {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: p.status === "active" ? "investing" : "active",
              statusLabel: p.status === "active" ? "Đang đầu tư" : "Đang vận hành",
            }
          : p
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-white text-2xl">Quản lý Dự án</h1>
          <p className="text-slate-500 text-sm mt-1">{items.length} dự án đang quản lý</p>
        </div>
        <button className="btn-primary text-sm" id="project-add-btn">
          <Plus className="w-4 h-4" />
          Thêm dự án
        </button>
      </div>

      <div className="space-y-3">
        {items.map((project, i) => (
          <div
            key={project.id}
            className="admin-card flex items-center gap-4 group hover:border-electric-700/20 transition-all duration-200"
          >
            {/* Drag handle */}
            <div className="text-slate-700 hover:text-slate-400 cursor-grab active:cursor-grabbing">
              <GripVertical className="w-5 h-5" />
            </div>

            {/* Order number */}
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 text-xs font-bold flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.05)" }}>
              {i + 1}
            </div>

            {/* Project preview */}
            <div
              className="w-20 h-14 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${
                  ["#001F5B", "#00331A", "#1F0060", "#5C1A00", "#003D4D"][i % 5]
                }, #020B1A)`,
              }}
            >
              <span className="text-white/70 text-xs">{project.name.slice(0, 3)}</span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="font-display font-bold text-white text-sm">
                {project.name}
              </div>
              <div className="text-slate-500 text-xs mt-0.5 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {project.location}
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> {project.capital}
                </span>
              </div>
            </div>

            {/* Status badge */}
            <button
              onClick={() => toggleStatus(project.id)}
              className={`badge-status cursor-pointer hover:opacity-80 transition-opacity ${
                project.status === "active" ? "badge-active" : "badge-investing"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {project.statusLabel}
            </button>

            {/* Actions */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-slate-500 hover:text-white transition-colors" title="Chỉnh sửa">
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors"
                title="Xóa"
                onClick={() => {
                  if (confirm("Xóa dự án này?")) {
                    setItems((p) => p.filter((x) => x.id !== project.id));
                  }
                }}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-card text-center py-4">
        <p className="text-slate-500 text-xs">
          💡 Kéo thả để sắp xếp thứ tự hiển thị dự án trên trang chủ
        </p>
      </div>
    </div>
  );
}
