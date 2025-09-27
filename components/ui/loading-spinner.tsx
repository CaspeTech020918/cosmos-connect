"use client"

import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function LoadingSpinner({ className, size = "md" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20"></div>
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-500 animate-spin"></div>
      <div className="absolute inset-1 rounded-full border-2 border-transparent border-t-purple-500 animate-spin animate-reverse"></div>
    </div>
  )
}
