"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface NavButton { icon: string; label: string; sub: string; href: string; }
interface BottomItem { icon: string; title: string; desc: string; }
interface IntroData {
  headline1: string; headline2: string; sloganEn: string; description: string;
  backgroundImage: string; enterButtonText: string;
  navButtons: NavButton[]; bottomItems: BottomItem[];
}
interface SiteData { brandName: string; logo: string; slogan: string; }

const DEFAULTS: IntroData = {
  headline1: "KIẾN TẠO GIÁ TRỊ", headline2: "LÀM CHỦ TƯƠNG LAI",
  sloganEn: "Creating Value – Owning the Future",
  description: "ApecGlobal đầu tư vào các lĩnh vực trọng điểm,\nkiến tạo giá trị bền vững và đồng hành cùng\nsự phát triển thịnh vượng.",
  backgroundImage: "/images/intro-background.png", enterButtonText: "VÀO TRANG CHỦ",
  navButtons: [
    { icon: "🏢", label: "GIỚI THIỆU", sub: "TỔNG QUAN", href: "/gioi-thieu" },
    { icon: "📊", label: "DỰ ÁN", sub: "ĐÃ ĐẦU TƯ", href: "/du-an" },
    { icon: "🛡️", label: "CHÍNH SÁCH", sub: "ĐẦU TƯ", href: "/chinh-sach-dau-tu" },
    { icon: "🤝", label: "CHÍNH SÁCH", sub: "HỢP TÁC", href: "/chinh-sach-hop-tac" },
  ],
  bottomItems: [
    { icon: "🎯", title: "TẦM NHÌN", desc: "Trở thành nhà đầu tư\nUy tín – Hiệu quả – Bền vững" },
    { icon: "💡", title: "SỨ MỆNH", desc: "Kiến tạo giá trị cho nhà đầu tư,\nđối tác và cộng đồng" },
    { icon: "📈", title: "GIÁ TRỊ CỐT LÕI", desc: "Chính trực – Chuyên nghiệp\nHiệu quả – Hợp tác – Bền vững" },
    { icon: "🌐", title: "PHẠM VI HOẠT ĐỘNG", desc: "Đầu tư và hợp tác\ntại Việt Nam và các\nthị trường tiềm năng" },
  ],
};

function isImageUrl(val: string) {
  return val && (val.startsWith("/") || val.startsWith("http"));
}

function IconRender({ icon, className }: { icon: string; className: string }) {
  if (isImageUrl(icon)) {
    return <img src={icon} alt="" className={className} style={{ width: "100%", height: "100%", objectFit: "contain" }} />;
  }
  return <span>{icon}</span>;
}

export default function IntroClient({ intro, site }: { intro?: IntroData | null; site?: SiteData | null }) {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const d = { ...DEFAULTS, ...intro };
  const logo = site?.logo || "";
  const brand = site?.brandName || "APEC GLOBAL";

  useEffect(() => { setLoaded(true); }, []);

  return (
    <>
      <style>{introStyles}</style>
      <div className="intro-root">
        {/* Background */}
        <div className="intro-bg">
          <img src={d.backgroundImage} alt="" className="intro-bg-img" />
          <div className="intro-bg-overlay" />
        </div>

        {/* Content */}
        <div className={`intro-content ${loaded ? "intro-visible" : ""}`}>
          {/* Logo */}
          <div className="intro-logo-area">
            {logo ? (
              <img src={logo} alt={brand} className="intro-logo-img" />
            ) : (
              <div className="intro-logo-fallback">
                <span>AG</span>
              </div>
            )}
            <div className="intro-logo-text">
              <div className="intro-brand">{brand}</div>
              <div className="intro-slogan">{d.sloganEn}</div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="intro-headline">
            <span className="intro-headline-line">{d.headline1}</span>
            <span className="intro-headline-line intro-headline-line2">{d.headline2}</span>
          </h1>

          <p className="intro-desc">{d.description}</p>

          {/* Navigation Buttons */}
          <div className="intro-nav-grid">
            {(d.navButtons || []).map((btn, i) => (
              <button
                key={i}
                className="intro-nav-btn"
                onClick={() => router.push(btn.href)}
                style={{ animationDelay: `${0.4 + i * 0.1}s` }}
              >
                <span className="intro-nav-icon"><IconRender icon={btn.icon} className="intro-icon-img" /></span>
                <span className="intro-nav-label">
                  <strong>{btn.label}</strong><br /><strong>{btn.sub}</strong>
                </span>
                <span className="intro-nav-arrow">›</span>
              </button>
            ))}
          </div>

          {/* Enter Main Site */}
          <button className="intro-enter-btn" onClick={() => router.push("/trang-chu")}>
            {d.enterButtonText} →
          </button>
        </div>

        {/* Bottom Bar */}
        <div className={`intro-bottom ${loaded ? "intro-visible" : ""}`}>
          {(d.bottomItems || []).map((item, i) => (
            <div key={i} className="intro-bottom-item">
              <div className="intro-bottom-icon"><IconRender icon={item.icon} className="intro-bottom-icon-img" /></div>
              <div className="intro-bottom-title">{item.title}</div>
              <div className="intro-bottom-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const introStyles = `
.intro-root {
  position: relative; min-height: 100vh; display: flex; flex-direction: column; overflow: hidden; background: #e8f0fe;
}
.intro-bg { position: absolute; inset: 0; z-index: 0; }
.intro-bg-img { width: 100%; height: 100%; object-fit: cover; object-position: center; }
.intro-bg-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(224,235,255,0.55) 0%, rgba(200,220,255,0.3) 40%, transparent 70%);
}
.intro-content {
  position: relative; z-index: 2; flex: 1; display: flex; flex-direction: column;
  justify-content: center; padding: 80px 60px 40px; max-width: 680px;
  opacity: 0; transform: translateY(30px); transition: opacity 0.8s ease, transform 0.8s ease;
}
.intro-content.intro-visible { opacity: 1; transform: translateY(0); }

/* Logo */
.intro-logo-area { display: flex; align-items: center; gap: 14px; margin-bottom: 36px; }
.intro-logo-img { height: 60px; width: auto; object-fit: contain; flex-shrink: 0; }
.intro-logo-fallback {
  width: 52px; height: 52px; border-radius: 12px; flex-shrink: 0;
  background: linear-gradient(135deg, #1a3a7a, #2563eb);
  display: flex; align-items: center; justify-content: center;
}
.intro-logo-fallback span { color: #fff; font-weight: 900; font-size: 16px; font-family: Montserrat, sans-serif; }
.intro-brand { font-family: Montserrat, sans-serif; font-size: 28px; font-weight: 800; color: #0a1f5c; letter-spacing: 0.04em; }
.intro-slogan { font-size: 12px; color: #1d4ed8; font-weight: 500; letter-spacing: 0.03em; margin-top: 2px; }

/* Headline */
.intro-headline { font-family: Montserrat, sans-serif; font-size: clamp(32px, 5vw, 56px); font-weight: 900; color: #0a1a4a; line-height: 1.12; margin: 0 0 20px; }
.intro-headline-line { display: block; }
.intro-headline-line2 { background: linear-gradient(90deg, #1d4ed8, #2563eb, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

/* Description */
.intro-desc { font-size: 15px; color: #334155; line-height: 1.7; margin-bottom: 36px; font-style: italic; white-space: pre-line; }

/* Nav Grid */
.intro-nav-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px; }
.intro-nav-btn {
  display: flex; align-items: center; gap: 12px; padding: 16px 18px;
  background: linear-gradient(135deg, rgba(255,255,255,0.85), rgba(240,248,255,0.9));
  border: 1.5px solid rgba(29,78,216,0.15); border-radius: 14px; cursor: pointer;
  transition: all 0.3s ease; text-align: left; backdrop-filter: blur(12px);
  box-shadow: 0 2px 12px rgba(29,78,216,0.08); opacity: 0; animation: introFadeUp 0.6s ease forwards;
}
.intro-nav-btn:hover {
  background: linear-gradient(135deg, #1d4ed8, #2563eb); border-color: #1d4ed8;
  transform: translateY(-3px); box-shadow: 0 8px 28px rgba(29,78,216,0.3);
}
.intro-nav-btn:hover .intro-nav-label, .intro-nav-btn:hover .intro-nav-arrow { color: #fff; }
.intro-nav-icon {
  font-size: 28px; flex-shrink: 0; width: 44px; height: 44px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(29,78,216,0.08); border-radius: 10px;
}
.intro-nav-btn:hover .intro-nav-icon { background: rgba(255,255,255,0.2); }
.intro-nav-label { font-size: 13px; font-weight: 700; color: #0a1a4a; letter-spacing: 0.03em; line-height: 1.3; flex: 1; }
.intro-nav-arrow { font-size: 22px; color: #1d4ed8; font-weight: 300; flex-shrink: 0; }

/* Enter Button */
.intro-enter-btn {
  display: inline-flex; align-items: center; gap: 8px; padding: 14px 36px;
  background: linear-gradient(135deg, #1d4ed8, #2563eb); color: #fff;
  font-size: 14px; font-weight: 700; letter-spacing: 0.08em; border: none;
  border-radius: 10px; cursor: pointer; transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(29,78,216,0.35); align-self: flex-start;
}
.intro-enter-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(29,78,216,0.5); background: linear-gradient(135deg, #2563eb, #3b82f6); }

/* Bottom Bar */
.intro-bottom {
  position: relative; z-index: 2; display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
  background: rgba(255,255,255,0.7); backdrop-filter: blur(16px);
  border-top: 1px solid rgba(29,78,216,0.12);
  opacity: 0; transform: translateY(20px); transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
}
.intro-bottom.intro-visible { opacity: 1; transform: translateY(0); }
.intro-bottom-item { text-align: center; padding: 24px 16px; border-right: 1px solid rgba(29,78,216,0.08); }
.intro-bottom-item:last-child { border-right: none; }
.intro-bottom-icon { font-size: 28px; margin-bottom: 8px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; margin-left: auto; margin-right: auto; }
.intro-icon-img { width: 100%; height: 100%; object-fit: contain; }
.intro-bottom-icon-img { width: 36px; height: 36px; object-fit: contain; }
.intro-bottom-title { font-family: Montserrat, sans-serif; font-size: 12px; font-weight: 800; color: #1d4ed8; letter-spacing: 0.06em; margin-bottom: 6px; }
.intro-bottom-desc { font-size: 11.5px; color: #475569; line-height: 1.5; white-space: pre-line; }

@keyframes introFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

/* Mobile */
@media (max-width: 768px) {
  .intro-content { padding: 40px 20px 20px; max-width: 100%; align-items: center; text-align: center; }
  .intro-logo-area { flex-direction: column; text-align: center; gap: 8px; margin-bottom: 20px; }
  .intro-logo-img { height: 80px; }
  .intro-logo-fallback { width: 70px; height: 70px; }
  .intro-logo-fallback span { font-size: 22px; }
  .intro-brand { font-size: 26px; }
  .intro-slogan { font-size: 11px; }
  .intro-headline { font-size: clamp(24px, 7vw, 36px); text-align: center; margin-bottom: 12px; }
  .intro-desc { font-size: 13px; text-align: center; margin-bottom: 20px; }
  .intro-nav-grid { grid-template-columns: 1fr 1fr; gap: 8px; width: 100%; }
  .intro-nav-btn { padding: 10px 10px; flex-direction: row; text-align: left; gap: 8px; border-radius: 10px; }
  .intro-nav-icon { width: 32px; height: 32px; font-size: 18px; border-radius: 8px; }
  .intro-nav-label { font-size: 10px; text-align: left; letter-spacing: 0.02em; }
  .intro-nav-arrow { font-size: 16px; }
  .intro-enter-btn { align-self: center; width: 100%; justify-content: center; padding: 12px 24px; font-size: 13px; }
  .intro-bottom { grid-template-columns: repeat(2, 1fr); }
  .intro-bottom-item { padding: 14px 10px; }
  .intro-bottom-icon { font-size: 22px; margin-bottom: 4px; }
  .intro-bottom-title { font-size: 10px; margin-bottom: 4px; }
  .intro-bottom-desc { font-size: 10px; }
  .intro-bottom-item:nth-child(2) { border-right: none; }
  .intro-bottom-item:nth-child(1), .intro-bottom-item:nth-child(2) { border-bottom: 1px solid rgba(29,78,216,0.08); }
}
`;
