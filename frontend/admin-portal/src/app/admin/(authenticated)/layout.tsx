import React from 'react';
import Sidebar from '@/components/Sidebar';
import styles from './admin-layout.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebarWrapper}>
        <Sidebar />
      </aside>
      <main className={styles.mainContentWrapper}>
        <div className={styles.topbar}>
          {/* We can add a top header/search bar later if needed */}
          <div className={styles.breadcrumbPlaceholder}>
            <span className={styles.greeting}>Welcome back, Admin 👋</span>
          </div>
          <div className={styles.userProfile}>
            <div className={styles.avatar}>A</div>
          </div>
        </div>
        <div className={styles.contentArea}>
          {children}
        </div>
      </main>
    </div>
  );
}
