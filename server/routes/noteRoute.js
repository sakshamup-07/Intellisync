import express from "express";
import Note from "../models/noteModel.js";

const router = express.Router();

// GET all notes
router.get("/", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// POST create note
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  const newNote = await Note.create({ title, content });
  res.json(newNote);
});

// DELETE note
router.delete("/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
