import Link from "next/link";
import { ArrowRight, BookOpen, Layers, BarChart3, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] text-[#0F172A] selection:bg-[#0066FF] selection:text-white">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#0066FF] opacity-[0.03] blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#0066FF] opacity-[0.05] blur-[100px]"></div>
      </div>

      <main className="relative z-10 w-full max-w-5xl px-6 py-20 text-center">
        {/* Logo/Brand Section */}
        <div className="mb-12 inline-flex items-center gap-2 rounded-full bg-white/50 px-4 py-2 border border-[#E2E8F0] shadow-sm backdrop-blur-md">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0066FF] text-white">
            <BookOpen size={18} />
          </div>
          <span className="text-sm font-bold tracking-tight text-[#0F172A]">BASE LEARN</span>
          <div className="h-4 w-[1px] bg-[#E2E8F0] mx-1"></div>
          <span className="text-sm font-semibold text-[#64748B]">Faculty Portal</span>
        </div>

        {/* Hero Section */}
        <h1 className="mb-6 text-5xl font-[850] tracking-tight text-[#0F172A] md:text-7xl">
          Academic Oversight <br />
          <span className="text-[#0066FF]">Redefined.</span>
        </h1>
        
        <p className="mx-auto mb-10 max-w-2xl text-lg font-medium leading-relaxed text-[#64748B]">
          A comprehensive intelligence platform for Department Heads and Academic Coordinators. 
          Manage curriculum, monitor performance, and lead your faculty with data-driven insights.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link 
            href="/faculty/login" 
            className="group flex h-14 items-center gap-2 rounded-xl bg-[#0066FF] px-8 text-base font-bold text-white transition-all hover:bg-[#004DCF] hover:shadow-lg hover:shadow-[#0066FF]/25"
          >
            Enter Portal
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a 
            href="https://base-learn.docs" 
            className="flex h-14 items-center px-8 text-base font-bold text-[#64748B] transition-colors hover:text-[#0F172A]"
          >
            Documentation
          </a>
        </div>

        {/* Feature Grid */}
        <div className="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { 
              icon: <Layers size={22} />, 
              title: "Curriculum Planner", 
              desc: "Strategic topic management and instructor assignments." 
            },
            { 
              icon: <BarChart3 size={22} />, 
              title: "Performance Analytics", 
              desc: "Score heatmaps and institutional health monitoring." 
            },
            { 
              icon: <Users size={22} />, 
              title: "Staff Coordination", 
              desc: "Unified directory and productivity tracking." 
            },
            { 
              icon: <BookOpen size={22} />, 
              title: "Course Oversight", 
              desc: "Strict quality control and content moderation." 
            }
          ].map((feature, i) => (
            <div 
              key={i} 
              className="group rounded-2xl border border-[#E2E8F0] bg-white/50 p-6 text-left backdrop-blur-md transition-all hover:border-[#0066FF]/20 hover:shadow-xl hover:shadow-[#0066FF]/5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0F7FF] text-[#0066FF] transition-colors group-hover:bg-[#0066FF] group-hover:text-white">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-base font-bold text-[#0F172A]">{feature.title}</h3>
              <p className="text-sm font-medium leading-relaxed text-[#64748B]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="mt-auto w-full border-t border-[#E2E8F0] bg-white/30 py-8 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 text-sm font-semibold text-[#94A3B8] sm:flex-row">
          <p>© 2024 Base Learn Platform. Institutional Access Required.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#64748B]">System Status</a>
            <a href="#" className="hover:text-[#64748B]">Security Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
