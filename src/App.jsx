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
    // Dispatch custom event to notify active views to refresh
    window.dispatchEvent(new CustomEvent('epotech:request_created'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-cyber-bg text-cyber-text selection:bg-cyber-cyan selection:text-black">
      {/* Top Navbar */}
      <Navbar
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Routed Content */}
      <main className="flex-1">
        <Routes>
          {/* Landing Page: Main marketing hero section */}
          <Route
            path="/"
            element={<HomePage onRequestModalOpen={() => setIsRequestModalOpen(true)} />}
          />

          {/* Services Matrix */}
          <Route
            path="/services"
            element={<ServicesPage onRequestModalOpen={() => setIsRequestModalOpen(true)} />}
          />

          {/* Client Portal: Diagnostic telemetry, security grade A+, new service scope */}
          <Route
            path="/dashboard"
            element={
              <DashboardPage
                user={user}
                onRequestModalOpen={() => setIsRequestModalOpen(true)}
              />
            }
          />

          {/* Command Center: View global requests, run row-level scans, manage audit targets */}
          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          {/* Authentication Portal */}
          <Route
            path="/auth"
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <AuthPage onAuthSuccess={(userData) => setUser(userData)} />
              )
            }
          />

          {/* Wildcard Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Request Modal */}
      <RequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onRequestCreated={handleRequestCreated}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}