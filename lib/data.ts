export const dashboardData = {
  stats: {
    totalProjects: 56,
    completedProjects: 32,
    activeProjects: 24,
    totalRevenue: 125400,
  },
  recentActivities: [
    {
      id: 1,
      type: "email",
      description: "Email campaign 'Summer Sale' sent to 2,456 subscribers",
      time: "2 hours ago",
      status: "success"
    },
    {
      id: 2,
      type: "social",
      description: "New lead captured from Facebook Ad Campaign",
      time: "3 hours ago",
      status: "info"
    },
    {
      id: 3,
      type: "whatsapp",
      description: "WhatsApp broadcast reached 89% delivery rate",
      time: "1 day ago",
      status: "success"
    }
  ],
  analyticsData: [
    { name: "Mon", email: 300, social: 200, whatsapp: 100 },
    { name: "Tue", email: 400, social: 300, whatsapp: 150 },
    { name: "Wed", email: 350, social: 250, whatsapp: 120 },
    { name: "Thu", email: 450, social: 350, whatsapp: 180 },
    { name: "Fri", email: 500, social: 400, whatsapp: 200 },
  ],
  upcomingTasks: [
    {
      id: 1,
      title: "Review Q3 Marketing Strategy",
      dueDate: "2024-01-05",
      priority: "high",
      assignee: "John Miller"
    },
    {
      id: 2,
      title: "Launch Email Newsletter",
      dueDate: "2024-01-10",
      priority: "medium",
      assignee: "Sarah Wilson"
    },
    {
      id: 3,
      title: "Social Media Content Planning",
      dueDate: "2024-01-15",
      priority: "low",
      assignee: "Mike Johnson"
    }
  ],
  revenueTrend: [
    { month: "Jan", revenue: 50000 },
    { month: "Feb", revenue: 55000 },
    { month: "Mar", revenue: 60000 },
    { month: "Apr", revenue: 58000 },
    { month: "May", revenue: 65000 },
    { month: "Jun", revenue: 70000 },
  ],
  campaignDistribution: [
    { name: "Email", value: 40 },
    { name: "Social", value: 30 },
    { name: "WhatsApp", value: 20 },
    { name: "Other", value: 10 },
  ],
  projectProgress: [
    { name: "Website Redesign", progress: 75 },
    { name: "Product Launch", progress: 50 },
    { name: "Customer Survey", progress: 90 },
  ],
}

export const emailData = {
  campaigns: [
    {
      id: 1,
      name: "New Year Special",
      status: "active",
      sent: 2456,
      opened: 1789,
      clicked: 892,
      date: "2024-01-01"
    },
    {
      id: 2,
      name: "Product Launch",
      status: "scheduled",
      sent: 0,
      opened: 0,
      clicked: 0,
      date: "2024-01-15"
    },
    {
      id: 3,
      name: "Customer Feedback",
      status: "draft",
      sent: 0,
      opened: 0,
      clicked: 0,
      date: "2024-01-20"
    }
  ],
  templates: [
    {
      id: 1,
      name: "Welcome Email",
      subject: "Welcome to our family!",
      preview: "Start your journey with us..."
    },
    {
      id: 2,
      name: "Monthly Newsletter",
      subject: "Here's what's new this month",
      preview: "Check out our latest updates..."
    },
    {
      id: 3,
      name: "Promotional Offer",
      subject: "Special offer just for you!",
      preview: "Don't miss out on this exclusive deal..."
    }
  ],
  performanceOverTime: [
    { date: "2023-12-01", openRate: 22.5, clickRate: 3.2 },
    { date: "2023-12-08", openRate: 23.1, clickRate: 3.5 },
    { date: "2023-12-15", openRate: 24.0, clickRate: 3.8 },
    { date: "2023-12-22", openRate: 24.8, clickRate: 4.1 },
    { date: "2023-12-29", openRate: 25.5, clickRate: 4.3 },
  ]
}

export const whatsappData = {
  templates: [
    {
      id: 1,
      name: "Order Confirmation",
      status: "approved",
      language: "English",
      category: "UTILITY"
    },
    {
      id: 2,
      name: "Shipping Update",
      status: "pending",
      language: "English",
      category: "UTILITY"
    },
    {
      id: 3,
      name: "Appointment Reminder",
      status: "approved",
      language: "English",
      category: "UTILITY"
    }
  ],
  campaigns: [
    {
      id: 1,
      name: "Flash Sale Alert",
      status: "active",
      sent: 1234,
      delivered: 1200,
      read: 980
    },
    {
      id: 2,
      name: "Customer Survey",
      status: "scheduled",
      sent: 0,
      delivered: 0,
      read: 0
    }
  ],
  messagePerformance: [
    { name: "Week 1", sent: 1000, delivered: 980, read: 750 },
    { name: "Week 2", sent: 1200, delivered: 1150, read: 900 },
    { name: "Week 3", sent: 1500, delivered: 1450, read: 1100 },
    { name: "Week 4", sent: 1800, delivered: 1750, read: 1400 },
  ]
}

export const socialData = {
  posts: [
    {
      id: 1,
      content: "Exciting news! We're launching our new product line next week. Stay tuned! 🚀",
      platform: "facebook",
      type: "text",
      scheduledFor: "2025-01-10T10:00:00",
      status: "scheduled"
    },
    {
      id: 2,
      content: "Check out our latest blog post about digital marketing trends in 2024!",
      platform: "linkedin",
      type: "image",
      scheduledFor: "2025-01-12T14:00:00",
      status: "scheduled"
    },
    {
      id: 3,
      content: "Behind the scenes at our annual team retreat. Building great products starts with a great team!",
      platform: "instagram",
      type: "video",
      scheduledFor: "2025-01-15T09:00:00",
      status: "draft"
    },
    {
      id: 4,
      content: "New product demo: Watch how our latest innovation can simplify your workflow.",
      platform: "youtube",
      type: "video",
      scheduledFor: "2025-01-15T15:30:00",
      status: "scheduled"
    },
    {
      id: 5,
      content: "Quick tip: Boost your productivity with these 5 simple hacks!",
      platform: "instagram",
      type: "reel",
      scheduledFor: "2025-01-20T12:00:00",
      status: "scheduled"
    },
    {
      id: 6,
      content: "Join us for a live Q&A session with our CEO next week!",
      platform: "twitter",
      type: "text",
      scheduledFor: "2025-01-22T18:00:00",
      status: "scheduled"
    },
    {
      id: 7,
      content: "Customer spotlight: See how Company X increased their efficiency by 200% using our platform.",
      platform: "linkedin",
      type: "image",
      scheduledFor: "2025-01-25T11:00:00",
      status: "draft"
    },
    {
      id: 8,
      content: "Flash sale alert! Get 30% off all products for the next 24 hours. Shop now!",
      platform: "facebook",
      type: "image",
      scheduledFor: "2025-01-28T09:00:00",
      status: "scheduled"
    },
    {
      id: 9,
      content: "Tech talk: Exploring the future of AI in business operations.",
      platform: "youtube",
      type: "video",
      scheduledFor: "2025-01-30T16:00:00",
      status: "scheduled"
    },
    {
      id: 10,
      content: "Weekend vibes: Share your favorite way to unwind after a busy week!",
      platform: "instagram",
      type: "short",
      scheduledFor: "2025-02-02T10:00:00",
      status: "scheduled"
    }
  ],
  analytics: {
    facebook: {
      followers: 12500,
      engagement: 3.2,
      reach: 45000
    },
    instagram: {
      followers: 28900,
      engagement: 4.5,
      reach: 67000
    },
    linkedin: {
      followers: 5600,
      engagement: 2.8,
      reach: 15000
    },
    twitter: {
      followers: 18700,
      engagement: 3.7,
      reach: 52000
    }
  }
}

export const postTemplates = [
  {
    id: "1",
    name: "Product Launch Announcement",
    content: "🎉 Exciting news! We're thrilled to announce the launch of our latest product, [Product Name]. [Key Feature 1], [Key Feature 2], and [Key Feature 3] make it a game-changer in [Industry]. Available now at [Link]. #NewProduct #Innovation"
  },
  {
    id: "2",
    name: "Blog Post Promotion",
    content: "📚 New on our blog: '[Blog Post Title]' Learn about [Topic] and how it can [Benefit]. Read now: [Link] #BlogPost #[Industry]"
  },
  {
    id: "3",
    name: "Customer Testimonial",
    content: "❤️ Here's what our customers are saying:\n\n'[Testimonial Quote]' - [Customer Name], [Customer Company]\n\nExperience the difference yourself: [Link] #CustomerLove #Testimonial"
  },
  {
    id: "4",
    name: "Event Invitation",
    content: "🎟️ Join us for [Event Name]!\n\n📅 Date: [Date]\n🕒 Time: [Time]\n📍 Location: [Location]\n\nLearn from industry experts and network with peers. Register now: [Link] #EventInvitation #Networking"
  }
]

export const adTemplates = [
  {
    id: "1",
    name: "Product Showcase",
    content: "Introducing [Product Name]: The solution you've been waiting for. [Key Benefit 1] and [Key Benefit 2]. Limited time offer: [Discount/Offer]. Shop now! [Call-to-Action]"
  },
  {
    id: "2",
    name: "Lead Magnet Promotion",
    content: "Free [eBook/Whitepaper/Guide] on [Topic]. Learn how to [Benefit] and [Benefit]. Download now and take your [Industry] skills to the next level! [Call-to-Action]"
  },
  {
    id: "3",
    name: "Flash Sale",
    content: "⚡ 24-Hour Flash Sale ⚡\nGet [Discount]% off on all [Product Category]. Don't miss out on these incredible savings! Sale ends [Date/Time]. Shop now before it's too late! [Call-to-Action]"
  },
  {
    id: "4",
    name: "Testimonial Ad",
    content: "'[Short Testimonial Quote]' - [Customer Name]\n\nJoin thousands of satisfied customers and experience the [Brand Name] difference. [Key Benefit]. Try it today! [Call-to-Action]"
  }
]

export const contactsData = {
  contacts: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 890",
      status: "active",
      tags: ["customer", "premium"],
      lastContact: "2024-01-01"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 234 567 891",
      status: "inactive",
      tags: ["lead"],
      lastContact: "2023-12-25"
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "+1 234 567 892",
      status: "active",
      tags: ["customer"],
      lastContact: "2024-01-02"
    }
  ],
  segments: [
    {
      id: 1,
      name: "Premium Customers",
      count: 250,
      criteria: "tag:premium"
    },
    {
      id: 2,
      name: "Newsletter Subscribers",
      count: 1200,
      criteria: "subscribed:newsletter"
    },
    {
      id: 3,
      name: "Inactive Users",
      count: 450,
      criteria: "status:inactive"
    }
  ]
}

export const automationData = {
  workflows: [
    {
      id: 1,
      name: "Welcome Series",
      status: "active",
      triggers: ["New Subscription"],
      steps: 5,
      activeUsers: 234
    },
    {
      id: 2,
      name: "Abandoned Cart",
      status: "active",
      triggers: ["Cart Abandoned"],
      steps: 3,
      activeUsers: 56
    },
    {
      id: 3,
      name: "Re-engagement",
      status: "paused",
      triggers: ["Inactive for 30 days"],
      steps: 4,
      activeUsers: 0
    }
  ]
}

