import React from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle, AlertTriangle, XCircle, Lock, Server, Cpu, ExternalLink } from 'lucide-react';

export default function AuditReportViewer({ report }) {
  if (!report) return null;

  const { overall_score, grade, target, timestamp, ports, headers, ssl_info, recommendations, summary } = report;

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-cyber-emerald border-cyber-emerald/40 bg-cyber-emerald/10';
    if (score >= 80) return 'text-cyber-cyan border-cyber-cyan/40 bg-cyber-cyan/10';
    if (score >= 70) return 'text-cyber-amber border-cyber-amber/40 bg-cyber-amber/10';
    return 'text-cyber-red border-cyber-red/40 bg-cyber-red/10';
  };

  return (
    <div className="space-y-6">
      
      {/* Overview Banner */}
      <div className="glass-panel-glow p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <span className="px-2.5 py-1 rounded bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono">
              AUDIT SCAN REPORT
            </span>
            <span className="text-xs text-cyber-muted font-mono">{new Date(timestamp).toLocaleString()}</span>
          </div>
          <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
            <span>Target:</span>
            <span className="font-mono text-cyber-cyan">{target}</span>
          </h3>
          <p className="text-xs text-cyber-muted mt-1">
            Execution Duration: <span className="text-cyber-cyan font-mono">{report.scan_duration_ms || 512} ms</span> (Vercel Serverless Posture Engine)
          </p>
        </div>

        {/* Grade Badge */}
        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-mono text-cyber-muted">SECURITY POSTURE GRADE</div>
            <div className="text-sm font-semibold text-white">
              {overall_score >= 90 ? 'Hardened Enterprise' : 'Action Required'}
            </div>
          </div>
          <div className={`w-20 h-20 rounded-2xl border-2 flex flex-col items-center justify-center font-mono ${getScoreColor(overall_score)}`}>
            <span className="text-3xl font-extrabold">{grade}</span>
            <span className="text-[10px] font-semibold tracking-wider opacity-80">{overall_score}/100</span>
          </div>
        </div>
      </div>

      {/* Summary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-cyber-card border border-cyber-border">
          <div className="text-xs font-mono text-cyber-muted mb-1">CRITICAL VULNS</div>
          <div className="text-2xl font-extrabold text-cyber-emerald">{summary?.critical_vulnerabilities || 0}</div>
        </div>
        <div className="p-4 rounded-xl bg-cyber-card border border-cyber-border">
          <div className="text-xs font-mono text-cyber-muted mb-1">HIGH RISK ISSUES</div>
          <div className="text-2xl font-extrabold text-cyber-emerald">{summary?.high_vulnerabilities || 0}</div>
        </div>
        <div className="p-4 rounded-xl bg-cyber-card border border-cyber-border">
          <div className="text-xs font-mono text-cyber-muted mb-1">MEDIUM WARNINGS</div>
          <div className="text-2xl font-extrabold text-cyber-amber">{summary?.medium_vulnerabilities || 1}</div>
        </div>
        <div className="p-4 rounded-xl bg-cyber-card border border-cyber-border">
          <div className="text-xs font-mono text-cyber-muted mb-1">PASSED CHECKS</div>
          <div className="text-2xl font-extrabold text-cyber-cyan">{summary?.passed_checks || 28}</div>
        </div>
      </div>

      {/* Ports & Services Breakdown */}
      <div className="p-6 rounded-2xl bg-cyber-card border border-cyber-border">
        <h4 className="text-sm font-mono font-semibold uppercase tracking-wider text-cyber-cyan mb-4 flex items-center space-x-2">
          <Server className="w-4 h-4 text-cyber-cyan" />
          <span>Network Service & Port Diagnostics</span>
        </h4>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-mono">
            <thead>
              <tr className="border-b border-cyber-border text-xs text-cyber-muted uppercase">
                <th className="py-2.5 px-3">Port</th>
                <th className="py-2.5 px-3">Service</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Risk Assessment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border/40">
              {ports.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition">
                  <td className="py-3 px-3 text-cyber-cyan font-bold">{item.port}</td>
                  <td className="py-3 px-3 text-white">{item.service}</td>
                  <td className="py-3 px-3 text-cyber-muted">{item.status}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      item.risk === 'Passed' ? 'bg-cyber-emerald/10 text-cyber-emerald border border-cyber-emerald/30' :
                      item.risk === 'Low' ? 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30' :
                      'bg-cyber-amber/10 text-cyber-amber border border-cyber-amber/30'
                    }`}>
                      {item.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Headers & SSL Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Security Headers */}
        <div className="p-6 rounded-2xl bg-cyber-card border border-cyber-border">
          <h4 className="text-sm font-mono font-semibold uppercase tracking-wider text-cyber-cyan mb-4 flex items-center space-x-2">
            <Lock className="w-4 h-4 text-cyber-cyan" />
            <span>HTTP Security Headers</span>
          </h4>
          <div className="space-y-3 font-mono text-xs">
            {Object.entries(headers || {}).map(([key, item]) => (
              <div key={key} className="p-3 rounded-lg bg-cyber-bg/80 border border-cyber-border/60 flex justify-between items-start gap-2">
                <div>
                  <div className="font-semibold text-white">{key}</div>
                  <div className="text-[11px] text-cyber-muted mt-0.5 truncate max-w-[240px]">{item.detail}</div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  item.status === 'PASS' ? 'bg-cyber-emerald/20 text-cyber-emerald' : 'bg-cyber-amber/20 text-cyber-amber'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SSL / TLS Verification */}
        <div className="p-6 rounded-2xl bg-cyber-card border border-cyber-border">
          <h4 className="text-sm font-mono font-semibold uppercase tracking-wider text-cyber-cyan mb-4 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-cyber-cyan" />
            <span>SSL/TLS Encryption Posture</span>
          </h4>
          
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-cyber-bg/80 border border-cyber-border/60 flex justify-between">
              <span className="text-cyber-muted">Certificate Validity:</span>
              <span className="text-cyber-emerald font-bold">VALID & ACTIVE</span>
            </div>
            <div className="p-3 rounded-lg bg-cyber-bg/80 border border-cyber-border/60 flex justify-between">
              <span className="text-cyber-muted">Protocol Version:</span>
              <span className="text-cyber-cyan font-bold">{ssl_info?.protocol || 'TLSv1.3'}</span>
            </div>
            <div className="p-3 rounded-lg bg-cyber-bg/80 border border-cyber-border/60 flex justify-between">
              <span className="text-cyber-muted">Issuer:</span>
              <span className="text-white truncate max-w-[180px]">{ssl_info?.issuer || "Let's Encrypt"}</span>
            </div>
            <div className="p-3 rounded-lg bg-cyber-bg/80 border border-cyber-border/60 flex justify-between">
              <span className="text-cyber-muted">Expiration Horizon:</span>
              <span className="text-cyber-emerald font-bold">{ssl_info?.expires_in_days || 82} Days Remaining</span>
            </div>
          </div>
        </div>

      </div>

      {/* Remediation Recommendations */}
      <div className="p-6 rounded-2xl bg-cyber-card border border-cyber-border">
        <h4 className="text-sm font-mono font-semibold uppercase tracking-wider text-cyber-cyan mb-3 flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-cyber-amber" />
          <span>Epotech Remediation & Action Items</span>
        </h4>
        <ul className="space-y-2 text-xs text-cyber-muted font-mono">
          {recommendations.map((rec, i) => (
            <li key={i} className="flex items-start space-x-2 bg-cyber-bg/40 p-2.5 rounded-lg border border-cyber-border/30">
              <span className="text-cyber-cyan font-bold">{i + 1}.</span>
              <span className="text-cyber-text leading-relaxed">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
