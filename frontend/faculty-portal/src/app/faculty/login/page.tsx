'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Eye, EyeOff, Lock, Mail, 
  ArrowRight, ShieldCheck, GraduationCap 
} from 'lucide-react';
import styles from './login.module.css';

export default function FacultyLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    // Simulate auth lag
    setTimeout(() => {
      router.push('/faculty/dashboard');
    }, 1500);
  };

  return (
    <div className={styles.container}>
      {/* Visual background layers */}
      <div className={styles.gridOverlay}></div>
      <div className={styles.ambientGlow}></div>

      <div className={`glass-panel ${styles.loginCard}`}>
        <header className={styles.cardHeader}>
          <div className={styles.logoBadge}>
            <GraduationCap size={32} color="white" />
          </div>
          <h1 className={styles.title}>Faculty Access</h1>
          <p className={styles.subtitle}>Base Learn Academic Oversight Portal</p>
        </header>

        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Academic Email</label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} size={18} />
              <input 
                type="email" 
                placeholder="faculty@baselearn.edu" 
                className={styles.input}
                required 
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={18} />
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="••••••••" 
                className={styles.input}
                required 
              />
              <button 
                type="button" 
                className={styles.eyeBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className={styles.extras}>
            <label className={styles.rememberRow}>
              <input type="checkbox" className={styles.checkbox} />
              <span>Remember for 30 days</span>
            </label>
            <button type="button" className={styles.forgotBtn}>Forgot PIN?</button>
          </div>

          <button 
            type="submit" 
            className={`btn btn-primary ${styles.submitBtn}`}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? 'Authenticating...' : 'Sign In to Portal'}
            <ArrowRight size={18} />
          </button>
        </form>

        <footer className={styles.cardFooter}>
          <div className={styles.securityIndicator}>
            <ShieldCheck size={14} color="var(--color-success)" />
            <span>2FA Protection Required</span>
          </div>
        </footer>
      </div>

      <p className={styles.footerNote}>
        &copy; 2026 Antigravity OS • Restricted Academic Access
      </p>
    </div>
  );
}
