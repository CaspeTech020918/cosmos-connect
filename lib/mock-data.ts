import type { User, Post, Community, Message, ChatRoom } from "./types"

// Mock users data
export const mockUsers: User[] = [
  {
    id: "1",
    email: "alex@cosmos.app",
    username: "cosmic_alex",
    full_name: "Alex Chen",
    avatar_url: "/futuristic-avatar-neon-blue.jpg",
    bio: "Exploring the digital cosmos 🌌 | AI enthusiast | Level 42 cosmic traveler",
    location: "Neo Tokyo",
    website: "https://alexchen.cosmos",
    cosmic_level: 42,
    neon_points: 15420,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-20T15:30:00Z",
  },
  {
    id: "2",
    email: "zara@cosmos.app",
    username: "neon_zara",
    full_name: "Zara Nova",
    avatar_url: "/futuristic-avatar-neon-purple.jpg",
    bio: "Digital artist creating in the metaverse ✨ | Cosmic level 38",
    location: "Cyber City",
    cosmic_level: 38,
    neon_points: 12890,
    created_at: "2024-01-10T08:00:00Z",
    updated_at: "2024-01-19T12:00:00Z",
  },
]

// Mock posts data
export const mockPosts: Post[] = [
  {
    id: "1",
    user_id: "1",
    content:
      "Just discovered an amazing new AI model that can generate cosmic art! The future is here 🚀✨ #CosmicAI #FutureIsNow",
    media_urls: ["/cosmic-ai-generated-art-neon-space.jpg"],
    likes_count: 42,
    comments_count: 8,
    shares_count: 12,
    created_at: "2024-01-20T14:30:00Z",
    updated_at: "2024-01-20T14:30:00Z",
    user: mockUsers[0],
  },
  {
    id: "2",
    user_id: "2",
    content: "Working on my latest digital sculpture in VR. The neon textures are coming together beautifully! 💜🌟",
    media_urls: ["/neon-digital-sculpture-vr-art-purple.jpg"],
    likes_count: 67,
    comments_count: 15,
    shares_count: 23,
    created_at: "2024-01-20T12:15:00Z",
    updated_at: "2024-01-20T12:15:00Z",
    user: mockUsers[1],
  },
]

// Mock communities data
export const mockCommunities: Community[] = [
  {
    id: "1",
    name: "AI Creators",
    description: "A community for AI enthusiasts and creators pushing the boundaries of digital art and technology",
    avatar_url: "/ai-robot-neon-blue-community.jpg",
    banner_url: "/futuristic-ai-banner-neon-blue-cosmic.jpg",
    member_count: 1247,
    is_private: false,
    created_by: "1",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-20T10:00:00Z",
  },
  {
    id: "2",
    name: "Neon Artists",
    description: "Digital artists creating stunning neon and cyberpunk inspired artwork",
    avatar_url: "/neon-art-palette-purple-community.jpg",
    banner_url: "/cyberpunk-neon-art-banner-purple-pink.jpg",
    member_count: 892,
    is_private: false,
    created_by: "2",
    created_at: "2024-01-05T00:00:00Z",
    updated_at: "2024-01-19T16:00:00Z",
  },
]

// Mock chat rooms
export const mockChatRooms: ChatRoom[] = [
  {
    id: "1",
    name: "Alex & Zara",
    type: "direct",
    created_by: "1",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-20T16:45:00Z",
  },
  {
    id: "2",
    name: "AI Creators General",
    type: "community",
    community_id: "1",
    created_by: "1",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-20T17:30:00Z",
  },
]

// Mock messages
export const mockMessages: Message[] = [
  {
    id: "1",
    room_id: "1",
    user_id: "1",
    content: "Hey Zara! Loved your latest VR sculpture. The neon effects are incredible! 🌟",
    message_type: "text",
    created_at: "2024-01-20T16:30:00Z",
    user: mockUsers[0],
  },
  {
    id: "2",
    room_id: "1",
    user_id: "2",
    content:
      "Thanks Alex! I spent hours perfecting those purple gradients. Want to collaborate on something cosmic? 💜",
    message_type: "text",
    created_at: "2024-01-20T16:45:00Z",
    user: mockUsers[1],
  },
]
