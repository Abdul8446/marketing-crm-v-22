"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, Facebook, Instagram, Linkedin, Twitter, Plus, BarChart2, Users, Eye, ThumbsUp, MessageCircle, Image, Video, FileText } from 'lucide-react'
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { socialData, postTemplates } from "@/lib/data"
import { toast } from "@/components/ui/use-toast"

export default function SocialV14() {
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [postType, setPostType] = useState("text")
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [postContent, setPostContent] = useState<{ [key: string]: string }>({})
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)

  const filteredPosts = selectedPlatform === "all" 
    ? socialData.posts
    : socialData.posts.filter(post => post.platform === selectedPlatform)

  const handleTemplateSelect = (templateId: string) => {
    const template = postTemplates.find(t => t.id === templateId)
    if (template) {
      setSelectedTemplate(template.id)
      setPostContent(prevContent => {
        const newContent = { ...prevContent }
        selectedDates.forEach(date => {
          newContent[format(date, 'yyyy-MM-dd')] = template.content
        })
        return newContent
      })
    }
  }

  const handlePostContentChange = (date: Date, content: string) => {
    setPostContent(prevContent => ({
      ...prevContent,
      [format(date, 'yyyy-MM-dd')]: content
    }))
  }

  const handleSchedulePost = (event: React.FormEvent) => {
    event.preventDefault()
    console.log("Scheduling posts:", { selectedDates, postContent, postType, selectedPlatform })
    toast({
      title: "Posts Scheduled",
      description: `Successfully scheduled ${selectedDates.length} posts.`,
    })
    setIsScheduleDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Social Media Marketing v 14</CardTitle>
          <CardDescription>Manage your social media campaigns and analyze performance across platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="content" className="space-y-4">
            <TabsList>
              <TabsTrigger value="content">Content Management</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="scheduling">Post Scheduling</TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Posts
                    </CardTitle>
                    <BarChart2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{socialData.posts.length}</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Engagement Rate
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.3%</div>
                    <p className="text-xs text-muted-foreground">
                      +1.2% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Reach
                    </CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">127K</div>
                    <p className="text-xs text-muted-foreground">
                      +10.5% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="flex justify-between items-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Create New Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Post</DialogTitle>
                      <DialogDescription>Create a new social media post here. You can select a template or start from scratch.</DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="platform">Platform</Label>
                        <Select onValueChange={setSelectedPlatform}>
                          <SelectTrigger id="platform">
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="twitter">Twitter</SelectItem>
                            <SelectItem value="linkedin">LinkedIn</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="template">Post Template</Label>
                        <Select onValueChange={handleTemplateSelect}>
                          <SelectTrigger id="template">
                            <SelectValue placeholder="Select a template" />
                          </SelectTrigger>
                          <SelectContent>
                            {postTemplates.map((template) => (
                              <SelectItem key={template.id} value={template.id}>
                                {template.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="content">Post Content</Label>
                        <Textarea 
                          id="content" 
                          placeholder="Enter your post content here..." 
                          value={selectedTemplate ? postTemplates.find(t => t.id === selectedTemplate)?.content : ''}
                          onChange={(e) => setPostContent({ [format(new Date(), 'yyyy-MM-dd')]: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="post-type">Post Type</Label>
                        <Select value={postType} onValueChange={setPostType}>
                          <SelectTrigger id="post-type">
                            <SelectValue placeholder="Select post type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text Post</SelectItem>
                            <SelectItem value="image">Image Post</SelectItem>
                            <SelectItem value="video">Video Post</SelectItem>
                            <SelectItem value="multi-image">Multiple Images</SelectItem>
                            <SelectItem value="reel">Reel/Short Video</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {(postType === "image" || postType === "multi-image") && (
                        <div className="space-y-2">
                          <Label htmlFor="image-upload">Upload Images</Label>
                          <Input id="image-upload" type="file" accept="image/*" multiple={postType === "multi-image"} />
                        </div>
                      )}
                      {(postType === "video" || postType === "reel") && (
                        <div className="space-y-2">
                          <Label htmlFor="video-upload">Upload Video</Label>
                          <Input id="video-upload" type="file" accept="video/*" />
                        </div>
                      )}
                    </form>
                    <DialogFooter>
                      <Button type="submit" onClick={() => {
                        toast({
                          title: "Post Created",
                          description: "Your post has been successfully created.",
                        })
                      }}>Create Post</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ScrollArea className="h-[400px] w-full rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Content</TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Scheduled For</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.content}</TableCell>
                        <TableCell>
                          {post.platform === "facebook" && <Facebook className="h-4 w-4 text-blue-600" />}
                          {post.platform === "instagram" && <Instagram className="h-4 w-4 text-pink-600" />}
                          {post.platform === "twitter" && <Twitter className="h-4 w-4 text-sky-500" />}
                          {post.platform === "linkedin" && <Linkedin className="h-4 w-4 text-blue-700" />}
                          <span className="ml-2">{post.platform}</span>
                        </TableCell>
                        <TableCell>
                          {post.type === "text" && <FileText className="h-4 w-4" />}
                          {post.type === "image" && <Image className="h-4 w-4" />}
                          {post.type === "video" && <Video className="h-4 w-4" />}
                          <span className="ml-2">{post.type}</span>
                        </TableCell>
                        <TableCell>{new Date(post.scheduledFor).toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={post.status === "scheduled" ? "outline" : "secondary"}>
                            {post.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => {
                            toast({
                              title: "Post Edited",
                              description: "Your post has been successfully edited.",
                            })
                          }}>Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-500" onClick={() => {
                            toast({
                              title: "Post Deleted",
                              description: "Your post has been successfully deleted.",
                              variant: "destructive",
                            })
                          }}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Object.entries(socialData.analytics).map(([platform, data]) => (
                  <Card key={platform}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </CardTitle>
                      {platform === "facebook" && <Facebook className="h-4 w-4 text-blue-600" />}
                      {platform === "instagram" && <Instagram className="h-4 w-4 text-pink-600" />}
                      {platform === "twitter" && <Twitter className="h-4 w-4 text-sky-500" />}
                      {platform === "linkedin" && <Linkedin className="h-4 w-4 text-blue-700" />}
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{data.followers.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">
                        Followers
                      </p>
                      <div className="mt-2 flex items-center space-x-2">
                        <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{data.engagement}% Engagement</span>
                      </div>
                      <div className="mt-1 flex items-center space-x-2">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{data.reach.toLocaleString()} Reach</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="scheduling" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule New Posts</CardTitle>
                  <CardDescription>Create and schedule your social media content for multiple dates</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleSchedulePost}>
                    <div className="space-y-2">
                      <Label htmlFor="platform">Platform</Label>
                      <Select onValueChange={setSelectedPlatform}>
                        <SelectTrigger id="platform">
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="twitter">Twitter</SelectItem>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="post-type">Post Type</Label>
                      <Select value={postType} onValueChange={setPostType}>
                        <SelectTrigger id="post-type">
                          <SelectValue placeholder="Select post type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text Post</SelectItem>
                          <SelectItem value="image">Image Post</SelectItem>
                          <SelectItem value="video">Video Post</SelectItem>
                          <SelectItem value="multi-image">Multiple Images</SelectItem>
                          <SelectItem value="reel">Reel/Short Video</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {(postType === "image" || postType === "multi-image") && (
                      <div className="space-y-2">
                        <Label htmlFor="image-upload">Upload Images</Label>
                        <Input id="image-upload" type="file" accept="image/*" multiple={postType === "multi-image"} />
                      </div>
                    )}
                    {(postType === "video" || postType === "reel") && (
                      <div className="space-y-2">
                        <Label htmlFor="video-upload">Upload Video</Label>
                        <Input id="video-upload" type="file" accept="video/*" />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label>Schedule Dates</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !selectedDates.length && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDates.length ? `${selectedDates.length} date(s) selected` : <span>Pick dates</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="multiple"
                            selected={selectedDates}
                            onSelect={setSelectedDates}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>Schedule Time</Label>
                      <div className="flex space-x-2">
                        <Input type="time" className="flex-1" />
                        <Select>
                          <SelectTrigger className="w-[110px]">
                            <SelectValue placeholder="Time Zone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="est">EST</SelectItem>
                            <SelectItem value="cst">CST</SelectItem>
                            <SelectItem value="mst">MST</SelectItem>
                            <SelectItem value="pst">PST</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button type="submit" onClick={() => setIsScheduleDialogOpen(true)}>Schedule Posts</Button>
                  </form>
                </CardContent>
              </Card>
              <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Schedule Posts</DialogTitle>
                    <DialogDescription>Enter content for each selected date</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSchedulePost} className="space-y-4">
                    {selectedDates.map((date) => (
                      <div key={date.toISOString()} className="space-y-2">
                        <Label htmlFor={`content-${date.toISOString()}`}>{format(date, 'MMMM d, yyyy')}</Label>
                        <Textarea
                          id={`content-${date.toISOString()}`}
                          value={postContent[format(date, 'yyyy-MM-dd')] || ''}
                          onChange={(e) => handlePostContentChange(date, e.target.value)}
                          placeholder="Enter post content for this date"
                        />
                      </div>
                    ))}
                    <DialogFooter>
                      <Button type="submit">Schedule Posts</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

