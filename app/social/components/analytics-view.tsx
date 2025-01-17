"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Mon', engagement: 4000, reach: 2400, clicks: 2400 },
  { name: 'Tue', engagement: 3000, reach: 1398, clicks: 2210 },
  { name: 'Wed', engagement: 2000, reach: 9800, clicks: 2290 },
  { name: 'Thu', engagement: 2780, reach: 3908, clicks: 2000 },
  { name: 'Fri', engagement: 1890, reach: 4800, clicks: 2181 },
  { name: 'Sat', engagement: 2390, reach: 3800, clicks: 2500 },
  { name: 'Sun', engagement: 3490, reach: 4300, clicks: 2100 },
]

export function AnalyticsView() {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="engagement" fill="#8884d8" name="Engagement" />
                <Bar dataKey="reach" fill="#82ca9d" name="Reach" />
                <Bar dataKey="clicks" fill="#ffc658" name="Clicks" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

