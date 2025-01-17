import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const scheduledPosts = [
  { id: 1, content: "Exciting news coming soon!", platform: "Facebook", date: "2023-06-15", time: "09:00 AM" },
  { id: 2, content: "Check out our latest product launch!", platform: "Instagram", date: "2023-06-16", time: "02:00 PM" },
  { id: 3, content: "Join us for a live Q&A session", platform: "Twitter", date: "2023-06-17", time: "04:00 PM" },
]

export function PostSchedulingTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scheduled Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Content</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scheduledPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.content}</TableCell>
                <TableCell>{post.platform}</TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell>{post.time}</TableCell>
                <TableCell>
                  <Button variant="ghost">Edit</Button>
                  <Button variant="ghost" className="text-red-500">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

