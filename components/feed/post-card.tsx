"use client"

import { useState } from "react"
import type { Post } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likes_count)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  return (
    <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 backdrop-blur-sm hover-lift group">
      <CardContent className="p-6">
        {/* Post Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 ring-2 ring-cyan-400/30 cosmic-float">
              <AvatarImage src={post.user?.avatar_url || "/placeholder.svg"} alt={post.user?.username} />
              <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-500 text-white">
                {post.user?.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-white group-hover:text-glow transition-all duration-300">
                {post.user?.full_name}
              </p>
              <p className="text-sm text-slate-400">
                @{post.user?.username} • {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-white leading-relaxed">{post.content}</p>
        </div>

        {/* Post Media */}
        {post.media_urls && post.media_urls.length > 0 && (
          <div className="mb-4 rounded-lg overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
            <img src={post.media_urls[0] || "/placeholder.svg"} alt="Post media" className="w-full h-64 object-cover" />
          </div>
        )}

        {/* Post Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center space-x-2 transition-all duration-300 ${
                isLiked ? "text-red-400 hover:text-red-300 cosmic-glow" : "text-slate-400 hover:text-white"
              }`}
              onClick={handleLike}
            >
              <Heart
                className={`h-4 w-4 transition-transform duration-300 ${isLiked ? "fill-current scale-110" : "hover:scale-110"}`}
              />
              <span>{likesCount}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 text-slate-400 hover:text-white transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments_count}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 text-slate-400 hover:text-white transition-all duration-300 hover:scale-105"
            >
              <Share className="h-4 w-4" />
              <span>{post.shares_count}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
