// lib/auth-context.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import type { User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signup: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  sendMagicLink: (email: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setUser(data?.session?.user ?? null);
      setLoading(false);
    };
    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err?.message ?? "Login failed" };
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      // signUp returns user if allowed. For magic link use signUp with emailRedirectTo or signInWithOtp
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err?.message ?? "Signup failed" };
    }
  };

  const sendMagicLink = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err?.message ?? "Failed to send magic link" };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, sendMagicLink, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
