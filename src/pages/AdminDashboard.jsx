import React from 'react';
import AdminRequestsTable from '../components/AdminRequestsTable';

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-[#09090b]">
            <AdminRequestsTable />
        </div>
    );
}