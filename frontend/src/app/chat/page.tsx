"use client";
import Navbar from "@/components/common/Navbar";
import { useState } from "react";
import { runMenuAgent } from "@/services/api";
import { Send } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    { role: "assistant", content: "안녕하세요! TYPEAI.PRO AI 어시스턴트입니다. 무엇이든 물어보세요." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    
    setLoading(true);
    const aiRes = await runMenuAgent(3, userMsg);
    setMessages(prev => [...prev, { role: "assistant", content: aiRes }]);
    setLoading(false);
  };

  // 엔터키 전송 처리 (Shift + Enter는 줄바꿈 허용)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <Navbar />
      <main className="max-w-4xl w-full mx-auto p-8 flex-1 flex flex-col space-y-6">
        <div className="border border-slate-800 bg-slate-900/50 p-6 rounded-2xl flex-1 flex flex-col justify-between">
          <div className="space-y-4 overflow-y-auto max-h-[50vh] pr-2">
            {messages.map((m, idx) => (
              <div key={idx} className={`p-4 rounded-xl text-sm ${m.role === 'user' ? 'bg-cyan-950/40 border border-cyan-800/50 ml-12' : 'bg-slate-950 border border-slate-800 mr-12'}`}>
                <p className="font-mono text-xs text-cyan-400 mb-1">{m.role === 'user' ? 'USER' : 'GEMINI AGENT'}</p>
                <p className="whitespace-pre-wrap">{m.content}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex gap-2 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              placeholder="질문을 입력하세요... (Enter 전송, Shift + Enter 줄바꿈)"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 text-sm resize-none"
            />
            <button 
              type="button" 
              onClick={handleSend} 
              disabled={loading} 
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-lg flex items-center gap-2 h-full transition-colors disabled:opacity-50"
            >
              <Send size={16}/> 전송
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}