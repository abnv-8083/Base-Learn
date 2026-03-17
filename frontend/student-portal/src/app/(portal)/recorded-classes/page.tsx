"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  Play, 
  Clock, 
  LayoutGrid, 
  List, 
  ChevronRight, 
  Bookmark,
  Star,
  Users,
  SearchCode
} from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";
import { cn } from "@repo/ui/lib/utils";

const classes = [
  { id: 1, title: "Triangles & Congruence — Part 2", subject: "Math", instructor: "Prof. Maria", date: "Mar 15, 2026", duration: "42 min", progress: 35, views: "1.2k", rating: 4.8 },
  { id: 2, title: "Newton's Third Law Explained", subject: "Physics", instructor: "Dr. Alan", date: "Mar 14, 2026", duration: "38 min", progress: 100, views: "850", rating: 4.9 },
  { id: 3, title: "Atmosphere & Climate Change", subject: "Social", instructor: "Prof. Elena", date: "Mar 12, 2026", duration: "55 min", progress: 0, views: "2.1k", rating: 4.7 },
  { id: 4, title: "Introduction to Redox Reactions", subject: "Chemistry", instructor: "Dr. Sarah", date: "Mar 10, 2026", duration: "48 min", progress: 15, views: "1.5k", rating: 4.8 },
];

const subjects = [
  { name: "Math", count: 24 },
  { name: "Physics", count: 18 },
  { name: "Chemistry", count: 15 },
  { name: "Biology", count: 20 },
  { name: "English", count: 12 },
  { name: "Social Studies", count: 22 },
];

export default function RecordedClassesPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedSubject, setSelectedSubject] = useState<string>("All");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
      
      {/* Sidebar Quick Filter */}
      <aside className="lg:col-span-1 space-y-8 sticky top-24">
        <section className="space-y-6">
          <h3 className="text-xl font-display font-bold text-text-main">Quick Browse</h3>
          <div className="space-y-2">
            <button 
              onClick={() => setSelectedSubject("All")}
              className={cn(
                "w-full flex items-center justify-between p-3.5 rounded-xl font-bold text-sm transition-all text-left",
                selectedSubject === "All" ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white text-text-muted hover:bg-primary-light hover:text-primary border border-border-soft"
              )}
            >
              All Library
              <ChevronRight size={16} />
            </button>
            {subjects.map((s) => (
              <button 
                key={s.name}
                onClick={() => setSelectedSubject(s.name)}
                className={cn(
                  "w-full flex items-center justify-between p-3.5 rounded-xl font-bold text-sm transition-all text-left",
                  selectedSubject === s.name ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white text-text-muted hover:bg-primary-light hover:text-primary border border-border-soft"
                )}
              >
                {s.name}
                <span className={cn("text-[10px] px-2 py-0.5 rounded-md", selectedSubject === s.name ? "bg-white/20 text-white" : "bg-bg-soft text-text-muted")}>
                  {s.count}
                </span>
              </button>
            ))}
          </div>
        </section>
      </aside>

      {/* Main Content Area */}
      <div className="lg:col-span-3 space-y-10">
        
        {/* Header & Controls */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-4xl font-display font-bold text-text-main tracking-tight">Recorded <span className="text-gradient">Library</span></h1>
              <p className="text-text-muted font-medium">Access over 500+ hours of high-quality learning.</p>
            </div>
            <div className="flex items-center gap-2 p-1.5 bg-white border border-border-main rounded-xl shadow-sm">
               <button 
                 onClick={() => setView("grid")}
                 className={cn("p-2 rounded-lg transition-all", view === "grid" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-text-muted hover:bg-bg-soft")}
               >
                 <LayoutGrid size={18} />
               </button>
               <button 
                 onClick={() => setView("list")}
                 className={cn("p-2 rounded-lg transition-all", view === "list" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-text-muted hover:bg-bg-soft")}
               >
                 <List size={18} />
               </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search topics, chapters or keywords..." 
                className="w-full h-12 bg-white border border-border-main rounded-xl pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-primary/10 transition-all shadow-sm"
              />
            </div>
            <Button variant="ghost" className="h-12 px-6 rounded-xl border border-border-soft bg-white text-text-muted font-bold text-xs uppercase tracking-widest hover:text-primary transition-all shadow-sm">
               Sort by Newest
            </Button>
          </div>
        </section>

        {/* Class Cards */}
        <AnimatePresence mode="popLayout">
          <motion.div 
            layout
            className={cn(
              "gap-8",
              view === "grid" ? "grid grid-cols-1 md:grid-cols-2" : "flex flex-col"
            )}
          >
            {classes.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card className={cn(
                  "soft-card border-none group transition-all",
                  view === "list" ? "flex flex-row overflow-hidden" : "p-2 flex flex-col"
                )}>
                  <div className={cn(
                    "relative bg-bg-soft overflow-hidden shrink-0",
                    view === "list" ? "w-[240px]" : "aspect-video rounded-xl"
                  )}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
                        <Play size={20} className="text-primary fill-primary/10 ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 z-20">
                       <span className="bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-md">
                          {item.duration}
                       </span>
                    </div>
                    <div className="absolute top-3 left-3 z-20">
                       <span className="badge !bg-white/20 !text-white border-white/30 backdrop-blur-md text-[9px] font-bold uppercase tracking-widest">
                          {item.subject}
                       </span>
                    </div>
                  </div>

                  <div className={cn(
                    "flex-1 flex flex-col",
                    view === "list" ? "p-6" : "p-5"
                  )}>
                    <div className="flex items-start justify-between gap-4 mb-4">
                       <h3 className={cn(
                         "font-bold text-text-main line-clamp-2 leading-tight group-hover:text-primary transition-colors",
                         view === "list" ? "text-xl" : "text-lg"
                       )}>
                         {item.title}
                       </h3>
                       <button className="text-text-muted hover:text-primary transition-colors shrink-0">
                          <Bookmark size={20} />
                       </button>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                       <div className="text-xs font-bold text-text-muted">{item.instructor}</div>
                       <div className="w-1 h-1 rounded-full bg-border-main" />
                       <div className="text-xs text-text-muted">{item.date}</div>
                    </div>

                    <div className="mt-auto space-y-4">
                       <div className="flex items-center justify-between text-[10px] font-bold text-text-muted uppercase tracking-widest">
                          <div className="flex items-center gap-4">
                             <div className="flex items-center gap-1">
                               <Users size={12} /> {item.views}
                             </div>
                             <div className="flex items-center gap-1">
                               <Star size={12} className="fill-amber-500 text-amber-500" /> {item.rating}
                             </div>
                          </div>
                          {item.progress > 0 && <span className="text-primary">Watched {item.progress}%</span>}
                       </div>
                       {item.progress > 0 && (
                          <div className="h-1 w-full bg-bg-soft rounded-full overflow-hidden border border-border-soft">
                             <div className="h-full bg-primary" style={{ width: `${item.progress}%` }} />
                          </div>
                       )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
