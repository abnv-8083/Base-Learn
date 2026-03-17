'use client';

import React, { useState } from 'react';
import { ShieldCheck, Eye, EyeOff, Lock, User, ArrowRight } from 'lucide-react';
import styles from './login.module.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      window.location.href = '/admin/dashboard';
    }, 1200);
  };

  return (
    <div className={styles.loginContainer}>
      {/* Decorative background elements for premium feel */}
      <div className={styles.ambientGlowPrimary}></div>
      <div className={styles.ambientGlowSecondary}></div>
      <div className={styles.gridOverlay}></div>

      <div className={styles.loginCardWrapper}>
        <div className={`glass-card ${styles.loginCard}`}>
          
          {/* Header */}
          <div className={styles.cardHeader}>
            <div className={styles.iconWrapper}>
              <ShieldCheck size={36} strokeWidth={1.5} />
            </div>
            <h1 className={styles.title}>Admin Portal</h1>
            <p className={styles.subtitle}>Sign in to manage Base Learn</p>
          </div>

          <div className={styles.ipBadge}>
            <span className={styles.statusDot}></span>
            IP Whitelist Active • 192.168.1.1
          </div>

          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <div className={styles.inputWrapper}>
                <User size={18} className={styles.inputIcon} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@baselearn.com"
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <div className={styles.inputWrapper}>
                <Lock size={18} className={styles.inputIcon} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button" 
                  className={styles.toggleVisibility}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <div className={styles.securityNote}>
              <div className={styles.twoFactorBadge}>2FA Required</div>
              <a href="#" className={styles.forgotLink}>Forgot password?</a>
            </div>

            <button 
              type="submit" 
              className={`btn btn-primary ${styles.submitButton} ${loading ? styles.loading : ''}`}
              disabled={loading}
            >
              {loading ? (
                <div className={styles.spinner}></div>
              ) : (
                <>Sign In Securely <ArrowRight size={18} /></>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
