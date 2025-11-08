// src/lib/supabaseClient.ts
import { createPagesBrowserClient as createBrowserClient } from "@supabase/auth-helpers-nextjs";

export const supabase = createBrowserClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
});


