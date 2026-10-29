import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Key, ArrowRight, UserPlus, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import * as Sentry from '@sentry/react';

export default function AuthPage({ onAuthSuccess }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);

  // DEV-ONLY: demo session helper — role is always 'client'; never grants admin via email heuristic.
  // In production, roles are set server-side via Supabase Admin API in app_metadata.
  const setDemoSession = (userEmail) => {
    const mockUser = {
      id: 'user_demo_client',
      email: userEmail,
      app_metadata: { role: 'client' },
      user_metadata: {}
    };
    localStorage.setItem('epotech_user', JSON.stringify(mockUser));
    if (onAuthSuccess) onAuthSuccess(mockUser);
    navigate('/dashboard');
  };

  const handleQuickLogin = (userEmail) => {
    // Guard: demo persona buttons are only enabled in development builds.
    if (!import.meta.env.DEV) return;
    setLoading(true);
    setTimeout(() => {
      setDemoSession(userEmail);
      setLoading(false);
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);

    if (isSupabaseConfigured) {
      try {
        if (isLogin) {
          const { data, error: sbError } = await supabase.auth.signInWithPassword({ email, password });
          if (sbError) throw sbError;
          if (data && data.user) {
            localStorage.setItem('epotech_user', JSON.stringify(data.user));
            if (onAuthSuccess) onAuthSuccess(data.user);
            // Route is determined by server-assigned role in app_metadata — NEVER from email content.
            const serverRole = data.user?.app_metadata?.role || data.user?.user_metadata?.role || 'client';
            navigate(serverRole === 'admin' ? '/admin' : '/dashboard');
            return;
          }
        } else {
          const { error: sbError } = await supabase.auth.signUp({ email, password });
          if (sbError) throw sbError;
          setNotice('Registration received. Please verify your email or sign in.');
          setIsLogin(true);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('[Epotech Auth] Supabase call failed or host unreachable:', err);
        const errMsg = err?.message || '';
        if (errMsg.includes('Failed to fetch') || errMsg.includes('NetworkError') || errMsg.includes('getaddrinfo')) {
                  // SECURITY: Never grant a session on a network error.
          // A network failure must be treated as an authentication error — not an offline login opportunity.
          setError('Authentication service is temporarily unreachable. Please check your connection and try again.');
          setLoading(false);
          return;
        }
        setError(errMsg || 'Authentication failed. Please verify credentials.');
        // Log authentication failures to Sentry for monitoring (no credentials logged).
        Sentry.captureEvent({
          message: 'Authentication failure',
          level: 'warning',
          tags: { component: 'AuthPage', action: isLogin ? 'login' : 'register' },
          extra: { email_domain: email.split('@')[1] || 'unknown', error_type: errMsg || 'unknown' }
        });
        setLoading(false);
        return;
      }
    }

    // Supabase is not configured — only allow demo login in development.
    // Production must have a valid Supabase configuration; never grant sessions without it.
    if (import.meta.env.PROD) {
      setError('Authentication service is not configured. Please contact the administrator.');
      setLoading(false);
      return;
    }
    // DEV only: allow demo session for local development convenience.
    setTimeout(() => {
      setDemoSession(email || 'client@epotech.io');
      setLoading(false);
    }, 400);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-light/95 p-8 rounded-3xl border border-border shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold font-secondary text-white tracking-tight">
            {isLogin ? 'Sign in to Epotech Portal' : 'Register Authorized Client'}
          </h2>
          <p className="text-xs text-text-dark">
            {isLogin ? 'Access active security engagements, reports, and audit telemetry.' : 'Create an account to submit new application testing scopes.'}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-2xl bg-secondary/10 border border-secondary/30 text-secondary text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {notice && (
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-text-dark font-medium mb-1.5">Work Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-text-dark absolute left-4 top-3" />
              <input
                type="email"
                required
                placeholder="developer@yourcompany.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-body border border-border text-white text-sm placeholder-text-dark/40 focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-text-dark font-medium mb-1.5">Password</label>
            <div className="relative">
              <Key className="w-4 h-4 text-text-dark absolute left-4 top-3" />
              <input
                type="password"
                required
                minLength={6}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-body border border-border text-white text-sm placeholder-text-dark/40 focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary text-sm py-3 justify-center"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : isLogin ? (
              <>
                <Lock className="w-4 h-4" />
                <span>Continue to Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Create Client Profile</span>
              </>
            )}
          </button>
        </form>

        {/* Toggle Login/Signup */}
        <div className="pt-4 border-t border-border text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
              setNotice(null);
            }}
            className="text-xs text-primary hover:underline cursor-pointer"
          >
            {isLogin ? "Don't have an authorized profile? Register here" : "Already registered? Sign in here"}
          </button>
        </div>

        {/* One-Click Fast Access — DEV ONLY. Hidden entirely in production builds. */}
        {import.meta.env.DEV && (
        <div className="pt-4 border-t border-border space-y-2.5">
          <div className="text-center text-[11px] text-text-dark font-medium">
            Demo Portal Access (Select a persona to test)
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleQuickLogin('admin@epotech.com')}
              className="py-2 px-3 rounded-full bg-body border border-border hover:border-primary/50 text-text-light text-xs flex items-center justify-center space-x-1.5 transition cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>Admin Persona</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('client@epotech.io')}
              className="py-2 px-3 rounded-full bg-body border border-border hover:border-primary/50 text-text-light text-xs flex items-center justify-center space-x-1.5 transition cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-text-dark" />
              <span>Client Persona</span>
            </button>
          </div>
        </div>
        )}

      </div>
    </div>
  );
}
