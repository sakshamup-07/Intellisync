import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

// GET all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().lean();
    return res.json(notes);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// CREATE note
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.create({ title, text: content });
return res.json({
  success: true,
  note,
});  } catch (err) {
    return res.status(500).json({ error: "Failed to create note" });
  }
});

// DELETE note
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete note" });
  }
});

export default router;
