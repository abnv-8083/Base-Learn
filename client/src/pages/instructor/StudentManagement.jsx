import { Search, FileText, Edit2, Trash2, Ban, CheckCircle, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import instructorService from '../../services/instructorService';
import ConfirmModal from '../../components/ConfirmModal';

const StudentManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Detailed Analysis State
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [detailedAnalysis, setDetailedAnalysis] = useState(null);
    const [newNote, setNewNote] = useState('');

    // Edit Modal State
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);

    // Delete Modal State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const data = await instructorService.getStudents();
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewAnalysis = async (student) => {
        setSelectedStudent(student);
        setDetailedAnalysis(null);
        try {
            const data = await instructorService.getStudentAnalysis(student._id);
            setDetailedAnalysis(data);
        } catch (error) {
            console.error('Error fetching analysis', error);
        }
    };

    const handleAddNote = async () => {
        if (!newNote.trim() || !selectedStudent) return;
        try {
            await instructorService.addStudentNote(selectedStudent._id, newNote);
            setNewNote('');
            alert('Note added successfully');
            handleViewAnalysis(selectedStudent);
        } catch (error) {
            alert('Failed to add note');
        }
    };

    const handleToggleStatus = async (e, id) => {
        e.stopPropagation();
        try {
            const res = await instructorService.toggleStudentStatus(id);
            setStudents(prev => prev.map(s => s._id === id ? { ...s, isActive: res.isActive } : s));
        } catch (error) {
            alert('Error toggling status');
        }
    };

    const promptDeleteStudent = (e, id) => {
        e.stopPropagation();
        setStudentToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDeleteStudent = async () => {
        if (!studentToDelete) return;
        try {
            await instructorService.deleteStudent(studentToDelete);
            setStudents(prev => prev.filter(s => s._id !== studentToDelete));
            setShowDeleteModal(false);
            setStudentToDelete(null);
        } catch (error) {
            alert('Error deleting student');
        }
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        try {
            const updated = await instructorService.updateStudent(editingStudent._id, editingStudent);
            setStudents(prev => prev.map(s => s._id === updated._id ? updated : s));
            setShowEditModal(false);
        } catch (error) {
            alert('Error updating student');
        }
    };

    const filtered = students.filter(s => 
        (s.name && s.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (s.email && s.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div style={{ paddingBottom: '40px' }}>
            <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
                <div className="page-header-inner" style={{ alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <div>
                        <h1 className="page-title">Student Management</h1>
                        <p className="page-subtitle">Manage student accounts, active status, and track performance.</p>
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '0 12px', minWidth: '300px' }}>
                            <Search size={18} color="var(--color-text-secondary)" />
                            <input 
                                type="text" 
                                placeholder="Search student name or email..." 
                                className="input" 
                                style={{ border: 'none', background: 'transparent', flex: 1 }}
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {selectedStudent ? (
                /* Analysis View */
                <div className="card" style={{ padding: 'var(--space-6)' }}>
                    <button className="btn btn-ghost" onClick={() => setSelectedStudent(null)} style={{ marginBottom: 'var(--space-4)' }}>
                        &larr; Back to Management
                    </button>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {selectedStudent.name}
                                {!selectedStudent.isActive && <span style={{ fontSize: '12px', padding: '2px 8px', background: '#FEE2E2', color: '#DC2626', borderRadius: '12px' }}>Blocked</span>}
                            </h2>
                            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>{selectedStudent.email}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn btn-ghost" onClick={() => { setEditingStudent(selectedStudent); setShowEditModal(true); }}>
                                <Edit2 size={16} /> Edit Profile
                            </button>
                        </div>
                    </div>
                    
                    {!detailedAnalysis ? (
                        <div className="spinner" style={{ margin: '20px auto' }}></div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-4)', background: 'var(--color-bg)', padding: 'var(--space-4)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                                <div>
                                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}><FileText size={12}/> Assignments</div>
                                    <div style={{ fontSize: 'var(--text-xl)', fontWeight: '800' }}>{detailedAnalysis.assignments?.length || 0} Total</div>
                                </div>
                            </div>
                            
                            <div>
                                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', marginBottom: 'var(--space-4)' }}>Instructor Notes</h3>
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                                    <input type="text" className="input" style={{ flex: 1 }} placeholder="Add a new note..." value={newNote} onChange={e => setNewNote(e.target.value)} />
                                    <button className="btn btn-primary" onClick={handleAddNote}>Add Note</button>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {detailedAnalysis.student.instructorNotes && detailedAnalysis.student.instructorNotes.length > 0 ? 
                                        detailedAnalysis.student.instructorNotes.map((note, idx) => (
                                            <div key={idx} style={{ padding: '12px', background: 'var(--color-bg)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                                                <div style={{ fontSize: 'var(--text-sm)', marginBottom: '4px' }}>{note.note}</div>
                                                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>{new Date(note.date).toLocaleString()}</div>
                                            </div>
                                        )) : <div style={{ color: 'var(--color-text-secondary)' }}>No notes added yet.</div>
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                /* Management List View */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {loading ? (
                        <div className="spinner" style={{ margin: '40px auto' }}></div>
                    ) : filtered.length === 0 ? (
                        <div style={{ padding: 'var(--space-6)', textAlign: 'center', background: 'white', borderRadius: '12px', border: '1px dashed var(--color-border)' }}>
                            No students found matching your search.
                        </div>
                    ) : (
                        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}>
                                        <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: 'var(--color-text-secondary)' }}>Student Name / Email</th>
                                        <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: 'var(--color-text-secondary)' }}>School / Class</th>
                                        <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: 'var(--color-text-secondary)' }}>Status</th>
                                        <th style={{ padding: '16px 24px', textAlign: 'right', fontSize: '13px', fontWeight: '600', color: 'var(--color-text-secondary)' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((student, idx) => (
                                        <tr key={student._id} style={{ borderBottom: idx !== filtered.length - 1 ? '1px solid var(--color-border)' : 'none', opacity: student.isActive ? 1 : 0.6, transition: '0.2s' }}>
                                            <td style={{ padding: '16px 24px' }}>
                                                <div style={{ fontWeight: '600', fontSize: '15px', color: 'var(--color-text-primary)' }}>{student.name}</div>
                                                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>{student.email}</div>
                                                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{student.phone}</div>
                                            </td>
                                            <td style={{ padding: '16px 24px' }}>
                                                <div style={{ fontSize: '14px', color: 'var(--color-text-primary)' }}>{student.school || '-'}</div>
                                                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>{student.studentClass || '-'}</div>
                                            </td>
                                            <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                                                {student.isActive ? (
                                                    <span style={{ background: '#D1FAE5', color: '#059669', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                       <CheckCircle size={12} /> Active
                                                    </span>
                                                ) : (
                                                    <span style={{ background: '#FEE2E2', color: '#DC2626', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                       <Ban size={12} /> Blocked
                                                    </span>
                                                )}
                                            </td>
                                            <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); handleViewAnalysis(student); }}
                                                        style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: 'var(--color-primary)' }}
                                                        title="View Analysis"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); setEditingStudent(student); setShowEditModal(true); }}
                                                        style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: 'var(--color-text-primary)' }}
                                                        title="Edit Student"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={(e) => handleToggleStatus(e, student._id)}
                                                        style={{ background: student.isActive ? '#FEF3C7' : '#D1FAE5', border: `1px solid ${student.isActive ? '#F59E0B' : '#059669'}`, padding: '6px', borderRadius: '6px', cursor: 'pointer', color: student.isActive ? '#D97706' : '#059669' }}
                                                        title={student.isActive ? "Block Network Access" : "Unblock Access"}
                                                    >
                                                        {student.isActive ? <Ban size={16} /> : <CheckCircle size={16} />}
                                                    </button>
                                                    <button 
                                                        onClick={(e) => promptDeleteStudent(e, student._id)}
                                                        style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#DC2626' }}
                                                        title="Permanently Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* Edit Profile Modal */}
            {showEditModal && editingStudent && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
                    <div className="modal-content" style={{ background: 'white', padding: '32px', borderRadius: '20px', width: '90%', maxWidth: '500px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                        <h2 style={{ margin: '0 0 24px 0', fontSize: '24px' }}>Edit Student Profile</h2>
                        <form onSubmit={handleSaveEdit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600' }}>Full Name</label>
                                    <input type="text" value={editingStudent.name || ''} onChange={e => setEditingStudent({...editingStudent, name: e.target.value})} required style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '14px' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600' }}>Email Address</label>
                                    <input type="email" value={editingStudent.email || ''} onChange={e => setEditingStudent({...editingStudent, email: e.target.value})} required style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '14px' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600' }}>Phone Number</label>
                                    <input type="text" value={editingStudent.phone || ''} onChange={e => setEditingStudent({...editingStudent, phone: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '14px' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600' }}>School Name</label>
                                    <input type="text" value={editingStudent.school || ''} onChange={e => setEditingStudent({...editingStudent, school: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '14px' }} />
                                </div>
                            </div>
                            
                            <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '24px 0' }} />
                            
                            <h3 style={{ fontSize: '14px', margin: '0 0 16px 0', color: 'var(--color-text-secondary)' }}>Guardian Details</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600' }}>Parent/Guardian Name</label>
                                    <input type="text" value={editingStudent.parentName || ''} onChange={e => setEditingStudent({...editingStudent, parentName: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '14px' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600' }}>Parent/Guardian Phone</label>
                                    <input type="text" value={editingStudent.parentPhone || ''} onChange={e => setEditingStudent({...editingStudent, parentPhone: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '14px' }} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button type="button" onClick={() => setShowEditModal(false)} style={{ flex: 1, padding: '12px', background: 'var(--color-bg)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Cancel</button>
                                <button type="submit" style={{ flex: 1, padding: '12px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Confirm Delete Modal */}
            <ConfirmModal 
                isOpen={showDeleteModal}
                title="Permanently Delete Student?"
                message="Are you sure you want to permanently delete this student? This action cannot be undone, and the student will be permanently removed from all Batches."
                confirmText="Yes, Delete Student"
                confirmStyle="danger"
                onConfirm={confirmDeleteStudent}
                onCancel={() => { setShowDeleteModal(false); setStudentToDelete(null); }}
            />
        </div>
    );
};

export default StudentManagement;
