// server/routes/uploadRoute.js
import express from "express";
import multer from "multer";
import Note from "../models/Note.js";
const upload = multer(); // memory storage

const router = express.Router();

async function loadPdfParse() {
  try {
    // dynamic import to avoid startup failure when package missing
    const mod = await import("pdf-parse");
    // ESM default or commonjs
    return mod.default || mod;
  } catch (err) {
    return null;
  }
}

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const pdfParse = await loadPdfParse();
    if (!pdfParse) {
      return res.status(500).json({
        error:
          "Server missing 'pdf-parse' module. Run `npm install pdf-parse` and restart the server.",
      });
    }

    const buffer = req.file.buffer;
    const data = await pdfParse(buffer);

    const extractedText = (data && data.text) ? data.text.trim() : "";

    if (!extractedText) {
      return res.status(400).json({ error: "PDF contains no readable text" });
    }

    const title = req.body.title || req.file.originalname || "Untitled PDF";

    const note = await Note.create({
      title,
      text: extractedText,
    });

    return res.json({ success: true, noteId: note._id, text: extractedText });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: "Server error uploading PDF." });
  }
});

export default router;
