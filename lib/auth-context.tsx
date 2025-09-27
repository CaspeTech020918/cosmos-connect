"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface Profile {
  id: string
  username: string
  full_name: string
  avatar_url: string | null
  bio: string | null
  cosmic_level: number
  neon_points: number
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
  register: (
    email: string,
    password: string,
    username: string,
    fullName: string,
  ) => Promise<{ success: boolean; message?: string }>
  logout: () => Promise<void>
  loading: boolean
  sendPasswordReset: (email: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user ?? null)

      if (session?.user) {
        await fetchProfile(session.user.id)
      }

      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)

      if (session?.user) {
        await fetchProfile(session.user.id)
      } else {
        setProfile(null)
      }

      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (error) {
        console.error("Error fetching profile:", error)
        return
      }

      setProfile(data)
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }

  const login = async (email: string, password: string) => {
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setLoading(false)
        return { success: false, message: error.message }
      }

      setLoading(false)
      return { success: true }
    } catch (error) {
      setLoading(false)
      return { success: false, message: "An unexpected error occurred" }
    }
  }

  const register = async (email: string, password: string, username: string, fullName: string) => {
    setLoading(true)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          data: {
            username,
            full_name: fullName,
            avatar_url: "/futuristic-avatar-neon-blue.jpg",
            bio: "New cosmic traveler exploring the digital universe",
          },
        },
      })

      if (error) {
        setLoading(false)
        return { success: false, message: error.message }
      }

      setLoading(false)
      return { success: true, message: "Check your email to confirm your account!" }
    } catch (error) {
      setLoading(false)
      return { success: false, message: "An unexpected error occurred" }
    }
  }

  const sendPasswordReset = async (email: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        console.error("Password reset error:", error)
        return false
      }

      return true
    } catch (error) {
      console.error("Password reset error:", error)
      return false
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        login,
        register,
        logout,
        loading,
        sendPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
