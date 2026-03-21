import { useState, useEffect } from 'react';
import { Layers, Plus, Users, ArrowRightLeft, BookOpen, ChevronLeft, GraduationCap, Edit2, Trash2 } from 'lucide-react';
import instructorService from '../../services/instructorService';
import ConfirmModal from '../../components/ConfirmModal';

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Drill-down State
  const [currentView, setCurrentView] = useState('classes');
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);

  // Batch Modals
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [newBatch, setNewBatch] = useState({ name: '', studyClassId: '', capacity: 30 });

  const [showMoveModal, setShowMoveModal] = useState(false);
  const [moveData, setMoveData] = useState({ studentId: '', studentName: '', fromBatchId: '', toBatchId: '', classId: '' });

  const [showEditBatchModal, setShowEditBatchModal] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null);

  const [showDeleteBatchModal, setShowDeleteBatchModal] = useState(false);
  const [batchToDelete, setBatchToDelete] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [clsRes, bchRes] = await Promise.all([
        instructorService.getClasses(),
        instructorService.getBatches()
      ]);
      setClasses(clsRes);
      setBatches(bchRes);
    } catch (err) {
      setError('Failed to load class data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBatch = async (e) => {
    e.preventDefault();
    try {
      const created = await instructorService.createBatch(newBatch.name, newBatch.studyClassId, newBatch.capacity);
      setBatches([...batches, created]);
      setShowBatchModal(false);
      setNewBatch({ name: '', studyClassId: '', capacity: 30 });
    } catch (err) {
      alert('Error creating batch');
    }
  };

  const handleEditBatch = async (e) => {
    e.preventDefault();
    try {
      const updated = await instructorService.updateBatch(editingBatch._id, editingBatch.name, editingBatch.capacity);
      setBatches(prev => prev.map(b => b._id === updated._id ? updated : b));
      setShowEditBatchModal(false);
      if (selectedBatch && selectedBatch._id === updated._id) setSelectedBatch(updated);
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating batch');
    }
  };

  const promptDeleteBatch = (e, id) => {
    e.stopPropagation();
    setBatchToDelete(id);
    setShowDeleteBatchModal(true);
  };

  const confirmDeleteBatch = async () => {
    if (!batchToDelete) return;
    try {
      await instructorService.deleteBatch(batchToDelete);
      setBatches(prev => prev.filter(b => b._id !== batchToDelete));
      if (selectedBatch && selectedBatch._id === batchToDelete) { setSelectedBatch(null); setCurrentView('batches'); }
      setShowDeleteBatchModal(false);
      setBatchToDelete(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting batch');
    }
  };

  const handleMoveStudent = async (e) => {
    e.preventDefault();
    try {
      const { newBatch: updatedToBatch } = await instructorService.moveStudentBatch(moveData.studentId, moveData.fromBatchId, moveData.toBatchId);
      
      setBatches(prev => prev.map(b => {
        if (b._id === moveData.fromBatchId) {
          const newStudents = b.students.filter(s => s._id !== moveData.studentId);
          if (selectedBatch && selectedBatch._id === b._id) {
            setSelectedBatch({ ...b, students: newStudents });
          }
          return { ...b, students: newStudents };
        }
        if (b._id === updatedToBatch._id) {
          return updatedToBatch;
        }
        return b;
      }));

      setShowMoveModal(false);
    } catch (err) {
      alert('Error moving student');
    }
  };

  const openMoveModal = (student, fromBatchId, classId) => {
    setMoveData({ studentId: student._id, studentName: student.name, fromBatchId, toBatchId: '', classId });
    setShowMoveModal(true);
  };

  if (loading) return <div className="spinner" style={{ margin: 'auto', display: 'block', marginTop: '20vh' }}></div>;

  const renderClassesView = () => (
    <>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 className="page-title">Grade Levels</h1>
          <p className="page-subtitle">Select a standard grade level to manage its batches and students.</p>
        </div>
        {/* Removed New Class Button */}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {classes.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', background: 'white', borderRadius: '12px', border: '1px dashed #ccc', color: '#666' }}>
            System standard classes are not initialized. Please contact administrator.
          </div>
        ) : (
          classes.map(cls => {
            const classBatches = batches.filter(b => b.studyClass?._id === cls._id);
            const totalStudents = classBatches.reduce((acc, b) => acc + b.students.length, 0);

            return (
              <div 
                key={cls._id} 
                onClick={() => { setSelectedClass(cls); setCurrentView('batches'); }}
                style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid var(--color-border)', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', position: 'relative' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 4px 0', color: 'var(--color-text-primary)' }}>{cls.name}</h3>
                      <span style={{ fontSize: '12px', background: 'var(--color-bg)', padding: '4px 8px', borderRadius: '6px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>
                        {cls.targetGrade}
                      </span>
                    </div>
                  </div>
                  {/* Removed Edit/Delete Class native buttons */}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Batches</span>
                    <span style={{ fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}><Layers size={14} /> {classBatches.length}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Total Students</span>
                    <span style={{ fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={14} /> {totalStudents}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );

  const renderBatchesView = () => {
    const classBatches = batches.filter(b => b.studyClass?._id === selectedClass._id);
    
    return (
      <>
        <div style={{ marginBottom: '24px' }}>
          <button 
            onClick={() => { setSelectedClass(null); setCurrentView('classes'); }}
            style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', cursor: 'pointer', padding: '0', fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}
          >
            <ChevronLeft size={16} /> Back to Grades
          </button>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 className="page-title">{selectedClass.name}</h1>
              <p className="page-subtitle">Manage batches inside this grade division.</p>
            </div>
            <button className="btn btn-primary" onClick={() => { setNewBatch({ ...newBatch, studyClassId: selectedClass._id }); setShowBatchModal(true); }}>
              <Plus size={18} /> New Batch
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {classBatches.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', background: 'white', borderRadius: '12px', border: '1px dashed #ccc', color: '#666' }}>
              No batches found in {selectedClass.name}. Create one to start accepting students.
            </div>
          ) : (
            classBatches.map(batch => (
              <div 
                key={batch._id} 
                onClick={() => { setSelectedBatch(batch); setCurrentView('students'); }}
                style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid var(--color-border)', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1' }}>
                      <Layers size={20} />
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, color: 'var(--color-text-primary)' }}>{batch.name}</h3>
                  </div>
                  
                  {/* Actions Block for Batches */}
                  <div style={{ display: 'flex', gap: '8px' }} onClick={e => e.stopPropagation()}>
                    <button 
                      onClick={() => { setEditingBatch(batch); setShowEditBatchModal(true); }} 
                      style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', cursor: 'pointer', padding: '6px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      title="Edit Batch"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={(e) => promptDeleteBatch(e, batch._id)} 
                      style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#DC2626', cursor: 'pointer', padding: '6px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      title="Delete Batch"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div style={{ background: 'var(--color-bg)', borderRadius: '8px', padding: '12px', marginTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Capacity</span>
                    <span style={{ fontSize: '13px', fontWeight: 'bold' }}>{batch.students.length} / {batch.capacity || 30}</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: batch.students.length >= (batch.capacity || 30) ? '#ef4444' : '#6366f1', width: `${Math.min(100, (batch.students.length / (batch.capacity || 30)) * 100)}%`, borderRadius: '3px' }}></div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </>
    );
  };

  const renderStudentsView = () => {
    return (
      <>
        <div style={{ marginBottom: '24px' }}>
          <button 
            onClick={() => { setSelectedBatch(null); setCurrentView('batches'); }}
            style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', cursor: 'pointer', padding: '0', fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}
          >
            <ChevronLeft size={16} /> Back to Batches
          </button>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 className="page-title">{selectedBatch.name} Students</h1>
              <p className="page-subtitle">View and reassign students in this batch.</p>
            </div>
            <div style={{ background: 'white', padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', fontWeight: 'bold', fontSize: '14px' }}>
              {selectedBatch.students.length} / {selectedBatch.capacity || 30} Selected
            </div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
          {selectedBatch.students.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
              No students enrolled in this batch yet.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}>
                  <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: 'var(--color-text-secondary)' }}>Student Name</th>
                  <th style={{ padding: '16px 24px', textAlign: 'right', fontSize: '13px', fontWeight: '600', color: 'var(--color-text-secondary)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedBatch.students.map((student, idx) => (
                  <tr key={student._id} style={{ borderBottom: idx !== selectedBatch.students.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary-light), #e0e7ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                          <GraduationCap size={18} />
                        </div>
                        <span style={{ fontWeight: '500', fontSize: '15px' }}>{student.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <button 
                        onClick={() => openMoveModal(student, selectedBatch._id, selectedClass._id)}
                        style={{ background: 'none', border: '1px solid var(--color-border)', padding: '6px 16px', borderRadius: '8px', color: 'var(--color-text-primary)', cursor: 'pointer', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: '600', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-primary)'; }}
                      >
                        <ArrowRightLeft size={14} /> Reassign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </>
    );
  };

  return (
    <div style={{ paddingBottom: '40px' }}>
      {error && <div className="alert-error" style={{ background: '#FEE2E2', color: '#DC2626', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>{error}</div>}

      {currentView === 'classes' && renderClassesView()}
      {currentView === 'batches' && renderBatchesView()}
      {currentView === 'students' && renderStudentsView()}

      {/* Create Batch Modal */}
      {showBatchModal && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div className="modal-content" style={{ background: 'white', padding: '32px', borderRadius: '20px', width: '90%', maxWidth: '440px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: '0 0 24px 0', fontSize: '24px' }}>Create New Batch</h2>
            <form onSubmit={handleCreateBatch}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Batch Name</label>
                <input type="text" value={newBatch.name} onChange={e => setNewBatch({...newBatch, name: e.target.value})} placeholder="e.g. Batch A" required style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--color-border)', fontSize: '15px' }} />
              </div>
              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Capacity</label>
                <input type="number" value={newBatch.capacity} onChange={e => setNewBatch({...newBatch, capacity: e.target.value})} min="1" max="100" required style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--color-border)', fontSize: '15px' }} />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={() => setShowBatchModal(false)} style={{ flex: 1, padding: '14px', background: 'var(--color-bg)', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', color: 'var(--color-text-secondary)' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '14px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>Create Batch</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Batch Modal */}
      {showEditBatchModal && editingBatch && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div className="modal-content" style={{ background: 'white', padding: '32px', borderRadius: '20px', width: '90%', maxWidth: '440px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: '0 0 24px 0', fontSize: '24px' }}>Edit Batch</h2>
            <form onSubmit={handleEditBatch}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Batch Name</label>
                <input type="text" value={editingBatch.name} onChange={e => setEditingBatch({...editingBatch, name: e.target.value})} required style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--color-border)', fontSize: '15px' }} />
              </div>
              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Capacity</label>
                <input type="number" value={editingBatch.capacity} onChange={e => setEditingBatch({...editingBatch, capacity: e.target.value})} min="1" max="100" required style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--color-border)', fontSize: '15px' }} />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={() => setShowEditBatchModal(false)} style={{ flex: 1, padding: '14px', background: 'var(--color-bg)', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', color: 'var(--color-text-secondary)' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '14px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Move Student Modal */}
      {showMoveModal && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div className="modal-content" style={{ background: 'white', padding: '32px', borderRadius: '20px', width: '90%', maxWidth: '440px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>Reassign Student</h2>
            <p style={{ margin: '0 0 24px 0', fontSize: '15px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              Choose a new batch for <strong>{moveData.studentName}</strong> within {selectedClass?.name}.
            </p>
            <form onSubmit={handleMoveStudent}>
              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Destination Batch</label>
                <select value={moveData.toBatchId} onChange={e => setMoveData({...moveData, toBatchId: e.target.value})} required style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--color-border)', fontSize: '15px' }}>
                  <option value="" disabled>Select a batch...</option>
                  {batches.filter(b => b.studyClass?._id === moveData.classId && b._id !== moveData.fromBatchId).map(b => (
                    <option key={b._id} value={b._id}>{b.name} ({b.students.length} / {b.capacity || 30})</option>
                  ))}
                </select>
                {batches.filter(b => b.studyClass?._id === moveData.classId && b._id !== moveData.fromBatchId).length === 0 && (
                   <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '12px', borderRadius: '8px', marginTop: '12px', fontSize: '13px', fontWeight: '500' }}>
                     No other batches exist in this class. You must create one first.
                   </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={() => setShowMoveModal(false)} style={{ flex: 1, padding: '14px', background: 'var(--color-bg)', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', color: 'var(--color-text-secondary)' }}>Cancel</button>
                <button type="submit" disabled={!moveData.toBatchId} style={{ flex: 1, padding: '14px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', opacity: !moveData.toBatchId ? 0.5 : 1 }}>Confirm Move</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal 
        isOpen={showDeleteBatchModal}
        title="Delete Batch?"
        message="Are you sure you want to permanently delete this batch? All curriculum progress inside this batch will be disassociated."
        confirmText="Yes, Delete Batch"
        confirmStyle="danger"
        onConfirm={confirmDeleteBatch}
        onCancel={() => { setShowDeleteBatchModal(false); setBatchToDelete(null); }}
      />
    </div>
  );
};

export default ClassManagement;
