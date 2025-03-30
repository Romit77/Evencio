import { NextRequest, NextResponse } from "next/server";
import Pusher from "pusher";
import { prisma } from "@/lib/db";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export async function GET(
  req: NextRequest,
  { params }: { params: { orgId: string } }
) {
  const { orgId } = params;
  const messages = await prisma.message.findMany({
    where: { chatRoom: { orgId } },
    orderBy: { createdAt: "asc" },
    include: { chatRoom: true },
  });
  return NextResponse.json(messages);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { orgId: string } }
) {
  const { orgId } = params;
  const { content, userId } = await req.json();

  let chatRoom = await prisma.chatRoom.findUnique({ where: { orgId } });
  if (!chatRoom) {
    chatRoom = await prisma.chatRoom.create({ data: { orgId } });
  }

  const message = await prisma.message.create({
    data: {
      chatRoomId: chatRoom.id,
      userId,
      content,
    },
  });

  await pusher.trigger(`chat-${orgId}`, "new-message", message);

  return NextResponse.json(message, { status: 201 });
}
