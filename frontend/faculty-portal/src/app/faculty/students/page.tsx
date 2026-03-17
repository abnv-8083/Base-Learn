'use client';

import React, { useState } from 'react';
import { 
  Search, Filter, MoreVertical, 
  Mail, Download, UserPlus, 
  AlertCircle, CheckCircle2, Circle
} from 'lucide-react';
import styles from './students.module.css';

const STUDENTS = [
  { id: 1, name: 'Alex Johnson', grade: 'Grade 10', subjects: 5, avgScore: '88%', attendance: '96%', flag: 'star' },
  { id: 2, name: 'Sarah Miller', grade: 'Grade 9', subjects: 4, avgScore: '38%', attendance: '72%', flag: 'risk' },
  { id: 3, name: 'Michael Chen', grade: 'Grade 10', subjects: 6, avgScore: '74%', attendance: '88%', flag: 'normal' },
  { id: 4, name: 'Emily Davis', grade: 'Grade 8', subjects: 4, avgScore: '65%', attendance: '45%', flag: 'disengaged' },
  { id: 5, name: 'James Wilson', grade: 'Grade 10', subjects: 5, avgScore: '92%', attendance: '99%', flag: 'star' },
];

export default function StudentManagement() {
  const [activeTab, setActiveTab] = useState('All Students');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Student Management</h1>
          <p className={styles.subtitle}>Monitor academic progress, attendance, and risk factors across your department.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={`btn btn-secondary ${styles.actionBtn}`}>
            <Download size={18} /> Export List
          </button>
          <button className={`btn btn-primary ${styles.actionBtn}`}>
            <UserPlus size={18} /> Send Department Alert
          </button>
        </div>
      </header>

      {/* Filter Bar */}
      <div className={`glass-panel ${styles.filterBar}`}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input type="text" placeholder="Search by name, ID or grade..." className={styles.searchInput} />
        </div>
        <div className={styles.filters}>
          <select className={styles.select}>
            <option>Grade Level</option>
            <option>Grade 8</option>
            <option>Grade 9</option>
            <option>Grade 10</option>
          </select>
          <select className={styles.select}>
            <option>Performance Band</option>
            <option>Top Performers</option>
            <option>Mid-Range</option>
            <option>Low Performance</option>
          </select>
          <button className={styles.filterBtn}>
            <Filter size={18} /> Filters
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`glass-card ${styles.tableCard}`}>
        <div className={styles.cardTabs}>
           {['All Students', 'At Risk', 'Star Performers', 'Disengaged'].map(tab => (
             <button 
              key={tab}
              className={`${styles.cardTab} ${activeTab === tab ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab)}
             >
               {tab}
             </button>
           ))}
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th><input type="checkbox" className={styles.checkbox} /></th>
              <th>Student Name</th>
              <th>Grade</th>
              <th>Subjects</th>
              <th>Avg Score</th>
              <th>Attendance</th>
              <th>Status Flag</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {STUDENTS.map(student => (
              <tr key={student.id} className={styles.tableRow}>
                <td><input type="checkbox" className={styles.checkbox} /></td>
                <td>
                  <div className={styles.studentInfo}>
                    <div className={styles.avatar}>{student.name.charAt(0)}</div>
                    <span className={styles.studentName}>{student.name}</span>
                  </div>
                </td>
                <td>{student.grade}</td>
                <td>{student.subjects} Subjects</td>
                <td>
                  <span className={`${styles.score} ${parseInt(student.avgScore) < 40 ? styles.lowScore : ''}`}>
                    {student.avgScore}
                  </span>
                </td>
                <td>
                  <div className={styles.attendanceWrapper}>
                    <div className={styles.miniProgress}>
                       <div className={styles.progressFill} style={{ width: student.attendance }}></div>
                    </div>
                    <span>{student.attendance}</span>
                  </div>
                </td>
                <td>
                  <span className={`${styles.statusBadge} ${styles[student.flag]}`}>
                    {student.flag === 'risk' && <AlertCircle size={14} />}
                    {student.flag === 'star' && <CheckCircle2 size={14} />}
                    {student.flag === 'disengaged' && <Circle size={14} />}
                    {student.flag.charAt(0).toUpperCase() + student.flag.slice(1)}
                  </span>
                </td>
                <td>
                  <button className={styles.iconBtn}><MoreVertical size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <footer className={styles.tableFooter}>
          <span className={styles.paginationInfo}>Showing 1-5 of 1,280 students</span>
          <div className={styles.paginationActions}>
            <button disabled className={styles.pageBtn}>Previous</button>
            <button className={styles.pageBtn}>Next</button>
          </div>
        </footer>
      </div>
    </div>
  );
}
