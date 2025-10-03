"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // Supabase exchange code → session
        const { data, error } = await supabase.auth.exchangeCodeForSession(
          window.location.href
        );

        if (error) {
          console.error("Supabase exchangeCodeForSession error:", error);
          router.replace("/auth");
          return;
        }

        if (data?.session) {
          // ✅ Successfully signed in, redirect to dashboard
          router.replace("/dashboard");
        } else {
          // ❌ No session → back to login
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
    <div className="min-h-screen flex items-center justify-center text-white">
      Completing sign-in… please wait.
    </div>
  );
}
