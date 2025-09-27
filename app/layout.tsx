import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { SpaceBackground } from "@/components/ui/space-background"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Cosmos Connect - AI-Powered Social Universe",
  description: "Connect, create, and explore in the digital cosmos with AI-powered social experiences",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-slate-950 text-white overflow-x-hidden`}
      >
        <AnimatedBackground />
        <SpaceBackground />
        <Suspense fallback={null}>
          <AuthProvider>
            <div className="relative z-10">{children}</div>
          </AuthProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
