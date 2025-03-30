import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { eventName, place, date, description, prize, contactInfo } =
      await req.json();

    if (!eventName || !place || !date) {
      return NextResponse.json(
        { error: "Event name, place, and date are required" },
        { status: 400 }
      );
    }

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const prompt = `
      Create an extremely engaging event poster for students with these details:
      
      **Main Content:**
      - Event Title: "${eventName}" (large, bold, eye-catching font)
      - Tagline: "Don't miss this exciting opportunity!"
      - Location: "${place}" (with location pin icon)
      - Date: "${formattedDate}" (with calendar icon)
      ${description ? `- Highlights: "${description}"\n` : ""}
      ${prize ? `- Amazing Prizes: "${prize}" (with trophy icon)\n` : ""}
      ${
        contactInfo
          ? `- Contact: "${contactInfo}" (with phone/email icons)\n`
          : ""
      }
      
      **Design Requirements:**
      - Vibrant, youthful color scheme (gradients encouraged)
      - Modern, dynamic layout with visual hierarchy
      - Include relevant decorative elements (tech icons for tech events, etc.)
      - Add a "Register Now!" call-to-action button
      - Use creative typography with a mix of fonts
      - Include a subtle geometric pattern or abstract background
      - Make it look professional but fun and appealing to students
      - Add social media icons/handles if available
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedDescription = response.text();

    // Generate actual image using a more advanced placeholder service
    const posterUrl = `https://placehold.co/800x1200/1e40af/white/png?text=${encodeURIComponent(
      `🌟 ${eventName.toUpperCase()} 🌟\n\n` +
        `📅 ${formattedDate} | 📍 ${place}\n\n` +
        `${description ? `🎯 ${description}\n\n` : ""}` +
        `${prize ? `🏆 Prizes: ${prize}\n\n` : ""}` +
        `${contactInfo ? `📞 ${contactInfo}\n\n` : ""}` +
        `👉 REGISTER NOW!`
    )}`;

    return NextResponse.json({
      imageUrl: posterUrl,
      message: "Engaging poster generated successfully!",
    });
  } catch (error) {
    console.error("Poster generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate poster. Please try again." },
      { status: 500 }
    );
  }
}
