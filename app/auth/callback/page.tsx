"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const url = new URL(window.location.href);
        const hash = window.location.hash;
        const code = url.searchParams.get("code");

        // ✅ 1. If we got a ?code= from OAuth, exchange it for a session
        if (code) {
          console.log("🔄 Exchanging OAuth code for session...");
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (!error) {
            console.log("✅ Code exchanged successfully! Redirecting...");
            router.replace("/dashboard");
            return;
          } else {
            console.error("❌ Error exchanging code:", error.message);
            router.replace("/auth");
            return;
          }
        }

        // ✅ 2. Handle hash fragment (#access_token)
        if (hash) {
          const params = new URLSearchParams(hash.substring(1));
          const accessToken = params.get("access_token");
          const refreshToken = params.get("refresh_token");

          if (accessToken) {
            console.log("🔑 Access token found — setting Supabase session...");
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken || "",
            });

            if (!error) {
              console.log("✅ Session set successfully — redirecting...");
              router.replace("/dashboard");
              return;
            } else {
              console.error("❌ Error setting session:", error.message);
              router.replace("/auth");
              return;
            }
          }
        }

        // ✅ 3. No tokens? Try existing session
        const { data, error } = await supabase.auth.getSession();
        if (data?.session) {
          console.log("🪄 Existing session found — redirecting...");
          router.replace("/dashboard");
        } else {
          console.warn("⚠️ No session found — redirecting to login...");
          router.replace("/auth");
        }
      } catch (err) {
        console.error("🚨 Auth callback error:", err);
        router.replace("/auth");
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-black text-lg">
      🚀 Connecting to the Cosmos... please wait.
    </div>
  );
}
