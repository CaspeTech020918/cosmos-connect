"use client"

import { useState } from "react"
import type { Community } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Lock, Star, MessageCircle } from "lucide-react"

interface CommunityCardProps {
  community: Community
  isJoined?: boolean
  isFeatured?: boolean
}

export function CommunityCard({ community, isJoined = false, isFeatured = false }: CommunityCardProps) {
  const [joined, setJoined] = useState(isJoined)
  const [memberCount, setMemberCount] = useState(community.member_count)

  const handleJoinToggle = () => {
    setJoined(!joined)
    setMemberCount((prev) => (joined ? prev - 1 : prev + 1))
  }

  return (
    <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300 group">
      {/* Banner */}
      <div className="relative h-32 overflow-hidden rounded-t-lg">
        <img
          src={community.banner_url || "/placeholder.svg"}
          alt={`${community.name} banner`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
        {isFeatured && (
          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            <Star className="mr-1 h-3 w-3" />
            Featured
          </Badge>
        )}
        {community.is_private && (
          <Badge className="absolute top-3 left-3 bg-slate-700/80 text-slate-300">
            <Lock className="mr-1 h-3 w-3" />
            Private
          </Badge>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12 ring-2 ring-cyan-400/30 -mt-8 relative z-10">
            <AvatarImage src={community.avatar_url || "/placeholder.svg"} alt={community.name} />
            <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-500 text-white">
              {community.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate">{community.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <Users className="h-3 w-3" />
              <span>{memberCount.toLocaleString()} members</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">{community.description}</p>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
            <MessageCircle className="mr-2 h-4 w-4" />
            Chat
          </Button>
          <Button
            onClick={handleJoinToggle}
            className={
              joined
                ? "bg-slate-700 hover:bg-slate-600 text-white"
                : "bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
            }
          >
            {joined ? "Joined" : "Join"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
