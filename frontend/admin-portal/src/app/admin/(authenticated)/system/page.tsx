'use client';

import React, { useState } from 'react';
import { 
  Activity, Terminal, Database, Server, 
  Cpu, HardDrive, AlertCircle, RefreshCw, 
  Search, Filter, Download, Trash2, Clock
} from 'lucide-react';
import styles from './system.module.css';

const LOGS = [
  { id: 1, time: '14:20:15', level: 'INFO', module: 'AUTH', msg: 'User login successful: user_8230' },
  { id: 2, time: '14:21:02', level: 'WARN', module: 'DB', msg: 'Connection pool near limit (85%)' },
  { id: 3, time: '14:22:15', level: 'ERROR', module: 'API', msg: 'Failed to fetch instructor roster - Timeout' },
  { id: 4, time: '14:23:44', level: 'INFO', module: 'SYSTEM', msg: 'Daily backup sequence initiated' },
  { id: 5, time: '14:25:01', level: 'INFO', module: 'AUTH', msg: 'Password reset requested: stu_4012' },
];

export default function SystemLogs() {
  const [filterLevel, setFilterLevel] = useState('ALL');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>System Health & Logs</h1>
          <p className={styles.subtitle}>Monitor real-time infrastructure metrics and audit system-wide activity logs.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={`btn btn-secondary ${styles.actionBtn}`}>
            <RefreshCw size={18} /> Refresh Metrics
          </button>
          <button className={`btn btn-primary ${styles.actionBtn}`}>
            <Download size={18} /> Export Full Logs
          </button>
        </div>
      </header>

      {/* Metrics Row */}
      <section className={styles.metricsGrid}>
        <div className={`glass-panel ${styles.metricCard}`}>
          <div className={styles.metricHeader}>
            <Cpu size={20} className={styles.cpuIcon} />
            <span className={styles.metricLabel}>CPU Usage</span>
          </div>
          <div className={styles.metricBody}>
            <h3 className={styles.metricVal}>12%</h3>
            <div className={styles.progressTrack}>
              <div className={styles.progressBar} style={{ width: '12%' }}></div>
            </div>
          </div>
        </div>

        <div className={`glass-panel ${styles.metricCard}`}>
          <div className={styles.metricHeader}>
            <Activity size={20} className={styles.ramIcon} />
            <span className={styles.metricLabel}>Memory Usage</span>
          </div>
          <div className={styles.metricBody}>
            <h3 className={styles.metricVal}>4.2 GB <small>/ 16GB</small></h3>
            <div className={styles.progressTrack}>
              <div className={styles.progressBar} style={{ width: '26%' }}></div>
            </div>
          </div>
        </div>

        <div className={`glass-panel ${styles.metricCard}`}>
          <div className={styles.metricHeader}>
            <Database size={20} className={styles.dbIcon} />
            <span className={styles.metricLabel}>DB Connections</span>
          </div>
          <div className={styles.metricBody}>
            <h3 className={styles.metricVal}>42 <small>Active</small></h3>
            <p className={styles.metricSub}>Latency: 12ms</p>
          </div>
        </div>

        <div className={`glass-panel ${styles.metricCard}`}>
          <div className={styles.metricHeader}>
            <Server size={20} className={styles.serverIcon} />
            <span className={styles.metricLabel}>Uptime</span>
          </div>
          <div className={styles.metricBody}>
            <h3 className={styles.metricVal}>99.99%</h3>
            <p className={styles.metricSub}>Online: 42 days</p>
          </div>
        </div>
      </section>

      {/* Logs Console */}
      <div className={`glass-card ${styles.logsCard}`}>
        <div className={styles.logsHeader}>
          <div className={styles.logsTitleWrapper}>
            <Terminal size={18} />
            <h3 className={styles.panelTitle}>Live System Console</h3>
          </div>
          <div className={styles.logsFilters}>
            <div className={styles.searchBox}>
              <Search size={14} className={styles.sIcon} />
              <input type="text" placeholder="Search entries..." className={styles.sInput} />
            </div>
            <select 
              className={styles.levelSelect}
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
            >
              <option value="ALL">All Levels</option>
              <option value="INFO">Info Only</option>
              <option value="WARN">Warnings</option>
              <option value="ERROR">Errors</option>
            </select>
            <button className={styles.clearBtn}><Trash2 size={16} /></button>
          </div>
        </div>

        <div className={styles.consoleBody}>
          <div className={styles.consoleScroll}>
            {LOGS.map((log) => (
              <div key={log.id} className={`${styles.logEntry} ${styles[`level${log.level}`]}`}>
                <span className={styles.logTime}>[{log.time}]</span>
                <span className={styles.logModule}>{log.module}</span>
                <span className={styles.logLevel}> {log.level} </span>
                <span className={styles.logMsg}>{log.msg}</span>
              </div>
            ))}
            <div className={styles.consoleCursor}>_</div>
          </div>
        </div>

        <div className={styles.logsFooter}>
          <div className={styles.statusInfo}>
             <Clock size={14} />
             <span>Last Refresh: Just Now</span>
          </div>
          <div className={styles.versionInfo}>
             <span>Core v2.4.1</span>
             <span>Admin v1.0.2</span>
          </div>
        </div>
      </div>

    </div>
  );
}
