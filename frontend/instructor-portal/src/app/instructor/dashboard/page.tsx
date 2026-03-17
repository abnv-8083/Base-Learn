'use client';

import React from 'react';
import { 
  Users, Video, Star, Clock, 
  ArrowUpRight, ArrowDownRight, 
  Play, BookOpen, MessageSquare, AlertCircle
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import styles from './dashboard.module.css';

const STATS = [
  { label: 'Classes Uploaded', value: '42', trend: '+4', type: 'up', icon: <Video size={20} /> },
  { label: 'Total Students', value: '1,284', trend: '+12%', type: 'up', icon: <Users size={20} /> },
  { label: 'Avg Student Score', value: '78%', trend: '-2%', type: 'down', icon: <Star size={20} /> },
  { label: 'Pending Doubts', value: '18', trend: 'Urgent', type: 'alert', icon: <MessageSquare size={20} /> },
];

const ENGAGEMENT_DATA = [
  { day: 'Mon', active: 450 },
  { day: 'Tue', active: 520 },
  { day: 'Wed', active: 480 },
  { day: 'Thu', active: 610 },
  { day: 'Fri', active: 590 },
  { day: 'Sat', active: 720 },
  { day: 'Sun', active: 680 },
];

const TOP_STUDENTS = [
  { name: 'Aditya Raj', grade: '10th', score: '94%', classes: '38/40', lastSeen: '2h ago' },
  { name: 'Sneha Kumari', grade: '9th', score: '91%', classes: '35/40', lastSeen: '5h ago' },
  { name: 'Rohan Verma', grade: '10th', score: '88%', classes: '32/40', lastSeen: '1d ago' },
];

export default function InstructorDashboard() {
  return (
    <div className={styles.container}>
      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {STATS.map((stat, i) => (
          <div key={i} className={`glass-card ${styles.statCard}`}>
            <div className={styles.statHeader}>
              <div className={styles.statIcon}>{stat.icon}</div>
              <span className={clsx(
                styles.trend,
                stat.type === 'up' && styles.trendUp,
                stat.type === 'down' && styles.trendDown,
                stat.type === 'alert' && styles.trendAlert
              )}>
                {stat.type === 'up' && <ArrowUpRight size={14} />}
                {stat.type === 'down' && <ArrowDownRight size={14} />}
                {stat.trend}
              </span>
            </div>
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div className={styles.mainGrid}>
        {/* Engagement Chart */}
        <div className={`glass-panel ${styles.chartPanel}`}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Student Engagement</h3>
            <p className={styles.panelSubtitle}>Daily active students watching your classes</p>
          </div>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ENGAGEMENT_DATA}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 600, fill: 'var(--color-text-muted)' }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: 'var(--shadow-lg)',
                    fontSize: '12px',
                    fontWeight: 700
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="active" 
                  stroke="var(--color-primary)" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorActive)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Students */}
        <div className={`glass-card ${styles.studentsPanel}`}>
          <h3 className={styles.panelTitle}>Top Performing Students</h3>
          <div className={styles.studentList}>
            {TOP_STUDENTS.map((student, i) => (
              <div key={i} className={styles.studentItem}>
                <div className={styles.studentInfo}>
                  <div className={styles.avatar}>{student.name.charAt(0)}</div>
                  <div>
                    <p className={styles.name}>{student.name}</p>
                    <p className={styles.grade}>{student.grade} • {student.classes} classes</p>
                  </div>
                </div>
                <div className={styles.studentScore}>
                  <span className={styles.scoreValue}>{student.score}</span>
                  <span className={styles.lastSeen}>{student.lastSeen}</span>
                </div>
              </div>
            ))}
          </div>
          <button className={styles.viewMoreBtn}>View All Students</button>
        </div>
      </div>

      {/* Action Row */}
      <div className={styles.actionRow}>
         <div className={`glass-panel ${styles.actionCard}`}>
            <div className={styles.actionIcon}><AlertCircle size={20} color="var(--color-primary)" /></div>
            <div className={styles.actionText}>
              <p className={styles.actionTitle}>12 Ungraded Assignments</p>
              <p className={styles.actionSub}>Physics Grade 10 - Unit 4: Thermodynamics</p>
            </div>
            <button className={styles.actionBtn}>Grade Now</button>
         </div>
         <div className={`glass-panel ${styles.actionCard}`}>
            <div className={styles.actionIcon}><MessageSquare size={20} color="var(--color-success)" /></div>
            <div className={styles.actionText}>
              <p className={styles.actionTitle}>5 New Doubts Received</p>
              <p className={styles.actionSub}>Students are asking about "Matrix Multiplication"</p>
            </div>
            <button className={styles.actionBtn}>Answer</button>
         </div>
      </div>
    </div>
  );
}

function clsx(...args: any[]) {
  return args.filter(Boolean).join(' ');
}
