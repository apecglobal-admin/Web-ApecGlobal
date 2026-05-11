// Script to initialize all JSON data files
// Run: npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/init-data.ts

import fs from "fs";
import path from "path";
import crypto from "crypto";

const SECRET = "apec-global-secret-key-2024";
function hash(pw: string) { return crypto.createHash("sha256").update(pw + SECRET).digest("hex"); }

const DATA_DIR = path.join(__dirname, "..", "data");
const PAGES_DIR = path.join(DATA_DIR, "pages");

function write(file: string, data: any) {
  const fp = path.join(DATA_DIR, file);
  const dir = path.dirname(fp);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fp, JSON.stringify(data, null, 2));
  console.log(`✅ ${file}`);
}

// Users
write("users.json", [
  { id: "1", username: "admin", password: hash("apec2024"), role: "admin", name: "Admin" },
  { id: "2", username: "editor", password: hash("editor2024"), role: "editor", name: "Editor" },
]);

// Site settings
write("site.json", {
  brandName: "APEC GLOBAL",
  slogan: "CREATING VALUE",
  logo: "/images/logo.png",
  favicon: "/favicon.ico",
  phone: "1800 1234",
  email: "info@apecglobal.vn",
  address: "Tầng 15, Apec Tower, Hà Nội",
  social: { facebook: "#", youtube: "#", linkedin: "#" },
});

// Hero
write("hero.json", {
  title1: "CREATING VALUE",
  title2: "OWNING THE FUTURE",
  description: "ApecGlobal đầu tư và phát triển hệ sinh thái đa ngành, kiến tạo giá trị bền vững và đồng hành cùng doanh nghiệp trên hành trình phát triển dài hạn.",
  backgroundImage: "/images/hero-bg.jpg",
  cta1: { label: "TÌM HIỂU HỆ SINH THÁI", href: "/he-sinh-thai" },
  cta2: { label: "ĐĂNG KÝ HỢP TÁC", href: "/lien-he" },
});

// Stats
write("stats.json", [
  { id: "1", icon: "Building2", value: "15+", label: "Dự án đầu tư", sub: "Dự án quy mô lớn" },
  { id: "2", icon: "Users", value: "100+", label: "Doanh nghiệp thành viên", sub: "Trong hệ sinh thái" },
  { id: "3", icon: "Globe2", value: "7+", label: "Quốc gia hoạt động", sub: "Mở rộng quốc tế" },
  { id: "4", icon: "TrendingUp", value: "2.868+", label: "tỷ VNĐ", sub: "Vốn đầu tư" },
  { id: "5", icon: "Target", value: "50+", label: "Đối tác chiến lược", sub: "Trong và ngoài nước" },
]);

// About
write("about.json", {
  sectionLabel: "VỀ APECGLOBAL",
  heading: "Kiến tạo giá trị\nvững bền – Đồng hành\nphát triển dài hạn",
  description1: "ApecGlobal đầu tư và phát triển hệ sinh thái đa ngành, kiến tạo giá trị bền vững và đồng hành cùng doanh nghiệp trên hành trình phát triển dài hạn.",
  description2: "Với triết lý đầu tư bền vững, APEC Global không chỉ là nhà đầu tư mà còn là đối tác chiến lược đồng hành cùng sự phát triển của doanh nghiệp.",
  vision: { title: "TẦM NHÌN", content: "Trở thành tập đoàn đầu tư – tài chính dẫn đầu khu vực, kiến tạo hệ sinh thái doanh nghiệp Việt Nam vươn tầm quốc tế." },
  mission: { title: "SỨ MỆNH", content: "Kết nối giá trị – Nâng đỡ doanh nghiệp – Kiến tạo tương lai bền vững cho cộng đồng Việt Nam và quốc tế." },
  coreValues: [
    { icon: "Star", label: "Tận tâm" },
    { icon: "Heart", label: "Tin tưởng" },
    { icon: "Globe", label: "Toàn cầu" },
    { icon: "Lightbulb", label: "Đổi mới" },
    { icon: "Users", label: "Tận lực" },
  ],
});

// Ecosystem
write("ecosystem.json", [
  { id: "1", icon: "💻", title: "CÔNG NGHỆ", sub: "Technology", color: "#1d4ed8", items: ["Super App", "Sàn TMĐT", "AI & Chuyển đổi số"], img: "/images/area-tech.jpg" },
  { id: "2", icon: "📈", title: "TÀI CHÍNH", sub: "Finance", color: "#15803d", items: ["Quỹ đầu tư Capital", "M&A doanh nghiệp", "Đầu tư tài chính"], img: "/images/area-realestate.jpg" },
  { id: "3", icon: "🛒", title: "THƯƠNG MẠI", sub: "Commerce", color: "#c2410c", items: ["Renner", "Chuỗi cung ứng", "Logistics"], img: "/images/area-logistics.jpg" },
  { id: "4", icon: "🏥", title: "DỊCH VỤ", sub: "Services", color: "#7e22ce", items: ["Phòng khám đa khoa", "Spa & Sắc đẹp", "An ninh xuất khẩu lao động"], img: "/images/area-energy.jpg" },
]);

// Investment areas
write("investment.json", [
  { id: "1", title: "BẤT ĐỘNG SẢN", desc: "Phát triển các dự án bất động sản đô thị, khu công nghiệp", img: "/images/area-realestate.jpg" },
  { id: "2", title: "NĂNG LƯỢNG TÁI TẠO", desc: "Đầu tư các dự án năng lượng xanh, năng lượng mặt trời và điện gió", img: "/images/area-energy.jpg" },
  { id: "3", title: "SẢN XUẤT CÔNG NGHIỆP", desc: "Thúc đẩy sản xuất thông minh, ứng dụng công nghệ vào sản phẩm", img: "/images/area-manufacturing.jpg" },
  { id: "4", title: "LOGISTICS", desc: "Phát triển hạ tầng logistics hiện đại, kết nối chuỗi cung ứng", img: "/images/area-logistics.jpg" },
  { id: "5", title: "CÔNG NGHỆ", desc: "Đầu tư vào công nghệ tiên phong, chuyển đổi số và đổi mới sáng tạo", img: "/images/area-tech.jpg" },
]);

// Projects
write("projects.json", [
  { id: "1", name: "APEC TOWER", sector: "Bất động sản", status: "Đang vận hành", loc: "Hà Nội", cap: "1.200 tỷ", year: "2021", img: "/images/area-realestate.jpg", desc: "Tòa nhà văn phòng hạng A 35 tầng tại trung tâm Hà Nội." },
  { id: "2", name: "APEC SOLAR FARM", sector: "Năng lượng", status: "Đang vận hành", loc: "Ninh Thuận", cap: "500 tỷ", year: "2022", img: "/images/area-energy.jpg", desc: "Nhà máy điện mặt trời công suất 50MW." },
  { id: "3", name: "APEC SMART FACTORY", sector: "Sản xuất", status: "Đang đầu tư", loc: "Bắc Ninh", cap: "800 tỷ", year: "2023", img: "/images/area-manufacturing.jpg", desc: "Nhà máy sản xuất thông minh ứng dụng AI." },
  { id: "4", name: "APEC LOGISTICS HUB", sector: "Logistics", status: "Đang đầu tư", loc: "TP.HCM", cap: "350 tỷ", year: "2023", img: "/images/area-logistics.jpg", desc: "Trung tâm logistics hiện đại." },
  { id: "5", name: "APEC TECH CAMPUS", sector: "Công nghệ", status: "Đang vận hành", loc: "Đà Nẵng", cap: "600 tỷ", year: "2022", img: "/images/area-tech.jpg", desc: "Khu phức hợp công nghệ." },
]);

// News
write("news.json", [
  { id: "1", title: "APEC Global ký kết hợp tác chiến lược với tập đoàn hàng đầu Nhật Bản", cat: "Sự kiện", date: "15/03/2024", img: "/images/news-1.jpg", excerpt: "Buổi lễ ký kết diễn ra tại Tokyo, đánh dấu bước ngoặt quan trọng.", readTime: "5 phút" },
  { id: "2", title: "Ra mắt nền tảng AI – APEC AI Assistant", cat: "Công nghệ", date: "08/03/2024", img: "/images/news-2.jpg", excerpt: "APEC Tech chính thức giới thiệu nền tảng AI tích hợp.", readTime: "4 phút" },
  { id: "3", title: "Quỹ APEC Capital đạt mốc 1.000 tỷ VNĐ", cat: "Đầu tư", date: "01/03/2024", img: "/images/news-3.jpg", excerpt: "Thành tích ấn tượng sau 3 năm hoạt động.", readTime: "3 phút" },
]);

// Partners
write("partners.json", [
  { id: "1", name: "Viettel", color: "#e11d48" },
  { id: "2", name: "BIDV", color: "#1d4ed8" },
  { id: "3", name: "Techcombank", color: "#dc2626" },
  { id: "4", name: "Vingroup", color: "#16a34a" },
  { id: "5", name: "DP World", color: "#6366f1" },
  { id: "6", name: "Mapletree", color: "#059669" },
]);

// Nav
write("nav.json", [
  { id: "1", label: "TRANG CHỦ", href: "/" },
  { id: "2", label: "GIỚI THIỆU", href: "/gioi-thieu" },
  { id: "3", label: "HỆ SINH THÁI", href: "/he-sinh-thai" },
  { id: "4", label: "DỰ ÁN", href: "/du-an" },
  { id: "5", label: "CHÍNH SÁCH ĐẦU TƯ", href: "/chinh-sach-dau-tu" },
  { id: "6", label: "CHÍNH SÁCH HỢP TÁC", href: "/chinh-sach-hop-tac" },
  { id: "7", label: "TIN TỨC", href: "/tin-tuc" },
  { id: "8", label: "LIÊN HỆ", href: "/lien-he" },
]);

// Footer
write("footer.json", {
  columns: [
    { title: "VỀ CHÚNG TÔI", links: [{ label: "Giới thiệu", href: "/gioi-thieu" }, { label: "Hệ sinh thái", href: "/he-sinh-thai" }, { label: "Dự án", href: "/du-an" }] },
    { title: "CHÍNH SÁCH", links: [{ label: "Chính sách đầu tư", href: "/chinh-sach-dau-tu" }, { label: "Chính sách hợp tác", href: "/chinh-sach-hop-tac" }] },
    { title: "TIN TỨC", links: [{ label: "Tin tức", href: "/tin-tuc" }, { label: "Sự kiện", href: "/su-kien" }] },
    { title: "LIÊN HỆ", links: [{ label: "Liên hệ", href: "/lien-he" }] },
  ],
  copyright: "© 2024 APEC Global. All rights reserved.",
});

console.log("\n✅ All data files initialized!");
