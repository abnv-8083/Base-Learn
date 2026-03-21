import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, BookOpen, X, Users } from 'lucide-react';
import axios from 'axios';

const gradeColors = {
  'Class 8': { color: '#f59e0b', bg: '#fffbeb' },
  'Class 9': { color: '#10b981', bg: '#ecfdf5' },
  'Class 10': { color: '#6366f1', bg: '#eef2ff' },
};

const AdminClassManagement = () => {
  const token = localStorage.getItem('token');
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', targetGrade: 'Class 10' });
  const [saving, setSaving] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [details, setDetails] = useState({ batches: [], totalStudents: 0 });
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => { fetchClasses(); }, []);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/admin/classes', { headers: { Authorization: `Bearer ${token}` } });
      setClasses(Array.isArray(res.data) ? res.data : []);
    } catch {
      setClasses([]);
    } finally { setLoading(false); }
  };

  const handleViewDetails = async (cls) => {
    setSelectedClass(cls);
    setLoadingDetails(true);
    setShowDetailModal(true);
    try {
      const res = await axios.get(`/api/admin/classes/${cls._id}/details`, { headers: { Authorization: `Bearer ${token}` } });
      setDetails(res.data);
    } catch {
      alert('Failed to fetch class details.');
      setShowDetailModal(false);
    } finally { setLoadingDetails(false); }
  };

  const openCreate = () => {
    setForm({ name: '', targetGrade: 'Class 10' });
    setEditing(null);
    setShowModal(true);
  };

  const openEdit = (cls) => {
    setForm({ name: cls.name, targetGrade: cls.targetGrade });
    setEditing(cls);
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) {
        await axios.put(`/api/admin/classes/${editing._id}`, form, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await axios.post('/api/admin/classes', form, { headers: { Authorization: `Bearer ${token}` } });
      }
      setShowModal(false);
      fetchClasses();
    } catch { alert('Failed to save class.'); } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this class? Students in this class will be unlinked.')) return;
    try {
      await axios.delete(`/api/admin/classes/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchClasses();
    } catch { alert('Delete failed.'); }
  };

  if (loading) return <div className="spinner" style={{ display: 'block', margin: '10vh auto' }}></div>;

  return (
    <div style={{ paddingBottom: '60px' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 className="page-title">Class Management</h1>
          <p className="page-subtitle">Create and manage study classes for Class 8, 9, and 10 students.</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={openCreate}>
          <Plus size={18} /> New Class
        </button>
      </div>

      {classes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', border: '1px dashed var(--color-border)', borderRadius: '12px', color: 'var(--color-text-secondary)' }}>
          No classes yet. Click "New Class" to create one.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {classes.map(cls => {
            const palette = gradeColors[cls.targetGrade] || { color: '#6366f1', bg: '#eef2ff' };
            return (
              <div key={cls._id} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }} onClick={() => handleViewDetails(cls)}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: palette.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: palette.color }}>
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 'bold', color: palette.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>{cls.targetGrade}</div>
                      <h3 style={{ fontSize: '17px', fontWeight: 'bold', margin: 0 }}>{cls.name}</h3>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => handleViewDetails(cls)} style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'white', cursor: 'pointer', color: '#10b981' }} title="View Enrollment"><Users size={14} /></button>
                    <button onClick={() => openEdit(cls)} style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'white', cursor: 'pointer', color: '#6366f1' }} title="Edit"><Pencil size={14} /></button>
                    <button onClick={() => handleDelete(cls._id)} style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'white', cursor: 'pointer', color: '#ef4444' }} title="Delete"><Trash2 size={14} /></button>
                  </div>
                </div>

                <div style={{ background: 'var(--color-bg)', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: 'var(--color-text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Created: {new Date(cls.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Class Details Modal */}
      {showDetailModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '28px', width: '550px', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontWeight: 'bold', fontSize: '20px', margin: 0 }}>Class Details</h2>
                <p style={{ margin: '4px 0 0 0', color: 'var(--color-text-secondary)', fontSize: '14px' }}>{selectedClass?.name}</p>
              </div>
              <button onClick={() => setShowDetailModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            {loadingDetails ? (
              <div style={{ textAlign: 'center', padding: '40px' }}><div className="spinner" style={{ margin: '0 auto' }}></div></div>
            ) : (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ padding: '16px', background: 'var(--color-primary-light)', borderRadius: '12px', border: '1px solid var(--color-primary-border)' }}>
                    <div style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}>Total Enrollment</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{details.totalStudents} <span style={{ fontSize: '14px', fontWeight: 'normal' }}>Students</span></div>
                  </div>
                  <div style={{ padding: '16px', background: 'var(--color-success-light)', borderRadius: '12px', border: '1px solid var(--color-success-border)' }}>
                    <div style={{ fontSize: '12px', color: 'var(--color-success)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}>Active Batches</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{details.batches.length} <span style={{ fontSize: '14px', fontWeight: 'normal' }}>Batches</span></div>
                  </div>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>Batches In This Class</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {details.batches.length === 0 ? (
                    <div style={{ padding: '20px', textAlign: 'center', background: 'var(--color-bg)', borderRadius: '8px', color: 'var(--color-text-secondary)' }}>No batches created for this class yet.</div>
                  ) : details.batches.map(batch => (
                    <div key={batch._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', border: '1px solid var(--color-border)', borderRadius: '10px' }}>
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{batch.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Instructor: {batch.instructor?.name || 'Unassigned'}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>{batch.studentCount}</div>
                        <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Students</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: '28px' }}>
              <button onClick={() => setShowDetailModal(false)} className="btn btn-primary" style={{ width: '100%' }}>Close View</button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '28px', width: '420px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontWeight: 'bold', fontSize: '18px', margin: 0 }}>{editing ? 'Edit Class' : 'New Class'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '13px' }}>Class Name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Class 10 – Xylem Batch"
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '14px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '13px' }}>Target Grade</label>
                <select value={form.targetGrade} onChange={e => setForm({ ...form, targetGrade: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '14px' }}>
                  <option>Class 8</option>
                  <option>Class 9</option>
                  <option>Class 10</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '22px' }}>
              <button onClick={() => setShowModal(false)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
              <button onClick={handleSave} className="btn btn-primary" style={{ flex: 2 }} disabled={saving}>
                {saving ? 'Saving...' : (editing ? 'Save Changes' : 'Create Class')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClassManagement;
