import dotenv from "dotenv";
dotenv.config(); // Load BEFORE reading env

console.log("ENV CHECK:", {
  ENV: process.env.PINECONE_ENVIRONMENT,
  HOST: process.env.PINECONE_HOST
});
console.log(`Key Length: ${process.env.GEMINI_API_KEY.length}`);
console.log(`Key Value: "${process.env.GEMINI_API_KEY}"`); 
// Note the quotes! If it prints "AIza... " (with a space before the last quote), that's the error.
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import uploadRoute from "./routes/uploadRoute.js";
import ragRoutes from "./routes/ragRoutes.js";
import notesRoute from "./routes/noteRoute.js";




const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/api/notes", notesRoute);   // ADD THIS
app.use("/api", uploadRoute);
app.use("/api/rag", ragRoutes);
// Static (if needed)
app.use("/static", express.static(path.join(process.cwd(), "static")));

// Routes
app.use("/api", uploadRoute);
app.use("/api/rag", ragRoutes);

// Connect MongoDB
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.warn("⚠️ MONGO_URI not set in .env");
} else {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("🟢 MongoDB connected"))
    .catch((err) => console.error("Mongo connection error:", err));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
