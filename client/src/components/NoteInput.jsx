import { useState } from "react";
import useNoteStore from "../store/noteStore";

export default function NoteInput() {
  const addNote = useNoteStore((s) => s.addNote);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !content.trim()) {
      setError("Both title and content are required.");
      return;
    }

    try {
      setSaving(true);
      await addNote(title.trim(), content.trim());
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Add note failed:", err);
      setError("Failed to save note.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{ padding: 10, fontSize: 16, borderRadius: 6 }}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note..."
          rows={6}
          style={{ padding: 10, fontSize: 14, borderRadius: 6 }}
        />
        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit" disabled={saving} style={{ padding: "8px 16px" }}>
            {saving ? "Saving..." : "Add Note"}
          </button>
          <button
            type="button"
            onClick={() => {
              setTitle("");
              setContent("");
              setError(null);
            }}
            style={{ padding: "8px 12px", background: "#eee" }}
          >
            Clear
          </button>
        </div>
        {error && <div style={{ color: "salmon" }}>{error}</div>}
      </form>
    </div>
  );
}
