"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"

interface CaptainCosmoProps {
  variant: "welcome" | "floating" | "pointing" | "cheering" | "copilot"
  className?: string
  message?: string
}

export function CaptainCosmo({ variant, className = "", message }: CaptainCosmoProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const getAnimation = () => {
    switch (variant) {
      case "welcome":
        return {
          initial: { scale: 0, rotate: -180 },
          animate: {
            scale: 1,
            rotate: 0,
            y: [0, -10, 0],
          },
          transition: {
            duration: 1.2,
            y: { repeat: Number.POSITIVE_INFINITY, duration: 2 },
          },
        }
      case "floating":
        return {
          initial: { x: -100, opacity: 0 },
          animate: {
            x: 0,
            opacity: 1,
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
          },
          transition: {
            duration: 1,
            y: { repeat: Number.POSITIVE_INFINITY, duration: 3 },
            rotate: { repeat: Number.POSITIVE_INFINITY, duration: 4 },
          },
        }
      case "pointing":
        return {
          initial: { scale: 0 },
          animate: {
            scale: 1,
            x: [0, 10, 0],
          },
          transition: {
            duration: 0.8,
            x: { repeat: Number.POSITIVE_INFINITY, duration: 2 },
          },
        }
      case "cheering":
        return {
          initial: { y: 50, opacity: 0 },
          animate: {
            y: 0,
            opacity: 1,
            rotate: [0, -10, 10, 0],
          },
          transition: {
            duration: 1,
            rotate: { repeat: Number.POSITIVE_INFINITY, duration: 2.5 },
          },
        }
      case "copilot":
        return {
          initial: { x: 50, opacity: 0 },
          animate: {
            x: 0,
            opacity: 1,
            y: [0, -5, 0],
          },
          transition: {
            duration: 1,
            y: { repeat: Number.POSITIVE_INFINITY, duration: 3 },
          },
        }
    }
  }

  const getSizeClass = () => {
    switch (variant) {
      case "welcome":
        return "w-32 h-32 md:w-40 md:h-40"
      case "floating":
        return "w-20 h-20 md:w-24 md:h-24"
      case "pointing":
        return "w-24 h-24 md:w-28 md:h-28"
      case "cheering":
        return "w-16 h-16 md:w-20 md:h-20"
      case "copilot":
        return "w-16 h-16 md:w-20 md:h-20"
    }
  }

  const getDefaultMessage = () => {
    switch (variant) {
      case "welcome":
        return "Welcome aboard, space explorer!"
      case "floating":
        return "Exploring the cosmos..."
      case "pointing":
        return "Check this out!"
      case "cheering":
        return "Awesome work!"
      case "copilot":
        return "I'm here to help!"
    }
  }

  if (!isVisible) return null

  return (
    <div className={`relative ${className}`}>
      <motion.div className={`relative ${getSizeClass()}`} {...getAnimation()}>
        <div className="relative w-full h-full">
          <Image
            src="/images/captain-cosmo-mascot.jpg"
            alt="Captain Cosmo - Your Space Guide"
            fill
            className="object-contain drop-shadow-lg"
            priority={variant === "welcome"}
          />

          {/* Glowing effect around the mascot */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse -z-10" />
        </div>
      </motion.div>

      {/* Message bubble */}
      {message && (
        <motion.div
          className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-slate-800/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-cyan-500/30 whitespace-nowrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-t-4 border-l-4 border-r-4 border-transparent border-t-slate-800/90" />
          <p className="text-cyan-400 text-sm font-medium">{message}</p>
        </motion.div>
      )}

      {/* Default message for welcome variant */}
      {!message && variant === "welcome" && (
        <motion.div
          className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-slate-800/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-cyan-500/30 whitespace-nowrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-t-4 border-l-4 border-r-4 border-transparent border-t-slate-800/90" />
          <p className="text-cyan-400 text-sm font-medium">{getDefaultMessage()}</p>
        </motion.div>
      )}
    </div>
  )
}
