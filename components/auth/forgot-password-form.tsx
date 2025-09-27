"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { Loader2, Mail, ArrowLeft, CheckCircle } from "lucide-react"

interface ForgotPasswordFormProps {
  onBack: () => void
}

export function ForgotPasswordForm({ onBack }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const { sendPasswordReset, loading } = useAuth()

  const handleSendReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const result = await sendPasswordReset(email)
    if (result) {
      setSuccess(true)
    } else {
      setError("Failed to send password reset email. Please check your email address.")
    }
  }

  if (success) {
    return (
      <Card className="w-full max-w-md bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-green-500/20 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Reset Link Sent
          </CardTitle>
          <CardDescription className="text-slate-300">Check your email for the reset link</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-4">
            <p className="text-green-400 text-sm">
              We've sent a password reset link to {email}. Click the link in your email to reset your password.
            </p>
          </div>

          <div className="text-center">
            <button
              onClick={onBack}
              className="text-green-400 hover:text-green-300 font-medium flex items-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-orange-500/20 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mb-4">
          <Mail className="w-8 h-8 text-orange-400" />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
          Forgot Password
        </CardTitle>
        <CardDescription className="text-slate-300">Enter your email to receive a reset link</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSendReset} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-200">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-400"
              placeholder="Enter your email"
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
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onBack}
            className="text-orange-400 hover:text-orange-300 font-medium flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
