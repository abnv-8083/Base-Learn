'use client';

import React, { useState } from 'react';
import { 
  BookOpen, CheckCircle2, AlertTriangle, 
  Eye, FileCheck, Filter, Search, 
  MoreVertical, PlayCircle, ClipboardList
} from 'lucide-react';
import styles from './courses.module.css';

const COURSES = [
  { id: 1, title: 'Quantum Mechanics II', subject: 'Physics', instructor: 'Prof. Mark T.', enrolled: 124, progress: '85%', status: 'Published' },
  { id: 2, title: 'Cell Biology Basics', subject: 'Biology', instructor: 'Dr. Sarah C.', enrolled: 310, progress: '62%', status: 'Active' },
  { id: 3, title: 'Organic Synthesis', subject: 'Chemistry', instructor: 'Michael Davis', enrolled: 89, progress: '40%', status: 'Update Needed' },
];

export default function CourseOversight() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Course Oversight</h1>
          <p className={styles.subtitle}>Review curriculum compliance, manage content moderation, and monitor course health.</p>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.pendingBadge}>
             <AlertTriangle size={16} />
             <span>4 Videos Pending Review</span>
          </div>
        </div>
      </header>

      {/* View Toggles */}
      <div className={styles.viewNav}>
         {['Overview', 'Moderation Queue', 'Curriculum Coverage'].map(tab => (
           <button 
            key={tab}
            className={`${styles.navItem} ${activeTab === tab ? styles.activeNav : ''}`}
            onClick={() => setActiveTab(tab)}
           >
             {tab}
           </button>
         ))}
      </div>

      <div className={styles.mainGrid}>
        
        {/* Main List Column */}
        <div className={styles.listCol}>
           <div className={`glass-panel ${styles.searchBar}`}>
              <div className={styles.searchInner}>
                <Search size={18} className={styles.searchIcon} />
                <input type="text" placeholder="Search courses or instructors..." className={styles.searchInput} />
              </div>
              <button className={styles.filterBtn}><Filter size={18} /> Filters</button>
           </div>

           <div className={`glass-card ${styles.courseListCard}`}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Course Title</th>
                    <th>Instructor</th>
                    <th>Enrollment</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {COURSES.map(course => (
                    <tr key={course.id} className={styles.row}>
                      <td>
                        <div className={styles.courseHeader}>
                          <div className={styles.courseIcon}><BookOpen size={16} /></div>
                          <div>
                            <p className={styles.cTitle}>{course.title}</p>
                            <span className={styles.cSub}>{course.subject}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={styles.instructorName}>{course.instructor}</span>
                      </td>
                      <td>
                        <div className={styles.enrolledInfo}>
                          <span className={styles.count}>{course.enrolled} Students</span>
                          <div className={styles.progressTrack}>
                            <div className={styles.progressFill} style={{ width: course.progress }}></div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`${styles.statusBadge} ${course.status === 'Published' ? styles.sPublished : styles.sActive}`}>
                          {course.status}
                        </span>
                      </td>
                      <td>
                        <button className={styles.iconBtn}><MoreVertical size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>

        {/* Oversight Side Column */}
        <div className={styles.sideCol}>
           <div className={`glass-card ${styles.oversightBox}`}>
              <h3 className={styles.boxTitle}><ClipboardList size={18} /> Review Checklist</h3>
              <div className={styles.checkList}>
                 <div className={styles.checkItem}>
                   <CheckCircle2 size={16} className={styles.done} />
                   <span>Quality Guidelines Met</span>
                 </div>
                 <div className={styles.checkItem}>
                   <CheckCircle2 size={16} className={styles.done} />
                   <span>Caption Accuracy</span>
                 </div>
                 <div className={styles.checkItem}>
                   <Circle className={styles.todo} size={16} />
                   <span>Syllabus Compliance</span>
                 </div>
              </div>
           </div>

           <div className={`glass-panel ${styles.moderationCard}`}>
              <div className={styles.modHeader}>
                <h3 className={styles.boxTitle}>Next in Queue</h3>
                <span className={styles.priorityLabel}>Urgent</span>
              </div>
              <div className={styles.videoPreview}>
                <div className={styles.previewImage}>
                  <PlayCircle size={32} color="white" />
                </div>
                <div className={styles.previewInfo}>
                  <p className={styles.vTitle}>Intro to Thermodynamics</p>
                  <p className={styles.vMeta}>Mark Taylor • 18m 24s</p>
                </div>
              </div>
              <div className={styles.actionRow}>
                <button className={styles.rejectBtn}>Request Edits</button>
                <button className={styles.approveBtn}><FileCheck size={16} /> Approve</button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}

const Circle = (props: any) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
)
