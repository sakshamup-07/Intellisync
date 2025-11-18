import express from "express";
import multer from "multer";
import * as pdfjsLib from "pdfjs-dist";

// Required for Node
import { readFileSync } from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Enable Node.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.js",
  import.meta.url
);

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const fileBuffer = readFileSync(req.file.path);

    // Load PDF
    const pdf = await pdfjsLib.getDocument({ data: fileBuffer }).promise;

    let fullText = "";

    // Extract text page by page
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      const strings = content.items.map((item) => item.str).join(" ");
      fullText += strings + "\n";
    }

    res.json({ text: fullText });
  } catch (err) {
    console.error("PDF parse error:", err);
    res.status(500).json({ error: "Failed to parse PDF" });
  }
});

export default router;
