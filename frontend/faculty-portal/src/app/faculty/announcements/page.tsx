'use client';

import React, { useState } from 'react';
import { 
  Megaphone, Plus, Search, 
  MoreVertical, Calendar, User, 
  Send, Users, BellRing, Eye
} from 'lucide-react';
import styles from './announcements.module.css';

const ANNOUNCEMENTS = [
  { id: 1, title: 'Annual Science Fair Registration', author: 'Dr. Sarah C.', date: 'Oct 24, 2023', audience: 'All Students', status: 'Active' },
  { id: 2, title: 'New Curriculum Guidelines (Physics)', author: 'Prof. Mark T.', date: 'Oct 20, 2023', audience: 'Instructors', status: 'Draft' },
  { id: 3, title: 'Department Meeting: Q4 Goals', author: 'Principal Office', date: 'Oct 15, 2023', audience: 'All Staff', status: 'Sent' },
];

export default function Announcements() {
  const [filter, setFilter] = useState('All');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Broadcast & Communication</h1>
          <p className={styles.subtitle}>Send urgent notifications, academic updates, and department-wide announcements.</p>
        </div>
        <button className={`btn btn-primary ${styles.createBtn}`}>
          <Plus size={18} /> Compose Announcement
        </button>
      </header>

      {/* Stats Quick View */}
      <div className={styles.statsRow}>
         <div className={`glass-card ${styles.statBox}`}>
            <div className={styles.statIcon} style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
               <BellRing size={20} />
            </div>
            <div>
               <p className={styles.statLabel}>Active Broadcasts</p>
               <h4 className={styles.statValue}>12</h4>
            </div>
         </div>
         <div className={`glass-card ${styles.statBox}`}>
            <div className={styles.statIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)' }}>
               <Users size={20} />
            </div>
            <div>
               <p className={styles.statLabel}>Avg. Reach</p>
               <h4 className={styles.statValue}>98.4%</h4>
            </div>
         </div>
         <div className={`glass-card ${styles.statBox}`}>
            <div className={styles.statIcon} style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#F97316' }}>
               <Eye size={20} />
            </div>
            <div>
               <p className={styles.statLabel}>Open Rate</p>
               <h4 className={styles.statValue}>72%</h4>
            </div>
         </div>
      </div>

      <div className={styles.mainGrid}>
        
        {/* List of Announcements */}
        <div className={styles.listCol}>
           <div className={`glass-panel ${styles.searchBar}`}>
              <div className={styles.searchInner}>
                <Search size={18} className={styles.searchIcon} />
                <input type="text" placeholder="Search by title or author..." className={styles.searchInput} />
              </div>
           </div>

           <div className={`glass-card ${styles.listCard}`}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Announcement</th>
                    <th>Sent To</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {ANNOUNCEMENTS.map(ann => (
                    <tr key={ann.id} className={styles.row}>
                      <td>
                        <div className={styles.titleSection}>
                           <p className={styles.annTitle}>{ann.title}</p>
                           <div className={styles.annAuthor}>
                              <User size={12} /> <span>{ann.author}</span>
                           </div>
                        </div>
                      </td>
                      <td>
                        <span className={styles.audienceTag}>{ann.audience}</span>
                      </td>
                      <td>
                        <div className={styles.dateSection}>
                           <Calendar size={14} /> <span>{ann.date}</span>
                        </div>
                      </td>
                      <td>
                         <span className={`${styles.statusBadge} ${styles[ann.status.toLowerCase()]}`}>
                           {ann.status}
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

        {/* Quick Compose / Recent Activity */}
        <div className={styles.sideCol}>
           <div className={`glass-panel ${styles.composePreview}`}>
              <h3 className={styles.sideTitle}><Send size={18} /> Quick Broadcast</h3>
              <div className={styles.composeForm}>
                 <input type="text" placeholder="Announcement Title" className={styles.input} />
                 <select className={styles.input}>
                    <option>Target: All Students</option>
                    <option>Target: Grade 10 Only</option>
                    <option>Target: Instructors Only</option>
                 </select>
                 <textarea placeholder="Message content..." className={styles.textarea}></textarea>
                 <button className={styles.sendBtn}>Publish Now</button>
              </div>
           </div>

           <div className={`glass-card ${styles.priorityBox}`}>
              <h3 className={styles.sideTitle}><Megaphone size={18} /> Priority Levels</h3>
              <div className={styles.pLevels}>
                 <div className={styles.pItem}>
                    <div className={styles.pDot} style={{ background: 'var(--color-danger)' }}></div>
                    <span>Critical Alert (SMS + Email)</span>
                 </div>
                 <div className={styles.pItem}>
                    <div className={styles.pDot} style={{ background: '#F97316' }}></div>
                    <span>Academic Update (Dashboard)</span>
                 </div>
                 <div className={styles.pItem}>
                    <div className={styles.pDot} style={{ background: 'var(--color-primary)' }}></div>
                    <span>General Info (Optional)</span>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
