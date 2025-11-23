// client/src/api/noteApi.js
import api from "./api.js"; // this is the axios instance (client/src/api.js)

export async function getNotes({ page = 1, limit = 50 } = {}) {
  const res = await api.get("/notes", { params: { page, limit } });
  return res.data; // { items, total, page, limit, pages }
}

export async function createNote({ title, content, source = "Uploaded PDF", user = "anonymous", tags = [], language = "en" }) {
  const payload = {
    title,
    content,
    source,
    user,
    tags,
    language,
  };
  const res = await api.post("/notes", payload);
  return res.data;
}

export async function deleteNote(noteId) {
  const res = await api.delete(`/notes/${noteId}`);
  return res.data;
}
