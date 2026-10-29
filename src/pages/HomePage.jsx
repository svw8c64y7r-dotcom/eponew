import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import { ArrowRight, ShieldCheck, Cpu, UserCheck, GitPullRequest, MessagesSquare } from 'lucide-react';

export default function HomePage({ onRequestModalOpen }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e1e2d] to-[#151522] text-white">
      {/* Hero Section */}
      <Hero onExploreServices={() => navigate('/services')} onRequestAudit={onRequestModalOpen} />

      {/* Core Capabilities Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-light/20 border border-border text-text-light text-xs font-medium">
            <span>Specialized Capabilities</span>
          </div>
          <h2 className="hasHighlight text-3xl sm:text-4xl lg:text-5xl font-bold font-secondary text-white">
            Offensive Security <strong>& High-Assurance Engineering</strong>
          </h2>
          <p className="text-base text-text leading-relaxed">
            We bridge the gap between adversary-grade penetration testing and high-performance, hardened web development.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ServiceCard
            title="Web Application & API Penetration Testing"
            category="Offensive Security"
            badge="Manual-First"
            icon={ShieldCheck}
            description="Deep manual penetration testing targeting web applications, cloud APIs, and microservice boundaries to uncover critical vulnerabilities before threat actors exploit them."
            features={[
              'Manual business logic inspection & multi-step access control testing',
              'REST and GraphQL API authorization boundary verification (BOLA / IDOR)',
              'Zero false positives — every finding includes a verified proof-of-concept',
              'Executive summary plus engineering-level remediation diffs',
            ]}
            onSelect={() => navigate('/services')}
          />
          <ServiceCard
            title="High-Assurance Full-Stack Web Development"
            category="Web Systems Engineering"
            badge="Production Grade"
            icon={Cpu}
            description="Bespoke web applications built with modern React, TypeScript, and Python FastAPI backends, engineered with defense-in-depth principles from day one."
            features={[
              'Modern responsive interface with smooth, high-fidelity micro-interactions',
              'FastAPI services with strict Pydantic data modeling and OpenAPI documentation',
              'Supabase PostgreSQL architecture with granular Row Level Security (RLS)',
              'Strict Content Security Policy (CSP), TLS hardening, and rate limiting',
            ]}
            onSelect={() => navigate('/services')}
          />
        </div>
      </section>

      {/* The Epotech Standard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="section-box p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div className="max-w-2xl space-y-3">
              <div className="text-xs text-primary font-semibold tracking-wide uppercase">The Epotech Standard</div>
              <h2 className="text-3xl sm:text-4xl font-bold font-secondary text-white">
                Security assessments designed for engineers, not compliance check-boxes.
              </h2>
            </div>
            <Link to="/services" className="mt-4 md:mt-0 text-xs font-semibold text-primary hover:text-white flex items-center space-x-1.5 transition">
              <span>Explore Detailed Offerings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-7 rounded-2xl bg-body/80 border border-border hover:border-primary/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary mb-5">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-secondary text-white">Human-Led Vulnerability Research</h3>
              <p className="text-sm text-text-dark leading-relaxed">
                Automated tools only catch superficial CVEs. Our researchers manually trace authentication flows and business logic to discover deep, multi-step flaws automated scanners can never spot.
              </p>
            </div>
            <div className="p-7 rounded-2xl bg-body/80 border border-border hover:border-primary/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-primary-light/10 border border-primary-light/25 flex items-center justify-center text-primary-light mb-5">
                <GitPullRequest className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-secondary text-white">Actionable Code-Level Fixes</h3>
              <p className="text-sm text-text-dark leading-relaxed">
                We never dump a 150-page generic automated PDF in your lap. We deliver concrete code snippets and configuration diffs that your engineering team can test and merge immediately.
              </p>
            </div>
            <div className="p-7 rounded-2xl bg-body/80 border border-border hover:border-primary/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-5">
                <MessagesSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-secondary text-white">Direct Communication With Lead Engineers</h3>
              <p className="text-sm text-text-dark leading-relaxed">
                Work directly with the security professionals assessing your software. Clarify attack vectors, discuss architectural trade-offs, and coordinate re-tests without account managers in between.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="glass-panel-glow p-10 md:p-16 rounded-[2.5rem] relative overflow-hidden text-center max-w-4xl mx-auto shadow-2xl">
          <div className="absolute inset-0 pointer-events-none opacity-30 -z-10" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(147,122,255,0.3) 0%, rgba(77,54,208,0.1) 40%, transparent 75%)' }} />
          <div className="relative z-10 space-y-6">
            <h2 className="hasHighlight text-3xl sm:text-4xl lg:text-5xl font-bold font-secondary text-white">
              Secure your platform before <strong>adversaries test it for you</strong>.
            </h2>
            <p className="text-base text-text max-w-2xl mx-auto leading-relaxed">
              Whether you need an adversarial penetration test ahead of a major release or want to engineer a hardened enterprise platform from the ground up, we are ready to assist.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button onClick={onRequestModalOpen} className="w-full sm:w-auto btn btn-primary px-8 py-3.5 text-sm">
                Schedule an Assessment Call
              </button>
              <Link to="/services" className="w-full sm:w-auto btn btn-outline px-8 py-3.5 text-sm">
                View Detailed Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
