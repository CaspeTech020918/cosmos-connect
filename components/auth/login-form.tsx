// components/auth/login-form.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Props {
  onToggleMode?: () => void;
  onForgotPassword?: () => void;
}

export default function LoginForm({ onToggleMode, onForgotPassword }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const router = useRouter();

  // Email + Password
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await login(email, password);
    if (!res.success) {
      setError(res.message || "Login failed");
      return;
    }
    // success -> redirect
    router.push("/dashboard");
  };

  // Google OAuth (implicit): redirectTo should point to your callback
  const handleGoogleLogin = async () => {
    setError("");
    try {
      const redirectTo = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          queryParams: { access_type: "offline", prompt: "consent" },
        },
      });
      if (error) throw error;
      // user will be redirected away to Google
    } catch (err: any) {
      console.error("Google login error:", err);
      setError(err?.message || "Google login failed");
    }
  };

  return (
    <Card className="w-full max-w-md bg-slate-900/90 border-cyan-500/20 p-6">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription>Enter the cosmic realm</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {error && <div className="text-sm text-red-400">{error}</div>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>

        <div className="mt-4">
          <Button type="button" onClick={handleGoogleLogin} className="w-full">
            Sign in with Google
          </Button>
        </div>

        <div className="mt-4 text-center">
          <button onClick={onToggleMode} className="text-cyan-400">
            Create account
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
