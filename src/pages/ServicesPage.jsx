import React, { useState } from 'react';
import { Terminal, CheckCircle2, ArrowRight, ShieldCheck, Cpu, Cloud, Code2 } from 'lucide-react';

export default function ServicesPage({ onRequestModalOpen }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const servicesList = [
    {
      id: 'web-pentest',
      category: 'security',
      title: 'Web Application & API Penetration Testing',
      priceTag: 'Scoped 2–3 Week Sprints',
      badge: 'Whitebox & Graybox',
      icon: ShieldCheck,
      description: 'Thorough manual penetration testing of single-page applications, server-rendered platforms, and REST/GraphQL APIs. We dissect authentication flows and business logic to uncover high-impact flaws before production release.',
      deliverables: [
        'Multi-step authorization testing (BOLA / IDOR, tenant boundary bypasses)',
        'Token and session security review (JWT signing flaws, CSRF, OAuth2 flows)',
        'Verified proof-of-concept scripts and step-by-step reproduction steps',
        'Engineering-level remediation report with exact code diffs & verification re-testing'
      ]
    },
    {
      id: 'custom-web',
      category: 'webdev',
      title: 'High-Assurance Full-Stack Platform Development',
      priceTag: 'Milestone-Based Engineering',
      badge: 'React / FastAPI / Postgres',
      icon: Cpu,
      description: 'End-to-end web engineering for performance-critical and security-sensitive web applications. Built with modern React/TypeScript frontends, Python FastAPI microservices, and Supabase PostgreSQL with strict Row Level Security.',
      deliverables: [
        'High-fidelity, responsive user interface with accessible micro-animations',
        'High-throughput asynchronous backend APIs with automated schema validation',
        'Granular tenant isolation via Supabase PostgreSQL Row Level Security (RLS)',
        'Automated testing suites, CSP header configurations, and CI/CD deployment'
      ]
    },
    {
      id: 'cloud-audit',
      category: 'security',
      title: 'Cloud Architecture & IAM Security Audit',
      priceTag: '1–2 Week Review',
      badge: 'AWS / GCP / Vercel',
      icon: Cloud,
      description: 'Rigorous security evaluation of cloud infrastructure, IAM permissions, serverless function configurations, and public resource exposure. Designed to prevent cloud data leaks and supply chain compromises.',
      deliverables: [
        'Least-privilege IAM policy auditing and role privilege escalation reviews',
        'Cloud storage, database, and serverless endpoint access rule verification',
        'TLS/SSL cipher suites, CORS policies, and rate-limiting infrastructure review',
        'Hardening checklist prioritized by exploitability and business risk'
      ]
    },
    {
      id: 'sec-hardening',
      category: 'webdev',
      title: 'Source Code Review & DevSecOps Hardening',
      priceTag: 'Targeted Advisory',
      badge: 'Code-Level Audit',
      icon: Code2,
      description: 'Line-by-line manual source code review focused on identifying injection vectors, insecure direct object references, cryptographic missteps, and third-party dependency vulnerabilities.',
      deliverables: [
        'Manual static and dynamic source code vulnerability assessment',
        'Third-party dependency and open-source supply-chain security audit',
        'Secure CI/CD pipeline gating and automated secret scanning setup',
        'Developer enablement briefing with root-cause analysis of findings'
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-light border border-border text-text-light text-xs font-medium">
          <span>Consultancy & Engineering Offerings</span>
        </div>
        <h1 className="hasHighlight text-4xl sm:text-5xl lg:text-6xl font-bold font-secondary text-white">
          Specialized <strong>Security Assessments</strong> & Web Engineering
        </h1>
        <p className="text-base text-text leading-relaxed">
          Engage our team for scoped manual penetration tests, cloud security hardening, or custom full-stack web platforms built to withstand modern threats.
        </p>
      </div>

      {/* Filter Tabs in Automark Pill Toggler Style */}
      <div className="flex justify-center">
        <div className="p-1 rounded-full bg-light border border-border inline-flex space-x-1 shadow-lg">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
              activeCategory === 'all' ? 'bg-primary text-white font-semibold shadow-[0_0_15px_rgba(147,122,255,0.4)]' : 'text-text-dark hover:text-white'
            }`}
          >
            All Offerings
          </button>
          <button
            onClick={() => setActiveCategory('security')}
            className={`px-6 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
              activeCategory === 'security' ? 'bg-primary text-white font-semibold shadow-[0_0_15px_rgba(147,122,255,0.4)]' : 'text-text-dark hover:text-white'
            }`}
          >
            Security Assessments
          </button>
          <button
            onClick={() => setActiveCategory('webdev')}
            className={`px-6 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
              activeCategory === 'webdev' ? 'bg-primary text-white font-semibold shadow-[0_0_15px_rgba(147,122,255,0.4)]' : 'text-text-dark hover:text-white'
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
                    <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold">
                      {srv.badge}
                    </span>
                    <span className="text-xs text-text-dark">{srv.priceTag}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold font-secondary text-white mb-3">{srv.title}</h3>
                <p className="text-sm text-text leading-relaxed mb-6">{srv.description}</p>

                <div className="space-y-3 mb-8">
                  <div className="text-xs text-primary font-semibold uppercase tracking-wider">Key Deliverables</div>
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
                className="w-full btn btn-primary text-xs justify-center"
              >
                <span>Request Assessment Scope</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Engagement Process (Real substance, not sci-fi vibe coding) */}
      <div className="section-box p-8 sm:p-12">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="text-xs text-primary font-semibold uppercase tracking-wider">Engagement Lifecycle</div>
          <h3 className="text-2xl sm:text-3xl font-bold font-secondary text-white">How We Conduct Engagements</h3>
          <p className="text-sm text-text-dark">A clear, collaborative four-step process built to minimize operational disruption while maximizing security coverage.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="p-6 rounded-2xl bg-body/80 border border-border space-y-2">
            <div className="w-8 h-8 rounded-full bg-primary/15 text-primary font-bold text-xs flex items-center justify-center mb-3 border border-primary/30">01</div>
            <div className="font-bold text-white text-sm">Threat Modeling & Scope</div>
            <div className="text-text-dark text-xs leading-relaxed">We define target URLs, APIs, cloud boundaries, and rules of engagement with your technical leads.</div>
          </div>
          <div className="p-6 rounded-2xl bg-body/80 border border-border space-y-2">
            <div className="w-8 h-8 rounded-full bg-primary/15 text-primary font-bold text-xs flex items-center justify-center mb-3 border border-primary/30">02</div>
            <div className="font-bold text-white text-sm">Manual Exploitation</div>
            <div className="text-text-dark text-xs leading-relaxed">Senior security engineers manually probe business logic, authentication, and access controls for zero-day flaws.</div>
          </div>
          <div className="p-6 rounded-2xl bg-body/80 border border-border space-y-2">
            <div className="w-8 h-8 rounded-full bg-primary/15 text-primary font-bold text-xs flex items-center justify-center mb-3 border border-primary/30">03</div>
            <div className="font-bold text-white text-sm">Engineering Briefing</div>
            <div className="text-text-dark text-xs leading-relaxed">We deliver findings with reproducible PoCs, CVSS ratings, and pull-request-ready remediation diffs.</div>
          </div>
          <div className="p-6 rounded-2xl bg-body/80 border border-border space-y-2">
            <div className="w-8 h-8 rounded-full bg-primary/15 text-primary font-bold text-xs flex items-center justify-center mb-3 border border-primary/30">04</div>
            <div className="font-bold text-white text-sm">Verification Re-Testing</div>
            <div className="text-text-dark text-xs leading-relaxed">After your team merges fixes, we conduct validation testing to certify that vulnerabilities are closed.</div>
          </div>
        </div>
      </div>

    </div>
  );
}
