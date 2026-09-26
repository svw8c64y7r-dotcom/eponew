import React from 'react';
import ComprehensiveScanner from '../components/ComprehensiveScanner';

export default function ClientDashboard() {
    return (
        <div className="p-8 space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-white font-mono">Client Dashboard</h1>
                <p className="text-sm text-cyber-muted font-mono">Welcome to the Epotech Client Portal. View your security grades and submit new scopes here.</p>
            </div>

            {/* Multi-Vector Security Scanner Integration */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-white font-mono">Security Operations & Reconnaissance</h2>
                <ComprehensiveScanner />
            </div>
        </div>
    );
}