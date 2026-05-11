import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://apecglobal.vn";

  const staticPages = [
    { url: "/", changeFrequency: "daily" as const, priority: 1.0 },
    { url: "/gioi-thieu", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/he-sinh-thai", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/du-an", changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "/chinh-sach-dau-tu", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/chinh-sach-hop-tac", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/tin-tuc", changeFrequency: "daily" as const, priority: 0.9 },
    { url: "/lien-he", changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  return staticPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
