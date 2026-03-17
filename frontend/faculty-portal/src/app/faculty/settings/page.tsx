'use client';

import React, { useState } from 'react';
import { 
  User, Bell, Shield, 
  Globe, LogOut, Save, 
  Mail, Phone, Briefcase, Camera,
  ChevronRight, Lock
} from 'lucide-react';
import styles from './settings.module.css';

export default function FacultySettings() {
  const [activeSection, setActiveSection] = useState('Profile');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Account & Preferences</h1>
          <p className={styles.subtitle}>Manage your faculty profile, security settings, and notification preferences.</p>
        </div>
      </header>

      <div className={styles.mainGrid}>
        
        {/* Settings Navigation */}
        <div className={styles.navCol}>
           <div className={`glass-card ${styles.settingsNav}`}>
              {[
                { id: 'Profile', icon: <User size={18} />, label: 'Faculty Profile' },
                { id: 'Security', icon: <Shield size={18} />, label: 'Security & Privacy' },
                { id: 'Notifications', icon: <Bell size={18} />, label: 'Notifications' },
                { id: 'Department', icon: <Globe size={18} />, label: 'Department Config' },
              ].map(item => (
                <button 
                  key={item.id}
                  className={`${styles.navItem} ${activeSection === item.id ? styles.activeNav : ''}`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <div className={styles.navItemLeft}>
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight size={16} />
                </button>
              ))}
              <div className={styles.navDivider}></div>
              <button className={styles.logoutBtn}>
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
           </div>
        </div>

        {/* Settings Content Area */}
        <div className={styles.contentCol}>
           <div className={`glass-panel ${styles.settingsContent}`}>
              <div className={styles.contentHeader}>
                 <h2 className={styles.sectionTitle}>{activeSection}</h2>
                 <p className={styles.sectionDesc}>Update your {activeSection.toLowerCase()} information and settings.</p>
              </div>

              {activeSection === 'Profile' && (
                <div className={styles.profileSection}>
                   <div className={styles.avatarRow}>
                      <div className={styles.avatarContainer}>
                         <div className={styles.avatarWrapper}>
                           <Briefcase size={40} color="var(--color-primary)" />
                         </div>
                         <button className={styles.avatarEdit}><Camera size={14} /></button>
                      </div>
                      <div className={styles.avatarInfo}>
                         <h3>Dr. Sarah Chen</h3>
                         <p>Department Head, Biology</p>
                         <span className={styles.badge}>Administrator</span>
                      </div>
                   </div>

                   <div className={styles.formGrid}>
                      <div className={styles.inputGroup}>
                         <label><User size={14} /> Full Name</label>
                         <input type="text" defaultValue="Dr. Sarah Chen" className={styles.input} />
                      </div>
                      <div className={styles.inputGroup}>
                         <label><Mail size={14} /> Academic Email</label>
                         <input type="email" defaultValue="sarah.chen@university.edu" className={styles.input} />
                      </div>
                      <div className={styles.inputGroup}>
                         <label><Phone size={14} /> Contact Number</label>
                         <input type="text" defaultValue="+1 (555) 123-4567" className={styles.input} />
                      </div>
                      <div className={styles.inputGroup}>
                         <label><Briefcase size={14} /> Office Location</label>
                         <input type="text" defaultValue="Science Building, Room 402" className={styles.input} />
                      </div>
                   </div>

                   <div className={styles.bioArea}>
                      <label>Faculty Bio</label>
                      <textarea className={styles.textarea} defaultValue="Passionate about cellular biology and academic excellence. Leading the department for 5+ years."></textarea>
                   </div>
                </div>
              )}

              {activeSection === 'Security' && (
                 <div className={styles.securitySection}>
                    <div className={styles.securityItem}>
                       <div className={styles.sText}>
                          <h4>Change Password</h4>
                          <p>It's a good idea to use a strong password that you don't use elsewhere.</p>
                       </div>
                       <button className={styles.btnOutline}>Update Password</button>
                    </div>
                    <div className={styles.securityItem}>
                       <div className={styles.sText}>
                          <h4>Two-Factor Authentication</h4>
                          <p>Add an extra layer of security to your faculty account.</p>
                       </div>
                       <div className={styles.toggleWrapper}>
                          <span className={styles.toggleLabel}>Off</span>
                          <div className={styles.toggle}></div>
                       </div>
                    </div>
                    <div className={styles.securityItem}>
                       <div className={styles.sText}>
                          <h4>Active Sessions</h4>
                          <p>View and manage where you are currently logged in.</p>
                       </div>
                       <button className={styles.btnOutline}>Manage Sessions</button>
                    </div>
                 </div>
              )}

              <div className={styles.footerActions}>
                 <button className={styles.cancelBtn}>Cancel</button>
                 <button className={`btn btn-primary ${styles.saveBtn}`}>
                    <Save size={18} /> Save Changes
                 </button>
              </div>
           </div>

           <div className={`glass-card ${styles.dangerZone}`}>
              <div className={styles.dangerHeader}>
                 <Lock size={18} color="var(--color-danger)" />
                 <h4>Privacy & Compliance</h4>
              </div>
              <p>Download your departmental data or request account deactivation according to institutional policy.</p>
              <div className={styles.dangerActions}>
                 <button className={styles.textBtn}>Export Faculty Data</button>
                 <button className={styles.textBtnDanger}>Request Deactivation</button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
