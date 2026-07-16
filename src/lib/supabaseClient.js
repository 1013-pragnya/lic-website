import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isConfigured = supabaseUrl && supabaseAnonKey && 
                     !supabaseUrl.includes('your-project-id') && 
                     !supabaseAnonKey.includes('your-supabase-anon-key');

if (!isConfigured) {
  console.warn("Supabase credentials missing or placeholders. Falling back to local storage offline mode.");
}

export const supabase = isConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;
