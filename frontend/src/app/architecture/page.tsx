"use client";
import Navbar from "@/components/common/Navbar";
import { useState } from "react";
import { runMenuAgent } from "@/services/api";
import { Layers, Sparkles } from "lucide-react";

export default function ArchitecturePage() {
  const [prompt, setPrompt] = useState("FastAPI와 Next.js 간의 모듈러 구조 설계 방식을 설명해줘.");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRun = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await runMenuAgent(2, prompt);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <main className="max-w-4xl mx-auto p-8 space-y-8">
        <div className="border border-slate-800 bg-slate-900/50 p-8 rounded-2xl">
          <div className="text-cyan-400 font-mono text-sm mb-2 flex items-center gap-2">
            <Layers size={16} /> ARCHITECTURE DESIGNER // 2. MODULAR SYSTEM
          </div>
          <h1 className="text-3xl font-extrabold mb-4">아키텍처 구조 분석 및 설계</h1>
          <form onSubmit={handleRun} className="space-y-4">
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={3} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-400 text-sm font-mono" />
            <button type="submit" disabled={loading} className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-lg flex items-center gap-2">
              <Sparkles size={16} /> {loading ? "분석 중..." : "아키텍처 에이전트 실행"}
            </button>
          </form>
        </div>
        {result && <div className="border border-slate-800 bg-slate-900/80 p-8 rounded-2xl whitespace-pre-wrap font-mono text-sm text-slate-200">{result}</div>}
      </main>
    </div>
  );
}