'use client';

import React from 'react';
import { 
  BarChart3, PieChart, LineChart, TrendingUp, 
  Users, PlayCircle, Clock, Download, 
  Filter, Calendar, ChevronDown
} from 'lucide-react';
import styles from './reports.module.css';

const STAT_CARDS = [
  { label: 'Active Learners', value: '12,402', trend: '+14%', icon: <Users size={20} /> },
  { label: 'Avg. Watch Time', value: '42m', trend: '+5%', icon: <Clock size={20} /> },
  { label: 'Completion Rate', value: '68%', trend: '+2%', icon: <PlayCircle size={20} /> },
  { label: 'Top Subject', value: 'Math', trend: 'Stable', icon: <TrendingUp size={20} /> },
];

export default function ReportsAnalytics() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>System Analytics</h1>
          <p className={styles.subtitle}>Deep dive into user engagement, content performance, and platform growth.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={`btn btn-secondary ${styles.actionBtn}`}>
            <Calendar size={18} /> Last 30 Days <ChevronDown size={14} />
          </button>
          <button className={`btn btn-secondary ${styles.actionBtn}`}>
            <Filter size={18} /> Filters
          </button>
          <button className={`btn btn-primary ${styles.actionBtn}`}>
            <Download size={18} /> Export PDF
          </button>
        </div>
      </header>

      {/* Grid Stats */}
      <section className={styles.statsGrid}>
        {STAT_CARDS.map((stat, i) => (
          <div key={i} className={`glass-panel ${styles.statCard}`}>
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>{stat.label}</span>
              <h3 className={styles.statValue}>{stat.value}</h3>
              <span className={styles.statTrend}>{stat.trend} from last month</span>
            </div>
          </div>
        ))}
      </section>

      {/* Main Analysis Area */}
      <div className={styles.analysisGrid}>
        
        {/* Large Chart Area */}
        <div className={`glass-card ${styles.chartPanel} ${styles.colSpan2}`}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Engagement Over Time</h3>
            <div className={styles.chartLegend}>
              <span className={styles.legendItem}><span className={styles.dotPrimary}></span> Video Views</span>
              <span className={styles.legendItem}><span className={styles.dotSecondary}></span> Active Sessions</span>
            </div>
          </div>
          <div className={styles.chartPlaceholder}>
            <div className={styles.visualBars}>
              {[60, 40, 80, 50, 90, 70, 85, 45, 65, 55, 75, 95].map((h, i) => (
                <div key={i} className={styles.barWrapper}>
                  <div className={styles.barPrimary} style={{ height: `${h}%` }}></div>
                  <div className={styles.barSecondary} style={{ height: `${h * 0.6}%` }}></div>
                </div>
              ))}
            </div>
            <div className={styles.chartOverlay}>
              <LineChart size={48} className={styles.overlayIcon} />
              <p>Engagement Visualization Mockup</p>
            </div>
          </div>
        </div>

        {/* Breakdown Area */}
        <div className={`glass-card ${styles.chartPanel}`}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Devices Used</h3>
          </div>
          <div className={styles.piePlaceholder}>
             <div className={styles.pieCircle}>
               <div className={styles.pieSegment} style={{ transform: 'rotate(0deg)', borderRightColor: 'var(--color-primary)' }}></div>
               <div className={styles.pieSegment} style={{ transform: 'rotate(45deg)', borderRightColor: 'var(--color-primary-dark)' }}></div>
               <div className={styles.pieCenter}></div>
             </div>
             <div className={styles.pieLegend}>
               <div className={styles.legendRow}><span>Desktop</span> <span>65%</span></div>
               <div className={styles.legendRow}><span>Mobile</span> <span>28%</span></div>
               <div className={styles.legendRow}><span>Tablet</span> <span>7%</span></div>
             </div>
          </div>
        </div>

        {/* Detailed Reports Row */}
        <div className={`glass-panel ${styles.tablePanel} ${styles.colSpan2}`}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Popular Courses</h3>
            <button className={styles.viewAll}>View Full Report</button>
          </div>
          <table className={styles.reportTable}>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Instructor</th>
                <th>Total Views</th>
                <th>Engagement Rate</th>
                <th>Growth</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Advanced Calculus', teacher: 'Prof. Mark Taylor', views: '24.5k', engagement: '82%', growth: '+12%' },
                { name: 'Atomic Physics', teacher: 'Dr. Sarah Connor', views: '18.2k', engagement: '76%', growth: '+8%' },
                { name: 'Modern Bio', teacher: 'Michael Davis', views: '12.4k', engagement: '64%', growth: '+4%' },
              ].map((row, i) => (
                <tr key={i}>
                  <td className={styles.boldText}>{row.name}</td>
                  <td>{row.teacher}</td>
                  <td>{row.views}</td>
                  <td>{row.engagement}</td>
                  <td className={styles.trendUp}>{row.growth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={`glass-panel ${styles.summaryPanel}`}>
          <h3 className={styles.panelTitle}>AI Insights</h3>
          <div className={styles.insightCard}>
            <p className={styles.insightText}><strong>Traffic Surge:</strong> engagement is 20% higher between 7 PM - 10 PM. Consider scheduling notifications in this window.</p>
          </div>
          <div className={styles.insightCard}>
            <p className={styles.insightText}><strong>Retention Alert:</strong> Users who watch "Intro to Algebra" have a 40% higher long-term retention rate.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
