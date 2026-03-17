'use client';

import React, { useState } from 'react';
import { 
  Users, BookOpen, GraduationCap, Clock, 
  TrendingUp, AlertCircle, FileText, 
  ChevronRight, Calendar, UserCheck
} from 'lucide-react';
import styles from './dashboard.module.css';

const KPI_CARDS = [
  { label: 'Active Students', value: '1,280', growth: '+12%', icon: <Users size={20} /> },
  { label: 'Courses Running', value: '42', growth: '+3', icon: <BookOpen size={20} /> },
  { label: 'Avg Department Score', value: '76.4%', growth: '+2.1%', icon: <GraduationCap size={20} /> },
  { label: 'Class Sessions', value: '156', growth: 'This Week', icon: <Calendar size={20} /> },
];

const RECENT_ALERTS = [
  { id: 1, type: 'danger', msg: 'Physics Grade 10: Completion below 50%', time: '2h ago' },
  { id: 2, type: 'warning', msg: 'Instructor Mark T. has no uploads in 7 days', time: '5h ago' },
  { id: 3, type: 'info', msg: 'Biology Exam results pending faculty review', time: '1d ago' },
];

export default function FacultyDashboard() {
  const [activeGrade, setActiveGrade] = useState('Grade 10');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Welcome back, Faculty Principal</h1>
          <p className={styles.subtitle}>Department of Sciences & Academic Oversight</p>
        </div>
        <div className={styles.headerActivity}>
           <div className={styles.activeLabel}>
             <div className={styles.pulse}></div> Live System Monitor
           </div>
        </div>
      </header>

      {/* KPI Grid */}
      <section className={styles.kpiGrid}>
        {KPI_CARDS.map((card, i) => (
          <div key={i} className={`glass-card ${styles.kpiCard}`}>
            <div className={styles.kpiHeader}>
              <div className={styles.kpiIcon}>{card.icon}</div>
              <span className={styles.kpiGrowth}>{card.growth}</span>
            </div>
            <div className={styles.kpiInfo}>
              <h3 className={styles.kpiValue}>{card.value}</h3>
              <p className={styles.kpiLabel}>{card.label}</p>
            </div>
          </div>
        ))}
      </section>

      <div className={styles.mainGrid}>
        
        {/* Performance Overview */}
        <div className={styles.leftCol}>
          <div className={`glass-panel ${styles.dashboardPanel}`}>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>Grade Performance Overview</h3>
              <div className={styles.gradeTabs}>
                {['Grade 8', 'Grade 9', 'Grade 10'].map(grade => (
                  <button 
                    key={grade}
                    className={`${styles.gradeTab} ${activeGrade === grade ? styles.activeGrade : ''}`}
                    onClick={() => setActiveGrade(grade)}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.chartArea}>
               <p className={styles.chartLabel}>Subject-wise Average Score (%)</p>
               <div className={styles.barChart}>
                  {[82, 64, 78, 45, 91].map((h, i) => (
                    <div key={i} className={styles.barWrapper}>
                      <div className={styles.bar} style={{ height: `${h}%` }}>
                        <span className={styles.barValue}>{h}%</span>
                      </div>
                      <span className={styles.subjectLabel}>{['Math', 'Phys', 'Chem', 'Bio', 'Comp'][i]}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className={styles.panelFooter}>
               <div className={styles.footerStat}>
                 <span className={styles.fsLabel}>Highest Completion</span>
                 <span className={styles.fsVal}>Computer Science (94%)</span>
               </div>
               <div className={styles.footerStat}>
                 <span className={styles.fsLabel}>Need Review</span>
                 <span className={styles.fsVal}>Biology (45%)</span>
               </div>
            </div>
          </div>

          <div className={`glass-panel ${styles.dashboardPanel} ${styles.mtLarge}`}>
             <div className={styles.panelHeader}>
               <h3 className={styles.panelTitle}>Instructor Activity Feed</h3>
               <button className={styles.viewAll}>Full Logs <ChevronRight size={14} /></button>
             </div>
             <div className={styles.activityList}>
                {[
                  { user: 'Dr. Sarah C.', action: 'published a new test in', target: 'Quantum Mechanics', time: '12m ago' },
                  { user: 'Prof. Mark T.', action: 'uploaded 3 videos to', target: 'Organic Chemistry', time: '45m ago' },
                  { user: 'Michael D.', action: 'marked doubt resolution for', target: 'Algebra I', time: '2h ago' },
                ].map((act, i) => (
                  <div key={i} className={styles.activityItem}>
                    <div className={styles.activityUser}>
                      <div className={styles.miniAvatar}>{act.user[0]}</div>
                      <p><strong>{act.user}</strong> {act.action} <span>{act.target}</span></p>
                    </div>
                    <span className={styles.activityTime}>{act.time}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Alerts & Action Column */}
        <div className={styles.rightCol}>
          <div className={`glass-card ${styles.alertsCard}`}>
            <h3 className={styles.panelTitle}>System Alerts</h3>
            <div className={styles.alertList}>
              {RECENT_ALERTS.map(alert => (
                <div key={alert.id} className={`${styles.alertItem} ${styles[alert.type]}`}>
                  <div className={styles.alertHeader}>
                    <AlertCircle size={16} />
                    <span className={styles.alertTime}>{alert.time}</span>
                  </div>
                  <p className={styles.alertText}>{alert.msg}</p>
                </div>
              ))}
            </div>
            <button className={styles.dismissAll}>Dismiss Non-Critical</button>
          </div>

          <div className={`glass-panel ${styles.quickActions}`}>
             <h3 className={styles.panelTitle}>Management Tools</h3>
             <div className={styles.qaGrid}>
                <button className={styles.qaItem}>
                  <UserCheck size={20} />
                  <span>Verify New Instructors</span>
                </button>
                <button className={styles.qaItem}>
                  <FileText size={20} />
                  <span>Approve Content</span>
                </button>
                <button className={styles.qaItem}>
                  <Clock size={20} />
                  <span>Maintenance Schedule</span>
                </button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
