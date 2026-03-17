'use client';

import React, { useState } from 'react';
import { 
  Settings, Globe, Shield, Terminal, 
  Database, Save, AlertTriangle, RefreshCcw, 
  Eye, EyeOff, Layout, Lock
} from 'lucide-react';
import styles from './settings.module.css';

export default function PlatformSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>System Settings</h1>
          <p className={styles.subtitle}>Configure global platform parameters, security policies, and API integrations.</p>
        </div>
        <button className={`btn btn-primary ${styles.btnSave}`}>
          <Save size={18} /> Save All Changes
        </button>
      </header>

      <div className={styles.mainGrid}>
        
        {/* Navigation Sidebar */}
        <div className={styles.settingsNav}>
          <div className={`glass-card ${styles.navCard}`}>
            <button 
              className={`${styles.navItem} ${activeTab === 'general' ? styles.activeNav : ''}`}
              onClick={() => setActiveTab('general')}
            >
              <Globe size={18} /> General Setup
            </button>
            <button 
              className={`${styles.navItem} ${activeTab === 'security' ? styles.activeNav : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <Shield size={18} /> Security & Auth
            </button>
            <button 
              className={`${styles.navItem} ${activeTab === 'api' ? styles.activeNav : ''}`}
              onClick={() => setActiveTab('api')}
            >
              <Terminal size={18} /> API & Webhooks
            </button>
            <button 
              className={`${styles.navItem} ${activeTab === 'storage' ? styles.activeNav : ''}`}
              onClick={() => setActiveTab('storage')}
            >
              <Database size={18} /> Storage & CDN
            </button>
            <button 
              className={`${styles.navItem} ${activeTab === 'branding' ? styles.activeNav : ''}`}
              onClick={() => setActiveTab('branding')}
            >
              <Layout size={18} /> Branding UI
            </button>
          </div>

          <div className={`glass-panel ${styles.maintenanceWidget}`}>
            <div className={styles.mHeader}>
              <h4 className={styles.mTitle}>Maintenance Mode</h4>
              <button 
                className={`${styles.toggle} ${maintenanceMode ? styles.toggleOn : ''}`}
                onClick={() => setMaintenanceMode(!maintenanceMode)}
              >
                <div className={styles.toggleCircle}></div>
              </button>
            </div>
            <p className={styles.mDesc}>Offline for all users except admins. Use for critical updates.</p>
          </div>
        </div>

        {/* Content Area */}
        <div className={styles.settingsContent}>
          <div className={`glass-card ${styles.contentCard}`}>
            
            {activeTab === 'general' && (
              <div className={styles.tabContent}>
                <h3 className={styles.tabTitle}>General Platform Setup</h3>
                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label>Platform Name</label>
                    <input type="text" defaultValue="Base Learn Admin" className={styles.input} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Admin Support Email</label>
                    <input type="email" defaultValue="admin-ops@baselearn.com" className={styles.input} />
                  </div>
                </div>
                <div className={styles.formRow}>
                   <div className={styles.inputGroup}>
                    <label>Default Platform Timezone</label>
                    <select className={styles.select}>
                      <option>UTC (Coordinated Universal Time)</option>
                      <option>PST (Pacific Standard Time)</option>
                      <option>IST (India Standard Time)</option>
                    </select>
                  </div>
                </div>
                <div className={styles.divider}></div>
                <h4 className={styles.subTitle}>SEO Metadata</h4>
                <div className={styles.inputGroup}>
                  <label>Meta Description</label>
                  <textarea className={styles.textarea} defaultValue="The most advanced learning management platform for higher education."></textarea>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className={styles.tabContent}>
                <h3 className={styles.tabTitle}>Security Policies</h3>
                <div className={styles.optionList}>
                   <div className={styles.optionItem}>
                     <div className={styles.optionInfo}>
                       <p className={styles.optionLabel}>Enforce 2FA for Admins</p>
                       <p className={styles.optionDesc}>Require two-factor authentication for all administrative accounts.</p>
                     </div>
                     <button className={`${styles.toggle} ${styles.toggleOn}`}>
                       <div className={styles.toggleCircle}></div>
                     </button>
                   </div>
                   <div className={styles.optionItem}>
                     <div className={styles.optionInfo}>
                       <p className={styles.optionLabel}>Session Timeout</p>
                       <p className={styles.optionDesc}>Automatically log out inactive users after 15 minutes.</p>
                     </div>
                     <button className={styles.toggle}>
                       <div className={styles.toggleCircle}></div>
                     </button>
                   </div>
                   <div className={styles.optionItem}>
                     <div className={styles.optionInfo}>
                       <p className={styles.optionLabel}>Allow Faculty Overrides</p>
                       <p className={styles.optionDesc}>Allow faculty heads to modify content states without admin review.</p>
                     </div>
                     <button className={styles.toggle}>
                       <div className={styles.toggleCircle}></div>
                     </button>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className={styles.tabContent}>
                <h3 className={styles.tabTitle}>API Configuration</h3>
                <div className={styles.apiKeyBox}>
                  <div className={styles.apiHeader}>
                    <p className={styles.apiLabel}>Production Secret Key</p>
                    <button className={styles.refreshBtn}><RefreshCcw size={14} /> Rotate Key</button>
                  </div>
                  <div className={styles.keyWrapper}>
                    <input type="password" value="sk_production_8923058203582038520358" readOnly className={styles.keyInput} />
                    <button className={styles.eyeBtn}><Eye size={18} /></button>
                  </div>
                </div>
                <div className={styles.alertBox}>
                  <AlertTriangle size={18} />
                  <p>Never share your production keys. Use environment variables for deployment.</p>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
