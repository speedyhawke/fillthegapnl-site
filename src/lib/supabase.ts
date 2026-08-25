import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://tzegwtretzlznjufytuc.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6ZWd3dHJldHpsem5qdWZ5dHVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2NjM0NDgsImV4cCI6MjEwMzIzOTQ0OH0.3gytBvd6OlyxWiEdWeE2YS_GPGdPoNuV-emPgoMJnh0';

const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;

export const SUPABASE_URL =
  envUrl && typeof envUrl === 'string' && envUrl.trim() !== ''
    ? envUrl.trim()
    : DEFAULT_SUPABASE_URL;

export const SUPABASE_ANON_KEY =
  envKey && typeof envKey === 'string' && envKey.trim() !== ''
    ? envKey.trim()
    : DEFAULT_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = (): boolean =>
  Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

export default supabase;
