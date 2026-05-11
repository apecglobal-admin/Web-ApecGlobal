import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://apecglobal.vn"),
  title: {
    default: "APEC GLOBAL – Creating Value, Owning The Future",
    template: "%s | APEC GLOBAL",
  },
  description:
    "APEC Global – Tập đoàn đầu tư đa ngành hàng đầu Việt Nam. Kiến tạo giá trị bền vững, đồng hành phát triển dài hạn cùng các doanh nghiệp và nhà đầu tư.",
  keywords: [
    "APEC Global",
    "tập đoàn đầu tư",
    "hệ sinh thái doanh nghiệp",
    "đầu tư Việt Nam",
    "chính sách đầu tư",
    "hợp tác doanh nghiệp",
    "công nghệ tài chính",
  ],
  authors: [{ name: "APEC GLOBAL", url: "https://apecglobal.vn" }],
  creator: "APEC GLOBAL",
  publisher: "APEC GLOBAL",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://apecglobal.vn",
    siteName: "APEC GLOBAL",
    title: "APEC GLOBAL – Creating Value, Owning The Future",
    description:
      "Tập đoàn đầu tư đa ngành hàng đầu Việt Nam. Kiến tạo giá trị bền vững, đồng hành phát triển dài hạn.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "APEC GLOBAL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "APEC GLOBAL – Creating Value, Owning The Future",
    description: "Tập đoàn đầu tư đa ngành hàng đầu Việt Nam.",
    images: ["/og-image.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#020B1A" },
    { media: "(prefers-color-scheme: light)", color: "#020B1A" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <link rel="icon" href="/api/favicon" type="image/png" />
        <link rel="apple-touch-icon" href="/api/favicon" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "APEC GLOBAL",
              url: "https://apecglobal.vn",
              logo: "https://apecglobal.vn/images/logo.png",
              description:
                "Tập đoàn đầu tư đa ngành hàng đầu Việt Nam. Kiến tạo giá trị bền vững, đồng hành phát triển dài hạn.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+84-24-1234-5678",
                contactType: "customer service",
                areaServed: "VN",
                availableLanguage: "Vietnamese",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Tầng 15, Tòa nhà Apec Tower – 22/7 Duy Tân",
                addressLocality: "Hà Nội",
                addressCountry: "VN",
              },
              sameAs: [
                "https://facebook.com/apecglobal",
                "https://linkedin.com/company/apecglobal",
                "https://youtube.com/apecglobal",
              ],
            }),
          }}
        />
        </head>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
