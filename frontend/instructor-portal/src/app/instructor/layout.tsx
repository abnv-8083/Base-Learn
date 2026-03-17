'use client';

import Sidebar from "@/components/Sidebar";
import styles from "./instructor-layout.module.css";
import { usePathname } from "next/navigation";

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/instructor/login";

  if (isLoginPage) {
    return <div className={styles.loginWrapper}>{children}</div>;
  }

  return (
    <div className={styles.outerContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <header className={styles.topHeader}>
           <div className={styles.headerInfo}>
             <h4 className={styles.pageTitle}>Instructor Terminal</h4>
           </div>
           <div className={styles.headerRight}>
             <div className={styles.systemStatus}>
               <div className={styles.statusDot}></div>
               <span>Service Online</span>
             </div>
           </div>
        </header>
        <div className={styles.viewContainer}>
          {children}
        </div>
      </main>
      
      {/* Ambient background glows */}
      <div className={styles.glow1}></div>
      <div className={styles.glow2}></div>
    </div>
  );
}
