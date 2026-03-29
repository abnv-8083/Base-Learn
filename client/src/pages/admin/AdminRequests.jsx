import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ShieldAlert, CheckCircle, XCircle } from 'lucide-react';

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get('/api/admin/profile-requests', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setRequests(res.data);
    } catch (err) {
      toast.error('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await axios.put(`/api/admin/profile-requests/${id}/${action}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success(`Request ${action}d successfully`);
      fetchRequests();
    } catch (err) {
      toast.error(`Failed to ${action} request`);
    }
  };

  return (
    <div style={{ paddingBottom: '60px' }}>
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 className="page-title">Profile Update Requests</h1>
          <p className="page-subtitle">Review and approve credential changes requested by Instructors and Faculty.</p>
        </div>
      </div>

      {loading ? (
        <div className="spinner" style={{ margin: '10vh auto', display: 'block' }}></div>
      ) : requests.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
          <ShieldAlert size={48} color="#94a3b8" style={{ marginBottom: '16px' }} />
          <h3 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>No Pending Requests</h3>
          <p style={{ color: '#64748b', margin: 0 }}>All instructor credential requests have been processed.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {requests.map(req => (
            <div key={req._id} style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ background: 'var(--color-primary)', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>{req.userModel}</span>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>{req.userId?.name || 'Unknown User'}</h3>
                  <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>({req.userId?.email})</span>
                </div>
                
                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'inline-block' }}>
                  <p style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Requested Change:</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '14px' }}>
                    <strong>New {req.type.charAt(0).toUpperCase() + req.type.slice(1)}:</strong> {req.type === 'password' ? '•••••••• (Hidden securely)' : req.newValue}
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => handleAction(req._id, 'reject')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'white', border: '1px solid #ef4444', color: '#ef4444', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                  <XCircle size={18} /> Reject
                </button>
                <button onClick={() => handleAction(req._id, 'approve')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#22c55e', border: 'none', color: 'white', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                  <CheckCircle size={18} /> Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminRequests;
