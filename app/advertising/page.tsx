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
import { DollarSign, Users, MousePointer, BarChart2, TrendingUp, ArrowUpRight } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { adTemplates } from "@/lib/data"

// Mock data for the chart
const performanceData = [
  { name: "Jan", spend: 4000, impressions: 2400, clicks: 400 },
  { name: "Feb", spend: 3000, impressions: 1398, clicks: 210 },
  { name: "Mar", spend: 2000, impressions: 9800, clicks: 290 },
  { name: "Apr", spend: 2780, impressions: 3908, clicks: 500 },
  { name: "May", spend: 1890, impressions: 4800, clicks: 380 },
  { name: "Jun", spend: 2390, impressions: 3800, clicks: 420 },
]

const campaigns = [
  { id: 1, name: "Summer Sale", platform: "Facebook", budget: "$1000", status: "Active" },
  { id: 2, name: "Product Launch", platform: "Google Ads", budget: "$1500", status: "Paused" },
  { id: 3, name: "Brand Awareness", platform: "Instagram", budget: "$800", status: "Active" },
  { id: 4, name: "Retargeting", platform: "LinkedIn", budget: "$600", status: "Scheduled" },
]

export default function AdvertisingPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [campaignContent, setCampaignContent] = useState("")

  const handleTemplateSelect = (templateId: string) => {
    const template = adTemplates.find(t => t.id === templateId)
    if (template) {
      setSelectedTemplate(template.id)
      setCampaignContent(template.content)
    }
  }

  const handleCreateCampaign = (event: React.FormEvent) => {
    event.preventDefault()
    console.log("Creating campaign:", { campaignContent, selectedTemplate })
    toast({
      title: "Campaign Created",
      description: "Your advertising campaign has been successfully created.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Advertising Management</CardTitle>
          <CardDescription>Manage and analyze your advertising campaigns across multiple platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="create">Create Campaign</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Spend
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$12,345</div>
                    <p className="text-xs text-muted-foreground">
                      +15% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Impressions
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1.2M</div>
                    <p className="text-xs text-muted-foreground">
                      +8% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Click-Through Rate
                    </CardTitle>
                    <MousePointer className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2.4%</div>
                    <p className="text-xs text-muted-foreground">
                      +0.3% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Conversion Rate
                    </CardTitle>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3.2%</div>
                    <p className="text-xs text-muted-foreground">
                      +0.5% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Line yAxisId="left" type="monotone" dataKey="spend" stroke="#8884d8" />
                        <Line yAxisId="left" type="monotone" dataKey="impressions" stroke="#82ca9d" />
                        <Line yAxisId="right" type="monotone" dataKey="clicks" stroke="#ffc658" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="campaigns" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign Name</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>{campaign.platform}</TableCell>
                      <TableCell>{campaign.budget}</TableCell>
                      <TableCell>
                        <Badge variant={campaign.status === "Active" ? "default" : "secondary"}>
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" onClick={() => {
                          toast({
                            title: "Campaign Edited",
                            description: "Your campaign has been successfully edited.",
                          })
                        }}>Edit</Button>
                        <Button variant="ghost" className="text-red-500" onClick={() => {
                          toast({
                            title: "Campaign Deleted",
                            description: "Your campaign has been successfully deleted.",
                            variant: "destructive",
                          })
                        }}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="create" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Campaign</CardTitle>
                  <CardDescription>Set up a new advertising campaign</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleCreateCampaign}>
                    <div className="space-y-2">
                      <Label htmlFor="campaign-name">Campaign Name</Label>
                      <Input id="campaign-name" placeholder="Enter campaign name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ad-template">Ad Template</Label>
                      <Select onValueChange={handleTemplateSelect}>
                        <SelectTrigger id="ad-template">
                          <SelectValue placeholder="Select an ad template" />
                        </SelectTrigger>
                        <SelectContent>
                          {adTemplates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="campaign-content">Campaign Content</Label>
                      <Textarea 
                        id="campaign-content" 
                        placeholder="Enter your campaign content here..." 
                        value={campaignContent}
                        onChange={(e) => setCampaignContent(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="platform">Platform</Label>
                      <Select>
                        <SelectTrigger id="platform">
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="google">Google Ads</SelectItem>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget</Label>
                      <Input id="budget" type="number" placeholder="Enter budget amount" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input id="start-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <Input id="end-date" type="date" />
                    </div>
                    <Button type="submit">Create Campaign</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

