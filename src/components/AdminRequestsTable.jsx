import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AdminRequestsTable() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            // Fetch all requests, newest first
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

    // Helper for status badge styling
    const getStatusBadge = (status) => {
        const statusConfig = {
            'in_progress': { color: 'bg-blue-500', text: 'In Progress' },
            'pending': { color: 'bg-amber-500', text: 'Pending Auth' },
            'completed': { color: 'bg-emerald-500', text: 'Completed' },
            'default': { color: 'bg-zinc-500', text: status }
        };
        const config = statusConfig[status?.toLowerCase()] || statusConfig.default;

        return (
            <span className="flex items-center gap-2 text-xs">
                <span className={`w-1.5 h-1.5 rounded-full ${config.color}`}></span>
                {config.text}
            </span>
        );
    };

    return (
        <div className="bg-zinc-950 border border-zinc-800 rounded-sm w-full overflow-hidden text-zinc-100 font-sans">
            {/* Header Panel */}
            <div className="p-5 border-b border-zinc-800 flex justify-between items-center bg-[#0a0a0a]">
                <div>
                    <h2 className="text-lg font-semibold tracking-tight text-zinc-100">Active Telemetry & Requests</h2>
                    <p className="text-xs text-zinc-400 mt-1">Real-time overview of client security audits and service deployments.</p>
                </div>
                <button
                    onClick={fetchRequests}
                    className="text-xs border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 px-3 py-1.5 rounded-sm transition-colors flex items-center gap-2"
                >
                    {loading ? 'Syncing...' : 'Refresh Data'}
                </button>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-[#0a0a0a] text-zinc-400 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="px-5 py-3 font-medium border-b border-zinc-800">Req ID</th>
                            <th className="px-5 py-3 font-medium border-b border-zinc-800">Project / Type</th>
                            <th className="px-5 py-3 font-medium border-b border-zinc-800">Target</th>
                            <th className="px-5 py-3 font-medium border-b border-zinc-800">Status</th>
                            <th className="px-5 py-3 font-medium border-b border-zinc-800">Priority</th>
                            <th className="px-5 py-3 font-medium border-b border-zinc-800">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="px-5 py-8 text-center text-zinc-500 font-mono text-xs animate-pulse">
                                    Establishing secure connection... fetching rows.
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan="6" className="px-5 py-8 text-center text-red-400 text-xs">
                                    Query Failed: {error}
                                </td>
                            </tr>
                        ) : requests.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-5 py-8 text-center text-zinc-500 text-xs">
                                    No active service requests found in the database.
                                </td>
                            </tr>
                        ) : (
                            requests.map((req) => (
                                <tr key={req.id} className="hover:bg-zinc-900/40 transition-colors group">
                                    {/* ID - Monospace */}
                                    <td className="px-5 py-3 font-mono text-xs text-zinc-500 group-hover:text-zinc-400">
                                        {req.id.replace('req_', '...')}
                                    </td>

                                    {/* Title & Type */}
                                    <td className="px-5 py-3">
                                        <div className="font-medium text-zinc-200">{req.title}</div>
                                        <div className="text-xs text-zinc-500 mt-0.5">{req.service_type}</div>
                                    </td>

                                    {/* Target - Monospace highlighting */}
                                    <td className="px-5 py-3 font-mono text-xs text-emerald-400/90">
                                        {req.target}
                                    </td>

                                    {/* Status */}
                                    <td className="px-5 py-3">
                                        {getStatusBadge(req.status)}
                                    </td>

                                    {/* Priority */}
                                    <td className="px-5 py-3 text-xs">
                                        <span className={`px-2 py-0.5 rounded-sm border ${req.priority === 'high' ? 'border-red-900/50 text-red-400 bg-red-950/20' :
                                            'border-zinc-700 text-zinc-400'
                                            }`}>
                                            {req.priority?.toUpperCase()}
                                        </span>
                                    </td>

                                    {/* Timestamp */}
                                    <td className="px-5 py-3 text-xs text-zinc-500 font-mono">
                                        {new Date(req.created_at).toLocaleDateString()} {new Date(req.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

