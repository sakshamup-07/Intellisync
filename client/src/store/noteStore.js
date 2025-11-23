import { create } from "zustand";
import api from "../api/axios";

const useNoteStore = create((set) => ({
  notes: [],
  loading: false,

  fetchNotes: async () => {
  try {
    set({ loading: true });
    const res = await api.get("/notes");

    // FIX: force array
    const notesArray = Array.isArray(res.data) ? res.data : [];

    set({ notes: notesArray, loading: false });
  } catch (err) {
    console.error("Fetch Notes Error:", err);
    set({ loading: false });
  }
},


  addNote: async (title, content) => {
    try {
      const res = await api.post("/notes", { title, content });
      set((state) => ({ notes: [...state.notes, res.data] }));
    } catch (err) {
      console.error("Add Note Error:", err);
    }
  },

  deleteNote: async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      set((state) => ({
        notes: state.notes.filter((n) => n._id !== id),
      }));
    } catch (err) {
      console.error("Delete Note Error:", err);
    }
  },
}));

export default useNoteStore;
