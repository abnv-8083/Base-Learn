import { useState, useEffect } from 'react';
import { PlaySquare, Calendar, ClipboardList, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import studentService from '../../services/studentService';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ recorded: 0, live: 0, assignments: 0, completion: 0 });
  const [mainAssessments, setMainAssessments] = useState({ tests: [], assignments: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashRes, mainRes] = await Promise.all([
          studentService.getDashboard(),
          studentService.getMainAssessments()
        ]);

        if (dashRes.success) {
          setStats({
            recorded: dashRes.data.recordedClassesAvailable,
            live: dashRes.data.upcomingLiveClasses,
            assignments: dashRes.data.pendingAssignments,
            completion: dashRes.data.completionRate,
            hasPaid: dashRes.data.hasPaid,
            batch: dashRes.data.batch,
            faculty: dashRes.data.faculty,
            subjects: dashRes.data.subjects || []
          });
        }

        if (mainRes.success) {
          setMainAssessments(mainRes.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="spinner" style={{ margin: 'auto', display: 'block', marginTop: '30vh' }} />;

  if (!stats.hasPaid) {
    return (
      <div style={{ padding: '60px 40px', textAlign: 'center', background: 'white', borderRadius: '24px', border: '1px solid var(--color-border)', marginTop: '40px', boxShadow: '0 20px 40px rgba(15, 45, 107, 0.05)', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
         <div style={{ width: '80px', height: '80px', background: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '32px' }}>🔒</div>
         <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', color: 'var(--color-text-primary)' }}>Complete Enrollment</h2>
         <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', fontSize: '16px', lineHeight: '1.6' }}>You must complete your fee payment to unlock access to Batch resources, Live Classes, and Faculty Assignments.</p>
         <button className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px', borderRadius: '12px' }} onClick={async () => {
           try {
             await studentService.mockPayment();
             window.location.reload();
           } catch(e) {
             alert('Payment Check Failed');
           }
         }}>Simulate Payment (UPI/Razorpay)</button>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-header-inner">
          <div>
            <h1 className="page-title">Welcome back, {user?.name?.split(' ')[0]}!</h1>
            <p className="page-subtitle">Here's an overview of your academic progress.</p>
          </div>
          <div className="page-header-actions">
            <button className="btn btn-primary">Resume Learning</button>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-card--accent">
          <div className="stat-card-header">
            <div className="stat-card-icon"><PlaySquare size={22} /></div>
            <div className="stat-card-trend up">↑ 12%</div>
          </div>
          <div>
            <div className="stat-card-value">{stats.recorded}</div>
            <div className="stat-card-label">Recorded Classes</div>
          </div>
        </div>

        <div className="stat-card stat-card--student">
          <div className="stat-card-header">
            <div className="stat-card-icon"><Calendar size={22} /></div>
            <div className="stat-card-trend up">Next Tmrw</div>
          </div>
          <div>
            <div className="stat-card-value">{stats.live}</div>
            <div className="stat-card-label">Upcoming Live</div>
          </div>
        </div>

        <div className="stat-card stat-card--warning">
          <div className="stat-card-header">
            <div className="stat-card-icon"><ClipboardList size={22} /></div>
            <div className="stat-card-trend down">Due Soon</div>
          </div>
          <div>
            <div className="stat-card-value">{stats.assignments}</div>
            <div className="stat-card-label">Pending Tasks</div>
          </div>
        </div>

        <div className="stat-card stat-card--success">
          <div className="stat-card-header">
            <div className="stat-card-icon"><Award size={22} /></div>
            <div className="stat-card-trend up">Top 15%</div>
          </div>
          <div>
            <div className="stat-card-value">{stats.completion}%</div>
            <div className="stat-card-label">Overall Completion</div>
          </div>
        </div>
      </div>

      {/* XYLEM INSPIRED BATCH OVERVIEW */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '32px' }}>
        
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Your Active Batch</h3>
          </div>
          <div className="card-body" style={{ padding: '24px' }}>
             {stats.batch ? (
               <div style={{ background: 'var(--color-bg)', padding: '20px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                 <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{stats.batch.className}</div>
                 <h4 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 16px 0' }}>{stats.batch.name}</h4>
                 
                 {stats.faculty && (
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--color-border)' }}>
                     <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        {stats.faculty.name.substring(0,2).toUpperCase()}
                     </div>
                     <div>
                       <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{stats.faculty.name}</div>
                       <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Assigned Faculty</div>
                     </div>
                   </div>
                 )}
               </div>
             ) : (
               <p className="text-muted">You have not been assigned to a batch yet.</p>
             )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Subject Progress</h3>
          </div>
          <div className="card-body" style={{ padding: '24px' }}>
             {stats.subjects && stats.subjects.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {stats.subjects.map(sub => (
                    <div key={sub.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                         <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{sub.name}</span>
                         <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>{sub.progress}%</span>
                      </div>
                      <div style={{ width: '100%', height: '8px', background: 'var(--color-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                         <div style={{ width: `${sub.progress}%`, height: '100%', background: 'var(--color-primary)', borderRadius: '4px' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
             ) : (
                <p className="text-muted">No subjects assigned.</p>
             )}
          </div>
        </div>
      </div>
      {/* MAIN ASSESSMENTS SECTION */}
      {stats.hasPaid && (mainAssessments.tests.length > 0 || mainAssessments.assignments.length > 0) && (
        <div style={{ marginTop: '32px' }}>
           <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
             <Award size={24} color="var(--color-primary)" /> Main Assessments & Exams
           </h3>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {mainAssessments.tests.map(test => (
                <div key={test._id} className="card hover-lift" style={{ padding: '20px', borderLeft: '4px solid var(--color-danger)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--color-danger)', background: 'rgba(239, 68, 68, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>🔥 Main Test</span>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Due: {new Date(test.deadline).toLocaleDateString()}</span>
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>{test.title}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>{test.description?.substring(0, 60)}...</p>
                  <button className="btn btn-primary" style={{ width: '100%', padding: '8px', fontSize: '13px' }}>Start Examination</button>
                </div>
              ))}
              {mainAssessments.assignments.map(asgn => (
                <div key={asgn._id} className="card hover-lift" style={{ padding: '20px', borderLeft: '4px solid var(--color-primary)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--color-primary)', background: 'var(--color-primary-light)', padding: '2px 8px', borderRadius: '4px' }}>📌 Main Assignment</span>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Due: {new Date(asgn.deadline).toLocaleDateString()}</span>
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>{asgn.title}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>{asgn.description?.substring(0, 60)}...</p>
                  <a href={asgn.fileUrl} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ width: '100%', padding: '8px', fontSize: '13px', display: 'block', textAlign: 'center' }}>Download Resource</a>
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
