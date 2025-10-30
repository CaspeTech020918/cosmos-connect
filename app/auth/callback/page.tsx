// app/auth/callback/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handle = async () => {
      try {
        const hash = typeof window !== "undefined" ? window.location.hash : "";
        if (hash) {
          const params = new URLSearchParams(hash.substring(1));
          const accessToken = params.get("access_token");
          const refreshToken = params.get("refresh_token") || params.get("provider_refresh_token") || "";

          if (accessToken) {
            // Try setting the session
            const { error: setErr } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            } as any);

            if (setErr) {
              console.error("setSession error:", setErr);
              router.replace("/auth");
              return;
            }

            // remove hash from URL
            history.replaceState({}, document.title, window.location.pathname);
            router.replace("/dashboard");
            return;
          }
        }

        // If no hash, check session
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("getSession error:", error);
          router.replace("/auth");
          return;
        }
        if (data?.session) {
          router.replace("/dashboard");
        } else {
          router.replace("/auth");
        }
      } catch (err) {
        console.error("Auth callback exception:", err);
        router.replace("/auth");
      }
    };

    handle();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white text-lg">
      🚀 Completing sign-in… Connecting you to Cosmos…
    </div>
  );
}
