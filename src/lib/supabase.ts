import { createClient } from '@supabase/supabase-js';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Optional: classic Supabase client for public/utility use (not session-aware)
export const supabase = createClient(supabaseUrl, supabaseKey);

// Export the proper client for client-side session-aware usage
export const createBrowserClient = createPagesBrowserClient;
