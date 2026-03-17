'use client';

import React from 'react';
import { 
  Users, UserCheck, PlayCircle, DollarSign, 
  TrendingUp, TrendingDown, Activity, Server, 
  Database, Wifi, Clock, AlertCircle, CheckCircle2 
} from 'lucide-react';
import styles from './dashboard.module.css';

export default function AdminDashboard() {
  return (
    <div className={styles.dashboardContainer}>
      
      {/* Live Metrics Row */}
      <section className={styles.liveMetricsSection}>
        <div className={`glass-panel ${styles.liveMetricCard}`}>
          <div className={styles.metricHeader}>
            <div className={styles.metricTitle}>Active Users Right Now</div>
            <div className={styles.pulsingDot}></div>
          </div>
          <div className={styles.metricValue}>1,245</div>
          <div className={styles.metricTrend}>
            <TrendingUp size={16} className={styles.trendUp} />
            <span className={styles.trendUpText}>+12%</span> vs last hour
          </div>
        </div>

        <div className={`glass-panel ${styles.liveMetricCard}`}>
          <div className={styles.metricHeader}>
            <div className={styles.metricTitle}>New Registrations Today</div>
            <UserCheck size={20} className={styles.metricIcon} />
          </div>
          <div className={styles.metricValue}>342</div>
          <div className={styles.metricTrend}>
            <TrendingUp size={16} className={styles.trendUp} />
            <span className={styles.trendUpText}>+5%</span> vs yesterday
          </div>
        </div>

        <div className={`glass-panel ${styles.liveMetricCard}`}>
          <div className={styles.metricHeader}>
            <div className={styles.metricTitle}>Revenue Today</div>
            <DollarSign size={20} className={styles.metricIcon} />
          </div>
          <div className={styles.metricValue}>$4,250</div>
          <div className={styles.metricTrend}>
            <TrendingDown size={16} className={styles.trendDown} />
            <span className={styles.trendDownText}>-2%</span> vs yesterday
          </div>
        </div>

        <div className={`glass-panel ${styles.liveMetricCard}`}>
          <div className={styles.metricHeader}>
            <div className={styles.metricTitle}>Classes Watched Today</div>
            <PlayCircle size={20} className={styles.metricIcon} />
          </div>
          <div className={styles.metricValue}>8,920</div>
          <div className={styles.metricTrend}>
            <TrendingUp size={16} className={styles.trendUp} />
            <span className={styles.trendUpText}>+18%</span> vs yesterday
          </div>
        </div>
      </section>

      {/* KPI Summary Cards */}
      <section className={styles.kpiSection}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Total Students</div>
          <div className={styles.kpiNumber}>45.2k</div>
        </div>
        <div className={styles.kpiDivider}></div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Total Instructors</div>
          <div className={styles.kpiNumber}>340</div>
        </div>
        <div className={styles.kpiDivider}></div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Total Faculty</div>
          <div className={styles.kpiNumber}>45</div>
        </div>
        <div className={styles.kpiDivider}></div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Total Courses</div>
          <div className={styles.kpiNumber}>1,200</div>
        </div>
        <div className={styles.kpiDivider}></div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Total Revenue (MTD)</div>
          <div className={styles.kpiNumber}>$124.5k</div>
        </div>
      </section>

      {/* Main Grid: Charts & Health */}
      <div className={styles.mainGrid}>
        
        {/* Left Column */}
        <div className={styles.leftColumn}>
          {/* Charts Placeholder */}
          <div className={`glass-card ${styles.chartCard}`}>
            <h3 className={styles.sectionTitle}>User Growth <span>(Last 30 Days)</span></h3>
            <div className={styles.chartPlaceholder}>
              {/* Decorative area chart representation using CSS */}
              <div className={styles.mockAreaChart}></div>
            </div>
          </div>

          <div className={`glass-card ${styles.chartCard}`}>
            <h3 className={styles.sectionTitle}>Revenue Tracking</h3>
            <div className={styles.chartPlaceholder}>
              {/* Decorative bar chart representation */}
              <div className={styles.mockBarChart}>
                {[40, 60, 45, 80, 55, 90, 75].map((h, i) => (
                  <div key={i} className={styles.mockBar} style={{ height: `${h}%` }}></div>
                ))}
                <div className={styles.mockTargetLine}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          
          {/* Platform Health Monitor */}
          <div className={`glass-card ${styles.healthCard}`}>
            <h3 className={styles.sectionTitle}>Platform Health</h3>
            
            <div className={styles.healthList}>
              <div className={styles.healthItem}>
                <div className={styles.healthItemLeft}>
                  <Server size={18} className={styles.healthIconBlue} />
                  <span>Main Servers</span>
                </div>
                <div className={styles.healthStatusGood}>
                  <CheckCircle2 size={16} /> Operational
                </div>
              </div>

              <div className={styles.healthItem}>
                <div className={styles.healthItemLeft}>
                  <Database size={18} className={styles.healthIconBlue} />
                  <span>Storage Used</span>
                </div>
                <div className={styles.healthProgressWrapper}>
                  <div className={styles.healthProgressBar}>
                    <div className={styles.healthProgressFill} style={{ width: '74%' }}></div>
                  </div>
                  <span className={styles.healthProgressText}>74% (12TB)</span>
                </div>
              </div>

              <div className={styles.healthItem}>
                <div className={styles.healthItemLeft}>
                  <Wifi size={18} className={styles.healthIconBlue} />
                  <span>Video Uptime</span>
                </div>
                <div className={styles.healthStatusGood}>
                  99.98%
                </div>
              </div>

              <div className={styles.healthItem}>
                <div className={styles.healthItemLeft}>
                  <Clock size={18} className={styles.healthIconWarning} />
                  <span>API Response</span>
                </div>
                <div className={styles.healthStatusWarning}>
                  <AlertCircle size={16} /> 450ms (Degraded)
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Log */}
          <div className={`glass-card ${styles.activityCard}`}>
            <div className={styles.activityHeader}>
              <h3 className={styles.sectionTitle}>Live Activity</h3>
              <Activity size={18} className={styles.activityLiveIcon} />
            </div>
            
            <div className={styles.activityFeed}>
              {[
                { type: 'signup', text: 'New student registered: Alex D.', time: 'Just now' },
                { type: 'payment', text: 'Subscription renewed: Pro Plan', time: '2m ago' },
                { type: 'upload', text: 'Dr. Smith uploaded "Physics 101"', time: '15m ago' },
                { type: 'report', text: 'Comment flagged for moderation', time: '42m ago' },
                { type: 'signup', text: 'New student registered: Sarah M.', time: '1h ago' },
              ].map((act, i) => (
                <div key={i} className={styles.activityItem}>
                  <div className={`${styles.activityDot} ${styles[`dot_${act.type}`]}`}></div>
                  <div className={styles.activityContent}>
                    <p>{act.text}</p>
                    <span>{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
