import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Shield, Terminal, Plus, Search, Server, Clock, CheckCircle2, AlertTriangle, Activity, Lock, RefreshCw } from 'lucide-react';
import { getServiceRequests, runSecurityAudit } from '../lib/apiClient';
import AuditReportViewer from '../components/AuditReportViewer';
import { INITIAL_AUDIT_REPORTS } from '../lib/mockData';

export default function DashboardPage({ user, onRequestModalOpen }) {
  const [activeTab, setActiveTab] = useState('overview'); // overview, requests, scanner
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  // Security Posture Scan Tool State
  const [targetHost, setTargetHost] = useState('api.epotech.io');
  const [authConfirmed, setAuthConfirmed] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [currentReport, setCurrentReport] = useState(INITIAL_AUDIT_REPORTS[0]);
  const [pastReports, setPastReports] = useState(INITIAL_AUDIT_REPORTS);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    setLoadingRequests(true);
    const data = await getServiceRequests();
    setRequests(data);
    setLoadingRequests(false);
  };

  const handleRunAudit = async (e) => {
    e.preventDefault();
    if (!targetHost) return;
    setScanning(true);
    try {
      const result = await runSecurityAudit(targetHost, authConfirmed);
      setCurrentReport(result);
      setPastReports(prev => [result, ...prev]);
    } catch (err) {
      console.error(err);
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Welcome Header */}
      <div className="glass-panel p-6 rounded-2xl border border-cyber-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-cyber-cyan mb-1">
            <Shield className="w-4 h-4" />
            <span>EPOTECH SECURE CLIENT PORTAL</span>
          </div>
          <h1 className="text-2xl font-bold text-white">
            Welcome back, <span className="text-cyber-cyan">{user?.email ? user.email.split('@')[0] : 'Authorized Client'}</span>
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onRequestModalOpen}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-blue text-black font-semibold text-xs font-mono flex items-center space-x-2 shadow-cyber-cyan hover:opacity-95 transition"
          >
            <Plus className="w-4 h-4 text-black" />
            <span>New Service Scope</span>
          </button>
        </div>
      </div>

      {/* Dashboard Navigation Tabs */}
      <div className="flex border-b border-cyber-border space-x-4 font-mono text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-2 flex items-center space-x-2 transition border-b-2 ${
            activeTab === 'overview' ? 'border-cyber-cyan text-cyber-cyan font-bold' : 'border-transparent text-cyber-muted hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Portal Overview</span>
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`pb-3 px-2 flex items-center space-x-2 transition border-b-2 ${
            activeTab === 'requests' ? 'border-cyber-cyan text-cyber-cyan font-bold' : 'border-transparent text-cyber-muted hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Active Service Engagements ({requests.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('scanner')}
          className={`pb-3 px-2 flex items-center space-x-2 transition border-b-2 ${
            activeTab === 'scanner' ? 'border-cyber-cyan text-cyber-cyan font-bold' : 'border-transparent text-cyber-muted hover:text-white'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Security Posture Scan & Reports</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-cyber-card border border-cyber-border space-y-2">
              <div className="flex justify-between text-xs font-mono text-cyber-muted">
                <span>ACTIVE ENGAGEMENTS</span>
                <Clock className="w-4 h-4 text-cyber-cyan" />
              </div>
              <div className="text-3xl font-extrabold text-white">{requests.length}</div>
              <div className="text-[11px] text-cyber-emerald font-mono">Assigned to Lead Auditors</div>
            </div>

            <div className="p-5 rounded-2xl bg-cyber-card border border-cyber-border space-y-2">
              <div className="flex justify-between text-xs font-mono text-cyber-muted">
                <span>SECURITY GRADE</span>
                <Shield className="w-4 h-4 text-cyber-emerald" />
              </div>
              <div className="text-3xl font-extrabold text-cyber-emerald">{currentReport?.grade || 'A+'}</div>
              <div className="text-[11px] text-cyber-muted font-mono">{currentReport?.overall_score || 94}/100 Posture Rating</div>
            </div>

            <div className="p-5 rounded-2xl bg-cyber-card border border-cyber-border space-y-2">
              <div className="flex justify-between text-xs font-mono text-cyber-muted">
                <span>VERCEL BACKEND STATUS</span>
                <Server className="w-4 h-4 text-cyber-cyan" />
              </div>
              <div className="text-3xl font-extrabold text-cyber-cyan">ONLINE</div>
              <div className="text-[11px] text-cyber-muted font-mono">Python FastAPI Serverless</div>
            </div>
          </div>

          {/* Target Security Posture Quick Launcher */}
          <div className="glass-panel p-6 rounded-2xl border border-cyber-cyan/30 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Terminal className="w-5 h-5 text-cyber-cyan" />
                  <span>Target Security Posture Diagnostic</span>
                </h3>
                <p className="text-xs text-cyber-muted font-mono">
                  Input an authorized target domain or IP to run automated posture checks (ports, headers, SSL)
                </p>
              </div>
            </div>

            <form onSubmit={handleRunAudit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                required
                value={targetHost}
                onChange={(e) => setTargetHost(e.target.value)}
                placeholder="e.g., app.clientdomain.com"
                className="flex-1 px-4 py-3 rounded-xl bg-cyber-bg border border-cyber-border text-white text-sm font-mono focus:border-cyber-cyan focus:outline-none"
              />
              <button
                type="submit"
                disabled={scanning}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-blue text-black font-bold text-xs font-mono flex items-center justify-center space-x-2 shadow-cyber-cyan hover:opacity-95"
              >
                {scanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 text-black animate-spin" />
                    <span>Analyzing Target...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 text-black" />
                    <span>Run Security Posture Audit</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Current Audit Report Visualizer */}
          {currentReport && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-mono flex items-center space-x-2">
                <Activity className="w-5 h-5 text-cyber-cyan" />
                <span>Latest Audit Report Breakdown</span>
              </h3>
              <AuditReportViewer report={currentReport} />
            </div>
          )}

        </div>
      )}

      {/* TAB 2: SERVICE REQUESTS */}
      {activeTab === 'requests' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-white font-mono">Service Engagement Requests</h3>
            <button
              onClick={loadRequests}
              className="p-2 rounded-lg bg-cyber-card border border-cyber-border text-cyber-muted hover:text-white"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req.id} className="p-6 rounded-2xl bg-cyber-card border border-cyber-border hover:border-cyber-cyan/30 transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="px-2.5 py-0.5 rounded bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan font-mono text-[11px]">
                      {req.id}
                    </span>
                    <span className="text-xs font-mono text-cyber-muted">{req.service_type}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                      req.priority === 'critical' ? 'bg-cyber-red/20 text-cyber-red' : 'bg-cyber-amber/20 text-cyber-amber'
                    }`}>
                      {req.priority} Priority
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">{req.title}</h4>
                  <div className="text-xs font-mono text-cyber-muted mt-1">Target: <span className="text-cyber-cyan">{req.target}</span> • Lead: {req.assigned_lead}</div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold ${
                    req.status === 'completed' ? 'bg-cyber-emerald/10 text-cyber-emerald border border-cyber-emerald/30' :
                    req.status === 'in_progress' ? 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30' :
                    'bg-cyber-amber/10 text-cyber-amber border border-cyber-amber/30'
                  }`}>
                    {req.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SCANNER & AUDIT REPORTS */}
      {activeTab === 'scanner' && (
        <div className="space-y-8">
          
          <div className="glass-panel p-6 rounded-2xl border border-cyber-cyan/30 space-y-4">
            <h3 className="text-lg font-bold text-white font-mono">Run Posture Scan</h3>
            <form onSubmit={handleRunAudit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-cyber-muted mb-1">TARGET DOMAIN / HOSTNAME</label>
                <input
                  type="text"
                  required
                  value={targetHost}
                  onChange={(e) => setTargetHost(e.target.value)}
                  placeholder="e.g., api.company.com"
                  className="w-full px-4 py-3 rounded-xl bg-cyber-bg border border-cyber-border text-white text-sm font-mono focus:border-cyber-cyan focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-2 text-xs font-mono text-cyber-muted">
                <input
                  type="checkbox"
                  id="authConfirm"
                  checked={authConfirmed}
                  onChange={(e) => setAuthConfirmed(e.target.checked)}
                  className="rounded border-cyber-border bg-cyber-bg text-cyber-cyan"
                />
                <label htmlFor="authConfirm">
                  I confirm explicit authorization to perform posture diagnostics on target host.
                </label>
              </div>

              <button
                type="submit"
                disabled={scanning}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-blue text-black font-bold text-xs font-mono flex items-center justify-center space-x-2"
              >
                {scanning ? <span>Executing Posture Diagnostics...</span> : <span>Execute Audit Scan</span>}
              </button>
            </form>
          </div>

          {currentReport && <AuditReportViewer report={currentReport} />}
        </div>
      )}

    </div>
  );
}
