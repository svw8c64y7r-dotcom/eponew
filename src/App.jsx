import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import RequestModal from './components/RequestModal';

// 1. Import your new Admin Dashboard
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  // 2. Check the URL on initial load to see if we should open the admin panel
  const initialTab = window.location.pathname === '/admin' ? 'admin' : 'home';

  const [activeTab, setActiveTab] = useState(initialTab); // home, services, auth, dashboard, admin
  const [user, setUser] = useState(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // Update the URL bar silently when tabs change so refresh works
  useEffect(() => {
    if (activeTab === 'admin') {
      window.history.pushState({}, '', '/admin');
    } else if (window.location.pathname === '/admin') {
      window.history.pushState({}, '', '/');
    }
  }, [activeTab]);

  const handleLogout = () => {
    setUser(null);
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-cyber-bg text-cyber-text selection:bg-cyber-cyan selection:text-black">

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={setActiveTab}
            onRequestModalOpen={() => setIsRequestModalOpen(true)}
          />
        )}

        {activeTab === 'services' && (
          <ServicesPage
            setActiveTab={setActiveTab}
            onRequestModalOpen={() => setIsRequestModalOpen(true)}
          />
        )}

        {activeTab === 'auth' && (
          <AuthPage
            onAuthSuccess={(userData) => setUser(userData)}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardPage
            user={user}
            onRequestModalOpen={() => setIsRequestModalOpen(true)}
          />
        )}

        {/* 3. Add the Admin Dashboard view condition */}
        {activeTab === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Global Request Modal */}
      <RequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onRequestCreated={() => {
          if (activeTab === 'dashboard') {
            window.location.reload();
          }
        }}
      />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}