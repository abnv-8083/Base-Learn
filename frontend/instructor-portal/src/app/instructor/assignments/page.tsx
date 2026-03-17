'use client';

import React, { useState } from 'react';
import { 
  ClipboardList, Plus, Search, 
  MoreVertical, Calendar, Users, 
  FileText, CheckCircle2, Clock, 
  Filter, ArrowRight
} from 'lucide-react';
import styles from './assignments.module.css';

const ASSIGNMENTS = [
  { 
    id: 1, 
    title: 'Thermodynamics Problem Set', 
    subject: 'Physics', 
    grade: '10th', 
    due: 'Oct 24, 2026', 
    submissions: '85/124', 
    avgScore: '72%', 
    status: 'Active'
  },
  { 
    id: 2, 
    title: 'Cell Division Essay', 
    subject: 'Biology', 
    grade: '9th', 
    due: 'Oct 28, 2026', 
    submissions: '42/310', 
    avgScore: 'N/A', 
    status: 'Active'
  },
  { 
    id: 3, 
    title: 'Chemical Reactions Quiz', 
    subject: 'Chemistry', 
    grade: '10th', 
    due: 'Oct 15, 2026', 
    submissions: '124/124', 
    avgScore: '84%', 
    status: 'Archived'
  },
];

export default function AssignmentsManagement() {
  const [activeTab, setActiveTab] = useState('Active');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Assignments Management</h1>
          <p className={styles.subtitle}>Create tasks, review submissions, and provide academic feedback.</p>
        </div>
        <button className={`btn btn-primary ${styles.addBtn}`}>
           <Plus size={18} /> Create Assignment
        </button>
      </header>

      {/* Stats Bar */}
      <div className={styles.statsBar}>
         <div className={styles.statLine}>
            <span className={styles.statVal}>12</span>
            <span className={styles.statLab}>Active Tasks</span>
         </div>
         <div className={styles.statDivider} />
         <div className={styles.statLine}>
            <span className={styles.statVal}>342</span>
            <span className={styles.statLab}>Pending Reviews</span>
         </div>
         <div className={styles.statDivider} />
         <div className={styles.statLine}>
            <span className={styles.statVal}>88%</span>
            <span className={styles.statLab}>Submission Rate</span>
         </div>
      </div>

      {/* Table Section */}
      <div className={`glass-panel ${styles.tableArea}`}>
         <div className={styles.tableNav}>
            <div className={styles.tabs}>
              {['Active', 'Drafts', 'Archived'].map(tab => (
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
               <Search size={16} color="var(--color-text-muted)" />
               <input type="text" placeholder="Search assignments..." className={styles.tableSearch} />
            </div>
         </div>

         <div className={styles.tableWrapper}>
            <table className={styles.table}>
               <thead>
                  <tr>
                     <th>Assignment Title</th>
                     <th>Grade</th>
                     <th>Due Date</th>
                     <th>Submissions</th>
                     <th>Avg Score</th>
                     <th>Status</th>
                     <th>Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {ASSIGNMENTS.map((asn) => (
                    <tr key={asn.id}>
                      <td>
                        <div className={styles.asnTitleCell}>
                           <div className={styles.asnIcon}><FileText size={16} /></div>
                           <div>
                              <p className={styles.asnTitleText}>{asn.title}</p>
                              <p className={styles.asnSubject}>{asn.subject}</p>
                           </div>
                        </div>
                      </td>
                      <td><span className={styles.gradeBadge}>{asn.grade}</span></td>
                      <td>
                        <div className={styles.dueCell}>
                           <Calendar size={14} />
                           {asn.due}
                        </div>
                      </td>
                      <td>
                        <div className={styles.subCell}>
                           <Users size={14} />
                           {asn.submissions}
                        </div>
                      </td>
                      <td><span className={styles.scoreText}>{asn.avgScore}</span></td>
                      <td>
                        <span className={clsx(
                          styles.statusBadge,
                          asn.status === 'Active' ? styles.statusActive : styles.statusArchived
                        )}>
                          {asn.status}
                        </span>
                      </td>
                      <td>
                        <div className={styles.actionCell}>
                           <button className={styles.reviewBtn}>Review <ArrowRight size={14} /></button>
                           <button className={styles.moreBtn}><MoreVertical size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}

function clsx(...args: any[]) {
  return args.filter(Boolean).join(' ');
}
