import { Outlet } from 'react-router-dom';
import FacultySidebar from '../../components/FacultySidebar';
import Navbar from '../../components/Navbar';

const FacultyLayout = () => {
  return (
    <div className="app-layout">
      <FacultySidebar />
      <div className="main-content">
        <Navbar />
        <main className="page-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default FacultyLayout;
