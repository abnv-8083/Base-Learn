'use client';

import React, { useState } from 'react';
import { 
  BarChart3, PieChart, TrendingUp, 
  Download, FileText, Calendar, 
  ChevronDown, ArrowUpRight, ArrowDownRight,
  Target, Info
} from 'lucide-react';
import styles from './reports.module.css';

export default function ReportsAnalytics() {
  const [activeReport, setActiveReport] = useState('Academic Performance');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Departmental Intelligence</h1>
          <p className={styles.subtitle}>Deep-dive into student performance, content engagement, and instructor productivity.</p>
        </div>
        <div className={styles.headerActions}>
           <button className={`btn btn-secondary ${styles.dateBtn}`}>
             <Calendar size={18} /> Last 30 Days <ChevronDown size={14} />
           </button>
           <button className={`btn btn-primary ${styles.exportBtn}`}>
             <Download size={18} /> Export PDF Report
           </button>
        </div>
      </header>

      {/* Analytics Tabs */}
      <div className={styles.reportTabs}>
         {['Academic Performance', 'Content Retention', 'Instructor Stats'].map(tab => (
           <button 
             key={tab}
             className={`${styles.reportTab} ${activeReport === tab ? styles.activeTab : ''}`}
             onClick={() => setActiveReport(tab)}
           >
             {tab}
           </button>
         ))}
      </div>

      <div className={styles.mainGrid}>
        
        {/* Performance Heatmap Area */}
        <div className={styles.leftCol}>
           <div className={`glass-panel ${styles.analyticsPanel}`}>
              <div className={styles.panelHeader}>
                <h3 className={styles.panelTitle}>Student Score Distribution</h3>
                <div className={styles.metric}>
                  <Target size={16} />
                  <span>Target: 75% Avg</span>
                </div>
              </div>

              <div className={styles.heatmapArea}>
                 {/* Mock Heatmap Grid */}
                 <div className={styles.heatmapGrid}>
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={styles.heatSquare} 
                        style={{ opacity: Math.random() * 0.8 + 0.2 }}
                      ></div>
                    ))}
                 </div>
                 <div className={styles.heatmapLegend}>
                    <span>Low (40%)</span>
                    <div className={styles.gradientBar}></div>
                    <span>High (100%)</span>
                 </div>
              </div>

              <div className={styles.insightBox}>
                 <Info size={18} className={styles.insightIcon} />
                 <p>Grade 10 Physics has seen a **12% increase** in average scores since the last curriculum update.</p>
              </div>
           </div>

           <div className={styles.statsRow}>
              <div className={`glass-card ${styles.miniMetric}`}>
                 <div className={styles.mmHeader}>
                    <p className={styles.mmLabel}>Avg. Pass Rate</p>
                    <ArrowUpRight size={16} color="var(--color-success)" />
                 </div>
                 <h4 className={styles.mmValue}>84.2%</h4>
              </div>
              <div className={`glass-card ${styles.miniMetric}`}>
                 <div className={styles.mmHeader}>
                    <p className={styles.mmLabel}>Active Engagement</p>
                    <ArrowDownRight size={16} color="var(--color-danger)" />
                 </div>
                 <h4 className={styles.mmValue}>68.0%</h4>
              </div>
              <div className={`glass-card ${styles.miniMetric}`}>
                 <div className={styles.mmHeader}>
                    <p className={styles.mmLabel}>Course Completion</p>
                    <ArrowUpRight size={16} color="var(--color-success)" />
                 </div>
                 <h4 className={styles.mmValue}>52.4%</h4>
              </div>
           </div>
        </div>

        {/* Vertical Comparison List */}
        <div className={styles.rightCol}>
           <div className={`glass-panel ${styles.comparisonBox}`}>
              <h3 className={styles.panelTitle}>Top/Bottom Subjects</h3>
              <div className={styles.compList}>
                 {[
                   { name: 'Computer Science', val: '92%', status: 'high' },
                   { name: 'Mathematics', val: '78%', status: 'high' },
                   { name: 'Physics', val: '74%', status: 'mid' },
                   { name: 'Chemistry', val: '62%', status: 'mid' },
                   { name: 'Biology', val: '41%', status: 'low' },
                 ].map((item, i) => (
                   <div key={i} className={styles.compItem}>
                      <span className={styles.compName}>{item.name}</span>
                      <div className={styles.compTrack}>
                         <div className={`${styles.compFill} ${styles['fill-'+item.status]}`} style={{ width: item.val }}></div>
                      </div>
                      <span className={styles.compVal}>{item.val}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className={`glass-card ${styles.scheduledReports}`}>
              <h3 className={styles.panelTitle}>Automated Reports</h3>
              <div className={styles.scheduleList}>
                 <div className={styles.scheduleItem}>
                    <FileText size={16} />
                    <div className={styles.sInfo}>
                       <p className={styles.sName}>Weekly Performance</p>
                       <span className={styles.sTime}>Mondays @ 8:00 AM</span>
                    </div>
                 </div>
                 <div className={styles.scheduleItem}>
                    <FileText size={16} />
                    <div className={styles.sInfo}>
                       <p className={styles.sName}>Instructor Audit</p>
                       <span className={styles.sTime}>Monthly, 1st Day</span>
                    </div>
                 </div>
              </div>
              <button className={styles.addSchedule}>+ New Schedule</button>
           </div>
        </div>

      </div>
    </div>
  );
}
