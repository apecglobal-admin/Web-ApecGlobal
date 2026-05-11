# APEC GLOBAL – Website Tập Đoàn Doanh Nghiệp

> Website tập đoàn đầu tư đa ngành APEC GLOBAL – Enterprise-grade với Next.js 15, TypeScript, TailwindCSS, Framer Motion, GSAP, và CMS Admin đầy đủ.

## 🚀 Demo nhanh

```bash
# 1. Clone / mở project
cd "d:\CODE WEB\2. SOURE\WEB-APECGLOBAL"

# 2. Cài đặt dependencies
npm install

# 3. Cấu hình environment
cp .env.example .env
# Chỉnh sửa .env với thông tin database của bạn

# 4. Chạy development server
npm run dev

# Mở http://localhost:3000
# Admin CMS: http://localhost:3000/admin
# Login: admin@apecglobal.vn / admin123
```

## 📁 Cấu trúc thư mục

```
WEB-APECGLOBAL/
├── app/
│   ├── (public)/              # 🌐 Public website
│   │   ├── page.tsx           # Trang chủ (14 sections)
│   │   ├── layout.tsx         # Layout với Header + Footer
│   │   ├── gioi-thieu/        # Trang giới thiệu
│   │   ├── he-sinh-thai/      # Hệ sinh thái
│   │   ├── du-an/             # Dự án
│   │   ├── chinh-sach-dau-tu/ # Chính sách đầu tư
│   │   ├── chinh-sach-hop-tac/# Chính sách hợp tác
│   │   ├── tin-tuc/           # Tin tức
│   │   └── lien-he/           # Liên hệ
│   ├── (admin)/               # 🔐 CMS Admin
│   │   └── admin/
│   │       ├── page.tsx       # Dashboard
│   │       ├── layout.tsx     # Admin layout
│   │       ├── login/         # Đăng nhập
│   │       ├── banner/        # Quản lý banner
│   │       ├── tin-tuc/       # Quản lý tin tức
│   │       ├── du-an/         # Quản lý dự án
│   │       └── ...            # Các section khác
│   ├── api/                   # 🔌 REST API
│   │   ├── news/route.ts      # News API
│   │   ├── contact/route.ts   # Contact API
│   │   └── sections/route.ts  # Sections API
│   ├── layout.tsx             # Root layout (SEO, fonts)
│   ├── globals.css            # Design system CSS
│   ├── sitemap.ts             # Dynamic sitemap
│   └── robots.ts              # Robots.txt
├── components/
│   ├── layout/
│   │   ├── Header.tsx         # Fixed navbar với mobile drawer
│   │   └── Footer.tsx         # 4-column footer
│   └── sections/
│       ├── HeroSection.tsx    # Hero banner + animations
│       ├── StatsSection.tsx   # 5 metric cards với counter
│       ├── AboutSection.tsx   # 2-column giới thiệu
│       ├── EcosystemSection.tsx # 4 ecosystem cards
│       ├── InvestmentAreasSection.tsx # 5-col grid
│       ├── ProjectsSection.tsx # Slider carousel
│       ├── InvestmentModelSection.tsx # Flow + 3 pillars
│       ├── PoliciesSection.tsx # Policies + cooperation diagram
│       ├── NewsSection.tsx    # 4-col news grid
│       ├── ContactFormSection.tsx # Form đăng ký
│       └── PartnersSection.tsx # Auto-scroll logos
├── data/
│   └── mock.ts                # Mock data cho tất cả sections
├── lib/
│   ├── utils.ts               # Utility functions
│   └── hooks.ts               # Custom React hooks
├── prisma/
│   ├── schema.prisma          # Database schema (PostgreSQL)
│   └── seed.ts                # Seed data script
├── public/
│   └── images/                # Static images (cần thêm)
├── .env.example               # Environment variables template
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS 3 |
| Animation | Framer Motion 11 + GSAP 3 |
| UI Components | Shadcn UI + Custom |
| Database | PostgreSQL |
| ORM | Prisma 5 |
| Auth | NextAuth.js 5 |
| Forms | React Hook Form + Zod |
| Rich Text | Tiptap |
| Charts | Recharts |
| Icons | Lucide React |

## 🗄 Database Setup

### Option 1: Local PostgreSQL
```bash
# Cài PostgreSQL, tạo database
createdb apecglobal

# Cập nhật .env
DATABASE_URL="postgresql://postgres:password@localhost:5432/apecglobal"

# Chạy migrations
npm run db:push

# Seed dữ liệu mẫu
npm run db:seed
```

### Option 2: Supabase (Cloud - khuyến nghị)
1. Tạo project tại https://supabase.com
2. Lấy Connection String từ Settings → Database
3. Thêm vào .env: `DATABASE_URL="postgresql://..."`
4. Chạy `npm run db:push && npm run db:seed`

### Option 3: Neon (Serverless)
1. Đăng ký tại https://neon.tech
2. Tạo project, lấy connection string
3. Cấu hình .env và chạy seed

## 🖼 Ảnh cần thêm

Tạo thư mục `public/images/` và thêm các ảnh sau:

```
public/images/
├── hero-bg.jpg          # Hero background (1920×1080)
├── ecosystem-tech.jpg   # Ecosystem Tech card
├── ecosystem-finance.jpg
├── ecosystem-commerce.jpg
├── ecosystem-service.jpg
├── area-realestate.jpg  # Investment area cards
├── area-energy.jpg
├── area-manufacturing.jpg
├── area-logistics.jpg
├── area-tech.jpg
├── project-apecspace.jpg
├── project-ecoop.jpg
├── project-apectech.jpg
├── project-apecbci.jpg
├── project-lifecare.jpg
├── news-1.jpg           # News thumbnails
├── news-2.jpg
├── news-3.jpg
├── news-4.jpg
├── partner-viettel.png  # Partner logos
├── partner-bidv.png
├── partner-techcombank.png
├── partner-vingroup.png
├── partner-dpworld.png
└── partner-mapletree.png
```

💡 **Tạm thời không cần ảnh**: Giao diện đã được thiết kế với gradient placeholders đẹp ngay cả khi không có ảnh.

## 🚢 Deploy

### Vercel (Khuyến nghị – 1 lệnh)
```bash
# Cài Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Hoặc connect GitHub repo với Vercel Dashboard
# → Tự động deploy khi push code
```

**Cấu hình Vercel:**
- Framework: Next.js
- Build Command: `npm run build`
- Environment Variables: Thêm tất cả từ `.env`

### VPS / Docker
```bash
# Build production
npm run build

# Start
npm run start

# Hoặc dùng PM2
pm2 start npm --name "apecglobal" -- start
```

## 🔐 Admin CMS

Truy cập: `http://your-domain/admin`

| Thông tin | Giá trị |
|-----------|---------|
| URL | `/admin` |
| Email | `admin@apecglobal.vn` |
| Password | `admin123` (đổi trong production!) |

**Chức năng CMS:**
- ✅ Dashboard thống kê tổng quan
- ✅ Quản lý Banner (text, ảnh, hiệu ứng)
- ✅ Quản lý Tin tức (rich editor, SEO, schedule)
- ✅ Quản lý Dự án (CRUD, drag-drop sort)
- ✅ Quản lý Đối tác
- ✅ Xem danh sách liên hệ
- ✅ Toggle ẩn/hiện section
- ✅ SEO per-section

## 📊 Performance Targets

| Metric | Target |
|--------|--------|
| Performance | 95+ |
| SEO | 100 |
| Accessibility | 90+ |
| Best Practices | 95+ |
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |

## 🎨 Design System

**Brand Colors:**
- Navy: `#020B1A`
- Electric Blue: `#0066FF`
- Glow: `#00A8FF`
- Accent: `#00D4FF`

**Typography:**
- Display: Montserrat (headings)
- Body: Inter (content)

## 📞 Hỗ trợ

- Website: https://apecglobal.vn
- Email: info@apecglobal.vn
- Hotline: 1800 1234
