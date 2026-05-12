import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import AboutSection from "@/components/sections/AboutSection";
import EcosystemSection from "@/components/sections/EcosystemSection";
import InvestmentAreasSection from "@/components/sections/InvestmentAreasSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ModelAndPoliciesSection from "@/components/sections/ModelAndPoliciesSection";
import NewsAndContactSection from "@/components/sections/NewsAndContactSection";
import PartnersSection from "@/components/sections/PartnersSection";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

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

export default function Home() {
  const hero = getJsonData("hero");
  const stats = getJsonData("stats");
  const about = getJsonData("about");
  const ecosystem = getJsonData("ecosystem");
  const investment = getJsonData("investment");
  const projects = getJsonData("projects");
  const invPolicy = getJsonData("investment-policy");
  const coopPolicy = getJsonData("cooperation-policy");
  const news = getJsonData("news");
  const partners = getJsonData("partners");
  const site = getJsonData("site");

  const combinedPolicies = { ...invPolicy, ...coopPolicy };

  return (
    <>
      <HeroSection data={hero} />
      <StatsSection data={stats} />
      <AboutSection data={about} />
      <EcosystemSection data={ecosystem} />
      <InvestmentAreasSection data={investment} />
      <ProjectsSection data={projects} />
      <ModelAndPoliciesSection data={combinedPolicies} />
      <NewsAndContactSection data={news} site={site} />
      <PartnersSection data={partners} />
    </>
  );
}
