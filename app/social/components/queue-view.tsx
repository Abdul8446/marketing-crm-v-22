"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Facebook, Instagram, Twitter, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface QueuedPost {
  id: string
  content: string
  platform: "facebook" | "instagram" | "twitter"
  scheduledFor: string
  image?: string
}

const queuedPosts: QueuedPost[] = [
  {
    id: "1",
    content: "Exciting news! We're launching our new product line next week. Stay tuned! 🚀",
    platform: "facebook",
    scheduledFor: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    content: "Behind the scenes look at our latest photoshoot 📸 #BrandLife",
    platform: "instagram",
    scheduledFor: "2024-01-15T14:00:00Z",
    image: "https://sjc.microlink.io/8ZbhAkp56wD8iqdJY9-zLrBHCuTyCJkOg4aHGygVqfrQF9712azBNMUCpaFEetvD5RPAaAYGzh8ajqnQSPGY7g.jpeg",
  },
  {
    id: "3",
    content: "Quick tip: Start your day with a clear plan and stick to it! #Productivity",
    platform: "twitter",
    scheduledFor: "2024-01-15T16:00:00Z",
  },
]

const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case "facebook":
      return <Facebook className="h-4 w-4 text-blue-600" />
    case "instagram":
      return <Instagram className="h-4 w-4 text-pink-600" />
    case "twitter":
      return <Twitter className="h-4 w-4 text-sky-500" />
    default:
      return null
  }
}

export function QueueView() {
  return (
    <ScrollArea className="h-[calc(100vh-12rem)]">
      <div className="space-y-4">
        {queuedPosts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <PlatformIcon platform={post.platform} />
                  <span className="text-sm text-muted-foreground">
                    {new Date(post.scheduledFor).toLocaleString()}
                  </span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Reschedule</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="mt-2">{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt=""
                  className="mt-2 rounded-lg object-cover"
                  style={{ maxHeight: "200px" }}
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}

