"use client";
import Navbar from "@/components/common/Navbar";
import { useEffect, useState } from "react";
import { fetchPortfolio } from "@/services/api";
import { Skill } from "@/types/portfolio";
import { BarChart3, Cpu } from "lucide-react";

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    fetchPortfolio().then(data => setSkills(data.skills || []));
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto p-8 space-y-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-cyan-400"><BarChart3 /> Tech Stack Matrix</h1>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          {skills.map((s, idx) => (
            <div key={idx} className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="font-mono text-white flex items-center gap-2"><Cpu size={16} className="text-cyan-400"/> {s.name}</span>
              <span className="bg-slate-800 text-cyan-400 font-mono text-xs px-3 py-1 rounded-full">{s.level} // {s.category}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}