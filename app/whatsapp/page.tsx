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
import { whatsappData } from "@/lib/data"

export default function WhatsAppPage() {
  const [activeTab, setActiveTab] = useState("templates")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>WhatsApp Marketing</CardTitle>
          <CardDescription>Manage your WhatsApp templates and campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="templates" className="space-y-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">WhatsApp Templates</h3>
                <Button onClick={() => {
                  toast({
                    title: "Creating new template",
                    description: "You can now design your new WhatsApp template.",
                  })
                }}>Create Template</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Language</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {whatsappData.templates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell>
                        <Badge variant={template.status === "approved" ? "default" : "secondary"}>
                          {template.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{template.language}</TableCell>
                      <TableCell>{template.category}</TableCell>
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
            <TabsContent value="campaigns" className="space-y-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">WhatsApp Campaigns</h3>
                <Button onClick={() => {
                  toast({
                    title: "Creating new campaign",
                    description: "You can now set up your new WhatsApp campaign.",
                  })
                }}>Create Campaign</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent</TableHead>
                    <TableHead>Delivered</TableHead>
                    <TableHead>Read</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {whatsappData.campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>
                        <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{campaign.sent}</TableCell>
                      <TableCell>{campaign.delivered}</TableCell>
                      <TableCell>{campaign.read}</TableCell>
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
            <TabsContent value="analytics" className="space-y-4">
              <h3 className="text-lg font-medium">WhatsApp Analytics</h3>
              <Card>
                <CardHeader>
                  <CardTitle>Message Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={whatsappData.messagePerformance}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="sent" fill="#8884d8" name="Sent" />
                        <Bar dataKey="delivered" fill="#82ca9d" name="Delivered" />
                        <Bar dataKey="read" fill="#ffc658" name="Read" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

