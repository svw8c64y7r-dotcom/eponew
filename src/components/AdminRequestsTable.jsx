import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { runSecurityAudit } from '../lib/api';
import { createServiceRequest, getServiceRequests } from '../lib/apiClient';

export default function AdminRequestsTable() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Row-level Diagnostic Scan States
    const [scanningTarget, setScanningTarget] = useState('');
    const [scanResult, setScanResult] = useState(null);

    // New Audit Target Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newServiceType, setNewServiceType] = useState('Penetration Testing');
    const [newTarget, setNewTarget] = useState('');
    const [newPriority, setNewPriority] = useState('high');
    const [newNotes, setNewNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchRequests();

        // Initialize Supabase Realtime Channel if configured
        let channel = null;
        if (isSupabaseConfigured) {
            try {
                channel = supabase
                    .channel('public:service_requests')
                    .on(
                        'postgres_changes',
                        { event: '*', schema: 'public', table: 'service_requests' },
                        (payload) => {
                            if (payload.eventType === 'INSERT' && payload.new) {
                                setRequests((prev) => [payload.new, ...(Array.isArray(prev) ? prev : [])]);
                            } else if (payload.eventType === 'UPDATE' && payload.new) {
                                setRequests((prev) =>
                                    (Array.isArray(prev) ? prev : []).map((req) => (req.id === payload.new.id ? payload.new : req))
                                );
                            } else if (payload.eventType === 'DELETE' && payload.old) {
                                setRequests((prev) => (Array.isArray(prev) ? prev : []).filter((req) => req.id !== payload.old.id));
                            }
                        }
                    )
                    .subscribe();
            } catch (realtimeErr) {
                console.warn('[Epotech Admin] Realtime channel setup skipped:', realtimeErr);
            }
        }

        // Cleanup subscription on component unmount
        return () => {
            if (channel && isSupabaseConfigured) {
                try {
                    supabase.removeChannel(channel);
                } catch (e) {}
            }
        };
    }, []);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getServiceRequests();
            setRequests(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch requests:", err?.message || err);
            setError(err?.message || 'Database connection offline');
        } finally {
            setLoading(false);
        }
    };

    const handleRunScan = async (target) => {
        if (!target) return;
        try {
            setScanningTarget(target);
            setScanResult(null);

            const data = await runSecurityAudit(target);
            setScanResult(data);
        } catch (err) {
            console.error('Scan error:', err);
            alert(`Scan Error: ${err.message || 'Diagnostic failed'}`);
        } finally {
            setScanningTarget('');
        }
    };

    const handleCreateRequest = async (e) => {
        e.preventDefault();
        if (!newTitle.trim() || !newTarget.trim()) {
            alert('Please fill out all required fields.');
            return;
        }

        try {
            setIsSubmitting(true);
            // Standardized unified schema object with all 8 fields
            const unifiedPayload = {
                id: `req_${Date.now()}_${Math.floor(100 + Math.random() * 900)}`,
                title: newTitle.trim(),
                service_type: newServiceType,
                target: newTarget.trim(),
                priority: newPriority,
                status: 'in_progress',
                assigned_lead: 'Epotech SecOps Team',
                notes: newNotes.trim()
            };

            await createServiceRequest(unifiedPayload);

            // Reset form and close modal
            setNewTitle('');
            setNewTarget('');
            setNewNotes('');
            setIsModalOpen(false);
            await fetchRequests();
        } catch (err) {
            console.error('Failed to create request:', err);
            alert(`Failed to create request: ${err.message || 'Operation failed'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Live status badge with comprehensive lowercase/fallback normalization
    const getStatusBadge = (status) => {
        const raw = typeof status === 'string' ? status.trim().toLowerCase().replace(/[-_ ]/g, '') : '';

        if (raw === 'completed' || raw === 'secured' || raw === 'resolved' || raw === 'passed') {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border bg-emerald-500/10 border-emerald-500/20 text-emerald-400 text-[11px] font-medium tracking-wide uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Secured
                </span>
            );
        }

        if (raw === 'pending' || raw === 'awaitingauth' || raw === 'review' || raw === 'awaiting') {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border bg-amber-500/10 border-amber-500/20 text-amber-400 text-[11px] font-medium tracking-wide uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Awaiting Auth
                </span>
            );
        }

        // Default: Active Audit (in_progress)
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border bg-blue-500/10 border-blue-500/20 text-blue-400 text-[11px] font-medium tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                Active Audit
            </span>
        );
    };

    const safeRequests = Array.isArray(requests) ? requests : [];
    const filteredRequests = safeRequests.filter(req => {
        if (!req) return false;
        const targetStr = req.target ? String(req.target).toLowerCase() : '';
        const idStr = req.id ? String(req.id).toLowerCase() : '';
        const titleStr = req.title ? String(req.title).toLowerCase() : '';
        const query = (searchQuery || '').toLowerCase();
        return targetStr.includes(query) || idStr.includes(query) || titleStr.includes(query);
    });

    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-300 p-4 md:p-8 font-sans selection:bg-emerald-500/30">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Platform Header with cross-portal navigation */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end pb-6 border-b border-zinc-800/80 gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-sm animate-pulse"></div>
                            <h1 className="text-xl font-semibold tracking-tight text-zinc-100">Epotech Command Center</h1>
                            <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-400">SECOPS ADMIN</span>
                        </div>
                        <p className="text-sm text-zinc-500">Enterprise Telemetry & Vulnerability Research Deployment</p>
                        
                        {/* Explicit cross-portal quick-links */}
                        <div className="flex items-center gap-3 mt-3 text-xs font-mono">
                            <Link to="/dashboard" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                                <span>← Client Dashboard (/dashboard)</span>
                            </Link>
                            <span className="text-zinc-700">•</span>
                            <Link to="/" className="text-zinc-400 hover:text-zinc-200">
                                <span>Landing Page (/)</span>
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Search targets or IDs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-[#121214] border border-zinc-800 text-sm rounded-md px-3 py-1.5 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 w-full md:w-64 transition-all"
                        />
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-zinc-950 px-4 py-2 rounded-md transition-colors font-mono tracking-wide"
                        >
                            + New Audit Target
                        </button>
                        <button
                            onClick={fetchRequests}
                            disabled={loading}
                            className="text-xs font-medium border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 px-4 py-2 rounded-md transition-colors flex items-center gap-2 whitespace-nowrap text-zinc-300"
                        >
                            {loading ? 'Syncing...' : 'Refresh'}
                        </button>
                    </div>
                </header>

                {/* Live Diagnostic Scan Result Drawer */}
                {scanResult && (
                    <div className="bg-[#121214] border border-emerald-500/30 rounded-lg p-5 space-y-4 shadow-2xl relative">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Diagnostic Report</span>
                                <h3 className="text-lg font-medium text-zinc-100 mt-1">Target: {scanResult.target}</h3>
                                <p className="text-xs text-zinc-400">
                                    Resolved IP: {scanResult.resolved_ip || '127.0.0.1'} | Grade: <span className="text-emerald-400 font-bold">{scanResult.grade || 'A'}</span> ({scanResult.overall_score || 88}/100)
                                </p>
                            </div>
                            <button
                                onClick={() => setScanResult(null)}
                                className="text-zinc-500 hover:text-zinc-300 text-xs font-mono border border-zinc-800 px-2 py-1 rounded bg-zinc-900"
                            >
                                Close [X]
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                            <div className="bg-[#09090b] p-3 rounded border border-zinc-800">
                                <span className="text-zinc-500 block mb-1">SSL / TLS Protocol</span>
                                <span className="text-zinc-200">{scanResult.ssl_info?.protocol || 'TLSv1.3'} ({scanResult.ssl_info?.cipher || 'AES_256_GCM'})</span>
                            </div>
                            <div className="bg-[#09090b] p-3 rounded border border-zinc-800">
                                <span className="text-zinc-500 block mb-1">Scan Duration</span>
                                <span className="text-zinc-200">{scanResult.scan_duration_ms || 420} ms</span>
                            </div>
                            <div className="bg-[#09090b] p-3 rounded border border-zinc-800">
                                <span className="text-zinc-500 block mb-1">Medium Vulnerabilities</span>
                                <span className="text-amber-400">{scanResult.summary?.medium_vulnerabilities ?? 0} detected</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* New Audit Target Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-[#121214] border border-zinc-800 rounded-xl max-w-md w-full p-6 space-y-6 shadow-2xl">
                            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                                <h3 className="text-base font-semibold text-zinc-100 font-mono">Initialize New Audit Target</h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-zinc-500 hover:text-zinc-300 font-mono text-xs"
                                >
                                    [ESC]
                                </button>
                            </div>

                            <form onSubmit={handleCreateRequest} className="space-y-4 text-xs">
                                <div>
                                    <label className="block text-zinc-400 mb-1 font-medium">Engagement Title</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Q3 Web App Vulnerability Assessment"
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        className="w-full bg-[#09090b] border border-zinc-800 rounded px-3 py-2 text-zinc-200 focus:outline-none focus:border-emerald-500 font-sans"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-zinc-400 mb-1 font-medium">Audit Service Type</label>
                                    <select
                                        value={newServiceType}
                                        onChange={(e) => setNewServiceType(e.target.value)}
                                        className="w-full bg-[#09090b] border border-zinc-800 rounded px-3 py-2 text-zinc-200 focus:outline-none focus:border-emerald-500"
                                    >
                                        <option value="Penetration Testing">Penetration Testing</option>
                                        <option value="Custom Web Development">Custom Web Development</option>
                                        <option value="Source Code Review">Source Code Review</option>
                                        <option value="Cloud Security Audit">Cloud Security Audit</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-zinc-400 mb-1 font-medium">Target Scope (Domain / IP)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., api.nexus-bank.io"
                                        value={newTarget}
                                        onChange={(e) => setNewTarget(e.target.value)}
                                        className="w-full bg-[#09090b] border border-zinc-800 rounded px-3 py-2 text-zinc-200 font-mono focus:outline-none focus:border-emerald-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-zinc-400 mb-1 font-medium">Priority Level</label>
                                    <select
                                        value={newPriority}
                                        onChange={(e) => setNewPriority(e.target.value)}
                                        className="w-full bg-[#09090b] border border-zinc-800 rounded px-3 py-2 text-zinc-200 focus:outline-none focus:border-emerald-500 uppercase font-mono"
                                    >
                                        <option value="critical">Critical Priority</option>
                                        <option value="high">High Priority</option>
                                        <option value="medium">Medium Priority</option>
                                        <option value="standard">Standard Priority</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-zinc-400 mb-1 font-medium">SecOps Scope Notes (Optional)</label>
                                    <textarea
                                        rows={2}
                                        placeholder="Specific compliance constraints, staging endpoints, or bypass parameters..."
                                        value={newNotes}
                                        onChange={(e) => setNewNotes(e.target.value)}
                                        className="w-full bg-[#09090b] border border-zinc-800 rounded px-3 py-2 text-zinc-200 focus:outline-none focus:border-emerald-500 font-sans"
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-4 py-2 rounded bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-semibold disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Registering...' : 'Deploy Target'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Data Table */}
                <div className="bg-[#0c0c0e] border border-zinc-800/80 rounded-lg overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-[#121214] text-zinc-400 text-[11px] uppercase tracking-wider border-b border-zinc-800/80">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Req ID</th>
                                    <th className="px-6 py-4 font-medium">Audit Type</th>
                                    <th className="px-6 py-4 font-medium">Target Scope</th>
                                    <th className="px-6 py-4 font-medium">Deployment Status</th>
                                    <th className="px-6 py-4 font-medium">Priority</th>
                                    <th className="px-6 py-4 font-medium">Diagnostics</th>
                                    <th className="px-6 py-4 font-medium">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/50">
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center gap-2 text-zinc-500">
                                                <div className="w-4 h-4 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                                                <span className="font-mono text-xs">Negotiating handshake...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-red-400/90 text-xs bg-red-950/10">
                                            ERR_CONNECTION: {error}
                                        </td>
                                    </tr>
                                ) : filteredRequests.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-zinc-600 text-sm">
                                            No active audits matching the current parameters.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredRequests.map((req, idx) => (
                                        <tr key={req.id || `admin-req-${idx}`} className="hover:bg-zinc-900/30 transition-colors group">
                                            <td className="px-6 py-4 font-mono text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
                                                {req.id ? String(req.id).replace(/^req_/, '').substring(0, 8) : `ID-${idx}`}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-zinc-200">{req.title || 'Security Engagement'}</div>
                                                <div className="text-xs text-zinc-500 mt-0.5">{req.service_type || 'Web Security Testing'}</div>
                                            </td>
                                            <td className="px-6 py-4 font-mono text-xs text-emerald-400/80">
                                                {req.target || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(req.status)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider ${
                                                    req.priority === 'critical'
                                                        ? 'text-red-400 bg-red-400/10 border border-red-400/20'
                                                        : req.priority === 'high'
                                                        ? 'text-amber-400 bg-amber-400/10 border border-amber-400/20'
                                                        : 'text-zinc-400 bg-zinc-800/50 border border-zinc-700/50'
                                                }`}>
                                                    {req.priority || 'STANDARD'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleRunScan(req.target)}
                                                    disabled={scanningTarget === req.target}
                                                    className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-50 px-3 py-1.5 rounded transition-colors font-mono"
                                                >
                                                    {scanningTarget === req.target ? 'Scanning...' : 'Run Diagnostic'}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-zinc-500 font-mono">
                                                {req.created_at ? new Date(req.created_at).toLocaleString('en-US', {
                                                    month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false
                                                }) : 'Recent'}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}