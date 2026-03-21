import { useEffect, useState } from 'react';
import { GitMerge, Users, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import instructorService from '../../services/instructorService';

const InstructorDashboard = () => {
  const [statsData, setStatsData] = useState({ totalBatches: 0, scheduledVideos: 0, totalStudents: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await instructorService.getDashboardStats();
        setStatsData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { id: 1, label: 'Scheduled Drops', value: statsData.scheduledVideos?.toString() || '0', type: 'warning', icon: Clock },
    { id: 2, label: 'Active Batches', value: statsData.totalBatches?.toString() || '0', type: 'success', icon: Users },
    { id: 3, label: 'Total Students', value: statsData.totalStudents.toString(), type: 'info', icon: Users },
  ];

  const recentActivity = [
    { id: 1, text: 'System Online - Reporting tracking enabled.', time: 'Just now', icon: CheckCircle },
  ];

  if (loading) return <div style={{ padding: 'var(--space-6)' }}>Loading dashboard...</div>;

  return (
    <div>
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="page-header-inner">
          <div>
            <h1 className="page-title">Instructor Overview</h1>
            <p className="page-subtitle">Coordinate faculty content and student cohorts effectively.</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
        {stats.map(stat => {
          const Icon = stat.icon;
          const typeColor = stat.type === 'info' ? 'primary' : stat.type;
          return (
            <div key={stat.id} className="card" style={{ padding: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <div style={{ 
                width: '56px', height: '56px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `var(--color-${typeColor}-light)`, color: `var(--color-${typeColor})` 
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
        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold', marginBottom: 'var(--space-6)' }}>System Activity Log</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {recentActivity.map(act => {
            const ActIcon = act.icon;
            return (
              <div key={act.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ color: 'var(--color-text-secondary)' }}><ActIcon size={20} /></div>
                <div style={{ flex: 1, fontWeight: '500', color: 'var(--color-text-primary)' }}>{act.text}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>{act.time}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
