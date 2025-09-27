// Database schema types for Cosmos Connect
export interface User {
  id: string
  email: string
  username: string
  full_name: string
  avatar_url?: string
  bio?: string
  location?: string
  website?: string
  cosmic_level: number
  neon_points: number
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  user_id: string
  content: string
  media_urls?: string[]
  likes_count: number
  comments_count: number
  shares_count: number
  created_at: string
  updated_at: string
  user?: User
}

export interface Comment {
  id: string
  post_id: string
  user_id: string
  content: string
  likes_count: number
  created_at: string
  user?: User
}

export interface Like {
  id: string
  user_id: string
  post_id?: string
  comment_id?: string
  created_at: string
}

export interface Follow {
  id: string
  follower_id: string
  following_id: string
  created_at: string
}

export interface Community {
  id: string
  name: string
  description: string
  avatar_url?: string
  banner_url?: string
  member_count: number
  is_private: boolean
  created_by: string
  created_at: string
  updated_at: string
  type: "community" | "club" | "inter_college" | "inter_community"
  college_name?: string
  category: string
  tags: string[]
  is_verified: boolean
}

export interface CommunityMember {
  id: string
  community_id: string
  user_id: string
  role: "admin" | "moderator" | "member"
  joined_at: string
  position?: "president" | "general_secretary" | "treasurer" | "vice_president" | "member"
  position_title?: string
  elected_at?: string
  term_end_date?: string
}

export interface ClubPosition {
  id: string
  community_id: string
  title: string
  description: string
  responsibilities: string[]
  max_holders: number
  is_elected: boolean
  term_duration_months: number
  created_at: string
}

export interface ClubElection {
  id: string
  community_id: string
  position_id: string
  title: string
  description: string
  start_date: string
  end_date: string
  status: "upcoming" | "active" | "completed" | "cancelled"
  candidates: ClubCandidate[]
  total_votes: number
  created_at: string
}

export interface ClubCandidate {
  id: string
  election_id: string
  user_id: string
  manifesto: string
  vote_count: number
  user?: User
}

export interface ClubVote {
  id: string
  election_id: string
  candidate_id: string
  voter_id: string
  created_at: string
}

export interface ClubEvent {
  id: string
  community_id: string
  title: string
  description: string
  event_date: string
  location: string
  event_type: "meeting" | "workshop" | "competition" | "social" | "fundraiser"
  max_participants?: number
  registration_required: boolean
  created_by: string
  created_at: string
}

export interface ClubSponsorship {
  id: string
  community_id: string
  sponsor_name: string
  sponsor_logo?: string
  amount: number
  sponsorship_type: "monetary" | "in_kind" | "partnership"
  description: string
  start_date: string
  end_date: string
  status: "active" | "expired" | "pending"
  created_at: string
}

export interface ChatRoom {
  id: string
  name?: string
  type: "direct" | "group" | "community"
  community_id?: string
  created_by: string
  created_at: string
  updated_at: string
  last_message?: Message
}

export interface ChatParticipant {
  id: string
  room_id: string
  user_id: string
  joined_at: string
  last_read_at?: string
}

export interface Message {
  id: string
  room_id: string
  user_id: string
  content: string
  message_type: "text" | "image" | "file" | "ai_response"
  created_at: string
  user?: User
}

export interface AIInteraction {
  id: string
  user_id: string
  prompt: string
  response: string
  interaction_type: "chat" | "content_generation" | "recommendation"
  created_at: string
}

export interface Challenge {
  id: string
  title: string
  description: string
  type: "daily" | "weekly" | "monthly" | "special"
  category: "social" | "learning" | "community" | "creativity" | "fitness"
  difficulty: "easy" | "medium" | "hard"
  points_reward: number
  badge_reward?: string
  requirements: ChallengeRequirement[]
  start_date: string
  end_date?: string
  participants_count: number
  completed_count: number
  is_active: boolean
  created_at: string
}

export interface ChallengeRequirement {
  type: "post_count" | "comment_count" | "like_count" | "quiz_score" | "community_join" | "streak_days"
  target_value: number
  current_value?: number
}

export interface UserChallenge {
  id: string
  user_id: string
  challenge_id: string
  status: "active" | "completed" | "failed" | "expired"
  progress: number
  started_at: string
  completed_at?: string
  points_earned: number
}

export interface Quiz {
  id: string
  title: string
  description: string
  category: string
  difficulty: "easy" | "medium" | "hard"
  questions: QuizQuestion[]
  time_limit_minutes?: number
  points_per_question: number
  attempts_allowed: number
  is_public: boolean
  created_by: string
  created_at: string
}

export interface QuizQuestion {
  id: string
  question: string
  type: "multiple_choice" | "true_false" | "text_input"
  options?: string[]
  correct_answer: string | number
  explanation?: string
  points: number
}

export interface QuizAttempt {
  id: string
  quiz_id: string
  user_id: string
  answers: QuizAnswer[]
  score: number
  total_points: number
  time_taken_seconds: number
  completed_at: string
}

export interface QuizAnswer {
  question_id: string
  user_answer: string | number
  is_correct: boolean
  points_earned: number
}

export interface Poll {
  id: string
  question: string
  options: PollOption[]
  type: "single_choice" | "multiple_choice"
  expires_at?: string
  is_anonymous: boolean
  created_by: string
  community_id?: string
  total_votes: number
  created_at: string
}

export interface PollOption {
  id: string
  text: string
  vote_count: number
  percentage: number
}

export interface PollVote {
  id: string
  poll_id: string
  user_id: string
  option_ids: string[]
  created_at: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon_url: string
  category: "achievement" | "milestone" | "special" | "community"
  rarity: "common" | "rare" | "epic" | "legendary"
  requirements: string
  points_value: number
  created_at: string
}

export interface UserBadge {
  id: string
  user_id: string
  badge_id: string
  earned_at: string
  badge?: Badge
}

export interface Leaderboard {
  id: string
  name: string
  type: "global" | "community" | "challenge"
  category: "points" | "level" | "badges" | "challenges"
  time_period: "daily" | "weekly" | "monthly" | "all_time"
  community_id?: string
  challenge_id?: string
  entries: LeaderboardEntry[]
  updated_at: string
}

export interface LeaderboardEntry {
  rank: number
  user_id: string
  score: number
  user?: User
}

export interface MiniGame {
  id: string
  name: string
  description: string
  type: "memory" | "puzzle" | "trivia" | "reaction" | "strategy"
  difficulty: "easy" | "medium" | "hard"
  max_score: number
  time_limit_seconds?: number
  points_multiplier: number
  is_active: boolean
  created_at: string
}

export interface GameScore {
  id: string
  game_id: string
  user_id: string
  score: number
  time_taken_seconds?: number
  points_earned: number
  achieved_at: string
}
