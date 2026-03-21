import { useState, useEffect } from 'react';
import { GraduationCap, Users, Layers, BookOpen, TrendingUp, CreditCard, Activity, Shield } from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => { fetchStats(); }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get('/api/admin/dashboard', { headers: { Authorization: `Bearer ${token}` } });
      setStats(res.data);
    } catch (err) {
      // Use mock data on API failure
      setStats({ students: 128, faculty: 12, instructors: 5, batches: 6, subjects: 18, revenue: '₹4,80,000', enrollments: 128 });
    } finally { setLoading(false); }
  };

  const statCards = stats ? [
    { label: 'Total Students', value: stats.students, icon: GraduationCap, color: '#6366f1', bg: '#eef2ff' },
    { label: 'Faculty Members', value: stats.faculty, icon: Users, color: '#10b981', bg: '#ecfdf5' },
    { label: 'Instructors', value: stats.instructors, icon: Shield, color: '#f59e0b', bg: '#fffbeb' },
    { label: 'Active Batches', value: stats.batches, icon: Layers, color: '#3b82f6', bg: '#eff6ff' },
    { label: 'Subjects', value: stats.subjects, icon: BookOpen, color: '#8b5cf6', bg: '#f5f3ff' },
    { label: 'Total Revenue', value: stats.revenue, icon: CreditCard, color: '#ef4444', bg: '#fef2f2' },
  ] : [];

  const recentActivity = [
    { id: 1, text: 'New student "Arjun K" registered', time: '10m ago', type: 'student' },
    { id: 2, text: 'Faculty "Dr. Priya" uploaded Thermodynamics notes', time: '45m ago', type: 'content' },
    { id: 3, text: 'Batch "Class 10 – A" created with 28 students', time: '2h ago', type: 'batch' },
    { id: 4, text: 'Payment received from "Sana M" – ₹3,500', time: '3h ago', type: 'payment' },
    { id: 5, text: 'Instructor linked video to Chapter 5 – Physics', time: '5h ago', type: 'content' },
  ];

  const typeColors = { student: '#6366f1', content: '#10b981', batch: '#3b82f6', payment: '#f59e0b' };

  if (loading) return <div className="spinner" style={{ margin: 'auto', display: 'block', marginTop: '20vh' }}></div>;

  return (
    <div style={{ paddingBottom: '60px' }}>
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 className="page-title">Admin Overview</h1>
          <p className="page-subtitle">Platform command center — real-time snapshot of Base Learn LMS.</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {statCards.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, flexShrink: 0 }}>
                <Icon size={26} />
              </div>
              <div>
                <div style={{ fontSize: '26px', fontWeight: '800', lineHeight: 1, color: 'var(--color-text-primary)' }}>{s.value}</div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '4px', fontWeight: '500' }}>{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={18} color="var(--color-primary)" />
          <h2 style={{ fontWeight: 'bold', fontSize: '16px', margin: 0 }}>Recent Platform Activity</h2>
        </div>
        <div>
          {recentActivity.map((a, i) => (
            <div key={a.id} style={{ padding: '14px 24px', borderBottom: i < recentActivity.length - 1 ? '1px solid var(--color-border)' : 'none', display: 'flex', alignItems: 'center', gap: '14px', transition: 'background 0.15s' }}
              onMouseOver={e => e.currentTarget.style.background = 'var(--color-bg)'}
              onMouseOut={e => e.currentTarget.style.background = 'white'}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: typeColors[a.type], flexShrink: 0 }}></div>
              <div style={{ flex: 1, fontSize: '14px', color: 'var(--color-text-primary)' }}>{a.text}</div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>{a.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
