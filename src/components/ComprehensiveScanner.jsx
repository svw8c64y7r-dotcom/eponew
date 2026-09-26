import React, { useState } from 'react';
import { Terminal, Server, Cpu, AlertTriangle, RefreshCw, Globe, FileText, CheckCircle2, Copy, Check } from 'lucide-react';
import { runComprehensiveScan } from '../lib/apiClient';

export default function ComprehensiveScanner() {
    const [target, setTarget] = useState('epoteck.com');
    const [scanning, setScanning] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    const handleScan = async (e) => {
        e.preventDefault();
        if (!target.trim()) return;

        setScanning(true);
        setError(null);
        setResults(null);
        try {
            const data = await runComprehensiveScan(target.trim());
            setResults(data);
        } catch (err) {
            setError(err.message || 'Failed to complete security scan.');
        } finally {
            setScanning(false);
        }
    };

    const copyReportJSON = () => {
        if (!results) return;
        navigator.clipboard.writeText(JSON.stringify(results, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            {/* Scan Control Panel */}
            <div className="glass-panel p-6 rounded-2xl border border-cyber-cyan/30 bg-[#0c0c0e]">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
                        <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white font-mono">Multi-Vector Reconnaissance Scanner</h3>
                        <p className="text-xs text-cyber-muted font-mono">Port Scan • Web Application Audit • Security Headers • SSL Inspection</p>
                    </div>
                </div>

                <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        required
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        placeholder="e.g. app.target.com or 192.168.1.1"
                        className="flex-1 px-4 py-3 rounded-xl bg-cyber-bg border border-cyber-border text-white text-sm font-mono focus:border-cyber-cyan focus:outline-none"
                    />
                    <button
                        type="submit"
                        disabled={scanning}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-blue text-black font-bold text-xs font-mono flex items-center justify-center space-x-2 shadow-cyber-cyan hover:opacity-95 transition"
                    >
                        {scanning ? (
                            <>
                                <RefreshCw className="w-4 h-4 text-black animate-spin" />
                                <span>Executing Vector Scan...</span>
                            </>
                        ) : (
                            <>
                                <Terminal className="w-4 h-4 text-black" />
                                <span>Execute Multi-Scan</span>
                            </>
                        )}
                    </button>
                </form>
            </div>

            {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{error}</span>
                </div>
            )}

            {/* Results & Report Display */}
            {results && (
                <div className="space-y-6">

                    {/* Report Header & Action Bar */}
                    <div className="p-4 rounded-xl bg-[#121214] border border-cyber-cyan/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-cyber-cyan" />
                            <div>
                                <h4 className="text-sm font-bold text-white font-mono">Reconnaissance Audit Report</h4>
                                <p className="text-xs text-cyber-muted font-mono">Target: <span className="text-cyber-cyan">{results.target}</span></p>
                            </div>
                        </div>
                        <button
                            onClick={copyReportJSON}
                            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono flex items-center space-x-2 transition border border-zinc-700"
                        >
                            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-zinc-400" />}
                            <span>{copied ? 'Report Copied!' : 'Export JSON Report'}</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Card 1: Open Ports & Network Services */}
                        <div className="p-5 rounded-2xl bg-[#121214] border border-cyber-border space-y-4">
                            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                                <h4 className="text-sm font-bold text-white font-mono flex items-center space-x-2">
                                    <Server className="w-4 h-4 text-cyber-cyan" />
                                    <span>Open Ports & Services</span>
                                </h4>
                                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
                                    {results.port_scan?.open_ports_count || 0} Open Ports
                                </span>
                            </div>

                            <div className="space-y-2 max-h-60 overflow-y-auto font-mono text-xs">
                                {results.port_scan?.open_ports?.length === 0 ? (
                                    <div className="text-zinc-500 text-center py-6">No standard open ports discovered.</div>
                                ) : (
                                    results.port_scan?.open_ports?.map((p) => (
                                        <div key={p.port} className="flex justify-between items-center p-2.5 rounded bg-[#09090b] border border-zinc-800">
                                            <span className="text-emerald-400 font-bold">PORT {p.port}</span>
                                            <span className="text-zinc-300">{p.service}</span>
                                            <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                {p.status}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Card 2: Web & SSL Diagnostic */}
                        <div className="p-5 rounded-2xl bg-[#121214] border border-cyber-border space-y-4">
                            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                                <h4 className="text-sm font-bold text-white font-mono flex items-center space-x-2">
                                    <Globe className="w-4 h-4 text-cyber-cyan" />
                                    <span>Target Web Diagnostic</span>
                                </h4>
                                <span className={`text-xs font-mono px-2 py-0.5 rounded border ${results.website_scan?.ssl_valid
                                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                                    }`}>
                                    {results.website_scan?.ssl_valid ? 'SSL VALID' : 'SSL INVALID / NO HTTPS'}
                                </span>
                            </div>

                            <div className="space-y-3 font-mono text-xs">
                                <div className="flex justify-between p-2 rounded bg-[#09090b]">
                                    <span className="text-zinc-500">HTTP Status:</span>
                                    <span className="text-white font-bold">{results.website_scan?.status_code || 'N/A'}</span>
                                </div>

                                <div className="flex justify-between p-2 rounded bg-[#09090b]">
                                    <span className="text-zinc-500">Server Banner:</span>
                                    <span className="text-cyber-cyan">{results.website_scan?.server_header || 'Hidden'}</span>
                                </div>

                                {/* Missing Security Headers Warning */}
                                <div>
                                    <span className="text-zinc-400 block mb-1">Missing Security Headers:</span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {results.website_scan?.missing_security_headers?.length === 0 ? (
                                            <span className="text-emerald-400 text-[10px]">All critical security headers present.</span>
                                        ) : (
                                            results.website_scan?.missing_security_headers?.map((h) => (
                                                <span key={h} className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px]">
                                                    {h}
                                                </span>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}