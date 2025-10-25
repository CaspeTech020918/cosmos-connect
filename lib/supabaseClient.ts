import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// ✅ Force the redirect URL manually for Google login
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    redirectTo:
      typeof window !== "undefined"
        ? `${window.location.origin}/auth/callback`
        : "https://cosmos-connect.vercel.app/auth/callback", // fallback for server-side
  },
});
