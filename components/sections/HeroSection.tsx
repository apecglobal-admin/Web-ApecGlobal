"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Props {
  data?: { title1?: string; title2?: string; description?: string; backgroundImage?: string; cta1?: { label: string; href: string }; cta2?: { label: string; href: string } };
}

export default function HeroSection({ data }: Props) {
  const d = data || {};
  const t1 = d.title1 || "CREATING VALUE";
  const t2 = d.title2 || "OWNING THE FUTURE";
  const desc = d.description || "ApecGlobal đầu tư và phát triển hệ sinh thái đa ngành, kiến tạo giá trị bền vững.";
  const bg = d.backgroundImage || "/images/hero-bg.jpg";
  const cta1 = d.cta1 || { label: "TÌM HIỂU HỆ SINH THÁI", href: "/he-sinh-thai" };
  const cta2 = d.cta2 || { label: "ĐĂNG KÝ HỢP TÁC", href: "/lien-he" };

  return (
    <section style={{ position: "relative", width: "100%", minHeight: "100vh", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${bg}')`, backgroundSize: "cover", backgroundPosition: "center bottom" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(108deg,rgba(4,12,28,0.94) 0%,rgba(8,22,50,0.88) 35%,rgba(12,36,72,0.72) 60%,rgba(0,80,200,0.18) 100%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: "linear-gradient(0deg,rgba(4,12,28,1) 0%,transparent 100%)" }} />
      <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "linear-gradient(rgba(100,160,255,0.25) 1px,transparent 1px),linear-gradient(90deg,rgba(100,160,255,0.25) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
      <div style={{ position: "absolute", top: "-8%", right: "-5%", width: 700, height: 500, background: "radial-gradient(ellipse,rgba(37,99,237,0.35),transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      {[{ t: "30%", w: "55%", d: "0s", s: "5s" }, { t: "54%", w: "72%", d: "1.6s", s: "7s" }, { t: "72%", w: "42%", d: "3.2s", s: "6s" }].map((l, i) => (
        <div key={i} style={{ position: "absolute", top: l.t, left: 0, width: l.w, height: 1, zIndex: 2, background: "linear-gradient(90deg,transparent,rgba(96,165,250,0.55) 30%,rgba(56,189,248,0.7) 55%,transparent)", animation: `lightSlide ${l.s} ease-in-out ${l.d} infinite` }} />
      ))}
      {Array.from({ length: 14 }).map((_, i) => (
        <div key={i} style={{ position: "absolute", bottom: 0, left: `${5 + i * 6.5}%`, width: 2 + (i % 3), height: 2 + (i % 3), borderRadius: "50%", background: "rgba(96,165,250,0.65)", zIndex: 2, animation: `particleUp ${8 + (i % 5) * 2.2}s linear ${(i % 4) * 1.5}s infinite` }} />
      ))}
      <div className="hero-inner" style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "0 28px", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ maxWidth: 640 }}>
          <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ margin: 0, lineHeight: 1.08, marginBottom: 20 }}>
            <span style={{ display: "block", color: "#fff", fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem,5vw,4.5rem)", letterSpacing: "-0.015em" }}>{t1}</span>
            <span style={{ display: "block", fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem,5vw,4.5rem)", letterSpacing: "-0.015em", fontStyle: "italic", background: "linear-gradient(135deg,#60a5fa,#38bdf8,#67e8f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t2}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: "#94a3b8", fontSize: "clamp(0.85rem,1.4vw,1rem)", lineHeight: 1.75, marginBottom: 30, maxWidth: 520 }}>{desc}</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href={cta1.href} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 6, fontWeight: 700, fontSize: 12.5, color: "#fff", textDecoration: "none", background: "linear-gradient(135deg,#1d4ed8,#2563eb)", boxShadow: "0 4px 18px rgba(37,99,235,0.45)", letterSpacing: "0.03em" }}>
              {cta1.label} <ArrowRight size={14} />
            </Link>
            <Link href={cta2.href} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 6, fontWeight: 700, fontSize: 12.5, color: "#fff", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)", letterSpacing: "0.03em" }}>
              {cta2.label}
            </Link>
          </motion.div>
        </div>
      </div>
      <style>{`@keyframes lightSlide{0%{transform:translateX(-100%);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateX(220%);opacity:0}}@keyframes particleUp{0%{transform:translateY(0) scale(1);opacity:.7}100%{transform:translateY(-100vh) scale(.3);opacity:0}}.hero-inner{padding-top:80px;padding-bottom:60px}@media(max-width:768px){.hero-inner{padding-top:100px;padding-bottom:40px;min-height:auto;padding-top:140px}}`}</style>
    </section>
  );
}
