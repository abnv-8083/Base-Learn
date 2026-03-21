import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Video, 
  UploadCloud, 
  Activity,
  User
} from 'lucide-react';

const FacultySidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const getLinkClass = (path) => {
    return `nav-item ${location.pathname.includes(path) ? 'active' : ''}`;
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <Link to="/faculty/dashboard" className="sidebar-logo">
        <div className="sidebar-logo-icon">🎓</div>
        <span className="sidebar-logo-text">Base<span>Learn</span></span>
      </Link>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <span className="sidebar-section-label">Faculty Portal</span>

        <Link to="/faculty/dashboard" className={getLinkClass('/dashboard')}>
          <LayoutDashboard className="nav-item-icon" />
          Overview
        </Link>
        <Link to="/faculty/live-classes" className={getLinkClass('/live-classes')}>
          <Video className="nav-item-icon" />
          Live Sessions
          <span className="nav-badge" style={{ backgroundColor: 'var(--color-error)' }}>1</span>
        </Link>
        <Link to="/faculty/content" className={getLinkClass('/content')}>
          <UploadCloud className="nav-item-icon" />
          Upload Content
        </Link>
        <Link to="/faculty/students" className={getLinkClass('/students')}>
          <Activity className="nav-item-icon" />
          Student Metrics
        </Link>
        <Link to="/faculty/profile" className={getLinkClass('/profile')}>
          <User className="nav-item-icon" />
          My Profile
        </Link>
      </nav>

      {/* User info at bottom */}
      <Link to="/faculty/profile" style={{ textDecoration: 'none' }} className="sidebar-user">
        <img 
          src={user?.profilePhoto || `https://ui-avatars.com/api/?name=${user?.name || "Faculty"}`} 
          className="sidebar-avatar" 
          alt="User Avatar" 
        />
        <div className="sidebar-user-info">
          <div className="sidebar-user-name" style={{ color: 'var(--color-text-primary)' }}>{user?.name || "Faculty Member"}</div>
          <div className="sidebar-user-role" style={{ color: 'var(--color-success)' }}>Faculty Staff</div>
        </div>
      </Link>
    </aside>
  );
};

export default FacultySidebar;
