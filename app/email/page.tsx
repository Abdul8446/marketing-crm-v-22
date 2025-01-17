"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { emailData } from "@/lib/data"
import EmailV12 from "@/components/EmailV12"

export default function EmailPage() {
  const [activeTab, setActiveTab] = useState("campaigns")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Marketing</CardTitle>
          <CardDescription>Manage your email campaigns and analyze their performance</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="campaigns" className="space-y-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Email Campaigns</h3>
                <Button onClick={() => {
                  toast({
                    title: "Creating new campaign",
                    description: "You can now set up your new email campaign.",
                  })
                }}>Create Campaign</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent</TableHead>
                    <TableHead>Opened</TableHead>
                    <TableHead>Clicked</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emailData.campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>
                        <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{campaign.sent}</TableCell>
                      <TableCell>{campaign.opened}</TableCell>
                      <TableCell>{campaign.clicked}</TableCell>
                      <TableCell>
                        <Button variant="ghost" onClick={() => {
                          toast({
                            title: "Editing campaign",
                            description: `You're now editing the ${campaign.name} campaign.`,
                          })
                        }}>Edit</Button>
                        <Button variant="ghost" className="text-red-500" onClick={() => {
                          toast({
                            title: "Deleting campaign",
                            description: `The ${campaign.name} campaign has been deleted.`,
                            variant: "destructive",
                          })
                        }}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="templates" className="space-y-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Email Templates</h3>
                <Button onClick={() => {
                  toast({
                    title: "Creating new template",
                    description: "You can now design your new email template.",
                  })
                }}>Create Template</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Preview</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emailData.templates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell>{template.subject}</TableCell>
                      <TableCell>{template.preview}</TableCell>
                      <TableCell>
                        <Button variant="ghost" onClick={() => {
                          toast({
                            title: "Editing template",
                            description: `You're now editing the ${template.name} template.`,
                          })
                        }}>Edit</Button>
                        <Button variant="ghost" className="text-red-500" onClick={() => {
                          toast({
                            title: "Deleting template",
                            description: `The ${template.name} template has been deleted.`,
                            variant: "destructive",
                          })
                        }}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <h3 className="text-lg font-medium">Email Analytics</h3>
              <Card>
                <CardHeader>
                  <CardTitle>Performance Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={emailData.performanceOverTime}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip />
                        <Bar yAxisId="left" dataKey="openRate" fill="#8884d8" name="Open Rate" />
                        <Bar yAxisId="right" dataKey="clickRate" fill="#82ca9d" name="Click Rate" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <EmailV12/>
    </div>
  )  
}
    
