"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // Parse the access token from URL hash
        const hash = window.location.hash;
        if (hash) {
          const params = new URLSearchParams(hash.substring(1));
          const accessToken = params.get("access_token");
          const refreshToken = params.get("refresh_token");

          if (accessToken) {
            console.log("✅ Access token found, setting Supabase session...");

            // Set session manually in Supabase
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken || "",
            });

            if (error) {
              console.error("Error setting session:", error.message);
              router.replace("/auth");
              return;
            }

            console.log("✅ Session set successfully — redirecting to dashboard");
            router.replace("/dashboard");
            return;
          }
        }

        // If no token in URL, check existing session
        const { data, error } = await supabase.auth.getSession();

        if (error || !data.session) {
          console.error("❌ No session found or error:", error?.message);
          router.replace("/auth");
        } else {
          console.log("✅ Existing session found — redirecting to dashboard");
          router.replace("/dashboard");
        }
      } catch (err) {
        console.error("Auth callback error:", err);
        router.replace("/auth");
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white text-lg bg-black">
      🚀 Connecting to the Cosmos... please wait.
    </div>
  );
}
