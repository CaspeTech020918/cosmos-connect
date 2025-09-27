"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { Loader2, Mail, CheckCircle } from "lucide-react"

interface RegisterFormProps {
  onToggleMode: () => void
}

export function RegisterForm({ onToggleMode }: RegisterFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [fullName, setFullName] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const { register, loading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    const result = await register(email, password, username, fullName)
    if (result.success) {
      setSuccess(true)
      setSuccessMessage(result.message || "Account created successfully!")
    } else {
      setError(result.message || "Registration failed. Please try again.")
    }
  }

  if (success) {
    return (
      <Card className="w-full max-w-md bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-green-500/20 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-green-400" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Check Your Email
          </CardTitle>
          <CardDescription className="text-slate-300">We sent a confirmation link to {email}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 text-green-400 text-sm mb-2">
              <CheckCircle className="w-4 h-4" />
              Account Created Successfully
            </div>
            <p className="text-green-300 text-sm">{successMessage}</p>
          </div>

          <div className="text-center space-y-2">
            <p className="text-slate-400 text-sm">
              Already confirmed your email?{" "}
              <button onClick={onToggleMode} className="text-green-400 hover:text-green-300 font-medium">
                Sign In
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-purple-500/20 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Join the Cosmos
        </CardTitle>
        <CardDescription className="text-slate-300">Begin your cosmic journey</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-slate-200">
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400"
              placeholder="Your cosmic name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username" className="text-slate-200">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400"
              placeholder="cosmic_traveler"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-200">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400"
              placeholder="you@cosmos.app"
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
              className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400"
              placeholder="Create a strong password"
              required
            />
          </div>
          {error && (
            <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">{error}</div>
          )}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Join Cosmos"
            )}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Already have an account?{" "}
            <button onClick={onToggleMode} className="text-purple-400 hover:text-purple-300 font-medium">
              Sign In
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
