"use client";
import Navbar from "@/components/common/Navbar";
import { Mail, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto p-8 space-y-8">
        <div className="border border-slate-800 bg-slate-900/50 p-8 rounded-2xl">
          <div className="text-cyan-400 font-mono text-sm mb-2 flex items-center gap-2">
            <Mail size={16} /> CONTACT // GET IN TOUCH
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-4">Contact Me</h1>
          <p className="text-slate-400 mb-6">궁금한 점이나 협업 제안이 있으시면 아래 양식을 통해 연락 주세요.</p>

          {/* 간단한 문의 폼 예시 */}
          <form onSubmit={(e) => { e.preventDefault(); alert("메시지가 전송되었습니다!"); }} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">이메일</label>
              <input type="email" required className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">메시지 내용</label>
              <textarea required rows={5} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400" placeholder="내용을 입력하세요..."></textarea>
            </div>
            <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
              <Send size={16} /> 전송하기
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}