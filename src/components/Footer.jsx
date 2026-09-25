import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle2, ExternalLink, Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-cyber-bg border-t border-cyber-border/60 relative overflow-hidden">
      {/* Glow background accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyber-cyan/5 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-cyber-card border border-cyber-cyan/40 flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyber-cyan" />
              </div>
              <span className="text-xl font-bold tracking-wider text-white">EPOTECH</span>
            </Link>
            <p className="text-xs text-cyber-muted leading-relaxed">
              Registered Cybersecurity & High-Performance Web Engineering Firm. Delivering enterprise-grade penetration testing, zero-day threat prevention, and bespoke web platforms.
            </p>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyber-cyan">
              <CheckCircle2 className="w-4 h-4 text-cyber-emerald" />
              <span>ISO 27001 & CREST Aligned Standards</span>
            </div>
          </div>

          {/* Solutions & Services */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-cyber-cyan mb-4">Core Services</h4>
            <ul className="space-y-2 text-sm text-cyber-muted font-sans">
              <li>
                <Link to="/services" className="hover:text-white transition">
                  Web Application Pentesting
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition">
                  Custom Full-Stack Engineering
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition">
                  Cloud Security Audit & CIS Hardening
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition">
                  API Security & Rate Limit Verification
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Portal & Command Center */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-cyber-cyan mb-4">Portals & Operations</h4>
            <ul className="space-y-2 text-sm text-cyber-muted font-sans">
              <li>
                <Link to="/dashboard" className="hover:text-white transition">
                  Client Diagnostic Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-emerald-400 hover:text-emerald-300 font-mono text-xs flex items-center space-x-1.5 transition">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Epotech Command Center</span>
                </Link>
              </li>
              <li>
                <Link to="/auth" className="hover:text-white transition">
                  Client Portal Sign In
                </Link>
              </li>
              <li>
                <span className="text-cyber-muted/60 flex items-center space-x-1 cursor-not-allowed">
                  <span>Auditor Verification API</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </li>
            </ul>
          </div>

          {/* Compliance & Security Status */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-cyber-cyan mb-4">Security Telemetry</h4>
            <div className="p-3 rounded-lg bg-cyber-card border border-cyber-border space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center text-cyber-text">
                <span className="text-cyber-muted">Backend Engine:</span>
                <span className="text-cyber-cyan font-semibold">Python FastAPI</span>
              </div>
              <div className="flex justify-between items-center text-cyber-text">
                <span className="text-cyber-muted">Database:</span>
                <span className="text-cyber-emerald font-semibold">Supabase Postgres</span>
              </div>
              <div className="flex justify-between items-center text-cyber-text">
                <span className="text-cyber-muted">Hosting Runtime:</span>
                <span className="text-white font-semibold">Vercel Serverless</span>
              </div>
            </div>
            <p className="text-[11px] text-cyber-muted">
              All scans are run with explicit client authorization checks in accordance with computer security mandates.
            </p>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-cyber-border/40 flex flex-col md:flex-row justify-between items-center text-xs text-cyber-muted">
          <p>© {new Date().getFullYear()} Epotech Cybersecurity Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 font-mono">
            <span className="hover:text-cyber-cyan cursor-pointer">Privacy Policy</span>
            <span className="hover:text-cyber-cyan cursor-pointer">Terms of Authorization</span>
            <span className="hover:text-cyber-cyan cursor-pointer">Responsible Disclosure</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
