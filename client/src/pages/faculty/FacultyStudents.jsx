import { useState } from 'react';
import { Users, Activity, Clock, Calendar, TrendingUp, CheckCircle } from 'lucide-react';

const FacultyStudents = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = [
    { id: 1, name: 'Arjun Kumar', batch: 'Class 10 – Batch A', attendance: 92, watchTime: '38h', activity: 'High', lastSeen: '2h ago' },
    { id: 2, name: 'Sana Malik', batch: 'Class 10 – Batch A', attendance: 78, watchTime: '22h', activity: 'Medium', lastSeen: '1d ago' },
    { id: 3, name: 'Rahul Dev', batch: 'Class 9 – Batch B', attendance: 55, watchTime: '10h', activity: 'Low', lastSeen: '3d ago' },
    { id: 4, name: 'Priya Sharma', batch: 'Class 9 – Batch B', attendance: 88, watchTime: '31h', activity: 'High', lastSeen: '5h ago' },
    { id: 5, name: 'Vikram Nair', batch: 'Class 10 – Batch A', attendance: 70, watchTime: '18h', activity: 'Medium', lastSeen: '2d ago' },
  ];

  const attendanceHistory = [
    { date: 'Mar 15', present: true },
    { date: 'Mar 16', present: false },
    { date: 'Mar 17', present: true },
    { date: 'Mar 18', present: true },
    { date: 'Mar 19', present: true },
    { date: 'Mar 20', present: false },
  ];

  const getActivityColor = (act) => {
    if (act === 'High') return { bg: '#dcfce7', text: '#166534' };
    if (act === 'Medium') return { bg: '#fef3c7', text: '#92400e' };
    return { bg: '#fee2e2', text: '#991b1b' };
  };

  if (selectedStudent) {
    const colors = getActivityColor(selectedStudent.activity);
    return (
      <div>
        <div className="page-header" style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
          <button className="icon-btn" onClick={() => setSelectedStudent(null)}>&larr;</button>
          <div>
            <h1 className="page-title">{selectedStudent.name}</h1>
            <p className="page-subtitle">{selectedStudent.batch}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '28px' }}>
          {[
            { label: 'Attendance Rate', value: `${selectedStudent.attendance}%`, icon: CheckCircle, color: '#22c55e' },
            { label: 'Total Watch Time', value: selectedStudent.watchTime, icon: Clock, color: 'var(--color-primary)' },
            { label: 'Learning Activity', value: selectedStudent.activity, icon: TrendingUp, color: colors.text },
            { label: 'Last Active', value: selectedStudent.lastSeen, icon: Activity, color: '#f59e0b' },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="card" style={{ padding: '20px', display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: s.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>
                  <Icon size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '22px', fontWeight: '800', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '3px' }}>{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '16px', fontSize: '16px' }}>Recent Attendance Log</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {attendanceHistory.map((a, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: a.present ? '#dcfce7' : '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                  {a.present ? '✅' : '❌'}
                </div>
                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{a.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '60px' }}>
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <h1 className="page-title">Student Metrics</h1>
        <p className="page-subtitle">Track attendance, watch time, and learning engagement.</p>
      </div>

      {/* Overview Tally */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        {[
          { label: 'Total Students', value: students.length, icon: Users },
          { label: 'Avg Attendance', value: `${Math.round(students.reduce((a, s) => a + s.attendance, 0) / students.length)}%`, icon: CheckCircle },
          { label: 'High Engagement', value: students.filter(s => s.activity === 'High').length, icon: TrendingUp },
          { label: 'Low Engagement', value: students.filter(s => s.activity === 'Low').length, icon: Activity },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="card" style={{ padding: '20px', display: 'flex', gap: '14px', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                <Icon size={24} />
              </div>
              <div>
                <div style={{ fontSize: '26px', fontWeight: '800', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '3px' }}>{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Student List Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--color-border)' }}>
          <h2 style={{ fontWeight: 'bold', fontSize: '16px', margin: 0 }}>All Students</h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--color-bg)', fontSize: '12px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontWeight: '600' }}>Student</th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontWeight: '600' }}>Batch</th>
                <th style={{ padding: '12px 24px', textAlign: 'center', fontWeight: '600' }}>Attendance</th>
                <th style={{ padding: '12px 24px', textAlign: 'center', fontWeight: '600' }}>Watch Time</th>
                <th style={{ padding: '12px 24px', textAlign: 'center', fontWeight: '600' }}>Activity</th>
                <th style={{ padding: '12px 24px', textAlign: 'center', fontWeight: '600' }}>Last Seen</th>
                <th style={{ padding: '12px 24px', textAlign: 'center', fontWeight: '600' }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => {
                const colors = getActivityColor(s.activity);
                return (
                  <tr key={s.id} style={{ borderTop: '1px solid var(--color-border)', transition: 'background 0.15s' }}
                    onMouseOver={e => e.currentTarget.style.background = 'var(--color-bg)'}
                    onMouseOut={e => e.currentTarget.style.background = 'white'}>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>
                          {s.name.charAt(0)}
                        </div>
                        <span style={{ fontWeight: '600' }}>{s.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', color: 'var(--color-text-secondary)', fontSize: '14px' }}>{s.batch}</td>
                    <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontWeight: 'bold' }}>{s.attendance}%</span>
                        <div style={{ width: '80px', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${s.attendance}%`, height: '100%', background: s.attendance > 75 ? '#22c55e' : s.attendance > 50 ? '#f59e0b' : '#EF4444', borderRadius: '3px' }}></div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'center', fontWeight: '600' }}>{s.watchTime}</td>
                    <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                      <span style={{ padding: '4px 10px', background: colors.bg, color: colors.text, borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>{s.activity}</span>
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '13px' }}>{s.lastSeen}</td>
                    <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                      <button className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '13px' }} onClick={() => setSelectedStudent(s)}>View</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FacultyStudents;
