'use client';

import React, { useState } from 'react';
import { 
  Beaker, Plus, Search, 
  Settings, Layers, Eye, 
  CheckCircle2, Clock, Trash2, 
  GripVertical, Image as ImageIcon,
  ChevronRight, ArrowRight, Save
} from 'lucide-react';
import styles from './tests.module.css';

const TESTS = [
  { id: 1, title: 'Mid-term Physics Assessment', subject: 'Physics', grade: '10th', date: 'Oct 12, 2026', avgScore: '82%', questions: 25 },
  { id: 2, title: 'Cell Biology Quick Quiz', subject: 'Biology', grade: '9th', date: 'Oct 18, 2026', avgScore: '75%', questions: 10 },
  { id: 3, title: 'Organic Chemistry Final', subject: 'Chemistry', grade: '10th', date: 'Scheduled', avgScore: 'N/A', questions: 40 },
];

export default function TestsQuizzesBuilder() {
  const [view, setView] = useState('list'); // 'list' or 'builder'
  const [builderStep, setBuilderStep] = useState(1);

  return (
    <div className={styles.container}>
      {view === 'list' ? (
        <>
          <header className={styles.header}>
            <div>
              <h1 className={styles.title}>Tests & Quizzes Builder</h1>
              <p className={styles.subtitle}>Design rigorous assessments and monitor student performance trends.</p>
            </div>
            <button className={`btn btn-primary ${styles.addBtn}`} onClick={() => setView('builder')}>
               <Plus size={18} /> Create New Test
            </button>
          </header>

          <div className={styles.statsRow}>
             <div className={`glass-card ${styles.miniStat}`}>
                <p className={styles.msLabel}>Tests Created</p>
                <p className={styles.msVal}>24</p>
             </div>
             <div className={`glass-card ${styles.miniStat}`}>
                <p className={styles.msLabel}>Question Bank</p>
                <p className={styles.msVal}>840</p>
             </div>
             <div className={`glass-card ${styles.miniStat}`}>
                <p className={styles.msLabel}>Avg Pass Rate</p>
                <p className={styles.msVal}>78%</p>
             </div>
          </div>

          <div className={`glass-panel ${styles.listArea}`}>
             <div className={styles.listNav}>
                <h3 className={styles.ltTitle}>Recent Assessments</h3>
                <div className={styles.searchBox}>
                  <Search size={16} />
                  <input type="text" placeholder="Search tests..." className={styles.search} />
                </div>
             </div>
             <div className={styles.testGrid}>
                {TESTS.map(test => (
                  <div key={test.id} className={styles.testCard}>
                     <div className={styles.tcIcon}><Beaker size={20} /></div>
                     <div className={styles.tcContent}>
                        <h4 className={styles.tcTitle}>{test.title}</h4>
                        <p className={styles.tcMeta}>{test.subject} • {test.grade} Grade • {test.questions} Questions</p>
                     </div>
                     <div className={styles.tcStats}>
                        <div className={styles.tcStat}>
                           <span className={styles.statL}>Avg. Score</span>
                           <span className={styles.statV}>{test.avgScore}</span>
                        </div>
                        <button className={styles.tcAction}>Results <ArrowRight size={14} /></button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </>
      ) : (
        <div className={styles.builderArea}>
           <header className={styles.builderHeader}>
              <button className={styles.backBtn} onClick={() => setView('list')}>← Exit Builder</button>
              <div className={styles.builderSteps}>
                 {['Settings', 'Question Builder', 'Confirm'].map((step, i) => (
                   <div key={i} className={clsx(styles.bStep, builderStep > i && styles.bStepDone, builderStep === i+1 && styles.bStepActive)}>
                      <div className={styles.bsNum}>{builderStep > i ? <CheckCircle2 size={14} /> : i+1}</div>
                      <span>{step}</span>
                      {i < 2 && <div className={styles.bsConnector} />}
                   </div>
                 ))}
              </div>
              <button className={`btn btn-primary ${styles.saveBtn}`}>
                <Save size={16} /> Save Draft
              </button>
           </header>

           <div className={`glass-panel ${styles.builderContent}`}>
              {builderStep === 1 && (
                <div className={styles.stepOne}>
                   <h2 className={styles.stepTitle}>Assessment Settings</h2>
                   <div className={styles.formGrid}>
                      <div className={styles.inputGroup}>
                         <label>Test Title</label>
                         <input type="text" placeholder="e.g. Unit 4: Thermodynamics Final" />
                      </div>
                      <div className={styles.formRow}>
                         <div className={styles.inputGroup}>
                            <label>Duration (Minutes)</label>
                            <input type="number" placeholder="60" />
                         </div>
                         <div className={styles.inputGroup}>
                            <label>Pass Percentage</label>
                            <input type="number" placeholder="40" />
                         </div>
                      </div>
                      <div className={styles.optionsGrid}>
                         <label className={styles.option}>
                            <input type="checkbox" />
                            <span>Randomize Question Order</span>
                         </label>
                         <label className={styles.option}>
                            <input type="checkbox" />
                            <span>Show Answers Immediately</span>
                         </label>
                      </div>
                   </div>
                   <button className={`btn btn-primary ${styles.nextBtn}`} onClick={() => setBuilderStep(2)}>
                      Continue to Builder <ChevronRight size={18} />
                   </button>
                </div>
              )}

              {builderStep === 2 && (
                <div className={styles.stepTwo}>
                   <div className={styles.builderTools}>
                      <h2 className={styles.stepTitle}>Question Builder</h2>
                      <div className={styles.toolRow}>
                         <button className={styles.toolBtn}><Plus size={14} /> MCQ</button>
                         <button className={styles.toolBtn}><Plus size={14} /> True/False</button>
                         <button className={styles.toolBtn}><Plus size={14} /> Short Answer</button>
                         <button className={styles.toolBtn}><Layers size={14} /> Import from Bank</button>
                      </div>
                   </div>
                   <div className={styles.questionList}>
                      <div className={styles.qCard}>
                         <div className={styles.qHeader}>
                            <div className={styles.qDrag}><GripVertical size={16} /></div>
                            <span className={styles.qNum}>Question 1</span>
                            <span className={styles.qType}>MCQ</span>
                            <div className={styles.qActions}>
                               <span className={styles.qMarks}>4 Marks</span>
                               <button className={styles.qDel}><Trash2 size={16} /></button>
                            </div>
                         </div>
                         <div className={styles.qBody}>
                            <textarea className={styles.qText} value="What is the first law of thermodynamics primarily concerned with?"></textarea>
                            <div className={styles.optionsList}>
                               <div className={styles.qOption}><input type="radio" checked readOnly /> <input type="text" value="Conservation of Energy" /></div>
                               <div className={styles.qOption}><input type="radio" disabled /> <input type="text" value="Entropy Increase" /></div>
                               <div className={styles.qOption}><input type="radio" disabled /> <input type="text" value="Absolute Zero" /></div>
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className={styles.navBar}>
                      <button className={styles.navPrev} onClick={() => setBuilderStep(1)}>Back</button>
                      <button className={`btn btn-primary`} onClick={() => setBuilderStep(3)}>Finish & Preview</button>
                   </div>
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
}

function clsx(...args: any[]) {
  return args.filter(Boolean).join(' ');
}
