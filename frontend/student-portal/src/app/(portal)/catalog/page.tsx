"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Star, 
  Users, 
  Clock, 
  ChevronRight, 
  ArrowRight,
  Sparkles,
  BookOpen,
  GraduationCap,
  Play
} from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";
import { Badge } from "@repo/ui/components/badge";
import { cn } from "@repo/ui/lib/utils";

const featuredCourses = [
  { id: 1, title: "Quantum Physics for Beginners", subject: "Physics", rating: 4.9, students: "2.4k", price: "Free", instructor: "Dr. Alan Grant" },
  { id: 2, title: "Advanced Calculus: Limits & Derivatives", subject: "Math", rating: 4.8, students: "1.8k", price: "Free", instructor: "Prof. Maria Rossi" },
  { id: 3, title: "Chemical Reactions & Equations", subject: "Chemistry", rating: 4.7, students: "3.1k", price: "Free", instructor: "Dr. Sarah Smith" },
];

const allCourses = [
  { id: 4, title: "Cell Structure & Functions", subject: "Biology", rating: 4.9, students: "1.2k", price: "Free", chapters: 12, duration: "8.5h" },
  { id: 5, title: "English Grammar: Tenses & Voice", subject: "English", rating: 4.6, students: "4.5k", price: "Free", chapters: 15, duration: "10h" },
  { id: 6, title: "French Revolution: Age of Enlightenment", subject: "Social", rating: 4.8, students: "900", price: "Free", chapters: 8, duration: "6h" },
  { id: 7, title: "Coordinate Geometry Masterclass", subject: "Math", rating: 4.7, students: "2.1k", price: "Free", chapters: 10, duration: "7.5h" },
];

export default function CourseCatalogPage() {
  return (
    <div className="space-y-12">
      
      {/* Hero Banner */}
      <section className="relative h-[300px] rounded-3xl overflow-hidden glass-panel border-none shadow-ocean">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-indigo-600 opacity-90" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2000')] bg-cover bg-center opacity-20" />
        <div className="relative h-full flex flex-col justify-center px-12 space-y-4 max-w-2xl">
          <Badge className="w-fit bg-white/20 text-white border-white/30 backdrop-blur-md font-bold uppercase tracking-widest text-[10px] py-1">
             <Sparkles className="w-3.5 h-3.5 mr-2" />
             Featured New Course
          </Badge>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">Master Organic Chemistry like a Pro.</h1>
          <p className="text-white/80 font-medium">Join 5,000+ students in this comprehensive guide to Grade 10 Chemistry.</p>
          <div className="pt-4">
            <Button className="h-12 px-8 bg-white text-primary font-bold rounded-xl hover:bg-slate-50 transition-all shadow-xl">
              Enroll Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search by subject, level or instructor..." 
            className="w-full h-14 bg-white border border-border-main rounded-2xl pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
          />
        </div>
        <Button variant="ghost" className="h-14 px-8 border border-border-main bg-white rounded-2xl font-bold text-text-muted hover:text-primary transition-all shadow-sm">
          <Filter className="mr-2 w-5 h-5" />
          Filters
        </Button>
      </section>

      {/* Featured Courses */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-2xl font-display font-bold text-text-main">Top Recommended</h2>
          <Button variant="ghost" className="text-primary font-bold flex items-center gap-1 group">
            View Roadmaps <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide -mx-2 px-2">
          {featuredCourses.map((course) => (
            <Card key={course.id} className="soft-card min-w-[320px] p-6 border-none group cursor-pointer">
              <div className="space-y-6">
                <div className="aspect-video bg-bg-soft rounded-2xl overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                   <div className="absolute top-4 left-4">
                      <span className="badge !bg-white/20 !text-white backdrop-blur-md border border-white/30 text-[10px]">
                        {course.subject}
                      </span>
                   </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-text-main line-clamp-2 leading-tight group-hover:text-primary transition-colors">{course.title}</h3>
                  <div className="flex items-center gap-4 text-xs font-bold text-text-muted">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {course.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {course.students}
                    </div>
                    <div className="ml-auto text-primary font-bold uppercase tracking-widest">{course.price}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* All Courses Grid */}
      <section className="space-y-8">
        <h2 className="text-2xl font-display font-bold text-text-main">Browse All Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allCourses.map((course, i) => (
            <Card key={i} className="soft-card p-4 border-none group cursor-pointer flex flex-col">
              <div className="aspect-[4/3] bg-bg-soft rounded-xl mb-4 overflow-hidden relative">
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                       <Play className="w-5 h-5 text-primary fill-primary/10" />
                    </div>
                 </div>
              </div>
              <div className="space-y-4 flex-1 flex flex-col">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-primary uppercase tracking-widest">{course.subject}</div>
                  <h3 className="text-sm font-bold text-text-main line-clamp-2 leading-snug group-hover:text-primary transition-colors">{course.title}</h3>
                </div>
                <div className="mt-auto space-y-3 pt-4 border-t border-border-soft">
                   <div className="flex items-center justify-between text-[10px] font-bold text-text-muted uppercase tracking-widest">
                      <div className="flex items-center gap-1">
                         <BookOpen className="w-3 h-3" />
                         {course.chapters} Chapters
                      </div>
                      <div className="flex items-center gap-1">
                         <Clock className="w-3 h-3" />
                         {course.duration}
                      </div>
                   </div>
                   <Button className="w-full h-10 rounded-xl bg-primary-light text-primary hover:bg-primary hover:text-white font-bold text-xs transition-all">
                      Browse Details
                   </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}


