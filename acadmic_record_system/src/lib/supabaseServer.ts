import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export function supabaseServer() {
    // ✅ Next.js 16: cookies() MUST be awaited inside the helper
    return createServerComponentClient({ cookies });
}
