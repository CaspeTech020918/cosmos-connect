"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { useAuth } from "@/lib/auth-context"
import { CaptainCosmo } from "@/components/ui/captain-cosmo"
import { createClient } from "@supabase/supabase-js"

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login")
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  if (user) {
    return null // Will redirect
  }

  // 🚀 Google Sign-In handler
  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/dashboard"
            : "https://cosmos-connect.vercel.app/dashboard",
      },
    })
    if (error) console.error("Google Sign-In Error:", error.message)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      {/* Cosmic background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="absolute top-8 left-8 z-20">
        <CaptainCosmo variant="welcome" message="Welcome to Cosmos!" />
      </div>

      {/* Auth form */}
      <div className="relative z-10 flex flex-col items-center space-y-4">
        {mode === "login" && (
          <LoginForm
            onToggleMode={() => setMode("register")}
            onForgotPassword={() => setMode("forgot")}
          />
        )}
        {mode === "register" && <RegisterForm onToggleMode={() => setMode("login")} />}
        {mode === "forgot" && <ForgotPasswordForm onBack={() => setMode("login")} />}

        {/* 🚀 Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="px-6 py-3 mt-4 bg-red-500 rounded-lg hover:bg-red-600 text-white"
        >
          Sign in with Google
        </button>
      </div>

      {/* Cosmic particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
