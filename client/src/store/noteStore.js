import { create } from "zustand";
import api from "../api/axios";

const useNoteStore = create((set) => ({
  notes: [],
  loading: false,

  fetchNotes: async () => {
    set({ loading: true });
    try {
      const res = await api.get("/notes");
      set({ notes: res.data, loading: false });
    } catch (err) {
      console.error("fetchNotes error", err);
      set({ loading: false });
    }
  },

  addNote: async (title, content) => {
    try {
      const res = await api.post("/notes", { title, content });
      set((state) => ({ notes: [...state.notes, res.data] }));
      return res.data;
    } catch (err) {
      console.error("addNote error", err);
      throw err;
    }
  },

  deleteNote: async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      set((state) => ({ notes: state.notes.filter((n) => n._id !== id) }));
    } catch (err) {
      console.error("deleteNote error", err);
    }
  },
}));

export default useNoteStore;
