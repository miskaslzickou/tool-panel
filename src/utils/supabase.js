// src/composables/useSupabase.js
import { createClient } from '@supabase/supabase-js';

// Vytvoření instance je mimo funkci, aby se stalo jen jednou
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const useSupabase = () => {
  return { supabase, auth: supabase.auth };
};