-- ========================================================
-- Epotech Cybersecurity Platform - Supabase Database Schema
-- Execute this SQL script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ========================================================

-- Migration: Explicitly support all service_requests fields on existing databases
ALTER TABLE public.service_requests 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'in_progress',
ADD COLUMN IF NOT EXISTS assigned_lead TEXT DEFAULT 'Epotech SecOps Team',
ADD COLUMN IF NOT EXISTS notes TEXT;

-- 1. Create Service Requests Table (if starting from scratch)
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

-- ========================================================
-- 4. SECURE RLS POLICIES — service_requests
--    REPLACES the previous permissive anon/public policies.
--    Drop old policies first to avoid conflicts.
-- ========================================================
DROP POLICY IF EXISTS "Allow select service_requests" ON public.service_requests;
DROP POLICY IF EXISTS "Allow insert service_requests" ON public.service_requests;
DROP POLICY IF EXISTS "Allow update service_requests" ON public.service_requests;
DROP POLICY IF EXISTS "Allow delete service_requests" ON public.service_requests;

-- Authenticated users see only their own requests
CREATE POLICY "Users read own requests"
    ON public.service_requests
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Authenticated users can insert requests — but only with their own user_id
CREATE POLICY "Users insert own requests"
    ON public.service_requests
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Authenticated users can update only their own requests
CREATE POLICY "Users update own requests"
    ON public.service_requests
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Admins (role set server-side via app_metadata) can manage ALL requests
CREATE POLICY "Admins manage all requests"
    ON public.service_requests
    FOR ALL
    TO authenticated
    USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
    WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ========================================================
-- 5. SECURE RLS POLICIES — security_audits
--    Replaces the previous permissive anon/public policies.
-- ========================================================
DROP POLICY IF EXISTS "Allow select security_audits" ON public.security_audits;
DROP POLICY IF EXISTS "Allow insert security_audits" ON public.security_audits;
DROP POLICY IF EXISTS "Allow update security_audits" ON public.security_audits;
DROP POLICY IF EXISTS "Allow delete security_audits" ON public.security_audits;

-- Users see only their own audit reports
CREATE POLICY "Users read own audits"
    ON public.security_audits
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Users can insert audits only linked to their own user_id
CREATE POLICY "Users insert own audits"
    ON public.security_audits
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Admins can manage all audit records
CREATE POLICY "Admins manage all audits"
    ON public.security_audits
    FOR ALL
    TO authenticated
    USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
    WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ========================================================
-- IMPORTANT: After applying these policies you MUST
-- rotate the Supabase Anon Key via the Dashboard if it
-- has ever been exposed (e.g., committed to a repository).
-- ========================================================
-- Environment Variables Reference (.env / Vercel):
-- VITE_SUPABASE_URL=https://your-project.supabase.co
-- VITE_SUPABASE_ANON_KEY=your-anon-key
-- SUPABASE_URL=https://your-project.supabase.co
-- SUPABASE_ANON_KEY=your-anon-key
-- (NEVER commit real values — use Vercel Environment Variables)
-- ========================================================

