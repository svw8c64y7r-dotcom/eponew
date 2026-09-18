import React from 'react';
import { Shield, ArrowRight, Lock, Terminal, Cpu, CheckCircle2, Zap } from 'lucide-react';

export default function Hero({ onExploreServices, onRequestAudit }) {
  return (
    <div className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
      {/* Dynamic Cyber Grid & Radial Glow Background */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyber-cyan/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyber-purple/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Registered Security Company Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono">
              <Shield className="w-3.5 h-3.5 text-cyber-cyan glow-cyan-sm animate-pulse" />
              <span>REGISTERED CYBERSECURITY & WEB ENGINEERING FIRM</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Zero-Trust <span className="text-gradient-cyan">Cybersecurity</span> & Enterprise <span className="text-gradient-blue">Web Engineering</span>.
            </h1>

            <p className="text-base sm:text-lg text-cyber-muted leading-relaxed max-w-2xl">
              Epotech delivers CREST-aligned penetration testing, cloud security hardening, and resilient full-stack web platforms. Protecting mission-critical infrastructure with military-grade precision.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                onClick={onRequestAudit}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-blue text-black font-bold text-sm flex items-center justify-center space-x-2 shadow-cyber-cyan hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
              >
                <Lock className="w-4 h-4 text-black" />
                <span>Launch Security Audit</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              <button
                onClick={onExploreServices}
                className="px-6 py-3.5 rounded-xl glass-panel text-white font-medium text-sm flex items-center justify-center space-x-2 hover:border-cyber-cyan/40 hover:bg-white/5 transition"
              >
                <Terminal className="w-4 h-4 text-cyber-cyan" />
                <span>Explore Capabilities</span>
              </button>
            </div>

            {/* Stats Metrics */}
            <div className="pt-8 border-t border-cyber-border/60 grid grid-cols-3 gap-6 font-mono">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">99.98%</div>
                <div className="text-xs text-cyber-muted">Threat Mitigation</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-cyber-cyan">340+</div>
                <div className="text-xs text-cyber-muted">Audits & Builds</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-cyber-emerald">&lt;10ms</div>
                <div className="text-xs text-cyber-muted">Serverless Latency</div>
              </div>
            </div>

          </div>

          {/* Hero Right Visual Interactive Telemetry Widget */}
          <div className="lg:col-span-5">
            <div className="glass-panel-glow p-6 rounded-2xl relative shadow-cyber-card">
              
              {/* Top Terminal Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-cyber-border/60 font-mono text-xs">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-cyber-red/80"></div>
                  <div className="w-3 h-3 rounded-full bg-cyber-amber/80"></div>
                  <div className="w-3 h-3 rounded-full bg-cyber-emerald/80"></div>
                </div>
                <span className="text-cyber-muted">epotech-sec-telemetry ~ v2.4</span>
              </div>

              {/* Security Telemetry Status */}
              <div className="space-y-4 font-mono text-xs">
                <div className="p-3 rounded-lg bg-cyber-bg/90 border border-cyber-cyan/30 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-4 h-4 text-cyber-cyan animate-pulse" />
                    <div>
                      <div className="text-white font-semibold">Active Threat Firewall</div>
                      <div className="text-[10px] text-cyber-muted">0 Unresolved Anomalies</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-cyber-emerald/10 text-cyber-emerald border border-cyber-emerald/30 font-bold">
                    ARMED
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-cyber-bg/90 border border-cyber-border space-y-2">
                  <div className="flex justify-between text-cyber-muted text-[11px]">
                    <span>Automated Security Hardening</span>
                    <span className="text-cyber-cyan">98.4% Passed</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-cyber-border overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-blue w-[98%] rounded-full"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-cyber-bg/60 border border-cyber-border">
                    <div className="text-cyber-muted">Vercel API Gateway</div>
                    <div className="text-cyber-emerald font-bold mt-0.5">STATISTICS NORMAL</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-cyber-bg/60 border border-cyber-border">
                    <div className="text-cyber-muted">Supabase Storage</div>
                    <div className="text-cyber-cyan font-bold mt-0.5">JWT SYNCED</div>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <span className="text-[10px] text-cyber-muted">
                    FastAPI Engine Active • ISO 27001 Certified Procedures
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
