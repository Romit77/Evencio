export interface Message {
    text?: string;
    sender: "user" | "bot";
    boards?: { id: string; title: string; imageThumbUrl: string }[];
    message?: string; // Optional message field for the bot's text
  }