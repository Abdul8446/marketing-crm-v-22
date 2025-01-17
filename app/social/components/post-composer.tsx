"use client"

import { useState, useEffect } from "react"
import { CalendarIcon, ImageIcon, Video, Hash, Clock, Smile, Link2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { MediaUpload } from "./media-upload"
import { PostPreview } from "./post-preview"

interface PostComposerProps {
  isOpen: boolean
  onClose: () => void
  selectedDate: Date | null
  editPost?: {
    id: string
    content: string
    platform: string
    scheduledFor: Date
  } | null
}

export function PostComposer({ isOpen, onClose, selectedDate, editPost }: PostComposerProps) {
  const [date, setDate] = useState<Date | undefined>(selectedDate || undefined)
  const [content, setContent] = useState("")

  useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate)
    }
  }, [selectedDate])

  useEffect(() => {
    if (editPost) {
      setContent(editPost.content)
      setDate(editPost.scheduledFor)
    } else {
      setContent("")
    }
  }, [editPost])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{editPost ? 'Edit Post' : 'Create Post'}</DialogTitle>
          <DialogDescription>
            {editPost ? 'Edit your scheduled post.' : 'Schedule a new post for your social media channels.'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <PostPreview content={content} />
          
          <Textarea
            placeholder="What would you like to share?"
            className="min-h-[150px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <MediaUpload />

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Smile className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Hash className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Link2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Schedule date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Select>
                <SelectTrigger className="w-[100px]">
                  <Clock className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="now">Now</SelectItem>
                  <SelectItem value="8am">8:00 AM</SelectItem>
                  <SelectItem value="1pm">1:00 PM</SelectItem>
                  <SelectItem value="6pm">6:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button>{editPost ? 'Update Post' : 'Add to Queue'}</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

