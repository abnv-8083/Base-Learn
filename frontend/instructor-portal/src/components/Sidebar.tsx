'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, BookOpen, UploadCloud, 
  ClipboardList, Beaker, Users, 
  BarChart3, MessageSquare, Megaphone, 
  Settings, LogOut, GraduationCap,
  ChevronRight
} from 'lucide-react';
import styles from './sidebar.module.css';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/instructor/dashboard' },
  { label: 'My Courses', icon: <BookOpen size={20} />, href: '/instructor/courses' },
  { label: 'Upload Class', icon: <UploadCloud size={20} />, href: '/instructor/upload' },
  { label: 'Assignments', icon: <ClipboardList size={20} />, href: '/instructor/assignments' },
  { label: 'Tests & Quizzes', icon: <Beaker size={20} />, href: '/instructor/tests' },
  { label: 'My Students', icon: <Users size={20} />, href: '/instructor/students' },
  { label: 'Analytics', icon: <BarChart3 size={20} />, href: '/instructor/analytics' },
  { label: 'Doubts Inbox', icon: <MessageSquare size={20} />, href: '/instructor/doubts' },
  { label: 'Announcements', icon: <Megaphone size={20} />, href: '/instructor/announcements' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.logoSquare}>
          <GraduationCap size={26} color="white" />
        </div>
        <div className={styles.brandInfo}>
          <h1 className={styles.brandName}>Base Learn</h1>
          <span className={styles.portalTag}>Instructor Portal</span>
        </div>
      </div>

      <div className={styles.scrollArea}>
        <nav className={styles.navSection}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className={styles.footer}>
        <div className={styles.userProfile}>
           <div className={styles.avatar}>PK</div>
           <div className={styles.userInfo}>
              <p className={styles.userName}>Praveen Kumar</p>
              <p className={styles.userRole}>Physics Specialist</p>
           </div>
        </div>

        <button className={styles.signOutBtn}>
           <LogOut size={18} />
           <span>Secure Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

