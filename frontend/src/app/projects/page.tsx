"use client";
import Navbar from "@/components/common/Navbar";
import { useState } from "react";
import { runMenuAgent } from "@/services/api";
import { Cpu, Send, ShieldAlert, Sparkles } from "lucide-react";

export default function ProjectsPage() {
  const [projectInput, setProjectInput] = useState("현재 FastAPI와 Next.js로 구성된 풀스택 포트폴리오의 보안성 및 성능 확장성을 검토해줘.");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInspect = async () => {
    if (!projectInput.trim() || loading) return;
    setLoading(true);
    try {
      // 4번 메뉴 ID(4)를 백엔드로 전달하여 Project Reviewer 에이전트 실행
      const res = await runMenuAgent(4, projectInput);
      setResult(res);
    } catch (err) {
      setResult("프로젝트 진단 중 오류가 발생했습니다. 백엔드 서버를 확인해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleInspect();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <main className="max-w-4xl mx-auto p-8 space-y-8">
        {/* 입력 섹션 */}
        <div className="border border-slate-800 bg-slate-900/50 p-8 rounded-2xl shadow-xl">
          <div className="text-cyan-400 font-mono text-sm mb-2 flex items-center gap-2">
            <ShieldAlert size={16} /> PROJECT INSPECTOR // 4. SECURITY & SCALABILITY REVIEWER
          </div>
          <h1 className="text-3xl font-extrabold mb-2">AI 프로젝트 진단 및 검토 에이전트</h1>
          <p className="text-slate-400 text-sm mb-6">검토가 필요한 프로젝트 아키텍처 설명, 코드 구조, 또는 개선 사항을 입력하면 Gemini AI가 종합 진단 리포트를 작성합니다.</p>
          
          <div className="space-y-4">
            <textarea
              value={projectInput}
              onChange={(e) => setProjectInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={4}
              placeholder="진단할 프로젝트 내용을 입력하세요... (Enter 전송, Shift + Enter 줄바꿈)"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-400 text-sm font-mono resize-none"
            />
            <button
              type="button"
              onClick={handleInspect}
              disabled={loading}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <Sparkles size={16} /> {loading ? "프로젝트 정밀 진단 중..." : "AI 프로젝트 진단 실행"}
            </button>
          </div>
        </div>

        {/* 결과 출력 리포트 섹션 */}
        {result && (
          <div className="border border-slate-800 bg-slate-900/80 p-8 rounded-2xl space-y-4 shadow-2xl">
            <div className="text-cyan-400 font-mono text-sm flex items-center gap-2">
              <Cpu size={16} /> INSPECTION REPORT OUTPUT
            </div>
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-slate-200 font-mono text-sm whitespace-pre-wrap leading-relaxed overflow-x-auto">
              {result}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}