import React from 'react';
import { Shield, ArrowRight, Lock, Terminal, Zap, Sparkles } from 'lucide-react';

export default function Hero({ onExploreServices, onRequestAudit }) {
  return (
    <div className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden">
      {/* Automark Hero Top Radial Glow & Spore Background */}
      <div 
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 w-[800px] xl:w-[1200px] h-[600px] -z-10 pointer-events-none blur-3xl opacity-60"
        style={{
          background: 'radial-gradient(circle, var(--color-primary) 0%, rgba(147, 122, 255, 0.22) 25%, rgba(77, 54, 208, 0.08) 50%, transparent 75%)'
        }}
      />
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none -z-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Automark Animated Badge */}
            <div className="hero-badge-anim">
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span className="text-xs uppercase tracking-wider font-semibold">Registered Cybersecurity & Web Engineering</span>
            </div>

            <h1 className="hasHighlight text-4xl sm:text-5xl lg:text-6xl font-bold font-secondary text-white leading-[1.12]">
              Zero-Trust <strong>Cybersecurity</strong> & Elite Enterprise <strong>Web Engineering</strong>.
            </h1>

            <p className="text-base sm:text-lg text-text leading-relaxed max-w-2xl">
              Epotech delivers CREST-aligned penetration testing, cloud defense hardening, and high-performance full-stack web platforms. Protecting mission-critical digital assets with military precision.
            </p>

            {/* Action Buttons in Automark Pill Style */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-3">
              <button
                onClick={onRequestAudit}
                className="btn btn-primary"
              >
                <Lock className="w-4 h-4" />
                <span>Launch Security Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreServices}
                className="btn btn-outline"
              >
                <Terminal className="w-4 h-4 text-primary" />
                <span>Explore Capabilities</span>
              </button>
            </div>

            {/* Stats Metrics in Automark subtle border card */}
            <div className="pt-8 border-t border-border/80 grid grid-cols-3 gap-6 font-mono">
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-secondary text-white">99.98%</div>
                <div className="text-xs text-text-dark mt-1">Threat Mitigation</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-secondary text-primary">340+</div>
                <div className="text-xs text-text-dark mt-1">Audits & Deployments</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-secondary text-emerald-400">&lt;10ms</div>
                <div className="text-xs text-text-dark mt-1">Edge Latency</div>
              </div>
            </div>

          </div>

          {/* Hero Right Visual Telemetry Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel-glow p-6 sm:p-7 rounded-3xl relative shadow-2xl">
              
              {/* Top Terminal Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-border font-mono text-xs">
                <div className="flex space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary/90"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/90"></div>
                </div>
                <span className="text-text-dark text-[11px]">epotech-sec-telemetry ~ v2.5</span>
              </div>

              {/* Security Telemetry Status */}
              <div className="space-y-4 font-mono text-xs">
                <div className="p-3.5 rounded-2xl bg-light/90 border border-primary/25 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-4 h-4 text-primary animate-pulse" />
                    <div>
                      <div className="text-white font-semibold">Real-Time Threat Firewall</div>
                      <div className="text-[10px] text-text-dark">Zero Unresolved Anomalies</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                    ACTIVE
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-light/90 border border-border space-y-2">
                  <div className="flex justify-between text-text-dark text-[11px]">
                    <span>Automated Security Hardening</span>
                    <span className="text-primary font-bold">98.4% Certified</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-dark/70 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-primary-light w-[98%] rounded-full shadow-[0_0_10px_rgba(147,122,255,0.5)]"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div className="p-3 rounded-2xl bg-light/70 border border-border">
                    <div className="text-text-dark text-[10px]">Vercel Edge Proxy</div>
                    <div className="text-emerald-400 font-bold mt-1">TLS 1.3 SECURED</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-light/70 border border-border">
                    <div className="text-text-dark text-[10px]">Supabase Cloud RLS</div>
                    <div className="text-primary font-bold mt-1">JWT SYNCED</div>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <span className="text-[10px] text-text-dark">
                    FastAPI Engine Active • CREST Aligned Standards
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
