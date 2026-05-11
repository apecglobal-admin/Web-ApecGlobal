"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { useInView } from "@/lib/hooks";
import { news } from "@/data/mock";

const categoryColors: Record<string, string> = {
  "Sự kiện": "#0066FF",
  "Công nghệ": "#22C55E",
  "Đầu tư": "#F97316",
  "Phát triển bền vững": "#A855F7",
};

// Placeholder card bg gradients
const cardBgs = [
  "from-blue-950 to-slate-900",
  "from-emerald-950 to-slate-900",
  "from-orange-950 to-slate-900",
  "from-purple-950 to-slate-900",
];

export default function NewsSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section ref={ref} className="section-padding bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-tech-grid opacity-20" />

      <div className="container-apec relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div className="section-label">Cập nhật mới nhất</div>
            <h2 className="section-title">
              Tin Tức <span className="text-gradient-blue">&amp; Hoạt Động</span>
            </h2>
          </div>
          <Link href="/tin-tuc" className="btn-outline group inline-flex text-sm flex-shrink-0">
            Xem tất cả
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {news.map((article, i) => {
            const catColor = categoryColors[article.category] || "#0066FF";
            return (
              <motion.article
                key={article.id}
                className="news-card group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden h-44">
                  {/* Placeholder gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${cardBgs[i]}`}
                  />
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 30%, ${catColor}60, transparent)`,
                    }}
                  />
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span
                      className="px-2.5 py-1 rounded-lg text-white text-[10px] font-semibold"
                      style={{ background: `${catColor}cc`, backdropFilter: "blur(8px)" }}
                    >
                      {article.category}
                    </span>
                  </div>
                  {/* Placeholder icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <Tag className="w-16 h-16 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-3">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-white text-sm leading-snug mb-2 line-clamp-2 group-hover:text-electric-400 transition-colors duration-200">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>

                  {/* Read more */}
                  <Link
                    href={`/tin-tuc/${article.slug}`}
                    className="flex items-center gap-1.5 text-electric-500 text-xs font-medium group/link"
                  >
                    Đọc tiếp
                    <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
