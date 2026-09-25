import { createClient } from '@supabase/supabase-js';

// Strictly parse Vite environment variables with fallback checking
const rawUrl = (import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL || '').trim();
const rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || '').trim();

const isPlaceholderUrl = !rawUrl || rawUrl.includes('placeholder-project.supabase.co') || rawUrl.includes('your-supabase-project');
const isPlaceholderKey = !rawKey || rawKey.includes('placeholder-anon-key') || rawKey.includes('your-supabase-anon-key');

export const isSupabaseConfigured = Boolean(!isPlaceholderUrl && !isPlaceholderKey);

if (!isSupabaseConfigured) {
  console.warn(
    '[Epotech Supabase Configuration Warning] Missing or unexposed Supabase environment variables! ' +
    'Client database requests will fall back to local mock storage. ' +
    'Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are explicitly defined in .env and Vercel Environment Variables.'
  );
}

// Fallback dummy client to prevent runtime exceptions on load
const safeUrl = isSupabaseConfigured ? rawUrl : 'https://placeholder-project.supabase.co';
const safeKey = isSupabaseConfigured ? rawKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy.key';

export const supabase = createClient(safeUrl, safeKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
