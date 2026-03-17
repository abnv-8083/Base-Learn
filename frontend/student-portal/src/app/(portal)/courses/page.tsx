"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  PlayCircle, 
  Clock, 
  BookOpen,
  MoreVertical,
  Bookmark,
  ChevronRight,
  GraduationCap
} from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";
import { cn } from "@repo/ui/lib/utils";

const categories = ["All", "Enrolled", "Completed", "Bookmarked"];
const subjects = ["Math", "Physics", "Chemistry", "Biology", "English", "Social"];

const courses = [
  {
    id: 1,
    title: "Mathematics — Chapter 5: Polynomials",
    subject: "Math",
    instructor: "Dr. Sarah Smith",
    progress: 58,
    chapters: "7 of 12",
    lastAccessed: "2 days ago",
    status: "Enrolled",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Physics — Chapter 3: Laws of Motion",
    subject: "Physics",
    instructor: "Prof. James Wilson",
    progress: 100,
    chapters: "10 of 10",
    lastAccessed: "1 week ago",
    status: "Completed",
    color: "bg-indigo-600",
  },
  {
    id: 3,
    title: "Chemistry — Chapter 2: Periodic Table",
    subject: "Chemistry",
    instructor: "Dr. Elena Rossi",
    progress: 25,
    chapters: "3 of 12",
    lastAccessed: "5 hours ago",
    status: "Enrolled",
    color: "bg-purple-500",
  },
];

export default function MyCoursesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === "All" || course.status === activeCategory;
    const matchesSubject = !selectedSubject || course.subject === selectedSubject;
    return matchesCategory && matchesSubject;
  });

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <div className="badge mb-4">
             <GraduationCap className="w-3.5 h-3.5 mr-2" />
             My Learning Roadmap
          </div>
          <h1 className="text-4xl font-display font-bold text-text-main mb-1">My <span className="text-gradient">Courses</span></h1>
          <p className="text-text-muted font-medium">You have 3 active courses in progress.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block w-72">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
             <input 
               type="text" 
               placeholder="Search my courses..." 
               className="w-full h-11 bg-white border border-border-main rounded-btn pl-12 pr-4 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-medium shadow-sm"
             />
          </div>
          <Button variant="ghost" className="h-11 px-6 rounded-btn border border-border-main bg-white text-text-muted font-bold text-xs uppercase tracking-widest hover:bg-primary-light hover:text-primary transition-all shadow-sm">
             <Filter className="w-3.5 h-3.5 mr-2" />
             Filters
          </Button>
        </div>
      </div>

      {/* Categories & Subjects */}
      <div className="space-y-6">
        <div className="flex items-center gap-1.5 p-1.5 bg-white border border-border-main rounded-xl w-fit shadow-sm">
           {categories.map((cat) => (
             <button
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={cn(
                 "px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300",
                 activeCategory === cat ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-text-muted hover:text-primary hover:bg-primary-light"
               )}
             >
               {cat}
             </button>
           ))}
        </div>

        <div className="flex flex-wrap gap-2">
           {subjects.map((sub) => (
             <button
               key={sub}
               onClick={() => setSelectedSubject(selectedSubject === sub ? null : sub)}
               className={cn(
                 "px-5 py-2.5 rounded-btn border text-[10px] font-bold uppercase tracking-widest transition-all",
                 selectedSubject === sub 
                   ? "bg-primary border-primary text-white shadow-md shadow-primary/10" 
                   : "bg-white border-border-main text-text-muted hover:border-primary/20 hover:text-primary shadow-sm"
               )}
             >
               {sub}
             </button>
           ))}
        </div>
      </div>

      {/* Course Grid */}
      <AnimatePresence mode="popLayout">
        {filteredCourses.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredCourses.map((course) => (
              <motion.div
                layout
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card className="soft-card group p-2 relative overflow-hidden flex flex-col border-none">
                  <div className="relative aspect-[16/10] rounded-xl bg-bg-soft overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
                          <PlayCircle className="w-10 h-10 text-primary fill-primary/10" />
                        </div>
                     </div>
                     <div className="absolute top-4 left-4 z-20 flex gap-2">
                        <span className="badge !bg-white/20 !text-white backdrop-blur-md border border-white/30 text-[10px]">
                           {course.subject}
                        </span>
                        {course.status === "Completed" && (
                           <span className="badge !bg-emerald-500 !text-white border-none shadow-lg shadow-emerald-500/20 text-[10px]">
                              Completed
                           </span>
                        )}
                     </div>
                     <button className="absolute top-4 right-4 z-20 p-2.5 rounded-xl bg-white/20 text-white hover:bg-white hover:text-primary transition-all backdrop-blur-md border border-white/20">
                        <Bookmark className="w-4 h-4" />
                     </button>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                     <div className="flex items-start justify-between gap-4 mb-6">
                        <h3 className="text-xl font-bold text-text-main line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                           {course.title}
                        </h3>
                        <button className="text-text-muted hover:text-primary transition-colors shrink-0">
                           <MoreVertical className="w-5 h-5" />
                        </button>
                     </div>

                     <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-xs font-bold text-primary border border-primary/10">
                           {course.instructor.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                           <div className="text-sm font-bold text-text-main leading-none mb-1">{course.instructor}</div>
                           <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-none">Instructor</div>
                        </div>
                     </div>

                     <div className="mt-auto space-y-6">
                        <div className="space-y-3">
                           <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                              <span className="text-text-muted">Progress: {course.chapters}</span>
                              <span className="text-primary">{course.progress}%</span>
                           </div>
                           <div className="h-2 w-full bg-bg-soft border border-border-soft rounded-full overflow-hidden">
                              <div className={cn("h-full", course.color)} style={{ width: `${course.progress}%` }} />
                           </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-border-soft">
                           <div className="flex items-center gap-2 text-text-muted">
                              <Clock className="w-4 h-4" />
                              <span className="text-[10px] font-bold uppercase tracking-widest leading-none">{course.lastAccessed}</span>
                           </div>
                           <Button size="sm" className={cn(
                              "rounded-btn font-bold text-[10px] uppercase tracking-widest h-10 px-6 transition-all active:scale-95 shadow-lg",
                              course.status === "Completed" ? "bg-bg-soft text-text-muted hover:bg-border-soft" : "bg-primary text-white shadow-ocean"
                           )}>
                              {course.status === "Completed" ? "Review" : "Continue"}
                           </Button>
                        </div>
                     </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-24 flex flex-col items-center justify-center text-center"
          >
            <div className="w-24 h-24 rounded-[2rem] bg-white border border-border-soft flex items-center justify-center mb-8 shadow-sm">
               <BookOpen className="w-10 h-10 text-text-muted" />
            </div>
            <h3 className="text-2xl font-bold text-text-main mb-2 tracking-tight">No courses found</h3>
            <p className="text-text-muted font-medium max-w-xs mx-auto">Try adjusting your filters or browse our catalog for new subjects.</p>
            <Button className="mt-10 rounded-btn bg-primary text-white font-bold h-14 px-10 shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                Explore Full Catalog
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
