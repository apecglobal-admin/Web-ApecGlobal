import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export function readJSON<T = any>(filename: string): T {
  ensureDir(DATA_DIR);
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) return (Array.isArray(filename) ? [] : {}) as T;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return {} as T;
  }
}

export function writeJSON(filename: string, data: any): void {
  ensureDir(DATA_DIR);
  const filePath = path.join(DATA_DIR, filename);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export function readPageJSON<T = any>(slug: string): T {
  return readJSON<T>(`pages/${slug}.json`);
}

export function writePageJSON(slug: string, data: any): void {
  writeJSON(`pages/${slug}.json`, data);
}
