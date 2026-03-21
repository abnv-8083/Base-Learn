import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, LogOut, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const mockNotifications = [
    { id: 1, text: "System Update: Video Pipeline is Active.", time: "10m ago" },
    { id: 2, text: "Faculty member 'Dr. Smith' uploaded a new video.", time: "1h ago" }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Create breadcrumb from URL
  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentPage = pathParts[pathParts.length - 1] || 'dashboard';
  const formattedPage = currentPage.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <header className="topbar">
      <div className="topbar-left">
        <nav className="topbar-breadcrumb">
          <a href="/student/dashboard">Dashboard</a>
          {currentPage !== 'dashboard' && (
            <>
              <span className="separator">/</span>
              <span className="current">{formattedPage}</span>
            </>
          )}
        </nav>
      </div>

      <div className="topbar-right">
        {/* Search */}
        <div className="topbar-search">
          <Search className="topbar-search-icon" />
          <input type="text" placeholder="Search..." />
        </div>

        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button className="icon-btn" onClick={() => setShowNotifications(!showNotifications)}>
            <Bell size={18} />
            <span className="notification-dot"></span>
          </button>

          {showNotifications && (
            <div style={{ position: 'absolute', top: '120%', right: '0', background: 'white', width: '320px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid var(--color-border)', zIndex: 50, overflow: 'hidden' }}>
               <div style={{ padding: '16px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-bg)' }}>
                 <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Notifications</h3>
                 <span style={{ fontSize: '12px', color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 'bold' }}>Mark all read</span>
               </div>
               <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                 {mockNotifications.map(n => (
                   <div key={n.id} style={{ padding: '16px', borderBottom: '1px solid var(--color-border)', display: 'flex', gap: '12px', alignItems: 'flex-start', cursor: 'pointer', transition: 'background 0.2s' }} className="nav-item">
                     <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                       <MessageSquare size={16} />
                     </div>
                     <div>
                       <div style={{ fontSize: '13px', color: 'var(--color-text-primary)', lineHeight: '1.4', marginBottom: '4px' }}>{n.text}</div>
                       <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{n.time}</div>
                     </div>
                   </div>
                 ))}
               </div>
               <div style={{ padding: '12px', textAlign: 'center', borderTop: '1px solid var(--color-border)', fontSize: '13px', color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 'bold' }}>
                 View All Activity
               </div>
            </div>
          )}
        </div>

        {/* User Actions */}
        <div style={{ marginLeft: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>
            {user?.name?.charAt(0) || 'U'}
          </div>
          <button onClick={handleLogout} className="icon-btn" title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
