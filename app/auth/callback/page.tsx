"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // 👇 Parse the hash fragment from the URL (Supabase OAuth)
        const hash = window.location.hash;
        if (hash) {
          const params = new URLSearchParams(hash.substring(1));
          const accessToken = params.get("access_token");
          if (accessToken) {
            console.log("✅ Access token found, setting session...");

            // Restore Supabase session manually
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: params.get("refresh_token") || "",
            });

            if (error) {
              console.error("Error setting session:", error);
              router.replace("/auth");
              return;
            }

            console.log("Session set successfully, redirecting...");
            router.replace("/dashboard");
            return;
          }
        }

        // 👇 If no token found, check session from Supabase
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Session check failed:", error);
          router.replace("/auth");
          return;
        }

        if (data?.session) {
          console.log("Existing session found, redirecting...");
          router.replace("/dashboard");
        } else {
          router.replace("/auth");
        }
      } catch (err) {
        console.error("Auth callback error:", err);
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
