"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Download, 
  Eye, 
  Search, 
  Filter, 
  File, 
  Image as ImageIcon,
  FolderOpen,
  ChevronRight,
  Bookmark,
  BookMarked
} from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";
import { cn } from "@repo/ui/lib/utils";

const materials = [
  { id: 1, title: "Polynomials Formula Sheet", subject: "Math", type: "PDF", size: "1.2 MB", downloads: "1.4k", date: "Mar 12, 2026", color: "text-blue-500" },
  { id: 2, title: "French Revolution Timeline", subject: "Social", type: "Image", size: "4.5 MB", downloads: "850", date: "Mar 10, 2026", color: "text-teal-500" },
  { id: 3, title: "Standard Equations of Motion", subject: "Physics", type: "PDF", size: "850 KB", downloads: "2.1k", date: "Mar 08, 2026", color: "text-indigo-500" },
  { id: 4, title: "Grade 9 Chemistry Lab Notes", subject: "Chemistry", type: "Doc", size: "2.8 MB", downloads: "400", date: "Mar 05, 2026", color: "text-purple-500" },
];

export default function MaterialsPage() {
  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="badge mb-4">
             <FolderOpen className="w-3.5 h-3.5 mr-2" />
             Resource Library
          </div>
          <h1 className="text-4xl font-display font-bold text-text-main tracking-tight">Study <span className="text-gradient">Materials</span></h1>
          <p className="text-text-muted font-medium">Download formula sheets, notes, and reference guides.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="h-12 px-6 rounded-xl border border-border-main bg-white text-text-muted font-bold text-xs uppercase tracking-widest hover:text-primary transition-all shadow-sm">
             <Download size={18} className="mr-2" />
             Bulk Download
          </Button>
          <Button className="h-12 px-6 rounded-xl bg-primary text-white font-bold shadow-ocean hover:scale-105 active:scale-95 transition-all">
             Quick Preview
          </Button>
        </div>
      </div>

      {/* Search & Subjects */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search by module title or filename..." 
            className="w-full h-12 bg-white border border-border-main rounded-xl pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-primary/10 transition-all shadow-sm"
          />
        </div>
        <div className="flex gap-2">
           {["All", "Notes", "Papers", "Formulas"].map((t) => (
             <Button key={t} variant="ghost" className="h-12 px-6 rounded-xl border border-border-main bg-white text-text-muted font-bold text-[10px] uppercase tracking-widest hover:text-primary transition-all shadow-sm">
                {t}
             </Button>
           ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {materials.map((item) => (
          <Card key={item.id} className="soft-card group p-6 border-none flex flex-col hover:shadow-2xl transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-8">
              <div className={cn("w-14 h-14 rounded-2xl bg-bg-soft flex items-center justify-center border border-border-soft transition-all group-hover:bg-primary-light group-hover:border-primary/20", item.color)}>
                 {item.type === 'PDF' ? <FileText size={28} /> : item.type === 'Image' ? <ImageIcon size={28} /> : <File size={28} />}
              </div>
              <button className="text-text-muted hover:text-primary transition-colors">
                <Bookmark size={18} />
              </button>
            </div>

            <div className="space-y-4 flex-1">
               <div className="space-y-1">
                  <div className={cn("text-[10px] font-bold uppercase tracking-widest", item.color)}>{item.subject}</div>
                  <h3 className="text-lg font-bold text-text-main line-clamp-2 leading-tight group-hover:text-primary transition-colors">{item.title}</h3>
               </div>
               <div className="flex items-center gap-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                  <div className="flex items-center gap-1"><Download size={12} /> {item.downloads}</div>
                  <div className="flex items-center gap-1">{item.size}</div>
               </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border-soft flex gap-2">
               <Button className="flex-1 h-10 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-ocean hover:bg-primary-dark transition-all">
                  Download
               </Button>
               <Button variant="ghost" className="aspect-square p-0 w-10 h-10 border border-border-soft rounded-lg text-text-muted hover:text-primary flex items-center justify-center">
                  <Eye size={18} />
               </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
