'use client';

import React, { useState } from 'react';
import { 
  Search, Filter, MoreVertical, ShieldAlert, 
  Mail, Download, ChevronDown, Check, X
} from 'lucide-react';
import styles from './users.module.css';

// Mock Data
const MOCK_USERS = [
  { id: 'STU-1042', name: 'Alex Davidson', grade: '10th', email: 'alex.d@example.com', plan: 'Pro', status: 'Active', joined: 'Oct 12, 2025', lastLogin: '2 mins ago', avatar: 'A' },
  { id: 'STU-1043', name: 'Sarah Miller', grade: '8th', email: 'sarah.m@example.com', plan: 'Free', status: 'Pending', joined: 'Oct 14, 2025', lastLogin: 'Never', avatar: 'S' },
  { id: 'STU-1044', name: 'James Wilson', grade: '12th', email: 'j.wilson@example.com', plan: 'Pro', status: 'Suspended', joined: 'Sep 01, 2024', lastLogin: '3 days ago', avatar: 'J' },
  { id: 'STU-1045', name: 'Emma Thompson', grade: '10th', email: 'emma.t@example.com', plan: 'Premium', status: 'Active', joined: 'Jan 05, 2025', lastLogin: '1 hour ago', avatar: 'E' },
  { id: 'STU-1046', name: 'Michael Chang', grade: '9th', email: 'm.chang@example.com', plan: 'Free', status: 'Active', joined: 'Mar 22, 2025', lastLogin: '5 hours ago', avatar: 'M' },
];

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleSelectUser = (id: string) => {
    setSelectedUsers(prev => 
      prev.includes(id) ? prev.filter(uId => uId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === MOCK_USERS.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(MOCK_USERS.map(u => u.id));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return <span className={`${styles.badge} ${styles.badgeSuccess}`}>Active</span>;
      case 'Suspended': return <span className={`${styles.badge} ${styles.badgeDanger}`}>Suspended</span>;
      case 'Pending': return <span className={`${styles.badge} ${styles.badgeWarning}`}>Pending</span>;
      default: return <span className={`${styles.badge} ${styles.badgeNeutral}`}>Unknown</span>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'Pro': return <span className={`${styles.planBadge} ${styles.planPro}`}>{plan}</span>;
      case 'Premium': return <span className={`${styles.planBadge} ${styles.planPremium}`}>{plan}</span>;
      default: return <span className={`${styles.planBadge} ${styles.planFree}`}>{plan}</span>;
    }
  };

  return (
    <div className={styles.pageContainer}>
      
      {/* Header Actions */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Student Management</h1>
          <p className={styles.pageSubtitle}>Manage accounts, subscriptions, and access for 45,241 total students.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={`btn btn-secondary ${styles.actionButton}`}>
            <Download size={18} /> Export CSV
          </button>
          <button className={`btn btn-primary ${styles.actionButton}`}>
            + Add User
          </button>
        </div>
      </div>

      <div className={`glass-card ${styles.tableContainer}`}>
        
        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search by name, email, or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.filters}>
            <button className={styles.filterBtn}>
              Grade <ChevronDown size={14} />
            </button>
            <button className={styles.filterBtn}>
              Status <ChevronDown size={14} />
            </button>
            <button className={styles.filterBtn}>
              Plan <ChevronDown size={14} />
            </button>
            <button className={`btn btn-secondary ${styles.advancedFilterBtn}`}>
              <Filter size={16} /> Advanced Filters
            </button>
          </div>
        </div>

        {/* Bulk Actions Banner (appears when items selected) */}
        {selectedUsers.length > 0 && (
          <div className={styles.bulkActionsBanner}>
            <span className={styles.selectedCount}>{selectedUsers.length} students selected</span>
            <div className={styles.bulkButtons}>
              <button className={styles.bulkBtn}><Mail size={16} /> Email Selected</button>
              <button className={styles.bulkBtn}><ShieldAlert size={16} /> Suspend Selected</button>
            </div>
            <button className={styles.clearSelectionBtn} onClick={() => setSelectedUsers([])}>
              <X size={16} />
            </button>
          </div>
        )}

        {/* The Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th className={styles.thCheck}>
                  <input 
                    type="checkbox" 
                    checked={selectedUsers.length === MOCK_USERS.length && MOCK_USERS.length > 0}
                    onChange={toggleSelectAll}
                    className={styles.checkbox}
                  />
                </th>
                <th>Student</th>
                <th>Grade</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Last Login</th>
                <th className={styles.thAction}></th>
              </tr>
            </thead>
            <tbody>
              {MOCK_USERS.map((user) => (
                <tr key={user.id} className={selectedUsers.includes(user.id) ? styles.rowSelected : ''}>
                  <td className={styles.tdCheck}>
                    <input 
                      type="checkbox" 
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleSelectUser(user.id)}
                      className={styles.checkbox}
                    />
                  </td>
                  <td>
                    <div className={styles.userCell}>
                      <div className={styles.avatar}>{user.avatar}</div>
                      <div className={styles.userInfo}>
                        <span className={styles.userName}>{user.name}</span>
                        <span className={styles.userEmail}>{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className={styles.gradeCell}>{user.grade}</td>
                  <td>{getPlanBadge(user.plan)}</td>
                  <td>{getStatusBadge(user.status)}</td>
                  <td className={styles.dateCell}>{user.joined}</td>
                  <td className={styles.dateCell}>{user.lastLogin}</td>
                  <td className={styles.tdAction}>
                    <div className={styles.actionMenuWrapper}>
                      <button 
                        className={styles.actionMenuBtn}
                        onClick={() => setActiveDropdown(activeDropdown === user.id ? null : user.id)}
                      >
                        <MoreVertical size={18} />
                      </button>
                      
                      {activeDropdown === user.id && (
                        <div className={styles.dropdownMenu}>
                          <div className={styles.dropdownItem}>View Profile</div>
                          <div className={styles.dropdownItem}>Edit Details</div>
                          <div className={styles.dropdownItem}>Upgrade Plan</div>
                          <div className={styles.dropdownDivider}></div>
                          {user.status === 'Active' ? (
                            <div className={`${styles.dropdownItem} ${styles.textDanger}`}>Suspend Account</div>
                          ) : (
                            <div className={`${styles.dropdownItem} ${styles.textSuccess}`}>Reactivate Account</div>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <span className={styles.pageInfo}>Showing 1 to 5 of 45,241 results</span>
          <div className={styles.pageControls}>
            <button className={styles.pageBtn} disabled>Previous</button>
            <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>3</button>
            <span className={styles.pageDots}>...</span>
            <button className={styles.pageBtn}>Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}
