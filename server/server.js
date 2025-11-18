import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import uploadRoutes from "./uploadRoute.js";

import noteRoute from "./routes/noteRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/upload", uploadRoutes);


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// routes
app.use("/api/notes", noteRoute);

// start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
