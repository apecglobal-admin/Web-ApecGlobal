import fs from "fs";
import path from "path";
import NewsClient from "./NewsClient";

export const dynamic = "force-dynamic";

export default function TinTucPage() {
  let data: any = {};
  try {
    const p = path.join(process.cwd(), "data", "news.json");
    if (fs.existsSync(p)) data = JSON.parse(fs.readFileSync(p, "utf-8"));
  } catch (e) { console.error(e); }

  const articles = data.items || (Array.isArray(data) ? data : []);
  return <NewsClient articles={articles} banner={data} />;
}
