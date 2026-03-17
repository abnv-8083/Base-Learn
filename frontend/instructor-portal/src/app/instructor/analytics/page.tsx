'use client';

import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, Users, 
  PlayCircle, Clock, Calendar, 
  ChevronDown, ArrowUpRight, ArrowDownRight,
  Filter, Download, CheckCircle2
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import styles from './analytics.module.css';

const VIEWS_DATA = [
  { time: '08:00', views: 120 },
  { time: '10:00', views: 340 },
  { time: '12:00', views: 450 },
  { time: '14:00', views: 520 },
  { time: '16:00', views: 480 },
  { time: '18:00', views: 610 },
  { time: '20:00', views: 580 },
];

const COMPLETION_DATA = [
  { name: 'Video A', val: 85 },
  { name: 'Video B', val: 72 },
  { name: 'Video C', val: 64 },
  { name: 'Video D', val: 91 },
  { name: 'Video E', val: 58 },
];

const SCORE_DIST = [
  { range: '90-100', count: 45, color: '#10B981' },
  { range: '80-89', count: 82, color: '#0066FF' },
  { range: '70-79', count: 65, color: '#F59E0B' },
  { range: '<70', count: 28, color: '#EF4444' },
];

export default function InstructorAnalytics() {
  const [dateRange, setDateRange] = useState('Last 30 Days');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Performance Analytics</h1>
          <p className={styles.subtitle}>Deep-dive into video engagement and student mastery metrics.</p>
        </div>
        <div className={styles.headerActions}>
           <div className={styles.dateSelector}>
              <Calendar size={16} />
              <span>{dateRange}</span>
              <ChevronDown size={14} />
           </div>
           <button className={styles.exportBtn}><Download size={18} /> Export Results</button>
        </div>
      </header>

      {/* Overview Cards */}
      <div className={styles.overviewRow}>
         <div className={`glass-card ${styles.ovCard}`}>
            <p className={styles.ovLabel}>Total Class Views</p>
            <div className={styles.ovMain}>
               <span className={styles.ovVal}>28.4K</span>
               <span className={styles.ovGrowth}><ArrowUpRight size={14} /> 12%</span>
            </div>
            <p className={styles.ovSub}>+3.2K from last month</p>
         </div>
         <div className={`glass-card ${styles.ovCard}`}>
            <p className={styles.ovLabel}>Avg. Watch Duration</p>
            <div className={styles.ovMain}>
               <span className={styles.ovVal}>18m 42s</span>
               <span className={styles.ovGrowth}><ArrowUpRight size={14} /> 5%</span>
            </div>
            <p className={styles.ovSub}>Out of 24m avg length</p>
         </div>
         <div className={`glass-card ${styles.ovCard}`}>
            <p className={styles.ovLabel}>Quiz Participation</p>
            <div className={styles.ovMain}>
               <span className={styles.ovVal}>92%</span>
               <span className={styles.ovGrowth}><ArrowUpRight size={14} /> 8%</span>
            </div>
            <p className={styles.ovSub}>Higher than regional avg</p>
         </div>
      </div>

      <div className={styles.mainGrid}>
         {/* Views Area Chart */}
         <div className={`glass-panel ${styles.panel}`}>
            <div className={styles.panelHeader}>
               <h3 className={styles.panelTitle}>Video Views Over Time</h3>
               <button className={styles.filterBtn}><Filter size={14} /> By Subject</button>
            </div>
            <div className={styles.chartWrapper}>
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={VIEWS_DATA}>
                    <defs>
                      <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#64748B'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#64748B'}} />
                    <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)'}} />
                    <Area type="monotone" dataKey="views" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#viewsGrad)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Score Distribution */}
         <div className={`glass-panel ${styles.panel}`}>
            <div className={styles.panelHeader}>
               <h3 className={styles.panelTitle}>Test Score Distribution</h3>
            </div>
            <div className={styles.chartWrapper}>
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SCORE_DIST} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="range" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#0F172A'}} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                      {SCORE_DIST.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
            <div className={styles.panelNote}>*Based on 220 graded submissions this month.</div>
         </div>
      </div>

      <div className={styles.funnelSection}>
         <div className={`glass-panel ${styles.funnelPanel}`}>
            <h3 className={styles.panelTitle}>Engagement Funnel</h3>
            <div className={styles.funnelGrid}>
               <div className={styles.funnelStep}>
                  <div className={styles.funnelIcon}><Users size={20} /></div>
                  <div className={styles.funnelInfo}>
                     <p className={styles.fL}>Enrolled</p>
                     <p className={styles.fV}>1,284</p>
                  </div>
               </div>
               <div className={styles.funnelDivider}><ChevronDown size={20} /></div>
               <div className={styles.funnelStep}>
                  <div className={styles.funnelIcon}><PlayCircle size={20} /></div>
                  <div className={styles.funnelInfo}>
                     <p className={styles.fL}>Watched &gt;50%</p>
                     <p className={styles.fV}>1,042</p>
                  </div>
               </div>
               <div className={styles.funnelDivider}><ChevronDown size={20} /></div>
               <div className={styles.funnelStep}>
                  <div className={styles.funnelIcon}><CheckCircle2 size={20} /></div>
                  <div className={styles.funnelInfo}>
                     <p className={styles.fL}>Tested</p>
                     <p className={styles.fV}>856</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
