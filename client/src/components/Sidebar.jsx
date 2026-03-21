import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Video, 
  PlaySquare, 
  ClipboardList, 
  Award,
  CalendarDays,
  FileQuestion
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const getLinkClass = (path) => {
    return `nav-item ${location.pathname.includes(path) ? 'active' : ''}`;
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <Link to="/student/dashboard" className="sidebar-logo">
        <div className="sidebar-logo-icon">🎓</div>
        <span className="sidebar-logo-text">Base<span>Learn</span></span>
      </Link>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <span className="sidebar-section-label">Main Menu</span>

        <Link to="/student/dashboard" className={getLinkClass('/dashboard')}>
          <LayoutDashboard className="nav-item-icon" />
          Dashboard
        </Link>
        <Link to="/student/live-classes" className={getLinkClass('/live')}>
          <Video className="nav-item-icon" />
          Live Classes
          <span className="nav-badge">2</span>
        </Link>
        <Link to="/student/recorded-classes" className={getLinkClass('/recorded')}>
          <PlaySquare className="nav-item-icon" />
          My Class
        </Link>
        <Link to="/student/calendar" className={getLinkClass('/calendar')}>
          <CalendarDays className="nav-item-icon" />
          My Calendar
        </Link>

        <span className="sidebar-section-label" style={{ marginTop: 16 }}>Academics</span>

        <Link to="/student/assignments" className={getLinkClass('/assignments')}>
          <ClipboardList className="nav-item-icon" />
          Assignments
          <span className="nav-badge" style={{ backgroundColor: 'var(--color-error)' }}>1</span>
        </Link>
        <Link to="/student/tests" className={getLinkClass('/tests')}>
          <FileQuestion className="nav-item-icon" />
          Tests & Quizzes
        </Link>
        <Link to="/student/progression" className={getLinkClass('/progression')}>
          <Award className="nav-item-icon" />
          Progression
        </Link>
      </nav>

      {/* User info at bottom */}
      <Link to="/student/profile" style={{ textDecoration: 'none' }}>
        <div className="sidebar-user" style={{ cursor: 'pointer', transition: 'background 0.2s', '&:hover': { background: 'rgba(0,0,0,0.05)' } }}>
          <img 
            src={user?.profilePhoto || `https://ui-avatars.com/api/?name=${user?.name || "Student"}`} 
            className="sidebar-avatar" 
            alt="User Avatar" 
          />
          <div className="sidebar-user-info">
            <div className="sidebar-user-name" style={{ color: 'var(--color-text-primary)' }}>{user?.name || "Student User"}</div>
            <div className="sidebar-user-role" style={{ color: 'var(--color-text-secondary)' }}>Student</div>
          </div>
        </div>
      </Link>
    </aside>
  );
};

export default Sidebar;
