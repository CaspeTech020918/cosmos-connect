"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // ✅ 1. First, parse the access token from hash (#access_token=)
        const hash = window.location.hash;
        if (hash) {
          const params = new URLSearchParams(hash.substring(1));
          const accessToken = params.get("access_token");
          const refreshToken = params.get("refresh_token") || "";

          if (accessToken) {
            console.log("✅ Access token found, setting Supabase session...");

            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (error) {
              console.error("Error setting session:", error);
              router.replace("/auth");
              return;
            }

            console.log("🚀 Session set successfully, redirecting to dashboard...");
            router.replace("/dashboard");
            return;
          }
        }

        // ✅ 2. If user refreshes or no hash found, check for existing session
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Supabase session error:", error);
          router.replace("/auth");
          return;
        }

        if (data?.session) {
          console.log("🔁 Existing session found, redirecting...");
          router.replace("/dashboard");
        } else {
          router.replace("/auth");
        }
      } catch (err) {
        console.error("❌ Auth callback error:", err);
        router.replace("/auth");
      }
    };

    handleAuth();

    // ✅ 3. Bonus: Automatically redirect again if user refreshes the callback page
    const interval = setInterval(async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        console.log("✅ Auto-redirect on refresh");
        router.replace("/dashboard");
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white text-lg">
      🚀 Connecting to the Cosmos… please wait.
    </div>
  );
}
