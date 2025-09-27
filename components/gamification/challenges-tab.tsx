"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Users, Zap, Trophy, Target, Star } from "lucide-react"

const mockChallenges = [
  {
    id: "1",
    title: "Social Butterfly",
    description: "Make 10 new connections this week",
    type: "weekly",
    category: "social",
    difficulty: "easy",
    points_reward: 500,
    badge_reward: "Social Star",
    progress: 60,
    participants: 1234,
    timeLeft: "3 days",
    requirements: [
      { type: "Follow 5 new users", completed: true },
      { type: "Join 2 communities", completed: true },
      { type: "Comment on 10 posts", completed: false },
    ],
  },
  {
    id: "2",
    title: "Knowledge Seeker",
    description: "Complete 5 quizzes with 80% accuracy",
    type: "monthly",
    category: "learning",
    difficulty: "medium",
    points_reward: 1000,
    badge_reward: "Quiz Master",
    progress: 40,
    participants: 856,
    timeLeft: "12 days",
    requirements: [
      { type: "Complete 5 quizzes", completed: false },
      { type: "Achieve 80% average", completed: false },
    ],
  },
  {
    id: "3",
    title: "Community Builder",
    description: "Create and grow a community to 50 members",
    type: "special",
    category: "community",
    difficulty: "hard",
    points_reward: 2000,
    badge_reward: "Community Leader",
    progress: 25,
    participants: 234,
    timeLeft: "No limit",
    requirements: [
      { type: "Create a community", completed: true },
      { type: "Reach 50 members", completed: false },
    ],
  },
]

export function ChallengesTab() {
  const [activeFilter, setActiveFilter] = useState("all")

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-400 border-green-400/30 bg-green-400/10"
      case "medium":
        return "text-yellow-400 border-yellow-400/30 bg-yellow-400/10"
      case "hard":
        return "text-red-400 border-red-400/30 bg-red-400/10"
      default:
        return "text-slate-400 border-slate-400/30 bg-slate-400/10"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "social":
        return Users
      case "learning":
        return Target
      case "community":
        return Trophy
      default:
        return Star
    }
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <Tabs value={activeFilter} onValueChange={setActiveFilter}>
        <TabsList className="bg-slate-800/50 border-slate-600">
          <TabsTrigger value="all">All Challenges</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
        </TabsList>

        <TabsContent value={activeFilter} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockChallenges.map((challenge) => {
              const CategoryIcon = getCategoryIcon(challenge.category)

              return (
                <Card
                  key={challenge.id}
                  className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
                          <CategoryIcon className="h-4 w-4 text-cyan-400" />
                        </div>
                        <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                      </div>
                      <Badge variant="outline" className="border-slate-600 text-slate-400">
                        {challenge.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-white">{challenge.title}</CardTitle>
                    <p className="text-sm text-slate-400">{challenge.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Progress</span>
                        <span className="text-cyan-400">{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} className="h-2" />
                    </div>

                    {/* Requirements */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-300">Requirements:</p>
                      {challenge.requirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className={`w-2 h-2 rounded-full ${req.completed ? "bg-green-400" : "bg-slate-600"}`} />
                          <span className={req.completed ? "text-green-400" : "text-slate-400"}>{req.type}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{challenge.participants.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{challenge.timeLeft}</span>
                      </div>
                    </div>

                    {/* Rewards */}
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-yellow-400">{challenge.points_reward} NP</span>
                      </div>
                      {challenge.badge_reward && (
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-purple-400" />
                          <span className="text-sm text-purple-400">{challenge.badge_reward}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white">
                      {challenge.progress === 100 ? "Claim Reward" : "Continue Challenge"}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
