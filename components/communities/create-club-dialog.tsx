"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Trophy, X, Plus } from "lucide-react"

interface CreateClubDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateClubDialog({ open, onOpenChange }: CreateClubDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    college: "",
    type: "club" as "club" | "inter_college" | "inter_community",
    tags: [] as string[],
    isPrivate: false,
  })
  const [newTag, setNewTag] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Creating club:", formData)
    // Here you would typically send the data to your backend
    onOpenChange(false)
    // Reset form
    setFormData({
      name: "",
      description: "",
      category: "",
      college: "",
      type: "club",
      tags: [],
      isPrivate: false,
    })
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-slate-900 to-slate-800 border-purple-500/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            <Trophy className="h-6 w-6 text-purple-400" />
            Create a Club
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            Start your own club and build a community around your interests
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-200">
                Club Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
                placeholder="Cosmic Coding Club"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-slate-200">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="arts">Arts & Culture</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type" className="text-slate-200">
                Club Type
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value: any) => setFormData((prev) => ({ ...prev, type: value }))}
              >
                <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="club">College Club</SelectItem>
                  <SelectItem value="inter_college">Inter-College Club</SelectItem>
                  <SelectItem value="inter_community">Inter-Community Club</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="college" className="text-slate-200">
                College/Institution
              </Label>
              <Input
                id="college"
                value={formData.college}
                onChange={(e) => setFormData((prev) => ({ ...prev, college: e.target.value }))}
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
                placeholder="Cosmic University"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-200">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 min-h-[100px]"
              placeholder="Describe your club's mission, activities, and goals..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-200">Tags</Label>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button
                type="button"
                onClick={addTag}
                size="sm"
                variant="outline"
                className="border-slate-600 bg-transparent"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-purple-500/20 text-purple-300">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="ml-2 hover:text-red-400">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-slate-600 text-slate-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Create Club
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
