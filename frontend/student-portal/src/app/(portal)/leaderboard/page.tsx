"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Flame, 
  Star, 
  ChevronUp, 
  ChevronDown, 
  Search,
  Globe,
  School,
  Users,
  Medal,
  Award
} from "lucide-react";
import { Card } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";

const scopes = [
  { id: "class", label: "Class", icon: Users },
  { id: "school", label: "School", icon: School },
  { id: "platform", label: "Global", icon: Globe },
];

const periods = ["This Week", "This Month", "All Time"];

const rankings = [
  { rank: 4, name: "Arjun Mehta", xp: "12,450", streak: 15, grade: "10th", avatar: "AM", isUser: true },
  { rank: 5, name: "Sara Khan", xp: "11,200", streak: 12, grade: "10th", avatar: "SK" },
  { rank: 6, name: "David Chen", xp: "10,850", streak: 8, grade: "9th", avatar: "DC" },
  { rank: 7, name: "Elena Rossi", xp: "9,900", streak: 20, grade: "10th", avatar: "ER" },
  { rank: 8, name: "Liam Wilson", xp: "9,450", streak: 5, grade: "8th", avatar: "LW" },
];

const podium = [
  { rank: 2, name: "Priya Das", xp: "15,200", avatar: "PD", color: "text-slate-400", bg: "bg-slate-100", height: "h-48" },
  { rank: 1, name: "Rahul Singh", xp: "18,400", avatar: "RS", color: "text-amber-500", bg: "bg-amber-50", height: "h-64" },
  { rank: 3, name: "James Bond", xp: "14,800", avatar: "JB", color: "text-orange-500", bg: "bg-orange-50", height: "h-40" },
];

export default function LeaderboardPage() {
  const [activeScope, setActiveScope] = useState("platform");
  const [activePeriod, setActivePeriod] = useState("This Month");

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="badge mx-auto">
           <Trophy className="w-3.5 h-3.5 mr-2" />
           Hall of Fame
        </div>
        <h1 className="text-display md:text-6xl text-text-main">Global <span className="text-gradient">Rankings</span></h1>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
           <div className="flex items-center gap-1.5 p-1.5 bg-white border border-border-main rounded-2xl shadow-sm">
              {scopes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveScope(s.id)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                    activeScope === s.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-text-muted hover:text-primary hover:bg-primary-light"
                  )}
                >
                  <s.icon size={14} />
                  {s.label}
                </button>
              ))}
           </div>
           <div className="flex items-center gap-1.5 p-1.5 bg-white border border-border-main rounded-2xl shadow-sm">
              {periods.map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePeriod(p)}
                  className={cn(
                    "px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                    activePeriod === p ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-text-muted hover:text-primary hover:bg-primary-light"
                  )}
                >
                  {p}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-4 md:gap-12 pt-20">
        {podium.map((p, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="flex flex-col items-center gap-6 group"
          >
            <div className="relative">
              <div className={cn("w-20 h-20 md:w-32 md:h-32 rounded-full flex items-center justify-center text-3xl md:text-5xl font-display font-bold border-[6px] border-white shadow-2xl relative z-10", p.bg, p.color)}>
                 {p.avatar}
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl z-20">
                 {p.rank === 1 ? <Trophy className="text-amber-500 fill-amber-500" /> : p.rank === 2 ? <Medal className="text-slate-400 fill-slate-400" /> : <Award className="text-orange-500 fill-orange-500" />}
              </div>
            </div>
            
            <div className="text-center space-y-1">
               <div className="font-bold text-text-main text-lg">{p.name}</div>
               <div className="text-sm font-bold text-primary">{p.xp} XP</div>
            </div>

            <div className={cn("w-24 md:w-40 bg-white border border-border-soft rounded-t-3xl shadow-ocean group-hover:scale-105 transition-transform origin-bottom", p.height)}>
               <div className="flex items-center justify-center h-full text-6xl font-display font-bold opacity-5 text-text-main">
                  {p.rank}
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full Rankings */}
      <Card className="soft-card p-2 border-none overflow-hidden">
         <div className="bg-bg-soft/50 p-4 border-b border-border-soft grid grid-cols-12 gap-4 text-[10px] uppercase font-bold text-text-muted tracking-widest">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-5">Learner</div>
            <div className="col-span-2 text-center">Grade</div>
            <div className="col-span-2 text-center">Streak</div>
            <div className="col-span-2 text-right px-4">XP Points</div>
         </div>
         <div className="divide-y divide-border-soft">
            {rankings.map((user, i) => (
               <div key={i} className={cn(
                 "grid grid-cols-12 gap-4 p-5 items-center transition-all",
                 user.isUser ? "bg-primary-light/40 ring-1 ring-inset ring-primary/10" : "hover:bg-bg-soft"
               )}>
                  <div className="col-span-1 text-center font-display font-bold text-lg text-text-muted">#{user.rank}</div>
                  <div className="col-span-5 flex items-center gap-4">
                     <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm", user.isUser ? "bg-primary text-white" : "bg-white border border-border-soft text-text-muted")}>
                        {user.avatar}
                     </div>
                     <div className="font-bold text-text-main">
                        {user.name}
                        {user.isUser && <span className="ml-2 badge !py-0.5 !px-2 bg-primary text-white text-[8px] uppercase">You</span>}
                     </div>
                  </div>
                  <div className="col-span-2 text-center text-sm font-medium text-text-muted">{user.grade}</div>
                  <div className="col-span-2 text-center flex items-center justify-center gap-1.5 font-bold text-orange-500">
                     <Flame size={14} className="fill-orange-500" />
                     {user.streak}
                  </div>
                  <div className="col-span-2 text-right px-4 font-display font-bold text-text-main text-lg">{user.xp}</div>
               </div>
            ))}
         </div>
      </Card>

      {/* Floating Action */}
      <div className="flex justify-center">
         <Button className="h-14 px-10 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">
            Scroll to My Position
         </Button>
      </div>
    </div>
  );
}
