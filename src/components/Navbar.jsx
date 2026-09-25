import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Lock, LayoutDashboard, Terminal, Menu, X, ArrowRight, UserCheck, Cpu } from 'lucide-react';

export default function Navbar({ user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinks = [
    { path: '/', label: 'Home', icon: Shield },
    { path: '/services', label: 'Services & Security', icon: Terminal },
    { path: '/dashboard', label: 'Client Dashboard', icon: LayoutDashboard },
    { path: '/admin', label: 'Command Center', icon: Cpu, isSecOps: true },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-cyber-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link 
            to="/"
            className="flex items-center space-x-3 cursor-pointer group"
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
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-cyber-bg/60 p-1.5 rounded-xl border border-cyber-border/40">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPath === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-cyber-card text-cyber-cyan border border-cyber-cyan/30 shadow-cyber-cyan/20 shadow-md font-semibold' 
                      : link.isSecOps
                      ? 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10'
                      : 'text-cyber-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyber-cyan' : link.isSecOps ? 'text-emerald-400' : ''}`} />
                  <span>{link.label}</span>
                  {link.isSecOps && (
                    <span className="text-[9px] font-mono uppercase bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-500/30">
                      OPS
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Auth & System Status */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-pulse"></span>
              <span>SYSTEM ONLINE</span>
            </div>

            {user ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/dashboard"
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-cyber-card border border-cyber-border text-xs text-cyber-text font-mono hover:border-cyber-cyan/40 transition"
                >
                  <UserCheck className="w-4 h-4 text-cyber-cyan" />
                  <span className="truncate max-w-[120px]">{user.email || 'Client Portal'}</span>
                </Link>
                <button
                  onClick={onLogout}
                  className="px-3.5 py-1.5 rounded-lg border border-cyber-border text-xs text-cyber-muted hover:text-white hover:bg-white/5 transition font-mono"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/auth"
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-blue text-black font-semibold text-xs hover:opacity-95 transition-all shadow-cyber-cyan"
                >
                  <Lock className="w-3.5 h-3.5 text-black" />
                  <span>Client Access</span>
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </Link>
              </div>
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
            const isActive = currentPath === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive ? 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30' : 'text-cyber-muted'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </div>
                {link.isSecOps && (
                  <span className="text-[9px] font-mono uppercase bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">
                    SECOPS
                  </span>
                )}
              </Link>
            );
          })}
          
          <div className="pt-3 border-t border-cyber-border flex flex-col space-y-2">
            {user ? (
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-lg border border-cyber-border text-sm text-cyber-muted font-mono"
              >
                Sign Out ({user.email || 'Client'})
              </button>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-lg bg-cyber-cyan text-black font-semibold text-sm text-center flex items-center justify-center space-x-2"
              >
                <Lock className="w-4 h-4 text-black" />
                <span>Client Portal Access</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
