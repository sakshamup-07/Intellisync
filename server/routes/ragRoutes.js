// server/routes/ragRoutes.js
import express from "express";
import Note from "../models/Note.js";
import { chunkText } from "../rag/chunk.js";
import { generateEmbeddings } from "../rag/embed.js";
import { INDEX } from "../rag/pineconeClient.js";
import { generateAnswerGemini } from "../rag/generateAnswer.js";

const router = express.Router();

const vectorId = (noteId, idx) => `${noteId}::${idx}`;

/* ==========================
   1. INDEX DOCUMENT
========================== */
router.post("/index/:noteId", async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId).lean();

    if (!note) return res.status(404).json({ error: "Note not found" });

    // chunk
    const chunks = chunkText(note.text, 1000, 200);
    const texts = chunks.map((c) => c.text);

    // embed
    const embeddings = await generateEmbeddings(texts);

    // vectors
    const vectors = embeddings.map((values, idx) => ({
      id: vectorId(note._id.toString(), idx),
      values, // embedding array
      metadata: {
        noteId: note._id.toString(),
        title: note.title || "Untitled",
        text: texts[idx] || "", // MUST NOT be undefined
        chunkIndex: idx
      }
    }));

    // upsert
    await INDEX.upsert(vectors);

    return res.json({ success: true, indexed: vectors.length });
  } catch (err) {
    console.error("Index error:", err);
    return res.status(500).json({ error: err.message });
  }
});

/* ==========================
   2. SEARCH
========================== */
router.post("/search", async (req, res) => {
  try {
    const { query, topK = 5 } = req.body;

    const [qEmbed] = await generateEmbeddings([query]);

    const result = await INDEX.query({
      topK,
      vector: qEmbed,
      includeMetadata: true,
    });

    res.json({ matches: result.matches || [] });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ==========================
   3. ANSWER (Gemini)
========================== */
router.post("/answer", async (req, res) => {
  try {
    const { query, topK = 5 } = req.body;

    const [qEmbed] = await generateEmbeddings([query]);

    const result = await INDEX.query({
      topK,
      vector: qEmbed,
      includeMetadata: true,
    });

    const matches = result.matches || [];

    const context = matches
      .map((m) => m.metadata?.text || "")
      .join("\n---\n");

    if (!context.trim()) {
      return res.json({
        answer: "This information is not present in the PDF.",
        matches
      });
    }

    const finalPrompt = `
    Use ONLY the following context to answer.
    If the answer is not found in the context, say exactly: "Not present in this document".

    CONTEXT:
    ${context}

    QUESTION: ${query}
    `;

    const answer = await generateAnswerGemini(finalPrompt);

    res.json({ answer, matches });
  } catch (err) {
    console.error("Answer error:", err);
    res.status(500).json({ error: err.message });
  }
});


export default router;
