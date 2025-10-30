import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");

    // If Supabase sent a code, exchange it for a session
    if (code) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        console.log("✅ Session created successfully via OAuth callback");
        return NextResponse.redirect(`${origin}/dashboard`);
      } else {
        console.error("❌ Error exchanging code:", error.message);
        return NextResponse.redirect(`${origin}/auth?error=exchange_failed`);
      }
    }

    // If no code found, redirect back to login
    return NextResponse.redirect(`${origin}/auth`);
  } catch (err) {
    console.error("🚨 Callback route error:", err);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL || "https://cosmos-connect.vercel.app"}/auth`);
  }
}

