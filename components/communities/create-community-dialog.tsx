"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Upload, Loader2 } from "lucide-react"

interface CreateCommunityDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateCommunityDialog({ open, onOpenChange }: CreateCommunityDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const handleCreate = async () => {
    if (!name.trim() || !description.trim()) return

    setIsCreating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsCreating(false)
    onOpenChange(false)

    // Reset form
    setName("")
    setDescription("")
    setIsPrivate(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 border-slate-700/50 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Create Community
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            Build a space for cosmic minds to connect and collaborate
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Community Avatar */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 bg-gradient-to-br from-cyan-500 to-purple-500">
              <AvatarFallback className="text-white text-xl">{name.charAt(0).toUpperCase() || "C"}</AvatarFallback>
            </Avatar>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white bg-transparent">
              <Upload className="mr-2 h-4 w-4" />
              Upload Avatar
            </Button>
          </div>

          {/* Community Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-200">
              Community Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Cosmic Creators"
              className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-200">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A community for creators exploring the intersection of AI and digital art..."
              className="min-h-[100px] bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* Privacy Setting */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-slate-200">Private Community</Label>
              <p className="text-sm text-slate-400">Only invited members can join</p>
            </div>
            <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-slate-600 text-slate-300">
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!name.trim() || !description.trim() || isCreating}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
          >
            {isCreating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Community"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
