import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import { Shield, Code, Lock, Server, ArrowRight, Cpu, FileCheck, CheckCircle2 } from 'lucide-react';

export default function HomePage({ onRequestModalOpen }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-20 pb-20">
      
      {/* Animated Hero Section with Automark Theme */}
      <Hero 
        onExploreServices={() => navigate('/services')}
        onRequestAudit={onRequestModalOpen}
      />

      {/* Core Capabilities Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-mono">
            <Cpu className="w-3.5 h-3.5 text-primary" />
            <span>TWO CORE PILLARS OF EXCELLENCE</span>
          </div>
          <h2 className="hasHighlight text-3xl sm:text-4xl lg:text-5xl font-bold font-secondary text-white">
            Offensive <strong>Security</strong> & Custom <strong>Web Architecture</strong>
          </h2>
          <p className="text-base text-text">
            We bridge the gap between adversary-grade penetration testing and high-throughput, serverless web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <ServiceCard
            title="Penetration Testing & Security Auditing"
            category="Offensive Cyber Operations"
            badge="CREST Aligned"
            icon={Shield}
            description="Comprehensive security assessment targeting web applications, cloud APIs, and multi-tenant architectures to identify zero-day vulnerabilities before adversary exploitation."
            features={[
              "OWASP Top 10 Application Testing & Manual Logic Inspection",
              "Automated Security Posture Diagnostics & Port Verification",
              "REST & GraphQL API Authentication Bypass Auditing",
              "Executive Vulnerability Remediation Reports with Code Diffs"
            ]}
            onSelect={() => navigate('/services')}
          />

          <ServiceCard
            title="Enterprise Web Development & Architecture"
            category="Full-Stack Web Engineering"
            badge="Vite / React / FastAPI"
            icon={Code}
            description="Bespoke, high-performance web applications built with modern JavaScript frameworks and FastAPI microservices optimized for Vercel serverless deployment."
            features={[
              "Modern Glassmorphism UI/UX with High-End Smooth Animations",
              "FastAPI & Supabase Postgres Database Integration",
              "Sub-100ms Edge Latency & Serverless Deployment",
              "Built-In Security Hardening & Strict Content Security Policies"
            ]}
            onSelect={() => navigate('/services')}
          />

        </div>
      </section>

      {/* Why Choose Epotech Grid (Automark Section Box Style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-box p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <div className="text-xs font-mono text-primary uppercase tracking-wider mb-2 font-semibold">THE EPOTECH ADVANTAGE</div>
              <h2 className="text-3xl sm:text-4xl font-bold font-secondary text-white">Built for Security-Conscious Organizations</h2>
            </div>
            <Link
              to="/services"
              className="mt-4 md:mt-0 text-xs font-mono text-primary hover:text-white flex items-center space-x-1.5 transition"
            >
              <span>View Full Service Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-7 rounded-2xl bg-body/70 border border-border hover:border-primary/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center mb-5">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-secondary text-white mb-2">Zero-Trust Authentication</h3>
              <p className="text-xs sm:text-sm text-text-dark leading-relaxed">
                Integrated with Supabase Auth utilizing JWT token authorization, granular Row Level Security (RLS), and encrypted client sessions.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-body/70 border border-border hover:border-primary/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary-light/10 border border-primary-light/25 flex items-center justify-center mb-5">
                <Server className="w-6 h-6 text-primary-light" />
              </div>
              <h3 className="text-xl font-bold font-secondary text-white mb-2">Stateless Serverless Execution</h3>
              <p className="text-xs sm:text-sm text-text-dark leading-relaxed">
                Python FastAPI backend mapped to Vercel serverless endpoints, ensuring instant global scale without dedicated server maintenance.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-body/70 border border-border hover:border-primary/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mb-5">
                <FileCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold font-secondary text-white mb-2">Parsed Security Reports</h3>
              <p className="text-xs sm:text-sm text-text-dark leading-relaxed">
                Real-time security posture checks generating visual breakdown charts, header grades, and actionable code remediation steps.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Call To Action Banner with Automark Spore Glow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-glow p-10 md:p-16 rounded-[2.5rem] relative overflow-hidden text-center max-w-4xl mx-auto shadow-2xl">
          <div 
            className="absolute inset-0 pointer-events-none opacity-40 -z-10"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(147, 122, 255, 0.3) 0%, rgba(77, 54, 208, 0.1) 40%, transparent 75%)'
            }}
          />
          <div className="relative z-10 space-y-6">
            <h2 className="hasHighlight text-3xl sm:text-4xl lg:text-5xl font-bold font-secondary text-white">
              Ready to Secure & Elevate Your <strong>Digital Infrastructure</strong>?
            </h2>
            <p className="text-sm sm:text-base text-text max-w-2xl mx-auto">
              Engage Epotech today for a thorough web penetration test or to architect an elite enterprise web platform.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={onRequestModalOpen}
                className="w-full sm:w-auto btn btn-primary px-8 py-3.5 text-sm"
              >
                Submit Engagement Request
              </button>
              <Link
                to="/dashboard"
                className="w-full sm:w-auto btn btn-outline px-8 py-3.5 text-sm"
              >
                Access Security Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
