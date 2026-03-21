import { useState, useEffect } from 'react';
import { Layers, Plus, Users, BookOpen, ChevronLeft, Video, Edit, Trash2, Link as LinkIcon, CheckCircle } from 'lucide-react';
import instructorService from '../../services/instructorService';
import ConfirmModal from '../../components/ConfirmModal';

const ContentManagement = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [videos, setVideos] = useState([]);
  const [pendingVideos, setPendingVideos] = useState([]);
  const [pendingAssessments, setPendingAssessments] = useState({ tests: [], assignments: [] });
  const [batches, setBatches] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);

  // Top-Level Navigation
  const [activeSection, setActiveSection] = useState('recorded'); // 'recorded' | 'live' | 'assignments' | 'tests'

  // Drilldown
  const [currentView, setCurrentView] = useState('subjects'); // 'subjects' | 'chapters' | 'videos'
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  // Form States & Modals
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [subjectForm, setSubjectForm] = useState({ id: null, name: '' });

  const [showChapterModal, setShowChapterModal] = useState(false);
  const [chapterForm, setChapterForm] = useState({ id: null, name: '' });

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignData, setAssignData] = useState({ type: '', id: '', name: '', currentBatches: [] });
  const [selectedBatchId, setSelectedBatchId] = useState('');

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [previewVideo, setPreviewVideo] = useState(null);
  
  const [showDistributeModal, setShowDistributeModal] = useState(false);
  const [distributeData, setDistributeData] = useState({ id: '', title: '', targetType: 'batch', type: 'assignment' }); // Added type
  const [distributeTargetId, setDistributeTargetId] = useState('');
  const [assessmentDeadline, setAssessmentDeadline] = useState('');

  // Reusable Delete Modal State
  const [confirmDelete, setConfirmDelete] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });
  
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [subs, bchs, pending, pendingAsgns, asgns, cls, stds] = await Promise.all([
        instructorService.getSubjects(),
        instructorService.getBatches(),
        instructorService.getPendingVideos(),
        instructorService.getPendingAssessments(),
        instructorService.getAssignments(),
        instructorService.getClasses(),
        instructorService.getStudents()
      ]);
      setSubjects(subs);
      setBatches(bchs);
      setPendingVideos(pending);
      setPendingAssessments(pendingAsgns);
      setAssignments(asgns);
      setClasses(cls);
      setStudents(stds);
    } catch (err) {
      setError('Failed to load initial data');
    } finally {
      setLoading(false);
    }
  };

  const fetchChapters = async (subjectId) => {
    try {
      const data = await instructorService.getChapters(subjectId);
      setChapters(data);
    } catch (err) { setError('Failed to load chapters'); }
  };

  const fetchVideos = async (chapterId) => {
    try {
      const data = await instructorService.getVideosByChapter(chapterId);
      setVideos(data);
    } catch (err) { setError('Failed to load videos'); }
  };

  // --- Subject Actions ---
  const handleSaveSubject = async (e) => {
    e.preventDefault();
    try {
      if (subjectForm.id) {
        const updated = await instructorService.updateSubject(subjectForm.id, subjectForm.name);
        setSubjects(subjects.map(s => s._id === updated._id ? updated : s));
      } else {
        const created = await instructorService.createSubject(subjectForm.name);
        setSubjects([...subjects, created]);
      }
      setShowSubjectModal(false);
    } catch (err) { alert('Error saving subject'); }
  };

  const handleDeleteSubject = async (id) => {
    setConfirmDelete({
      isOpen: true,
      title: "Delete Subject?",
      message: "Are you sure you want to permanently delete this subject? All curriculum inside it will be orphaned.",
      onConfirm: async () => {
        try {
          await instructorService.deleteSubject(id);
          setSubjects(subjects.filter(s => s._id !== id));
          setConfirmDelete(prev => ({ ...prev, isOpen: false }));
        } catch (err) { alert('Error deleting subject'); }
      }
    });
  };

  // --- Chapter Actions ---
  const handleSaveChapter = async (e) => {
    e.preventDefault();
    try {
      if (chapterForm.id) {
        const updated = await instructorService.updateChapter(chapterForm.id, chapterForm.name);
        setChapters(chapters.map(c => c._id === updated._id ? updated : c));
      } else {
        const created = await instructorService.createChapter(chapterForm.name, selectedSubject._id);
        setChapters([...chapters, created]);
      }
      setShowChapterModal(false);
    } catch (err) { alert('Error saving chapter'); }
  };

  const handleDeleteChapter = async (id) => {
    setConfirmDelete({
      isOpen: true,
      title: "Delete Chapter?",
      message: "Are you sure you want to permanently delete this chapter?",
      onConfirm: async () => {
        try {
          await instructorService.deleteChapter(id);
          setChapters(chapters.filter(c => c._id !== id));
          setConfirmDelete(prev => ({ ...prev, isOpen: false }));
        } catch (err) { alert('Error deleting chapter'); }
      }
    });
  };

  // --- Video Actions ---
  const handleDeleteVideo = async (id) => {
    setConfirmDelete({
      isOpen: true,
      title: "Delete Video Link?",
      message: "Are you sure you want to delete this recorded video from the curriculum?",
      onConfirm: async () => {
        try {
          await instructorService.deleteVideo(id);
          setVideos(videos.filter(v => v._id !== id));
          setConfirmDelete(prev => ({ ...prev, isOpen: false }));
        } catch (err) { alert('Error deleting video'); }
      }
    });
  };

  const handleLinkVideo = async (videoId) => {
    try {
      const linked = await instructorService.linkVideoToChapter(videoId, selectedChapter._id, selectedSubject._id);
      setVideos([...videos, linked]);
      setPendingVideos(pendingVideos.filter(v => v._id !== videoId));
      setShowReviewModal(false);
      setPreviewVideo(null);
      
      // Auto-trigger assignment flow
      openAssignModal('video', linked);
    } catch (err) { alert("Error linking video"); }
  };

  // --- Assign Logic ---
  
  const handleDistributeAssignment = async (e) => {
    e.preventDefault();
    try {
      if (distributeData.type === 'assignment' && !distributeData.isNew) {
        const updated = await instructorService.distributeAssignment(distributeData.id, distributeData.targetType, distributeTargetId);
        setAssignments(assignments.map(a => a._id === updated._id ? updated : a));
      } else {
        // Approving NEW assignment or test from faculty
        const type = distributeData.type === 'test' ? 'test' : 'assignment';
        await instructorService.approveAssessment(distributeData.id, type, [distributeTargetId], assessmentDeadline);
        
        // Refresh Lists
        fetchInitialData();
      }
      setShowDistributeModal(false);
    } catch (err) {
      alert("Error distributing content");
    }
  };

  const openAssignModal = (type, item) => {
    setAssignData({ type, id: item._id, name: item.name || item.title, currentBatches: item.assignedTo || [] });
    setSelectedBatchId('');
    setShowAssignModal(true);
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    const newBatchIds = [...assignData.currentBatches.map(b => b._id), selectedBatchId];
    try {
      let updated;
      if (assignData.type === 'subject') updated = await instructorService.assignSubject(assignData.id, newBatchIds);
      if (assignData.type === 'chapter') updated = await instructorService.assignChapter(assignData.id, newBatchIds);
      if (assignData.type === 'video') updated = await instructorService.assignVideo(assignData.id, newBatchIds);
      
      // Update local state
      if (assignData.type === 'subject') setSubjects(subjects.map(x => x._id === updated._id ? updated : x));
      if (assignData.type === 'chapter') setChapters(chapters.map(x => x._id === updated._id ? updated : x));
      if (assignData.type === 'video') setVideos(videos.map(x => x._id === updated._id ? updated : x));
      
      setShowAssignModal(false);
    } catch(err) { alert("Error assigning batch"); }
  };

  if (loading) return <div className="spinner" style={{ margin: 'auto', display: 'block', marginTop: '20vh' }}></div>;

  const renderBreadcrumbs = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
      <button onClick={() => setCurrentView('subjects')} style={{ background: 'none', border: 'none', color: currentView === 'subjects' ? 'var(--color-text-primary)' : 'var(--color-primary)', cursor: 'pointer', padding: 0, fontWeight: currentView === 'subjects' ? 'bold' : 'normal' }}>
        Subjects
      </button>
      {currentView !== 'subjects' && (
        <>
          <ChevronLeft size={14} />
          <button onClick={() => { setCurrentView('chapters'); fetchChapters(selectedSubject._id); }} style={{ background: 'none', border: 'none', color: currentView === 'chapters' ? 'var(--color-text-primary)' : 'var(--color-primary)', cursor: 'pointer', padding: 0, fontWeight: currentView === 'chapters' ? 'bold' : 'normal' }}>
            {selectedSubject?.name}
          </button>
        </>
      )}
      {currentView === 'videos' && (
        <>
           <ChevronLeft size={14} />
           <span style={{ color: 'var(--color-text-primary)', fontWeight: 'bold' }}>{selectedChapter?.name}</span>
        </>
      )}
    </div>
  );

  return (
    <div style={{ paddingBottom: '60px' }}>
      {error && <div className="alert-error" style={{ background: '#FEE2E2', color: '#DC2626', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>{error}</div>}
      
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 className="page-title">Content Pipeline</h1>
          <p className="page-subtitle">Manage curriculum hierarchy, tests, assignments, and live classes.</p>
        </div>
        {(pendingVideos.length > 0 || pendingAssessments.tests.length > 0 || pendingAssessments.assignments.length > 0) && currentView === 'subjects' && (
          <div style={{ background: '#FEF3C7', padding: '8px 16px', borderRadius: '8px', border: '1px solid #FDE68A', display: 'flex', alignItems: 'center', gap: '8px', color: '#92400E', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setShowReviewModal(true)}>
             <CheckCircle size={16} /> {pendingVideos.length + pendingAssessments.tests.length + pendingAssessments.assignments.length} Pending Approvals
          </div>
        )}
      </div>

      {/* TABS NAVIGATION */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', marginBottom: '24px', gap: '24px' }}>
        {[
          { id: 'recorded', label: 'Recorded Classes' },
          { id: 'live', label: 'Live Classes' },
          { id: 'assignments', label: 'Assignments' },
          { id: 'tests', label: 'Tests' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            style={{ 
              background: 'none', 
              border: 'none', 
              padding: '0 0 12px 0', 
              cursor: 'pointer', 
              fontSize: '15px', 
              fontWeight: activeSection === tab.id ? 'bold' : '600',
              color: activeSection === tab.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              borderBottom: activeSection === tab.id ? '2px solid var(--color-primary)' : '2px solid transparent',
              transition: 'all 0.2s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeSection === 'recorded' && renderBreadcrumbs()}

      {/* VIEW: SUBJECTS */}
      {activeSection === 'recorded' && currentView === 'subjects' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <button className="btn btn-primary" onClick={() => { setSubjectForm({ id: null, name: '' }); setShowSubjectModal(true); }}>
              <Plus size={18} /> New Subject
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {subjects.length === 0 ? <div style={{ background: 'white', padding: '30px', textAlign: 'center', borderRadius: '12px', border: '1px dashed #ccc', gridColumn: '1 / -1' }}>No subjects found.</div> : null}
            {subjects.map(sub => (
              <div key={sub._id} style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: '16px', padding: '20px', transition: 'all 0.2s', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => { setSelectedSubject(sub); setCurrentView('chapters'); fetchChapters(sub._id); }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 4px 0' }}>{sub.name}</h3>
                      <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Assigned to {sub.assignedTo.length} batches</span>
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
                  <button className="btn btn-outline" style={{ flex: 1, padding: '8px', fontSize: '13px' }} onClick={() => openAssignModal('subject', sub)}><Users size={14} style={{ marginRight: '6px' }}/> Assign</button>
                  <button className="btn btn-outline" style={{ padding: '8px' }} onClick={() => { setSubjectForm({ id: sub._id, name: sub.name }); setShowSubjectModal(true); }}><Edit size={14} /></button>
                  <button className="btn btn-outline" style={{ padding: '8px', color: '#DC2626', borderColor: '#FEE2E2' }} onClick={() => handleDeleteSubject(sub._id)}><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* VIEW: CHAPTERS */}
      {activeSection === 'recorded' && currentView === 'chapters' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <button className="btn btn-primary" onClick={() => { setChapterForm({ id: null, name: '' }); setShowChapterModal(true); }}>
              <Plus size={18} /> New Chapter
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {chapters.length === 0 ? <div style={{ background: 'white', padding: '30px', textAlign: 'center', borderRadius: '12px', border: '1px dashed #ccc', gridColumn: '1 / -1' }}>No chapters found for {selectedSubject.name}.</div> : null}
            {chapters.map(chap => (
              <div key={chap._id} style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: '16px', padding: '20px', transition: 'all 0.2s', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => { setSelectedChapter(chap); setCurrentView('videos'); fetchVideos(chap._id); }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1' }}>
                      <Layers size={24} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 4px 0' }}>{chap.name}</h3>
                      <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Assigned to {chap.assignedTo.length} batches</span>
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
                  <button className="btn btn-outline" style={{ flex: 1, padding: '8px', fontSize: '13px' }} onClick={() => openAssignModal('chapter', chap)}><Users size={14} style={{ marginRight: '6px' }}/> Assign</button>
                  <button className="btn btn-outline" style={{ padding: '8px' }} onClick={() => { setChapterForm({ id: chap._id, name: chap.name }); setShowChapterModal(true); }}><Edit size={14} /></button>
                  <button className="btn btn-outline" style={{ padding: '8px', color: '#DC2626', borderColor: '#FEE2E2' }} onClick={() => handleDeleteChapter(chap._id)}><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* VIEW: VIDEOS */}
      {activeSection === 'recorded' && currentView === 'videos' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
            <h2 style={{ fontSize: '20px', margin: 0 }}>Linked Recorded Classes</h2>
            <button className="btn btn-primary" onClick={() => setShowReviewModal(true)}>
              <LinkIcon size={18} /> Review Faculty Uploads
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {videos.length === 0 ? <div style={{ background: 'white', padding: '30px', textAlign: 'center', borderRadius: '12px', border: '1px dashed #ccc', gridColumn: '1 / -1' }}>No recorded classes uploaded yet.</div> : null}
            {videos.map(vid => (
              <div key={vid._id} style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: '16px', padding: '20px', transition: 'all 0.2s', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5' }}>
                      <Video size={20} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 4px 0', lineHeight: 1.3 }}>{vid.title}</h3>
                      {vid.scheduledFor && new Date(vid.scheduledFor) > new Date() ? (
                         <span style={{ fontSize: '12px', padding: '2px 6px', background: '#fef9c3', color: '#a16207', borderRadius: '4px', fontWeight: 'bold' }}>Scheduled: {new Date(vid.scheduledFor).toLocaleDateString()}</span>
                      ) : (
                         <span style={{ fontSize: '12px', padding: '2px 6px', background: '#dcfce7', color: '#166534', borderRadius: '4px', fontWeight: 'bold' }}>Active</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
                  <button className="btn btn-outline" style={{ flex: 1, padding: '8px', fontSize: '13px' }} onClick={() => openAssignModal('video', vid)}><Users size={14} style={{ marginRight: '6px' }}/> Assign</button>
                  <button className="btn btn-outline" style={{ padding: '8px', color: '#DC2626', borderColor: '#FEE2E2' }} onClick={() => handleDeleteVideo(vid._id)}><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* SECTION: LIVE CLASSES */}
      {activeSection === 'live' && (
        <div style={{ background: 'white', padding: '40px', borderRadius: '16px', border: '1px solid var(--color-border)', textAlign: 'center' }}>
           <h2 style={{ fontSize: '20px', marginBottom: '8px', fontWeight: 'bold' }}>Live Classes Module</h2>
           <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>Schedule, manage and launch interactive live sessions.</p>
           <button className="btn btn-primary"><Plus size={16} style={{ marginRight: '8px' }}/> Schedule Session</button>
        </div>
      )}

      {/* SECTION: ASSIGNMENTS */}
      {activeSection === 'assignments' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
            <h2 style={{ fontSize: '20px', margin: 0, fontWeight: 'bold' }}>Available Assignments</h2>
            <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>Drafted by Faculty</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {assignments.length === 0 ? <div style={{ background: 'white', padding: '40px', textAlign: 'center', borderRadius: '16px', border: '1px dashed #ccc', gridColumn: '1 / -1' }}>No assignments available from Faculty yet.</div> : null}
            {assignments.map(asgn => (
              <div key={asgn._id} style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: '16px', padding: '24px', transition: 'all 0.2s', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 4px 0', lineHeight: 1.3 }}>{asgn.title}</h3>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 16px 0' }}>{asgn.description?.substring(0, 80)}...</p>
                  
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#64748b' }}>Due:</span> <strong>{new Date(asgn.deadline).toLocaleDateString()}</strong></div>
                     <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#64748b' }}>Marks:</span> <strong>{asgn.maxMarks}</strong></div>
                  </div>
                </div>
                
                <button className="btn btn-primary" style={{ width: '100%', padding: '10px', fontSize: '14px' }} onClick={() => {
                  setDistributeData({ id: asgn._id, title: asgn.title, targetType: 'batch' });
                  setDistributeTargetId('');
                  setShowDistributeModal(true);
                }}><Users size={16} style={{ marginRight: '8px' }}/> Distribute </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* SECTION: TESTS */}
      {activeSection === 'tests' && (
        <div style={{ background: 'white', padding: '40px', borderRadius: '16px', border: '1px solid var(--color-border)', textAlign: 'center' }}>
           <h2 style={{ fontSize: '20px', marginBottom: '8px', fontWeight: 'bold' }}>Tests & Quizzes</h2>
           <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>Administer formatted examinations and evaluate progress.</p>
           <button className="btn btn-primary"><Plus size={16} style={{ marginRight: '8px' }}/> Create Test</button>
        </div>
      )}

      {/* --- MODALS --- */}

      {/* Subject Modal */}
      {showSubjectModal && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: 'white', padding: '24px', borderRadius: '16px', width: '400px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>{subjectForm.id ? "Edit Subject" : "New Subject"}</h2>
            <form onSubmit={handleSaveSubject}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Subject Name</label>
                <input type="text" value={subjectForm.name} onChange={e => setSubjectForm({...subjectForm, name: e.target.value})} placeholder="e.g. Mathematics" required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={() => setShowSubjectModal(false)} className="btn btn-outline" style={{ flex: 1, padding: '10px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '10px' }}>Save Subject</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Chapter Modal */}
      {showChapterModal && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: 'white', padding: '24px', borderRadius: '16px', width: '400px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>{chapterForm.id ? "Edit Chapter" : "New Chapter"}</h2>
            <form onSubmit={handleSaveChapter}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Chapter Name</label>
                <input type="text" value={chapterForm.name} onChange={e => setChapterForm({...chapterForm, name: e.target.value})} placeholder="e.g. Algebra Basics" required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={() => setShowChapterModal(false)} className="btn btn-outline" style={{ flex: 1, padding: '10px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '10px' }}>Save Chapter</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: 'white', padding: '24px', borderRadius: '16px', width: '440px' }}>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>Assign {assignData.type.charAt(0).toUpperCase() + assignData.type.slice(1)}</h2>
            <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Assign <strong>{assignData.name}</strong> to a new batch.</p>
            
            <div style={{ marginBottom: '20px' }}>
               <h4 style={{ fontSize: '13px', color: 'var(--color-text-light)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Currently Assigned To</h4>
               <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                 {assignData.currentBatches.length === 0 ? <span style={{ fontSize: '13px', color: '#666' }}>No batches assigned yet.</span> : null}
                 {assignData.currentBatches.map(b => (
                   <div key={b._id} style={{ padding: '4px 10px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle size={12} color="var(--color-primary)" /> {b.name}
                   </div>
                 ))}
               </div>
            </div>

            <form onSubmit={handleAssign}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Assign to New Batch</label>
                <select value={selectedBatchId} onChange={e => setSelectedBatchId(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}>
                  <option value="" disabled>Select a batch...</option>
                  {batches.filter(b => !assignData.currentBatches.find(cb => cb._id === b._id)).map(b => (
                    <option key={b._id} value={b._id}>{b.name} ({b.studyClass?.name})</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={() => setShowAssignModal(false)} className="btn btn-outline" style={{ flex: 1, padding: '10px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '10px' }} disabled={!selectedBatchId}>Add Assignment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Distribute Assignment Modal */}
      {showDistributeModal && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: 'white', padding: '24px', borderRadius: '16px', width: '440px' }}>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>Distribute Assignment</h2>
            <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Assign <strong>{distributeData.title}</strong> targeting a specific group.</p>

            <form onSubmit={handleDistributeAssignment}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Target Scope</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                   {['batch', 'class', 'student'].map(type => (
                     <button key={type} type="button" onClick={() => { setDistributeData({...distributeData, targetType: type}); setDistributeTargetId(''); }} style={{ flex: 1, padding: '8px', borderRadius: '8px', background: distributeData.targetType === type ? 'var(--color-primary-light)' : '#f3f4f6', color: distributeData.targetType === type ? 'var(--color-primary)' : '#4b5563', border: distributeData.targetType === type ? '1px solid var(--color-primary)' : '1px solid transparent', fontWeight: 'bold', textTransform: 'capitalize' }}>
                       {type}
                     </button>
                   ))}
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Select {distributeData.targetType.charAt(0).toUpperCase() + distributeData.targetType.slice(1)}</label>
                <select value={distributeTargetId} onChange={e => setDistributeTargetId(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}>
                  <option value="" disabled>Select a {distributeData.targetType}...</option>
                  {distributeData.targetType === 'batch' && batches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                  {distributeData.targetType === 'class' && classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                  {distributeData.targetType === 'student' && students.map(s => <option key={s._id} value={s._id}>{s.name} ({s.email})</option>)}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={() => setShowDistributeModal(false)} className="btn btn-outline" style={{ flex: 1, padding: '10px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '10px' }} disabled={!distributeTargetId}>Distribute Now</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showReviewModal && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: 'white', padding: '24px', borderRadius: '16px', width: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>Review Pending Uploads</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px' }}>
               {/* Left: List of items */}
               <div style={{ borderRight: '1px solid var(--color-border)', paddingRight: '20px' }}>
                  <h4 style={{ fontSize: '13px', color: '#666', marginBottom: '12px', textTransform: 'uppercase' }}>Videos & FAQ</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                      {pendingVideos.map(vid => (
                        <div key={vid._id} style={{ padding: '10px', border: previewVideo?._id === vid._id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer', background: previewVideo?._id === vid._id ? 'var(--color-primary-light)' : '#f9fafb' }} onClick={() => setPreviewVideo({...vid, itemType: 'video'})}>
                           <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{vid.contentType === 'faq' ? '❓' : '🎥'} {vid.title}</div>
                           <div style={{ fontSize: '11px', color: '#666' }}>Sub: {vid.subject?.name} | By: {vid.faculty?.name}</div>
                        </div>
                      ))}
                  </div>

                  <h4 style={{ fontSize: '13px', color: '#666', marginBottom: '12px', textTransform: 'uppercase' }}>Assessments</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {pendingAssessments.tests.map(t => (
                        <div key={t._id} style={{ padding: '10px', border: previewVideo?._id === t._id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer', background: previewVideo?._id === t._id ? 'var(--color-primary-light)' : '#f9fafb' }} onClick={() => setPreviewVideo({...t, itemType: 'test'})}>
                           <div style={{ fontSize: '14px', fontWeight: 'bold' }}>📝 {t.title} (Main Test)</div>
                        </div>
                      ))}
                      {pendingAssessments.assignments.map(a => (
                        <div key={a._id} style={{ padding: '10px', border: previewVideo?._id === a._id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer', background: previewVideo?._id === a._id ? 'var(--color-primary-light)' : '#f9fafb' }} onClick={() => setPreviewVideo({...a, itemType: 'assignment'})}>
                           <div style={{ fontSize: '14px', fontWeight: 'bold' }}>📋 {a.title} (Main Assignment)</div>
                        </div>
                      ))}
                  </div>
               </div>

               {/* Right: Details / Preview */}
               <div>
                  {!previewVideo ? (
                    <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>Select an item to preview</div>
                  ) : (
                    <>
                      {previewVideo.itemType === 'video' ? (
                        <div style={{ width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
                           {previewVideo.videoUrl.includes('youtube.com') || previewVideo.videoUrl.includes('youtu.be') ? (
                             <iframe width="100%" height="100%" src={previewVideo.videoUrl.replace('watch?v=', 'embed/')} frameBorder="0" allowFullScreen></iframe>
                           ) : (
                             <video src={previewVideo.videoUrl} width="100%" height="100%" controls></video>
                           )}
                        </div>
                      ) : (
                        <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px', marginBottom: '16px', textAlign: 'center' }}>
                           <h3 style={{ margin: '0 0 8px 0' }}>{previewVideo.title}</h3>
                           <p style={{ color: '#666', fontSize: '14px' }}>Document Preview (PDF)</p>
                           <a href={previewVideo.fileUrl} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ display: 'inline-block', marginTop: '12px' }}>Download/View File</a>
                        </div>
                      )}
                      
                      <div style={{ background: '#fff', border: '1px solid var(--color-border)', padding: '16px', borderRadius: '12px' }}>
                         <h4 style={{ margin: '0 0 8px 0' }}>{previewVideo.description || 'No description provided.'}</h4>
                         <div style={{ fontSize: '13px', color: '#666' }}>Submitted by: <strong>{previewVideo.faculty?.name || previewVideo.facultyId?.name}</strong></div>
                      </div>

                      <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                         {previewVideo.itemType === 'video' ? (
                           <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => handleLinkVideo(previewVideo._id)}>Approve & Link to Curriculum</button>
                         ) : (
                           <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => {
                             setDistributeData({ id: previewVideo._id, title: previewVideo.title, targetType: 'batch', type: previewVideo.itemType, isNew: true });
                             setShowDistributeModal(true);
                           }}>Approve & Distribute to Batches</button>
                         )}
                         <button className="btn btn-outline" style={{ color: '#DC2626' }}>Reject</button>
                      </div>
                    </>
                  )}
               </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
              <button onClick={() => { setShowReviewModal(false); setPreviewVideo(null); }} className="btn btn-outline">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal 
        isOpen={confirmDelete.isOpen}
        title={confirmDelete.title}
        message={confirmDelete.message}
        confirmText="Yes, Delete"
        confirmStyle="danger"
        onConfirm={confirmDelete.onConfirm}
        onCancel={() => setConfirmDelete(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};

export default ContentManagement;
