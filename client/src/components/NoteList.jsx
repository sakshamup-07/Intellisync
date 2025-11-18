import { useEffect } from "react";
import useNoteStore from "../store/noteStore";

export default function NoteList() {
  const notes = useNoteStore((s) => s.notes);
  const loading = useNoteStore((s) => s.loading);
  const fetchNotes = useNoteStore((s) => s.fetchNotes);
  const deleteNote = useNoteStore((s) => s.deleteNote);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  if (loading) return <div>Loading notes...</div>;
  if (!notes || notes.length === 0) return <div>No notes found.</div>;

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {notes.map((n) => (
        <div
          key={n._id}
          style={{
            padding: 12,
            borderRadius: 8,
            background: "#1f1f1f",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ maxWidth: "85%" }}>
            <h3 style={{ margin: 0 }}>{n.title}</h3>
            <p style={{ margin: "6px 0 0 0", whiteSpace: "pre-wrap" }}>
              {n.content}
            </p>
          </div>

          <button
            onClick={() => deleteNote(n._id)}
            style={{
              background: "transparent",
              color: "salmon",
              border: "1px solid salmon",
              padding: "6px 8px",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
