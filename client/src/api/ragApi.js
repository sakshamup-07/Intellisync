// client/src/api/ragApi.js
import api from "./api.js"; // axios baseURL -> http://localhost:5000/api

export async function indexNote(noteId) {
  const res = await api.post(`/api/rag/index/${noteId}`);
  return res.data;
}

export async function ragSearch(query, topK = 5) {
  const res = await api.post("/rag/search", { query, topK });
  return res.data;
}

export async function ragAnswer(query, topK = 5) {
  const res = await api.post("/rag/answer", { query, topK });
  return res.data;
}
