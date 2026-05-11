import IntroClient from "@/components/sections/IntroClient";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

function getJsonData(filename: string) {
  try {
    const filePath = path.join(process.cwd(), "data", `${filename}.json`);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
  } catch (error) {
    console.error(`Error reading ${filename}.json:`, error);
  }
  return null;
}

export default function IntroPage() {
  const intro = getJsonData("intro");
  const site = getJsonData("site");

  return <IntroClient intro={intro} site={site} />;
}
