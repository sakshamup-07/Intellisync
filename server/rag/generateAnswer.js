// server/rag/generateAnswer.js
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

// Initialize the new client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateAnswerGemini(query, context) {
  try {
    const prompt = `
You are a helpful assistant. Use ONLY the context to answer.and the answer length should be minimum medium.

After answering, list sources in this format:
- Source 0
- Source 1
(Only the numbers. No text. No long paragraphs.)

If answer is not present in the context, reply "I don't know."

CONTEXT:
${context}

QUESTION:
${query}

Provide a clean, short, readable answer.
Include a "Sources:" section listing at most 2 chunk IDs used.
    `;

    // New SDK syntax: ai.models.generateContent
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt, // New SDK accepts simple strings for simple prompts
    });

    // Extract text from the new response structure
    return response.text; 
  } catch (err) {
    console.error("Gemini answer error:", err);
    return "Error generating answer using Gemini.";
  }
}