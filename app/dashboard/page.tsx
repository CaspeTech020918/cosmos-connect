"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Sidebar } from "@/components/layout/sidebar"
import { FeedView } from "@/components/feed/feed-view"
import { ProfileView } from "@/components/profile/profile-view"
import { ChatView } from "@/components/chat/chat-view"
import { CommunitiesView } from "@/components/communities/communities-view"
import { AIAssistantView } from "@/components/ai/ai-assistant-view"
import { GamificationView } from "@/components/gamification/gamification-view"
import { Loader2 } from "lucide-react"
import { CaptainCosmo } from "@/components/ui/captain-cosmo"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("feed")
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-400 mx-auto mb-4" />
          <p className="text-slate-400">Loading Cosmos Connect...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect
  }

  const renderContent = () => {
    switch (activeTab) {
      case "feed":
        return (
          <div className="relative">
            <FeedView />
            <div className="fixed bottom-8 right-8 z-30">
              <CaptainCosmo variant="floating" message="Exploring Feed..." />
            </div>
          </div>
        )
      case "profile":
        return (
          <div className="relative">
            <ProfileView />
            <div className="absolute top-4 right-4 z-20">
              <CaptainCosmo variant="copilot" message="Your cosmic profile!" />
            </div>
          </div>
        )
      case "chat":
        return (
          <div className="relative">
            <ChatView />
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30">
              <CaptainCosmo variant="cheering" message="Keep chatting!" />
            </div>
          </div>
        )
      case "communities":
        return (
          <div className="relative">
            <CommunitiesView />
            <div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-30">
              <CaptainCosmo variant="pointing" message="Communities unlocked!" />
            </div>
          </div>
        )
      case "gamification":
        return (
          <div className="relative">
            <GamificationView />
            <div className="fixed bottom-8 right-8 z-30">
              <CaptainCosmo variant="cheering" message="Level up!" />
            </div>
          </div>
        )
      case "ai":
        return (
          <div className="relative">
            <AIAssistantView />
            <div className="fixed top-8 right-8 z-30">
              <CaptainCosmo variant="floating" message="AI Assistant ready!" />
            </div>
          </div>
        )
      case "settings":
        return (
          <div className="flex items-center justify-center h-96 relative">
            <p className="text-slate-400">Settings coming soon...</p>
            <div className="absolute top-8 right-8">
              <CaptainCosmo variant="floating" message="Settings coming soon!" />
            </div>
          </div>
        )
      default:
        return (
          <div className="relative">
            <FeedView />
            <div className="fixed bottom-8 right-8 z-30">
              <CaptainCosmo variant="floating" message="Welcome to your feed!" />
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 p-6 relative z-10">{renderContent()}</main>
    </div>
  )
}
