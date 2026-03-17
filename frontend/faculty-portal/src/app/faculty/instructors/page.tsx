'use client';

import React from 'react';
import { 
  Users, Video, Star, Send, 
  MessageSquare, BarChart2, Plus, 
  MoreVertical, CheckCircle, Clock
} from 'lucide-react';
import styles from './instructors.module.css';

const INSTRUCTORS = [
  { id: 1, name: 'Prof. Mark Taylor', subjects: ['Physics', 'Math'], students: 342, rating: 4.8, classes: 42, status: 'Active' },
  { id: 2, name: 'Dr. Sarah Connor', subjects: ['Biology'], students: 128, rating: 4.9, classes: 28, status: 'Active' },
  { id: 3, name: 'Michael Davis', subjects: ['Chemistry'], students: 215, rating: 4.5, classes: 35, status: 'Active' },
  { id: 4, name: 'Anna Lee', subjects: ['Calculus'], students: 89, rating: 3.8, classes: 12, status: 'Reviewing' },
];

export default function InstructorManagement() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Instructor Management</h1>
          <p className={styles.subtitle}>Manage your department's teaching staff, review performance, and onboarding.</p>
        </div>
        <button className={`btn btn-primary ${styles.actionBtn}`}>
          <Plus size={18} /> Invite New Instructor
        </button>
      </header>

      {/* Overview Stats */}
      <section className={styles.statsGrid}>
        <div className={`glass-card ${styles.statBox}`}>
          <div className={styles.statIcon}><Users size={20} /></div>
          <div>
            <span className={styles.statLabel}>Total Staff</span>
            <h3 className={styles.statVal}>28 Professionals</h3>
          </div>
        </div>
        <div className={`glass-card ${styles.statBox}`}>
          <div className={styles.statIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)' }}>
            <Video size={20} />
          </div>
          <div>
            <span className={styles.statLabel}>Avg Upload Rate</span>
            <h3 className={styles.statVal}>8.4 Videos/Wk</h3>
          </div>
        </div>
        <div className={`glass-card ${styles.statBox}`}>
           <div className={styles.statIcon} style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)' }}>
            <Star size={20} />
          </div>
          <div>
            <span className={styles.statLabel}>Dept. Satisfaction</span>
            <h3 className={styles.statVal}>4.7 Average</h3>
          </div>
        </div>
      </section>

      {/* Instructor Grid */}
      <div className={styles.instructorGrid}>
        {INSTRUCTORS.map(instructor => (
          <div key={instructor.id} className={`glass-card ${styles.instructorCard}`}>
            <div className={styles.cardTop}>
              <div className={styles.instructorMain}>
                <div className={styles.avatarLarge}>{instructor.name.split(' ').map(n=>n[0]).join('')}</div>
                <div>
                  <h3 className={styles.instructorName}>{instructor.name}</h3>
                  <div className={styles.subjectTags}>
                    {instructor.subjects.map(s => <span key={s} className={styles.subjectTag}>{s}</span>)}
                  </div>
                </div>
              </div>
              <button className={styles.moreBtn}><MoreVertical size={18} /></button>
            </div>

            <div className={styles.cardStats}>
               <div className={styles.miniStat}>
                 <span className={styles.msLabel}>Videos</span>
                 <span className={styles.msVal}>{instructor.classes}</span>
               </div>
               <div className={styles.miniStat}>
                 <span className={styles.msLabel}>Students</span>
                 <span className={styles.msVal}>{instructor.students}</span>
               </div>
               <div className={styles.miniStat}>
                 <span className={styles.msLabel}>Rating</span>
                 <span className={styles.msVal}>{instructor.rating}⭐</span>
               </div>
            </div>

            <div className={styles.statusRow}>
               <span className={`${styles.statusBadge} ${instructor.status === 'Active' ? styles.active : styles.review}`}>
                 {instructor.status === 'Active' ? <CheckCircle size={14} /> : <Clock size={14} />}
                 {instructor.status}
               </span>
               <div className={styles.cardActions}>
                 <button className={styles.actionIconButton} title="Message"><Send size={16} /></button>
                 <button className={styles.actionIconButton} title="Analytics"><BarChart2 size={16} /></button>
               </div>
            </div>

            <button className={styles.viewProfileBtn}>View Detailed Profile</button>
          </div>
        ))}
      </div>
    </div>
  );
}
