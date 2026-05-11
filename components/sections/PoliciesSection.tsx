"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, TrendingUp, Scale, Leaf, ArrowRight, CheckCircle } from "lucide-react";
import { useInView } from "@/lib/hooks";
import { investmentPolicies } from "@/data/mock";

const iconMap: Record<string, React.ElementType> = {
  Shield,
  TrendingUp,
  Scale,
  Leaf,
};

// Cooperation policy nodes
const coopNodes = [
  { label: "Doanh nghiệp", sub: "Tiếp cận & đóng góp", icon: "🏢", pos: "top-left" },
  { label: "Nhà đầu tư", sub: "Vốn & lợi nhuận", icon: "📈", pos: "top-right" },
  { label: "Hợp tác QT", sub: "Mở rộng thị trường", icon: "🌏", pos: "right" },
  { label: "M&A", sub: "Sáp nhập & mua lại", icon: "🤝", pos: "bottom-right" },
  { label: "Đối tác CL", sub: "Chiến lược dài hạn", icon: "🎯", pos: "bottom-left" },
  { label: "Phân phối", sub: "Chuỗi phân phối", icon: "📦", pos: "left" },
];

export default function PoliciesSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #040E1E 0%, #071629 100%)",
      }}
    >
      <div className="container-apec relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

          {/* LEFT: Investment Policy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="section-label">Điều khoản & chính sách</div>
              <h2 className="section-title mb-4">
                Chính Sách{" "}
                <span className="text-gradient-blue">Đầu Tư</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-md">
                APEC Global cam kết minh bạch, tuân thủ pháp luật và bảo vệ
                quyền lợi tối đa cho nhà đầu tư trong toàn bộ hành trình đầu tư.
              </p>
            </motion.div>

            <div className="space-y-4">
              {investmentPolicies.map((policy, i) => {
                const Icon = iconMap[policy.icon] || Shield;
                return (
                  <motion.div
                    key={policy.id}
                    className="flex items-start gap-4 p-5 rounded-xl group transition-all duration-300 border border-transparent hover:border-electric-700/30 hover:bg-electric-900/5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                  >
                    <div className="icon-circle-md flex-shrink-0 group-hover:shadow-glow-sm transition-all duration-300">
                      <Icon className="w-5 h-5 text-electric-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-sm mb-1.5">
                        {policy.title}
                      </h3>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        {policy.description}
                      </p>
                    </div>
                    <CheckCircle className="w-4 h-4 text-electric-600 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
            >
              <Link href="/chinh-sach-dau-tu" className="btn-primary group">
                Xem chi tiết chính sách
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT: Cooperation Policy - Network Diagram */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="section-label">Mạng lưới kết nối</div>
              <h2 className="section-title mb-4">
                Chính Sách{" "}
                <span className="text-gradient-blue">Hợp Tác</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-md">
                APEC Global xây dựng mạng lưới đối tác rộng khắp, kết nối đa
                chiều để tối đa hoá cơ hội và giá trị cho tất cả các bên.
              </p>
            </motion.div>

            {/* Network diagram */}
            <motion.div
              className="relative h-64 md:h-72"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Center node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div
                  className="w-24 h-24 rounded-full flex flex-col items-center justify-center text-center shadow-glow animate-glow-pulse"
                  style={{
                    background:
                      "linear-gradient(135deg, #0052CC, #0066FF, #1A7FFF)",
                  }}
                >
                  <div className="font-display font-black text-white text-xs leading-tight">
                    APEC
                    <br />
                    GLOBAL
                  </div>
                </div>
              </div>

              {/* Orbiting nodes */}
              {coopNodes.map((node, i) => {
                const angle = (i / coopNodes.length) * 360 * (Math.PI / 180);
                const radius = 45; // percentage
                const x = 50 + radius * Math.cos(angle - Math.PI / 2);
                const y = 50 + radius * Math.sin(angle - Math.PI / 2);

                return (
                  <motion.div
                    key={node.label}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{ left: `${x}%`, top: `${y}%` }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  >
                    <div className="coop-node">
                      <div className="coop-node-circle">
                        <span className="text-base">{node.icon}</span>
                      </div>
                      <div className="text-center">
                        <div className="text-white text-[10px] font-semibold whitespace-nowrap">
                          {node.label}
                        </div>
                        <div className="text-slate-500 text-[8px] whitespace-nowrap hidden sm:block">
                          {node.sub}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Connection lines (SVG) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 1 }}
              >
                {coopNodes.map((_, i) => {
                  const angle =
                    (i / coopNodes.length) * 360 * (Math.PI / 180);
                  const radius = 45;
                  const x = 50 + radius * Math.cos(angle - Math.PI / 2);
                  const y = 50 + radius * Math.sin(angle - Math.PI / 2);
                  return (
                    <line
                      key={i}
                      x1="50%"
                      y1="50%"
                      x2={`${x}%`}
                      y2={`${y}%`}
                      stroke="rgba(0,102,255,0.25)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  );
                })}
              </svg>
            </motion.div>

            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
            >
              <Link href="/chinh-sach-hop-tac" className="btn-outline group inline-flex">
                Tìm hiểu thêm
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
