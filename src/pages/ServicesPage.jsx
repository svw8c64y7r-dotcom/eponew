import React, { useState } from 'react';
import { Terminal, CheckCircle2, ArrowRight, ShieldCheck, Cpu, Cloud, Lock } from 'lucide-react';

export default function ServicesPage({ onRequestModalOpen }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const servicesList = [
    {
      id: 'web-pentest',
      category: 'security',
      title: 'Web Application Penetration Testing',
      priceTag: 'Custom Scope',
      badge: 'CREST Certified',
      icon: ShieldCheck,
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
      icon: Cpu,
      description: 'End-to-end custom web engineering using modern JavaScript frontend frameworks paired with Python FastAPI backends and Supabase Postgres.',
      deliverables: [
        'Responsive, Glassmorphism UI with Modern Micro-Animations',
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
      icon: Cloud,
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
      icon: Lock,
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
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-mono">
          <Terminal className="w-3.5 h-3.5 text-primary" />
          <span>OFFERING CATALOG & ENGAGEMENT MATRIX</span>
        </div>
        <h1 className="hasHighlight text-4xl sm:text-5xl lg:text-6xl font-bold font-secondary text-white">
          Cybersecurity & <strong>Web Engineering</strong>
        </h1>
        <p className="text-base text-text leading-relaxed">
          Select an offering below to engage Epotech's specialized team of security auditors and senior full-stack developers.
        </p>
      </div>

      {/* Filter Tabs in Automark Pill Toggler Style */}
      <div className="flex justify-center">
        <div className="p-1 rounded-full bg-light border border-border inline-flex space-x-1 shadow-lg">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-2 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
              activeCategory === 'all' ? 'bg-primary text-white font-bold shadow-[0_0_15px_rgba(147,122,255,0.4)]' : 'text-text-dark hover:text-white'
            }`}
          >
            All Offerings
          </button>
          <button
            onClick={() => setActiveCategory('security')}
            className={`px-6 py-2 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
              activeCategory === 'security' ? 'bg-primary text-white font-bold shadow-[0_0_15px_rgba(147,122,255,0.4)]' : 'text-text-dark hover:text-white'
            }`}
          >
            Security & Pentesting
          </button>
          <button
            onClick={() => setActiveCategory('webdev')}
            className={`px-6 py-2 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
              activeCategory === 'webdev' ? 'bg-primary text-white font-bold shadow-[0_0_15px_rgba(147,122,255,0.4)]' : 'text-text-dark hover:text-white'
            }`}
          >
            Web Engineering
          </button>
        </div>
      </div>

      {/* Service Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredServices.map((srv) => {
          const SrvIcon = srv.icon;
          return (
            <div key={srv.id} className="bg-light/85 p-8 rounded-3xl border border-border hover:border-primary/40 transition-all flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-body border border-primary/30 flex items-center justify-center">
                    <SrvIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary font-mono text-xs font-semibold">
                      {srv.badge}
                    </span>
                    <span className="text-xs font-mono text-text-dark">{srv.priceTag}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold font-secondary text-white mb-3">{srv.title}</h3>
                <p className="text-sm text-text leading-relaxed mb-6">{srv.description}</p>

                <div className="space-y-3 mb-8">
                  <div className="text-xs font-mono text-primary uppercase font-semibold">Key Deliverables:</div>
                  {srv.deliverables.map((del, i) => (
                    <div key={`${srv.id}-del-${i}`} className="flex items-start space-x-2.5 text-xs text-text-light font-sans">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onRequestModalOpen}
                className="w-full btn btn-primary text-xs justify-center font-mono"
              >
                <span>Request Service Scope</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Methodology Section in Automark Section-Box Style */}
      <div className="section-box p-8 sm:p-12">
        <h3 className="text-2xl font-bold font-secondary text-white mb-8 text-center">Epotech Execution Methodology</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center font-mono text-xs">
          <div className="p-6 rounded-2xl bg-body/80 border border-border">
            <div className="w-10 h-10 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center mx-auto mb-4 border border-primary/30">1</div>
            <div className="font-bold text-white text-sm mb-1.5">Scope & Auth</div>
            <div className="text-text-dark text-[11px] leading-relaxed">Define domain targets & authorize testing parameters</div>
          </div>
          <div className="p-6 rounded-2xl bg-body/80 border border-border">
            <div className="w-10 h-10 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center mx-auto mb-4 border border-primary/30">2</div>
            <div className="font-bold text-white text-sm mb-1.5">Deep Analysis</div>
            <div className="text-text-dark text-[11px] leading-relaxed">Automated telemetry & senior engineer manual audits</div>
          </div>
          <div className="p-6 rounded-2xl bg-body/80 border border-border">
            <div className="w-10 h-10 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center mx-auto mb-4 border border-primary/30">3</div>
            <div className="font-bold text-white text-sm mb-1.5">Report & Diffs</div>
            <div className="text-text-dark text-[11px] leading-relaxed">Parsed dashboard report & remediation code recommendations</div>
          </div>
          <div className="p-6 rounded-2xl bg-body/80 border border-border">
            <div className="w-10 h-10 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center mx-auto mb-4 border border-primary/30">4</div>
            <div className="font-bold text-white text-sm mb-1.5">Re-Validation</div>
            <div className="text-text-dark text-[11px] leading-relaxed">Final verification scan to certify system security</div>
          </div>
        </div>
      </div>

    </div>
  );
}
