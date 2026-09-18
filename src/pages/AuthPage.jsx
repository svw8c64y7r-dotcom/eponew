import React, { useState } from 'react';
import { Lock, Mail, Key, Shield, ArrowRight, UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

export default function AuthPage({ onAuthSuccess, setActiveTab }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);

    // If Supabase is configured, execute real Auth
    if (isSupabaseConfigured) {
      try {
        if (isLogin) {
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;
          onAuthSuccess(data.user);
          setActiveTab('dashboard');
        } else {
          const { data, error } = await supabase.auth.signUp({ email, password });
          if (error) throw error;
          setNotice('Registration successful! Please check your email for confirmation or sign in.');
          setIsLogin(true);
        }
      } catch (err) {
        setError(err.message || 'Authentication failed. Please verify credentials.');
      } finally {
        setLoading(false);
      }
      return;
    }

    // Client session fallback when Supabase keys are not set
    setTimeout(() => {
      const mockUser = {
        id: `user_${Math.floor(100 + Math.random() * 900)}`,
        email: email || 'secops.client@epotech.io',
        role: 'Authenticated Client',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.epotech.mock.token'
      };
      onAuthSuccess(mockUser);
      setLoading(false);
      setActiveTab('dashboard');
    }, 800);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="glass-panel-glow p-8 rounded-3xl border border-cyber-cyan/30 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-cyber-cyan/10 border border-cyber-cyan/40 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6 text-cyber-cyan" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {isLogin ? 'Client Portal Sign In' : 'Register Authorized Client'}
          </h2>
          <p className="text-xs text-cyber-muted font-mono">
            {isLogin ? 'Access your active audits & service requests' : 'Create an account to submit pentest engagements'}
          </p>
        </div>

        {/* Supabase Status Indicator */}
        <div className="p-2.5 rounded-lg bg-cyber-bg border border-cyber-border text-center font-mono text-[11px] text-cyber-muted">
          {isSupabaseConfigured ? (
            <span className="text-cyber-emerald flex items-center justify-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Supabase Auth Engine Active</span>
            </span>
          ) : (
            <span className="text-cyber-cyan">
              Demo Client Access Mode (Fast Login Active)
            </span>
          )}
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-cyber-red/10 border border-cyber-red/30 text-cyber-red text-xs font-mono flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {notice && (
          <div className="p-3 rounded-lg bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald text-xs font-mono flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          <div>
            <label className="block text-xs font-mono text-cyber-muted mb-1">WORK EMAIL</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-cyber-muted absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="secops@yourcompany.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cyber-bg border border-cyber-border text-white text-sm placeholder-cyber-muted/50 focus:border-cyber-cyan focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-cyber-muted mb-1">PASSWORD</label>
            <div className="relative">
              <Key className="w-4 h-4 text-cyber-muted absolute left-3.5 top-3" />
              <input
                type="password"
                required
                minLength={6}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cyber-bg border border-cyber-border text-white text-sm placeholder-cyber-muted/50 focus:border-cyber-cyan focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-blue text-black font-bold text-sm flex items-center justify-center space-x-2 shadow-cyber-cyan hover:opacity-95 transition"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : isLogin ? (
              <>
                <Lock className="w-4 h-4 text-black" />
                <span>Sign In to Portal</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 text-black" />
                <span>Create Client Account</span>
              </>
            )}
          </button>
        </form>

        {/* Toggle Login/Signup */}
        <div className="pt-4 border-t border-cyber-border/60 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
              setNotice(null);
            }}
            className="text-xs font-mono text-cyber-cyan hover:underline"
          >
            {isLogin ? "Don't have an account? Register client profile" : "Already registered? Sign in here"}
          </button>
        </div>

      </div>
    </div>
  );
}
