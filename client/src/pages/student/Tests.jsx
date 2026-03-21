import { useState, useEffect } from 'react';
import { PlayCircle, CheckCircle, Clock, FileQuestion, BarChart2 } from 'lucide-react';

const Tests = () => {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' or 'past'
  const [upcomingTests, setUpcomingTests] = useState([]);
  const [pastResults, setPastResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setUpcomingTests([
        { _id: '1', title: 'Calculus Midterm', subject: 'Mathematics', date: new Date(Date.now() + 86400000 * 2), duration: '120 min', maxMarks: 100 },
        { _id: '2', title: 'Data Structures MCQ Quiz', subject: 'Computer Science', date: new Date(Date.now() + 86400000 * 5), duration: '45 min', maxMarks: 50 },
      ]);
      setPastResults([
        { _id: '3', title: 'Physics Vectors Quiz', subject: 'Physics', date: new Date(Date.now() - 86400000 * 4), duration: '30 min', maxMarks: 20, score: 18, percentile: 92 },
        { _id: '4', title: 'Organic Chemistry Mock Exam', subject: 'Chemistry', date: new Date(Date.now() - 86400000 * 12), duration: '90 min', maxMarks: 80, score: 65, percentile: 85 },
      ]);
      setLoading(false);
    }, 600);
  }, []);

  if (loading) return <div className="spinner" style={{ margin: 'auto', display: 'block', marginTop: '20vh' }} />;

  return (
    <div>
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="page-header-inner" style={{ alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <h1 className="page-title">Tests {'&'} Quizzes</h1>
            <p className="page-subtitle">Take upcoming exams and review your past performance.</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-4)', borderBottom: '1px solid var(--color-border)', marginBottom: 'var(--space-6)' }}>
        <button 
          onClick={() => setActiveTab('upcoming')}
          style={{ 
            padding: 'var(--space-3) var(--space-4)', 
            background: 'none', 
            border: 'none', 
            borderBottom: activeTab === 'upcoming' ? '2px solid var(--color-primary)' : '2px solid transparent',
            color: activeTab === 'upcoming' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
            fontWeight: activeTab === 'upcoming' ? 'bold' : 'normal',
            cursor: 'pointer',
            fontSize: 'var(--text-base)',
            transition: 'all 0.2s'
          }}
        >
          Upcoming Tests
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
          Past Results
        </button>
      </div>

      {activeTab === 'upcoming' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {upcomingTests.length === 0 ? (
             <div style={{ padding: '40px', textAlign: 'center', background: 'white', borderRadius: '16px', border: '1px dotted var(--color-border)' }}>
                <p>No upcoming tests at the moment.</p>
             </div>
          ) : upcomingTests.map(test => (
            <div key={test._id} className="card" style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="badge" style={{ background: 'var(--color-warning-light)', color: 'var(--color-warning)' }}>{test.subject}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', fontWeight: '600' }}>
                  <Clock size={14} /> {test.duration}
                </div>
              </div>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', marginBottom: '16px' }}>{test.title}</h3>
              
              <div style={{ marginTop: 'auto', background: 'var(--color-surface-raised)', padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', border: '1px solid var(--color-border)' }}>
                <div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Scheduled Date</div>
                  <div style={{ fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{test.date.toLocaleDateString()}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Marks</div>
                  <div style={{ fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{test.maxMarks} Points</div>
                </div>
              </div>
              
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <PlayCircle size={18} style={{ marginRight: '8px' }} /> Start Test
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
            {pastResults.length === 0 ? (
               <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', background: 'white', borderRadius: '16px', border: '1px dotted var(--color-border)' }}>
                  <p>No past test results found.</p>
               </div>
            ) : pastResults.map(result => (
              <div key={result._id} className="card" style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'flex-start' }}>
                    <div>
                        <span className="badge" style={{ background: 'var(--color-bg)', color: 'var(--color-text-secondary)', marginBottom: '8px', display: 'inline-block' }}>{result.subject}</span>
                        <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold' }}>{result.title}</h3>
                    </div>
                  <div style={{ background: 'var(--color-success-light)', color: 'var(--color-success)', padding: '6px 12px', borderRadius: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                     <CheckCircle size={16} /> Graded
                  </div>
                </div>
                
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} /> Taken on {result.date.toLocaleDateString()}
                </div>
                
                <div style={{ background: 'var(--color-surface-raised)', borderRadius: '12px', padding: '16px', display: 'flex', gap: '16px', marginBottom: '20px', border: '1px solid var(--color-border)' }}>
                    <div style={{ flex: 1, borderRight: '1px solid var(--color-border)' }}>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Score Obtained</div>
                        <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--color-primary)', lineHeight: 1 }}>
                            {result.score}<span style={{ fontSize: '14px', color: 'var(--color-text-secondary)', fontWeight: '500' }}>/{result.maxMarks}</span>
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Percentile</div>
                        <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--color-text-primary)', lineHeight: 1 }}>
                            {result.percentile}<span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>%tile</span>
                        </div>
                    </div>
                </div>
                
                <div style={{ marginTop: 'auto', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center', border: '1px solid var(--color-border)' }}>
                    <BarChart2 size={16} style={{ marginRight: '8px' }} /> Detailed Analytics
                  </button>
                  <button className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center', border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
                    <FileQuestion size={16} style={{ marginRight: '8px' }} /> Review Mistakes
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Tests;
