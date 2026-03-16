import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Public Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import LoginPage from './pages/LoginPage';
import UnauthorizedPage from './pages/UnauthorizedPage';

// Portals & Layouts
import ProtectedRoute from './components/ProtectedRoute';
import StudentLayout from './components/StudentLayout';

// Student Pages
import DashboardHome from './pages/student/DashboardHome';
import OnboardingFlow from './pages/student/OnboardingFlow';
import MyCourses from './pages/student/MyCourses';
import CourseCatalog from './pages/student/CourseCatalog';
import CourseDetail from './pages/student/CourseDetail';

// Other Portals
import AdminDashboard from './pages/admin/AdminDashboard';
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import FacultyDashboard from './pages/faculty/FacultyDashboard';

// Scaffold placeholder for unbuilt pages
const PlaceholderPage = ({ title }) => (
  <div className="flex items-center justify-center h-full p-8 text-center bg-white rounded-lg shadow-sm border">
    <div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-500">This feature is currently under active development.</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* ── Public Routes ───────────────────────────────── */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* ── Auth Routes ─────────────────────────────────── */}
        {/* Student auth (standalone page) */}
        <Route path="/student/login" element={<AuthPage />} />
        <Route path="/student/register" element={<AuthPage />} />

        {/* Unified login for admin / instructor / faculty */}
        {/* Usage: /login?role=admin  /login?role=instructor  /login?role=faculty */}
        <Route path="/login" element={<LoginPage />} />

        {/* ── Protected: Onboarding (students only) ───────── */}
        <Route path="/student/onboarding" element={
          <ProtectedRoute allowedRoles={['student']}>
            <OnboardingFlow />
          </ProtectedRoute>
        } />

        {/* ── Protected: Student Portal (nested layout) ────── */}
        <Route path="/student" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardHome />} />
          <Route path="courses" element={<MyCourses />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="catalog" element={<CourseCatalog />} />
          <Route path="progress" element={<PlaceholderPage title="My Progress" />} />
          <Route path="schedule" element={<PlaceholderPage title="Schedule" />} />
          <Route path="messages" element={<PlaceholderPage title="Messages" />} />
        </Route>

        {/* ── Protected: Admin Portal ─────────────────────── */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        {/* ── Protected: Instructor Portal ─────────────────── */}
        <Route path="/instructor" element={
          <ProtectedRoute allowedRoles={['instructor']}>
            <InstructorDashboard />
          </ProtectedRoute>
        } />

        {/* ── Protected: Faculty Portal ─────────────────────── */}
        <Route path="/faculty" element={
          <ProtectedRoute allowedRoles={['faculty']}>
            <FacultyDashboard />
          </ProtectedRoute>
        } />

        {/* ── Catch-all ─────────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
