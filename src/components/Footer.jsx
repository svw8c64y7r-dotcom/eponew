import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle2, Lock, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-body border-t border-border/80 relative overflow-hidden">
      {/* Subtle Glow background accent */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-36 blur-3xl pointer-events-none opacity-30 -z-10"
        style={{
          background: 'radial-gradient(circle, var(--color-primary) 0%, rgba(77, 54, 208, 0.08) 40%, transparent 70%)'
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
              <span className="text-xl font-bold font-secondary tracking-tight text-white">EPOTECH</span>
            </Link>
            <p className="text-xs text-text-dark leading-relaxed">
              Specialized cybersecurity research and web systems engineering consultancy. Delivering rigorous manual penetration testing and hardened full-stack platforms.
            </p>
            <div className="flex items-center space-x-2 text-xs text-primary font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Independent Security Research</span>
            </div>
          </div>

          {/* Solutions & Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">Core Practices</h4>
            <ul className="space-y-2.5 text-sm text-text-dark font-sans">
              <li>
                <Link to="/services" className="hover:text-white transition">
                  Web & API Penetration Testing
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition">
                  Full-Stack Platform Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition">
                  Cloud Infrastructure Audits
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition">
                  Source Code & DevSecOps Review
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Portal & Operations */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">Client Portals</h4>
            <ul className="space-y-2.5 text-sm text-text-dark font-sans">
              <li>
                <Link to="/dashboard" className="hover:text-white transition">
                  Client Diagnostic Portal
                </Link>
              </li>
              <li>
                <Link to="/auth" className="hover:text-white transition">
                  Authorized Client Access
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-white transition flex items-center space-x-1">
                  <span>SecOps Administration</span>
                  <ArrowUpRight className="w-3 h-3 text-text-dark" />
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition">
                  Audit Scoping Checklist
                </Link>
              </li>
            </ul>
          </div>

          {/* Security Standards & Guarantees */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">Standards & Guarantees</h4>
            <div className="p-4 rounded-2xl bg-light border border-border space-y-2.5 text-xs">
              <div className="flex items-center space-x-2 text-text-light">
                <Lock className="w-3.5 h-3.5 text-primary" />
                <span>Strict Mutual NDA on all scopes</span>
              </div>
              <div className="flex items-center space-x-2 text-text-light">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero false-positive PoC validation</span>
              </div>
              <div className="flex items-center space-x-2 text-text-light">
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span>Compliant with OWASP & CREST criteria</span>
              </div>
            </div>
            <p className="text-[11px] text-text-dark leading-relaxed">
              All testing is performed strictly within agreed authorization windows and customer-defined scopes.
            </p>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center text-xs text-text-dark">
          <p>© {new Date().getFullYear()} Epotech Cybersecurity Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-primary cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-primary cursor-pointer transition">Terms of Authorization</span>
            <span className="hover:text-primary cursor-pointer transition">Responsible Disclosure</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
