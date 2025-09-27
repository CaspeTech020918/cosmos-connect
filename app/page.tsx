"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Button } from "@/components/ui/button"
import { SpaceBackground } from "@/components/ui/space-background"
import { CaptainCosmo } from "@/components/ui/captain-cosmo"
import { motion } from "framer-motion"
import { Users, Heart, Building, ShoppingBag, Zap, Rocket } from "lucide-react"

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [showLanding, setShowLanding] = useState(false)

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push("/dashboard")
      } else {
        setShowLanding(true)
      }
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-6" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2 text-glow">
            Cosmos Connect
          </h1>
          <p className="text-slate-400 cosmic-shimmer">Initializing the digital universe...</p>
        </div>
      </div>
    )
  }

  if (!showLanding) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      <SpaceBackground />

      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <CaptainCosmo variant="welcome" message="Welcome aboard, space explorer!" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-16">
          {/* Main Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 text-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Cosmos Connect
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The ultimate social super-app that combines everything you love -{" "}
            <span className="text-cyan-400">social media</span>, <span className="text-pink-400">dating</span>,{" "}
            <span className="text-purple-400">professional networking</span>, and{" "}
            <span className="text-blue-400">marketplace</span> - all in one cosmic experience!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              onClick={() => router.push("/auth")}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            >
              Launch Into Orbit
            </Button>
            <Button
              variant="outline"
              className="border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-3 rounded-full text-lg font-semibold bg-transparent"
            >
              Explore Features
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="relative">
            <div className="w-80 h-60 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-purple-400/10 to-pink-400/10 animate-pulse"></div>
              <CaptainCosmo variant="floating" className="scale-150" />
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-900/90 backdrop-blur-sm rounded-full px-6 py-2 border border-cyan-500/30">
              <p className="text-cyan-400 font-semibold">Captain Cosmo - Your Guide</p>
            </div>
          </div>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { icon: Users, title: "Social Hub", desc: "Social posts & reels", gradient: "from-cyan-500 to-blue-500" },
            { icon: Heart, title: "Smart Matching", desc: "Smart matching", gradient: "from-pink-500 to-rose-500" },
            {
              icon: Building,
              title: "Career Network",
              desc: "Career networking",
              gradient: "from-purple-500 to-indigo-500",
            },
            {
              icon: ShoppingBag,
              title: "Marketplace",
              desc: "Buy & sell anything",
              gradient: "from-emerald-500 to-teal-500",
            },
            { icon: Zap, title: "AI Assistant", desc: "Jarvis-like helper", gradient: "from-yellow-500 to-orange-500" },
            {
              icon: Rocket,
              title: "All-in-One",
              desc: "Everything you need",
              gradient: "from-violet-500 to-purple-500",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Ready to Connect Section */}
        <motion.div
          className="text-center bg-slate-900/30 backdrop-blur-sm rounded-3xl p-12 border border-cyan-500/20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Connect with the Cosmos?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join millions of space explorers in the ultimate social universe. Captain Cosmo is waiting to guide you
            through your cosmic journey!
          </p>
          <Button
            onClick={() => router.push("/auth")}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-12 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
          >
            Start Your Cosmic Journey
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
