import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import fs from "fs";
import path from "path";
import Script from "next/script";

export const dynamic = "force-dynamic";

// Helper function to read JSON data securely
function getJsonData(filename: string) {
  try {
    const filePath = path.join(process.cwd(), "data", `${filename}.json`);
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(fileData);
    }
  } catch (error) {
    console.error(`Error reading ${filename}.json:`, error);
  }
  return null;
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const site = getJsonData("site") || {};
  const nav = getJsonData("nav") || [];
  const footer = getJsonData("footer") || {};

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#020B1A", color: "#fff" }}>
      <Script src="https://chatbotapi.apecglobal.net/widget.js?id=apec-global" async defer></Script>
      <Header nav={nav} site={site} />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer data={footer} site={site} />
    </div>
  );
}
