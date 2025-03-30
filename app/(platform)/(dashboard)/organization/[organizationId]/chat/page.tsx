"use client";

import { useState, useEffect, KeyboardEvent } from "react";
import Pusher from "pusher-js";
import { useAuth, useUser } from "@clerk/nextjs";
import { Send } from "lucide-react";

interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
}

export default function ChatPage({
  params,
}: {
  params: { organizationId: string };
}) {
  const { organizationId } = params;
  const { userId } = useAuth();
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`/api/chat/${organizationId}`);
      const data = await res.json();
      setMessages(data);
    };
    fetchMessages();

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });
    const channel = pusher.subscribe(`chat-${organizationId}`);
    channel.bind("new-message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      pusher.unsubscribe(`chat-${organizationId}`);
    };
  }, [organizationId]);

  const sendMessage = async () => {
    if (!content.trim()) return;

    const res = await fetch(`/api/chat/${organizationId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, userId }),
    });

    if (res.ok) setContent("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const getDisplayName = (msgUserId: string) => {
    if (msgUserId === userId) return "You";

    if (user && user.fullName) return user.fullName;

    return msgUserId.length > 10
      ? `${msgUserId.slice(0, 5)}...${msgUserId.slice(-4)}`
      : msgUserId;
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="bg-gray-100 p-4 border-b">
        <h1 className="text-xl font-semibold text-gray-800">
          Organization Chat
        </h1>
      </div>

      <div
        className="flex-grow overflow-y-auto p-4 space-y-4"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(249, 250, 251, 0.5), rgba(249, 250, 251, 0.5))",
          backgroundClip: "content-box",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${
              msg.userId === userId ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-[70%] ${
                msg.userId === userId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p className="text-sm font-medium mb-1">
                {getDisplayName(msg.userId)}
              </p>
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-gray-50 border-t flex items-center space-x-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition-colors duration-300 flex items-center justify-center"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
