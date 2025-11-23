// client/src/pages/PdfUpload.jsx
import React, { useState } from "react";
import api from "../api/api";
import { indexNote } from "../api/ragApi";
import PlanetCanvas from "../components/PlanetCanvas";

export default function PdfUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [noteId, setNoteId] = useState(null);
  const [indexing, setIndexing] = useState(false);

  const handleChoose = (e) => {
    setFile(e.target.files?.[0] ?? null);
    setExtractedText("");
    setMessage("");
    setTitle("");
    setNoteId(null);
  };

  const handleUpload = async () => {
    if (!file) return setMessage("Choose a PDF first");
    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file); // matches multer single("file") on server

      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = res.data;

      if (!data || !data.success) {
        setMessage("Upload failed (server returned no success flag)");
        setUploading(false);
        return;
      }

      // extracted text and optionally a server-created noteId
      setExtractedText(data.text || "");
      setTitle((prev) => prev || file.name.replace(/\.[^.]+$/, ""));
      setMessage("PDF extracted successfully.");
      setNoteId(data.noteId || null); // backend may return a note id immediately
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("Upload failed — " + (err.response?.data?.error || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleSaveAsNote = async () => {
    if (!extractedText.trim()) return setMessage("No text to save.");

    try {
      const payload = {
        title: title || "Untitled PDF",
        content: extractedText, // backend expects 'content'
      };

      const res = await api.post("/notes", payload);
      const note = res.data;

      // server may return the saved note
      if (note && (note._id || note.id)) {
        const id = note._id || note.id;
        setNoteId(id);
        setMessage("Saved to notes ✔ Now click Index to add to Pinecone.");
      } else {
        // fallback if server returns the saved content without an id
        setMessage("Saved to notes (server didn't return note id).");
      }
    } catch (err) {
      console.error("Save note error:", err);
      setMessage("Failed to save note — " + (err.response?.data?.error || err.message));
    }
  };

  const handleIndex = async () => {
    if (!noteId) return setMessage("You must save the note first.");
    setIndexing(true);
    setMessage("Indexing in Pinecone...");

    try {
      await indexNote(noteId); // your helper function that calls backend indexing route
      setMessage("Indexed successfully ✔");
    } catch (err) {
      console.error("Index error:", err);
      setMessage("Index failed — " + (err.response?.data?.error || err.message));
    } finally {
      setIndexing(false);
    }
  };

  return (
    <div className="relative pb-[360px]"> {/* extra bottom padding so Earth doesn't overlap content */}
      {/* MAIN UPLOAD CARD */}
      <section
        className="max-w-3xl mx-auto p-8 rounded-3xl relative z-10"
        style={{ background: "var(--glass)" }}
      >
        <h2 className="text-3xl font-semibold mb-6">Upload PDF</h2>

        <div className="p-6 rounded-2xl border border-white/6 bg-black/20">
          <div className="flex items-center gap-4 mb-4">
            <label className="relative inline-block">
              <input
                id="pdfInput"
                type="file"
                accept="application/pdf"
                onChange={handleChoose}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 backdrop-blur cursor-pointer hover:bg-white/10 hover:border-white/20 transition shadow-lg shadow-black/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2v6h6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                <div className="text-sm">
                  <div className="font-medium">Choose PDF</div>
                  <div className="text-xs opacity-60">{file ? file.name : "No file chosen"}</div>
                </div>
              </div>
            </label>

            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-white/6 to-white/3 hover:opacity-90 transition disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>

          {message && <div className="mb-4 text-sm opacity-70">{message}</div>}

          {extractedText && (
            <>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full p-3 rounded-lg mb-3 bg-black/30 border border-white/6"
              />

              <textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                rows={10}
                className="w-full p-3 rounded-lg bg-black/30 border border-white/6 whitespace-pre-wrap"
              />

              <div className="flex gap-3 mt-4">
                <button onClick={handleSaveAsNote} className="px-4 py-2 rounded-lg bg-gradient-to-r from-white/6 to-white/3">
                  Save Note
                </button>

                <button
                  onClick={handleIndex}
                  disabled={!noteId || indexing}
                  className="px-4 py-2 rounded-lg border border-white/6 disabled:opacity-50"
                >
                  {indexing ? "Indexing..." : "Index"}
                </button>

                <button
                  onClick={() => {
                    setExtractedText("");
                    setTitle("");
                    setNoteId(null);
                    setMessage("");
                  }}
                  className="px-4 py-2 rounded-lg border border-white/6"
                >
                  Reset
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* 3D Planet fixed at bottom (non-interactive) */}
      <div
        className="pointer-events-none fixed bottom-0 left-1/2 -translate-x-1/2 z-0 opacity-60"
        style={{ width: 560, height: 420 }}
      >
        <PlanetCanvas />
      </div>
    </div>
  );
}
