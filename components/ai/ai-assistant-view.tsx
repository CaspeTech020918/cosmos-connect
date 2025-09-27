"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Sparkles, Zap, ImageIcon, Code, Lightbulb, Mic, MicOff } from "lucide-react"

interface AIMessage {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  category?: "general" | "creative" | "code" | "social"
}

export function AIAssistantView() {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm Cosmos, your AI companion in this digital universe. I can help you with creative projects, coding, social connections, and exploring the cosmic possibilities of AI. What would you like to create today?",
      timestamp: new Date(),
      category: "general",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const { user } = useAuth()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateAIResponse(inputMessage),
        timestamp: new Date(),
        category: detectCategory(inputMessage),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("create") || lowerInput.includes("art") || lowerInput.includes("design")) {
      return "I'd love to help you create something amazing! Whether it's digital art, UI designs, or creative concepts, I can guide you through the process. What kind of creative project are you envisioning? I can suggest color palettes, composition ideas, or even help generate prompts for AI art tools."
    }

    if (lowerInput.includes("code") || lowerInput.includes("programming") || lowerInput.includes("develop")) {
      return "Excellent! I can assist with coding projects across various languages and frameworks. Whether you're building web apps, mobile applications, or exploring AI/ML implementations, I'm here to help. What technology stack are you working with, or what would you like to build?"
    }

    if (lowerInput.includes("community") || lowerInput.includes("social") || lowerInput.includes("connect")) {
      return "Building connections in the cosmic community is wonderful! I can help you find like-minded creators, suggest communities to join, or even help you craft engaging posts. The digital universe is full of amazing people waiting to collaborate. What kind of connections are you looking to make?"
    }

    if (
      lowerInput.includes("ai") ||
      lowerInput.includes("artificial intelligence") ||
      lowerInput.includes("machine learning")
    ) {
      return "AI is such an exciting frontier! From generative art to natural language processing, there are endless possibilities to explore. I can help you understand AI concepts, suggest tools and frameworks, or brainstorm AI-powered project ideas. What aspect of AI interests you most?"
    }

    return "That's an interesting question! I'm here to help you explore the infinite possibilities of the digital cosmos. Whether you're looking to create, learn, connect, or innovate, I can provide guidance, suggestions, and creative inspiration. Feel free to ask me about anything - from technical challenges to creative projects!"
  }

  const detectCategory = (input: string): "general" | "creative" | "code" | "social" => {
    const lowerInput = input.toLowerCase()
    if (lowerInput.includes("create") || lowerInput.includes("art") || lowerInput.includes("design")) return "creative"
    if (lowerInput.includes("code") || lowerInput.includes("programming")) return "code"
    if (lowerInput.includes("community") || lowerInput.includes("social")) return "social"
    return "general"
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleListening = () => {
    setIsListening(!isListening)
    // In a real implementation, this would integrate with speech recognition
  }

  const quickActions = [
    { icon: Sparkles, label: "Generate Ideas", prompt: "Help me brainstorm creative project ideas" },
    { icon: Code, label: "Code Help", prompt: "I need help with a coding project" },
    { icon: ImageIcon, label: "Create Art", prompt: "Help me create digital art" },
    { icon: Lightbulb, label: "Learn AI", prompt: "Teach me about AI and machine learning" },
  ]

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      {/* AI Assistant Header */}
      <Card className="bg-gradient-to-r from-slate-900/90 to-slate-800/90 border-slate-700/50 backdrop-blur-sm mb-6">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-16 w-16 ring-2 ring-cyan-400/50">
                <AvatarImage src="/futuristic-ai-robot-neon-blue.jpg" alt="Cosmos AI" />
                <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-500 text-white text-xl">
                  AI
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Cosmos AI Assistant
              </h2>
              <p className="text-slate-400">Your cosmic companion for creativity and innovation</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                  Online
                </Badge>
                <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                  <Zap className="mr-1 h-3 w-3" />
                  AI Powered
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <Button
              key={action.label}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 bg-slate-800/30 border-slate-600 hover:border-cyan-400/50 hover:bg-slate-700/50"
              onClick={() => setInputMessage(action.prompt)}
            >
              <Icon className="h-5 w-5 text-cyan-400" />
              <span className="text-xs text-slate-300">{action.label}</span>
            </Button>
          )
        })}
      </div>

      {/* Messages */}
      <Card className="flex-1 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 backdrop-blur-sm flex flex-col">
        <CardContent className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex space-x-3 max-w-xs lg:max-w-md ${
                  message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <Avatar className="h-8 w-8">
                  {message.type === "user" ? (
                    <>
                      <AvatarImage src={user?.avatar_url || "/placeholder.svg"} alt={user?.username} />
                      <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-500 text-white text-sm">
                        {user?.username?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarImage src="/ai-robot-neon.jpg" alt="Cosmos AI" />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm">
                        AI
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>
                <div className={`flex flex-col ${message.type === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                        : "bg-slate-700/50 text-white"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-slate-400">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    {message.category && message.type === "ai" && (
                      <Badge variant="secondary" className="text-xs bg-slate-600/50 text-slate-300">
                        {message.category}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/ai-robot-neon.jpg" alt="Cosmos AI" />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div className="bg-slate-700/50 px-4 py-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </CardContent>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-700/50">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className={`${isListening ? "text-red-400 hover:text-red-300" : "text-slate-400 hover:text-white"}`}
              onClick={toggleListening}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <div className="flex-1 relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Cosmos anything..."
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 pr-12"
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
