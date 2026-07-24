"use client";
import Navbar from "@/components/common/Navbar";
import { useEffect, useState } from "react";
import { fetchPortfolio, runMenuAgent } from "@/services/api";
import { Zap, Cpu, Server, Activity, ShieldCheck, Sparkles, Send } from "lucide-react";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [systemPrompt, setSystemPrompt] = useState("TYPEAI.PRO 시스템의 전체 운영 철학과 핵심 가치를 요약해줘.");
  const [quickResult, setQuickResult] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPortfolio().then(setData).catch(err => console.error("포트폴리오 로드 실패:", err));
  }, []);

  // 1번 메뉴 자체에서 빠른 AI 시스템 진단 테스트를 실행하는 함수
  const handleQuickTest = async () => {
    if (!systemPrompt.trim() || loading) return;
    setLoading(true);
    try {
      const res = await runMenuAgent(1, systemPrompt);
      setQuickResult(res);
    } catch (err) {
      setQuickResult("시스템 에이전트 응답 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleQuickTest();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <main className="max-w-6xl mx-auto p-8 space-y-8">
        
        {/* 상단 시스템 상태 요약 배너 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-slate-800 bg-slate-900/40 p-5 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-lg"><Server size={22} /></div>
            <div>
              <p className="text-xs text-slate-400 font-mono">BACKEND STATUS</p>
              <p className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> ONLINE (FastAPI)
              </p>
            </div>
          </div>

          <div className="border border-slate-800 bg-slate-900/40 p-5 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-lg"><Cpu size={22} /></div>
            <div>
              <p className="text-xs text-slate-400 font-mono">AI ENGINE</p>
              <p className="text-sm font-bold text-white mt-0.5">Google Gemini Flash</p>
            </div>
          </div>

          <div className="border border-slate-800 bg-slate-900/40 p-5 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-lg"><Activity size={22} /></div>
            <div>
              <p className="text-xs text-slate-400 font-mono">SYSTEM MODE</p>
              <p className="text-sm font-bold text-cyan-400 mt-0.5">Autonomous Agent</p>
            </div>
          </div>
        </div>

        {/* 메인 소개 및 라이브 인터랙션 패널 */}
        <div className="border border-slate-800 bg-slate-900/50 p-8 rounded-2xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div>
            <div className="text-cyan-400 font-mono text-sm mb-2 flex items-center gap-2">
              <Zap size={16} /> SYSTEM_OVERVIEW // 1. CORE DASHBOARD
            </div>
            <h1 className="text-4xl font-extrabold text-white mb-2">{data?.name || "TYPEAI.PRO"}</h1>
            <p className="text-slate-400 text-lg">{data?.title || "Autonomous AI & Modular Architecture Specialist"}</p>
            <p className="text-slate-300 mt-4 leading-relaxed max-w-3xl">
              {data?.bio || "FastAPI 백엔드와 Next.js 프론트엔드가 결합된 고성능 AI 포트폴리오 에이전트 시스템입니다."}
            </p>
          </div>

          {/* 기술 스택 뱃지 */}
          <div className="flex flex-wrap gap-2 pt-2">
            {data?.skills?.map((skill: string, index: number) => (
              <span key={index} className="bg-slate-950 border border-slate-800 text-cyan-400 font-mono text-xs px-3 py-1.5 rounded-lg">
                {skill}
              </span>
            ))}
          </div>

          <hr className="border-slate-800 my-6" />

          {/* 1번 메뉴 전용 라이브 에이전트 빠른 테스트 컨트롤러 */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles size={18} className="text-cyan-400" /> 시스템 오버뷰 라이브 에이전트 질의
            </h2>
            <p className="text-slate-400 text-sm">대시보드에서 곧바로 시스템 개요 및 에이전트 철학에 대한 AI 응답을 테스트할 수 있습니다.</p>
            
            <div className="flex gap-2 items-end">
              <textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={2}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 text-sm font-mono resize-none"
                placeholder="시스템에 물어볼 내용을 입력하세요... (Enter 전송)"
              />
              <button
                type="button"
                onClick={handleQuickTest}
                disabled={loading}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-lg flex items-center gap-2 h-full transition-colors disabled:opacity-50"
              >
                <Send size={16} /> {loading ? "분석 중..." : "실행"}
              </button>
            </div>
          </div>
        </div>

        {/* 라이브 테스트 결과 출력 창 */}
        {quickResult && (
          <div className="border border-slate-800 bg-slate-900/80 p-8 rounded-2xl space-y-4">
            <div className="text-cyan-400 font-mono text-sm flex items-center gap-2">
              <ShieldCheck size={16} /> OVERVIEW AGENT LIVE OUTPUT
            </div>
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-slate-200 font-mono text-sm whitespace-pre-wrap leading-relaxed">
              {quickResult}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}