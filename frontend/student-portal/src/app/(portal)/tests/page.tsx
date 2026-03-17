"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Target, 
  Clock, 
  History, 
  Play, 
  ChevronRight, 
  BarChart2, 
  Trophy,
  Activity
} from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";
import { Badge } from "@repo/ui/components/badge";
import { cn } from "@repo/ui/lib/utils";

const tabs = ["Upcoming", "Completed", "Practice"];

const tests = [
  { id: 1, title: "Grade 9 Mid-Term: Mathematics", type: "MCQ & Descriptive", subject: "Math", duration: "90 min", marks: 100, date: "Mar 20, 10:00 AM", status: "Upcoming", color: "text-blue-500" },
  { id: 2, title: "Unit Test 4: Physical Systems", type: "MCQ", subject: "Physics", duration: "45 min", marks: 50, date: "Mar 15, 02:00 PM", status: "Completed", result: "42/50", color: "text-indigo-500" },
  { id: 3, title: "Modern English Literature Quiz", type: "MCQ", subject: "English", duration: "30 min", marks: 25, date: "Mar 12, 11:00 AM", status: "Completed", result: "24/25", color: "text-orange-500" },
];

export default function TestsPage() {
  const [activeTab, setActiveTab] = useState("Upcoming");

  const filtered = tests.filter(t => t.status === activeTab);

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="badge mb-4">
             <Target className="w-3.5 h-3.5 mr-2" />
             Assessment Hub
          </div>
          <h1 className="text-4xl font-display font-bold text-text-main tracking-tight">Tests & <span className="text-gradient">Quizzes</span></h1>
          <p className="text-text-muted font-medium">Verify your knowledge and climb the leaderboard.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="ghost" className="rounded-xl border border-border-main bg-white text-text-muted font-bold h-12 px-6 hover:text-primary transition-all">
              Practice Mode
           </Button>
           <Button className="h-12 px-6 rounded-xl bg-primary text-white font-bold shadow-ocean hover:scale-105 active:scale-95 transition-all">
              Analysis Dashboard
           </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
            { label: "Avg Score", value: "88%", icon: Activity, color: "text-primary" },
            { label: "Tests Taken", value: "14", icon: BarChart2, color: "text-indigo-500" },
            { label: "Best Subject", value: "English", icon: Trophy, color: "text-amber-500" },
            { label: "Time Taken", value: "32h", icon: Clock, color: "text-emerald-500" },
         ].map((stat, i) => (
            <Card key={i} className="soft-card p-6 border-none flex items-center gap-4">
               <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center bg-bg-soft", stat.color)}>
                  <stat.icon className="w-6 h-6" />
               </div>
               <div>
                  <div className="text-2xl font-display font-bold text-text-main leading-none mb-1">{stat.value}</div>
                  <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{stat.label}</div>
               </div>
            </Card>
         ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 bg-white border border-border-main rounded-2xl w-fit shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300",
              activeTab === tab ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-text-muted hover:text-primary hover:bg-primary-light"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card className="soft-card group p-8 border-none space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-light/30 rounded-full blur-[40px] -mr-16 -mt-16 pointer-events-none" />
                  
                  <div className="flex items-start justify-between">
                     <div className="space-y-1">
                        <div className={cn("text-[10px] font-bold uppercase tracking-widest", item.color)}>{item.subject}</div>
                        <h3 className="text-2xl font-bold text-text-main line-clamp-1 group-hover:text-primary transition-colors">{item.title}</h3>
                     </div>
                     <Badge className="bg-bg-soft text-text-muted border-border-main text-[10px] font-bold px-3 py-1.5">{item.type}</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 py-6 border-y border-border-soft">
                     <div className="space-y-1">
                        <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Duration</div>
                        <div className="text-sm font-bold text-text-main flex items-center gap-1.5">
                           <Clock className="w-3.5 h-3.5 text-primary" /> {item.duration}
                        </div>
                     </div>
                     <div className="space-y-1">
                        <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Marks</div>
                        <div className="text-sm font-bold text-text-main flex items-center gap-1.5">
                           <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {item.marks} M
                        </div>
                     </div>
                     <div className="space-y-1">
                        <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Date</div>
                        <div className="text-sm font-bold text-text-main">{item.status === 'Completed' ? 'Finished' : 'Upcoming'}</div>
                     </div>
                  </div>

                  <div className="flex items-center justify-between">
                     <div className="text-xs font-bold text-text-muted">
                        {item.status === 'Completed' ? (
                           <div className="flex flex-col">
                              <span className="text-[10px] uppercase tracking-widest opacity-60">Result</span>
                              <span className="text-primary text-lg">{item.result}</span>
                           </div>
                        ) : (
                           <div className="flex flex-col">
                              <span className="text-[10px] uppercase tracking-widest opacity-60">Scheduled</span>
                              <span className="text-text-main">{item.date}</span>
                           </div>
                        )}
                     </div>
                     <Button className={cn(
                       "h-12 px-8 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-md active:scale-95",
                       item.status === 'Completed' ? "bg-bg-soft text-text-main hover:bg-border-soft border border-border-main" : "bg-primary text-white shadow-ocean hover:bg-primary-dark"
                     )}>
                        {item.status === 'Completed' ? 'Review Answers' : 'Start Test'}
                        <ChevronRight className="w-4 h-4 ml-1" />
                     </Button>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
             <div className="col-span-full py-24 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-[2rem] bg-white border border-border-soft flex items-center justify-center mb-6 shadow-sm">
                   <Target className="w-8 h-8 text-text-muted opacity-30" />
                </div>
                <h2 className="text-2xl font-bold text-text-main mb-1">No {activeTab.toLowerCase()} tests</h2>
                <p className="text-text-muted font-medium">Keep practicing with our mock mock bank to sharpen your skills.</p>
                <Button className="mt-8 bg-primary-light text-primary font-bold px-8 h-12 rounded-xl">Generate Practice Test</Button>
             </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
