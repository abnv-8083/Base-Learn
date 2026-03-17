'use client';

import React, { useState } from 'react';
import { 
  Plus, Calendar, Layout, 
  ChevronRight, MoreHorizontal, User,
  CheckCircle2, Clock, BookOpen, Filter
} from 'lucide-react';
import styles from './curriculum.module.css';

const COLUMNS = [
  { id: 'planned', title: 'Planned', count: 3 },
  { id: 'in-progress', title: 'In Progress', count: 2 },
  { id: 'review', title: 'Under Review', count: 4 },
  { id: 'published', title: 'Published', count: 12 },
];

const TOPICS = [
  { id: 1, title: 'Calculus: Integration', instructor: 'Prof. Mark T.', status: 'planned', grade: 'Grade 10' },
  { id: 2, title: 'Cellular Respiration', instructor: 'Dr. Sarah C.', status: 'in-progress', grade: 'Grade 9' },
  { id: 3, title: 'Quantum Entanglement', instructor: 'Prof. Mark T.', status: 'review', grade: 'Grade 10' },
  { id: 4, title: 'Basics of Algebra', instructor: 'Michael D.', status: 'published', grade: 'Grade 8' },
];

export default function CurriculumPlanner() {
  const [view, setView] = useState('Kanban');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Curriculum Planner</h1>
          <p className={styles.subtitle}>Strategize department curriculum, assign instructors to topics, and track delivery progress.</p>
        </div>
        <div className={styles.headerActions}>
           <div className={styles.viewToggle}>
              <button 
                className={`${styles.toggleBtn} ${view === 'Kanban' ? styles.activeToggle : ''}`}
                onClick={() => setView('Kanban')}
              >
                <Layout size={16} /> Kanban
              </button>
              <button 
                className={`${styles.toggleBtn} ${view === 'Timeline' ? styles.activeToggle : ''}`}
                onClick={() => setView('Timeline')}
              >
                <Calendar size={16} /> Timeline
              </button>
           </div>
           <button className={`btn btn-primary ${styles.addBtn}`}>
             <Plus size={18} /> New Chapter
           </button>
        </div>
      </header>

      {/* Subject Filter Bar */}
      <div className={`glass-panel ${styles.filterBar}`}>
         <div className={styles.filters}>
            <select className={styles.select}>
               <option>All Subjects</option>
               <option>Physics</option>
               <option>Biology</option>
               <option>Math</option>
            </select>
            <select className={styles.select}>
               <option>All Grades</option>
               <option>Grade 8</option>
               <option>Grade 9</option>
               <option>Grade 10</option>
            </select>
         </div>
         <div className={styles.searchBox}>
            <Filter size={16} />
            <span>Advanced Search</span>
         </div>
      </div>

      {/* Kanban Board */}
      <div className={styles.board}>
        {COLUMNS.map(col => (
          <div key={col.id} className={styles.column}>
            <div className={styles.columnHeader}>
              <h3 className={styles.columnTitle}>{col.title}</h3>
              <span className={styles.columnCount}>{col.count}</span>
            </div>
            
            <div className={styles.cardList}>
              {TOPICS.filter(t => t.status === col.id).map(topic => (
                <div key={topic.id} className={`glass-card ${styles.topicCard}`}>
                  <div className={styles.cardTop}>
                    <span className={styles.gradeTag}>{topic.grade}</span>
                    <button className={styles.iconBtn}><MoreHorizontal size={16} /></button>
                  </div>
                  <h4 className={styles.topicTitle}>{topic.title}</h4>
                  
                  <div className={styles.cardFooter}>
                    <div className={styles.instructor}>
                      <User size={14} />
                      <span>{topic.instructor}</span>
                    </div>
                    {col.id === 'published' ? (
                      <CheckCircle2 size={16} color="var(--color-success)" />
                    ) : (
                      <Clock size={16} color="var(--color-text-muted)" />
                    )}
                  </div>
                </div>
              ))}
              <button className={styles.addCardBtn}>+ Add Topic</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
