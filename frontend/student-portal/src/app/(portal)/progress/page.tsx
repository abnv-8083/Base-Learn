"use client";

import { motion } from "framer-motion";
import { 
  Flame, 
  BarChart2, 
  PieChart, 
  Target, 
  Calendar, 
  Clock, 
  Zap, 
  Trophy,
  CheckCircle2,
  Lock,
  ArrowUpRight
} from "lucide-react";
import { Card } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";

const overallStats = [
  { label: "Classes Watched", value: "84", total: "120", icon: Zap, color: "text-blue-500" },
  { label: "Assignments", value: "18", total: "22", icon: CheckCircle2, color: "text-emerald-500" },
  { label: "Tests Taken", value: "14", total: "15", icon: Target, color: "text-indigo-500" },
  { label: "Avg Score", value: "84%", icon: BarChart2, color: "text-amber-500" },
];

const subjects_progress = [
  { name: "Mathematics", progress: 72, color: "bg-blue-500" },
  { name: "Physics", progress: 88, color: "bg-indigo-500" },
  { name: "Chemistry", progress: 65, color: "bg-purple-500" },
  { name: "Biology", progress: 90, color: "bg-emerald-500" },
  { name: "English", progress: 95, color: "bg-orange-500" },
];

export default function ProgressPage() {
  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="badge mb-4">
             <BarChart2 className="w-3.5 h-3.5 mr-2" />
             Analytics Dashboard
          </div>
          <h1 className="text-4xl font-display font-bold text-text-main tracking-tight">Learning <span className="text-gradient">Progress</span></h1>
          <p className="text-text-muted font-medium">Detailed breakdown of your academic journey.</p>
        </div>
        <div className="flex items-center gap-3 bg-white border border-border-main p-2 rounded-2xl shadow-sm">
          <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
             <Flame className="text-orange-500 w-6 h-6 fill-orange-500" />
          </div>
          <div className="pr-4">
             <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Mastery Streak</div>
             <div className="text-lg font-bold text-text-main">15 Days</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overallStats.map((stat, i) => (
          <Card key={i} className="soft-card p-6 border-none space-y-4">
            <div className="flex items-center justify-between">
              <div className={cn("w-12 h-12 bg-bg-soft rounded-xl flex items-center justify-center", stat.color)}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
                 <ArrowUpRight size={14} /> 5%
              </div>
            </div>
            <div>
               <div className="text-3xl font-display font-bold text-text-main flex items-baseline gap-1">
                 {stat.value}
                 {stat.total && <span className="text-sm font-bold text-text-muted">/{stat.total}</span>}
               </div>
               <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{stat.label}</div>
            </div>
          </Card>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Charts */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Subject Performance */}
          <Card className="soft-card p-8 border-none space-y-10">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-display font-bold text-text-main">Subject Performance Matrix</h3>
              <Button variant="ghost" size="sm" className="text-primary font-bold">Download Report</Button>
            </div>
            <div className="space-y-8">
               {subjects_progress.map((sub, i) => (
                 <div key={i} className="space-y-3">
                   <div className="flex justify-between items-center">
                     <span className="text-sm font-bold text-text-main">{sub.name}</span>
                     <span className="text-sm font-bold text-primary">{sub.progress}%</span>
                   </div>
                   <div className="h-2.5 w-full bg-bg-soft rounded-full overflow-hidden border border-border-soft">
                     <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${sub.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={cn("h-full shadow-sm", sub.color)} 
                     />
                   </div>
                 </div>
               ))}
            </div>
          </Card>

          {/* Time Heatmap */}
          <Card className="soft-card p-8 border-none space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-display font-bold text-text-main">Monthly Study Activity</h3>
              <div className="flex items-center gap-2 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                <Calendar size={14} className="text-primary" /> Last 30 Days
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {Array.from({ length: 90 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "w-4 h-4 md:w-5 md:h-5 rounded-[4px] border border-border-soft transition-all hover:ring-2 hover:ring-primary/20 cursor-help",
                      i % 7 === 0 ? "bg-primary" : i % 5 === 0 ? "bg-primary/60" : i % 3 === 0 ? "bg-primary/20" : "bg-bg-soft"
                    )} 
                    title={`${Math.floor(Math.random() * 8)} hours studied`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between text-[10px] text-text-muted font-bold uppercase tracking-widest pt-4 border-t border-border-soft">
                 <span>Less Active</span>
                 <div className="flex gap-2">
                    <div className="w-3 h-3 bg-bg-soft rounded-sm" />
                    <div className="w-3 h-3 bg-primary/20 rounded-sm" />
                    <div className="w-3 h-3 bg-primary/60 rounded-sm" />
                    <div className="w-3 h-3 bg-primary rounded-sm" />
                 </div>
                 <span>Masters</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Badges &Achievements */}
        <div className="space-y-10">
          
          <Card className="soft-card p-8 border-none space-y-8 bg-text-main text-white overflow-hidden relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px] -mr-16 -mt-16" />
             <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                   <Trophy className="text-amber-400 w-10 h-10" />
                </div>
                <div className="space-y-2">
                   <h3 className="text-2xl font-display font-bold">Unstoppable!</h3>
                   <p className="text-sm text-white/60">You're in the top 2% of learners worldwide this month. Keep the momentum going!</p>
                </div>
                <Button className="w-full h-12 bg-primary text-white font-bold rounded-xl shadow-ocean border-none">
                  Share Achievement
                </Button>
             </div>
          </Card>

          <Card className="soft-card p-8 border-none space-y-6">
             <h3 className="text-lg font-display font-bold text-text-main">Unlocked Badges</h3>
             <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Zap, label: "Fast Learner", color: "text-amber-500", active: true },
                  { icon: CheckCircle2, label: "Quiz Pro", color: "text-emerald-500", active: true },
                  { icon: Target, label: "Strategic", color: "text-indigo-500", active: true },
                  { icon: Flame, label: "Streak God", color: "text-orange-500", active: false },
                  { icon: Trophy, label: "Top Row", color: "text-blue-500", active: false },
                  { icon: Clock, label: "Early Bird", color: "text-purple-500", active: false },
                ].map((badge, i) => (
                   <div key={i} className={cn(
                     "aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 border border-border-soft transition-all",
                     badge.active ? "bg-white shadow-sm" : "bg-bg-soft opacity-40 grayscale"
                   )}>
                      <badge.icon className={cn("w-6 h-6", badge.active ? badge.color : "text-text-muted")} />
                      {badge.active ? <CheckCircle2 size={12} className="text-emerald-500" /> : <Lock size={12} />}
                   </div>
                ))}
             </div>
             <Button variant="ghost" className="w-full text-xs font-bold text-primary uppercase tracking-widest bg-primary-light h-10 rounded-xl">
               View All 24 Badges
             </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
