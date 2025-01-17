import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Facebook', likes: 4000, shares: 2400, comments: 2400 },
  { name: 'Instagram', likes: 3000, shares: 1398, comments: 2210 },
  { name: 'Twitter', likes: 2000, shares: 9800, comments: 2290 },
  { name: 'LinkedIn', likes: 2780, shares: 3908, comments: 2000 },
]

export function PostAnalyticsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Post Performance</CardTitle>
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
              <Bar dataKey="likes" fill="#8884d8" />
              <Bar dataKey="shares" fill="#82ca9d" />
              <Bar dataKey="comments" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

