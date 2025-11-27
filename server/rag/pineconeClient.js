// server/rag/pineconeClient.js
import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.PINECONE_API_KEY) {
  throw new Error("❌ Missing PINECONE_API_KEY in .env");
}

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

// Export the client so we can use it elsewhere
export default pinecone;

// Export a specific index connection (Optional, but good for quick access)
// Note: We don't pass 'host' here; the SDK fetches it automatically.
export const INDEX = pinecone.index(process.env.PINECONE_INDEX);