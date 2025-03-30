// app/api/judges/route.ts
import { db } from "@/lib/db";
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const judges = await db.judge.findMany({
      orderBy: {
        relevanceScore: 'desc'
      }
    });
    
    return NextResponse.json({ judges });
  } catch (error) {
    console.error('Error fetching judges:', error);
    return NextResponse.json(
      { error: 'Failed to fetch judges' },
      { status: 500 }
    );
  }
}