-- ========================================================
-- Epotech Cybersecurity Platform - Supabase Database Schema
-- Execute this SQL script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ========================================================

-- 1. Create Service Requests Table
CREATE TABLE IF NOT EXISTS public.service_requests (
    id TEXT PRIMARY KEY DEFAULT ('req_' || floor(extract(epoch from now()) * 1000)::text),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    service_type TEXT NOT NULL,
    target TEXT NOT NULL,
    priority TEXT DEFAULT 'high',
    status TEXT DEFAULT 'in_progress',
    assigned_lead TEXT DEFAULT 'Epotech SecOps Team',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast ordering by request creation date
CREATE INDEX IF NOT EXISTS idx_service_requests_created_at 
    ON public.service_requests (created_at DESC);

-- 2. Create Security Audits Scan Table
CREATE TABLE IF NOT EXISTS public.security_audits (
    id TEXT PRIMARY KEY DEFAULT ('scan_' || floor(extract(epoch from now()) * 1000)::text),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    target TEXT NOT NULL,
    resolved_ip TEXT,
    overall_score INTEGER NOT NULL DEFAULT 85,
    grade TEXT NOT NULL DEFAULT 'A',
    scan_duration_ms INTEGER DEFAULT 450,
    summary JSONB DEFAULT '{}'::jsonb,
    ports JSONB DEFAULT '[]'::jsonb,
    headers JSONB DEFAULT '{}'::jsonb,
    ssl_info JSONB DEFAULT '{}'::jsonb,
    recommendations JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for target domain searches & chronological order
CREATE INDEX IF NOT EXISTS idx_security_audits_target 
    ON public.security_audits (target);

CREATE INDEX IF NOT EXISTS idx_security_audits_created_at 
    ON public.security_audits (created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_audits ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies for service_requests (Anon & Authenticated access)
CREATE POLICY "Allow select service_requests" 
    ON public.service_requests 
    FOR SELECT 
    TO authenticated, anon 
    USING (true);

CREATE POLICY "Allow insert service_requests" 
    ON public.service_requests 
    FOR INSERT 
    TO authenticated, anon 
    WITH CHECK (true);

CREATE POLICY "Allow update service_requests" 
    ON public.service_requests 
    FOR UPDATE 
    TO authenticated, anon 
    USING (true)
    WITH CHECK (true);

-- 5. Create RLS Policies for security_audits
CREATE POLICY "Allow select security_audits" 
    ON public.security_audits 
    FOR SELECT 
    TO authenticated, anon 
    USING (true);

CREATE POLICY "Allow insert security_audits" 
    ON public.security_audits 
    FOR INSERT 
    TO authenticated, anon 
    WITH CHECK (true);

-- ========================================================
-- Environment Variables Reference (.env / Vercel):
-- VITE_SUPABASE_URL=https://your-project.supabase.co
-- VITE_SUPABASE_ANON_KEY=your-anon-key
-- SUPABASE_URL=https://your-project.supabase.co
-- SUPABASE_ANON_KEY=your-anon-key
-- ========================================================


