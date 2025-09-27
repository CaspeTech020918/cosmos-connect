"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Phone, Video, MoreVertical, Smile, Paperclip } from "lucide-react"
import type { ChatRoom, Message } from "@/lib/types"
import { mockUsers } from "@/lib/mock-data"
import { formatDistanceToNow } from "date-fns"

interface ChatWindowProps {
  room: ChatRoom
  messages: Message[]
  onSendMessage: (content: string) => void
}

export function ChatWindow({ room, messages, onSendMessage }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("")
  const { user } = useAuth()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage)
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const otherUser = room.type === "direct" ? mockUsers.find((u) => u.id !== user?.id) : null

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-700/50 bg-slate-800/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={
                  room.type === "direct"
                    ? otherUser?.avatar_url || "/placeholder.svg"
                    : "/ai-robot-neon-blue-community.jpg"
                }
                alt={room.name || "Chat"}
              />
              <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-500 text-white">
                {room.type === "direct"
                  ? otherUser?.username?.charAt(0).toUpperCase()
                  : room.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-white">{room.type === "direct" ? otherUser?.full_name : room.name}</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-slate-400">{room.type === "direct" ? "Online" : "1,247 members"}</span>
                {room.type === "community" && (
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 text-xs">
                    Community
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isCurrentUser = message.user_id === user?.id
          const messageUser = mockUsers.find((u) => u.id === message.user_id)

          return (
            <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex space-x-3 max-w-xs lg:max-w-md ${isCurrentUser ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                {!isCurrentUser && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={messageUser?.avatar_url || "/placeholder.svg"} alt={messageUser?.username} />
                    <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-500 text-white text-sm">
                      {messageUser?.username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}>
                  {!isCurrentUser && <span className="text-xs text-slate-400 mb-1">{messageUser?.full_name}</span>}
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      isCurrentUser
                        ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                        : "bg-slate-700/50 text-white"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <span className="text-xs text-slate-400 mt-1">
                    {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-slate-700/50 bg-slate-800/30">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
            <Paperclip className="h-4 w-4" />
          </Button>
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 pr-12"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
