"use client";

import { motion } from "framer-motion";
import { 
  Zap, 
  Flame, 
  Play, 
  Target, 
  Calendar, 
  Trophy, 
  Clock, 
  CheckCircle2, 
  Bell, 
  TrendingUp,
  MoreVertical,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { Card } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Badge } from "@repo/ui/components/badge";

const stats = [
  { label: "Classes Watched", value: "12/15", sub: "This Week", icon: Play, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Avg. Test Score", value: "84%", sub: "+5% from last month", icon: Target, color: "text-indigo-500", bg: "bg-indigo-50" },
  { label: "Current Rank", value: "#7", sub: "Top 5% of Class", icon: Trophy, color: "text-amber-500", bg: "bg-amber-50" },
];

const continueLearning = [
  { title: "Mathematics — Chapter 5: Polynomials", instructor: "Dr. Sarah Smith", progress: 58, lastChapter: "Video 7: Long Division" },
  { title: "Physics — Chapter 3: Laws of Motion", instructor: "Prof. James Wilson", progress: 85, lastChapter: "Video 12: Friction" },
];

const activity = [
  { text: "You completed Chapter 3 - Quadratic Equations", time: "2 hours ago", type: "course" },
  { text: "Test Score: 78/100 in Chemistry", time: "Yesterday", type: "test" },
  { text: "Assignment submitted: History Essay", time: "2 days ago", type: "assignment" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        
        {/* Main Content Area */}
        <div className="xl:col-span-2 space-y-10">
          
          {/* Welcome Header */}
          <section className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl font-display font-bold text-text-main mb-1">Good Morning, Arjun 👋</h1>
                <p className="text-text-muted font-medium">Tuesday, March 17, 2026</p>
              </div>
              <div className="flex items-center gap-3 bg-white border border-border-soft p-2 rounded-2xl shadow-sm">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                  <Flame className="text-orange-500 w-6 h-6 fill-orange-500" />
                </div>
                <div className="pr-4">
                  <div className="text-xs font-bold text-text-muted uppercase tracking-widest">Current Streak</div>
                  <div className="text-lg font-bold text-text-main">5-Day Streak</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button size="sm" className="bg-primary text-white rounded-btn h-10 px-6 font-bold shadow-ocean">
                Resume Last Class
              </Button>
              <Button size="sm" variant="ghost" className="rounded-btn h-10 px-6 font-bold border border-border-soft bg-white">
                Start Today's Test
              </Button>
              <Button size="sm" variant="ghost" className="rounded-btn h-10 px-6 font-bold border border-border-soft bg-white">
                View Schedule
              </Button>
            </div>
          </section>

          {/* Stats Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <Card key={i} className="soft-card p-6 border-none">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <MoreVertical className="text-text-muted w-5 h-5 cursor-pointer" />
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-display font-bold text-text-main">{stat.value}</div>
                  <div className="text-sm font-bold text-text-muted uppercase tracking-wider">{stat.label}</div>
                  <div className="text-xs text-text-muted pt-2 border-t border-border-soft mt-2">{stat.sub}</div>
                </div>
              </Card>
            ))}
          </section>

          {/* Continue Learning */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display font-bold text-text-main">Continue Learning</h2>
              <Button variant="ghost" className="text-primary font-bold flex items-center gap-1 group">
                View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {continueLearning.map((course, i) => (
                <Card key={i} className="soft-card group p-5 border-none">
                  <div className="space-y-4">
                    <div className="aspect-video bg-bg-soft rounded-xl overflow-hidden relative">
                       <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                            <Play className="text-primary w-6 h-6 fill-primary" />
                         </div>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <div className="text-xs font-bold text-primary uppercase tracking-widest">{course.instructor}</div>
                       <h3 className="text-lg font-bold text-text-main line-clamp-1 leading-tight">{course.title}</h3>
                       <div className="space-y-2 pt-2">
                         <div className="flex items-center justify-between text-[10px] uppercase font-bold text-text-muted">
                           <span>{course.lastChapter}</span>
                           <span>{course.progress}%</span>
                         </div>
                         <div className="h-2 w-full bg-bg-soft rounded-full overflow-hidden border border-border-soft">
                            <div className="h-full bg-primary shadow-sm" style={{ width: `${course.progress}%` }} />
                         </div>
                       </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Recent Activity */}
          <section className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-text-main">Recent Activity</h2>
            <Card className="soft-card p-2 border-none">
              <div className="divide-y divide-border-soft">
                {activity.map((item, i) => (
                  <div key={i} className="p-4 flex items-center justify-between group hover:bg-bg-soft transition-colors first:rounded-t-xl last:rounded-b-xl">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-border-soft text-primary`}>
                        {item.type === 'course' ? <Play className="w-5 h-5" /> : item.type === 'test' ? <Target className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-text-main group-hover:text-primary transition-colors">{item.text}</div>
                        <div className="text-xs text-text-muted">{item.time}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-text-muted hover:text-primary h-8 w-8">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* Right Panel */}
        <div className="space-y-10">
          
          {/* Streak Calendar */}
          <Card className="soft-card p-6 border-none">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-text-main">Study Streak</h3>
              <Calendar className="text-text-muted w-5 h-5" />
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`aspect-square rounded-[4px] border border-border-soft ${[2, 5, 8, 9, 10, 14, 15, 16, 17].includes(i) ? 'bg-primary/40' : i === 18 ? 'bg-primary shadow-sm' : 'bg-bg-soft'}`} 
                  />
                ))}
              </div>
              <div className="flex items-center justify-between text-[10px] text-text-muted font-bold uppercase tracking-widest pt-4 border-t border-border-soft">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-2.5 h-2.5 bg-bg-soft rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-primary/20 rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-primary/60 rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-primary rounded-sm" />
                </div>
                <span>More</span>
              </div>
            </div>
          </Card>

          {/* Recent Badges */}
          <Card className="soft-card p-6 border-none space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-text-main">Recent Badges</h3>
              <Trophy className="text-amber-500 w-5 h-5" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square rounded-2xl bg-bg-soft border border-border-soft flex items-center justify-center group hover:bg-white transition-all cursor-pointer">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap className="text-primary w-6 h-6 fill-primary" />
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full text-primary font-bold text-sm bg-primary-light h-10 rounded-xl">
              View All Achievements
            </Button>
          </Card>

          {/* Announcements */}
          <Card className="soft-card p-6 border-none space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-text-main">Faculty Updates</h3>
              <Bell className="text-text-muted w-5 h-5" />
            </div>
            <div className="space-y-4">
              {[
                { title: "Weekly Mock Test Live", time: "10m ago", color: "text-blue-500" },
                { title: "Holiday on 21st March", time: "2h ago", color: "text-red-500" },
              ].map((ann, i) => (
                <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-bg-soft transition-colors cursor-pointer border border-transparent hover:border-border-soft">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-text-main leading-tight">{ann.title}</div>
                    <div className="text-xs text-text-muted">Posted {ann.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
