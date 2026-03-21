import { useState, useEffect } from 'react';
import { Calendar, Users, Activity, Video } from 'lucide-react';

const FacultyDashboard = () => {
  const [loading, setLoading] = useState(false);

  const stats = [
    { id: 1, label: 'Assigned Batches', value: '4', type: 'primary', icon: Users },
    { id: 2, label: 'Upcoming Live Streams', value: '2', type: 'error', icon: Video },
    { id: 3, label: 'Pending Uploads', value: '5', type: 'warning', icon: Calendar },
    { id: 4, label: 'Avg Attendance', value: '88%', type: 'success', icon: Activity },
  ];

  if (loading) return <div className="spinner" style={{ margin: 'auto', display: 'block', marginTop: '20vh' }}></div>;

  return (
    <div style={{ paddingBottom: '60px' }}>
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 className="page-title">Faculty Dashboard</h1>
          <p className="page-subtitle">Welcome back. Manage your live sessions, content uploads, and track metrics.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="card" style={{ padding: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <div style={{ 
                width: '56px', height: '56px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `var(--color-${stat.type}-light)`, color: `var(--color-${stat.type})` 
              }}>
                <Icon size={28} />
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-3xl)', fontWeight: '800', lineHeight: 1, color: 'var(--color-text-primary)' }}>{stat.value}</div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginTop: '4px', fontWeight: '500' }}>{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card" style={{ padding: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold', marginBottom: '16px' }}>Upcoming Classes Payload</h2>
        <div style={{ padding: '30px', textAlign: 'center', border: '1px dashed var(--color-border)', borderRadius: '12px', color: 'var(--color-text-secondary)' }}>
          No classes scheduled for today. Navigate to the Live Sessions tab to broadcast.
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
