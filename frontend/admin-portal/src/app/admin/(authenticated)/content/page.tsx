'use client';

import React, { useState } from 'react';
import { 
  PlayCircle, Database, Search, Filter, 
  MoreVertical, CheckCircle2, XCircle, AlertTriangle, 
  Eye, Archive, ArrowRightLeft
} from 'lucide-react';
import styles from './content.module.css';

// Mock Data
const COURSES = [
  { id: 'CRS-402', title: 'Advanced Calculus', subject: 'Mathematics', grade: '12th', instructor: 'Prof. Mark Taylor', videos: 45, students: 1204, status: 'Published', created: 'Aug 10, 2025' },
  { id: 'CRS-403', title: 'Intro to Quantum Physics', subject: 'Physics', grade: '11th', instructor: 'Dr. Sarah Connor', videos: 32, students: 890, status: 'Published', created: 'Sep 05, 2025' },
  { id: 'CRS-404', title: 'Organic Chemistry Basics', subject: 'Chemistry', grade: '11th', instructor: 'Emily Chen', videos: 12, students: 0, status: 'Draft', created: 'Oct 15, 2025' },
  { id: 'CRS-405', title: 'World History: WW2', subject: 'Humanities', grade: '10th', instructor: 'Marcus Cole', videos: 28, students: 450, status: 'Archived', created: 'Jan 20, 2024' },
];

const MODERATION_QUEUE = [
  { id: 'MOD-001', videoTitle: 'Lecture 12: Differentiation', type: 'Flagged (Audio Issue)', instructor: 'Prof. Mark Taylor', time: '2 hours ago' },
  { id: 'MOD-002', videoTitle: 'Chapter 4 Introduction', type: 'New Upload', instructor: 'Dr. Rajesh Kumar', time: '5 hours ago' },
];

export default function CourseContentManagement() {
  const [activeTab, setActiveTab] = useState('courses');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Published': return <span className={`${styles.badge} ${styles.badgeSuccess}`}>{status}</span>;
      case 'Draft': return <span className={`${styles.badge} ${styles.badgeWarning}`}>{status}</span>;
      case 'Archived': return <span className={`${styles.badge} ${styles.badgeNeutral}`}>{status}</span>;
      default: return null;
    }
  };

  return (
    <div className={styles.container}>
      
      {/* Header */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Content Management</h1>
          <p className={styles.subtitle}>Oversee courses, video assets, and the moderation queue.</p>
        </div>
        <div className={styles.statsRow}>
          <div className={styles.microStat}>
            <PlayCircle size={16} className={styles.statIcon} />
            <div className={styles.statText}>
              <span className={styles.statVal}>12,450</span>
              <span className={styles.statLabel}>Total Videos</span>
            </div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.microStat}>
            <Database size={16} className={styles.statIcon} />
            <div className={styles.statText}>
              <span className={styles.statVal}>4.2 TB</span>
              <span className={styles.statLabel}>Storage Used</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid: Content Area & Moderation Sidebar */}
      <div className={styles.mainGrid}>
        
        {/* Left Col: Course List */}
        <div className={`glass-card ${styles.tableCard}`}>
          
          <div className={styles.toolbar}>
            <div className={styles.tabsWrapper}>
              <button 
                className={`${styles.tab} ${activeTab === 'courses' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('courses')}
              >
                All Courses
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'deleted' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('deleted')}
              >
                Recycle Bin
              </button>
            </div>
            
            <div className={styles.tableActions}>
              <div className={styles.searchBox}>
                <Search size={16} className={styles.searchIcon} />
                <input type="text" placeholder="Search courses..." className={styles.searchInput} />
              </div>
              <button className={styles.filterBtn}><Filter size={16} /> Filters</button>
            </div>
          </div>

          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Course Hub</th>
                  <th>Analytics</th>
                  <th>Status</th>
                  <th>Created Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {COURSES.map(course => (
                  <tr key={course.id} className={styles.row}>
                    <td>
                      <div className={styles.courseInfo}>
                        <div className={styles.courseIconWrapper}>
                          <PlayCircle size={20} />
                        </div>
                        <div className={styles.courseText}>
                          <p className={styles.courseTitle}>{course.title}</p>
                          <p className={styles.courseMeta}>{course.id} • {course.subject} • {course.grade}</p>
                          <p className={styles.instructorMeta}>By {course.instructor}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={styles.analyticsCell}>
                        <div className={styles.analyticsLine}><span>{course.videos}</span> videos</div>
                        <div className={styles.analyticsLine}><span>{course.students}</span> students</div>
                      </div>
                    </td>
                    <td>{getStatusBadge(course.status)}</td>
                    <td className={styles.dateCell}>{course.created}</td>
                    <td className={styles.actionCell}>
                      <button className={styles.iconBtn} title="View Contents"><Eye size={18} /></button>
                      <button className={styles.iconBtn} title="Reassign Instructor"><ArrowRightLeft size={18} /></button>
                      <button className={styles.iconBtn} title="Archive Course"><Archive size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* Right Col: Moderation Queue */}
        <div className={styles.sidebar}>
          
          <div className={`glass-panel ${styles.moderationPanel}`}>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>
                Moderation Queue 
                <span className={styles.queueCount}>2 Pending</span>
              </h3>
            </div>
            
            <div className={styles.queueList}>
              {MODERATION_QUEUE.map((item, i) => (
                <div key={i} className={styles.queueItem}>
                  <div className={styles.queueItemHeader}>
                    {item.type.includes('Flagged') ? (
                      <span className={styles.flagBadge}><AlertTriangle size={12} /> {item.type}</span>
                    ) : (
                      <span className={styles.newBadge}>New Upload</span>
                    )}
                    <span className={styles.timeLabel}>{item.time}</span>
                  </div>
                  
                  <p className={styles.queueVideoTitle}>{item.videoTitle}</p>
                  <p className={styles.queueInstructor}>{item.instructor}</p>
                  
                  <div className={styles.queueActions}>
                    <button className={styles.btnPreview}><PlayCircle size={14} /> Preview</button>
                    <div className={styles.approveReject}>
                      <button className={styles.btnApprove}><CheckCircle2 size={16} /></button>
                      <button className={styles.btnReject}><XCircle size={16} /></button>
                    </div>
                  </div>
                </div>
              ))}

              {MODERATION_QUEUE.length === 0 && (
                <div className={styles.emptyQueue}>Queue is clear! 🎉</div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
