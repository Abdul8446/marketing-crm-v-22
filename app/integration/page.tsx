"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Salesforce, Slack, Mailchimp, Zapier, GoogleAnalytics } from "./integration-icons"

const integrations = [
  { name: "Salesforce", icon: Salesforce, status: "Connected", lastSync: "2 hours ago" },
  { name: "HubSpot", icon: GoogleAnalytics, status: "Not Connected", lastSync: "N/A" },
  { name: "Mailchimp", icon: Mailchimp, status: "Connected", lastSync: "1 day ago" },
  { name: "Slack", icon: Slack, status: "Connected", lastSync: "5 minutes ago" },
  { name: "Zapier", icon: Zapier, status: "Connected", lastSync: "3 hours ago" },
  { name: "Google Analytics", icon: GoogleAnalytics, status: "Connected", lastSync: "1 hour ago" },
]

export default function IntegrationPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Integrations</CardTitle>
          <CardDescription>Connect and manage your marketing tools and services</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="manage">Manage Integrations</TabsTrigger>
              <TabsTrigger value="add">Add New Integration</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {integrations.map((integration) => (
                  <Card key={integration.name}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <integration.icon className="h-10 w-10" />
                        <div className="space-y-1">
                          <h3 className="font-semibold">{integration.name}</h3>
                          <Badge variant={integration.status === "Connected" ? "default" : "secondary"}>
                            {integration.status}
                          </Badge>
                        </div>
                      </div>
                      {integration.status === "Connected" && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          Last synced: {integration.lastSync}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="manage" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Integration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Sync</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {integrations.map((integration) => (
                    <TableRow key={integration.name}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <integration.icon className="h-6 w-6" />
                          <span>{integration.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={integration.status === "Connected" ? "default" : "secondary"}>
                          {integration.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{integration.lastSync}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">Configure</Button>
                          <Button variant="ghost" size="sm" className="text-destructive">Disconnect</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="add" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Integration</CardTitle>
                  <CardDescription>Connect a new tool or service to your marketing CRM</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="integration-type">Integration Type</Label>
                      <Input id="integration-type" placeholder="Search for an integration..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="api-key">API Key</Label>
                      <Input id="api-key" type="password" placeholder="Enter API key" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="terms" />
                      <Label htmlFor="terms">I agree to the terms and conditions</Label>
                    </div>
                    <Button type="submit">Add Integration</Button>
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

