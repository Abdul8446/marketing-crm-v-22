"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { CalendarIcon, Plus, BarChart2, PieChartIcon, CalendarPlus2Icon as CalendarIcon2, Facebook, Instagram, Twitter, Linkedin, FileText, Image, Video, Trash2, Edit, Search, Filter, MoreVertical, ThumbsUp, Eye, MessageCircle, Clock } from 'lucide-react'
import { socialData, postTemplates } from "@/lib/data"

// New components
import { KeyMetricsCard } from "@/components/key-metrics-card"
import { PostCreationWizard } from "@/components/post-creation-wizard"
import { InteractiveCalendar } from "@/components/interactive-calendar"
import { EngagementBreakdown } from "@/components/engagement-breakdown"
import { MarketingCalendar } from "@/components/marketing-calendar"
import SocialV14 from "@/components/SocialV14"
import SocialV10 from "@/components/SocialV10"
import SocialV18 from "./social-v18"

export default function SocialMediaPage() {
  const [activeTab, setActiveTab] = useState("content")
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [postType, setPostType] = useState("text")
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [postContent, setPostContent] = useState<{ [key: string]: string }>({})
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState({ start: null, end: null })

  const filteredPosts = socialData.posts
    .filter(post => selectedPlatform === "all" || post.platform === selectedPlatform)
    .filter(post => post.content.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(post => {
      if (!dateRange.start || !dateRange.end) return true
      const postDate = new Date(post.scheduledFor)
      return postDate >= dateRange.start && postDate <= dateRange.end
  })

  const scheduledPosts = filteredPosts.filter(post => post.status === "scheduled")

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

  const tabIcons = {
    content: <FileText className="w-4 h-4" />,
    analytics: <BarChart2 className="w-4 h-4" />,
    calendar: <CalendarIcon2 className="w-4 h-4" />,
    scheduled: <Clock className="w-4 h-4" />,
  }

  const keyMetrics = [
    { title: "Total Posts", value: socialData.posts.length.toString(), change: "+20.1% from last month", icon: <FileText className="h-4 w-4 text-muted-foreground" /> },
    { title: "Engagement Rate", value: "4.3%", change: "+1.2% from last month", icon: <ThumbsUp className="h-4 w-4 text-muted-foreground" /> },
    { title: "Reach", value: "127K", change: "+10.5% from last month", icon: <Eye className="h-4 w-4 text-muted-foreground" /> },
  ]

  const engagementData = [
    { name: "Likes", value: 55 },
    { name: "Comments", value: 25 },
    { name: "Shares", value: 15 },
    { name: "Saves", value: 5 },
  ]

  const performanceTrendsData = [
    { date: "2023-01-01", engagement: 1000, reach: 5000 },
    { date: "2023-02-01", engagement: 1200, reach: 5500 },
    { date: "2023-03-01", engagement: 1100, reach: 6000 },
    { date: "2023-04-01", engagement: 1300, reach: 6500 },
    { date: "2023-05-01", engagement: 1500, reach: 7000 },
    { date: "2023-06-01", engagement: 1400, reach: 7500 },
  ]

  const platformComparisonData = Object.entries(socialData.analytics).map(([platform, data]) => ({
    platform,
    followers: data.followers,
    reach: data.reach,
    engagementRate: data.engagement,
  }))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Social Media Marketing</CardTitle>
          <CardDescription>Manage your social media campaigns and analyze performance across platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              {Object.entries(tabIcons).map(([key, icon]) => (
                <TabsTrigger key={key} value={key} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <div className="flex items-center space-x-2">
                    {icon}
                    <span className="capitalize">{key}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "content" && (
                  <TabsContent value="content" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {keyMetrics.map((metric, index) => (
                        <KeyMetricsCard key={index} {...metric} />
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <Button onClick={() => setIsCreatePostModalOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Create New Post
                      </Button>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Search posts..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-[200px]"
                        />
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
                    </div>
                    <ScrollArea className="h-[400px]">
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
                              <TableCell className="font-medium">
                                <div className="flex items-center space-x-2">
                                  {post.type === "image" && <Image className="h-4 w-4" />}
                                  {post.type === "video" && <Video className="h-4 w-4" />}
                                  {post.type === "reel" && <Video className="h-4 w-4" />}
                                  {post.type === "short" && <Video className="h-4 w-4" />}
                                  <span>{post.content.slice(0, 50)}...</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                {post.platform === "facebook" && <Facebook className="h-4 w-4 text-blue-600" />}
                                {post.platform === "instagram" && <Instagram className="h-4 w-4 text-pink-600" />}
                                {post.platform === "twitter" && <Twitter className="h-4 w-4 text-sky-500" />}
                                {post.platform === "linkedin" && <Linkedin className="h-4 w-4 text-blue-700" />}
                                <span className="ml-2">{post.platform}</span>
                              </TableCell>
                              <TableCell>{post.type}</TableCell>
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
                                }}><Edit className="h-4 w-4" /></Button>
                                <Button variant="ghost" size="sm" className="text-red-500" onClick={() => {
                                  toast({
                                    title: "Post Deleted",
                                    description: "Your post has been successfully deleted.",
                                    variant: "destructive",
                                  })
                                }}><Trash2 className="h-4 w-4" /></Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>
                )}

                {activeTab === "analytics" && (
                  <TabsContent value="analytics" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Performance Trends</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={performanceTrendsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <RechartsTooltip />
                                <Legend />
                                <Line yAxisId="left" type="monotone" dataKey="engagement" stroke="#8884d8" name="Engagement" />
                                <Line yAxisId="right" type="monotone" dataKey="reach" stroke="#82ca9d" name="Reach" />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                      <EngagementBreakdown data={engagementData} />
                    </div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Platform Comparison</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={platformComparisonData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="platform" />
                              <YAxis yAxisId="left" />
                              <YAxis yAxisId="right" orientation="right" />
                              <RechartsTooltip />
                              <Legend />
                              <Bar yAxisId="left" dataKey="followers" fill="#8884d8" name="Followers" />
                              <Bar yAxisId="left" dataKey="reach" fill="#82ca9d" name="Reach" />
                              <Bar yAxisId="right" dataKey="engagementRate" fill="#ffc658" name="Engagement Rate" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}

                {activeTab === "calendar" && (
                  <TabsContent value="calendar" className="space-y-4">
                    <Card className="w-full">
                      <CardHeader>
                        <CardTitle>Marketing Calendar</CardTitle>
                        <CardDescription>View and manage your scheduled posts</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <MarketingCalendar posts={socialData.posts} />
                        {/* <MarketingCalendar posts={samplePosts} /> */}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  // <TabsContent value="calendar" className="space-y-4">
                  //   <Card>
                  //     <CardHeader>
                  //       <CardTitle>Marketing Calendar</CardTitle>
                  //       <CardDescription>View and manage all your scheduled marketing activities</CardDescription>
                  //     </CardHeader>
                  //     <CardContent>
                  //       <div className="flex justify-between items-center mb-4">
                  //         <Button variant="outline">
                  //           <CalendarIcon className="mr-2 h-4 w-4" />
                  //           Today
                  //         </Button>
                  //         <div className="flex space-x-2">
                  //           <Button variant="outline">&lt;</Button>
                  //           <Button variant="outline">&gt;</Button>
                  //         </div>
                  //         <Select defaultValue="month">
                  //           <SelectTrigger className="w-[120px]">
                  //             <SelectValue placeholder="View" />
                  //           </SelectTrigger>
                  //           <SelectContent>
                  //             <SelectItem value="day">Day</SelectItem>
                  //             <SelectItem value="week">Week</SelectItem>
                  //             <SelectItem value="month">Month</SelectItem>
                  //           </SelectContent>
                  //         </Select>
                  //       </div>
                  //       <div className="grid grid-cols-7 gap-2">
                  //         {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  //           <div key={day} className="text-center font-semibold">{day}</div>
                  //         ))}
                  //         {Array.from({ length: 35 }).map((_, i) => (
                  //           <div key={i} className="border rounded-md p-2 h-24 overflow-y-auto">
                  //             <div className="text-right text-sm text-muted-foreground">{i + 1}</div>
                  //             {i % 7 === 2 && (
                  //               <div className="mt-1 text-xs bg-blue-100 text-blue-800 rounded px-1 py-0.5">
                  //                 Facebook Post
                  //               </div>
                  //             )}
                  //             {i % 7 === 4 && (
                  //               <div className="mt-1 text-xs bg-pink-100 text-pink-800 rounded px-1 py-0.5">
                  //                 Instagram Story
                  //               </div>
                  //             )}
                  //           </div>
                  //         ))}
                  //       </div>
                  //     </CardContent>
                  //   </Card>
                  // </TabsContent>
                )}

                {activeTab === "scheduled" && (
                  <TabsContent value="scheduled" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Scheduled Posts</CardTitle>
                        <CardDescription>Manage your upcoming social media posts</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[400px]">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Content</TableHead>
                                <TableHead>Platform</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Scheduled For</TableHead>
                                <TableHead>Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {scheduledPosts.map((post) => (
                                <TableRow key={post.id}>
                                  <TableCell className="font-medium">
                                    <div className="flex items-center space-x-2">
                                      {post.type === "image" && <Image className="h-4 w-4" />}
                                      {post.type === "video" && <Video className="h-4 w-4" />}
                                      {post.type === "reel" && <Video className="h-4 w-4" />}
                                      {post.type === "short" && <Video className="h-4 w-4" />}
                                      <span>{post.content.slice(0, 50)}...</span>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    {post.platform === "facebook" && <Facebook className="h-4 w-4 text-blue-600" />}
                                    {post.platform === "instagram" && <Instagram className="h-4 w-4 text-pink-600" />}
                                    {post.platform === "twitter" && <Twitter className="h-4 w-4 text-sky-500" />}
                                    {post.platform === "linkedin" && <Linkedin className="h-4 w-4 text-blue-700" />}
                                    <span className="ml-2">{post.platform}</span>
                                  </TableCell>
                                  <TableCell>{post.type}</TableCell>
                                  <TableCell>{new Date(post.scheduledFor).toLocaleString()}</TableCell>
                                  <TableCell>
                                    <Button variant="ghost" size="sm" onClick={() => {
                                      toast({
                                        title: "Post Edited",
                                        description: "Your scheduled post has been successfully edited.",
                                      })
                                    }}><Edit className="h-4 w-4" /></Button>
                                    <Button variant="ghost" size="sm" className="text-red-500" onClick={() => {
                                      toast({
                                        title: "Post Deleted",
                                        description: "Your scheduled post has been successfully deleted.",
                                        variant: "destructive",
                                      })
                                    }}><Trash2 className="h-4 w-4" /></Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>

      <PostCreationWizard
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        onCreatePost={(postData) => {
          console.log("Creating post:", postData)
          toast({
            title: "Post Created",
            description: "Your post has been successfully created.",
          })
          setIsCreatePostModalOpen(false)
        }}
      />

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
      <SocialV18/>
      <SocialV14/>
      <SocialV10/>
    </div>
  )
}

