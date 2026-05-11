"use client";

import { motion } from "framer-motion";
import { Building2, TrendingUp, Repeat, ShoppingBag, Globe2, Cpu, LineChart } from "lucide-react";
import { useInView } from "@/lib/hooks";
import { investmentModel, strategicPillars } from "@/data/mock";

const modelIconMap: Record<string, React.ElementType> = {
  Building2,
  TrendingUp,
  Repeat,
  ShoppingBag,
  Globe2,
};

const pillarIconMap: Record<string, React.ElementType> = {
  Cpu,
  LineChart,
  ShoppingBag,
};

const pillarColors = ["#0066FF", "#22C55E", "#F97316"];

export default function InvestmentModelSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section
      ref={ref}
      className="section-padding bg-navy-950 relative overflow-hidden"
    >
      {/* BG */}
      <div className="absolute inset-0 bg-tech-grid opacity-20" />

      <div className="container-apec relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 xl:gap-16">

          {/* LEFT: Investment Model Flow */}
          <div className="xl:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="section-label">Quy trình</div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-8">
                Mô Hình <span className="text-gradient-blue">Đầu Tư</span>
              </h2>
            </motion.div>

            {/* Flow steps */}
            <div className="relative">
              {investmentModel.map((step, i) => {
                const Icon = modelIconMap[step.icon] || Building2;
                const isLast = i === investmentModel.length - 1;

                return (
                  <motion.div
                    key={step.id}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                  >
                    <div className="flex flex-col items-center flex-shrink-0">
                      {/* Icon circle */}
                      <div className="icon-circle-md hover:shadow-glow-sm transition-all duration-300">
                        <Icon className="w-5 h-5 text-electric-500" />
                      </div>
                      {/* Connector line */}
                      {!isLast && (
                        <div
                          className="w-0.5 h-10 mt-1"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(0,102,255,0.5), rgba(0,102,255,0.1))",
                          }}
                        />
                      )}
                    </div>

                    <div className={`${!isLast ? "mb-0 pb-4" : ""} pt-2`}>
                      <div className="font-semibold text-white text-sm">
                        {step.label}
                      </div>
                      <div className="text-slate-500 text-xs mt-0.5">
                        {step.sublabel}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: 3 Strategic Pillars + Policy + Cooperation overview */}
          <div className="xl:col-span-2 space-y-8">
            {/* 3 Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="section-label">Chiến lược cốt lõi</div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-6">
                3 Trụ Cột <span className="text-gradient-blue">Chiến Lược</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {strategicPillars.map((pillar, i) => {
                  const Icon = pillarIconMap[pillar.icon] || Cpu;
                  return (
                    <motion.div
                      key={pillar.id}
                      className="card-glass p-6 text-center group hover:card-hover cursor-default"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `${pillar.color}20`,
                          border: `1px solid ${pillar.color}40`,
                        }}
                      >
                        <Icon className="w-7 h-7" style={{ color: pillar.color }} />
                      </div>
                      <div className="font-display font-bold text-white text-lg">
                        {pillar.label}
                      </div>
                      <div
                        className="mt-2 h-0.5 w-8 rounded-full mx-auto transition-all duration-300 group-hover:w-full"
                        style={{ background: pillar.color }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Infographic description */}
            <motion.div
              className="card-glass p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-display font-bold text-white mb-3 text-sm">
                    Nguyên tắc đầu tư
                  </h4>
                  <ul className="space-y-2">
                    {[
                      "Đầu tư có chiều sâu và bền vững",
                      "Tối ưu hoá chuỗi giá trị",
                      "Kết hợp công nghệ và tài chính",
                      "Mở rộng thị trường quốc tế",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-slate-400 text-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-electric-600 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-display font-bold text-white mb-3 text-sm">
                    Cam kết với nhà đầu tư
                  </h4>
                  <ul className="space-y-2">
                    {[
                      "Minh bạch thông tin định kỳ",
                      "Báo cáo quý và năm đầy đủ",
                      "Hỗ trợ pháp lý toàn diện",
                      "Tư vấn chiến lược chuyên sâu",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-slate-400 text-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
