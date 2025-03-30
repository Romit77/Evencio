import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { orgId } = auth();
  const { message } = await req.json();

  if (!orgId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (message.toLowerCase().includes("show my boards")) {
    const boards = await db.board.findMany({
      where: { orgId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        imageThumbUrl: true,
      },
    });

    return NextResponse.json({
      type: "boards",
      boards: boards,
      message:
        boards.length > 0 ? "Here are your boards:" : "You have no boards yet.",
    });
  }

  return NextResponse.json({
    type: "text",
    message: "I can show your boards if you ask!",
  });
}
