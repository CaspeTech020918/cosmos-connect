"use client"

import { CreatePost } from "./create-post"
import { PostCard } from "./post-card"
import { mockPosts } from "@/lib/mock-data"

export function FeedView() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <CreatePost />
      <div className="space-y-6">
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
