import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface ScheduledPost {
  date: Date
  platform: string
}

interface InteractiveCalendarProps {
  scheduledPosts: ScheduledPost[]
  onDateSelect: (date: Date) => void
}

export function InteractiveCalendar({ scheduledPosts, onDateSelect }: InteractiveCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
      onDateSelect(date)
    }
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          className="rounded-md border"
          components={{
            Day: ({ day, date }) => {
              const postsForDay = scheduledPosts.filter(
                (post) => post.date.toDateString() === date.toDateString()
              )

              return (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <div>{day}</div>
                  {postsForDay.length > 0 && (
                    <Badge
                      variant="secondary"
                      className="absolute bottom-0 right-0 -mb-1 -mr-1"
                    >
                      {postsForDay.length}
                    </Badge>
                  )}
                </motion.div>
              )
            },
          }}
        />
      </CardContent>
    </Card>
  )
}

