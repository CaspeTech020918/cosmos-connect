"use client"
import { useAuth } from "@/lib/auth-context"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, User, MessageCircle, Users, Bot, Settings, LogOut, Zap, Trophy, Target } from "lucide-react"
import { useRouter } from "next/navigation"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/auth")
  }

  const menuItems = [
    { id: "feed", label: "Feed", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "chat", label: "Chat", icon: MessageCircle },
    { id: "communities", label: "Communities", icon: Users },
    { id: "gamification", label: "Challenges", icon: Target },
    { id: "ai", label: "AI Assistant", icon: Bot },
  ]

  return (
    <div className="w-64 glass-morphism border-r border-slate-700/50 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-slate-700/50">
        <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-glow neon-flicker">
          Cosmos Connect
        </h1>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 ring-2 ring-cyan-400/50 cosmic-glow">
            <AvatarImage src={user?.avatar_url || "/placeholder.svg"} alt={user?.username} />
            <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-500 text-white">
              {user?.username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.full_name}</p>
            <p className="text-xs text-slate-400 truncate">@{user?.username}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1 text-cyan-400 cosmic-shimmer">
            <Zap className="h-3 w-3" />
            <span>Level {user?.cosmic_level}</span>
          </div>
          <div className="text-purple-400 neon-flicker">{user?.neon_points?.toLocaleString()} NP</div>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1 text-yellow-400">
            <Trophy className="h-3 w-3" />
            <span>3 Badges</span>
          </div>
          <div className="text-green-400">Rank #42</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <li key={item.id} style={{ "--stagger": index } as React.CSSProperties} className="stagger-animation">
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-left transition-all duration-300 hover-lift ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/30 cosmic-glow"
                      : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                  }`}
                  onClick={() => onTabChange(item.id)}
                >
                  <Icon
                    className={`mr-3 h-4 w-4 transition-transform duration-300 ${isActive ? "cosmic-float" : "hover:scale-110"}`}
                  />
                  {item.label}
                </Button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50">
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300 hover-lift"
          onClick={() => onTabChange("settings")}
        >
          <Settings className="mr-3 h-4 w-4" />
          Settings
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-red-400 hover:bg-red-500/10 mt-2 transition-all duration-300 hover-lift"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
