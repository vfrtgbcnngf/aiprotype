import Link from "next/link";
import { Cpu, Terminal, Layers, MessageSquare, Code2 } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-cyan-400 text-lg flex items-center gap-2">
          <Cpu size={20} /> TYPEAI.PRO
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><Terminal size={15}/> 1.Overview</Link>
          <Link href="/architecture" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><Layers size={15}/> 2.Architecture</Link>
          <Link href="/chat" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><MessageSquare size={15}/> 3.AI Chat</Link>
          <Link href="/projects" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><Cpu size={15}/> 4.Projects</Link>
          <Link href="/optimizer" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><Code2 size={15}/> 5.Optimizer</Link>
        </div>
      </div>
    </nav>
  );
}