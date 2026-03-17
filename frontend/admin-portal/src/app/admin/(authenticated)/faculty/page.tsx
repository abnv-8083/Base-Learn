'use client';

import React, { useState } from 'react';
import { 
  UsersRound, Settings2, Plus, 
  MoreHorizontal, ChevronRight, Briefcase, Link as LinkIcon
} from 'lucide-react';
import styles from './faculty.module.css';

// Mock Data
const FACULTY = [
  { id: 'FAC-001', name: 'Dr. Helen Carter', role: 'Head of Mathematics', oversees: 'Grade 9-12 (Math)', reportsTo: 'Academic Director', status: 'Active', avatar: 'HC', isHead: true },
  { id: 'FAC-002', name: 'James Morrison', role: 'Senior Coordinator', oversees: 'Grade 8-10 (Science)', reportsTo: 'Head of Science', status: 'Active', avatar: 'JM', isHead: false },
  { id: 'FAC-003', name: 'Laura Linney', role: 'Head of Science', oversees: 'Grade 6-12 (Science)', reportsTo: 'Academic Director', status: 'Active', avatar: 'LL', isHead: true },
  { id: 'FAC-004', name: 'Marcus Cole', role: 'Junior Coordinator', oversees: 'Grade 6-8 (English)', reportsTo: 'Head of Humanities', status: 'On Leave', avatar: 'MC', isHead: false },
];

export default function FacultyManagement() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return <span className={`${styles.badge} ${styles.badgeSuccess}`}>{status}</span>;
      case 'On Leave': return <span className={`${styles.badge} ${styles.badgeWarning}`}>{status}</span>;
      default: return <span className={`${styles.badge} ${styles.badgeNeutral}`}>{status}</span>;
    }
  };

  return (
    <div className={styles.container}>
      
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInfo}>
          <h1 className={styles.title}>Faculty Overview</h1>
          <p className={styles.subtitle}>Organize department heads, subject coordinators, and reporting chains.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={`btn btn-secondary ${styles.actionBtn}`}>
            <Settings2 size={18} /> Manage Departments
          </button>
          <button className={`btn btn-primary ${styles.actionBtn}`}>
            <Plus size={18} /> Add Faculty Member
          </button>
        </div>
      </header>

      {/* Stats Overview */}
      <section className={styles.statsRow}>
        <div className={`glass-panel ${styles.statCard}`}>
          <div className={styles.statIconWrapper}><UsersRound size={20} /></div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Total Faculty</p>
            <h3 className={styles.statValue}>45</h3>
          </div>
        </div>
        <div className={`glass-panel ${styles.statCard}`}>
          <div className={styles.statIconWrapper}><Briefcase size={20} /></div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Active Departments</p>
            <h3 className={styles.statValue}>8</h3>
          </div>
        </div>
        <div className={`glass-panel ${styles.statCard}`}>
          <div className={styles.statIconWrapper}><LinkIcon size={20} /></div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Instructors Managed</p>
            <h3 className={styles.statValue}>340</h3>
          </div>
        </div>
      </section>

      {/* Split View */}
      <div className={styles.splitLayout}>
        
        {/* Main List */}
        <div className={`glass-card ${styles.mainListPanel}`}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Faculty Roster</h3>
            <div className={styles.panelFilter}>Department: All <ChevronRight size={14}/></div>
          </div>
          
          <div className={styles.rosterList}>
            {FACULTY.map(faculty => (
              <div key={faculty.id} className={styles.rosterCard}>
                
                <div className={styles.rosterCardMain}>
                  <div className={`${styles.avatar} ${faculty.isHead ? styles.avatarHead : ''}`}>
                    {faculty.avatar}
                  </div>
                  <div className={styles.rosterInfo}>
                    <div className={styles.rosterNameRow}>
                      <span className={styles.facultyName}>{faculty.name}</span>
                      {getStatusBadge(faculty.status)}
                    </div>
                    <span className={styles.facultyRole}>{faculty.role}</span>
                  </div>
                </div>

                <div className={styles.rosterDetails}>
                  <div className={styles.detailBlock}>
                    <span className={styles.detailLabel}>Oversees</span>
                    <span className={styles.detailValue}>{faculty.oversees}</span>
                  </div>
                  <div className={styles.detailDivider}></div>
                  <div className={styles.detailBlock}>
                    <span className={styles.detailLabel}>Reports To</span>
                    <span className={styles.detailValue}>{faculty.reportsTo}</span>
                  </div>
                </div>

                <div className={styles.rosterActions}>
                  <div className={styles.menuWrapper}>
                    <button 
                      className={styles.menuBtn}
                      onClick={() => setActiveMenu(activeMenu === faculty.id ? null : faculty.id)}
                    >
                      <MoreHorizontal size={20} />
                    </button>
                    
                    {activeMenu === faculty.id && (
                      <div className={styles.dropdown}>
                        <div className={styles.dropdownItem}>Edit Assignment</div>
                        <div className={styles.dropdownItem}>View Activity Log</div>
                        <div className={styles.dropdownItem}>Change Reporting Line</div>
                        <div className={`${styles.dropdownItem} ${styles.textDanger}`}>Remove Faculty</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Log / Org Chart Quick View */}
        <div className={styles.sidePanel}>
          <div className={`glass-card ${styles.orgWidget}`}>
            <h3 className={styles.orgTitle}>Hierarchy Quick View</h3>
            <div className={styles.orgTree}>
              <div className={styles.orgNodeLevel1}>
                <div className={styles.nodeBox}>Academic Director</div>
                
                <div className={styles.orgNodeLevel2}>
                  <div className={styles.nodeConnector}></div>
                  <div className={styles.nodeBox}>Head of Mathematics</div>
                </div>
                
                <div className={styles.orgNodeLevel2}>
                  <div className={styles.nodeConnector}></div>
                  <div className={styles.nodeBox}>Head of Science</div>
                  
                  <div className={styles.orgNodeLevel3}>
                    <div className={styles.nodeConnector}></div>
                    <div className={styles.nodeBox}>Senior Coordinator</div>
                  </div>
                </div>

              </div>
            </div>
            <button className={styles.viewFullChartBtn}>View Full Org Chart</button>
          </div>
        </div>

      </div>
    </div>
  );
}
