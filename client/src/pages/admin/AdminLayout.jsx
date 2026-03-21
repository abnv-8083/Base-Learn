import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import Navbar from '../../components/Navbar';

const AdminLayout = () => {
  return (
    <div className="app-layout">
      <AdminSidebar />
      <div className="main-content">
        <Navbar />
        <main className="page-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
