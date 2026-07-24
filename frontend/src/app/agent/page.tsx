"use client";
import Navbar from "@/components/common/Navbar";
import { useState } from "react";
import { runMenuAgent } from "@/services/api";
import { Send, Bot } from "lucide-react";

export default function AgentPage() {
  const [messages, setMessages] = useState([{ sender: "ai", text: "AI 에이전트 대기 중입니다. 무엇이든 물어보세요!" }]);
  const [input, setInput] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userText = input;
    setMessages(prev => [...prev, { sender: "user", text: userText }]);
    setInput("");
    
    try {
      // menu_id를 1번으로 지정하고 프롬프트(질문) 전달
      const aiRes = await runMenuAgent(1, userText);
      setMessages(prev => [...prev, { sender: "ai", text: aiRes }]);
    } catch {
      setMessages(prev => [...prev, { sender: "ai", text: "오류가 발생했습니다. 다시 시도해 주세요." }]);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 text-cyan-400"><Bot /> AI Career RAG Agent</h1>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl h-[500px] flex flex-col p-6 shadow-2xl">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`p-4 rounded-xl text-sm ${m.sender === "user" ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-200 font-mono"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="flex gap-2 border-t border-slate-800 pt-4">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="예: 주요 프로젝트 성과를 말해줘" className="flex-1 bg-slate-950 border border-slate-700 px-4 py-3 rounded-xl text-white focus:outline-none focus:border-cyan-500" />
            <button className="bg-cyan-500 text-slate-950 px-6 py-3 rounded-xl font-bold hover:bg-cyan-400"><Send size={18} /></button>
          </form>
        </div>
      </main>
    </div>
  );
}
