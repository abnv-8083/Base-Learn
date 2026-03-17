'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, UserPlus, Fingerprint, 
  Key, Info, Check, X, ChevronRight, 
  MoreVertical, Lock, Unlock, Eye
} from 'lucide-react';
import styles from './roles.module.css';

const ROLES = [
  { id: '1', name: 'Super Admin', description: 'Full system access, can manage all users and settings.', users: 3, level: 'Level 10' },
  { id: '2', name: 'Moderator', description: 'Can review content, flag users, and manage course states.', users: 12, level: 'Level 5' },
  { id: '3', name: 'Support Agent', description: 'Access to user profiles and billing history for help tickets.', users: 24, level: 'Level 3' },
  { id: '4', name: 'Faculty Lead', description: 'Restricted to managing instructors and department reports.', users: 8, level: 'Level 7' },
];

const PERMISSIONS = [
  { module: 'User Management', read: true, write: true, delete: true },
  { module: 'Financial Data', read: true, write: false, delete: false },
  { module: 'System Settings', read: true, write: true, delete: true },
  { module: 'Content Moderation', read: true, write: true, delete: false },
  { module: 'Analytics & Reports', read: true, write: false, delete: false },
];

export default function RolesPermissions() {
  const [selectedRole, setSelectedRole] = useState(ROLES[0]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Roles & Permissions</h1>
          <p className={styles.subtitle}>Define access levels and administrative privileges using Role-Based Access Control (RBAC).</p>
        </div>
        <button className={`btn btn-primary ${styles.btnAction}`}>
          <UserPlus size={18} /> Create Custom Role
        </button>
      </header>

      <div className={styles.mainGrid}>
        
        {/* Left: Role Selection */}
        <div className={styles.roleListColumn}>
          <div className={`glass-card ${styles.roleCard}`}>
            <h3 className={styles.panelTitle}>Active Roles</h3>
            <div className={styles.rolesList}>
              {ROLES.map((role) => (
                <button 
                  key={role.id}
                  className={`${styles.roleItem} ${selectedRole.id === role.id ? styles.activeRole : ''}`}
                  onClick={() => setSelectedRole(role)}
                >
                  <div className={styles.roleHeader}>
                    <span className={styles.roleName}>{role.name}</span>
                    <span className={styles.levelBadge}>{role.level}</span>
                  </div>
                  <p className={styles.roleDesc}>{role.description}</p>
                  <div className={styles.roleFooter}>
                    <span className={styles.userCount}>{role.users} active users</span>
                    <ChevronRight size={16} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className={`glass-panel ${styles.securityWidget}`}>
            <p className={styles.widgetText}>
              <Info size={16} /> All administrative actions are logged in the <strong>Audit Trail</strong> for compliance.
            </p>
          </div>
        </div>

        {/* Right: Permission Matrix */}
        <div className={styles.matrixColumn}>
          <div className={`glass-card ${styles.matrixCard}`}>
            
            <div className={styles.matrixHeader}>
              <div className={styles.matrixTitle}>
                <ShieldCheck size={20} className={styles.shieldIcon} />
                <div>
                  <h3 className={styles.panelTitle}>Permissions Matrix</h3>
                  <p className={styles.subtext}>Modifying permissions for: <strong>{selectedRole.name}</strong></p>
                </div>
              </div>
              <button className={`btn btn-secondary ${styles.btnSave}`}>Reset to Default</button>
            </div>

            <div className={styles.matrixTableWrapper}>
              <table className={styles.matrixTable}>
                <thead>
                  <tr>
                    <th>Module / Resource</th>
                    <th className={styles.centerAlign}><Eye size={16} /> Read</th>
                    <th className={styles.centerAlign}><Unlock size={16} /> Write</th>
                    <th className={styles.centerAlign}><Lock size={16} /> Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {PERMISSIONS.map((perm, i) => (
                    <tr key={i} className={styles.matrixRow}>
                      <td className={styles.moduleName}>{perm.module}</td>
                      <td className={styles.centerAlign}>
                        <button className={`${styles.permToggle} ${perm.read ? styles.permEnabled : ''}`}>
                          {perm.read ? <Check size={14} /> : <X size={14} />}
                        </button>
                      </td>
                      <td className={styles.centerAlign}>
                        <button className={`${styles.permToggle} ${perm.write ? styles.permEnabled : ''}`}>
                          {perm.write ? <Check size={14} /> : <X size={14} />}
                        </button>
                      </td>
                      <td className={styles.centerAlign}>
                        <button className={`${styles.permToggle} ${perm.delete ? styles.permEnabled : ''}`}>
                          {perm.delete ? <Check size={14} /> : <X size={14} />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.matrixFooter}>
              <div className={styles.mfaStatus}>
                <Fingerprint size={16} />
                <span>MFA Enforcement: Enabled for this role</span>
              </div>
              <button className={`btn btn-primary ${styles.btnApply}`}>Apply Permissions</button>
            </div>

          </div>

          <div className={`glass-panel ${styles.inheritanceWidget}`}>
             <Key size={20} className={styles.keyIcon} />
             <div className={styles.inheritanceText}>
               <h4 className={styles.iTitle}>Role Inheritance</h4>
               <p className={styles.iDesc}>{selectedRole.name} inherits basic permissions from the Standard User role.</p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
