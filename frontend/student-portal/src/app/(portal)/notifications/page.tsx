"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  CheckCircle2, 
  Target, 
  Trophy, 
  AlertCircle, 
  ChevronRight, 
  MoreVertical,
  Check,
  Settings,
  MailOpen,
  Trash2
} from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";
import { cn } from "@repo/ui/lib/utils";

const notifications = [
  { id: 1, title: "New Assignment Posted", body: "Dr. Sarah Smith uploaded 'Algebraic Identities Practice' due in 3 days.", type: "academic", time: "10 mins ago", read: false, icon: Target, color: "text-blue-500", bg: "bg-blue-50" },
  { id: 2, title: "Leaderboard Update", body: "Congratulations! You've climbed 2 ranks in Grade 10 Mathematics.", type: "social", time: "2 hours ago", read: false, icon: Trophy, color: "text-amber-500", bg: "bg-amber-50" },
  { id: 3, title: "System Maintenance", body: "Base Learn will be down for scheduled maintenance tonight at 12 AM.", type: "system", time: "5 hours ago", read: true, icon: AlertCircle, color: "text-red-500", bg: "bg-red-50" },
  { id: 4, title: "Class Completed", body: "You finished 'Laws of Motion - Part 1'. View your summary notes.", type: "academic", time: "Yesterday", read: true, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
];

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="badge mb-4">
             <Bell className="w-3.5 h-3.5 mr-2" />
             Inbox
          </div>
          <h1 className="text-4xl font-display font-bold text-text-main tracking-tight">Recent <span className="text-gradient">Notifications</span></h1>
          <p className="text-text-muted font-medium">Clear your headspace and stay updated.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="h-11 px-4 text-text-muted hover:text-primary transition-all font-bold text-xs uppercase tracking-widest flex items-center gap-2">
             <Check size={16} /> Mark all as read
          </Button>
          <Button variant="ghost" className="h-11 w-11 p-0 rounded-xl border border-border-main bg-white text-text-muted hover:text-primary shadow-sm flex items-center justify-center">
             <Settings size={20} />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 p-1.5 bg-white border border-border-main rounded-2xl w-fit shadow-sm overflow-x-auto">
        {["All", "Academic", "Social", "System"].map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={cn(
              "px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap",
              activeFilter === f ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-text-muted hover:text-primary hover:bg-primary-light"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-px bg-white border border-border-main rounded-3xl overflow-hidden shadow-sm">
         <AnimatePresence mode="popLayout">
            {notifications.map((n, i) => (
               <motion.div
                  key={n.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "group p-6 flex flex-col md:flex-row items-start gap-6 border-b border-border-soft last:border-none transition-all cursor-pointer",
                    n.read ? "bg-transparent" : "bg-primary-light/30"
                  )}
               >
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-white", n.bg, n.color)}>
                     <n.icon size={22} />
                  </div>
                  
                  <div className="flex-1 space-y-1">
                     <div className="flex items-center justify-between gap-4">
                        <h3 className={cn("text-base font-bold text-text-main leading-tight", !n.read && "font-black")}>
                           {n.title}
                           {!n.read && <span className="ml-3 inline-block w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />}
                        </h3>
                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{n.time}</span>
                     </div>
                     <p className="text-sm font-medium text-text-muted leading-relaxed opacity-80 max-w-2xl">{n.body}</p>
                     
                     <div className="pt-4 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1.5 hover:underline">
                           View Details <ChevronRight size={12} />
                        </button>
                        <div className="h-3 w-px bg-border-main" />
                        <button className="text-[10px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-1.5 hover:text-rose-500">
                           <Trash2 size={12} /> Delete
                        </button>
                     </div>
                  </div>

                  <button className="text-text-muted hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                     <MoreVertical size={20} />
                  </button>
               </motion.div>
            ))}
         </AnimatePresence>
      </div>

      <div className="flex justify-center pt-6">
         <Button variant="ghost" className="text-text-muted font-bold flex items-center gap-2">
            View Older Notifications <MailOpen size={16} />
         </Button>
      </div>
    </div>
  );
}
