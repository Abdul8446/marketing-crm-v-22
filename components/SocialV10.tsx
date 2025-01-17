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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { socialData } from "@/lib/data"

export default function SocialV10() {
  const [date, setDate] = useState<Date>()
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [postType, setPostType] = useState("text")
  const [selectedDates, setSelectedDates] = useState<Date[]>([])

  const filteredPosts = selectedPlatform === "all" 
    ? socialData.posts
    : socialData.posts.filter(post => post.platform === selectedPlatform)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Social Media Marketing v 10</CardTitle>
          <CardDescription>Manage your social media campaigns and analyze performance across platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="content">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="content">Content Management</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="scheduling">Post Scheduling</TabsTrigger>
              <TabsTrigger value="calendar">Marketing Calendar</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
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
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Create New Post
                </Button>
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
                  <CardTitle>Schedule a New Post</CardTitle>
                  <CardDescription>Create and schedule your social media content</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="content">Post Content</Label>
                      <Textarea id="content" placeholder="Enter your post content here..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="platform">Platform</Label>
                      <Select>
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
                    <Button type="submit">Schedule Post</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="calendar" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Marketing Calendar</CardTitle>
                  <CardDescription>View and manage all your scheduled marketing activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <Button variant="outline">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Today
                    </Button>
                    <div className="flex space-x-2">
                      <Button variant="outline">&lt;</Button>
                      <Button variant="outline">&gt;</Button>
                    </div>
                    <Select defaultValue="month">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="View" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">Day</SelectItem>
                        <SelectItem value="week">Week</SelectItem>
                        <SelectItem value="month">Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="text-center font-semibold">{day}</div>
                    ))}
                    {Array.from({ length: 35 }).map((_, i) => (
                      <div key={i} className="border rounded-md p-2 h-24 overflow-y-auto">
                        <div className="text-right text-sm text-muted-foreground">{i + 1}</div>
                        {i % 7 === 2 && (
                          <div className="mt-1 text-xs bg-blue-100 text-blue-800 rounded px-1 py-0.5">
                            Facebook Post
                          </div>
                        )}
                        {i % 7 === 4 && (
                          <div className="mt-1 text-xs bg-pink-100 text-pink-800 rounded px-1 py-0.5">
                            Instagram Story
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="templates" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Post Templates</CardTitle>
                  <CardDescription>Create and manage templates for different types of posts</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="text-templates">
                      <AccordionTrigger>Text Post Templates</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium">Product Launch Announcement</h4>
                            <Button variant="outline" size="sm">Use Template</Button>
                          </div>
                          <p className="text-sm text-muted-foreground">Exciting news! We're thrilled to announce the launch of our latest product...</p>
                        </div>
                        <div className="space-y-2 mt-4">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium">Customer Testimonial</h4>
                            <Button variant="outline" size="sm">Use Template</Button>
                          </div>
                          <p className="text-sm text-muted-foreground">Here's what our happy customers are saying: "[Insert testimonial here]" - [Customer Name]</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="image-templates">
                      <AccordionTrigger>Image Post Templates</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium">Product Showcase</h4>
                            <Button variant="outline" size="sm">Use Template</Button>
                          </div>
                          <p className="text-sm text-muted-foreground">Check out our [Product Name]! [Key Feature 1], [Key Feature 2], and [Key Feature 3]. Available now!</p>
                        </div>
                        <div className="space-y-2 mt-4">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium">Behind the Scenes</h4>
                            <Button variant="outline" size="sm">Use Template</Button>
                          </div>
                          <p className="text-sm text-muted-foreground">Ever wonder what goes on behind the scenes at [Company Name]? Here's a sneak peek!</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="video-templates">
                      <AccordionTrigger>Video Post Templates</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium">How-To Tutorial</h4>
                            <Button variant="outline" size="sm">Use Template</Button>
                          </div>
                          <p className="text-sm text-muted-foreground">Learn how to [Action] with our step-by-step tutorial. Watch now and become a pro!</p>
                        </div>
                        <div className="space-y-2 mt-4">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium">Product Demo</h4>
                            <Button variant="outline" size="sm">Use Template</Button>
                          </div>
                          <p className="text-sm text-muted-foreground">See [Product Name] in action! Watch our quick demo to discover how it can [Benefit].</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Ad Templates</CardTitle>
                  <CardDescription>Create and manage templates for different types of ads</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="image-ad-templates">
                      <AccordionTrigger>Image Ad Templates</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium">Limited Time Offer</h4>
                            <Button variant="outline" size="sm">Use Template</Button>
                          </div>
                          <p className="text-sm text-muted-foreground">🚨 Flash Sale! 🚨 Get [Discount]% off on [Product/Service]. Limited time only. Shop now!</p>
                        </div>
                        <div className="space-y-2 mt-4">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium">New Collection Launch</h4>
                            <Button variant="outline" size="sm">Use Template</Button>
                          </div>
                          <p className="text-sm text-muted-foreground">Introducing our new [Season/Theme] collection. Discover [Product Category] that [Unique Selling Point].</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="video-ad-templates">
                      <AccordionTrigger>Video Ad Templates</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium">Before and After</h4>
                            <Button variant="outline" size="sm">Use Template</Button>
                          </div>
                          <p className="text-sm text-muted-foreground">See the amazing transformation with [Product Name]. Before: [Problem]. After: [Solution]. Try it now!</p>
                        </div>
                        <div className="space-y-2 mt-4">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium">Customer Success Story</h4>
                            <Button variant="outline" size="sm">Use Template</Button>
                          </div>
                          <p className="text-sm text-muted-foreground">Meet [Customer Name]. See how [Product/Service] helped them [Achieve Result]. Your success story starts here!</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="carousel-ad-templates">
                      <AccordionTrigger>Carousel Ad Templates</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium">Product Features Showcase</h4>
                            <Button variant="outline" size="sm">Use Template</Button>
                          </div>
                          <p className="text-sm text-muted-foreground">Discover the [Number] key features of [Product Name]. Swipe to see why it's the best choice for [Target Audience].</p>
                        </div>
                        <div className="space-y-2 mt-4">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium">Step-by-Step Guide</h4>
                            <Button variant="outline" size="sm">Use Template</Button>
                          </div>
                          <p className="text-sm text-muted-foreground">Follow these [Number] simple steps to [Achieve Goal] with [Product/Service]. Swipe to learn how!</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

