import Link from "next/link";
import { ArrowRight, LayoutDashboard, ShieldCheck, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] text-[#0F172A] selection:bg-[#0066FF] selection:text-white overflow-hidden relative font-sans">
      
      {/* Decorative Ambient Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0066FF] opacity-[0.03] blur-[100px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0066FF] opacity-[0.05] blur-[100px] rounded-full"></div>

      <nav className="absolute top-0 w-full p-8 flex justify-between items-center max-w-7xl">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#0066FF] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#0066FF44]">
            <Globe size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">Base Learn</span>
        </div>
        <Link 
          href="/admin/login" 
          className="flex items-center gap-2 font-semibold text-[#64748B] hover:text-[#0066FF] transition-colors"
        >
          Admin Portal <ArrowRight size={18} />
        </Link>
      </nav>

      <main className="relative z-10 text-center px-6 max-w-4xl py-20 flex flex-col items-center gap-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-semibold text-[#0066FF] shadow-sm border border-[#E2E8F0] animate-bounce mb-4">
          <ShieldCheck size={16} /> Enterprise Grade Learning Platform
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-[#0F172A] leading-none mb-4">
          Higher Learning.<br />
          <span className="text-[#0066FF]">Simplified for All.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-[#64748B] max-w-2xl leading-relaxed mb-8">
          The most advanced platform for managing higher education, content delivery, and student engagement. Secure, scalable, and designed for the future of learning.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/admin/login" 
            className="flex h-14 items-center justify-center gap-3 rounded-full bg-[#0066FF] px-10 text-lg font-bold text-white shadow-xl shadow-[#0066FF44] transition-all hover:scale-105 active:scale-95"
          >
            Access Admin Portal <LayoutDashboard size={20} />
          </Link>
          <button className="flex h-14 items-center justify-center rounded-full border border-[#E2E8F0] bg-white px-10 text-lg font-bold text-[#0F172A] transition-all hover:bg-[#F8FAFC]">
            Learn More
          </button>
        </div>
      </main>

      <footer className="absolute bottom-10 text-[#64748B] text-sm font-medium">
        &copy; 2026 Base Learn Platform • Premium Education Infrastructure
      </footer>

      <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-t from-[#E6F0FF]/30 to-transparent blur-[120px] pointer-events-none"></div>
    </div>
  );
}
