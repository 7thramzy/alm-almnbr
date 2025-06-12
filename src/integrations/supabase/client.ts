import { createClient } from '@supabase/supabase-js';

// Fetch URL and Service Key from environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_KEY;

// Initialize the Supabase client with the environment variables
export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
