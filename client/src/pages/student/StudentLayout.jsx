import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const StudentLayout = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="page-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
