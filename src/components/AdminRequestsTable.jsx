import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { runSecurityAudit } from '../lib/api';

export default function AdminRequestsTable() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Row-level Diagnostic Scan States
    const [scanningTarget, setScanningTarget] = useState('');
    const [scanResult, setScanResult] = useState('');

    // New Audit Target Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newServiceType, setNewServiceType] = useState('Penetration Testing');
    const [newTarget, setNewTarget] = useState('');
    const [newPriority, setNewPriority] = useState('high');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchRequests();

        // Initialize Supabase Realtime Channel for live database synchronization
        const channel = supabase
            .channel('public:service_requests')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'service_requests' },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setRequests((prev) => [payload.new, ...prev]);
                    } else if (payload.eventType === 'UPDATE') {
                        setRequests((prev) =>
                            prev.map((req) => (req.id === payload.new.id ? payload.new : req))
                        );
                    } else if (payload.eventType === 'DELETE') {
                        setRequests((prev) => prev.filter((req) => req.id !== payload.old.id));
                    }
                }
            )
            .subscribe();

        // Cleanup subscription on component unmount
        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('service_requests')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setRequests(data);
        } catch (err) {
            console.error("Failed to fetch requests:", err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRunScan = async (target) => {
        try {
            setScanningTarget(target);
            setScanResult(null);

            const data = await runSecurityAudit(target);
            setScanResult(data);
        } catch (err) {
            alert(`Scan Error: ${err.message}`);
        } finally {
            setScanningTarget('');
        }
    };

    const handleCreateRequest = async (e) => {
        e.preventDefault();
        if (!newTitle || !newTarget) {
            alert('Please fill out all required fields.');
            return;
        }

        try {
            setIsSubmitting(true);
            const { error } = await supabase
                .from('service_requests')
                .insert([
                    {
                        id: `req_${Date.now()}`,
                        title: newTitle,
                        service_type: newServiceType,
                        target: newTarget,
                        priority: newPriority,
                        status: 'in_progress',
                        created_at: new Date().toISOString(),
                        assigned_lead: 'Epotech SecOps Team',
                        notes: 'Initiated via command center modal'
                    }
                ]);

            if (error) throw error;

            // Reset form and close modal
            setNewTitle('');
            setNewTarget('');
            setIsModalOpen(false);
        } catch (err) {
            alert(`Failed to create request: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            'in_progress': { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', dot: 'bg-blue-500', label: 'Active Audit' },
            'pending': { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', dot: 'bg-amber-500', label: 'Awaiting Auth' },
            'completed': { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', dot: 'bg-emerald-500', label: 'Secured' },
            'default': { bg: 'bg-zinc-800/50', border: 'border-zinc-700', text: 'text-zinc-400', dot: 'bg-zinc-500', label: status }
        };
        const config = statusConfig[status?.toLowerCase()] || statusConfig.default;

        return (
            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md border ${config.bg} ${config.border} ${config.text} text-[11px] font-medium tracking-wide uppercase`}>
                <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
                {config.label}
            </span>
        );
    };

    const filteredRequests = requests.filter(req =>
        req.target?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.id?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-300 p-4 md:p-8 font-sans selection:bg-emerald-500/30">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Platform Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end pb-6 border-b border-zinc-800/80 gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="w-2 h-2 bg-emerald-500 rounded-sm animate-pulse"></div>
                            <h1 className="text-xl font-semibold tracking-tight text-zinc-100">Epotech Command Center</h1>
                        </div>
                        <p className="text-sm text-zinc-500">B2B Telemetry & Vulnerability Research Deployment</p>
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
                                <p className="text-xs text-zinc-400">Resolved IP: {scanResult.resolved_ip} | Grade: <span className="text-emerald-400 font-bold">{scanResult.grade}</span> ({scanResult.overall_score}/100)</p>
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
                                <span className="text-zinc-200">{scanResult.ssl_info.protocol} ({scanResult.ssl_info.cipher})</span>
                            </div>
                            <div className="bg-[#09090b] p-3 rounded border border-zinc-800">
                                <span className="text-zinc-500 block mb-1">Scan Duration</span>
                                <span className="text-zinc-200">{scanResult.scan_duration_ms} ms</span>
                            </div>
                            <div className="bg-[#09090b] p-3 rounded border border-zinc-800">
                                <span className="text-zinc-500 block mb-1">Medium Vulnerabilities</span>
                                <span className="text-amber-400">{scanResult.summary.medium_vulnerabilities} detected</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* New Audit Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-[#121214] border border-zinc-800 rounded-xl max-w-md w-full p-6 space-y-6 shadow-2xl">
                            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                                <h3 className="text-base font-semibold text-zinc-100 font-mono">Initialize New Audit Engagement</h3>
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
                                        className="w-full bg-[#09090b] border border-zinc-800 rounded px-3 py-2 text-zinc-200 focus:outline-none focus:border-emerald-500"
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
                                        <option value="high">High Priority</option>
                                        <option value="medium">Medium Priority</option>
                                        <option value="low">Standard Priority</option>
                                    </select>
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
                                    filteredRequests.map((req) => (
                                        <tr key={req.id} className="hover:bg-zinc-900/30 transition-colors group">
                                            <td className="px-6 py-4 font-mono text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
                                                {req.id.replace('req_', '').substring(0, 8)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-zinc-200">{req.title}</div>
                                                <div className="text-xs text-zinc-500 mt-0.5">{req.service_type || 'Web Security Testing'}</div>
                                            </td>
                                            <td className="px-6 py-4 font-mono text-xs text-emerald-400/80">
                                                {req.target}
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(req.status)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider ${req.priority === 'high'
                                                    ? 'text-red-400 bg-red-400/10 border border-red-400/20'
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
                                                {new Date(req.created_at).toLocaleString('en-US', {
                                                    month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false
                                                })}
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