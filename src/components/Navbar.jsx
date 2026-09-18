import React, { useState } from 'react';
import { Shield, Lock, LayoutDashboard, Terminal, Menu, X, ArrowRight, UserCheck } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Shield },
    { id: 'services', label: 'Services & Security', icon: Terminal },
    { id: 'dashboard', label: 'Client Dashboard', icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-cyber-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-cyan to-cyber-blue p-[1px] shadow-cyber-cyan transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-cyber-bg rounded-[11px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyber-cyan glow-cyan-sm" />
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-wider text-white">EPOTECH</span>
              <span className="block text-[10px] font-mono tracking-widest text-cyber-cyan uppercase font-semibold">Cybersecurity & Web</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-cyber-bg/60 p-1.5 rounded-xl border border-cyber-border/40">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-cyber-card text-cyber-cyan border border-cyber-cyan/30 shadow-cyber-cyan/20 shadow-md' 
                      : 'text-cyber-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyber-cyan' : ''}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Auth Button */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-pulse"></span>
              <span>SYSTEM ONLINE</span>
            </div>

            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-cyber-card border border-cyber-border text-xs text-cyber-text font-mono">
                  <UserCheck className="w-4 h-4 text-cyber-cyan" />
                  <span className="truncate max-w-[120px]">{user.email || 'Client Portal'}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="px-3.5 py-1.5 rounded-lg border border-cyber-border text-xs text-cyber-muted hover:text-white hover:bg-white/5 transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab('auth')}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-blue text-black font-semibold text-sm hover:opacity-95 transition-all shadow-cyber-cyan hover:shadow-lg"
              >
                <Lock className="w-4 h-4 text-black" />
                <span>Client Access</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-cyber-card border border-cyber-border text-cyber-text hover:text-cyber-cyan"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 bg-cyber-card/95 border-b border-cyber-border space-y-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive ? 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30' : 'text-cyber-muted'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{link.label}</span>
              </button>
            );
          })}
          
          <div className="pt-3 border-t border-cyber-border flex flex-col space-y-2">
            {user ? (
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-lg border border-cyber-border text-sm text-cyber-muted"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => {
                  setActiveTab('auth');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-lg bg-cyber-cyan text-black font-semibold text-sm"
              >
                Client Portal Access
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
