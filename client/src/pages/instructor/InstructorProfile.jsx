import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, MapPin, Camera, Save } from 'lucide-react';
import axios from 'axios'; // We can add standard user update logic later, right now simulating view.

const InstructorProfile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    district: '',
    about: 'Dedicated instructor with a passion for teaching.'
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        district: user.district || '',
        about: user.about || 'Dedicated instructor with a passion for teaching.'
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsEditing(false);
      alert("Profile updated successfully (simulated)!");
    }, 500);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '60px' }}>
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 className="page-title">Instructor Profile</h1>
          <p className="page-subtitle">Manage your personal details and contact information.</p>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        {/* Cover Photo Area */}
        <div style={{ height: '120px', background: 'linear-gradient(135deg, var(--color-primary) 0%, #4338ca 100%)', position: 'relative' }}></div>
        
        {/* Avatar & Basic Info */}
        <div style={{ padding: '0 32px 32px 32px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '-40px', marginBottom: '24px' }}>
             <div style={{ position: 'relative' }}>
               <img src={user?.profilePhoto || `https://ui-avatars.com/api/?name=${user?.name || "Instructor"}&size=150`} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%', border: '4px solid white', background: 'white', objectFit: 'cover' }} />
               {isEditing && (
                 <button style={{ position: 'absolute', bottom: '0', right: '0', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                   <Camera size={16} />
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

          <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
             <div style={{ gridColumn: '1 / -1' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 8px 0' }}>{user?.name || 'Instructor'}</h2>
                <div style={{ color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '14px', marginBottom: '8px' }}>Senior Faculty</div>
                {!isEditing ? (
                   <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6', fontSize: '15px' }}>{profileData.about}</p>
                ) : (
                   <textarea name="about" value={profileData.about} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', resize: 'vertical', minHeight: '80px', fontSize: '14px' }}></textarea>
                )}
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-text-secondary)' }}>Full Name</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: isEditing ? 'white' : 'var(--color-bg)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                   <User size={18} color="var(--color-primary)" />
                   {!isEditing ? <span>{profileData.name}</span> : <input type="text" name="name" value={profileData.name} onChange={handleChange} style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%' }} />}
                </div>
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-text-secondary)' }}>Email Address</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: isEditing ? 'white' : 'var(--color-bg)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                   <Mail size={18} color="var(--color-primary)" />
                   {!isEditing ? <span>{profileData.email}</span> : <input type="email" name="email" value={profileData.email} onChange={handleChange} style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%' }} />}
                </div>
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-text-secondary)' }}>Phone Number</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: isEditing ? 'white' : 'var(--color-bg)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                   <Phone size={18} color="var(--color-primary)" />
                   {!isEditing ? <span>{profileData.phone || 'Not provided'}</span> : <input type="text" name="phone" value={profileData.phone} onChange={handleChange} placeholder="+91..." style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%' }} />}
                </div>
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-text-secondary)' }}>Location / District</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: isEditing ? 'white' : 'var(--color-bg)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                   <MapPin size={18} color="var(--color-primary)" />
                   {!isEditing ? <span>{profileData.district || 'Not provided'}</span> : <input type="text" name="district" value={profileData.district} onChange={handleChange} placeholder="e.g. Kozhikode" style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%' }} />}
                </div>
             </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;
