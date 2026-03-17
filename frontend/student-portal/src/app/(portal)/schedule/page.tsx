"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Play,
  Zap,
  Target
} from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";
import { cn } from "@repo/ui/lib/utils";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM"];

const events = [
  { day: "Tue", time: "09:00 AM", title: "Maths: Polynomials", type: "Live Class", instructor: "Dr. Sarah", color: "bg-blue-500" },
  { day: "Tue", time: "11:00 AM", title: "Physics: Laws of Motion", type: "Recorded", instructor: "Prof. James", color: "bg-indigo-500" },
  { day: "Wed", time: "10:00 AM", title: "Monthly Mock Test", type: "Test", instructor: "System", color: "bg-rose-500" },
  { day: "Thu", time: "09:00 AM", title: "Chemistry Lab", type: "Live Class", instructor: "Dr. Elena", color: "bg-purple-500" },
];

export default function SchedulePage() {
  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="badge mb-4">
             <CalendarIcon className="w-3.5 h-3.5 mr-2" />
             Weekly Planner
          </div>
          <h1 className="text-4xl font-display font-bold text-text-main tracking-tight">Your <span className="text-gradient">Schedule</span></h1>
          <p className="text-text-muted font-medium">Synced with your school and board exam dates.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex items-center gap-1.5 p-1.5 bg-white border border-border-main rounded-xl shadow-sm">
              <button className="p-2 rounded-lg text-text-muted hover:bg-bg-soft"><ChevronLeft size={18} /></button>
              <span className="px-4 text-xs font-bold uppercase tracking-widest text-text-main">March 16 - 22, 2026</span>
              <button className="p-2 rounded-lg text-text-muted hover:bg-bg-soft"><ChevronRight size={18} /></button>
           </div>
           <Button className="h-12 px-6 rounded-xl bg-primary text-white font-bold shadow-ocean">
              Sync Calendar
           </Button>
        </div>
      </div>

      {/* Schedule Table */}
      <Card className="soft-card p-0 border-none overflow-hidden overflow-x-auto">
         <div className="min-w-[800px]">
            <div className="grid grid-cols-8 border-b border-border-soft bg-bg-soft/50">
               <div className="p-6 border-r border-border-soft" />
               {days.map((day) => (
                  <div key={day} className="p-6 text-center border-r border-border-soft last:border-none">
                     <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">{day}</div>
                     <div className={cn("text-lg font-display font-bold", day === "Tue" ? "text-primary scale-110" : "text-text-main")}>
                        {day === "Mon" ? "16" : day === "Tue" ? "17" : day === "Wed" ? "18" : day === "Thu" ? "19" : day === "Fri" ? "20" : day === "Sat" ? "21" : "22"}
                     </div>
                  </div>
               ))}
            </div>

            <div className="divide-y divide-border-soft">
               {timeSlots.map((time) => (
                  <div key={time} className="grid grid-cols-8 h-32">
                     <div className="p-4 text-right border-r border-border-soft flex items-start justify-end">
                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{time}</span>
                     </div>
                     {days.map((day) => {
                        const event = events.find(e => e.day === day && e.time === time);
                        return (
                           <div key={day} className="p-2 border-r border-border-soft last:border-none relative group">
                              {event && (
                                 <motion.div 
                                   initial={{ opacity: 0, scale: 0.9 }}
                                   animate={{ opacity: 1, scale: 1 }}
                                   className={cn(
                                     "h-full rounded-xl p-3 space-y-2 cursor-pointer transition-all hover:shadow-xl relative overflow-hidden",
                                     event.color, "bg-opacity-10 border border-opacity-20",
                                     event.color.replace('bg-', 'border-')
                                   )}
                                 >
                                    <div className="flex items-center justify-between">
                                       <span className={cn("text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md bg-white", event.color)}>{event.type}</span>
                                       {event.type === 'Live Class' ? <Play size={12} className={event.color} /> : event.type === 'Test' ? <Target size={12} className={event.color} /> : <Zap size={12} className={event.color} />}
                                    </div>
                                    <div className={cn("text-xs font-bold leading-tight line-clamp-2", event.color.replace('bg-', 'text-'))}>{event.title}</div>
                                    <div className="flex items-center gap-1.5 pt-1">
                                       <div className="w-5 h-5 rounded-md bg-white flex items-center justify-center text-[8px] font-bold">SS</div>
                                       <span className="text-[9px] font-medium text-text-muted opacity-80">{event.instructor}</span>
                                    </div>
                                 </motion.div>
                              )}
                              {!event && <div className="absolute inset-0 group-hover:bg-primary/5 transition-colors cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100"><Plus size={20} className="text-primary/20" /></div>}
                           </div>
                        );
                     })}
                  </div>
               ))}
            </div>
         </div>
      </Card>
    </div>
  );
}
