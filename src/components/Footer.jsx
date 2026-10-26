import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle2, ExternalLink, Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-body border-t border-border/80 relative overflow-hidden">
      {/* Glow background accent */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-36 blur-3xl pointer-events-none opacity-40 -z-10"
        style={{
          background: 'radial-gradient(circle, var(--color-primary) 0%, rgba(77, 54, 208, 0.1) 40%, transparent 70%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-light border border-primary/30 flex items-center justify-center shadow-[0_0_15px_rgba(147,122,255,0.2)]">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold tracking-wider font-secondary text-white">EPOTECH</span>
            </Link>
            <p className="text-xs text-text-dark leading-relaxed">
              Registered Cybersecurity & High-Performance Web Engineering Firm. Delivering enterprise-grade penetration testing, zero-day threat prevention, and bespoke web platforms.
            </p>
            <div className="flex items-center space-x-2 text-xs font-mono text-primary">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>ISO 27001 & CREST Aligned Standards</span>
            </div>
          </div>

          {/* Solutions & Services */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-primary mb-4">Core Services</h4>
            <ul className="space-y-2.5 text-sm text-text-dark font-sans">
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
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-primary mb-4">Portals & Operations</h4>
            <ul className="space-y-2.5 text-sm text-text-dark font-sans">
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
                <span className="text-text-dark/60 flex items-center space-x-1 cursor-not-allowed text-xs">
                  <span>Auditor Verification API</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </li>
            </ul>
          </div>

          {/* Compliance & Security Status */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-primary mb-4">Security Telemetry</h4>
            <div className="p-4 rounded-2xl bg-light border border-border space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center text-text">
                <span className="text-text-dark">Backend Engine:</span>
                <span className="text-primary font-semibold">Python FastAPI</span>
              </div>
              <div className="flex justify-between items-center text-text">
                <span className="text-text-dark">Database:</span>
                <span className="text-emerald-400 font-semibold">Supabase Postgres</span>
              </div>
              <div className="flex justify-between items-center text-text">
                <span className="text-text-dark">Hosting Runtime:</span>
                <span className="text-white font-semibold">Vercel Serverless</span>
              </div>
            </div>
            <p className="text-[11px] text-text-dark">
              All scans are run with explicit client authorization checks in accordance with computer security mandates.
            </p>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center text-xs text-text-dark">
          <p>© {new Date().getFullYear()} Epotech Cybersecurity Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 font-mono">
            <span className="hover:text-primary cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-primary cursor-pointer transition">Terms of Authorization</span>
            <span className="hover:text-primary cursor-pointer transition">Responsible Disclosure</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
