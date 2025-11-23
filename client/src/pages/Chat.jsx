// src/pages/Chat.jsx
import React, { useState, useRef, useEffect } from "react";
import { ragAnswer } from "../api/ragApi";
import ChatBubble from "../components/ChatBubble";
import LoadingDots from "../components/LoadingDots";

export default function Chat() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Upload a document or ask a question to start.", ts: Date.now() },
  ]);
  const [loading, setLoading] = useState(false);
  const [typingText, setTypingText] = useState(""); // displayed incremental text
  const scrollRef = useRef(null);
  const typingIntervalRef = useRef(null);

  // auto-scroll to bottom on messages change
  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, 40);
  }, [messages, typingText]);

  // copy handler
  function handleCopy(text) {
    if (!text) return;
    navigator.clipboard?.writeText(text).then(() => {
      // small visual feedback could be added
    });
  }

  const handleAsk = async () => {
    if (!query.trim()) return;
    // push user message
    const userMsg = { from: "you", text: query.trim(), ts: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setQuery("");
    setLoading(true);
    setTypingText(""); // reset
    // add temporary bot placeholder (will be replaced)
    const placeholder = { from: "bot", text: "", ts: Date.now(), temp: true };
    setMessages((m) => [...m, placeholder]);

    try {
      const res = await ragAnswer(query.trim(), 5); // your function — unchanged
      const fullAnswer = res?.answer ?? "No answer returned.";

      // Simulate typing: reveal characters progressively
      let idx = 0;
      const speed = 18; // ms per char — adjust for faster/slower typing
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = setInterval(() => {
        idx++;
        setTypingText(fullAnswer.slice(0, idx));
        if (idx >= fullAnswer.length) {
          clearInterval(typingIntervalRef.current);
          // replace the last placeholder bot message with final one
          setMessages((prev) => {
            const copied = [...prev];
            // find last message that has temp === true (our placeholder)
            const lastIdx = copied.map((x) => x.temp || false).lastIndexOf(true);
            if (lastIdx >= 0) {
              copied[lastIdx] = { from: "bot", text: fullAnswer, ts: Date.now() };
            } else {
              copied.push({ from: "bot", text: fullAnswer, ts: Date.now() });
            }
            return copied;
          });
          setTypingText("");
          setLoading(false);
        }
      }, speed);
    } catch (err) {
      clearInterval(typingIntervalRef.current);
      // replace placeholder with error message
      setMessages((prev) => {
        const copied = [...prev];
        const lastIdx = copied.map((x) => x.temp || false).lastIndexOf(true);
        const errMsg = "Error: " + (err?.message ?? "Unknown error");
        if (lastIdx >= 0) {
          copied[lastIdx] = { from: "bot", text: errMsg, ts: Date.now() };
        } else {
          copied.push({ from: "bot", text: errMsg, ts: Date.now() });
        }
        return copied;
      });
      setTypingText("");
      setLoading(false);
    }
  };

  // render: messages + typingText as the last bot partial
  const renderedMessages = [
    // messages without placeholders will be included; placeholders are preserved but we display typingText if exists
    ...messages,
  ];

  // If typingText exists, ensure the last bot placeholder shows typingText
  if (typingText) {
    // Find the index of the last bot message (the placeholder)
    const lastBotIdx = renderedMessages.map((m) => m.from).lastIndexOf("bot");
    if (lastBotIdx >= 0) {
      renderedMessages[lastBotIdx] = {
        ...renderedMessages[lastBotIdx],
        text: typingText,
      };
    } else {
      renderedMessages.push({ from: "bot", text: typingText, ts: Date.now() });
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">RAG Chat</h2>

      <div
        ref={scrollRef}
        className="h-[60vh] md:h-[65vh] overflow-y-auto p-4 rounded-2xl bg-black/20 border border-white/6 mb-4"
      >
        <div className="flex flex-col gap-3">
          {renderedMessages.map((m, i) => (
            <ChatBubble key={i} msg={m} isUser={m.from === "you"} onCopy={handleCopy} />
          ))}

          {loading && (
            <div className="pt-2">
              <div className="inline-flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/6">
                <LoadingDots />
                <div className="text-sm opacity-70">Thinking...</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={2}
          placeholder="Ask about the uploaded PDF..."
          className="flex-1 p-3 rounded-xl bg-black/30 border border-white/6 focus:outline-none focus:ring-2 focus:ring-white/20 placeholder-white/40 resize-none"
        />

        <div className="flex flex-col gap-2">
          <button
            onClick={handleAsk}
            disabled={loading || !query.trim()}
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-white/10 to-white/20 hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>

          <button
            onClick={() => {
              setMessages([{ from: "bot", text: "Upload a document or ask a question to start.", ts: Date.now() }]);
              setQuery("");
            }}
            className="px-3 py-2 rounded-md border border-white/6 text-sm opacity-80"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
