import { NextResponse } from "next/server";
import { scrapeJudges } from "@/lib/scrape";

export async function POST(request: Request) {
  const { eventTheme } = await request.json();
  if (!eventTheme) {
    return NextResponse.json(
      { error: "Event theme is required" },
      { status: 400 }
    );
  }

  const judges = await scrapeJudges(eventTheme);
  return NextResponse.json({ judges });
}
