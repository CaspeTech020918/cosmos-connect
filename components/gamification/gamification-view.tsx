"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ChallengesTab from "./challenges-tab"
import QuizzesTab from "./quizzes-tab"
import LeaderboardTab from "./leaderboard-tab"
import BadgesTab from "./badges-tab"
import MiniGamesTab from "./mini-games-tab"
import { Target, Brain, Trophy, Award, Gamepad2 } from "lucide-react"

export default function GamificationView() {
  return (
    <div className="p-4 text-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Cosmic Challenges
        </h1>
        <p className="text-slate-400">
          Level up your cosmic journey with challenges, quizzes, and mini-games
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="challenges" className="w-full">
        <TabsList className="bg-slate-800/50 border border-slate-600 grid grid-cols-5 w-full rounded-xl overflow-hidden">
          <TabsTrigger
            value="challenges"
            className="flex items-center justify-center px-3 py-2 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20"
          >
            <Target className="mr-2 h-4 w-4" />
            Challenges
          </TabsTrigger>
          <TabsTrigger
            value="quizzes"
            className="flex items-center justify-center px-3 py-2 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20"
          >
            <Brain className="mr-2 h-4 w-4" />
            Quizzes
          </TabsTrigger>
          <TabsTrigger
            value="leaderboard"
            className="flex items-center justify-center px-3 py-2 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20"
          >
            <Trophy className="mr-2 h-4 w-4" />
            Leaderboard
          </TabsTrigger>
          <TabsTrigger
            value="badges"
            className="flex items-center justify-center px-3 py-2 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20"
          >
            <Award className="mr-2 h-4 w-4" />
            Badges
          </TabsTrigger>
          <TabsTrigger
            value="games"
            className="flex items-center justify-center px-3 py-2 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20"
          >
            <Gamepad2 className="mr-2 h-4 w-4" />
            Mini-Games
          </TabsTrigger>
        </TabsList>

        <TabsContent value="challenges" className="mt-6">
          <ChallengesTab />
        </TabsContent>
     <TabsContent value="quizzes" className="mt-6">
          <QuizzesTab />
        </TabsContent>

        <TabsContent value="leaderboard" className="mt-6">
          <LeaderboardTab />
        </TabsContent>

        <TabsContent value="badges" className="mt-6">
          <BadgesTab />
        </TabsContent>

        <TabsContent value="games" className="mt-6">
          <MiniGamesTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
