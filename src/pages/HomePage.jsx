import React, { useState } from 'react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import { Shield, Code, Lock, Server, Terminal, CheckCircle2, ArrowRight, Zap, Cpu, FileCheck } from 'lucide-react';

export default function HomePage({ setActiveTab, onRequestModalOpen }) {
  return (
    <div className="space-y-20 pb-20">
      
      {/* Animated Hero Section */}
      <Hero 
        onExploreServices={() => setActiveTab('services')}
        onRequestAudit={onRequestModalOpen}
      />

      {/* Core Capabilities Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyber-blue/10 border border-cyber-blue/30 text-cyber-blue text-xs font-mono">
            <Cpu className="w-3.5 h-3.5 text-cyber-blue" />
            <span>TWO CORE PILLARS OF EXCELLENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Security Testing & Custom Web Engineering
          </h2>
          <p className="text-sm sm:text-base text-cyber-muted">
            We bridge the gap between offensive cybersecurity and high-throughput full-stack web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <ServiceCard
            title="Penetration Testing & Security Auditing"
            category="Offensive Cyber Operations"
            badge="CREST Aligned"
            icon={Shield}
            description="Comprehensive security assessment targeting web applications, APIs, and cloud infrastructure to identify zero-day vulnerabilities before adversary exploitation."
            features={[
              "OWASP Top 10 Application Testing & Manual Logic Inspection",
              "Automated Security Posture Diagnostics & Port Verification",
              "REST & GraphQL API Authentication Bypass Auditing",
              "Executive Vulnerability Remediation Reports with Code Diffs"
            ]}
            onSelect={() => setActiveTab('services')}
          />

          <ServiceCard
            title="Enterprise Web Development & Architecture"
            category="Full-Stack Web Engineering"
            badge="Vite / Next.js / FastAPI"
            icon={Code}
            description="Bespoke, high-performance web applications built with modern JavaScript frameworks and FastAPI microservices optimized for serverless deployment."
            features={[
              "Modern Glassmorphism UI/UX with High-End Smooth Animations",
              "FastAPI & Supabase Postgres Database Integration",
              "Sub-100ms Response Times & Serverless Edge Deployment",
              "Built-In Security Hardening & Strict Content Security Policies"
            ]}
            onSelect={() => setActiveTab('services')}
          />

        </div>
      </section>

      {/* Why Choose Epotech Grid */}
      <section className="bg-cyber-card/40 border-y border-cyber-border py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <div className="text-xs font-mono text-cyber-cyan uppercase tracking-wider mb-2 font-semibold">THE EPOTECH ADVANTAGE</div>
              <h2 className="text-3xl font-extrabold text-white">Built for Security-Conscious Organizations</h2>
            </div>
            <button
              onClick={() => setActiveTab('services')}
              className="mt-4 md:mt-0 text-xs font-mono text-cyber-cyan hover:text-white flex items-center space-x-1"
            >
              <span>View Full Service Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-xl bg-cyber-bg border border-cyber-border hover:border-cyber-cyan/30 transition">
              <Lock className="w-8 h-8 text-cyber-cyan mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Zero-Trust Authentication</h3>
              <p className="text-xs text-cyber-muted leading-relaxed">
                Integrated with Supabase Auth utilizing JWT token authorization, granular Row Level Security (RLS), and encrypted sessions.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-cyber-bg border border-cyber-border hover:border-cyber-cyan/30 transition">
              <Server className="w-8 h-8 text-cyber-blue mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Stateless Serverless Execution</h3>
              <p className="text-xs text-cyber-muted leading-relaxed">
                Python FastAPI backend mapped to Vercel serverless functions, ensuring instant scalability without dedicated server maintenance.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-cyber-bg border border-cyber-border hover:border-cyber-cyan/30 transition">
              <FileCheck className="w-8 h-8 text-cyber-emerald mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Parsed Security Reports</h3>
              <p className="text-xs text-cyber-muted leading-relaxed">
                Real-time security posture checks generating visual breakdown charts, header grades, and actionable remediation steps.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-glow p-10 md:p-14 rounded-3xl relative overflow-hidden text-center max-w-4xl mx-auto">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Ready to Secure & Elevate Your Digital Infrastructure?
            </h2>
            <p className="text-sm sm:text-base text-cyber-muted max-w-2xl mx-auto">
              Engage Epotech today for a thorough web penetration test or to build a state-of-the-art web application.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={onRequestModalOpen}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-blue text-black font-bold text-sm shadow-cyber-cyan hover:scale-[1.02] transition"
              >
                Submit Engagement Request
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl glass-panel text-white font-medium text-sm hover:bg-white/5 transition"
              >
                Access Security Portal
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
