import React, { useState } from 'react';
import { X, Shield, Send, CheckCircle2 } from 'lucide-react';
import { createServiceRequest } from '../lib/apiClient';

export default function RequestModal({ isOpen, onClose, onRequestCreated }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    title: '',
    service_type: 'Penetration Testing',
    target: '',
    priority: 'high',
    notes: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.target.trim()) return;

    // 1. Retrieve the authenticated user session
    const userStr = localStorage.getItem('epotech_user');
    const currentUser = userStr ? JSON.parse(userStr) : null;

    if (!currentUser) {
      alert("Authentication error: Please log in to submit a request.");
      return;
    }

    setSubmitting(true);
    try {
      // 2. Standardized unified schema object including user linking
      const unifiedPayload = {
        id: `req_${Date.now()}_${Math.floor(100 + Math.random() * 900)}`,
        title: formData.title.trim(),
        service_type: formData.service_type,
        target: formData.target.trim(),
        priority: formData.priority,
        status: 'in_progress',
        assigned_lead: 'Epotech SecOps Team',
        notes: (formData.notes || '').trim(),
        user_id: currentUser.id,
        user_email: currentUser.email
      };

      const res = await createServiceRequest(unifiedPayload);
      setSuccessMsg(true);
      setTimeout(() => {
        setSuccessMsg(false);
        setSubmitting(false);
        setFormData({
          title: '',
          service_type: 'Penetration Testing',
          target: '',
          priority: 'high',
          notes: ''
        });
        if (onRequestCreated) onRequestCreated(res);
        onClose();
      }, 1200);
    } catch (err) {
      console.error('[Epotech Modal] Error dispatching request:', err);
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg p-8 rounded-3xl bg-light/95 border border-border text-white shadow-2xl">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-body border border-border text-text-dark hover:text-white transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-secondary tracking-tight">Scope an Engagement</h3>
            <p className="text-xs text-text-dark">Provide target boundaries and technical specifications for your scope.</p>
          </div>
        </div>

        {successMsg ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold font-secondary text-white">Engagement Request Submitted</h4>
            <p className="text-xs text-text-dark">A security engineer will review your scope parameters and follow up.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-text-dark mb-1.5">Project Name or Scope Summary</label>
              <input
                type="text"
                required
                placeholder="e.g., Q4 API & Web Application Penetration Test"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-full bg-body border border-border text-white placeholder-text-dark/40 focus:border-primary focus:outline-none text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-text-dark mb-1.5">Practice Offering</label>
                <select
                  value={formData.service_type}
                  onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-full bg-body border border-border text-white text-sm focus:border-primary focus:outline-none cursor-pointer"
                >
                  <option value="Penetration Testing">Penetration Testing</option>
                  <option value="Custom Web Development">Custom Web Development</option>
                  <option value="Cloud Security Audit">Cloud Security Audit</option>
                  <option value="Source Code Review">Source Code Review</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-text-dark mb-1.5">Timeline / Urgency</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-full bg-body border border-border text-white text-sm focus:border-primary focus:outline-none cursor-pointer"
                >
                  <option value="critical">Immediate (&lt; 48 hours)</option>
                  <option value="high">High Priority (Within 1 week)</option>
                  <option value="medium">Standard (Within 2–3 weeks)</option>
                  <option value="standard">Flexible Schedule</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-text-dark mb-1.5">Target Host, Domain, or Repository</label>
              <input
                type="text"
                required
                placeholder="e.g., api.yourcompany.com or staging.yourcompany.internal"
                value={formData.target}
                onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                className="w-full px-4 py-2.5 rounded-full bg-body border border-border text-white placeholder-text-dark/40 focus:border-primary focus:outline-none text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-dark mb-1.5">Scope Details & Architecture Notes</label>
              <textarea
                rows={3}
                placeholder="Detail authentication requirements, known third-party dependencies, or staging credentials..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-body border border-border text-white placeholder-text-dark/40 focus:border-primary focus:outline-none text-sm"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full btn btn-primary text-sm py-3 justify-center"
              >
                {submitting ? (
                  <span>Submitting Scope...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Scope for Engineering Review</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}