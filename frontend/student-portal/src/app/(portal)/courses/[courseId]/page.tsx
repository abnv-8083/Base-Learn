"use client";

import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@repo/ui/components/tabs";
import { cn } from "@repo/ui/lib/utils";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Maximize, 
  CheckCircle2, 
  Lock,
  Clock,
  ChevronDown,
  FileText,
  MessageSquare,
  Info,
  PenLine,
  ArrowLeft,
  Share2,
  Bookmark,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const chapters = [
  {
    title: "Unit 1: Number System",
    lessons: [
      { id: 1, title: "Introduction to Polynomials", duration: "12:45", status: "completed" },
      { id: 2, title: "Degree of a Polynomial", duration: "18:20", status: "current" },
      { id: 3, title: "Zeroes of a Polynomial", duration: "15:10", status: "locked" },
    ]
  },
  {
    title: "Unit 2: Algebraic Identities",
    lessons: [
      { id: 4, title: "Basic Identities Recap", duration: "22:00", status: "locked" },
      { id: 5, title: "Square of a Trinomial", duration: "19:30", status: "locked" },
    ]
  }
];

export default function CourseDetail({ params }: { params: { courseId: string } }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header Area */}
      <section className="space-y-6">
        <Link 
          href="/courses" 
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-muted hover:text-primary transition-all w-fit"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to My Roadmap
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="badge !bg-primary-light !text-primary border-primary/10">MATHEMATICS</span>
              <span className="badge !bg-amber-500/10 !text-amber-600 border-amber-500/20">GRADE 9</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-text-main tracking-tight">Polynomials & Identities</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-bg-soft border border-border-main flex items-center justify-center font-bold text-primary text-xs">
                  SS
                </div>
                <div>
                  <div className="text-sm font-bold text-text-main leading-none mb-1">Dr. Sarah Smith</div>
                  <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-none">Instructor</div>
                </div>
              </div>
              <div className="h-4 w-px bg-border-main" />
              <div className="flex items-center gap-2 text-text-muted font-bold text-xs uppercase tracking-widest">
                <Clock className="w-4 h-4 text-primary" />
                150 Students
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-border-main p-6 rounded-2xl shadow-sm min-w-[300px]">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-bold uppercase text-text-muted tracking-widest">Your Progress</span>
              <span className="text-[10px] font-bold text-primary tracking-widest bg-primary-light px-2 py-1 rounded-md">58% COMPLETE</span>
            </div>
            <div className="h-1.5 w-full bg-bg-soft rounded-full overflow-hidden border border-border-main">
              <div className="h-full bg-primary shadow-sm" style={{ width: "58%" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Video & Tabs */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Video Player */}
          <div className="relative aspect-video rounded-3xl bg-text-main overflow-hidden shadow-2xl group cursor-pointer border border-border-main">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
            <div className="absolute inset-0 flex items-center justify-center z-20">
               <motion.div 
                 whileHover={{ scale: 1.1 }}
                 whileActive={{ scale: 0.95 }}
                 className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl"
               >
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
               </motion.div>
            </div>
            
            {/* Player UI */}
            <div className="absolute bottom-0 inset-x-0 p-6 z-20 space-y-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden relative">
                 <div className="absolute inset-y-0 left-0 w-[42%] bg-primary" />
                 <div className="absolute top-1/2 left-[42%] -translate-y-1/2 w-3.5 h-3.5 bg-primary rounded-full border-2 border-white shadow-lg" />
              </div>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-6">
                    <button className="text-white hover:text-primary transition-colors"><SkipBack size={20} /></button>
                    <button className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-xl hover:scale-105 active:scale-95 transition-all">
                       <Play size={18} fill="currentColor" />
                    </button>
                    <button className="text-white hover:text-primary transition-colors"><SkipForward size={20} /></button>
                    <div className="flex items-center gap-3 ml-4">
                       <Volume2 size={18} className="text-white/80" />
                       <div className="w-20 h-1 bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full w-2/3 bg-white" />
                       </div>
                    </div>
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest ml-4">08:24 / 18:20</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <button className="text-[10px] font-bold text-white uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white hover:text-text-main transition-all">
                       1.5x Speed
                    </button>
                    <button className="text-white hover:text-primary transition-colors"><Maximize size={20} /></button>
                 </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between">
             <div className="flex gap-2">
                <Button size="sm" variant="ghost" className="rounded-btn h-10 px-4 font-bold border border-border-main bg-white text-text-muted hover:text-primary">
                   <PenLine className="w-4 h-4 mr-2" /> Take a Note
                </Button>
                <Button size="sm" variant="ghost" className="rounded-btn h-10 px-4 font-bold border border-border-main bg-white text-text-muted hover:text-primary">
                   <Bookmark className="w-4 h-4 mr-2" /> Bookmark
                </Button>
             </div>
             <Button variant="ghost" className="text-primary font-bold flex items-center gap-1 group">
                Mark as Complete <CheckCircle2 className="w-4 h-4" />
             </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-bg-soft border border-border-main p-1.5 rounded-2xl w-fit">
              <TabsTrigger value="overview" className="rounded-xl px-8 py-3 text-[10px] font-bold uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
                Overview
              </TabsTrigger>
              <TabsTrigger value="notes" className="rounded-xl px-8 py-3 text-[10px] font-bold uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
                My Notes
              </TabsTrigger>
              <TabsTrigger value="community" className="rounded-xl px-8 py-3 text-[10px] font-bold uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
                Discuss
              </TabsTrigger>
              <TabsTrigger value="resources" className="rounded-xl px-8 py-3 text-[10px] font-bold uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
                 Resources
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-8">
              <Card className="soft-card p-8 border-none space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-bold text-text-main">Chapter Description</h3>
                  <p className="text-text-muted leading-relaxed">
                    In this lesson, we explore the fundamental definition of polynomials, including their classification by degree and terms. We will cover linear, quadratic, and cubic polynomials with practical exam-focused examples.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-widest">Learning Outcomes</h4>
                    <ul className="space-y-3">
                      {["Identify types of polynomials", "Calculate degree of terms", "Understand geometric representation"].map((outcome, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-medium text-text-main">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="mt-8">
               <Card className="soft-card p-8 border-none flex flex-col items-center justify-center text-center py-20 space-y-4">
                  <div className="w-16 h-16 bg-bg-soft rounded-2xl flex items-center justify-center border border-border-main">
                     <PenLine className="w-8 h-8 text-text-muted" />
                  </div>
                  <h3 className="text-lg font-bold text-text-main">No notes yet</h3>
                  <p className="text-text-muted text-sm max-w-xs">Take time-stamped notes while watching the video to review later.</p>
                  <Button className="bg-primary text-white font-bold rounded-xl h-11 px-6 shadow-ocean">
                     Start Writing
                  </Button>
               </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right: Chapter List */}
        <div className="lg:col-span-4 space-y-6">
           <Card className="soft-card p-6 border-none">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="font-display font-bold text-text-main">Chapter Roadmap</h3>
                 <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-2 py-1 bg-bg-soft rounded-md">8 Lessons</span>
              </div>

              <div className="space-y-6">
                 {chapters.map((chapter, i) => (
                    <div key={i} className="space-y-4">
                       <div className="flex items-center justify-between border-b border-border-soft pb-2">
                          <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{chapter.title}</span>
                          <ChevronDown className="w-4 h-4 text-text-muted" />
                       </div>
                       <div className="space-y-2">
                          {chapter.lessons.map((lesson) => (
                             <div 
                               key={lesson.id} 
                               className={cn(
                                 "flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer group",
                                 lesson.status === "current" 
                                   ? "bg-primary border-primary shadow-lg shadow-primary/10" 
                                   : "bg-white border-border-soft hover:bg-bg-soft hover:border-border-main"
                               )}
                             >
                                <div className={cn(
                                   "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                   lesson.status === "completed" ? "bg-emerald-50 text-emerald-500" :
                                   lesson.status === "current" ? "bg-white/20 text-white" : "bg-bg-soft text-text-muted"
                                )}>
                                   {lesson.status === "completed" ? <CheckCircle2 size={16} /> : 
                                    lesson.status === "locked" ? <Lock size={14} /> : 
                                    <Play size={16} fill={lesson.status === "current" ? "white" : "none"} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                   <div className={cn(
                                      "text-xs font-bold leading-tight mb-0.5 truncate",
                                      lesson.status === "current" ? "text-white" : "text-text-main"
                                   )}>
                                      {lesson.title}
                                   </div>
                                   <div className={cn(
                                      "text-[9px] font-bold uppercase tracking-widest flex items-center gap-1",
                                      lesson.status === "current" ? "text-white/60" : "text-text-muted"
                                   )}>
                                      <Clock size={10} /> {lesson.duration}
                                   </div>
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                 ))}
              </div>

              <div className="mt-10 pt-8 border-t border-border-soft space-y-3">
                 <Button variant="ghost" className="w-full justify-between h-12 bg-bg-soft text-text-main font-bold text-xs rounded-xl border border-border-soft hover:bg-white hover:border-primary transition-all px-4">
                    <div className="flex items-center gap-2">
                       <FileText size={18} className="text-primary" />
                       Formula Sheet.pdf
                    </div>
                    <ChevronRight size={16} className="text-text-muted" />
                 </Button>
                 <Button className="w-full h-12 bg-text-main text-white font-bold text-xs rounded-xl shadow-lg active:scale-95 transition-all">
                    Share Course
                 </Button>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
