"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { emailData } from "@/lib/data"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Calendar, Mail, Trash2, Edit, Eye } from 'lucide-react'

export default function EmailV12() {
  const [activeTab, setActiveTab] = useState("campaigns")
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Email Marketing</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Create Campaign</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Create New Campaign</DialogTitle>
                  <DialogDescription>
                    Set up your email campaign details below.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subject" className="text-right">
                      Subject
                    </Label>
                    <Input id="subject" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="template" className="text-right">
                      Template
                    </Label>
                    <Select onValueChange={handleTemplateSelect}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                      <SelectContent>
                        {emailData.templates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="content" className="text-right">
                      Content
                    </Label>
                    <Textarea
                      id="content"
                      className="col-span-3"
                      rows={5}
                      value={selectedTemplate ? selectedTemplate.content : ""}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="schedule" className="text-right">
                      Schedule
                    </Label>
                    <div className="col-span-3 flex items-center space-x-2">
                      <Checkbox id="schedule" />
                      <Label htmlFor="schedule">Schedule for later</Label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Campaign</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              <TabsContent value="campaigns" className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Sent</TableHead>
                      <TableHead>Opened</TableHead>
                      <TableHead>Clicked</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {emailData.campaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell>{campaign.name}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              campaign.status === "active"
                                ? "default"
                                : campaign.status === "scheduled"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {campaign.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{campaign.sent}</TableCell>
                        <TableCell>{campaign.opened}</TableCell>
                        <TableCell>{campaign.clicked}</TableCell>
                        <TableCell>
                          {new Date(campaign.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="templates" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {emailData.templates.map((template) => (
                    <Card key={template.id}>
                      <CardContent className="p-6">
                        <div className="space-y-2">
                          <h3 className="font-semibold">{template.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Subject: {template.subject}
                          </p>
                          <p className="text-sm">{template.preview}</p>
                          <div className="pt-4 flex justify-between">
                            <Button variant="outline">
                              Edit
                            </Button>
                            <Button>
                              Use Template
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="analytics" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Average Open Rate
                        </p>
                        <p className="text-3xl font-bold">24.8%</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Average Click Rate
                        </p>
                        <p className="text-3xl font-bold">12.3%</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Total Subscribers
                        </p>
                        <p className="text-3xl font-bold">5,234</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Email Performance Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={emailData.performanceOverTime}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="openRate" stroke="#40C7B9" name="Open Rate" />
                          <Line type="monotone" dataKey="clickRate" stroke="#9333EA" name="Click Rate" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

