"use client"

import { useState } from "react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isFuture } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus, Pencil, MoreHorizontal, SendHorizontal, Tags } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { PostComposer } from "./post-composer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface ScheduledPost {
  id: string
  content: string
  platform: "facebook" | "instagram" | "twitter" | "youtube"
  scheduledFor: Date
  media?: string
}

// Sample data
const scheduledPosts: ScheduledPost[] = [
  {
    id: "1",
    content: "Exciting news coming soon!",
    platform: "facebook",
    scheduledFor: new Date(2025, 0, 10, 10, 0),
  },
  {
    id: "2",
    content: "Behind the scenes of our latest photoshoot 📸 #BrandLife",
    platform: "instagram",
    scheduledFor: new Date(2025, 0, 15, 14, 0),
    media: "https://picsum.photos/seed/picsum/300/200",
  },
  {
    id: "3",
    content: "New product announcement - watch the full video on our channel!",
    platform: "youtube",
    scheduledFor: new Date(2025, 0, 15, 16, 0),
    media: "https://picsum.photos/seed/youtube/300/200",
  },
  {
    id: "4",
    content: "Quick tip: Boost your productivity with these 5 simple hacks!",
    platform: "instagram",
    scheduledFor: new Date(2025, 0, 20, 9, 0),
  },
  {
    id: "5",
    content: "Join us for a live Q&A session tomorrow at 3 PM EST! #AskUsAnything",
    platform: "twitter",
    scheduledFor: new Date(2025, 0, 22, 15, 0),
  },
]

const PlatformIcon = ({ platform }: { platform: string }) => {
  const iconProps = { height: 16, width: 16,className: "h-4 w-4 flex-shrink-0" }
  switch (platform) {
    case "facebook":
      return <Facebook {...iconProps} className="text-blue-600" />
    case "instagram":
      return <Instagram {...iconProps} className="text-pink-600" />
    case "twitter":
      return <Twitter {...iconProps} className="text-sky-500" />
    case "youtube":
      return <Youtube {...iconProps} className="text-red-600" />
    default:
      return null
  }
}

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)) // January 2025
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null)
  const [openTooltip, setOpenTooltip] = useState<string | null>(null)

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1))

  const getDaysToDisplay = () => {
    const start = startOfMonth(currentDate)
    const end = endOfMonth(currentDate)
    const daysInMonth = eachDayOfInterval({ start, end })

    const startPadding = start.getDay()
    const previousMonth = subMonths(start, 1)
    const previousMonthEnd = endOfMonth(previousMonth)
    const paddingDaysStart = Array.from({ length: startPadding }, (_, i) => 
      new Date(previousMonthEnd.getFullYear(), previousMonthEnd.getMonth(), previousMonthEnd.getDate() - (startPadding - 1) + i)
    )

    const endPadding = 42 - (daysInMonth.length + startPadding)
    const nextMonth = addMonths(start, 1)
    const paddingDaysEnd = Array.from({ length: endPadding }, (_, i) => 
      new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i + 1)
    )

    return [...paddingDaysStart, ...daysInMonth, ...paddingDaysEnd]
  }

  const allDays = getDaysToDisplay()

  const handlePostClick = (post: ScheduledPost) => {
    setSelectedPost(post)
    setSelectedDate(post.scheduledFor)
    setIsPostModalOpen(true)
  }

  return (
    <TooltipProvider>
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 gap-2">
              <div>
                <h1 className="text-2xl font-semibold">Marketing Calendar</h1>
                <p className="text-sm text-muted-foreground">
                  View and manage your scheduled posts
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={previousMonth}
                  className="hover:bg-gray-100"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-lg font-medium min-w-[140px] text-center">
                  {format(currentDate, "MMMM yyyy")}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextMonth}
                  className="hover:bg-gray-100"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-7 gap-px bg-gray-200">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div
                      key={day}
                      className="bg-white p-2 text-center text-sm text-muted-foreground"
                    >
                      {day}
                    </div>
                  ))}
                  
                  {allDays.map((day, index) => {
                    const postsForDay = scheduledPosts.filter(
                      (post) => format(post.scheduledFor, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
                    )
                    const isCurrentMonth = isSameMonth(day, currentDate)
                    const isFutureDate = isFuture(day)

                    return (
                      <div
                        key={day.toString()}
                        className={cn(
                          "bg-white p-2 min-h-[100px] max-h-[200px] overflow-y-auto",
                          "hover:bg-gray-50 transition-colors",
                          "relative group",
                          !isCurrentMonth && "bg-gray-50"
                        )}
                      >
                        <span className={cn(
                          "text-sm",
                          !isCurrentMonth && "text-muted-foreground"
                        )}>
                          {format(day, "d")}
                        </span>
                        <div className="space-y-1 mt-1">
                          {postsForDay.slice(0, 3).map((post,i) => (
                            <Tooltip open={openTooltip === post.id} key={post.id}>
                              <TooltipTrigger asChild>
                                <div
                                  className={cn(
                                    "p-1 rounded text-xs",
                                    "group/post relative",
                                    "hover:bg-gray-100 cursor-pointer",
                                    post.platform === "facebook" && "bg-blue-50",
                                    post.platform === "instagram" && "bg-pink-50",
                                    post.platform === "twitter" && "bg-sky-50",
                                    post.platform === "youtube" && "bg-red-50"
                                  )}
                                  onClick={() => handlePostClick(post)}
                                  onMouseEnter={() => setOpenTooltip(post.id)}
                                  onMouseLeave={() => setOpenTooltip(null)}  
                                >
                                  <div className="flex items-center gap-1">
                                    <div className="flex-shrink-0">
                                      <PlatformIcon platform={post.platform} />
                                    </div>
                                    <span className="truncate overflow-hidden">{post.content}</span>
                                  </div>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent side="left" className="w-[400px] p-4"onMouseEnter={() => setOpenTooltip(post.id)} onMouseLeave={() => setOpenTooltip(null)}>
                                <div className="flex gap-4">
                                  <div className="flex-1">        
                                    <div className="flex items-center gap-3 mb-3">
                                      <Avatar className="h-8 w-8">
                                        {/* <AvatarImage src="https://via.placeholder.com/150" alt="Epic Estore" /> */}
                                        <AvatarFallback>E</AvatarFallback>
                                      </Avatar>
                                      <div className="flex items-center gap-2">
                                        <span className="font-semibold">Epic Estore</span>
                                        <span className="text-sm text-muted-foreground">{format(post.scheduledFor, "h:mm a")}</span>
                                      </div>
                                    </div>
                                    <div className='w-full mb-3 flex gap-1'>
                                      <p>{post.content}</p>
                                      {post.media && (
                                        <div className="flex items-center">
                                          <img src={post.media || "/placeholder.svg"} alt="Post media" className="w-[1/2] h-auto object-cover rounded-md" />
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7"
                                            onClick={(e) => {
                                              e.stopPropagation()
                                              // Handle tags
                                            }}
                                            onMouseEnter={(e) => e.stopPropagation()}
                                          >
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  data-icon="tag-plus" aria-hidden="true" stroke-width="2.2" width="16" height="16"><path d="M22 12V2H12L2.71001 11.29C1.77 12.23 1.77 13.77 2.71001 14.71L9.29001 21.29C10.23 22.23 11.77 22.23 12.71 21.29M17 7H16.9908M18 13V21M14 17H22" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                          </Button>  
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom" className="w-[200px] p-2" onMouseEnter={(e) => e.stopPropagation()}>
                                          <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                              <Input 
                                                placeholder="Add tag..." 
                                                className="h-7 text-xs"
                                                onKeyDown={(e) => {
                                                  if (e.key === 'Enter') {
                                                    // Handle adding tag
                                                  }
                                                }}
                                              />
                                              <Button size="icon" className="h-7 w-7">
                                                <Plus className="h-4 w-4" />
                                              </Button>
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                              <Badge variant="secondary" className="text-xs">
                                                #marketing
                                              </Badge>
                                              <Badge variant="secondary" className="text-xs">
                                                #social
                                              </Badge>
                                            </div>
                                          </div>
                                        </TooltipContent>
                                      </Tooltip>
                                      <div className="flex justify-end gap-1">
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              className="h-7 px-3 text-xs"
                                              onClick={(e) => {
                                                e.stopPropagation()
                                                // Handle publish now
                                              }}
                                              onMouseEnter={(e) => e.stopPropagation()}
                                            >
                                             <SendHorizontal/> Publish Now
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent side="bottom" onMouseEnter={(e) => e.stopPropagation()}>Publish this post immediately</TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              variant="outline"
                                              size="icon"
                                              className="h-7 w-7"
                                              onClick={(e) => {
                                                e.stopPropagation()
                                                handlePostClick(post)
                                              }}
                                              onMouseEnter={(e) => e.stopPropagation()}
                                            >
                                              <Pencil className="h-4 w-4" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent side="bottom" onMouseEnter={(e) => e.stopPropagation()}>Edit post</TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              variant="outline"
                                              size="icon"
                                              className="h-7 w-7"
                                              onClick={(e) => {
                                                e.stopPropagation()
                                                // Handle more options
                                              }}
                                              onMouseEnter={(e) => e.stopPropagation()}
                                            >
                                              <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent side="bottom" onMouseEnter={(e) => e.stopPropagation()}>More options</TooltipContent>
                                        </Tooltip>
                                      </div>
                                    </div>
                                  </div>
                                  {/* {post.media && (
                                    <div className="w-1/3 flex items-center">
                                      <img src={post.media || "/placeholder.svg"} alt="Post media" className="w-full h-auto rounded-md object-cover" />
                                    </div>
                                  )} */}
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          ))}
                          {postsForDay.length > 3 && (
                            <div className="text-xs text-muted-foreground">
                              +{postsForDay.length - 3} more
                            </div>
                          )}
                          {isFutureDate && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="w-full mt-1 p-1 h-auto text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => {
                                setSelectedDate(day)
                                setIsPostModalOpen(true)
                              }}
                            >
                              <Plus className="h-3 w-3 mr-1" /> Add
                            </Button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <PostComposer
        isOpen={isPostModalOpen}
        onClose={() => {
          setIsPostModalOpen(false)
          setSelectedPost(null)
        }}
        selectedDate={selectedDate}
        editPost={selectedPost}
      />
    </TooltipProvider>
  )
}

// "use client"

// import { useState } from "react"
// import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isFuture } from "date-fns"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { ChevronLeft, ChevronRight, Plus, Pencil, MoreHorizontal, Share, Tags } from 'lucide-react'
// import { cn } from "@/lib/utils"
// import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
// import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
// import { PostComposer } from "./post-composer"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"

// interface ScheduledPost {
//   id: string
//   content: string
//   platform: "facebook" | "instagram" | "twitter" | "youtube"
//   scheduledFor: Date
//   media?: string
// }

// // Sample data
// const scheduledPosts: ScheduledPost[] = [
//   {
//     id: "1",
//     content: "Exciting news coming soon!",
//     platform: "facebook",
//     scheduledFor: new Date(2025, 0, 10, 10, 0),
//   },
//   {
//     id: "2",
//     content: "Behind the scenes of our latest photoshoot 📸 #BrandLife",
//     platform: "instagram",
//     scheduledFor: new Date(2025, 0, 15, 14, 0),
//     media: "https://picsum.photos/seed/picsum/300/200",
//   },
//   {
//     id: "3",
//     content: "New product announcement - watch the full video on our channel!",
//     platform: "youtube",
//     scheduledFor: new Date(2025, 0, 15, 16, 0),
//     media: "https://picsum.photos/seed/youtube/300/200",
//   },
//   {
//     id: "4",
//     content: "Quick tip: Boost your productivity with these 5 simple hacks!",
//     platform: "instagram",
//     scheduledFor: new Date(2025, 0, 20, 9, 0),
//   },
//   {
//     id: "5",
//     content: "Join us for a live Q&A session tomorrow at 3 PM EST! #AskUsAnything",
//     platform: "twitter",
//     scheduledFor: new Date(2025, 0, 22, 15, 0),
//   },
// ]

// const PlatformIcon = ({ platform }: { platform: string }) => {
//   const iconProps = { className: "h-4 w-4" }
//   switch (platform) {
//     case "facebook":
//       return <Facebook {...iconProps} className="text-blue-600" />
//     case "instagram":
//       return <Instagram {...iconProps} className="text-pink-600" />
//     case "twitter":
//       return <Twitter {...iconProps} className="text-sky-500" />
//     case "youtube":
//       return <Youtube {...iconProps} className="text-red-600" />
//     default:
//       return null
//   }
// }

// export function CalendarView() {
//   const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)) // January 2025
//   const [isPostModalOpen, setIsPostModalOpen] = useState(false)
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null)
//   const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null)
//   const [openTooltip, setOpenTooltip] = useState<string | null>(null)

//   const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
//   const previousMonth = () => setCurrentDate(subMonths(currentDate, 1))

//   const getDaysToDisplay = () => {
//     const start = startOfMonth(currentDate)
//     const end = endOfMonth(currentDate)
//     const daysInMonth = eachDayOfInterval({ start, end })

//     const startPadding = start.getDay()
//     const previousMonth = subMonths(start, 1)
//     const previousMonthEnd = endOfMonth(previousMonth)
//     const paddingDaysStart = Array.from({ length: startPadding }, (_, i) => 
//       new Date(previousMonthEnd.getFullYear(), previousMonthEnd.getMonth(), previousMonthEnd.getDate() - (startPadding - 1) + i)
//     )

//     const endPadding = 42 - (daysInMonth.length + startPadding)
//     const nextMonth = addMonths(start, 1)
//     const paddingDaysEnd = Array.from({ length: endPadding }, (_, i) => 
//       new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i + 1)
//     )

//     return [...paddingDaysStart, ...daysInMonth, ...paddingDaysEnd]
//   }

//   const allDays = getDaysToDisplay()

//   const handlePostClick = (post: ScheduledPost) => {
//     setSelectedPost(post)
//     setSelectedDate(post.scheduledFor)
//     setIsPostModalOpen(true)
//   }

//   return (
//     <TooltipProvider>
//       <Card className="border-none shadow-none">
//         <CardContent className="p-0">
//           <div className="space-y-4">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 gap-2">
//               <div>
//                 <h1 className="text-2xl font-semibold">Marketing Calendar</h1>
//                 <p className="text-sm text-muted-foreground">
//                   View and manage your scheduled posts
//                 </p>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={previousMonth}
//                   className="hover:bg-gray-100"
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                 </Button>
//                 <h2 className="text-lg font-medium min-w-[140px] text-center">
//                   {format(currentDate, "MMMM yyyy")}
//                 </h2>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={nextMonth}
//                   className="hover:bg-gray-100"
//                 >
//                   <ChevronRight className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>

//             <div className="overflow-x-auto">
//               <div className="min-w-[800px]">
//                 <div className="grid grid-cols-7 gap-px bg-gray-200">
//                   {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
//                     <div
//                       key={day}
//                       className="bg-white p-2 text-center text-sm text-muted-foreground"
//                     >
//                       {day}
//                     </div>
//                   ))}
                  
//                   {allDays.map((day, index) => {
//                     const postsForDay = scheduledPosts.filter(
//                       (post) => format(post.scheduledFor, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
//                     )
//                     const isCurrentMonth = isSameMonth(day, currentDate)
//                     const isFutureDate = isFuture(day)

//                     return (
//                       <div
//                         key={day.toString()}
//                         className={cn(
//                           "bg-white p-2 min-h-[100px] max-h-[200px] overflow-y-auto",
//                           "hover:bg-gray-50 transition-colors",
//                           "relative group",
//                           !isCurrentMonth && "bg-gray-50"
//                         )}
//                       >
//                         <span className={cn(
//                           "text-sm",
//                           !isCurrentMonth && "text-muted-foreground"
//                         )}>
//                           {format(day, "d")}
//                         </span>
//                         <div className="space-y-1 mt-1">
//                           {postsForDay.slice(0, 3).map((post) => (
//                             <Tooltip open={openTooltip === post.id}>
//                               <TooltipTrigger asChild>
//                                 <div
//                                   className={cn(
//                                     "p-1 rounded text-xs",
//                                     "group/post relative",
//                                     "hover:bg-gray-100 cursor-pointer",
//                                     post.platform === "facebook" && "bg-blue-50",
//                                     post.platform === "instagram" && "bg-pink-50",
//                                     post.platform === "twitter" && "bg-sky-50",
//                                     post.platform === "youtube" && "bg-red-50"
//                                   )}
//                                   onClick={() => handlePostClick(post)}
//                                   onMouseEnter={() => setOpenTooltip(post.id)}
//                                   onMouseLeave={() => setOpenTooltip(null)}
//                                 >
//                                   <div className="flex items-center gap-1">
//                                     <PlatformIcon platform={post.platform} />
//                                     <span className="truncate">{post.content}</span>
//                                   </div>
//                                   <div className="absolute right-1 top-1/2 -translate-y-1/2 hidden group-hover/post:flex items-center gap-1">
//                                     <Button
//                                       variant="ghost"
//                                       size="sm"
//                                       className="h-6 px-2 text-xs"
//                                       onClick={(e) => {
//                                         e.stopPropagation()
//                                         // Handle publish now
//                                       }}
//                                     >
//                                       Publish Now
//                                     </Button>
//                                     <Button
//                                       variant="ghost"
//                                       size="icon"
//                                       className="h-6 w-6"
//                                       onClick={(e) => {
//                                         e.stopPropagation()
//                                         handlePostClick(post)
//                                       }}
//                                     >
//                                       <Pencil className="h-3 w-3" />
//                                     </Button>
//                                     <Button
//                                       variant="ghost"
//                                       size="icon"
//                                       className="h-6 w-6"
//                                       onClick={(e) => {
//                                         e.stopPropagation()
//                                         // Handle more options
//                                       }}
//                                     >
//                                       <MoreHorizontal className="h-3 w-3" />
//                                     </Button>
//                                   </div>
//                                 </div>
//                               </TooltipTrigger>
//                               <TooltipContent side="left" className="w-[400px] p-4" onMouseEnter={() => setOpenTooltip(post.id)} onMouseLeave={() => setOpenTooltip(null)}>
//                                 <div className="flex gap-4">
//                                   <div className="flex-1">
//                                     <div className="flex items-center gap-3 mb-3">
//                                       <Avatar className="h-8 w-8">
//                                         <AvatarImage src="/placeholder.svg" alt="Epic Estore" />
//                                         <AvatarFallback>E</AvatarFallback>
//                                       </Avatar>
//                                       <div className="flex flex-col">
//                                         <span className="font-semibold">Epic Estore</span>
//                                         <span className="text-sm text-muted-foreground">{format(post.scheduledFor, "h:mm a")}</span>
//                                       </div>
//                                     </div>
//                                     <p className="mb-3 text-sm">{post.content}</p>
//                                     <div className="flex justify-between items-center">
//                                       <Tooltip>
//                                         <TooltipTrigger asChild>
//                                           <Button
//                                             variant="ghost"
//                                             size="icon"
//                                             className="h-7 w-7"
//                                             onClick={(e) => {
//                                               e.stopPropagation()
//                                               // Handle tags
//                                             }}
//                                             onMouseEnter={(e) => e.stopPropagation()}
//                                           >
//                                             <Tags className="h-4 w-4" />
//                                           </Button>
//                                         </TooltipTrigger>
//                                         <TooltipContent side="bottom" className="w-[200px] p-2" onMouseEnter={(e) => e.stopPropagation()}>
//                                           <div className="space-y-2">
//                                             <div className="flex items-center gap-2">
//                                               <Input 
//                                                 placeholder="Add tag..." 
//                                                 className="h-7 text-xs"
//                                                 onKeyDown={(e) => {
//                                                   if (e.key === 'Enter') {
//                                                     // Handle adding tag
//                                                   }
//                                                 }}
//                                               />
//                                               <Button size="icon" className="h-7 w-7">
//                                                 <Plus className="h-4 w-4" />
//                                               </Button>
//                                             </div>
//                                             <div className="flex flex-wrap gap-1">
//                                               <Badge variant="secondary" className="text-xs">
//                                                 #marketing
//                                               </Badge>
//                                               <Badge variant="secondary" className="text-xs">
//                                                 #social
//                                               </Badge>
//                                             </div>
//                                           </div>
//                                         </TooltipContent>
//                                       </Tooltip>
//                                       <div className="flex justify-end gap-1">
//                                         <Tooltip>
//                                           <TooltipTrigger asChild>
//                                             <Button
//                                               variant="outline"
//                                               size="sm"
//                                               className="h-7 px-3 text-xs"
//                                               onClick={(e) => {
//                                                 e.stopPropagation()
//                                                 // Handle publish now
//                                               }}
//                                               onMouseEnter={(e) => e.stopPropagation()}
//                                             >
//                                               Publish Now
//                                             </Button>
//                                           </TooltipTrigger>
//                                           <TooltipContent side="bottom" onMouseEnter={(e) => e.stopPropagation()}>Publish this post immediately</TooltipContent>
//                                         </Tooltip>
//                                         <Tooltip>
//                                           <TooltipTrigger asChild>
//                                             <Button
//                                               variant="outline"
//                                               size="icon"
//                                               className="h-7 w-7"
//                                               onClick={(e) => {
//                                                 e.stopPropagation()
//                                                 handlePostClick(post)
//                                               }}
//                                               onMouseEnter={(e) => e.stopPropagation()}
//                                             >
//                                               <Pencil className="h-4 w-4" />
//                                             </Button>
//                                           </TooltipTrigger>
//                                           <TooltipContent side="bottom" onMouseEnter={(e) => e.stopPropagation()}>Edit post</TooltipContent>
//                                         </Tooltip>
//                                         <Tooltip>
//                                           <TooltipTrigger asChild>
//                                             <Button
//                                               variant="outline"
//                                               size="icon"
//                                               className="h-7 w-7"
//                                               onClick={(e) => {
//                                                 e.stopPropagation()
//                                                 // Handle share
//                                               }}
//                                               onMouseEnter={(e) => e.stopPropagation()}
//                                             >
//                                               <Share className="h-4 w-4" />
//                                             </Button>
//                                           </TooltipTrigger>
//                                           <TooltipContent side="bottom" onMouseEnter={(e) => e.stopPropagation()}>Share post</TooltipContent>
//                                         </Tooltip>
//                                         <Tooltip>
//                                           <TooltipTrigger asChild>
//                                             <Button
//                                               variant="outline"
//                                               size="icon"
//                                               className="h-7 w-7"
//                                               onClick={(e) => {
//                                                 e.stopPropagation()
//                                                 // Handle more options
//                                               }}
//                                               onMouseEnter={(e) => e.stopPropagation()}
//                                             >
//                                               <MoreHorizontal className="h-4 w-4" />
//                                             </Button>
//                                           </TooltipTrigger>
//                                           <TooltipContent side="bottom" onMouseEnter={(e) => e.stopPropagation()}>More options</TooltipContent>
//                                         </Tooltip>
//                                       </div>
//                                     </div>
//                                   </div>
//                                   {post.media && (
//                                     <div className="w-1/3 flex items-center">
//                                       <img src={post.media || "/placeholder.svg"} alt="Post media" className="w-full h-auto rounded-md object-cover" />
//                                     </div>
//                                   )}
//                                 </div>
//                               </TooltipContent>
//                             </Tooltip>
//                           ))}
//                           {postsForDay.length > 3 && (
//                             <div className="text-xs text-muted-foreground">
//                               +{postsForDay.length - 3} more
//                             </div>
//                           )}
//                           {isFutureDate && (
//                             <Button 
//                               variant="ghost" 
//                               size="sm" 
//                               className="w-full mt-1 p-1 h-auto text-xs opacity-0 group-hover:opacity-100 transition-opacity"
//                               onClick={() => {
//                                 setSelectedDate(day)
//                                 setIsPostModalOpen(true)
//                               }}
//                             >
//                               <Plus className="h-3 w-3 mr-1" /> Add
//                             </Button>
//                           )}
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//       <PostComposer
//         isOpen={isPostModalOpen}
//         onClose={() => {
//           setIsPostModalOpen(false)
//           setSelectedPost(null)
//         }}
//         selectedDate={selectedDate}
//         editPost={selectedPost}
//       />
//     </TooltipProvider>
//   )
// }

