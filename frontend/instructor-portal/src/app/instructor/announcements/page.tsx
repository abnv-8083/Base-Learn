'use client';

import React, { useState } from 'react';
import { 
  Megaphone, Plus, Search, 
  MoreVertical, Calendar, Users, 
  Send, BellRing, Eye, 
  AlertTriangle, Filter, CheckCircle2
} from 'lucide-react';
import styles from './announcements.module.css';

const ANNOUNCEMENTS = [
  { id: 1, title: 'Upcoming Mid-term Physics Assessment', target: 'Grade 10', date: 'Oct 15, 2026', readRate: '94%', urgency: 'Urgent' },
  { id: 2, title: 'New Reference Material: Thermodynamics PPT', target: 'All Students', date: 'Oct 12, 2026', readRate: '82%', urgency: 'Normal' },
  { id: 3, title: 'Extra Class Scheduled for Saturday', target: 'Grade 9', date: 'Oct 10, 2026', readRate: '75%', urgency: 'Important' },
];

export default function Announcements() {
  const [showCreator, setShowCreator] = useState(false);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Announcements</h1>
          <p className={styles.subtitle}>Broadcast critical updates and learning materials to your students.</p>
        </div>
        <button className={`btn btn-primary ${styles.addBtn}`} onClick={() => setShowCreator(true)}>
           <Plus size={18} /> New Broadcast
        </button>
      </header>

      <div className={styles.statsRow}>
         <div className={`glass-card ${styles.miniStat}`}>
            <p className={styles.msLabel}>Sent this Month</p>
            <p className={styles.msVal}>12</p>
         </div>
         <div className={`glass-card ${styles.miniStat}`}>
            <p className={styles.msLabel}>Avg. Read Rate</p>
            <p className={styles.msVal}>84%</p>
         </div>
         <div className={`glass-card ${styles.miniStat}`}>
            <p className={styles.msLabel}>Scheduled</p>
            <p className={styles.msVal}>2</p>
         </div>
      </div>

      {showCreator && (
        <div className={`glass-panel ${styles.creatorOverlay}`}>
           <div className={styles.creatorHeader}>
              <h3 className={styles.creatorTitle}>Create New Announcement</h3>
              <button className={styles.closeBtn} onClick={() => setShowCreator(false)}>&times;</button>
           </div>
           <div className={styles.creatorForm}>
              <div className={styles.inputGroup}>
                 <label>Announcement Title</label>
                 <input type="text" placeholder="e.g. Change in Class Timing" className={styles.input} />
              </div>
              <div className={styles.formRow}>
                 <div className={styles.inputGroup}>
                    <label>Target Audience</label>
                    <select className={styles.select}>
                       <option>All Students</option>
                       <option>Grade 8</option>
                       <option>Grade 9</option>
                       <option>Grade 10</option>
                    </select>
                 </div>
                 <div className={styles.inputGroup}>
                    <label>Urgency Level</label>
                    <select className={styles.select}>
                       <option>Normal</option>
                       <option>Important</option>
                       <option>Urgent</option>
                    </select>
                 </div>
              </div>
              <div className={styles.inputGroup}>
                 <label>Message Body</label>
                 <textarea placeholder="Write your message here..." className={styles.textarea}></textarea>
              </div>
              <div className={styles.creatorFooter}>
                 <button className={styles.scheduleBtn}><Calendar size={16} /> Schedule</button>
                 <button className={`btn btn-primary ${styles.sendBtn}`}>
                    Broadcast Now <Send size={16} />
                 </button>
              </div>
           </div>
        </div>
      )}

      <div className={`glass-panel ${styles.listArea}`}>
         <div className={styles.listNav}>
            <div className={styles.tabs}>
               <button className={clsx(styles.tab, styles.activeTab)}>Sent Announcements</button>
               <button className={styles.tab}>Scheduled</button>
            </div>
            <div className={styles.searchBox}>
               <Search size={16} />
               <input type="text" placeholder="Search history..." />
            </div>
         </div>

         <div className={styles.historyTable}>
            <table className={styles.table}>
               <thead>
                  <tr>
                     <th>Announcement Title</th>
                     <th>Target</th>
                     <th>Sent Date</th>
                     <th>Read Rate</th>
                     <th>Urgency</th>
                     <th>Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {ANNOUNCEMENTS.map(ann => (
                    <tr key={ann.id}>
                      <td>
                         <div className={styles.titleCell}>
                            <div className={styles.annIcon}><Megaphone size={16} /></div>
                            <span className={styles.annTitleText}>{ann.title}</span>
                         </div>
                      </td>
                      <td><span className={styles.targetTag}>{ann.target}</span></td>
                      <td><span className={styles.dateText}>{ann.date}</span></td>
                      <td>
                         <div className={styles.readRateCell}>
                            <span className={styles.rateVal}>{ann.readRate}</span>
                            <div className={styles.rateBar}><div className={styles.rateFill} style={{width: ann.readRate}}></div></div>
                         </div>
                      </td>
                      <td>
                         <span className={clsx(
                           styles.urgencyBadge,
                           ann.urgency === 'Urgent' ? styles.urgUrgent : ann.urgency === 'Important' ? styles.urgImp : styles.urgNormal
                         )}>
                           {ann.urgency}
                         </span>
                      </td>
                      <td>
                         <div className={styles.actionCell}>
                            <button className={styles.viewBtn}><Eye size={16} /></button>
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
