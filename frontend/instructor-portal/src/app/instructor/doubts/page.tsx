'use client';

import React, { useState } from 'react';
import { 
  MessageSquare, Search, Filter, 
  ChevronRight, Send, User, 
  Image as ImageIcon, MoreVertical,
  CheckCircle2, Clock, 
  FileText, Bold, Italic, List
} from 'lucide-react';
import styles from './doubts.module.css';

const DOUBTS = [
  { id: 1, student: 'Aditya Raj', subject: 'Physics', preview: 'Can you explain the difference between heat and work in terms of energy transfer?', time: '10m ago', status: 'unanswered', grade: '10th' },
  { id: 2, student: 'Sneha Kumari', subject: 'Biology', preview: 'What is the role of ATP in muscle contraction?', time: '45m ago', status: 'unanswered', grade: '9th' },
  { id: 3, student: 'Rohan Verma', subject: 'Physics', preview: 'How do we calculate the efficiency of a Carnot engine?', time: '2h ago', status: 'answered', grade: '10th' },
  { id: 4, student: 'Ishan Gupta', subject: 'Mathematics', preview: 'Is matrix multiplication always non-commutative?', time: '1d ago', status: 'answered', grade: '10th' },
];

export default function DoubtsInbox() {
  const [selectedId, setSelectedId] = useState(1);
  const activeDoubt = DOUBTS.find(d => d.id === selectedId) || DOUBTS[0];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Doubts Inbox</h1>
        <p className={styles.subtitle}>Direct student engagement channel for technical and conceptual queries.</p>
      </header>

      <div className={styles.inboxLayout}>
         {/* Left List */}
         <div className={`glass-panel ${styles.listPanel}`}>
            <div className={styles.listHeader}>
               <div className={styles.searchBox}>
                  <Search size={16} />
                  <input type="text" placeholder="Search doubts..." />
               </div>
               <div className={styles.filterBtns}>
                  <button className={clsx(styles.filterBtn, styles.activeFilter)}>All</button>
                  <button className={styles.filterBtn}>Unanswered</button>
               </div>
            </div>
            <div className={styles.doubtList}>
               {DOUBTS.map(doubt => (
                 <div 
                   key={doubt.id} 
                   className={clsx(styles.doubtItem, selectedId === doubt.id && styles.selectedDoubt)}
                   onClick={() => setSelectedId(doubt.id)}
                 >
                   <div className={styles.doubtStatus}>
                      <div className={clsx(styles.statusDot, doubt.status === 'unanswered' ? styles.dotRed : styles.dotGreen)}></div>
                   </div>
                   <div className={styles.doubtContext}>
                      <div className={styles.doubtTop}>
                         <span className={styles.studentName}>{doubt.student}</span>
                         <span className={styles.doubtTime}>{doubt.time}</span>
                      </div>
                      <p className={styles.doubtSubject}>{doubt.subject} • {doubt.grade}</p>
                      <p className={styles.doubtPreview}>{doubt.preview}</p>
                   </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Right Detail */}
         <div className={`glass-panel ${styles.detailPanel}`}>
            <div className={styles.detailHeader}>
               <div className={styles.activeStudent}>
                  <div className={styles.avatar}>{activeDoubt.student.charAt(0)}</div>
                  <div>
                     <p className={styles.asName}>{activeDoubt.student}</p>
                     <p className={styles.asMeta}>{activeDoubt.grade} Student • Enrolled 2 months ago</p>
                  </div>
               </div>
               <div className={styles.asActions}>
                  <button className={styles.asBtn}><FileText size={16} /> Progress</button>
                  <button className={styles.asBtn}><MoreVertical size={16} /></button>
               </div>
            </div>

            <div className={styles.conversationArea}>
               <div className={styles.studentMsg}>
                  <p className={styles.msgText}>{activeDoubt.preview}</p>
                  <span className={styles.msgTime}>Sent Oct 15, 2026 at 11:42 AM</span>
               </div>

               {activeDoubt.status === 'answered' && (
                 <div className={styles.instructorMsg}>
                    <p className={styles.msgText}>Matrix multiplication is indeed generally non-commutative, meaning AB is not equal to BA in most cases. However, there are exceptions like diagonal matrices! Keep practicing.</p>
                    <span className={styles.msgTime}>Replied by you • 2h ago</span>
                 </div>
               )}
            </div>

            <div className={styles.replyArea}>
               <div className={styles.editorToolbar}>
                  <button className={styles.tool}><Bold size={14} /></button>
                  <button className={styles.tool}><Italic size={14} /></button>
                  <button className={styles.tool}><List size={14} /></button>
                  <button className={styles.tool}><ImageIcon size={14} /></button>
                  <div className={styles.toolDivider}></div>
                  <span className={styles.mathBtn}>f(x) Math</span>
               </div>
               <textarea className={styles.replyInput} placeholder="Type your detailed explanation here... (supports LaTeX)"></textarea>
               <div className={styles.replyFooter}>
                  <button className={styles.resolveBtn}><CheckCircle2 size={16} /> Mark Resolved</button>
                  <button className={`btn btn-primary ${styles.sendBtn}`}>
                     Send Answer <Send size={16} />
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function clsx(...args: any[]) {
  return args.filter(Boolean).join(' ');
}
