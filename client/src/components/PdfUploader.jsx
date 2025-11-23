import { useState } from "react";
import api from "../api";
import { indexNote } from "../api/ragApi";

export default function PdfUploader() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");
const uploadFile = async () => {
  if (!file) return alert("Select a PDF");

  setStatus("Uploading...");

  const fd = new FormData();
  fd.append("file", file);  // FIXED: must match multer.single("file")

  try {
    const res = await api.post("/upload", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (!res.data.success) {
      setStatus("Upload failed");
      return;
    }

    setText(res.data.text);
    setStatus("Uploaded!");
  } catch (err) {
    console.log(err);
    setStatus("Error uploading PDF");
  }
};

  return (
    <div>
      <h2>Upload PDF</h2>
      <input 
        type="file" 
        accept="application/pdf" 
        onChange={(e) => setFile(e.target.files[0])} 
      />
      <button onClick={uploadFile}>Upload</button>

      <h3>Status</h3>
      <p>{status}</p>

      <h3>Extracted Text</h3>
      <pre style={{ whiteSpace: "pre-wrap" }}>{text}</pre>
    </div>
  );
}
