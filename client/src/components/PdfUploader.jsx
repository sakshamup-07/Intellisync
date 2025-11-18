import { useState } from "react";
import api from "../api";

export default function PdfUploader() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  const uploadFile = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post("/upload/pdf", formData);
    setText(res.data.text);
  };

  return (
    <div>
      <h2>Upload PDF</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button onClick={uploadFile}>Upload</button>

      <h3>Extracted Text:</h3>
      <pre>{text}</pre>
    </div>
  );
}
