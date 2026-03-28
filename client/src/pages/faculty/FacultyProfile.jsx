import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, MapPin, Camera, Save, BookOpen, Shield, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';

const FacultyProfile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    district: '',
    specialization: '',
    about: 'Passionate educator dedicated to shaping the next generation of learners.'
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        district: user.district || '',
        specialization: user.specialization || '',
        about: user.about || 'Passionate educator dedicated to shaping the next generation of learners.'
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setIsEditing(false);
    }, 300);
  };

  const handleRequest = async (type, newValue = null) => {
    try {
      const res = await axios.post('/api/faculty/profile/request-update', { type, newValue }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit request');
    }
  };

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');

  const fields = [
    { key: 'name', label: 'Full Name', icon: User, type: 'text', placeholder: 'Full name' },
    { key: 'email', label: 'Email Address', icon: Mail, type: 'email', placeholder: 'email@school.edu' },
    { key: 'phone', label: 'Phone Number', icon: Phone, type: 'text', placeholder: '+91 ...' },
    { key: 'district', label: 'Location / District', icon: MapPin, type: 'text', placeholder: 'e.g. Kozhikode' },
    { key: 'specialization', label: 'Subject Specialization', icon: BookOpen, type: 'text', placeholder: 'e.g. Physics, Mathematics' },
  ];

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', paddingBottom: '60px' }}>
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 className="page-title">My Profile</h1>
          <p className="page-subtitle">View and manage your personal and professional details.</p>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        {/* Cover */}
        <div style={{ height: '120px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', position: 'relative' }}></div>

        {/* Avatar & Header Row */}
        <div style={{ padding: '0 32px 32px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '-44px', marginBottom: '24px' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={user?.profilePhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Faculty')}&size=150&background=10b981&color=fff`}
                alt="Avatar"
                style={{ width: '100px', height: '100px', borderRadius: '50%', border: '4px solid white', objectFit: 'cover' }}
              />
              {isEditing && (
                <button style={{ position: 'absolute', bottom: '0', right: '0', background: '#10b981', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Camera size={15} />
                </button>
              )}
            </div>
            <div>
              {!isEditing ? (
                <button className="btn btn-outline" onClick={() => setIsEditing(true)}>Edit Profile</button>
              ) : (
                <button className="btn btn-primary" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Save size={16} /> Save Changes
                </button>
              )}
            </div>
          </div>

          <form onSubmit={handleSave}>
            {/* Bio section */}
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 'bold', margin: '0 0 4px 0' }}>{profileData.name || 'Faculty Member'}</h2>
              <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '14px', marginBottom: '10px' }}>Faculty Staff</div>
              {!isEditing ? (
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6', fontSize: '15px', maxWidth: '600px' }}>{profileData.about}</p>
              ) : (
                <textarea
                  name="about"
                  value={profileData.about}
                  onChange={handleChange}
                  rows={3}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', resize: 'vertical', fontSize: '14px', lineHeight: '1.6' }}
                />
              )}
            </div>

            {/* Fields grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {fields.map(field => {
                const Icon = field.icon;
                return (
                  <div key={field.key} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {field.label}
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 14px', borderRadius: '8px', border: '1px solid var(--color-border)', background: isEditing ? 'white' : 'var(--color-bg)' }}>
                      <Icon size={17} color="#10b981" style={{ flexShrink: 0 }} />
                      {!isEditing ? (
                        <span style={{ fontSize: '15px', color: profileData[field.key] ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}>
                          {profileData[field.key] || 'Not provided'}
                        </span>
                      ) : (
                        <input
                          type={field.type}
                          name={field.key}
                          value={profileData[field.key]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '15px' }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </form>

          {/* Security Section */}
          <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Shield size={20} color="var(--color-primary)" /> Security & Account Updates
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ padding: '20px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                    <Mail size={18} />
                  </div>
                  <div style={{ fontWeight: 'bold', fontSize: '15px' }}>Email Address</div>
                </div>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>To update your login email, you must submit a request for administrative approval.</p>
                <button className="btn btn-outline" style={{ width: '100%', fontSize: '13px', padding: '8px' }} onClick={() => setShowEmailModal(true)}>Request Email Change</button>
              </div>

              <div style={{ padding: '20px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f97316' }}>
                    <Lock size={18} />
                  </div>
                  <div style={{ fontWeight: 'bold', fontSize: '15px' }}>Account Password</div>
                </div>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>Request a password reset. A new temporary password will be sent to your email upon approval.</p>
                <button className="btn btn-outline" style={{ width: '100%', fontSize: '13px', padding: '8px' }} onClick={() => { if(window.confirm('Request a password reset from admin?')) handleRequest('password'); }}>Request Password Reset</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Update Modal */}
      {showEmailModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '28px', width: '400px' }}>
            <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>Request Email Update</h3>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>Enter the new email address you want to use for your account.</p>
            <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="new-email@example.com"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', marginBottom: '20px', fontSize: '14px' }} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowEmailModal(false)}>Cancel</button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { handleRequest('email', newEmail); setShowEmailModal(false); }}>Submit Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyProfile;
