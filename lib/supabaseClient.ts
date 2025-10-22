import { createClient } from "@supabase/supabase-js";

// ✅ Ensure these environment variables are properly loaded
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pprikejholoktfkzysim.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwcmlrZWpob2xva3Rma3p5c2ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0ODkxMzMsImV4cCI6MjA3NDA2NTEzM30.5T7D0FIlerkFm9BwJ6zWXWM-lalgZCxjkbM3zBgkqUk";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("❌ Missing Supabase URL or Anon Key in environment variables.");
}

// ✅ Create client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
