"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Sending magic link...");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "https://cosmos-connect.vercel.app/auth/callback",
      },
    });
    if (error) setMessage("Error: " + error.message);
    else setMessage("Magic link sent! Check your inbox ✉️");
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "https://cosmos-connect.vercel.app/auth/callback",
      },
    });
    if (error) setMessage("Error: " + error.message);
    else setMessage("Signup successful! Check your email for confirmation.");
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://cosmos-connect.vercel.app/auth/callback",
      },
    });
    if (error) setMessage("Error: " + error.message);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-black">
      <h1 className="text-3xl mb-4 font-bold">🚀 Welcome to Cosmos Connect</h1>
      <form onSubmit={handleEmailLogin} className="w-full max-w-sm">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 rounded-md text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-purple-600 mt-3 py-2 rounded-md hover:bg-purple-700"
        >
          Send Magic Link
        </button>

        <button
          onClick={handleSignUp}
          className="w-full mt-3 bg-blue-600 py-2 rounded-md hover:bg-blue-700"
        >
          Create New Account
        </button>
      </form>

      <div className="mt-6">
        <button
          onClick={handleGoogleLogin}
          className="bg-white text-black px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-200"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>
      </div>

      {message && <p className="mt-4 text-gray-400">{message}</p>}
    </div>
  );
}
