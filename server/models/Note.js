// server/models/Note.js
import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: { type: String, default: "Untitled" },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);
export default Note;
