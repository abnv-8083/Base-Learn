import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import studentService from '../../services/studentService';
import { UserCircle, Mail, Phone, MapPin, BookOpen, Users, LogOut, CheckCircle } from 'lucide-react';

const StudentProfile = () => {
  const { user, defaultLogin } = useAuth(); // using user directly from context
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    school: '',
    studentClass: '',
    parentName: '',
    parentPhone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        school: user.school || '',
        studentClass: user.studentClass || '',
        parentName: user.parentName || '',
        parentPhone: user.parentPhone || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await studentService.updateProfile(formData);
      if (res.success) {
        setSuccessMsg('Profile updated successfully!');
        // Ideally update local context here if necessary, but for now we rely on next reload or manual context refresh
      } else {
        setErrorMsg('Failed to update profile.');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'An error occurred while saving.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-inner">
          <div>
            <h1 className="page-title">My Profile</h1>
            <p className="page-subtitle">Manage your personal details and academic settings.</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px', marginTop: '32px' }}>
        
        {/* Left Pane - Profile Card (View Only) */}
        <div className="card" style={{ alignSelf: 'start', position: 'sticky', top: '24px' }}>
          <div className="card-body" style={{ textAlign: 'center', padding: '40px 24px' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 20px', borderRadius: '50%', overflow: 'hidden', border: '4px solid var(--color-primary-light)' }}>
              <img 
                src={user?.profilePhoto || `https://ui-avatars.com/api/?name=${user?.name || 'Student'}&background=random`} 
                alt="Profile" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--color-primary-dark)' }}>{user?.name || 'Student'}</h2>
            <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--color-primary)', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', marginBottom: '24px' }}>
              Student
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', marginTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-text-secondary)', fontSize: '15px' }}>
                <Mail size={18} />
                <span>{user?.email || 'N/A'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-text-secondary)', fontSize: '15px' }}>
                <Phone size={18} />
                <span>{user?.phone || 'Not provided'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-text-secondary)', fontSize: '15px' }}>
                <MapPin size={18} />
                <span>{user?.school || 'Not assigned'}</span>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '24px 0' }} />

            <div style={{ textAlign: 'left' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--color-text-primary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Enrollment Details</h4>
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Study Class</div>
                <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-primary-dark)', marginBottom: '12px' }}>{user?.studyClassName || 'Pending Assignment'}</div>
                
                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Active Batch</div>
                <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-primary-dark)' }}>{user?.batchName || 'Pending Assignment'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane - Forms */}
        <div className="card">
          <div className="card-header" style={{ padding: '24px' }}>
            <h3 className="card-title" style={{ fontSize: '20px' }}>Edit Information</h3>
          </div>
          
          <div className="card-body" style={{ padding: '24px' }}>
            {successMsg && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#DCFCE7', color: '#166534', padding: '16px', borderRadius: '12px', marginBottom: '24px', fontWeight: '500' }}>
                <CheckCircle size={20} />
                {successMsg}
              </div>
            )}
            
            {errorMsg && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#FEE2E2', color: '#DC2626', padding: '16px', borderRadius: '12px', marginBottom: '24px', fontWeight: '500' }}>
                <LogOut size={20} />
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              
              {/* Personal Details */}
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--color-text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <UserCircle size={18} color="var(--color-primary)" />
                  Personal Details
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: '#F8FAFC' }} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Phone Number</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="form-input" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: '#F8FAFC' }} />
                  </div>
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)' }} />

              {/* Academic Details */}
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--color-text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen size={18} color="var(--color-primary)" />
                  Academic Details
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>School Name</label>
                    <input type="text" name="school" value={formData.school} onChange={handleChange} className="form-input" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: '#F8FAFC' }} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Current Grade/Class</label>
                    <input type="text" name="studentClass" value={formData.studentClass} onChange={handleChange} className="form-input" placeholder="e.g. 10th Grade" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: '#F8FAFC' }} />
                  </div>
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)' }} />

              {/* Guardian Details */}
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--color-text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={18} color="var(--color-primary)" />
                  Parent / Guardian Details
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Guardian Name</label>
                    <input type="text" name="parentName" value={formData.parentName} onChange={handleChange} className="form-input" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: '#F8FAFC' }} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Guardian Contact</label>
                    <input type="text" name="parentPhone" value={formData.parentPhone} onChange={handleChange} className="form-input" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: '#F8FAFC' }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ padding: '12px 32px', fontSize: '16px' }}>
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentProfile;
