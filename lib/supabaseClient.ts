import { createClient } from "@supabase/supabase-js";

// ✅ Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ✅ Log helpful error messages (only during build/debug)
if (!supabaseUrl) {
  console.error("❌ Missing NEXT_PUBLIC_SUPABASE_URL — check your Vercel Environment Variables.");
}
if (!supabaseAnonKey) {
  console.error("❌ Missing NEXT_PUBLIC_SUPABASE_ANON_KEY — check your Vercel Environment Variables.");
}

// ✅ Create Supabase client safely
export const supabase = createClient(
  supabaseUrl || "https://pprikejholoktfkzysim.supabase.co", // 🔒 fallback for safety
  supabaseAnonKey ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwcmlrZWpob2xva3Rma3p5c2ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0ODkxMzMsImV4cCI6MjA3NDA2NTEzM30.5T7D0FIlerkFm9BwJ6zWXWM-lalgZCxjkbM3zBgkqUk"
);
