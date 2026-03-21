import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Users, X } from 'lucide-react';
import axios from 'axios';

const AdminBatchManagement = () => {
  const token = localStorage.getItem('token');
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null);
  const [form, setForm] = useState({ name: '', studyClass: '', capacity: 30 });
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchBatches(); }, []);

  const fetchBatches = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/admin/batches', { headers: { Authorization: `Bearer ${token}` } });
      setBatches(Array.isArray(res.data) ? res.data : []);
    } catch {
      // Mock data if API not ready
      setBatches([
        { _id: '1', name: 'Class 10 – Batch A', studyClass: 'Class 10', students: Array(28), capacity: 30 },
        { _id: '2', name: 'Class 9 – Batch B', studyClass: 'Class 9', students: Array(22), capacity: 30 },
        { _id: '3', name: 'Class 8 – Batch A', studyClass: 'Class 8', students: Array(15), capacity: 30 },
      ]);
    } finally { setLoading(false); }
  };

  const openCreate = () => {
    setForm({ name: '', studyClass: 'Class 10', capacity: 30 });
    setEditingBatch(null);
    setShowModal(true);
  };

  const openEdit = (batch) => {
    setForm({ name: batch.name, studyClass: batch.studyClass, capacity: batch.capacity });
    setEditingBatch(batch);
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editingBatch) {
        await axios.put(`/api/admin/batches/${editingBatch._id}`, form, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await axios.post('/api/admin/batches', form, { headers: { Authorization: `Bearer ${token}` } });
      }
      setShowModal(false);
      fetchBatches();
    } catch { alert('Failed to save batch.'); } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this batch?')) return;
    try { await axios.delete(`/api/admin/batches/${id}`, { headers: { Authorization: `Bearer ${token}` } }); fetchBatches(); } catch { alert('Delete failed.'); }
  };

  const classColors = { 'Class 10': '#6366f1', 'Class 9': '#10b981', 'Class 8': '#f59e0b' };

  if (loading) return <div className="spinner" style={{ display: 'block', margin: '10vh auto' }}></div>;

  return (
    <div style={{ paddingBottom: '60px' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 className="page-title">Batch Management</h1>
          <p className="page-subtitle">Manage Class 8, 9, and 10 batches and their student assignments.</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={openCreate}>
          <Plus size={18} /> New Batch
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {batches.map(batch => {
          const color = classColors[batch.studyClass] || '#6366f1';
          const fill = (batch.students?.length || 0) / (batch.capacity || 30) * 100;
          return (
            <div key={batch._id} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 'bold', color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{batch.studyClass}</div>
                  <h3 style={{ fontSize: '17px', fontWeight: 'bold', margin: 0 }}>{batch.name}</h3>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => openEdit(batch)} style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'white', cursor: 'pointer', color: '#6366f1' }}><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(batch._id)} style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'white', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={14} /></button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                <Users size={15} />
                <span>{batch.students?.length || 0} / {batch.capacity} students</span>
              </div>

              <div>
                <div style={{ height: '6px', borderRadius: '3px', background: '#e2e8f0', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${fill}%`, background: fill > 90 ? '#ef4444' : color, borderRadius: '3px', transition: 'width 0.3s' }}></div>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>{Math.round(fill)}% capacity</div>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '28px', width: '440px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontWeight: 'bold', fontSize: '18px', margin: 0 }}>{editingBatch ? 'Edit Batch' : 'New Batch'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '13px' }}>Batch Name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Class 10 – Batch A"
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '13px' }}>Class</label>
                <select value={form.studyClass} onChange={e => setForm({ ...form, studyClass: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                  <option>Class 8</option>
                  <option>Class 9</option>
                  <option>Class 10</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '13px' }}>Capacity</label>
                <input type="number" value={form.capacity} onChange={e => setForm({ ...form, capacity: +e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '22px' }}>
              <button onClick={() => setShowModal(false)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
              <button onClick={handleSave} className="btn btn-primary" style={{ flex: 2 }} disabled={saving}>
                {saving ? 'Saving...' : (editingBatch ? 'Save Changes' : 'Create Batch')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBatchManagement;
