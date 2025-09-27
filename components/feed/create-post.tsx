"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, Smile, MapPin, Calendar } from "lucide-react"

export function CreatePost() {
  const { user } = useAuth()
  const [content, setContent] = useState("")
  const [isPosting, setIsPosting] = useState(false)

  const handlePost = async () => {
    if (!content.trim()) return

    setIsPosting(true)
    // Simulate posting delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setContent("")
    setIsPosting(false)
  }

  return (
    <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex space-x-4">
          <Avatar className="h-10 w-10 ring-2 ring-cyan-400/30">
            <AvatarImage src={user?.avatar_url || "/placeholder.svg"} alt={user?.username} />
            <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-500 text-white">
              {user?.username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="What's happening in the cosmos?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 resize-none focus:border-cyan-400"
            />
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-cyan-400">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-cyan-400">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-cyan-400">
                  <MapPin className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-cyan-400">
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
              <Button
                onClick={handlePost}
                disabled={!content.trim() || isPosting}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold px-6"
              >
                {isPosting ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
