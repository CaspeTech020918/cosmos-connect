"use client"

import { useAuth } from "@/lib/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Link, Calendar, Zap, Star } from "lucide-react"
import { PostCard } from "../feed/post-card"
import { mockPosts } from "@/lib/mock-data"

export function ProfileView() {
  const { user } = useAuth()

  if (!user) return null

  const userPosts = mockPosts.filter((post) => post.user_id === user.id)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 backdrop-blur-sm">
        <CardContent className="p-0">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-900/50"></div>
          </div>

          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-16 mb-4">
              <Avatar className="h-32 w-32 ring-4 ring-slate-900 bg-slate-900">
                <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.username} />
                <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-500 text-white text-2xl">
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white">
                Edit Profile
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-white">{user.full_name}</h1>
                <p className="text-slate-400">@{user.username}</p>
              </div>

              {user.bio && <p className="text-white leading-relaxed">{user.bio}</p>}

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                {user.location && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                {user.website && (
                  <div className="flex items-center space-x-1">
                    <Link className="h-4 w-4" />
                    <a href={user.website} className="text-cyan-400 hover:underline">
                      {user.website}
                    </a>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                    <Zap className="h-3 w-3 mr-1" />
                    Level {user.cosmic_level}
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                    <Star className="h-3 w-3 mr-1" />
                    {user.neon_points?.toLocaleString()} NP
                  </Badge>
                </div>
              </div>

              <div className="flex items-center space-x-8 text-sm">
                <div>
                  <span className="font-semibold text-white">1,234</span>
                  <span className="text-slate-400 ml-1">Following</span>
                </div>
                <div>
                  <span className="font-semibold text-white">5,678</span>
                  <span className="text-slate-400 ml-1">Followers</span>
                </div>
                <div>
                  <span className="font-semibold text-white">{userPosts.length}</span>
                  <span className="text-slate-400 ml-1">Posts</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Posts */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white">Posts</h2>
        {userPosts.length > 0 ? (
          userPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <p className="text-slate-400">No posts yet. Share your first cosmic thought!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
