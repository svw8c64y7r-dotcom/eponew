import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AdminRequestsTable() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchRequests();
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
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Search targets or IDs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-[#121214] border border-zinc-800 text-sm rounded-md px-3 py-1.5 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 w-full md:w-64 transition-all"
                        />
                        <button
                            onClick={fetchRequests}
                            disabled={loading}
                            className="text-xs font-medium border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 px-4 py-2 rounded-md transition-colors flex items-center gap-2 whitespace-nowrap text-zinc-300"
                        >
                            {loading ? 'Syncing...' : 'Refresh'}
                        </button>
                    </div>
                </header>

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
                                    <th className="px-6 py-4 font-medium">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/50">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center gap-2 text-zinc-500">
                                                <div className="w-4 h-4 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                                                <span className="font-mono text-xs">Negotiating handshake...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-red-400/90 text-xs bg-red-950/10">
                                            ERR_CONNECTION: {error}
                                        </td>
                                    </tr>
                                ) : filteredRequests.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-zinc-600 text-sm">
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