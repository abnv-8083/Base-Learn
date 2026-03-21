import { TrendingUp, Users, PlayCircle, CreditCard, BookOpen, Activity } from 'lucide-react';

const AdminAnalytics = () => {
  const metrics = [
    { label: 'Total Students', value: 128, sub: '+12 this month', color: '#6366f1', bg: '#eef2ff', icon: Users },
    { label: 'Lectures Watched', value: '3,840', sub: 'Last 30 days', color: '#10b981', bg: '#ecfdf5', icon: PlayCircle },
    { label: 'Avg. Completion Rate', value: '72%', sub: 'Across all subjects', color: '#f59e0b', bg: '#fffbeb', icon: TrendingUp },
    { label: 'Revenue Collected', value: '₹4,80,000', sub: 'From 128 enrollments', color: '#ef4444', bg: '#fef2f2', icon: CreditCard },
  ];

  const subjectStats = [
    { name: 'Physics', completion: 78, students: 94 },
    { name: 'Chemistry', completion: 65, students: 87 },
    { name: 'Mathematics', completion: 82, students: 110 },
    { name: 'Biology', completion: 59, students: 72 },
    { name: 'English', completion: 88, students: 128 },
  ];

  const paymentRows = [
    { student: 'Arjun Kumar', batch: 'Class 10 – A', amount: '₹3,500', date: 'Mar 15, 2026', status: 'Paid' },
    { student: 'Sana Malik', batch: 'Class 10 – A', amount: '₹3,500', date: 'Mar 12, 2026', status: 'Paid' },
    { student: 'Rahul Dev', batch: 'Class 9 – B', amount: '₹3,000', date: 'Mar 10, 2026', status: 'Pending' },
    { student: 'Priya Sharma', batch: 'Class 9 – B', amount: '₹3,000', date: 'Mar 8, 2026', status: 'Paid' },
    { student: 'Vikram Nair', batch: 'Class 8 – A', amount: '₹2,500', date: 'Mar 5, 2026', status: 'Paid' },
  ];

  return (
    <div style={{ paddingBottom: '60px' }}>
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <h1 className="page-title">Platform Analytics</h1>
        <p className="page-subtitle">Monitor engagement, completion rates, and financial performance across the platform.</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="card" style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: m.color, flexShrink: 0 }}>
                <Icon size={24} />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '800', lineHeight: 1, color: 'var(--color-text-primary)' }}>{m.value}</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '3px' }}>{m.label}</div>
                <div style={{ fontSize: '11px', color: m.color, marginTop: '2px', fontWeight: '600' }}>{m.sub}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '28px' }}>
        {/* Subject Completion */}
        <div className="card" style={{ padding: '24px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <BookOpen size={18} color="var(--color-primary)" />
            <h2 style={{ fontWeight: 'bold', fontSize: '16px', margin: 0 }}>Subject Completion Rates</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {subjectStats.map(s => (
              <div key={s.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '5px' }}>
                  <span style={{ fontWeight: '600' }}>{s.name}</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>{s.students} students • {s.completion}%</span>
                </div>
                <div style={{ height: '8px', borderRadius: '4px', background: '#e2e8f0', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${s.completion}%`, background: s.completion >= 75 ? '#22c55e' : s.completion >= 50 ? '#f59e0b' : '#ef4444', borderRadius: '4px', transition: 'width 0.4s' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Overview */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Activity size={18} color="#10b981" />
            <h2 style={{ fontWeight: 'bold', fontSize: '16px', margin: 0 }}>Attendance by Batch</h2>
          </div>
          {[
            { batch: 'Class 10 – Batch A', rate: 92 },
            { batch: 'Class 9 – Batch B', rate: 78 },
            { batch: 'Class 8 – Batch A', rate: 85 },
          ].map(b => (
            <div key={b.batch} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '5px' }}>
                <span style={{ fontWeight: '600' }}>{b.batch}</span>
                <span style={{ fontWeight: 'bold', color: b.rate >= 85 ? '#22c55e' : b.rate >= 70 ? '#f59e0b' : '#ef4444' }}>{b.rate}%</span>
              </div>
              <div style={{ height: '8px', borderRadius: '4px', background: '#e2e8f0' }}>
                <div style={{ height: '100%', width: `${b.rate}%`, background: b.rate >= 85 ? '#22c55e' : b.rate >= 70 ? '#f59e0b' : '#ef4444', borderRadius: '4px' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CreditCard size={18} color="#ef4444" />
          <h2 style={{ fontWeight: 'bold', fontSize: '16px', margin: 0 }}>Recent Payment Records</h2>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--color-bg)', fontSize: '12px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {['Student', 'Batch', 'Amount', 'Date', 'Status'].map(h => (
                <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontWeight: '600' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paymentRows.map((p, i) => (
              <tr key={i} style={{ borderTop: '1px solid var(--color-border)', transition: 'background 0.15s' }}
                onMouseOver={e => e.currentTarget.style.background = 'var(--color-bg)'}
                onMouseOut={e => e.currentTarget.style.background = 'white'}>
                <td style={{ padding: '14px 20px', fontWeight: '600', fontSize: '14px' }}>{p.student}</td>
                <td style={{ padding: '14px 20px', color: 'var(--color-text-secondary)', fontSize: '13px' }}>{p.batch}</td>
                <td style={{ padding: '14px 20px', fontWeight: 'bold' }}>{p.amount}</td>
                <td style={{ padding: '14px 20px', color: 'var(--color-text-secondary)', fontSize: '13px' }}>{p.date}</td>
                <td style={{ padding: '14px 20px' }}>
                  <span style={{ padding: '3px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', background: p.status === 'Paid' ? '#dcfce7' : '#fef3c7', color: p.status === 'Paid' ? '#166534' : '#92400e' }}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAnalytics;
