Real-mode Intellisync backend (fixed)

How to use:
1. Unzip into your server project folder (or replace old files).
2. Copy .env.example -> .env and set values (DO NOT paste keys into public chat).
3. npm install
4. npm run dev

Endpoints:
- POST /api/notes           { title, text }
- POST /api/rag/index/:noteId
- POST /api/rag/search      { query, topK }
- POST /api/rag/answer      { query, topK }

Notes on models & endpoints:
- Gemini endpoints use `generativelanguage.googleapis.com` v1beta paths.
- Use a Gemini key from AI Studio (https://aistudio.google.com) and ensure the model you request is available to your key.
- Pinecone client compatibility wrapper included to handle SDK differences across versions.
