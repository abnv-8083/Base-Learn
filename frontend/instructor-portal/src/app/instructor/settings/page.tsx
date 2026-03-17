'use client';

import React, { useState } from 'react';
import { 
  User, Shield, Bell, 
  CreditCard, Globe, LogOut,
  Camera, Mail, Lock, 
  Smartphone, Eye, EyeOff
} from 'lucide-react';
import styles from './settings.module.css';

export default function InstructorSettings() {
  const [activeTab, setActiveTab] = useState('Profile');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Account Settings</h1>
        <p className={styles.subtitle}>Manage your professional identity and portal configurations.</p>
      </header>

      <div className={styles.settingsLayout}>
         {/* Sidebar Tabs */}
         <div className={styles.tabsCol}>
            <div className={styles.tabs}>
               {[
                 { id: 'Profile', icon: <User size={18} /> },
                 { id: 'Security', icon: <Shield size={18} /> },
                 { id: 'Notifications', icon: <Bell size={18} /> },
                 { id: 'Preferences', icon: <Globe size={18} /> },
               ].map(tab => (
                 <button 
                   key={tab.id}
                   className={clsx(styles.tab, activeTab === tab.id && styles.activeTab)}
                   onClick={() => setActiveTab(tab.id)}
                 >
                   {tab.icon}
                   <span>{tab.id}</span>
                 </button>
               ))}
            </div>
            <button className={styles.logoutBtn}><LogOut size={18} /> Sign Out</button>
         </div>

         {/* Content Area */}
         <div className={`glass-panel ${styles.contentArea}`}>
            {activeTab === 'Profile' && (
              <div className={styles.profileSection}>
                 <div className={styles.avatarRow}>
                    <div className={styles.avatarLarge}>
                       <User size={40} />
                       <button className={styles.changeAvatarBtn}><Camera size={14} /></button>
                    </div>
                    <div>
                       <h3 className={styles.sectionTitle}>Instructor Profile</h3>
                       <p className={styles.sectionSub}>Update your personal details and academic bio.</p>
                    </div>
                 </div>

                 <div className={styles.formGrid}>
                    <div className={styles.formRow}>
                       <div className={styles.inputGroup}>
                          <label>Full Name</label>
                          <input type="text" defaultValue="Dr. Vikram Singh" className={styles.input} />
                       </div>
                       <div className={styles.inputGroup}>
                          <label>Public Title</label>
                          <input type="text" defaultValue="Senior Physics Faculty" className={styles.input} />
                       </div>
                    </div>
                    <div className={styles.inputGroup}>
                       <label>Academic Bio</label>
                       <textarea className={styles.textarea}>Specialist in quantum thermodynamics with over 12 years of experience in teaching engineering aspirants. Author of 'Modern Physics for Grades 9-12'.</textarea>
                    </div>
                    <div className={styles.formRow}>
                       <div className={styles.inputGroup}>
                          <label>Work Email</label>
                          <div className={styles.inputWithIcon}>
                             <Mail size={16} />
                             <input type="email" defaultValue="vikram.singh@baselearn.ac" className={styles.input} />
                          </div>
                       </div>
                       <div className={styles.inputGroup}>
                          <label>Experience (Years)</label>
                          <input type="number" defaultValue="12" className={styles.input} />
                       </div>
                    </div>
                 </div>
                 <div className={styles.footer}>
                    <button className={`btn btn-primary ${styles.saveBtn}`}>Save Changes</button>
                 </div>
              </div>
            )}

            {activeTab === 'Security' && (
              <div className={styles.securitySection}>
                 <h3 className={styles.sectionTitle}>Security & Privacy</h3>
                 <p className={styles.sectionSub}>Manage your password and two-factor authentication.</p>

                 <div className={styles.securityList}>
                    <div className={styles.securityItem}>
                       <div className={styles.siContent}>
                          <div className={styles.siIcon}><Lock size={18} /></div>
                          <div>
                             <p className={styles.siTitle}>Change Password</p>
                             <p className={styles.siSub}>Last updated 3 months ago</p>
                          </div>
                       </div>
                       <button className={styles.siBtn}>Update</button>
                    </div>
                    <div className={styles.securityItem}>
                       <div className={styles.siContent}>
                          <div className={styles.siIcon}><Smartphone size={18} /></div>
                          <div>
                             <p className={styles.siTitle}>Two-Factor Authentication</p>
                             <p className={styles.siSub}>Recommended for higher account security</p>
                          </div>
                       </div>
                       <button className={clsx(styles.siBtn, styles.siBtnPrimary)}>Enable</button>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'Notifications' && (
              <div className={styles.notificationSection}>
                 <h3 className={styles.sectionTitle}>Notification Preferences</h3>
                 <div className={styles.toggleList}>
                    {[
                      { l: 'Email on New Doubt', s: 'Receive instant alerts when students ask a query' },
                      { l: 'Assignment Submission Alerts', s: 'Get notified as soon as a student submits work' },
                      { l: 'Weekly Analytics Report', s: 'Summarized performance metrics every Sunday' },
                      { l: 'Platform Updates', s: 'Stay informed about new portal features' },
                    ].map((item, i) => (
                      <div key={i} className={styles.toggleItem}>
                         <div>
                            <p className={styles.toggleTitle}>{item.l}</p>
                            <p className={styles.toggleSub}>{item.s}</p>
                         </div>
                         <div className={styles.switch}>
                            <input type="checkbox" defaultChecked={i < 2} />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}
         </div>
      </div>
    </div>
  );
}

function clsx(...args: any[]) {
  return args.filter(Boolean).join(' ');
}
