"use client";

import { useState } from "react";
import { MessageCircle, ImageIcon, Download } from "lucide-react";
import Link from "next/link";

interface Board {
  id: string;
  title: string;
  imageThumbUrl: string;
}

interface Message {
  sender: "user" | "bot";
  type: "text" | "boards" | "poster-form" | "poster-result";
  text?: string;
  message?: string;
  boards?: Board[];
  formData?: {
    eventName?: string;
    place?: string;
    date?: string;
    description?: string;
    prize?: string;
    contactInfo?: string;
  };
  imageUrl?: string;
}

export const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [posterForm, setPosterForm] = useState({
    eventName: "",
    place: "",
    date: "",
    description: "",
    prize: "",
    contactInfo: "",
  });

  const fetchBotResponse = async (message: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      console.error("Fetch Error:", error);
      return {
        type: "text",
        message: `Error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      sender: "user",
      type: "text",
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const botResponse = await fetchBotResponse(input);
    setMessages((prev) => [...prev, { sender: "bot", ...botResponse }]);
  };

  const handleShowBoards = async () => {
    const userMessage: Message = {
      sender: "user",
      type: "text",
      text: "Show my boards",
    };
    setMessages((prev) => [...prev, userMessage]);

    const botResponse = await fetchBotResponse("show my boards");
    setMessages((prev) => [...prev, { sender: "bot", ...botResponse }]);
  };

  const handleGeneratePoster = async () => {
    const userMessage: Message = {
      sender: "user",
      type: "text",
      text: "Generate a poster",
    };
    setMessages((prev) => [...prev, userMessage]);

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        type: "poster-form",
        message: "Let's create an amazing poster! Please provide the details:",
      },
    ]);
  };

  const handlePosterSubmit = async () => {
    if (!posterForm.eventName || !posterForm.place || !posterForm.date) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          type: "text",
          message: "Please fill in at least the event name, place, and date.",
        },
      ]);
      return;
    }

    const loadingMessage: Message = {
      sender: "bot",
      type: "text",
      message: "Generating your poster... Please wait a moment.",
    };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      const res = await fetch("/api/generate-poster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(posterForm),
      });

      if (!res.ok) {
        throw new Error(`Poster generation failed: ${res.status}`);
      }

      const { imageUrl } = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          type: "poster-result",
          imageUrl,
          formData: { ...posterForm },
          message: "Here's your generated poster:",
        },
      ]);

      // Reset form after successful generation
      setPosterForm({
        eventName: "",
        place: "",
        date: "",
        description: "",
        prize: "",
        contactInfo: "",
      });
    } catch (error) {
      console.error("Poster Generation Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          type: "text",
          message: "Failed to generate poster. Please try again.",
        },
      ]);
    }
  };

  const handleDownloadPoster = (imageUrl: string, eventName: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `${eventName || "event"}-poster.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRegeneratePoster = () => {
    handlePosterSubmit();
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all z-50 animate-bounce"
          aria-label="Open chatbot"
        >
          <MessageCircle className="h-7 w-7" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            AI
          </span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[27.5rem] h-[33rem] bg-white shadow-2xl rounded-xl flex flex-col z-50 border border-gray-200 overflow-hidden">
          {/* Header with gradient and animation */}
          <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-white p-1 rounded-full">
                <MessageCircle className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-lg font-bold text-white">BoardSync AI</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white/20"
              aria-label="Close chatbot"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Action buttons with improved styling */}
          <div className="flex items-center px-5 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-b gap-3">
            <button
              onClick={handleShowBoards}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-white text-blue-600 rounded-full border border-blue-200 hover:bg-blue-100 transition-all disabled:opacity-50 shadow-sm hover:shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
              My Boards
            </button>

            <button
              onClick={handleGeneratePoster}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-white text-purple-600 rounded-full border border-purple-200 hover:bg-purple-100 transition-all disabled:opacity-50 shadow-sm hover:shadow-md"
            >
              <ImageIcon size={14} />
              Create Poster
            </button>
          </div>

          {/* Messages area - increased by 10% */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-50 to-gray-100">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="bg-white p-6 rounded-xl shadow-sm max-w-[90%] border border-gray-200">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg mb-3">
                    <p className="font-bold">Welcome to BoardSync AI</p>
                  </div>
                  <p className="text-gray-600 mt-2">
                    I can help you manage your boards and design posters!
                  </p>
                  <p className="text-xs mt-3 text-blue-500 font-medium">
                    Try `&quot;`Show my boards`&quot;` or create a poster
                  </p>
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[90%] p-4 rounded-xl ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                      : "bg-white text-gray-800 border border-gray-200 shadow-sm"
                  } transition-all duration-200`}
                >
                  {msg.sender === "user" && msg.text && (
                    <p className="font-medium">{msg.text}</p>
                  )}

                  {msg.sender === "bot" && (
                    <>
                      {msg.type === "text" && msg.message && (
                        <p className="font-medium text-gray-700">
                          {msg.message}
                        </p>
                      )}

                      {msg.type === "boards" && (
                        <div className="space-y-3">
                          {msg.message && (
                            <p className="text-sm mb-3 font-medium text-gray-600">
                              {msg.message}
                            </p>
                          )}
                          {msg.boards && msg.boards.length > 0 ? (
                            <div className="grid gap-3">
                              {msg.boards.map((board) => (
                                <Link
                                  key={board.id}
                                  href={`/board/${board.id}`}
                                  className="block p-3 rounded-lg overflow-hidden hover:opacity-90 transition-all border shadow-sm hover:shadow-md"
                                  style={{
                                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${board.imageThumbUrl})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                  }}
                                >
                                  <p className="text-white font-bold text-lg">
                                    {board.title}
                                  </p>
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">
                              No boards found.
                            </p>
                          )}
                        </div>
                      )}

                      {msg.type === "poster-form" && (
                        <div className="space-y-4">
                          <p className="text-sm mb-3 font-medium text-gray-700">
                            {msg.message}
                          </p>
                          <input
                            type="text"
                            value={posterForm.eventName}
                            onChange={(e) =>
                              setPosterForm({
                                ...posterForm,
                                eventName: e.target.value,
                              })
                            }
                            className="w-full p-3 text-sm border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                            placeholder="Event Name *"
                            required
                          />
                          <input
                            type="text"
                            value={posterForm.place}
                            onChange={(e) =>
                              setPosterForm({
                                ...posterForm,
                                place: e.target.value,
                              })
                            }
                            className="w-full p-3 text-sm border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                            placeholder="Place *"
                            required
                          />
                          <input
                            type="date"
                            value={posterForm.date}
                            onChange={(e) =>
                              setPosterForm({
                                ...posterForm,
                                date: e.target.value,
                              })
                            }
                            className="w-full p-3 text-sm border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                            required
                          />
                          <textarea
                            value={posterForm.description}
                            onChange={(e) =>
                              setPosterForm({
                                ...posterForm,
                                description: e.target.value,
                              })
                            }
                            className="w-full p-3 text-sm border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                            placeholder="Description"
                            rows={3}
                          />
                          <input
                            type="text"
                            value={posterForm.prize}
                            onChange={(e) =>
                              setPosterForm({
                                ...posterForm,
                                prize: e.target.value,
                              })
                            }
                            className="w-full p-3 text-sm border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                            placeholder="Prize"
                          />
                          <input
                            type="text"
                            value={posterForm.contactInfo}
                            onChange={(e) =>
                              setPosterForm({
                                ...posterForm,
                                contactInfo: e.target.value,
                              })
                            }
                            className="w-full p-3 text-sm border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                            placeholder="Contact Info"
                          />
                          <button
                            onClick={handlePosterSubmit}
                            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all shadow-md hover:shadow-lg"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <span className="flex items-center justify-center gap-2">
                                <svg
                                  className="animate-spin h-4 w-4 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Generating...
                              </span>
                            ) : (
                              "Generate Poster"
                            )}
                          </button>
                        </div>
                      )}

                      {/* In your poster-result display section: */}
                      {msg.type === "poster-result" && msg.imageUrl && (
                        <div className="space-y-3">
                          <p className="text-sm mb-3 font-medium text-gray-700">
                            {msg.message}
                          </p>
                          <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white shadow-lg transform hover:scale-[1.01] transition-transform duration-200">
                            <img
                              src={msg.imageUrl}
                              alt="Generated poster"
                              className="w-full h-auto max-h-[350px] object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "/placeholder-poster.jpg";
                              }}
                            />
                            <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 border-t flex justify-between items-center">
                              <button
                                onClick={() =>
                                  handleDownloadPoster(
                                    msg.imageUrl!,
                                    msg.formData?.eventName || "poster"
                                  )
                                }
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium px-4 py-2 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-all shadow-sm"
                              >
                                <Download size={16} />
                                Download Poster
                              </button>
                              <div className="flex gap-2">
                                <button
                                  onClick={handleRegeneratePoster}
                                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm font-medium px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-all shadow-sm"
                                  disabled={isLoading}
                                >
                                  {isLoading ? (
                                    <svg
                                      className="animate-spin h-4 w-4 text-gray-600"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      ></path>
                                    </svg>
                                  ) : (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                                      <path d="M3 3v5h5"></path>
                                      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                                      <path d="M16 16h5v5"></path>
                                    </svg>
                                  )}
                                  Regenerate
                                </button>
                                <button
                                  onClick={() =>
                                    navigator.clipboard.writeText(msg.imageUrl!)
                                  }
                                  className="flex items-center gap-2 text-purple-600 hover:text-purple-800 text-sm font-medium px-4 py-2 bg-white rounded-lg border border-purple-200 hover:bg-purple-50 transition-all shadow-sm"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <rect
                                      x="9"
                                      y="9"
                                      width="13"
                                      height="13"
                                      rx="2"
                                      ry="2"
                                    ></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                  </svg>
                                  Copy Link
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 p-4 rounded-xl max-w-[90%] border border-gray-200 shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce"></div>
                    <div
                      className="w-3 h-3 rounded-full bg-blue-500 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-3 h-3 rounded-full bg-blue-500 animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input area with improved styling */}
          <div className="p-4 border-t flex flex-col gap-3 bg-white">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent shadow-sm"
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg disabled:opacity-70"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
