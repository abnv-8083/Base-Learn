'use client';

import React, { useState } from 'react';
import { 
  Users, Mail, UserPlus, 
  MoreVertical, Check, X, FileText, Star, TrendingUp
} from 'lucide-react';
import styles from './instructors.module.css';

// Mock Data
const INSTRUCTORS = [
  { id: 'INS-011', name: 'Dr. Sarah Connor', subject: 'Physics', grade: '11th, 12th', videos: 142, rating: 4.8, revenue: '$4,250', status: 'Active', avatar: 'SC' },
  { id: 'INS-012', name: 'Prof. Mark Taylor', subject: 'Mathematics', grade: '9th, 10th', videos: 89, rating: 4.9, revenue: '$3,100', status: 'Active', avatar: 'MT' },
  { id: 'INS-013', name: 'Emily Chen', subject: 'Chemistry', grade: '10th, 11th', videos: 0, rating: 0, revenue: '$0', status: 'Pending Approval', avatar: 'EC' },
  { id: 'INS-014', name: 'Michael Davis', subject: 'Biology', grade: '12th', videos: 45, rating: 4.2, revenue: '$1,200', status: 'Suspended', avatar: 'MD' },
  { id: 'INS-015', name: 'Dr. Rajesh Kumar', subject: 'Computer Sci', grade: '11th, 12th', videos: 210, rating: 4.9, revenue: '$6,800', status: 'Active', avatar: 'RK' },
];

export default function InstructorManagement() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return <span className={`${styles.badge} ${styles.badgeSuccess}`}>Active</span>;
      case 'Suspended': return <span className={`${styles.badge} ${styles.badgeDanger}`}>Suspended</span>;
      case 'Pending Approval': return <span className={`${styles.badge} ${styles.badgeWarning}`}>Pending Review</span>;
      default: return null;
    }
  };

  return (
    <div className={styles.container}>
      
      {/* Page Header */}
      <header className={styles.header}>
        <div className={styles.headerTitles}>
          <h1 className={styles.title}>Instructor Management</h1>
          <p className={styles.subtitle}>Onboard, evaluate, and manage 340 active educators on the platform.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={`btn btn-secondary ${styles.btnShadow}`}>
            <FileText size={18} /> Performance Report
          </button>
          <button className={`btn btn-primary ${styles.btnShadow}`}>
            <UserPlus size={18} /> Invite Educator
          </button>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className={styles.contentGrid}>
        
        {/* Left Col: Instructors Table */}
        <div className={styles.mainTablePanel}>
          <div className={`glass-card ${styles.tableCard}`}>
            
            <div className={styles.tableHeader}>
              <div className={styles.tabsWrapper}>
                <button className={`${styles.tab} ${styles.activeTab}`}>All Instructors</button>
                <button className={styles.tab}>Pending Approvals (3)</button>
                <button className={styles.tab}>Suspended</button>
              </div>
            </div>

            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Instructor Details</th>
                    <th>Subject & Grade</th>
                    <th>Stats</th>
                    <th>Status</th>
                    <th className={styles.alignRight}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {INSTRUCTORS.map(instructor => (
                    <tr key={instructor.id} className={styles.row}>
                      <td>
                        <div className={styles.instructorProfile}>
                          <div className={styles.avatar}>{instructor.avatar}</div>
                          <div className={styles.info}>
                            <p className={styles.name}>{instructor.name}</p>
                            <p className={styles.id}>{instructor.id}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={styles.subjectAssignment}>
                          <p className={styles.subject}>{instructor.subject}</p>
                          <p className={styles.grades}>Grades {instructor.grade}</p>
                        </div>
                      </td>
                      <td>
                        <div className={styles.statsWrapper}>
                          <div className={styles.statLine}>
                            <Star size={14} className={styles.starIcon} /> 
                            <span>{instructor.rating > 0 ? instructor.rating : 'N/A'}</span>
                          </div>
                          <div className={styles.statLine}>
                            <TrendingUp size={14} className={styles.trendIcon} /> 
                            <span className={styles.mutedText}>{instructor.videos} videos</span>
                          </div>
                        </div>
                      </td>
                      <td>{getStatusBadge(instructor.status)}</td>
                      <td className={styles.alignRight}>
                        
                        {instructor.status === 'Pending Approval' ? (
                          <div className={styles.approvalActions}>
                            <button className={styles.approveBtn} title="Approve Application"><Check size={16} /></button>
                            <button className={styles.rejectBtn} title="Reject Application"><X size={16} /></button>
                          </div>
                        ) : (
                          <div className={styles.menuContainer}>
                            <button 
                              className={styles.menuToggle}
                              onClick={() => setActiveMenu(activeMenu === instructor.id ? null : instructor.id)}
                            >
                              <MoreVertical size={18} />
                            </button>

                            {activeMenu === instructor.id && (
                              <div className={styles.dropdown}>
                                <div className={styles.dropdownItem}>View Full Profile</div>
                                <div className={styles.dropdownItem}>View Content Catalog</div>
                                <div className={styles.dropdownItem}>Set Commission Rate</div>
                                <div className={styles.dropdownDivider}></div>
                                {instructor.status === 'Active' ? (
                                  <div className={`${styles.dropdownItem} ${styles.dangerText}`}>Suspend Educator</div>
                                ) : (
                                  <div className={`${styles.dropdownItem} ${styles.successText}`}>Reactivate Account</div>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>

        {/* Right Col: Invite & Highlights */}
        <div className={styles.sidePanel}>
          
          <div className={`glass-card ${styles.inviteWidget}`}>
            <h3 className={styles.widgetTitle}>Quick Invite</h3>
            <p className={styles.widgetDesc}>Send an onboarding invitation link to a new educator.</p>
            
            <div className={styles.inviteForm}>
              <div className={styles.inputGroup}>
                <label>Educator Email</label>
                <input type="email" placeholder="professor@university.edu" className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label>Assign Role / Department</label>
                <select className={styles.select}>
                  <option>Mathematics Dept.</option>
                  <option>Science Dept.</option>
                  <option>Humanities Dept.</option>
                  <option>Guest Lecturer</option>
                </select>
              </div>
              <button className={`btn btn-primary ${styles.fullWidthBtn}`}>
                <Mail size={16} /> Send Invitation Link
              </button>
            </div>
          </div>

          <div className={`glass-card ${styles.statsWidget}`}>
            <h3 className={styles.widgetTitle}>Top Performers</h3>
            <div className={styles.topList}>
              {[INSTRUCTORS[4], INSTRUCTORS[0]].map((top, idx) => (
                <div key={idx} className={styles.topItem}>
                  <div className={styles.topRank}>#{idx + 1}</div>
                  <div className={styles.topInfo}>
                    <p className={styles.topName}>{top.name}</p>
                    <p className={styles.topSubject}>{top.subject} • {top.rating} ⭐</p>
                  </div>
                  <div className={styles.topRevenue}>{top.revenue}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
