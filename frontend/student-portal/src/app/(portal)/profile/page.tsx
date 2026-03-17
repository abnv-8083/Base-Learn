"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Settings, 
  Shield, 
  Bell, 
  CreditCard, 
  Camera, 
  LogOut, 
  CheckCircle2,
  Trash2,
  Globe,
  Monitor,
  Moon,
  Sun,
  Palette
} from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@repo/ui/components/tabs";
import { Input } from "@repo/ui/components/input";
import { cn } from "@repo/ui/lib/utils";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      
      {/* Profile Header */}
      <section className="relative h-64 rounded-[3rem] bg-text-main overflow-hidden border border-border-main shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-indigo-500/10 to-transparent p-12 flex items-end">
           <div className="flex flex-col md:flex-row items-end gap-8 relative z-10 w-full">
              <div className="relative group">
                 <div className="w-32 h-32 rounded-[2.5rem] bg-white flex items-center justify-center text-4xl font-display font-bold text-primary shadow-2xl border-[6px] border-white/20">
                    AM
                 </div>
                 <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-white rounded-xl shadow-lg border-4 border-slate-900 flex items-center justify-center hover:scale-110 transition-transform">
                    <Camera size={18} />
                 </button>
              </div>
              <div className="flex-1 space-y-2 pb-2">
                 <h1 className="text-4xl font-display font-bold text-white tracking-tight">Arjun Mehta</h1>
                 <div className="flex flex-wrap items-center gap-4">
                    <span className="text-white/60 text-sm font-bold flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-lg border border-white/10">
                       <User size={14} className="text-primary" /> Grade 10th
                    </span>
                    <span className="text-white/60 text-sm font-bold flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-lg border border-white/10">
                       <Globe size={14} className="text-primary" /> Global Rank #7
                    </span>
                    <span className="text-white/60 text-sm font-bold flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-lg border border-white/10">
                       <Palette size={14} className="text-primary" /> 12.4k XP
                    </span>
                 </div>
              </div>
              <div className="flex gap-3 pb-2">
                 <Button variant="ghost" className="bg-white/10 border border-white/10 text-white font-bold h-12 px-8 rounded-2xl hover:bg-white hover:text-text-main transition-all">
                   Share Profile
                 </Button>
              </div>
           </div>
        </div>
      </section>

      {/* Main Settings Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3">
           <Card className="soft-card p-4 border-none space-y-1.5">
              {[
                { id: "account", label: "My Profile", icon: User },
                { id: "security", label: "Security", icon: Shield },
                { id: "notifications", label: "Alerts", icon: Bell },
                { id: "preferences", label: "Preferences", icon: Settings },
                { id: "billing", label: "Academy Plan", icon: CreditCard },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                    activeTab === item.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-text-muted hover:text-primary hover:bg-primary-light"
                  )}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-border-soft mt-2">
                 <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest text-rose-500 hover:bg-rose-50 transition-all">
                    <LogOut size={16} />
                    Sign Out
                 </button>
              </div>
           </Card>
        </aside>

        {/* Content Section */}
        <div className="lg:col-span-9">
           <AnimatePresence mode="wait">
              {activeTab === 'account' && (
                <motion.div
                  key="account"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                   <Card className="soft-card p-10 border-none space-y-10">
                      <div className="flex items-center justify-between">
                         <h2 className="text-2xl font-display font-bold text-text-main">Account Information</h2>
                         <Button className="bg-primary text-white font-bold px-8 h-12 rounded-xl shadow-ocean">Update Details</Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-3">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Full Display Name</div>
                            <Input placeholder="Arjun Mehta" defaultValue="Arjun Mehta" className="h-12 border-border-main rounded-xl font-medium focus:ring-primary/20" />
                         </div>
                         <div className="space-y-3">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Email Address</div>
                            <Input placeholder="arjun@example.com" value="arjun@baselearn.ai" disabled className="h-12 border-border-main rounded-xl bg-bg-soft" />
                         </div>
                         <div className="space-y-3">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Academic Grade</div>
                            <Input placeholder="Grade 10" defaultValue="Grade 10" className="h-12 border-border-main rounded-xl font-medium" />
                         </div>
                         <div className="space-y-3">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Phone Number</div>
                            <Input placeholder="+91 98765 43210" className="h-12 border-border-main rounded-xl font-medium" />
                         </div>
                      </div>

                      <div className="pt-10 border-t border-border-soft space-y-6">
                         <h3 className="text-lg font-bold text-text-main">Learning Mode</h3>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {["Intensive", "Guided", "Self-Paced"].map((mode) => (
                               <button 
                                 key={mode} 
                                 className={cn(
                                   "p-6 rounded-2xl border-2 text-center transition-all",
                                   mode === 'Intensive' ? "border-primary bg-primary-light shadow-sm" : "border-border-soft bg-white hover:border-primary/20"
                                 )}
                               >
                                  <div className={cn("font-bold text-sm", mode === 'Intensive' ? "text-primary" : "text-text-muted")}>{mode}</div>
                               </button>
                            ))}
                         </div>
                      </div>
                   </Card>

                   <Card className="soft-card p-10 border-none space-y-6 border-2 border-rose-500/5 bg-rose-500/5">
                      <div className="flex items-center justify-between">
                         <div className="space-y-1">
                            <h3 className="text-lg font-bold text-rose-500">Deactivate Account</h3>
                            <p className="text-sm text-text-muted">Permanently delete your progress and account data.</p>
                         </div>
                         <Button variant="ghost" className="text-rose-500 hover:bg-rose-500 hover:text-white font-bold h-12 px-6 rounded-xl border border-rose-500/20 transition-all">
                            <Trash2 size={18} className="mr-2" /> Deactivate
                         </Button>
                      </div>
                   </Card>
                </motion.div>
              )}

              {activeTab === 'preferences' && (
                <motion.div
                  key="prefs"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                   <Card className="soft-card p-10 border-none space-y-10">
                      <h2 className="text-2xl font-display font-bold text-text-main">Global Preferences</h2>
                      
                      <div className="space-y-8">
                         <div className="flex items-center justify-between group">
                            <div className="space-y-1">
                               <div className="font-bold text-text-main">Dark Mode</div>
                               <p className="text-sm text-text-muted">Switch between light and dark themes.</p>
                            </div>
                            <div className="flex items-center gap-2 p-1.5 bg-bg-soft rounded-xl border border-border-main">
                               <button className="p-2.5 rounded-lg bg-white shadow-sm text-primary"><Sun size={18} /></button>
                               <button className="p-2.5 rounded-lg text-text-muted hover:text-primary"><Moon size={18} /></button>
                            </div>
                         </div>

                         <div className="flex items-center justify-between">
                            <div className="space-y-1">
                               <div className="font-bold text-text-main">Video Auto-Play</div>
                               <p className="text-sm text-text-muted">Play videos automatically when entering a lesson.</p>
                            </div>
                            <div className="w-14 h-8 bg-primary rounded-full relative p-1 cursor-pointer">
                               <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full shadow-sm" />
                            </div>
                         </div>

                         <div className="flex items-center justify-between">
                            <div className="space-y-1">
                               <div className="font-bold text-text-main">Focus Mode (Zen)</div>
                               <p className="text-sm text-text-muted">Automatically hide sidebar during video playback.</p>
                            </div>
                            <div className="w-14 h-8 bg-bg-soft rounded-full relative p-1 cursor-pointer border border-border-main">
                               <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-sm" />
                            </div>
                         </div>
                      </div>
                   </Card>
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
