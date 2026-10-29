import React from 'react';
import AdminRequestsTable from '../components/AdminRequestsTable';
import ComprehensiveScanner from '../components/ComprehensiveScanner';

// Simple overview cards for admin metrics – placeholder values
function AdminOverview() {
  const stats = [
    { label: 'Total Scans', value: 128, icon: '🛡️' },
    { label: 'Active Targets', value: 7, icon: '🌐' },
    { label: 'Pending Reviews', value: 3, icon: '📄' },
    { label: 'SecOps Alerts', value: 2, icon: '⚙️' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {stats.map((s) => (
        <div key={s.label} className="p-5 rounded-2xl bg-[#121214] border border-cyber-border flex items-center space-x-4">
          <span className="text-2xl">{s.icon}</span>
          <div>
            <div className="text-sm font-medium text-white">{s.label}</div>
            <div className="text-2xl font-bold text-cyber-cyan">{s.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-body text-text p-6">
      {/* Admin overview cards */}
      <AdminOverview />
      {/* Comprehensive security scanner */}
      <div className="my-8">
        <ComprehensiveScanner />
      </div>
      {/* Requests table */}
      <AdminRequestsTable />
    </div>
  );
}