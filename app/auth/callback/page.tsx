"use client";

export const dynamic = "force-dynamic"; // ✅ Prevents 404 during static builds

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        console.log("🔄 Checking for Supabase session or tokens...");

        // 👇 Parse the hash fragment from the URL (Supabase OAuth redirect)
        const hash = window.location.hash;
        if (hash) {
          const params = new URLSearchParams(hash.substring(1));
          const accessToken = params.get("access_token");
          const refreshToken = params.get("refresh_token");

          if (accessToken) {
            console.log("✅ Access token found — setting Supabase session...");

            // Restore Supabase session manually
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken || "",
            });

            if (error) {
              console.error("❌ Error setting session:", error.message);
              router.replace("/auth");
              return;
            }

            console.log("🚀 Session set successfully — redirecting to dashboard...");
            router.replace("/dashboard");
            return;
          }
        }

        // 👇 If no token found in URL, check Supabase for existing session
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("⚠️ Supabase getSession error:", error.message);
          router.replace("/auth");
          return;
        }

        // 👇 Listen for auth state change (just in case token loads late)
        supabase.auth.onAuthStateChange((_event, session) => {
          if (session) {
            console.log("✅ Session active — redirecting to dashboard...");
            router.replace("/dashboard");
          } else {
            router.replace("/auth");
          }
        });

        // 👇 If a session already exists
        if (data?.session) {
          console.log("🔓 Existing session found — redirecting...");
          router.replace("/dashboard");
        } else {
          console.log("⚠️ No session found — returning to auth page...");
          router.replace("/auth");
        }
      } catch (err) {
        console.error("🔥 Auth callback error:", err);
        router.replace("/auth");
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white text-lg">
      🚀 Connecting to the Cosmos… please wait.
    </div>
  );
}
