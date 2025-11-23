import { useEffect, useState } from "react";
import useNoteStore from "../store/noteStore";

export default function NotesPage() {
  const { notes, loading, fetchNotes, deleteNote } = useNoteStore();

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Notes</h2>

      {loading && <p>Loading...</p>}
      {!loading && notes.length === 0 && <p>No notes found.</p>}

      {notes.map((note) => (
        <div
          key={note._id}
          style={{
            padding: "10px",
            marginTop: "15px",
            background: "#222",
            borderRadius: "8px",
            color: "white",
          }}
        >
          <h3>{note.title}</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{note.text}</p>

          <button
            onClick={() => deleteNote(note._id)}
            style={{ background: "red", padding: "6px", marginTop: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
