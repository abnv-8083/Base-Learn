'use client';

import React, { useState } from 'react';
import { 
  Bell, Send, Mail, MessageSquare, 
  Smartphone, AlertCircle, CheckCircle, Clock, 
  Search, Filter, Plus, Trash2, Megaphone
} from 'lucide-react';
import styles from './notifications.module.css';

const LOGS = [
  { id: 'NOT-1', recipient: 'All Students', type: 'Announcement', subject: 'New Physics Course Launched', date: 'Oct 17, 10:00 AM', status: 'Sent', reach: '98%' },
  { id: 'NOT-2', recipient: 'Alex Davidson', type: 'Personal', subject: 'Your subscription expires in 3 days', date: 'Oct 17, 09:15 AM', status: 'Delivered', reach: '100%' },
  { id: 'NOT-3', recipient: 'Instructors', type: 'Platform', subject: 'System Maintenance: Sunday 2 AM', date: 'Oct 16, 08:30 PM', status: 'Queued', reach: '--' },
];

export default function NotificationsCenter() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Notifications Center</h1>
          <p className={styles.subtitle}>Broadcast messages, manage automated alerts, and track communication logs.</p>
        </div>
        <button className={`btn btn-primary ${styles.btnFull}`}>
          <Plus size={18} /> Compose New Notification
        </button>
      </header>

      <div className={styles.mainGrid}>
        
        {/* Left: Compose & Control */}
        <div className={styles.leftCol}>
          
          <div className={`glass-card ${styles.composer}`}>
            <h3 className={styles.panelTitle}><Megaphone size={18} /> Global Announcement</h3>
            <div className={styles.composeForm}>
              <div className={styles.inputGroup}>
                <label>Target Audience</label>
                <select className={styles.select}>
                  <option>All Users</option>
                  <option>Students Only</option>
                  <option>Instructors Only</option>
                  <option>Pro Plan Subscribers</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label>Channels</label>
                <div className={styles.channelGrid}>
                   <label className={styles.channelItem}>
                     <input type="checkbox" defaultChecked />
                     <div className={styles.channelBox}><Bell size={16} /> App</div>
                   </label>
                   <label className={styles.channelItem}>
                     <input type="checkbox" defaultChecked />
                     <div className={styles.channelBox}><Mail size={16} /> Email</div>
                   </label>
                   <label className={styles.channelItem}>
                     <input type="checkbox" />
                     <div className={styles.channelBox}><Smartphone size={16} /> SMS</div>
                   </label>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Message Subject</label>
                <input type="text" placeholder="Updates to your dashboard..." className={styles.input} />
              </div>

              <div className={styles.inputGroup}>
                <label>Message Content</label>
                <textarea placeholder="Write your announcement here..." className={styles.textarea}></textarea>
              </div>

              <button className={`btn btn-primary ${styles.btnFull}`}>
                <Send size={16} /> Send Broadcast
              </button>
            </div>
          </div>

          <div className={`glass-panel ${styles.quickStats}`}>
             <div className={styles.microStat}>
               <span className={styles.statVal}>85k</span>
               <span className={styles.statLabel}>Monthly Emails</span>
             </div>
             <div className={styles.miniDivider}></div>
             <div className={styles.microStat}>
               <span className={styles.statVal}>120k</span>
               <span className={styles.statLabel}>In-App Alerts</span>
             </div>
          </div>

        </div>

        {/* Right: History & Logs */}
        <div className={styles.rightCol}>
          <div className={`glass-card ${styles.historyPanel}`}>
            
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>Notification History</h3>
              <div className={styles.searchBox}>
                <Search size={16} className={styles.searchIcon} />
                <input type="text" placeholder="Search logs..." className={styles.searchInput} />
              </div>
            </div>

            <div className={styles.filtersWrapper}>
               {['all', 'announcements', 'platform', 'automated'].map((t) => (
                 <button 
                  key={t}
                  className={`${styles.filterBtn} ${activeTab === t ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab(t)}
                 >
                   {t.charAt(0).toUpperCase() + t.slice(1)}
                 </button>
               ))}
            </div>

            <div className={styles.logsTableWrapper}>
              <table className={styles.logsTable}>
                <thead>
                  <tr>
                    <th>Recipient</th>
                    <th>Type</th>
                    <th>Subject</th>
                    <th>Sent At</th>
                    <th>Reach</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {LOGS.map((log) => (
                    <tr key={log.id} className={styles.logRow}>
                      <td className={styles.boldText}>{log.recipient}</td>
                      <td><span className={styles.typeTag}>{log.type}</span></td>
                      <td className={styles.subjectText}>{log.subject}</td>
                      <td className={styles.dateText}>{log.date}</td>
                      <td><span className={styles.reachVal}>{log.reach}</span></td>
                      <td>
                        <button className={styles.iconBtn}><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
