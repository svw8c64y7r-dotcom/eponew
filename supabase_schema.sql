# --- Epotech Supabase Database Schema ---

-- 1. Create Service Requests Table
CREATE TABLE IF NOT EXISTS public.service_requests (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    service_type TEXT NOT NULL,
    target TEXT NOT NULL,
    priority TEXT DEFAULT 'high',
    status TEXT DEFAULT 'in_progress',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    assigned_lead TEXT DEFAULT 'Epotech SecOps Team',
    notes TEXT
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies for Authenticated Clients
CREATE POLICY "Allow public select on service_requests" 
    ON public.service_requests FOR SELECT USING (true);

CREATE POLICY "Allow public insert on service_requests" 
    ON public.service_requests FOR INSERT WITH CHECK (true);

-- --- Environment Variables Reference ---
-- VITE_SUPABASE_URL=https://your-project.supabase.co
-- VITE_SUPABASE_ANON_KEY=your-anon-key
-- SUPABASE_URL=https://your-project.supabase.co
-- SUPABASE_ANON_KEY=your-anon-key
