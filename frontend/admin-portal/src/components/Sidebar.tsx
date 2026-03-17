'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, Users, GraduationCap, UsersRound, LibraryBig, 
  CreditCard, BarChart4, Bell, Settings, ShieldCheck, 
  Server, Mail, ShieldHalf 
} from 'lucide-react';
import styles from './sidebar.module.css';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
  { name: 'User Management', href: '/admin/users', icon: Users },
  { name: 'Instructor Mgmt', href: '/admin/instructors', icon: GraduationCap },
  { name: 'Faculty Mgmt', href: '/admin/faculty', icon: UsersRound },
  { name: 'Course & Content', href: '/admin/content', icon: LibraryBig },
  { name: 'Payments', href: '/admin/payments', icon: CreditCard },
  { name: 'Reports & Analytics', href: '/admin/reports', icon: BarChart4 },
  { name: 'Notifications', href: '/admin/notifications', icon: Bell },
  { name: 'Platform Settings', href: '/admin/settings', icon: Settings },
  { name: 'Roles & Permissions', href: '/admin/roles', icon: ShieldCheck },
  { name: 'System & Logs', href: '/admin/system', icon: Server },
  { name: 'Email Templates', href: '/admin/emails', icon: Mail },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.brand}>
        <div className={styles.logoIcon}>
          <ShieldHalf size={24} />
        </div>
        <span className={styles.brandName}>Base Learn</span>
        <span className={styles.badge}>ADMIN</span>
      </div>

      <div className={styles.navSection}>
        <p className={styles.navLabel}>MAIN MENU</p>
        <nav className={styles.navLinks}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== '/admin');

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              >
                <Icon size={20} className={styles.icon} />
                <span className={styles.itemName}>{item.name}</span>
                {isActive && <div className={styles.activeIndicator} />}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.systemStatus}>
          <div className={styles.statusDot}></div>
          <span>All Systems Operational</span>
        </div>
      </div>
    </div>
  );
}
