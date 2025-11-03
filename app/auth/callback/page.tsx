// app/auth/callback/page.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // If provider used implicit flow, the tokens come in URL hash
        const hash = typeof window !== "undefined" ? window.location.hash : "";
        if (hash) {
          const params = new URLSearchParams(hash.substring(1));
          const access_token = params.get("access_token");
          const refresh_token = params.get("refresh_token");

          if (access_token) {
            // Manually set Supabase session (implicit flow)
            const { data, error } = await supabase.auth.setSession({
              access_token,
              refresh_token: refresh_token || undefined,
            });
            if (error) {
              console.error("Failed to set session from callback hash:", error);
              router.replace("/auth");
              return;
            }
            // Clean the URL (remove tokens from address bar)
            history.replaceState(null, "", window.location.pathname + window.location.search);
            router.replace("/dashboard");
            return;
          }
        }

        // If we got a code (PKCE) flow possibility - try server exchange approach (optional)
        // Otherwise check current session:
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error reading session:", error);
          router.replace("/auth");
          return;
        }
        if (data?.session) {
          router.replace("/dashboard");
          return;
        }

        // subscribe to auth changes as fallback (client)
        const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
          if (session) router.replace("/dashboard");
          else router.replace("/auth");
        });

        // cleanup
        return () => {
          sub?.subscription?.unsubscribe?.();
        };
      } catch (err) {
        console.error("Auth callback error:", err);
        router.replace("/auth");
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white text-lg">
      🚀 Completing sign-in… connecting to the Cosmos. Please wait.
    </div>
  );
}
