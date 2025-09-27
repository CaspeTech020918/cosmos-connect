"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MessageCircle } from "lucide-react"
import type { ChatRoom } from "@/lib/types"
import { mockUsers } from "@/lib/mock-data"

interface ChatSidebarProps {
  rooms: ChatRoom[]
  selectedRoom: ChatRoom | null
  onSelectRoom: (room: ChatRoom) => void
}

export function ChatSidebar({ rooms, selectedRoom, onSelectRoom }: ChatSidebarProps) {
  return (
    <div className="w-80 border-r border-slate-700/50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Messages</h2>
          <Button
            size="sm"
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search conversations..."
            className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {rooms.map((room) => {
          const isSelected = selectedRoom?.id === room.id
          const otherUser = room.type === "direct" ? mockUsers.find((u) => u.id !== "1") : null

          return (
            <Button
              key={room.id}
              variant="ghost"
              className={`w-full p-4 h-auto justify-start ${
                isSelected
                  ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-r-2 border-cyan-400"
                  : "hover:bg-slate-700/50"
              }`}
              onClick={() => onSelectRoom(room)}
            >
              <div className="flex items-center space-x-3 w-full">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={
                        room.type === "direct"
                          ? otherUser?.avatar_url || "/placeholder.svg"
                          : "/ai-robot-neon-blue-community.jpg"
                      }
                      alt={room.name || "Chat"}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-500 text-white">
                      {room.type === "direct" ? (
                        otherUser?.username?.charAt(0).toUpperCase()
                      ) : (
                        <MessageCircle className="h-6 w-6" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="font-medium text-white truncate">
                    {room.type === "direct" ? otherUser?.full_name : room.name}
                  </p>
                  <p className="text-sm text-slate-400 truncate">
                    {room.type === "direct"
                      ? "Thanks Alex! I spent hours perfecting..."
                      : "Welcome to the AI Creators community!"}
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className="text-xs text-slate-400">2m</span>
                  {room.type === "community" && (
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 text-xs">
                      Community
                    </Badge>
                  )}
                </div>
              </div>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
