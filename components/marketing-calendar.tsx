// import { useState } from 'react'
// import { Calendar } from "@/components/ui/calendar"
// import { Badge } from "@/components/ui/badge"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Button } from "@/components/ui/button"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Facebook, Instagram, Twitter, Linkedin, Image, Video } from 'lucide-react'
// import { format, isSameDay } from 'date-fns'

// interface Post {
//   id: number
//   content: string
//   platform: string
//   type: string
//   scheduledFor: string
//   status: string
// }

// interface MarketingCalendarProps {
//   posts: Post[]
// }

// export function MarketingCalendar({ posts }: MarketingCalendarProps) {
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

//   const getPostsForDate = (date: Date) => {
//     return posts.filter(post => isSameDay(new Date(post.scheduledFor), date))
//   }

//   const getColorForPostCount = (count: number) => {
//     if (count === 0) return 'bg-gray-100 hover:bg-gray-200'
//     if (count === 1) return 'bg-blue-100 hover:bg-blue-200'
//     if (count === 2) return 'bg-green-100 hover:bg-green-200'
//     if (count === 3) return 'bg-yellow-100 hover:bg-yellow-200'
//     return 'bg-red-100 hover:bg-red-200'
//   }

//   const renderPostIcon = (platform: string) => {
//     switch (platform) {
//       case 'facebook':
//         return <Facebook className="h-4 w-4 text-blue-600" />
//       case 'instagram':
//         return <Instagram className="h-4 w-4 text-pink-600" />
//       case 'twitter':
//         return <Twitter className="h-4 w-4 text-sky-500" />
//       case 'linkedin':
//         return <Linkedin className="h-4 w-4 text-blue-700" />
//       default:
//         return null
//     }
//   }

//   const renderPostTypeIcon = (type: string) => {
//     switch (type) {
//       case 'image':
//         return <Image className="h-4 w-4" />
//       case 'video':
//       case 'reel':
//       case 'short':
//         return <Video className="h-4 w-4" />
//       default:
//         return null
//     }
//   }

//   return (
//     <div className="w-full h-full">
//       <Calendar
//         mode="single"
//         selected={selectedDate}
//         onSelect={setSelectedDate}
//         // defaultMonth={new Date(2024, 0)} // Set default month to January 2024
//         className="rounded-md border w-full h-full"
//         components={{
//           Day: ({ date }) => {
//             const formatedDate = new Date(date)
//             const postsForDay = getPostsForDate(formatedDate)
//             const colorClass = getColorForPostCount(postsForDay.length)
//             console.log(date)
//             return (
//               <>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     className={`h-full w-full p-0 font-normal ${colorClass}`}
//                   >
//                     <time dateTime={date.toISOString()} className="text-sm">
//                       {format(date, 'd')}
//                     </time>
//                     {postsForDay.length > 0 && (
//                       <Badge
//                         variant="secondary"
//                         className="absolute bottom-1 right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
//                       >
//                         {postsForDay.length}
//                       </Badge>
//                     )}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-80">
//                   <ScrollArea className="h-[300px] w-full">
//                     {postsForDay.map((post) => (
//                       <div key={post.id} className="mb-4 last:mb-0">
//                         <div className="flex items-center space-x-2">
//                           {renderPostIcon(post.platform)}
//                           {renderPostTypeIcon(post.type)}
//                           <span className="font-medium">{format(new Date(post.scheduledFor), 'p')}</span>
//                         </div>
//                         <p className="mt-1 text-sm">{post.content}</p>
//                         <Badge variant={post.status === "scheduled" ? "outline" : "secondary"} className="mt-2">
//                           {post.status}
//                         </Badge>
//                       </div>
//                     ))}
//                   </ScrollArea>
//                 </PopoverContent>
//               </Popover>
//               </>
//             )
//           },
//         }}
//       />
//     </div>
//   )
// }

import { useState } from 'react'
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Image, Video, Calendar as CalendarIcon } from 'lucide-react'
import { format, isSameDay, addMonths, subMonths } from 'date-fns'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Post {
  id: number
  content: string
  platform: string
  type: string
  scheduledFor: string
  status: string
}

interface MarketingCalendarProps {
  posts: Post[]
}

export function MarketingCalendar({ posts }: MarketingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [view, setView] = useState("month")

  const getPostsForDate = (date: Date) => {
    return posts.filter(post => isSameDay(new Date(post.scheduledFor), date))
  }

  const getColorForPostCount = (count: number) => {
    if (count === 0) return 'bg-gray-100 hover:bg-gray-200'
    if (count === 1) return 'bg-blue-100 hover:bg-blue-200'
    if (count === 2) return 'bg-green-100 hover:bg-green-200'
    if (count === 3) return 'bg-yellow-100 hover:bg-yellow-200'
    return 'bg-red-100 hover:bg-red-200'
  }

  const renderPostIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="h-4 w-4 text-blue-600" />
      case 'instagram':
        return <Instagram className="h-4 w-4 text-pink-600" />
      case 'twitter':
        return <Twitter className="h-4 w-4 text-sky-500" />
      case 'linkedin':
        return <Linkedin className="h-4 w-4 text-blue-700" />
      case 'youtube':
        return <Youtube className="h-4 w-4 text-[red]"/>  
      default:
        return null
    }
  }

  const renderPostTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="h-4 w-4" />
      case 'video':
      case 'reel':
      case 'short':
        return <Video className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="w-full h-full">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="rounded-md border w-full"
        components={{
          Day: ({ date }) => {
            const formatedDate = new Date(date)
            const postsForDay = getPostsForDate(formatedDate)
            const colorClass = getColorForPostCount(postsForDay.length)
            
            return (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`w-full h-full font-normal ${colorClass} relative`}
                  >
                    <div className="absolute top-2 right-2">
                      <time dateTime={date.toISOString()} className="text-sm font-medium">
                        {format(date, 'd')}
                      </time>
                    </div>
                    <div className="flex flex-col items-start justify-start mt-6 w-full space-y-1">
                      {postsForDay.map((post, index) => (
                        <div key={index} className="flex items-center space-x-1 text-xs">
                          {renderPostIcon(post.platform)}
                          <span className="truncate max-w-[80px]">{post.content}</span>
                        </div>
                      ))}
                    </div>
                    {postsForDay.length > 0 && (
                      <Badge
                        variant="secondary"
                        className="absolute bottom-2 right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                      >
                        {postsForDay.length}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <ScrollArea className="h-[300px] w-full">
                    {postsForDay.map((post) => (
                      <div key={post.id} className="mb-4 last:mb-0">
                        <div className="flex items-center space-x-2">
                          {renderPostIcon(post.platform)}
                          {renderPostTypeIcon(post.type)}
                          <span className="font-medium">{format(new Date(post.scheduledFor), 'p')}</span>
                        </div>
                        <p className="mt-1 text-sm">{post.content}</p>
                        <Badge variant={post.status === "scheduled" ? "outline" : "secondary"} className="mt-2">
                          {post.status}
                        </Badge>
                      </div>
                    ))}
                  </ScrollArea>
                </PopoverContent>
              </Popover>
            )
          },
        }}
      />
    </div>
  )
}

// export default MarketingCalendar