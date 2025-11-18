import { useEffect } from "react";
import useNoteStore from "../store/noteStore";

export default function NotesPage() {
  const { notes, loading, fetchNotes } = useNoteStore();

  useEffect(() => {
    fetchNotes();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Your Notes</h1>
      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        notes.map((n) => (
          <div key={n._id} style={{ padding: "10px", border: "1px solid #aaa", marginBottom: "8px" }}>
            <h3>{n.title}</h3>
            <p>{n.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
