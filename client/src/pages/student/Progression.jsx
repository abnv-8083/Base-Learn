import { useState, useEffect } from 'react';
import { Target, TrendingUp, Award, CheckCircle } from 'lucide-react';

const Progression = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []);

  if (loading) return <div className="spinner" style={{ margin: 'auto', display: 'block', marginTop: '20vh' }} />;

  return (
    <div>
      <div className="page-header" style={{ marginBottom: 'var(--space-8)' }}>
        <div className="page-header-inner">
          <div>
            <h1 className="page-title">Performance & Progression</h1>
            <p className="page-subtitle">Track your grades, attendance, and overall rank.</p>
          </div>
          <div className="page-header-actions">
            <button className="btn btn-ghost">Download Report Card</button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="stats-grid" style={{ marginBottom: 'var(--space-8)' }}>
        <div className="stat-card stat-card--success">
          <div className="stat-card-header">
            <div className="stat-card-icon"><Target size={22} /></div>
            <div className="stat-card-trend up">↑ 3.2%</div>
          </div>
          <div>
            <div className="stat-card-value">A-</div>
            <div className="stat-card-label">Current Average Grade</div>
          </div>
        </div>

        <div className="stat-card stat-card--accent">
          <div className="stat-card-header">
            <div className="stat-card-icon"><TrendingUp size={22} /></div>
            <div className="stat-card-trend up">Top 15%</div>
          </div>
          <div>
            <div className="stat-card-value">12th</div>
            <div className="stat-card-label">Batch Rank (out of 180)</div>
          </div>
        </div>

        <div className="stat-card stat-card--warning">
          <div className="stat-card-header">
            <div className="stat-card-icon"><Award size={22} /></div>
            <div className="stat-card-trend up">↑ 5 pts</div>
          </div>
          <div>
            <div className="stat-card-value">850</div>
            <div className="stat-card-label">Total Skill Points</div>
          </div>
        </div>

        <div className="stat-card stat-card--student">
          <div className="stat-card-header">
            <div className="stat-card-icon"><CheckCircle size={22} /></div>
            <div className="stat-card-trend down">↓ 1.5%</div>
          </div>
          <div>
            <div className="stat-card-value">91%</div>
            <div className="stat-card-label">Overall Attendance</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: 'var(--space-8)' }} className="dashboard-grid--1-on-mobile">
        
        {/* Course Progress Breakdown */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Subject Mastery Breakdown</h3>
          </div>
          <div className="card-body">
            
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <div className="progress-bar-wrap" style={{ marginBottom: 'var(--space-3)' }}>
                <div className="progress-bar-label">
                  <span style={{ fontWeight: 600 }}>Data Structures & Algorithms</span>
                  <span style={{ fontWeight: '800', fontSize: 'var(--text-lg)' }}>92%</span>
                </div>
                <div className="progress-bar-track progress-bar-track--lg">
                  <div className="progress-bar-fill progress-bar-fill--success" style={{ width: `92%` }}></div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                <span>Assignments: <span className="badge badge-success" style={{ padding: '2px 8px' }}>12/12</span></span>
                <span>Quizzes: <span className="badge badge-success" style={{ padding: '2px 8px' }}>4/4</span></span>
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-6)' }}>
              <div className="progress-bar-wrap" style={{ marginBottom: 'var(--space-3)' }}>
                <div className="progress-bar-label">
                  <span style={{ fontWeight: 600 }}>Physics (Thermodynamics)</span>
                  <span style={{ fontWeight: '800', fontSize: 'var(--text-lg)' }}>65%</span>
                </div>
                <div className="progress-bar-track progress-bar-track--lg">
                  <div className="progress-bar-fill progress-bar-fill--warning" style={{ width: `65%` }}></div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                <span>Assignments: <span className="badge badge-warning" style={{ padding: '2px 8px' }}>5/8</span></span>
                <span>Midterm: <span className="badge badge-muted" style={{ padding: '2px 8px' }}>Pending</span></span>
              </div>
            </div>

            <div>
              <div className="progress-bar-wrap" style={{ marginBottom: 'var(--space-3)' }}>
                <div className="progress-bar-label">
                  <span style={{ fontWeight: 600 }}>Calculus III</span>
                  <span style={{ fontWeight: '800', fontSize: 'var(--text-lg)', color: 'var(--color-error)' }}>40%</span>
                </div>
                <div className="progress-bar-track progress-bar-track--lg">
                  <div className="progress-bar-fill progress-bar-fill--error" style={{ width: `40%` }}></div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                <span>Assignments: <span className="badge badge-error" style={{ padding: '2px 8px' }}>2/6 Late</span></span>
                <span>Warning: <span className="badge badge-error" style={{ padding: '2px 8px' }}>At-Risk</span></span>
              </div>
            </div>

          </div>
        </div>

        {/* Recent Grades Table */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Grades</h3>
            <button className="btn btn-ghost btn-xs">History</button>
          </div>
          <div className="table-wrap" style={{ margin: 0, border: 'none', borderRadius: 0 }}>
            <table className="table" style={{ fontSize: 'var(--text-sm)' }}>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Score</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600 }}>Binary Trees Quiz</td>
                  <td><strong>18</strong>/20</td>
                  <td><span className="badge badge-success">A</span></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Thermo Essay</td>
                  <td><strong>42</strong>/50</td>
                  <td><span className="badge badge-success">B+</span></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Calc Integration Test</td>
                  <td><strong>12</strong>/30</td>
                  <td><span className="badge badge-error">F</span></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>OOP Assignment 1</td>
                  <td><strong>100</strong>/100</td>
                  <td><span className="badge badge-success">A+</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Progression;
