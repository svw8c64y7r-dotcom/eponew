import React from 'react';
import { Shield, ArrowRight, Lock, Terminal, CheckCircle2, ShieldAlert, Code2 } from 'lucide-react';

export default function Hero({ onExploreServices, onRequestAudit }) {
  return (
    <div className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
      {/* Automark Ambient Spore Radial Glow Background */}
      <div 
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 w-[800px] xl:w-[1200px] h-[600px] -z-10 pointer-events-none blur-3xl opacity-50"
        style={{
          background: 'radial-gradient(circle, var(--color-primary) 0%, rgba(147, 122, 255, 0.2) 25%, rgba(77, 54, 208, 0.06) 50%, transparent 75%)'
        }}
      />
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none -z-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Professional Clean Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-light border border-border text-text-light text-xs font-medium shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Independent Security Research & Web Systems</span>
            </div>

            {/* Powerful, authentic headline */}
            <h1 className="hasHighlight text-4xl sm:text-5xl lg:text-6xl font-bold font-secondary text-white leading-[1.12]">
              We find the critical vulnerabilities <strong>automated scanners miss</strong>.
            </h1>

            {/* Grounded, high-trust subheadline */}
            <p className="text-base sm:text-lg text-text leading-relaxed max-w-2xl">
              Epotech conducts rigorous manual penetration tests and architects resilient full-stack web platforms for engineering teams that cannot afford a breach.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                onClick={onRequestAudit}
                className="btn btn-primary"
              >
                <Lock className="w-4 h-4" />
                <span>Request a Security Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreServices}
                className="btn btn-outline"
              >
                <Terminal className="w-4 h-4 text-primary" />
                <span>View Audit Methodology</span>
              </button>
            </div>

            {/* Concrete, authentic differentiators */}
            <div className="pt-8 border-t border-border/80 grid grid-cols-3 gap-6">
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-secondary text-white tracking-tight">100%</div>
                <div className="text-xs text-text-dark mt-1 font-medium">Manual Logic Testing</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-secondary text-primary tracking-tight">Zero</div>
                <div className="text-xs text-text-dark mt-1 font-medium">False Positive Guarantee</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-secondary text-emerald-400 tracking-tight">&lt;48h</div>
                <div className="text-xs text-text-dark mt-1 font-medium">Critical Triage SLA</div>
              </div>
            </div>

          </div>

          {/* Hero Right Visual: Authentic Security Finding & Remediation Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel-glow p-6 sm:p-7 rounded-3xl relative shadow-2xl space-y-5">
              
              {/* Card Header with Target Metadata */}
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-body border border-border flex items-center justify-center">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Live Engagement Sample</div>
                    <div className="text-[11px] font-mono text-text-dark">api.enterprise-target.io</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-[10px] font-medium font-mono">
                  VERIFIED FIX
                </span>
              </div>

              {/* Realistic Vulnerability Finding Item */}
              <div className="p-4 rounded-2xl bg-body/80 border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShieldAlert className="w-4 h-4 text-secondary" />
                    <span className="text-xs font-bold text-white">Broken Object-Level Authorization</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary text-[10px] font-mono font-bold">
                    HIGH • CVSS 8.4
                  </span>
                </div>
                
                <p className="text-xs text-text-dark leading-relaxed">
                  Endpoint <code className="text-text-light px-1 py-0.5 bg-light rounded text-[11px] font-mono">/v2/orgs/&#123;id&#125;/billing</code> failed to validate session tenant claims, permitting cross-organization data disclosure.
                </p>

                {/* Concrete Code-Level Remediation Diff */}
                <div className="p-2.5 rounded-xl bg-dark/90 border border-border text-[11px] font-mono space-y-1">
                  <div className="text-[10px] text-text-dark flex items-center gap-1">
                    <Code2 className="w-3 h-3 text-primary" />
                    <span>Engineered Patch Diff</span>
                  </div>
                  <div className="text-rose-400/90">- const tenant = await db.orgs.find(req.params.id);</div>
                  <div className="text-emerald-400/90">+ const tenant = await db.orgs.findVerified(req.params.id, req.user.tenantId);</div>
                </div>
              </div>

              {/* Engagement Status Tickers */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-light/70 border border-border">
                  <div className="text-[11px] text-text-dark">Testing Vector</div>
                  <div className="text-white font-medium mt-1">OWASP API Top 10</div>
                </div>
                <div className="p-3 rounded-2xl bg-light/70 border border-border">
                  <div className="text-[11px] text-text-dark">Remediation Status</div>
                  <div className="text-emerald-400 font-medium mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Retested & Closed</span>
                  </div>
                </div>
              </div>

              {/* Footer reassurance */}
              <div className="pt-1 text-center">
                <span className="text-[11px] text-text-dark">
                  Every engagement delivers working proof-of-concepts & actionable code fixes.
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
