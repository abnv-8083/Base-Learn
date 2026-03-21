import { useState, useEffect } from 'react';
import { Video, Clock, CheckCircle, XCircle } from 'lucide-react';

const LiveClasses = () => {
  const [activeTab, setActiveTab] = useState('today'); // 'today' or 'past'
  const [todayClasses, setTodayClasses] = useState([]);
  const [pastClasses, setPastClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterSubject, setFilterSubject] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest First');

  useEffect(() => {
    setTimeout(() => {
      const now = new Date();
      // Mock today
      const today1 = new Date();
      today1.setHours(now.getHours() + 1);
      
      const today2 = new Date();
      today2.setHours(now.getHours() + 3);

      setTodayClasses([
        { _id: '1', title: 'Advanced React Patterns', subject: 'Computer Science', faculty: 'Dr. Meena', scheduledAt: today1, duration: '60 min', status: 'Upcoming' },
        { _id: '2', title: 'Quantum Mechanics Problem Solving', subject: 'Physics', faculty: 'Dr. Smith', scheduledAt: today2, duration: '90 min', status: 'Live Now' },
      ]);
      setPastClasses([
        { _id: '3', title: 'Introduction to Node.js', subject: 'Computer Science', faculty: 'Prof. Rajan', scheduledAt: new Date(Date.now() - 86400000), attended: true, duration: '45 min' },
        { _id: '4', title: 'Calculus III Overview', subject: 'Mathematics', faculty: 'Dr. Meena', scheduledAt: new Date(Date.now() - 172800000), attended: false, duration: '60 min' },
      ]);
      setLoading(false);
    }, 600);
  }, []);

  if (loading) return <div className="spinner" style={{ margin: 'auto', display: 'block', marginTop: '20vh' }} />;

  // Filter and Sort past classes
  let displayedPastClasses = [...pastClasses];
  if (filterSubject !== 'All') {
    displayedPastClasses = displayedPastClasses.filter(c => c.subject === filterSubject);
  }
  displayedPastClasses.sort((a, b) => {
    if (sortOrder === 'Newest First') {
      return b.scheduledAt - a.scheduledAt;
    } else {
      return a.scheduledAt - b.scheduledAt;
    }
  });

  const subjects = ['All', ...new Set(pastClasses.map(c => c.subject))];

  return (
    <div>
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="page-header-inner" style={{ alignItems: 'flex-end' }}>
          <div>
            <h1 className="page-title">Live Classes</h1>
            <p className="page-subtitle">Join today's sessions or review your past attendance.</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-4)', borderBottom: '1px solid var(--color-border)', marginBottom: 'var(--space-6)' }}>
        <button 
          onClick={() => setActiveTab('today')}
          style={{ 
            padding: 'var(--space-3) var(--space-4)', 
            background: 'none', 
            border: 'none', 
            borderBottom: activeTab === 'today' ? '2px solid var(--color-primary)' : '2px solid transparent',
            color: activeTab === 'today' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
            fontWeight: activeTab === 'today' ? 'bold' : 'normal',
            cursor: 'pointer',
            fontSize: 'var(--text-base)',
            transition: 'all 0.2s'
          }}
        >
          Today's Live Classes
        </button>
        <button 
          onClick={() => setActiveTab('past')}
          style={{ 
            padding: 'var(--space-3) var(--space-4)', 
            background: 'none', 
            border: 'none', 
            borderBottom: activeTab === 'past' ? '2px solid var(--color-primary)' : '2px solid transparent',
            color: activeTab === 'past' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
            fontWeight: activeTab === 'past' ? 'bold' : 'normal',
            cursor: 'pointer',
            fontSize: 'var(--text-base)',
            transition: 'all 0.2s'
          }}
        >
          Past Live Classes
        </button>
      </div>

      {activeTab === 'today' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {todayClasses.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', background: 'white', borderRadius: '16px', border: '1px dotted var(--color-border)' }}>
                <p>No live classes scheduled for today.</p>
            </div>
          ) : todayClasses.map((cls) => (
            <div className="card" key={cls._id} style={{ display: 'flex', alignItems: 'center', padding: 'var(--space-5) var(--space-6)', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '80px', padding: '12px', background: 'var(--color-surface-raised)', borderRadius: '12px' }}>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                  TODAY
                </div>
                <div style={{ fontSize: 'var(--text-lg)', fontWeight: '800', lineHeight: 1, marginTop: '4px' }}>
                  {cls.scheduledAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                   <span className="badge" style={{ background: 'var(--color-bg)', color: 'var(--color-text-secondary)' }}>{cls.subject}</span>
                   {cls.status === 'Live Now' && <span className="badge" style={{ background: 'var(--color-error-light)', color: 'var(--color-error)' }}>● Live Now</span>}
                </div>
                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', marginBottom: '8px' }}>{cls.title}</h3>
                <div style={{ display: 'flex', gap: '16px', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {cls.duration}</span>
                  <span>• {cls.faculty}</span>
                </div>
              </div>
              <div>
                 <button className={`btn ${cls.status === 'Live Now' ? 'btn-primary' : 'btn-accent'}`} style={{ width: '100%' }}>
                   <Video size={16} style={{ marginRight: 8 }}/> {cls.status === 'Live Now' ? 'Watch Live' : 'Join Class'}
                 </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Subject</span>
              <select 
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-primary)' }}
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
              >
                {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
              </select>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Sort</span>
              <select 
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-primary)' }}
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="Newest First">Newest First</option>
                <option value="Oldest First">Oldest First</option>
              </select>
            </div>
          </div>

          <div className="card">
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Session</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Duration</th>
                    <th>Attendance</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedPastClasses.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '24px' }}>No past classes matching criteria.</td>
                    </tr>
                  ) : displayedPastClasses.map((cls) => (
                    <tr key={cls._id}>
                    <td>
                       <div style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>{cls.title}</div>
                       <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginTop: '4px' }}>By {cls.faculty}</div>
                    </td>
                    <td>{cls.subject}</td>
                    <td>{cls.scheduledAt.toLocaleDateString()}</td>
                    <td>{cls.duration}</td>
                    <td>
                      {cls.attended ? (
                        <span className="badge" style={{ background: 'var(--color-success-light)', color: 'var(--color-success)' }}>
                          <CheckCircle size={12} style={{ marginRight: '4px' }}/> Attended
                        </span>
                      ) : (
                        <span className="badge" style={{ background: 'var(--color-error-light)', color: 'var(--color-error)' }}>
                          <XCircle size={12} style={{ marginRight: '4px' }}/> Missed
                        </span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button className="btn btn-ghost btn-sm" style={{ border: '1px solid var(--color-border)' }}>Recording</button>
                        <button className="btn btn-ghost btn-sm" style={{ border: '1px solid var(--color-border)' }}>Notes</button>
                        <button className="btn btn-ghost btn-sm" style={{ border: '1px solid var(--color-border)' }}>Workout</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default LiveClasses;
