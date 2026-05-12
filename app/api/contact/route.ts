import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const lead = await req.json();
    const leads = readJSON<any[]>("leads.json");
    
    if (!Array.isArray(leads)) {
      writeJSON("leads.json", []);
    }

    const newLead = {
      ...lead,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      status: "pending" // pending, contacted, closed
    };

    const updatedLeads = Array.isArray(leads) ? [newLead, ...leads] : [newLead];
    writeJSON("leads.json", updatedLeads);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
  }
}
