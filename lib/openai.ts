import { OpenAI } from "openai";
import { UTApi } from "uploadthing/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const utapi = new UTApi(); 

export async function generatePost(
  eventName: string,
  place: string | null,
  date: string | null,
  description: string,
  rewards: string | null,
  contactInfo: string | null
) {
  const prompt = `
    Create an engaging LinkedIn post for an event.
    Event Name: ${eventName}
    Place: ${place ?? "Not specified"}
    Date: ${date ?? "Not specified"}
    Description: ${description}
    Rewards: ${rewards ?? "Not specified"}
    Contact Info: ${contactInfo ?? "Not specified"}
    Keep it professional, concise, and include relevant hashtags like #Event, #Networking.
  `;
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  return response.choices[0].message.content;
}

export async function generateImage(
  eventName: string,
  place: string | null,
  date: string | null,
  description: string,
  rewards: string | null,
  contactInfo: string | null
) {
  const prompt = `
    Design a professional and visually appealing event poster. 
    Feature the event title "${eventName}" prominently at the top in bold, clear English text. 
    Include a short description "${description}" in smaller, legible text below the title. 
    Use vibrant colors, a modern layout, and abstract or thematic background elements that suit an event announcement. 
    Avoid clutter and ensure the design looks clean and professional.Don't include any other text.
  `;
  const response = await openai.images.generate({
    prompt,
    n: 1,
    size: "1024x1024",
  });

  // Upload the generated image to UploadThing
  const imageUrl = response.data[0].url;
  console.log("Generated Image URL:", imageUrl);
  const imageResponse = await fetch(imageUrl!);
  if (!imageResponse.ok) {
    throw new Error("Failed to fetch the generated image");
  }
  const imageBlob = await imageResponse.blob();
  const file = new File([imageBlob], `${eventName}-poster.png`, { type: "image/png" });

  const uploadedFile = await utapi.uploadFiles([file]);
  console.log("Uploaded File URL:", uploadedFile[0]);
  return uploadedFile[0]?.data?.ufsUrl // Return the UploadThing URL
}