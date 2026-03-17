'use client';

import React, { useState } from 'react';
import { 
  Upload, FileVideo, Info, 
  MapPin, Paperclip, CheckCircle2, 
  ChevronRight, ChevronLeft, Plus, 
  Trash2, Play, Image as ImageIcon
} from 'lucide-react';
import styles from './upload.module.css';

const STEPS = [
  { id: 1, label: 'Video Upload', icon: <Upload size={18} /> },
  { id: 2, label: 'Class Details', icon: <Info size={18} /> },
  { id: 3, label: 'Chapters', icon: <MapPin size={18} /> },
  { id: 4, label: 'Attachments', icon: <Paperclip size={18} /> },
  { id: 5, label: 'Publish', icon: <CheckCircle2 size={18} /> },
];

export default function UploadClass() {
  const [currentStep, setCurrentStep] = useState(1);
  const [chapters, setChapters] = useState([{ time: '0:00', title: 'Introduction' }]);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Upload Recorded Class</h1>
        <p className={styles.subtitle}>Streamline your content delivery with our advanced upload terminal.</p>
      </header>

      {/* Progress Wizard */}
      <div className={styles.wizard}>
        {STEPS.map((step) => (
          <div 
            key={step.id} 
            className={clsx(
              styles.step, 
              currentStep === step.id && styles.activeStep,
              currentStep > step.id && styles.completedStep
            )}
          >
            <div className={styles.stepIcon}>
              {currentStep > step.id ? <CheckCircle2 size={20} /> : step.icon}
            </div>
            <span className={styles.stepLabel}>{step.label}</span>
            {step.id < STEPS.length && <div className={styles.stepConnector} />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className={`glass-panel ${styles.contentArea}`}>
        {currentStep === 1 && (
          <div className={styles.uploadZone}>
            <div className={styles.dashedBox}>
              <div className={styles.uploadIcon}><FileVideo size={48} /></div>
              <h3 className={styles.boxTitle}>Drag & drop your class video</h3>
              <p className={styles.boxSub}>MP4, MOV, or MKV (Max 4GB)</p>
              <button className={`btn btn-primary ${styles.selectBtn}`}>Select File</button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className={styles.detailsForm}>
            <div className={styles.formGrid}>
               <div className={styles.inputGroup}>
                  <label className={styles.label}>Class Title</label>
                  <input type="text" placeholder="e.g. Chapter 4: Linear Equations - Part 1" className={styles.input} />
               </div>
               <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Subject</label>
                    <select className={styles.select}>
                       <option>Physics</option>
                       <option>Mathematics</option>
                       <option>Chemistry</option>
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Grade</label>
                    <select className={styles.select}>
                       <option>Grade 8</option>
                       <option>Grade 9</option>
                       <option>Grade 10</option>
                    </select>
                  </div>
               </div>
               <div className={styles.inputGroup}>
                  <label className={styles.label}>Description & Objectives</label>
                  <textarea placeholder="What will students learn in this session?" className={styles.textarea}></textarea>
               </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className={styles.chaptersArea}>
             <div className={styles.chapterList}>
                {chapters.map((ch, i) => (
                  <div key={i} className={styles.chapterRow}>
                    <input type="text" value={ch.time} className={styles.timeInput} readOnly />
                    <input type="text" value={ch.title} className={styles.chapterTitleInput} placeholder="Chapter Title" />
                    <button className={styles.deleteBtn}><Trash2 size={16} /></button>
                  </div>
                ))}
             </div>
             <button className={styles.addChapterBtn} onClick={() => setChapters([...chapters, { time: '0:00', title: '' }])}>
               <Plus size={16} /> Add Marker
             </button>
          </div>
        )}

        {currentStep === 4 && (
          <div className={styles.attachmentsArea}>
             <div className={styles.attachmentDrop}>
                <Paperclip size={24} color="var(--color-primary)" />
                <p>Upload supporting PDFs, notes, or formula sheets</p>
                <button className={styles.attachBtn}>Browse Files</button>
             </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className={styles.publishPreview}>
             <div className={styles.previewCard}>
                <div className={styles.previewThumb}>
                   <Play size={40} color="white" />
                   <div className={styles.durationTag}>24:15</div>
                </div>
                <div className={styles.previewInfo}>
                   <h3 className={styles.previewTitle}>Chapter 4: Linear Equations - Part 1</h3>
                   <p className={styles.previewMeta}>Physics • Grade 9 • 12 Chapters</p>
                </div>
             </div>
             <div className={styles.publishOptions}>
                <label className={styles.option}>
                   <input type="checkbox" checked readOnly />
                   <span>Notify all enrolled students via push & email</span>
                </label>
                <label className={styles.option}>
                   <input type="checkbox" />
                   <span>Enable AI-powered auto-captions</span>
                </label>
             </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className={styles.navBar}>
           <button 
             className={clsx(styles.navBtn, styles.prevBtn)} 
             onClick={prevStep}
             disabled={currentStep === 1}
           >
             <ChevronLeft size={18} /> Back
           </button>
           <button 
             className={`btn btn-primary ${styles.navBtn}`} 
             onClick={nextStep}
           >
             {currentStep === STEPS.length ? 'Confirm & Publish' : 'Continue'}
             {currentStep !== STEPS.length && <ChevronRight size={18} />}
           </button>
        </div>
      </div>
    </div>
  );
}

function clsx(...args: any[]) {
  return args.filter(Boolean).join(' ');
}
