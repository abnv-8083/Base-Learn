'use client';

import React, { useState } from 'react';
import { 
  Mail, Edit3, Eye, Copy, 
  Trash2, Send, Layout, Type, 
  CheckCircle, Smartphone, Monitor, Code
} from 'lucide-react';
import styles from './emails.module.css';

const TEMPLATES = [
  { id: '1', name: 'Welcome Email', subject: 'Welcome to Base Learn, {{name}}!', trigger: 'On Registration', status: 'Active' },
  { id: '2', name: 'Purchase Receipt', subject: 'Your Receipt for {{course_title}}', trigger: 'On Successful Payment', status: 'Active' },
  { id: '3', name: 'Password Reset', subject: 'Reset your password', trigger: 'Manual Request', status: 'Active' },
  { id: '4', name: 'Course Certificate', subject: 'Congratulations! You completed {{course_title}}', trigger: 'On Completion', status: 'Draft' },
];

export default function EmailTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [previewMode, setPreviewMode] = useState('desktop');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Email & Templates</h1>
          <p className={styles.subtitle}>Customize automated emails, design marketing templates, and manage branding.</p>
        </div>
        <button className={`btn btn-primary ${styles.btnNew}`}>
          <Layout size={18} /> New Template
        </button>
      </header>

      <div className={styles.mainGrid}>
        
        {/* Template List */}
        <div className={styles.templateColumn}>
          <div className={`glass-card ${styles.templateCard}`}>
            <h3 className={styles.panelTitle}>System Templates</h3>
            <div className={styles.tList}>
              {TEMPLATES.map((t) => (
                <button 
                  key={t.id}
                  className={`${styles.tItem} ${selectedTemplate.id === t.id ? styles.activeT : ''}`}
                  onClick={() => setSelectedTemplate(t)}
                >
                  <div className={styles.tHeader}>
                    <span className={styles.tName}>{t.name}</span>
                    <span className={`${styles.statusBadge} ${t.status === 'Active' ? styles.sActive : styles.sDraft}`}>
                      {t.status}
                    </span>
                  </div>
                  <p className={styles.tSubject}>{t.subject}</p>
                  <div className={styles.tFooter}>
                    <span className={styles.tTrigger}><CheckCircle size={12} /> {t.trigger}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Editor / Preview Panel */}
        <div className={styles.editorColumn}>
          <div className={`glass-card ${styles.editorCard}`}>
            
            <div className={styles.editorHeader}>
               <div className={styles.headerInfo}>
                 <h3 className={styles.panelTitle}>Template Preview</h3>
                 <div className={styles.viewToggles}>
                    <button 
                      className={`${styles.viewBtn} ${previewMode === 'desktop' ? styles.vActive : ''}`}
                      onClick={() => setPreviewMode('desktop')}
                    >
                      <Monitor size={16} />
                    </button>
                    <button 
                      className={`${styles.viewBtn} ${previewMode === 'mobile' ? styles.vActive : ''}`}
                      onClick={() => setPreviewMode('mobile')}
                    >
                      <Smartphone size={16} />
                    </button>
                 </div>
               </div>
               <div className={styles.editorActions}>
                 <button className={styles.eBtn}><Edit3 size={16} /> Edit HTML</button>
                 <button className={styles.eBtnPrimary}><Send size={16} /> Send Test</button>
               </div>
            </div>

            <div className={`${styles.previewArea} ${previewMode === 'mobile' ? styles.pMobile : ''}`}>
               <div className={styles.emailWrapper}>
                  <div className={styles.emailHeader}>
                     <img src="https://via.placeholder.com/150x50?text=BASE+LEARN" alt="Logo" className={styles.emailLogo} />
                  </div>
                  <div className={styles.emailBody}>
                     <h2 className={styles.emailTitle}>Welcome to the platform, Alex!</h2>
                     <p className={styles.emailText}>
                       We're excited to have you on board. Start exploring our latest courses and join our vibrant community of learners.
                     </p>
                     <div className={styles.emailCta}>
                        Get Started Today
                     </div>
                     <p className={styles.emailFooter}>
                        If you have any questions, feel free to reply to this email.
                     </p>
                  </div>
               </div>
            </div>

            <div className={styles.variablePanel}>
               <h4 className={styles.varTitle}><Type size={16} /> Available Variables</h4>
               <div className={styles.varGrid}>
                  <div className={styles.varItem}><code>{"{{name}}"}</code> - Customer Name</div>
                  <div className={styles.varItem}><code>{"{{course_title}}"}</code> - Course Title</div>
                  <div className={styles.varItem}><code>{"{{date}}"}</code> - Current Date</div>
                  <div className={styles.varItem}><code>{"{{price}}"}</code> - Transaction Amount</div>
               </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
