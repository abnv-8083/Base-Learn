"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  ChevronRight,
  ClipboardList
} from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";
import { cn } from "@repo/ui/lib/utils";

const tabs = ["Pending", "Submitted", "Graded", "Overdue"];

const assignments = [
  { id: 1, title: "Algebraic Identities & Practice", subject: "Math", status: "Pending", due: "In 2 days", type: "File Upload", instructor: "Dr. Sarah Smith", color: "bg-blue-500" },
  { id: 2, title: "History of the French Revolution", subject: "Social", status: "Submitted", due: "Yesterday", type: "Text", instructor: "Prof. Maria", color: "bg-teal-500" },
  { id: 3, title: "Cell Structure Labeling", subject: "Biology", status: "Graded", due: "4 days ago", score: "18/20", instructor: "Dr. Alan", color: "bg-emerald-500" },
  { id: 4, title: "English Essay: Save the Planet", subject: "English", status: "Overdue", due: "3 days ago", type: "Text", instructor: "Prof. Elena", color: "bg-orange-500" },
];

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState("Pending");

  const filtered = assignments.filter(a => a.status === activeTab);

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="badge mb-4">
             <ClipboardList className="w-3.5 h-3.5 mr-2" />
             Work Tracker
          </div>
          <h1 className="text-4xl font-display font-bold text-text-main tracking-tight">Active <span className="text-gradient">Assignments</span></h1>
          <p className="text-text-muted font-medium">Keep track of your submissions and feedback.</p>
        </div>
        <Button className="h-12 px-6 rounded-xl bg-primary text-white font-bold shadow-ocean hover:scale-105 active:scale-95 transition-all">
           New Submission
        </Button>
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card className="soft-card group p-0 relative overflow-hidden border-none cursor-pointer hover:shadow-2xl transition-all">
                  <div className={cn("h-1.5 w-full", item.color)} />
                  <div className="p-8 space-y-6">
                    <div className="flex items-start justify-between">
                       <span className="badge !bg-primary-light !text-primary border-primary/10 text-[10px] font-bold uppercase tracking-widest">
                          {item.subject}
                       </span>
                       <button className="text-text-muted hover:text-primary transition-colors">
                          <MoreVertical size={20} />
                       </button>
                    </div>

                    <div>
                       <h3 className="text-xl font-bold text-text-main leading-tight group-hover:text-primary transition-colors mb-2">{item.title}</h3>
                       <div className="text-sm font-bold text-text-muted opacity-80">By {item.instructor}</div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-border-soft">
                       <div className="flex items-center justify-between text-xs font-bold">
                          <div className="flex items-center gap-2 text-text-muted">
                             <Calendar size={14} className="text-primary" />
                             Due {item.due}
                          </div>
                          {item.status === 'Overdue' ? (
                             <span className="text-red-500 flex items-center gap-1 uppercase tracking-widest text-[10px]">
                                <AlertCircle size={12} /> Overdue
                             </span>
                          ) : item.status === 'Graded' ? (
                             <span className="text-emerald-500 font-bold uppercase tracking-widest text-[10px]">
                                Result: {item.score}
                             </span>
                          ) : (
                             <span className="text-amber-500 font-bold uppercase tracking-widest text-[10px]">
                                Pending
                             </span>
                          )}
                       </div>
                       
                       <Button className={cn(
                         "w-full h-12 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-md active:scale-95",
                         item.status === 'Submitted' ? "bg-bg-soft text-text-muted cursor-default shadow-none" : "bg-primary text-white shadow-ocean hover:bg-primary-dark"
                       )}>
                         {item.status === 'Pending' || item.status === 'Overdue' ? 'Submit Now' : item.status === 'Graded' ? 'View Feedback' : 'Submission Sent'}
                       </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-24 flex flex-col items-center justify-center text-center">
               <div className="w-20 h-20 rounded-[2rem] bg-white border border-border-soft flex items-center justify-center mb-6 shadow-sm">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500/30" />
               </div>
               <h3 className="text-xl font-bold text-text-main mb-1">All caught up!</h3>
               <p className="text-text-muted font-medium">No {activeTab.toLowerCase()} assignments found.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
