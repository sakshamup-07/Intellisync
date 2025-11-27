// server/rag/chunk.js

export function chunkText(text, { chunkSize = 1000, overlap = 200 } = {}) {
  if (!text) return [];

  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= chunkSize) return [{ text: clean, start: 0, end: clean.length }];

  const chunks = [];
  let start = 0;

  while (start < clean.length) {
    let end = start + chunkSize;

    // Avoid cutting in the middle of a word
    if (end < clean.length) {
      const lastSpace = clean.lastIndexOf(" ", end);
      if (lastSpace > start) end = lastSpace;
    }

    if (end > clean.length) end = clean.length;

    const slice = clean.slice(start, end).trim();
    if (slice.length) {
      chunks.push({ text: slice, start, end });
    }

    if (end >= clean.length) break;

    // Next chunk starts 'overlap' characters before end
    start = Math.max(end - overlap, start + 1);
  }

  return chunks;
}
