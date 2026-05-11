"use client";
import { motion } from "framer-motion";

interface Props { label: string; title: string; desc: string; }

export default function PageBanner({ label, title, desc }: Props) {
  return (
    <section style={{ position: "relative", paddingTop: 56, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#040c1c 0%,#0c2450 50%,#1d4ed8 100%)" }} />
      <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "linear-gradient(rgba(100,160,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(100,160,255,0.3) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
      <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 500, height: 400, background: "radial-gradient(ellipse,rgba(37,99,237,0.25),transparent 70%)", filter: "blur(50px)" }} />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "60px 28px 48px", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.16em", color: "#93c5fd", marginBottom: 10, textTransform: "uppercase" }}>{label}</div>
          <h1 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(1.6rem,3.5vw,2.6rem)", color: "#fff", margin: "0 0 12px", lineHeight: 1.2 }}>{title}</h1>
          <p style={{ color: "#94a3b8", fontSize: "clamp(0.85rem,1.3vw,1rem)", maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>{desc}</p>
        </motion.div>
      </div>
      {/* Bottom curve */}
      <svg viewBox="0 0 1440 40" style={{ display: "block", width: "100%", position: "relative", zIndex: 2 }} preserveAspectRatio="none">
        <path d="M0,40 L0,16 Q720,0 1440,16 L1440,40 Z" fill="#ffffff" />
      </svg>
    </section>
  );
}
