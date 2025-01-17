"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { dashboardData } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowUpRight, Calendar, Mail, MessageSquare, Share2, TrendingUp, Users, AlertCircle, ArrowRight } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { withAuth } from '@/components/protected-route'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function DashboardPage() {
  const [selectedMetric, setSelectedMetric] = useState("all")
  const [showAlert, setShowAlert] = useState(true)

  const stats = dashboardData?.stats || {
    totalProjects: 0,
    activeProjects: 0,
    totalRevenue: 0,
  }
  const recentActivities = dashboardData?.recentActivities || []
  const analyticsData = dashboardData?.analyticsData || []
  const upcomingTasks = dashboardData?.upcomingTasks || []
  const revenueTrend = dashboardData?.revenueTrend || []
  const campaignDistribution = dashboardData?.campaignDistribution || []
  const projectProgress = dashboardData?.projectProgress || []

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md flex justify-between items-center"
          >
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <p>Your monthly report is ready. Click here to view it.</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowAlert(false)}>
              Dismiss
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-none">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">
                Welcome back, <span className="text-primary">John Miller</span>
              </h1>
              <p className="text-muted-foreground">
                Here's an overview of your marketing performance today.
              </p>
              <div className="flex gap-4">
                <Button>View Detailed Reports</Button>
                <Button variant="outline">Schedule Strategy Meeting</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Projects",
            value: stats.totalProjects,
            icon: Calendar,
            trend: "+12%",
            description: "vs. last month"
          },
          {
            title: "Active Projects",
            value: stats.activeProjects,
            icon: TrendingUp,
            trend: "+5%",
            description: "vs. last month"
          },
          {
            title: "Total Revenue",
            value: `$${stats.totalRevenue.toLocaleString()}`,
            icon: ArrowUpRight,
            trend: "+8%",
            description: "vs. last month"
          },
          {
            title: "Team Members",
            value: "12",
            icon: Users,
            trend: "+2",
            description: "new this month"
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between pt-4">
                  <h2 className="text-3xl font-bold">{stat.value}</h2>
                  <Badge variant="secondary" className="text-xs">
                    {stat.trend}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Channel Performance</CardTitle>
            <CardDescription>Compare performance across marketing channels</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="all"
              value={selectedMetric}
              onValueChange={setSelectedMetric}
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Channels</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
                <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
              </TabsList>
              <div className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {selectedMetric === "all" || selectedMetric === "email" ? (
                      <Bar
                        dataKey="email"
                        fill="rgb(64, 199, 185)"
                        name="Email"
                      />
                    ) : null}
                    {selectedMetric === "all" || selectedMetric === "social" ? (
                      <Bar
                        dataKey="social"
                        fill="rgb(147, 51, 234)"
                        name="Social"
                      />
                    ) : null}
                    {selectedMetric === "all" || selectedMetric === "whatsapp" ? (
                      <Bar
                        dataKey="whatsapp"
                        fill="rgb(34, 197, 94)"
                        name="WhatsApp"
                      />
                    ) : null}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your latest marketing actions and results</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-4 rounded-lg border p-4"
                  >
                    <div className="rounded-full p-2 bg-primary/10">
                      {activity.type === "email" && (
                        <Mail className="h-4 w-4 text-primary" />
                      )}
                      {activity.type === "social" && (
                        <Share2 className="h-4 w-4 text-primary" />
                      )}
                      {activity.type === "whatsapp" && (
                        <MessageSquare className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.description}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                    <Badge
                      variant={
                        activity.status === "success"
                          ? "default"
                          : activity.status === "warning"
                          ? "warning"
                          : "secondary"
                      }
                    >
                      {activity.status}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#40C7B9" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Distribution</CardTitle>
            <CardDescription>Allocation of marketing efforts across channels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={campaignDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {campaignDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {campaignDistribution.map((item, index) => (
                <div key={item.name} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
            <CardDescription>Status of your ongoing marketing projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectProgress.map((project) => (
                <div key={project.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{project.name}</span>
                    <span className="text-sm text-muted-foreground">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Tasks</CardTitle>
          <CardDescription>Your scheduled marketing activities for the near future</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline">{task.priority}</Badge>
                  <Badge variant="secondary">{task.assignee}</Badge>
                  <Button variant="ghost" size="icon">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default withAuth(DashboardPage, ['admin', 'manager', 'user'])

