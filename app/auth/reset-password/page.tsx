"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Key, CheckCircle } from "lucide-react"
import { CaptainCosmo } from "@/components/ui/captain-cosmo"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    // Handle the password reset flow
    const handlePasswordReset = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error || !data.session) {
        router.push("/auth")
      }
    }

    handlePasswordReset()
  }, [router, supabase.auth])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      }
    } catch (error) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <div className="absolute top-8 left-8 z-20">
          <CaptainCosmo variant="cheering" message="Password updated!" />
        </div>

        <Card className="w-full max-w-md bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-green-500/20 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Password Updated
            </CardTitle>
            <CardDescription className="text-slate-300">Your password has been successfully updated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <p className="text-green-400 text-sm text-center">Redirecting to dashboard...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="absolute top-8 left-8 z-20">
        <CaptainCosmo variant="welcome" message="Reset your password!" />
      </div>

      <Card className="w-full max-w-md bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-orange-500/20 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mb-4">
            <Key className="w-8 h-8 text-orange-400" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Set New Password
          </CardTitle>
          <CardDescription className="text-slate-300">Enter your new password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">
                New Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-400"
                placeholder="Enter new password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-200">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-400"
                placeholder="Confirm new password"
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">{error}</div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating Password...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
