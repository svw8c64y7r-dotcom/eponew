import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import RequestModal from './components/RequestModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // home, services, auth, dashboard
  const [user, setUser] = useState(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

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
