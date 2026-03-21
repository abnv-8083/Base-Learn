import { useState, useEffect } from 'react';
import { Activity, User, Clock, Filter, Search, ChevronDown } from 'lucide-react';
import axios from 'axios';

const roleColors = {
  instructor: { bg: '#fef3c7', text: '#92400e' },
  faculty: { bg: '#ecfdf5', text: '#065f46' },
  admin: { bg: '#eef2ff', text: '#3730a3' },
};

const actionIcons = {
  'Uploaded Video': '🎥',
  'Approved Video': '✅',
  'Added Student Note': '📝',
  'Distributed Assignment': '📋',
  'Updated Student': '✏️',
  'Blocked Student': '🚫',
  'Removed Student': '🗑️',
  'Scheduled Live Class': '📅',
  'Sent Notification': '🔔',
};

const AdminActivityLog = () => {
  const token = localStorage.getItem('token');
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => { fetchLogs(); }, [roleFilter]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = roleFilter !== 'all' ? `?role=${roleFilter}` : '';
      const res = await axios.get(`/api/admin/activity-logs${params}`, { headers: { Authorization: `Bearer ${token}` } });
      setLogs(Array.isArray(res.data) ? res.data : []);
    } catch {
      // Mock data if API isn't ready yet
      setLogs([
        { _id: '1', actorName: 'Dr. Priya (Faculty)', actorRole: 'faculty', action: 'Uploaded Video', target: 'Chapter: Thermodynamics 1', details: { title: 'Laws of Thermodynamics' }, ipAddress: '192.168.1.10', createdAt: new Date(Date.now() - 10 * 60000).toISOString() },
        { _id: '2', actorName: 'Mr. Rajan (Instructor)', actorRole: 'instructor', action: 'Approved Video', target: 'RecordedClass: Laws of Thermodynamics', details: null, ipAddress: '192.168.1.11', createdAt: new Date(Date.now() - 45 * 60000).toISOString() },
        { _id: '3', actorName: 'Mr. Rajan (Instructor)', actorRole: 'instructor', action: 'Added Student Note', target: 'Student: Arjun Kumar', details: { note: 'Needs help with derivatives' }, ipAddress: '192.168.1.11', createdAt: new Date(Date.now() - 2 * 3600000).toISOString() },
        { _id: '4', actorName: 'Dr. Priya (Faculty)', actorRole: 'faculty', action: 'Scheduled Live Class', target: 'Batch: Class 10 – A', details: { title: 'Electrostatics Q&A', date: '2026-03-21' }, ipAddress: '192.168.1.10', createdAt: new Date(Date.now() - 4 * 3600000).toISOString() },
        { _id: '5', actorName: 'Mr. Rajan (Instructor)', actorRole: 'instructor', action: 'Distributed Assignment', target: 'Batch: Class 9 – B', details: { assignmentTitle: 'Algebra Test 3' }, ipAddress: '192.168.1.11', createdAt: new Date(Date.now() - 6 * 3600000).toISOString() },
        { _id: '6', actorName: 'Mr. Rajan (Instructor)', actorRole: 'instructor', action: 'Blocked Student', target: 'Student: Rahul Dev', details: null, ipAddress: '192.168.1.11', createdAt: new Date(Date.now() - 24 * 3600000).toISOString() },
      ]);
    } finally { setLoading(false); }
  };

  const timeAgo = (timestamp) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const filtered = logs.filter(l =>
    (roleFilter === 'all' || l.actorRole === roleFilter) &&
    (l.actorName?.toLowerCase().includes(search.toLowerCase()) ||
     l.action?.toLowerCase().includes(search.toLowerCase()) ||
     l.target?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ paddingBottom: '60px' }}>
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 className="page-title">Activity Log</h1>
          <p className="page-subtitle">Full audit trail of all instructor and faculty actions across the platform.</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '240px' }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by person, action, or target..."
            style={{ width: '100%', padding: '10px 14px 10px 36px', borderRadius: '10px', border: '1px solid var(--color-border)', fontSize: '14px' }} />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'instructor', 'faculty'].map(r => (
            <button key={r} onClick={() => setRoleFilter(r)}
              style={{ padding: '8px 16px', borderRadius: '20px', border: roleFilter === r ? '2px solid var(--color-primary)' : '1px solid var(--color-border)', background: roleFilter === r ? 'var(--color-primary-light)' : 'white', color: roleFilter === r ? 'var(--color-primary)' : 'var(--color-text-primary)', fontSize: '13px', fontWeight: roleFilter === r ? 'bold' : '500', cursor: 'pointer', transition: 'all 0.2s', textTransform: 'capitalize' }}>
              {r === 'all' ? 'All Roles' : r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Log Table */}
      {loading ? <div className="spinner" style={{ display: 'block', margin: '10vh auto' }}></div> : (
        <div className="card" style={{ overflow: 'hidden' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--color-text-secondary)' }}>No activity logs found.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--color-bg)', fontSize: '11px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {['Time', 'Actor', 'Role', 'Action', 'Target', 'Details', 'IP'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((log, i) => {
                  const palette = roleColors[log.actorRole] || { bg: '#f1f5f9', text: '#475569' };
                  const icon = actionIcons[log.action] || '⚡';
                  return (
                    <tr key={log._id}
                      style={{ borderTop: '1px solid var(--color-border)', transition: 'background 0.15s', verticalAlign: 'top' }}
                      onMouseOver={e => e.currentTarget.style.background = 'var(--color-bg)'}
                      onMouseOut={e => e.currentTarget.style.background = 'white'}>

                      <td style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <Clock size={12} /> {timeAgo(log.createdAt)}
                        </div>
                        <div style={{ fontSize: '11px', marginTop: '2px' }}>{new Date(log.createdAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}</div>
                      </td>

                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: palette.bg, color: palette.text, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '13px', flexShrink: 0 }}>
                            {log.actorName?.charAt(0)}
                          </div>
                          <span style={{ fontSize: '13px', fontWeight: '600' }}>{log.actorName}</span>
                        </div>
                      </td>

                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', background: palette.bg, color: palette.text, textTransform: 'capitalize' }}>
                          {log.actorRole}
                        </span>
                      </td>

                      <td style={{ padding: '12px 16px', fontWeight: '600', fontSize: '13px' }}>
                        <span style={{ marginRight: '6px' }}>{icon}</span>{log.action}
                      </td>

                      <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--color-text-secondary)', maxWidth: '180px' }}>{log.target || '—'}</td>

                      <td style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--color-text-secondary)', maxWidth: '200px' }}>
                        {log.details ? (
                          <div style={{ background: 'var(--color-bg)', borderRadius: '6px', padding: '4px 8px', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                            {Object.entries(log.details).map(([k, v]) => `${k}: ${v}`).join('\n')}
                          </div>
                        ) : '—'}
                      </td>

                      <td style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>{log.ipAddress || '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminActivityLog;
