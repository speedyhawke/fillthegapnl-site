import { createClient } from '@supabase/supabase-js';

// Supabase Project configuration
const DEFAULT_SUPABASE_URL = 'https://tzegwtretzlznjufytuc.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6ZWd3dHJldHpsem5qdWZ5dHVjIiwiaWF0IjoxNzg3NjYzNDQ4LCJleHAiOjIxMDMyMzk0NDh9.3gytBvd6OlyxWiEdWeE2YS_GPGdPoNuV-emPgoMJnh0';

export const SUPABASE_URL = (
  (import.meta as any).env?.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL
).trim();

export const SUPABASE_ANON_KEY = (
  (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY
).trim();

export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(SUPABASE_URL) &&
    Boolean(SUPABASE_ANON_KEY) &&
    SUPABASE_URL.startsWith('https://')
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
