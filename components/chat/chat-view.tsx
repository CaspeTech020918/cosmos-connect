"use client"

import { useState } from "react"
import { ChatSidebar } from "./chat-sidebar"
import { ChatWindow } from "./chat-window"
import { mockChatRooms, mockMessages } from "@/lib/mock-data"
import type { ChatRoom, Message } from "@/lib/types"

export function ChatView() {
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(mockChatRooms[0])
  const [messages, setMessages] = useState<Message[]>(mockMessages)

  const handleSendMessage = (content: string) => {
    if (!selectedRoom) return

    const newMessage: Message = {
      id: Date.now().toString(),
      room_id: selectedRoom.id,
      user_id: "1", // Current user
      content,
      message_type: "text",
      created_at: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, newMessage])
  }

  const roomMessages = messages.filter((msg) => msg.room_id === selectedRoom?.id)

  return (
    <div className="flex h-[calc(100vh-6rem)] max-w-6xl mx-auto bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm rounded-lg border border-slate-700/50 overflow-hidden">
      <ChatSidebar rooms={mockChatRooms} selectedRoom={selectedRoom} onSelectRoom={setSelectedRoom} />
      {selectedRoom ? (
        <ChatWindow room={selectedRoom} messages={roomMessages} onSendMessage={handleSendMessage} />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-slate-400">Select a chat to start messaging</p>
        </div>
      )}
    </div>
  )
}
