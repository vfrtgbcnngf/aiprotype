"use client";
import Navbar from "@/components/common/Navbar";
import { useState } from "react";
import { runMenuAgent } from "@/services/api";
import { Code2, Sparkles } from "lucide-react";

export default function OptimizerPage() {
  const [code, setCode] = useState("def calculate(data):\n    total = 0\n    for i in data:\n        total += i\n    return total");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOptimize = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await runMenuAgent(5, code);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <main className="max-w-4xl mx-auto p-8 space-y-8">
        <div className="border border-slate-800 bg-slate-900/50 p-8 rounded-2xl">
          <div className="text-cyan-400 font-mono text-sm mb-2 flex items-center gap-2">
            <Code2 size={16} /> AI CODE OPTIMIZER // 5. REFACTORING AGENT
          </div>
          <h1 className="text-3xl font-extrabold mb-4">소스코드 최적화 및 리팩토링</h1>
          <form onSubmit={handleOptimize} className="space-y-4">
            <textarea value={code} onChange={(e) => setCode(e.target.value)} rows={5} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-400 text-sm font-mono" placeholder="최적화할 코드를 입력하세요..." />
            <button type="submit" disabled={loading} className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-lg flex items-center gap-2">
              <Sparkles size={16} /> {loading ? "최적화 중..." : "AI 코드 최적화 실행"}
            </button>
          </form>
        </div>
        {result && <div className="border border-slate-800 bg-slate-900/80 p-8 rounded-2xl whitespace-pre-wrap font-mono text-sm text-slate-200">{result}</div>}
      </main>
    </div>
  );
}