// server/rag/embed.js
import { pipeline } from "@xenova/transformers";

let embedder = null;

export async function generateEmbeddings(texts = []) {
  if (!embedder) {
    console.log("Loading 384-dim MiniLM embedding model...");
    embedder = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2" // 384 dimension
    );
  }

  const out = [];

  for (const t of texts) {
    const result = await embedder(t, {
      pooling: "mean",
      normalize: true,
    });

    out.push(Array.from(result.data));
  }

  return out;
}
