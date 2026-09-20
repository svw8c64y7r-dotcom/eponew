import React from 'react';
import AdminRequestsTable from '../components/AdminRequestsTable'; // Adjust path if needed

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-zinc-950 p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                    <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Epotech <span className="text-blue-500">Command Center</span></h1>
                    <span className="text-xs text-zinc-500 font-mono">ADMIN_SESSION_ACTIVE</span>
                </div>

                {/* Render the table here */}
                <AdminRequestsTable />
            </div>
        </div>
    );
}