"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { useAuth } from "@/lib/auth-context";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user, router]);

  if (user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      {mode === "login" && (
        <LoginForm
          onToggleMode={() => setMode("register")}
          onForgotPassword={() => setMode("forgot")}
        />
      )}
      {mode === "register" && <RegisterForm onToggleMode={() => setMode("login")} />}
      {mode === "forgot" && <ForgotPasswordForm onBack={() => setMode("login")} />}
    </div>
  );
}
