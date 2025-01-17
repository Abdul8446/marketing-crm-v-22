"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SocialSidebar } from "./components/social-sidebar"
import { QueueView } from "./components/queue-view"
import { CalendarView } from "./components/calendar-view"
import { AnalyticsView } from "./components/analytics-view"
import { PostComposer } from "./components/post-composer"
// import { useFacebookSDK } from '@/lib/facebook-sdk';

export default function SocialV18() {
  const [activeTab, setActiveTab] = useState("queue")
  const [showComposer, setShowComposer] = useState(false)

  // useFacebookSDK();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Social Media Marketing v 18</CardTitle>
          <CardDescription>Manage your social media campaigns and analyze performance across platforms</CardDescription>
        </CardHeader>
        <CardContent className="flex">
          <SocialSidebar onCreatePost={() => setShowComposer(true)} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 space-y-4 p-8 pt-6">
              <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Publishing</h2>
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                  <TabsTrigger value="queue">Queue</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                <TabsContent value="queue" className="space-y-4">
                  <QueueView />
                </TabsContent>
                <TabsContent value="calendar" className="space-y-4">
                  <CalendarView />
                </TabsContent>
                <TabsContent value="analytics" className="space-y-4">
                  <AnalyticsView />
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <PostComposer 
            isOpen={showComposer} 
            onClose={() => setShowComposer(false)} 
            />
        </CardContent>
      </Card>  
    </div>  
  )
}

