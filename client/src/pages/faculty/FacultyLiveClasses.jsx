import { useState, useEffect } from 'react';
import { Video, Radio, Users, Mic, MicOff, VideoOff, Phone, Clock, Calendar, Plus, Link } from 'lucide-react';
import facultyService from '../../services/facultyService';

const FacultyLiveClasses = () => {
  const [activeSession, setActiveSession] = useState(null);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({ title: '', batchId: '', subject: '', scheduledAt: '', duration: '60', type: 'lecture', chapterId: '', meetingLink: '' });
  const [scheduled, setScheduled] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form Data
  const [batches, setBatches] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [sessions, bchs, subs] = await Promise.all([
        facultyService.getScheduledClasses(),
        facultyService.getBatches(),
        facultyService.getSubjects()
      ]);
      setScheduled(sessions);
      setBatches(bchs);
      setSubjects(subs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadChapters = async (subId) => {
     try {
       const res = await facultyService.getChapters(subId);
       setChapters(res);
     } catch(e) { console.error(e); }
  };

  const handleSchedule = async (e) => {
    e.preventDefault();
    try {
      await facultyService.scheduleLiveClass(scheduleForm);
      setShowScheduleModal(false);
      fetchInitialData();
      setScheduleForm({ title: '', batchId: '', subject: '', scheduledAt: '', duration: '60', type: 'lecture', chapterId: '', meetingLink: '' });
    } catch (err) {
      alert("Error scheduling session");
    }
  };

  const mockParticipants = [
    { id: 1, name: 'Arjun K', status: 'active' },
    { id: 2, name: 'Sana M', status: 'active' },
    { id: 3, name: 'Rahul D', status: 'muted' },
    { id: 4, name: 'Priya S', status: 'active' },
  ];

  const startSession = (cls) => {
    setActiveSession(cls);
  };

  const endSession = () => {
    setActiveSession(null);
  };

  // Active Live Room
  if (activeSession) {
    return (
      <div style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
        {/* Header bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', background: '#0f172a', borderRadius: '12px 12px 0 0', color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444', animation: 'pulse 1.5s infinite' }}></div>
            <span style={{ fontWeight: 'bold', fontSize: '16px' }}>LIVE: {activeSession.title}</span>
          </div>
          <div style={{ fontSize: '14px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={14} /> 00:00 • <Users size={14} /> {mockParticipants.length} students
          </div>
        </div>

        <div style={{ display: 'flex', flex: 1, background: '#0f172a', borderRadius: '0 0 12px 12px', overflow: 'hidden', gap: '1px' }}>
          {/* Main video stage */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', background: '#1e293b' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>🧑‍🏫</div>
            <div style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>You (Host)</div>
            <div style={{ color: '#94a3b8', fontSize: '13px' }}>
              {!camOn && 'Camera Off'} {!micOn && '• Muted'}
            </div>
          </div>

          {/* Participant grid */}
          <div style={{ width: '240px', background: '#0f172a', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
            <div style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Students ({mockParticipants.length})</div>
            {mockParticipants.map(p => (
              <div key={p.id} style={{ background: '#1e293b', borderRadius: '8px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '14px', fontWeight: 'bold' }}>
                  {p.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'white', fontSize: '13px', fontWeight: '500' }}>{p.name}</div>
                  <div style={{ color: p.status === 'muted' ? '#EF4444' : '#22c55e', fontSize: '11px' }}>
                    {p.status === 'muted' ? 'Muted' : 'Active'}
                  </div>
                </div>
                <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '11px' }}>Mute</button>
              </div>
            ))}
          </div>
        </div>

        {/* Controls bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', padding: '20px', background: '#1e293b', borderRadius: '0 0 12px 12px', marginTop: '1px' }}>
          <button onClick={() => setMicOn(!micOn)} style={{ width: '52px', height: '52px', borderRadius: '50%', border: 'none', background: micOn ? '#334155' : '#EF4444', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
            {micOn ? <Mic size={22} /> : <MicOff size={22} />}
          </button>
          <button onClick={() => setCamOn(!camOn)} style={{ width: '52px', height: '52px', borderRadius: '50%', border: 'none', background: camOn ? '#334155' : '#EF4444', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
            {camOn ? <Video size={22} /> : <VideoOff size={22} />}
          </button>
          <button onClick={endSession} style={{ padding: '0 28px', height: '52px', borderRadius: '40px', border: 'none', background: '#EF4444', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>
            <Phone size={20} /> End Class
          </button>
        </div>
        <style>{`@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '60px' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 className="page-title">Live Sessions</h1>
          <p className="page-subtitle">Schedule, manage, and broadcast your live classes.</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setShowScheduleModal(true)}>
          <Plus size={18} /> Schedule Session
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
        {scheduled.map(cls => (
          <div key={cls.id} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: cls.type === 'faq' ? '#fce7f3' : '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: cls.type === 'faq' ? '#db2777' : '#EF4444' }}>
                  {cls.type === 'faq' ? '❓' : <Radio size={24} />}
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 4px 0' }}>{cls.title}</h3>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>{cls.batch?.name || 'All Batches'}</div>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--color-bg)', borderRadius: '8px', padding: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px' }}>
              <div><span style={{ color: 'var(--color-text-secondary)' }}>Status:</span> <strong style={{ textTransform: 'capitalize' }}>{cls.status}</strong></div>
              <div><span style={{ color: 'var(--color-text-secondary)' }}>Duration:</span> <strong>{cls.duration} min</strong></div>
              <div style={{ gridColumn: '1/-1' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Scheduled: </span>
                <strong>{new Date(cls.scheduledAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn btn-outline" style={{ flex: 1 }}>Edit</button>
              <button className="btn btn-primary" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={() => startSession(cls)}>
                <Radio size={16} /> Go Live
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '28px', width: '550px', maxHeight: '95vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>Schedule New Live Session</h2>
            <form onSubmit={handleSchedule} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                 <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '14px' }}>Session Type</label>
                    <select value={scheduleForm.type} onChange={e => setScheduleForm({ ...scheduleForm, type: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                       <option value="lecture">Standard Lecture</option>
                       <option value="faq">FAQ / Doubt Session</option>
                    </select>
                 </div>
                 <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '14px' }}>Target Batch</label>
                    <select value={scheduleForm.batchId} onChange={e => setScheduleForm({ ...scheduleForm, batchId: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }} required>
                       <option value="">Select Batch</option>
                       {batches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                    </select>
                 </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '14px' }}>Class Title</label>
                <input value={scheduleForm.title} onChange={e => setScheduleForm({ ...scheduleForm, title: e.target.value })} placeholder="e.g. Motion and Force Live Q&A" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                 <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '14px' }}>Subject</label>
                    <select value={scheduleForm.subject} onChange={e => {
                        setScheduleForm({ ...scheduleForm, subject: e.target.value });
                        const sub = subjects.find(s => s.name === e.target.value);
                        if (sub) loadChapters(sub._id);
                    }} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }} required>
                       <option value="">Select Subject</option>
                       {subjects.map(s => <option key={s._id} value={s.name}>{s.name}</option>)}
                    </select>
                 </div>
                 <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '14px' }}>Chapter (Optional)</label>
                    <select value={scheduleForm.chapterId} onChange={e => setScheduleForm({ ...scheduleForm, chapterId: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', color: !scheduleForm.subject ? '#ccc' : 'inherit' }} disabled={!scheduleForm.subject}>
                       <option value="">Select Chapter</option>
                       {chapters.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                    </select>
                 </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '14px' }}>Date & Time</label>
                  <input type="datetime-local" value={scheduleForm.scheduledAt} onChange={e => setScheduleForm({ ...scheduleForm, scheduledAt: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }} required />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '14px' }}>Duration (mins)</label>
                  <input type="number" value={scheduleForm.duration} onChange={e => setScheduleForm({ ...scheduleForm, duration: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '14px' }}>Meeting Link (Optional)</label>
                <div style={{ position: 'relative' }}>
                   <Link size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                   <input value={scheduleForm.meetingLink} onChange={e => setScheduleForm({ ...scheduleForm, meetingLink: e.target.value })} placeholder="Zoom / Google Meet URL" style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px', border: '1px solid var(--color-border)' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowScheduleModal(false)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>Schedule Session</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyLiveClasses;
