import fs from "fs";
import path from "path";
import NewsClient from "./NewsClient";

export default function TinTucPage() {
  let articles = [];
  try {
    const p = path.join(process.cwd(), "data", "news.json");
    if (fs.existsSync(p)) articles = JSON.parse(fs.readFileSync(p, "utf-8"));
  } catch (e) { console.error(e); }

  return <NewsClient articles={articles} />;
}
