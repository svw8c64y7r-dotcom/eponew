import React, { useState } from 'react';
import { Terminal, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ServicesPage({ onRequestModalOpen }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const servicesList = [
    {
      id: 'web-pentest',
      category: 'security',
      title: 'Web Application Penetration Testing',
      priceTag: 'Custom Scope',
      badge: 'CREST Certified',
      description: 'In-depth security analysis targeting web applications, single-page apps (SPAs), and serverless backends to uncover OWASP Top 10 vulnerabilities.',
      deliverables: [
        'Authenticated & Unauthenticated Vulnerability Assessment',
        'Business Logic & Access Control Bypass Verification',
        'Detailed Proof-of-Concept (PoC) Exploitation Scenarios',
        'Executive Summary & Remediation Code Guidelines'
      ]
    },
    {
      id: 'custom-web',
      category: 'webdev',
      title: 'Full-Stack Web Development & Architecture',
      priceTag: 'Project-Based',
      badge: 'FastAPI / React / Vite',
      description: 'End-to-end custom web engineering using modern JavaScript frontend frameworks paired with Python FastAPI backends and Supabase Postgres.',
      deliverables: [
        'Responsive, Glassmorphism UI with Modern Animations',
        'Stateless Serverless Deployment for Vercel Platform',
        'Supabase Auth & Database Integration with RLS Security',
        'Complete REST API Documentation & OpenAPI Specs'
      ]
    },
    {
      id: 'cloud-audit',
      category: 'security',
      title: 'Cloud Infrastructure & API Security Audit',
      priceTag: 'Enterprise Tier',
      badge: 'AWS / GCP / Vercel',
      description: 'Comprehensive review of cloud security posture, API gateway parameters, authentication tokens, and infrastructure configuration.',
      deliverables: [
        'IAM Least-Privilege & Misconfiguration Audit',
        'API Rate Limiting, CORS & Token Verification',
        'TLS/SSL Certificate & Encryption Cipher Review',
        'Automated Posture Check & Telemetry Setup'
      ]
    },
    {
      id: 'sec-hardening',
      category: 'webdev',
      title: 'Web Application Security Hardening',
      priceTag: 'Add-On Service',
      badge: 'Defense-in-Depth',
      description: 'Retrofit existing web applications with enterprise-grade defense layers, Content Security Policies (CSP), and secure headers.',
      deliverables: [
        'Strict Content-Security-Policy (CSP) Implementation',
        'Sanitization & XSS/CSRF Prevention Middleware',
        'Security Headers Configuration (HSTS, X-Frame-Options)',
        'Post-Hardening Verification Scan'
      ]
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? servicesList 
    : servicesList.filter(s => s.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono">
          <Terminal className="w-3.5 h-3.5 text-cyber-cyan" />
          <span>OFFERING CATALOG & ENGAGEMENT MATRIX</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Cybersecurity & Web Engineering Services
        </h1>
        <p className="text-sm sm:text-base text-cyber-muted leading-relaxed">
          Select an offering below to engage Epotech's specialized team of security auditors and senior full-stack developers.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center">
        <div className="p-1.5 rounded-xl bg-cyber-card border border-cyber-border inline-flex space-x-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2 rounded-lg text-xs font-mono transition ${
              activeCategory === 'all' ? 'bg-cyber-cyan text-black font-bold' : 'text-cyber-muted hover:text-white'
            }`}
          >
            All Offerings
          </button>
          <button
            onClick={() => setActiveCategory('security')}
            className={`px-5 py-2 rounded-lg text-xs font-mono transition ${
              activeCategory === 'security' ? 'bg-cyber-cyan text-black font-bold' : 'text-cyber-muted hover:text-white'
            }`}
          >
            Security & Pentesting
          </button>
          <button
            onClick={() => setActiveCategory('webdev')}
            className={`px-5 py-2 rounded-lg text-xs font-mono transition ${
              activeCategory === 'webdev' ? 'bg-cyber-cyan text-black font-bold' : 'text-cyber-muted hover:text-white'
            }`}
          >
            Web Engineering
          </button>
        </div>
      </div>

      {/* Service Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredServices.map((srv) => (
          <div key={srv.id} className="glass-panel p-8 rounded-2xl border border-cyber-border hover:border-cyber-cyan/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="px-2.5 py-1 rounded bg-cyber-bg border border-cyber-cyan/30 text-cyber-cyan font-mono text-xs">
                  {srv.badge}
                </span>
                <span className="text-xs font-mono text-cyber-muted">{srv.priceTag}</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">{srv.title}</h3>
              <p className="text-xs sm:text-sm text-cyber-muted leading-relaxed mb-6">{srv.description}</p>

              <div className="space-y-3 mb-8">
                <div className="text-xs font-mono text-cyber-cyan uppercase font-semibold">Key Deliverables:</div>
                {srv.deliverables.map((del, i) => (
                  <div key={`${srv.id}-del-${i}`} className="flex items-start space-x-2 text-xs text-cyber-text font-sans">
                    <CheckCircle2 className="w-4 h-4 text-cyber-emerald flex-shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onRequestModalOpen}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-blue text-black font-bold text-xs font-mono flex items-center justify-center space-x-2 shadow-cyber-cyan hover:opacity-95 transition"
            >
              <span>Request Service Scope</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Methodology Section */}
      <div className="glass-panel p-10 rounded-3xl border border-cyber-border">
        <h3 className="text-xl font-bold text-white mb-6 text-center">Epotech Execution Methodology</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-center font-mono text-xs">
          <div className="p-4 rounded-xl bg-cyber-bg border border-cyber-border">
            <div className="w-8 h-8 rounded-full bg-cyber-cyan/20 text-cyber-cyan font-extrabold flex items-center justify-center mx-auto mb-3">1</div>
            <div className="font-bold text-white mb-1">Scope & Auth</div>
            <div className="text-cyber-muted text-[11px]">Define domain targets & authorize testing parameters</div>
          </div>
          <div className="p-4 rounded-xl bg-cyber-bg border border-cyber-border">
            <div className="w-8 h-8 rounded-full bg-cyber-cyan/20 text-cyber-cyan font-extrabold flex items-center justify-center mx-auto mb-3">2</div>
            <div className="font-bold text-white mb-1">Deep Analysis</div>
            <div className="text-cyber-muted text-[11px]">Automated telemetry & senior engineer manual audits</div>
          </div>
          <div className="p-4 rounded-xl bg-cyber-bg border border-cyber-border">
            <div className="w-8 h-8 rounded-full bg-cyber-cyan/20 text-cyber-cyan font-extrabold flex items-center justify-center mx-auto mb-3">3</div>
            <div className="font-bold text-white mb-1">Report & Diffs</div>
            <div className="text-cyber-muted text-[11px]">Parsed dashboard report & remediation code recommendations</div>
          </div>
          <div className="p-4 rounded-xl bg-cyber-bg border border-cyber-border">
            <div className="w-8 h-8 rounded-full bg-cyber-cyan/20 text-cyber-cyan font-extrabold flex items-center justify-center mx-auto mb-3">4</div>
            <div className="font-bold text-white mb-1">Re-Validation</div>
            <div className="text-cyber-muted text-[11px]">Final verification scan to certify system security</div>
          </div>
        </div>
      </div>

    </div>
  );
}
