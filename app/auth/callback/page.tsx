"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // Exchange hash fragment for session
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Supabase getSession error:", error);
          router.replace("/auth");
          return;
        }

        // If we already have session → go to dashboard
        if (data?.session) {
          router.replace("/dashboard");
        } else {
          // Listen for OAuth event and then redirect
          supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
              router.replace("/dashboard");
            } else {
              router.replace("/auth");
            }
          });
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
