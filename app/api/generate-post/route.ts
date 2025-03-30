import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { generatePost, generateImage } from "@/lib/openai";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { userId, orgId } = getAuth(req);
  if (!orgId || !userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, place, date, description, rewards, contactInfo } =
    await req.json();

  try {
    const event = await db.event.create({
      data: {
        orgId,
        name,
        place,
        date: date ? new Date(date) : null,
        description,
        rewards,
        contactInfo,
      },
    });

    const content =
      (await generatePost(
        name,
        place,
        date,
        description,
        rewards,
        contactInfo
      )) ?? "";
    const imageUrl = await generateImage(
      name,
      place,
      date,
      description,
      rewards,
      contactInfo
    );

    const post = await db.socialMediaPost.create({
      data: {
        orgId,
        eventId: event.id,
        content,
        imageUrl,
        status: "draft",
      },
    });

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate post" },
      { status: 500 }
    );
  }
}
