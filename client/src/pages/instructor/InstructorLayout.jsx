import { Outlet } from 'react-router-dom';
import InstructorSidebar from '../../components/InstructorSidebar';
import Navbar from '../../components/Navbar';

const InstructorLayout = () => {
  return (
    <div className="app-layout">
      <InstructorSidebar />
      <div className="main-content">
        <Navbar />
        <main className="page-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default InstructorLayout;
