import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Linkedin, Twitter } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const articles = getArticles();
  const article = articles.find(a => a.slug === slug || a.id === slug);
  if (!article) return { title: "Không tìm thấy bài viết | APEC Global" };
  return {
    title: `${article.title} | APEC Global`,
    description: article.excerpt,
    openGraph: { images: [article.img] }
  };
}

function getArticles(): any[] {
  try {
    const p = path.join(process.cwd(), "data", "news.json");
    if (fs.existsSync(p)) {
      const data = JSON.parse(fs.readFileSync(p, "utf-8"));
      return data.items || (Array.isArray(data) ? data : []);
    }
  } catch (e) { console.error(e); }
  return [];
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const articles = getArticles();
  const article = articles.find(a => a.slug === slug || a.id === slug);

  if (!article) {
    return (
      <div style={{ padding: "120px 20px", textAlign: "center", minHeight: "60vh" }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>Không tìm thấy bài viết</h1>
        <Link href="/tin-tuc" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 600 }}>← Quay lại danh sách tin tức</Link>
      </div>
    );
  }

  // Find related articles (same category, exclude current)
  const related = articles.filter(a => a.cat === article.cat && a.id !== article.id).slice(0, 3);
  if (related.length === 0) {
    related.push(...articles.filter(a => a.id !== article.id).slice(0, 3));
  }

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", paddingBottom: 80 }}>
      {/* Article Header (Hero) */}
      <div style={{ position: "relative", height: "60vh", minHeight: 400, background: "#0f172a", display: "flex", alignItems: "flex-end", paddingBottom: 60 }}>
        {article.img && <Image src={article.img} alt={article.title} fill style={{ objectFit: "cover", opacity: 0.4 }} />}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg,rgba(15,23,42,1) 0%,transparent 100%)" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: 860, margin: "0 auto", width: "100%", padding: "0 28px" }}>
          <Link href="/tin-tuc" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#94a3b8", fontSize: 13, textDecoration: "none", marginBottom: 24, transition: "color 0.2s" }}><ArrowLeft size={14} /> Quay lại Tin Tức</Link>
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 100, background: "#2563eb", color: "#fff", textTransform: "uppercase" }}>{article.cat}</span>
          </div>
          <h1 style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 900, fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", lineHeight: 1.2, margin: 0 }}>{article.title}</h1>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 28px", marginTop: -30, position: "relative", zIndex: 20 }}>
        <div style={{ background: "#fff", borderRadius: 24, padding: "40px 48px", boxShadow: "0 20px 40px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
          {/* Meta */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 24, borderBottom: "1px solid #e2e8f0", marginBottom: 32, flexWrap: "wrap", gap: 20 }}>
            <div style={{ display: "flex", gap: 24, color: "#64748b", fontSize: 14 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Calendar size={16} /> {article.date}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Clock size={16} /> {article.readTime}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}><Share2 size={14} /> Chia sẻ:</span>
              <a href="#" style={{ color: "#94a3b8" }}><Facebook size={18} /></a>
              <a href="#" style={{ color: "#94a3b8" }}><Linkedin size={18} /></a>
              <a href="#" style={{ color: "#94a3b8" }}><Twitter size={18} /></a>
            </div>
          </div>

          {/* Excerpt */}
          <div style={{ fontSize: 16, fontWeight: 600, color: "#334155", lineHeight: 1.8, marginBottom: 32, paddingLeft: 20, borderLeft: "4px solid #2563eb", whiteSpace: "pre-wrap" }}>
            {article.excerpt}
          </div>

          {/* Content */}
          <div className="article-content" dangerouslySetInnerHTML={{ __html: (article.content || "").replace(/\n/g, '<br/>') || "<p style='color: #94a3b8; font-style: italic'>Nội dung chi tiết đang được cập nhật...</p>" }} />
        </div>
      </div>

      <style>{`
        .article-content { font-size: ${article.fontSize || "16px"}; line-height: 1.8; color: #334155; }
        .article-content p { margin-bottom: 1.5em; }
        .article-content h2, .article-content h3 { font-family: Montserrat,sans-serif; color: #0f172a; margin-top: 2em; margin-bottom: 1em; font-weight: 800; }
        .article-content img { max-width: 100%; border-radius: 12px; margin: 2em 0; }
        .article-content ul, .article-content ol { margin-bottom: 1.5em; padding-left: 1.5em; }
        .article-content li { margin-bottom: 0.5em; }
        @media(max-width: 768px) { .article-content { font-size: 15px; } div[style*="padding: 40px 48px"] { padding: 24px!important; } }
      `}</style>
    </div>
  );
}
