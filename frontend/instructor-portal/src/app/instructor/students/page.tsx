'use client';

import React, { useState } from 'react';
import { 
  Users, Search, Filter, 
  MoreVertical, Calendar, Eye, 
  MessageSquare, BookOpen, 
  ChevronRight, ArrowUpRight, 
  UserPlus, Download
} from 'lucide-react';
import styles from './students.module.css';

const STUDENTS = [
  { id: 1, name: 'Aditya Raj', grade: '10th', enrolled: 'Aug 12, 2026', classesWatched: '38/40', avgScore: '94%', lastSeen: '2h ago', status: 'Active' },
  { id: 2, name: 'Sneha Kumari', grade: '9th', enrolled: 'Aug 15, 2026', classesWatched: '32/40', avgScore: '91%', lastSeen: '5h ago', status: 'Active' },
  { id: 3, name: 'Rohan Verma', grade: '10th', enrolled: 'Aug 10, 2026', classesWatched: '28/40', avgScore: '88%', lastSeen: '1d ago', status: 'Active' },
  { id: 4, name: 'Priya Singh', grade: '9th', enrolled: 'Sep 01, 2026', classesWatched: '15/40', avgScore: '76%', lastSeen: '3d ago', status: 'Inactive' },
  { id: 5, name: 'Ishan Gupta', grade: '10th', enrolled: 'Sep 05, 2026', classesWatched: '40/40', avgScore: '98%', lastSeen: 'Just now', status: 'Active' },
];

export default function MyStudents() {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>My Students</h1>
          <p className={styles.subtitle}>Monitor individual student progress and engagement levels.</p>
        </div>
        <div className={styles.headerActions}>
           <button className={styles.exportBtn}><Download size={18} /> Export List</button>
           <button className={`btn btn-primary ${styles.addBtn}`}><UserPlus size={18} /> Add Student</button>
        </div>
      </header>

      {/* Filter Row */}
      <div className={styles.filterBar}>
         <div className={styles.tabs}>
            {['All', 'Active', 'Inactive', 'Top Performers'].map(tab => (
              <button 
                key={tab}
                className={clsx(styles.tab, activeFilter === tab && styles.activeTab)}
                onClick={() => setActiveFilter(tab)}
              >
                {tab}
              </button>
            ))}
         </div>
         <div className={styles.searchBox}>
            <Search size={16} color="var(--color-text-muted)" />
            <input type="text" placeholder="Search by name or grade..." className={styles.searchInput} />
         </div>
      </div>

      {/* Students Table */}
      <div className={`glass-panel ${styles.tableArea}`}>
         <table className={styles.table}>
            <thead>
               <tr>
                  <th>Student Name</th>
                  <th>Grade</th>
                  <th>Enrolled Date</th>
                  <th>Classes Watched</th>
                  <th>Avg Score</th>
                  <th>Last Seen</th>
                  <th>Status</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {STUDENTS.map(student => (
                 <tr key={student.id}>
                   <td>
                      <div className={styles.studentCell}>
                         <div className={styles.avatar}>{student.name.charAt(0)}</div>
                         <div>
                            <p className={styles.studentName}>{student.name}</p>
                            <button className={styles.viewProfileBtn}>View Profile</button>
                         </div>
                      </div>
                   </td>
                   <td><span className={styles.gradeTag}>{student.grade}</span></td>
                   <td><span className={styles.dateText}>{student.enrolled}</span></td>
                   <td>
                      <div className={styles.progressCell}>
                         <span className={styles.progressText}>{student.classesWatched}</span>
                         <div className={styles.miniProgress}>
                            <div className={styles.progressFill} style={{ width: `${(parseInt(student.classesWatched.split('/')[0]) / 40) * 100}%` }}></div>
                         </div>
                      </div>
                   </td>
                   <td><span className={styles.scoreText}>{student.avgScore}</span></td>
                   <td><span className={styles.lastSeenText}>{student.lastSeen}</span></td>
                   <td>
                      <span className={clsx(
                        styles.statusBadge,
                        student.status === 'Active' ? styles.statusActive : styles.statusInactive
                      )}>
                        {student.status}
                      </span>
                   </td>
                   <td>
                      <div className={styles.actionCell}>
                         <button className={styles.msgBtn}><MessageSquare size={16} /></button>
                         <button className={styles.moreBtn}><MoreVertical size={16} /></button>
                      </div>
                   </td>
                 </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
}

function clsx(...args: any[]) {
  return args.filter(Boolean).join(' ');
}
