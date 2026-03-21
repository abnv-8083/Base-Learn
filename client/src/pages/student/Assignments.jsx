import { useState, useEffect } from 'react';
import { Upload, Eye, CheckCircle, XCircle, Clock, FileText } from 'lucide-react';

const Assignments = () => {
  const [activeTab, setActiveTab] = useState('view'); // 'view' or 'submitted'
  const [filterStatus, setFilterStatus] = useState('All');
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAssignments([
        { _id: '1', title: 'React Hooks Mini-Project', subject: 'Computer Science', faculty: 'Prof. Rajan', date: new Date(Date.now() + 86400000 * 3), maxMarks: 100, status: 'Pending' },
        { _id: '2', title: 'Algebra Problem Set', subject: 'Mathematics', faculty: 'Dr. Meena', date: new Date(Date.now() + 86400000 * 5), maxMarks: 50, status: 'Pending' },
        { _id: '3', title: 'Thermodynamics Essay', subject: 'Physics', faculty: 'Dr. Smith', date: new Date(Date.now() - 86400000), maxMarks: 50, status: 'Approved', mySubmission: { marks: 45, feedback: 'Excellent work, well researched.' } },
        { _id: '4', title: 'Calculus Quiz 4', subject: 'Mathematics', faculty: 'Dr. Meena', date: new Date(Date.now() - 86400000 * 2), maxMarks: 20, status: 'Rejected', mySubmission: { remarks: 'Incomplete workings. Please resubmit.' } },
        { _id: '5', title: 'History of AI', subject: 'Computer Science', faculty: 'Prof. Rajan', date: new Date(Date.now() - 86400000 * 4), maxMarks: 100, status: 'Reviewing' },
        { _id: '6', title: 'Newtonian Physics Lab', subject: 'Physics', faculty: 'Dr. Smith', date: new Date(Date.now() - 86400000 * 5), maxMarks: 50, status: 'Submitted' }
      ]);
      setLoading(false);
    }, 600);
  }, []);

  if (loading) return <div className="spinner" style={{ margin: 'auto', display: 'block', marginTop: '20vh' }} />;

  // Separate data based on tabs
  const pendingAssignments = assignments.filter(a => a.status === 'Pending');
  const submittedAssignments = assignments.filter(a => a.status !== 'Pending');

  // Filter submitted assignments based on sub-filter
  const filteredSubmitted = filterStatus === 'All' 
    ? submittedAssignments 
    : submittedAssignments.filter(a => a.status === filterStatus);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending': 
        return <span className="badge" style={{ background: 'var(--color-warning-light)', color: 'var(--color-warning)' }}>Pending</span>;
      case 'Submitted': 
        return <span className="badge" style={{ background: 'var(--color-info-light)', color: 'var(--color-info)' }}>Submitted</span>;
      case 'Reviewing': 
        return <span className="badge" style={{ background: 'var(--color-student-light)', color: 'var(--color-student)' }}>Reviewing</span>;
      case 'Approved': 
        return <span className="badge" style={{ background: 'var(--color-success-light)', color: 'var(--color-success)' }}>Approved</span>;
      case 'Rejected': 
        return <span className="badge" style={{ background: 'var(--color-error-light)', color: 'var(--color-error)' }}>Rejected</span>;
      default: return null;
    }
  };

  const StatusIcon = ({ status }) => {
    switch(status) {
      case 'Pending': return <Clock size={16} color="var(--color-warning)" />;
      case 'Submitted': return <Upload size={16} color="var(--color-info)" />;
      case 'Reviewing': return <Eye size={16} color="var(--color-student)" />;
      case 'Approved': return <CheckCircle size={16} color="var(--color-success)" />;
      case 'Rejected': return <XCircle size={16} color="var(--color-error)" />;
      default: return <FileText size={16} />;
    }
  };

  return (
    <div>
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="page-header-inner" style={{ alignItems: 'flex-end' }}>
          <div>
            <h1 className="page-title">Assignments</h1>
            <p className="page-subtitle">Manage your coursework and track your submissions.</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-4)', borderBottom: '1px solid var(--color-border)', marginBottom: 'var(--space-6)' }}>
        <button 
          onClick={() => setActiveTab('view')}
          style={{ 
            padding: 'var(--space-3) var(--space-4)', 
            background: 'none', 
            border: 'none', 
            borderBottom: activeTab === 'view' ? '2px solid var(--color-primary)' : '2px solid transparent',
            color: activeTab === 'view' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
            fontWeight: activeTab === 'view' ? 'bold' : 'normal',
            cursor: 'pointer',
            fontSize: 'var(--text-base)',
            transition: 'all 0.2s'
          }}
        >
          View Assignments
        </button>
        <button 
          onClick={() => setActiveTab('submitted')}
          style={{ 
            padding: 'var(--space-3) var(--space-4)', 
            background: 'none', 
            border: 'none', 
            borderBottom: activeTab === 'submitted' ? '2px solid var(--color-primary)' : '2px solid transparent',
            color: activeTab === 'submitted' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
            fontWeight: activeTab === 'submitted' ? 'bold' : 'normal',
            cursor: 'pointer',
            fontSize: 'var(--text-base)',
            transition: 'all 0.2s'
          }}
        >
          Submitted Assignments
        </button>
      </div>

      {activeTab === 'view' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {pendingAssignments.length === 0 ? (
             <div style={{ padding: '40px', textAlign: 'center', background: 'white', borderRadius: '16px', border: '1px dotted var(--color-border)' }}>
                <p>No given assignments to view at the moment!</p>
             </div>
          ) : pendingAssignments.map(task => (
            <div key={task._id} className="card" style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="badge" style={{ background: 'var(--color-bg)', color: 'var(--color-text-secondary)' }}>{task.subject}</span>
                {getStatusBadge(task.status)}
              </div>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', marginBottom: '8px' }}>{task.title}</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>Given by {task.faculty}</p>
              
              <div style={{ marginTop: 'auto', background: 'var(--color-surface-raised)', padding: '12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-sm)' }}>
                  <Clock size={16} color="var(--color-warning)" />
                  <span style={{ fontWeight: '500' }}>Due {task.date.toLocaleDateString()}</span>
                </div>
                <div style={{ fontWeight: 'bold', fontSize: 'var(--text-sm)' }}>{task.maxMarks} Points</div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center', border: '1px solid var(--color-border)' }} title="View Assignment PDF">
                  <FileText size={16} style={{ marginRight: '8px' }} /> View PDF
                </button>
                <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} title="Submit Assignment">
                  <Upload size={16} style={{ marginRight: '8px' }} /> Submit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {/* Sub-Filters for Submitted */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {['All', 'Submitted', 'Reviewing', 'Approved', 'Rejected'].map(status => (
              <button 
                key={status}
                onClick={() => setFilterStatus(status)}
                className="btn"
                style={{
                  background: filterStatus === status ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: filterStatus === status ? 'white' : 'var(--color-text-secondary)',
                  border: filterStatus === status ? 'none' : '1px solid var(--color-border)',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: 'var(--text-sm)'
                }}
              >
                {status}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {filteredSubmitted.length === 0 ? (
               <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', background: 'white', borderRadius: '16px', border: '1px dotted var(--color-border)' }}>
                  <p>No assignments found with status: {filterStatus}</p>
               </div>
            ) : filteredSubmitted.map(task => (
              <div key={task._id} className="card" style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span className="badge" style={{ background: 'var(--color-bg)', color: 'var(--color-text-secondary)' }}>{task.subject}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                     <StatusIcon status={task.status} />
                     {getStatusBadge(task.status)}
                  </div>
                </div>
                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', marginBottom: '8px' }}>{task.title}</h3>
                
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                  Submitted on {task.date.toLocaleDateString()}
                </div>
                
                {task.status === 'Approved' && task.mySubmission?.marks && (
                  <div style={{ background: 'var(--color-success-light)', padding: '12px', borderRadius: '8px', marginBottom: '16px', color: 'var(--color-success)', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>{task.mySubmission.marks} / {task.maxMarks}</div>
                    <div style={{ fontSize: '12px' }}>{task.mySubmission.feedback}</div>
                  </div>
                )}

                {task.status === 'Rejected' && task.mySubmission?.remarks && (
                  <div style={{ background: 'var(--color-error-light)', padding: '12px', borderRadius: '8px', marginBottom: '16px', color: 'var(--color-error)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Needs Revision</div>
                    <div style={{ fontSize: '12px' }}>{task.mySubmission.remarks}</div>
                  </div>
                )}
                
                <div style={{ marginTop: 'auto' }}>
                  <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', border: '1px solid var(--color-border)' }}>
                    <Eye size={16} style={{ marginRight: '8px' }} /> View Submission
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments;
