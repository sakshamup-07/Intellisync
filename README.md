# 🌐 IntelliSync — AI-Powered Document Intelligence  
Futuristic Minimal • RAG • PDF Chat • Notes • 3D Experience

IntelliSync is an AI-powered system that allows users to upload PDFs, index their content into a vector database, and chat with the documents using Retrieval-Augmented Generation (RAG).  
It features a clean futuristic UI built with **React + Tailwind**, **Framer Motion**, **Three.js**, and a backend powered by **Node.js**, **Express**, **MongoDB**, **Pinecone**, and **Gemini** for LLM responses.

---

## ⚡ Features

### 🔹 1. PDF Upload & Indexing  
- Upload PDFs  
- Extract text and chunk them  
- Generate embeddings using Gemini  
- Store vectors in Pinecone  
- Search + retrieve context for answering queries  

### 🔹 2. RAG Chat System  
- Ask questions about uploaded PDFs  
- Contextual AI answers  
- Smooth typing animation  
- Confidence score bar  
- Chat bubble UI with copy feature  

### 🔹 3. Notes System  
- Simple quick notes  
- Create / delete notes  
- Stored locally or connected to backend  

### 🔹 4. Settings  
- Theme selector (future expansion)  
- Placeholder for user preferences  

### 🔹 5. Futuristic Frontend  
- Built with TailwindCSS v4  
- Smooth Framer Motion transitions  
- Clean minimal design  
- 3D animated planet (Three.js + GLTF model)  
- Glassmorphism everywhere  

---


---

## 🛠️ Tech Stack

### **Frontend**
- React 19  
- TailwindCSS v4  
- Framer-motion animations  
- Zustand (optional state)  
- Three.js + @react-three/fiber  
- Axios  

### **Backend**
- Node.js + Express  
- MongoDB  
- Pinecone  
- Gemini Embeddings  
- PDF-parse for extraction  

---

## 🚀 Running the Project

### 🔹 1. Clone the repo

```bash
git clone https://github.com/yourusername/IntelliSync
cd IntelliSync
cd client
npm install
npm run dev
http://localhost:5173

cd server
npm install
npm run dev
http://localhost:5000


MONGO_URI=your_mongo_connection
PINECONE_API_KEY=your_key
PINECONE_INDEX=intellisync
GEMINI_API_KEY=your_key
PORT=5000


