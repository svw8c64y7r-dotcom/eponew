import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Lock, LayoutDashboard, Terminal, Menu, X, ArrowRight, UserCheck, Cpu } from 'lucide-react';
import { getUserRole } from '../lib/auth';

export default function Navbar({ user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const isAdmin = getUserRole(user) === 'admin';

  const navLinks = [
    { path: '/', label: 'Home', icon: Shield },
    { path: '/dashboard', label: 'Client Portal', icon: LayoutDashboard },
    ...(isAdmin ? [{ path: '/admin', label: 'Command Center', icon: Cpu, isSecOps: true }] : [])
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-body/60 backdrop-blur-xl border-b border-border/30 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link 
            to="/"
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-b from-primary to-primary-light p-[1px] shadow-[0_0_20px_rgba(147,122,255,0.35)] transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-body rounded-[15px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-wider font-secondary text-white">EPOTECH</span>
              <span className="block text-[10px] tracking-widest text-primary uppercase font-medium">Cybersecurity & Web</span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Pill Capsule in Automark style) */}
          <nav className="hidden md:flex items-center space-x-2 bg-light/80 border border-border backdrop-blur-lg px-4 py-2 rounded-full shadow-md">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPath === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary/15 text-white border border-primary/30 shadow-[0_0_12px_rgba(147,122,255,0.2)] font-semibold' 
                      : link.isSecOps
                      ? 'text-text-light hover:text-white hover:bg-white/5'
                      : 'text-text-dark hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-primary' : 'text-text-dark'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Auth & Operational Status */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-light border border-border text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-[11px] text-text-dark">Systems Active</span>
            </div>

            {user ? (
              <div className="flex items-center space-x-2.5">
                <Link 
                  to="/dashboard"
                  className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-light border border-border text-xs text-text-light hover:border-primary/40 transition"
                >
                  <UserCheck className="w-4 h-4 text-primary" />
                  <span className="truncate max-w-[130px] font-medium">{user.email || 'Client Portal'}</span>
                </Link>
                <button
                  onClick={onLogout}
                  className="px-3.5 py-1.5 rounded-full border border-border text-xs text-text-dark hover:text-white hover:bg-white/5 transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/auth"
                  className="btn btn-primary btn-sm"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Client Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-light border border-border text-text hover:text-primary transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 bg-light/95 border-b border-border space-y-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPath === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive ? 'bg-primary/10 text-primary border border-primary/30' : 'text-text-dark'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </div>
                {link.isSecOps && (
                  <span className="text-[9px] font-mono uppercase bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    SECOPS
                  </span>
                )}
              </Link>
            );
          })}
          
          <div className="pt-3 border-t border-border flex flex-col space-y-2">
            {user ? (
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-full border border-border text-sm text-text-dark font-mono"
              >
                Sign Out ({user.email || 'Client'})
              </button>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full btn btn-primary text-sm py-3 justify-center"
              >
                <Lock className="w-4 h-4" />
                <span>Client Portal Access</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
