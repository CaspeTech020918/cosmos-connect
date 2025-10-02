"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const finishAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) console.error("Supabase getSession error:", error);

        if (data?.session) {
          router.replace("/dashboard");
        } else {
          router.replace("/auth");
        }
      } catch (err) {
        console.error("Auth callback error:", err);
        router.replace("/auth");
      }
    };

    finishAuth();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      Completing sign-in… please wait.
    </div>
  );
}
