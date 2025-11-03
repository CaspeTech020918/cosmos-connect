// components/auth/login-form.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface LoginFormProps {
  onToggleMode?: () => void;
  onForgotPassword?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode, onForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useAuth() as any;
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.message || "Login failed");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err?.message || "Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      // Important: redirectTo must match your allowed callback in Supabase/Google console
      const redirectTo = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          // optional: queryParams: { access_type: 'offline', prompt: 'consent' }
        },
      });
      if (error) throw error;
      // supabase will redirect — nothing to do here
    } catch (err: any) {
      console.error("Google login error:", err);
      setError(err?.message || "Google login failed, try again.");
    }
  };

  return (
    <Card className="w-full max-w-md bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-cyan-500/20 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-slate-300">Enter the cosmic realm</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-200">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your cosmic email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-200">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="text-right">
            <button type="button" onClick={onForgotPassword} className="text-sm text-cyan-400">
              Forgot password?
            </button>
          </div>

          {error && <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">{error}</div>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entering Cosmos...
              </>
            ) : (
              "Enter Cosmos"
            )}
          </Button>
        </form>

        <div className="mt-4">
          <Button type="button" onClick={handleGoogleLogin} className="w-full bg-red-600">
            Sign in with Google
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            New to the cosmos?{" "}
            <button onClick={onToggleMode} className="text-cyan-400 hover:text-cyan-300 font-medium">
              Create Account
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
