'use client';

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import styles from "./faculty-layout.module.css";

export default function FacultyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/faculty/login";

  if (isLoginPage) {
    return <div className={styles.loginWrapper}>{children}</div>;
  }

  return (
    <div className={styles.outerContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <header className={styles.topHeader}>
           <div className={styles.headerInfo}>
             <h4 className={styles.pageTitle}>Department Overview</h4>
           </div>
           <div className={styles.headerRight}>
             <div className={styles.systemStatus}>
               <div className={styles.statusDot}></div>
               <span>Central System Online</span>
             </div>
           </div>
        </header>
        <div className={styles.viewContainer}>
          {children}
        </div>
      </main>
      
      {/* Decorative ambient background elements */}
      <div className={styles.ambientGlow1}></div>
      <div className={styles.ambientGlow2}></div>
    </div>
  );
}
