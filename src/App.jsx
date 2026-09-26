import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboard from './pages/AdminDashboard';
import RequestModal from './components/RequestModal';

// 1. Define your authorized admin emails here
const ADMIN_EMAILS = [
  'admin@epoteck.com',
  'sriragavsurya@gmail.com' // Replace with your actual admin email addresses
];

// 2. Updated Route Guard with Role Checking
const ProtectedRoute = ({ user, children, requireAdmin = false }) => {
  if (!user) {
    // Not logged in -> Redirect to auth portal
    return <Navigate to="/auth" replace />;
  }

  // If this route requires admin access, verify the user's email
  if (requireAdmin) {
    const userEmail = user.email?.toLowerCase(); // Ensure case-insensitive matching
    if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
      // Logged in, but NOT an admin -> Redirect to client dashboard
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('epotech_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on route navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('epotech_user');
    setUser(null);
  };

  const handleRequestCreated = () => {
    window.dispatchEvent(new CustomEvent('epotech:request_created'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-cyber-bg text-cyber-text selection:bg-cyber-cyan selection:text-black">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onRequestModalOpen={() => setIsRequestModalOpen(true)} />} />
          <Route path="/services" element={<ServicesPage onRequestModalOpen={() => setIsRequestModalOpen(true)} />} />

          <Route
            path="/auth"
            element={user ? <Navigate to="/dashboard" replace /> : <AuthPage onAuthSuccess={(userData) => setUser(userData)} />}
          />

          {/* Client Portal: Only requires login */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <DashboardPage user={user} onRequestModalOpen={() => setIsRequestModalOpen(true)} />
              </ProtectedRoute>
            }
          />

          {/* Command Center: Requires login AND Admin Email */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute user={user} requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <RequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onRequestCreated={handleRequestCreated}
      />
      <Footer />
    </div>
  );
}