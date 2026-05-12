import { promises as fs } from "fs";
import path from "path";
import LienHeClient from "./LienHeClient";

export const dynamic = "force-dynamic";

async function getData() {
  const filePath = path.join(process.cwd(), "data", "site.json");
  const jsonData = await fs.readFile(filePath, "utf8");
  return JSON.parse(jsonData);
}

export default async function LienHePage() {
  const site = await getData();
  return <LienHeClient site={site} />;
}
