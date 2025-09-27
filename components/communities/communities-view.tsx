"use client"

import { useState } from "react"
import { CommunityCard } from "./community-card"
import { CreateCommunityDialog } from "./create-community-dialog"
import { CreateClubDialog } from "./create-club-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, TrendingUp, Users, Star, Building, Trophy } from "lucide-react"
import { mockCommunities } from "@/lib/mock-data"

export function CommunitiesView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showCreateClubDialog, setShowCreateClubDialog] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredCommunities = mockCommunities.filter(
    (community) =>
      (community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        community.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === "all" || community.category === selectedCategory),
  )

  const categories = ["all", "academic", "sports", "arts", "technology", "social", "professional"]

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Communities & Clubs</h1>
          <p className="text-slate-400">Discover communities, create clubs, and build connections</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setShowCreateClubDialog(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            <Trophy className="mr-2 h-4 w-4" />
            Create Club
          </Button>
          <Button
            onClick={() => setShowCreateDialog(true)}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Community
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search communities and clubs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer transition-colors ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                  : "border-slate-600 text-slate-400 hover:text-white hover:border-slate-500"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="discover" className="w-full">
        <TabsList className="bg-slate-800/50 border-slate-600">
          <TabsTrigger
            value="discover"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20"
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            Discover
          </TabsTrigger>
          <TabsTrigger
            value="joined"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20"
          >
            <Users className="mr-2 h-4 w-4" />
            Joined
          </TabsTrigger>
          <TabsTrigger
            value="clubs"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20"
          >
            <Trophy className="mr-2 h-4 w-4" />
            My Clubs
          </TabsTrigger>
          <TabsTrigger
            value="inter-college"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20"
          >
            <Building className="mr-2 h-4 w-4" />
            Inter-College
          </TabsTrigger>
          <TabsTrigger
            value="featured"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20"
          >
            <Star className="mr-2 h-4 w-4" />
            Featured
          </TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="joined" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunities.slice(0, 2).map((community) => (
              <CommunityCard key={community.id} community={community} isJoined />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="clubs" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunities
              .filter((c) => c.type === "club")
              .map((community) => (
                <CommunityCard key={community.id} community={community} isJoined showClubFeatures />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="inter-college" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunities
              .filter((c) => c.type === "inter_college" || c.type === "inter_community")
              .map((community) => (
                <CommunityCard key={community.id} community={community} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="featured" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunities.map((community) => (
              <CommunityCard key={community.id} community={community} isFeatured />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <CreateCommunityDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
      <CreateClubDialog open={showCreateClubDialog} onOpenChange={setShowCreateClubDialog} />
    </div>
  )
}
