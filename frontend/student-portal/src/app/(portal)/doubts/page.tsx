"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Search, 
  Filter, 
  ThumbsUp, 
  Share2, 
  Image as ImageIcon,
  CheckCircle2,
  ChevronRight,
  Plus,
  MessageCircle,
  Clock
} from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";
import { Badge } from "@repo/ui/components/badge";
import { cn } from "@repo/ui/lib/utils";

const threads = [
  { id: 1, author: "Rahul Singh", grade: "10th", subject: "Physics", topic: "Laws of Motion", title: "Difficulty in understanding the conservation of momentum in elastic collisions. Can anyone explain with an example?", upvotes: 12, replies: 5, resolved: true, time: "1h ago" },
  { id: 2, author: "Priya Das", grade: "9th", subject: "Math", topic: "Polynomials", title: "What is the difference between factor theorem and remainder theorem? When to use which?", upvotes: 8, replies: 3, resolved: false, time: "3h ago" },
  { id: 3, author: "Sara Khan", grade: "10th", subject: "Chemistry", topic: "Organic Compounds", title: "How to remember the functional groups in sequence for IUPAC naming?", upvotes: 24, replies: 12, resolved: true, time: "Yseterday" },
];

export default function DoubtsPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="badge mb-4">
             <MessageCircle className="w-3.5 h-3.5 mr-2" />
             Community Q&A
          </div>
          <h1 className="text-4xl font-display font-bold text-text-main tracking-tight">Doubt <span className="text-gradient">Forum</span></h1>
          <p className="text-text-muted font-medium">Get answers from subjects experts and top learners.</p>
        </div>
        <Button className="h-14 px-8 rounded-2xl bg-primary text-white font-bold shadow-ocean hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
           <Plus size={20} />
           Ask a Doubt
        </Button>
      </div>

      {/* Search & Tabs */}
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search for questions or topics..." 
            className="w-full h-16 bg-white border border-border-main rounded-2xl pl-16 pr-6 text-sm font-medium focus:ring-4 focus:ring-primary/5 transition-all shadow-sm"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1.5 bg-white border border-border-main rounded-2xl w-fit shadow-sm">
           {["All", "Unanswered", "Resolved", "My Doubts"].map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={cn(
                 "px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                 activeTab === tab ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-text-muted hover:text-primary hover:bg-primary-light"
               )}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      {/* Threads List */}
      <div className="space-y-6">
        {threads.map((thread, i) => (
          <motion.div
            key={thread.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="soft-card p-0 border-none group cursor-pointer hover:shadow-2xl transition-all relative overflow-hidden">
              <div className="p-8 space-y-6">
                 <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-bg-soft flex items-center justify-center font-bold text-sm text-text-muted border border-border-soft">
                          {thread.author.split(' ').map(n => n[0]).join('')}
                       </div>
                       <div>
                          <div className="text-sm font-bold text-text-main flex items-center gap-2">
                             {thread.author}
                             <span className="text-[10px] bg-primary-light text-primary px-2 py-0.5 rounded-md uppercase">Grade {thread.grade}</span>
                          </div>
                          <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-0.5">{thread.time}</div>
                       </div>
                    </div>
                    {thread.resolved && (
                       <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 flex items-center gap-1.5 font-bold uppercase tracking-widest text-[10px] px-3 py-1.5 rounded-lg">
                          <CheckCircle2 size={12} /> Resolved
                       </Badge>
                    )}
                 </div>

                 <div className="space-y-3">
                    <div className="flex gap-2">
                       <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary-light px-2 py-1 rounded-md">{thread.subject}</span>
                       <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest bg-bg-soft px-2 py-1 rounded-md">{thread.topic}</span>
                    </div>
                    <h3 className="text-xl font-bold text-text-main leading-snug group-hover:text-primary transition-colors">{thread.title}</h3>
                 </div>

                 <div className="flex items-center justify-between pt-6 border-t border-border-soft">
                    <div className="flex items-center gap-6">
                       <button className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors text-xs font-bold">
                          <ThumbsUp size={16} /> {thread.upvotes}
                       </button>
                       <button className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors text-xs font-bold">
                          <MessageSquare size={16} /> {thread.replies} Replies
                       </button>
                    </div>
                    <Button variant="ghost" className="h-10 px-4 rounded-xl text-primary font-bold group">
                       View Discussion <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                 </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center pt-8">
         <Button variant="ghost" className="text-text-muted font-bold flex items-center gap-2">
             Load More Questions <ChevronRight size={16} />
         </Button>
      </div>
    </div>
  );
}
