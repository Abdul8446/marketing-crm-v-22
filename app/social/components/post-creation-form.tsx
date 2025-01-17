"use client"

import { useState } from "react"
import { CalendarIcon, ImageIcon, Video, Hash, Clock, Smile, Link2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
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

export function PostCreationForm() {
  const [date, setDate] = useState<Date>()
  const [postType, setPostType] = useState("post")
  const [content, setContent] = useState("")

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant={postType === "post" ? "default" : "outline"}
          onClick={() => setPostType("post")}
          className="flex-1"
        >
          Post
        </Button>
        <Button
          variant={postType === "reel" ? "default" : "outline"}
          onClick={() => setPostType("reel")}
          className="flex-1"
        >
          Reel
        </Button>
        <Button
          variant={postType === "story" ? "default" : "outline"}
          onClick={() => setPostType("story")}
          className="flex-1"
        >
          Story
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <Textarea
            placeholder="Start writing or use the AI Assistant"
            className="min-h-[200px]"
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

          <Button className="w-full">Schedule Post</Button>
        </div>

        <div>
          <PostPreview content={content} />
        </div>
      </div>
    </div>
  )
}

