'use client';

import React, { useState } from 'react';
import { 
  Plus, Search, Filter, 
  MoreVertical, BookOpen, Users, 
  Clock, CheckCircle2, Archive, 
  Edit3, Trash2, Eye
} from 'lucide-react';
import styles from './courses.module.css';

const COURSES = [
  { 
    id: 1, 
    title: 'Advanced Thermodynamics', 
    subject: 'Physics', 
    grade: '10th', 
    enrolled: 124, 
    completion: '68%', 
    status: 'Published',
    chapters: 12,
    duration: '18h 45m'
  },
  { 
    id: 2, 
    title: 'Quantum Mechanics Basics', 
    subject: 'Physics', 
    grade: '10th', 
    enrolled: 85, 
    completion: '42%', 
    status: 'Draft',
    chapters: 8,
    duration: '12h 20m'
  },
  { 
    id: 3, 
    title: 'Cellular Biology Essentials', 
    subject: 'Biology', 
    grade: '9th', 
    enrolled: 310, 
    completion: '85%', 
    status: 'Published',
    chapters: 15,
    duration: '22h 10m'
  },
];

export default function MyCourses() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>My Courses</h1>
          <p className={styles.subtitle}>Create, manage, and monitor your academic content library.</p>
        </div>
        <button className={`btn btn-primary ${styles.addBtn}`}>
           <Plus size={18} /> Create New Course
        </button>
      </header>

      {/* Filter Bar */}
      <div className={styles.filterRow}>
         <div className={styles.tabs}>
            {['All', 'Published', 'Drafts', 'Archived'].map(tab => (
              <button 
                key={tab}
                className={clsx(styles.tab, activeTab === tab && styles.activeTab)}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
         </div>
         <div className={styles.searchBox}>
            <div className={styles.searchInner}>
              <Search size={16} className={styles.searchIcon} />
              <input type="text" placeholder="Search courses..." className={styles.searchInput} />
            </div>
            <button className={styles.filterBtn}><Filter size={16} /> Filters</button>
         </div>
      </div>

      {/* Course Grid */}
      <div className={styles.courseGrid}>
        {COURSES.map(course => (
          <div key={course.id} className={`glass-card ${styles.courseCard}`}>
            <div className={styles.cardHeader}>
               <div className={styles.courseIcon}><BookOpen size={20} /></div>
               <div className={styles.statusBadge} data-status={course.status.toLowerCase()}>
                 {course.status}
               </div>
               <button className={styles.moreBtn}><MoreVertical size={18} /></button>
            </div>
            
            <div className={styles.cardBody}>
               <div className={styles.gradeTag}>{course.grade} Grade</div>
               <h3 className={styles.courseTitle}>{course.title}</h3>
               <p className={styles.subject}>{course.subject}</p>
               
               <div className={styles.metrics}>
                  <div className={styles.metricItem}>
                    <Users size={14} />
                    <span>{course.enrolled} Enrolled</span>
                  </div>
                  <div className={styles.metricItem}>
                    <Clock size={14} />
                    <span>{course.duration}</span>
                  </div>
               </div>

               <div className={styles.progressSection}>
                  <div className={styles.progressLabel}>
                    <span>Avg. Completion</span>
                    <span>{course.completion}</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: course.completion }}></div>
                  </div>
               </div>
            </div>

            <div className={styles.cardActions}>
               <button className={styles.actionBtn}><Edit3 size={16} /> Edit</button>
               <button className={styles.actionBtn}><BarChart3 size={16} /> Stats</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const BarChart3 = (props: any) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
)

function clsx(...args: any[]) {
  return args.filter(Boolean).join(' ');
}
