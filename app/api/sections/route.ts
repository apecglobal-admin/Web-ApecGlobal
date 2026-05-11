import { NextResponse } from "next/server";
import { stats, ecosystem, investmentAreas, projects, partners, news } from "@/data/mock";

// GET all sections data for public frontend
export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      stats,
      ecosystem,
      investmentAreas,
      projects,
      partners,
      recentNews: news.slice(0, 4),
    },
  });
}
