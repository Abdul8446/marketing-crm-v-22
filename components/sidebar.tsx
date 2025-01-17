"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { BarChart3, Mail, MessageSquare, Share2, Layout, Users, Settings, Zap, PieChart, Users2, LinkIcon, ChevronDown, Menu } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

// const navigation = [
//   {
//     name: "Dashboard",
//     href: "/",
//     icon: BarChart3,
//   },
//   {
//     name: "Marketing",
//     icon: Layout,
//     children: [
//       {
//         name: "Email Marketing",
//         href: "/email",
//         icon: Mail,
//       },
//       {
//         name: "WhatsApp Marketing",
//         href: "/whatsapp",
//         icon: MessageSquare,
//       },
//       {
//         name: "Social Media",
//         href: "/social",
//         icon: Share2,
//       },
//     ],
//   },
//   {
//     name: "Advertising",
//     href: "/advertising",
//     icon: Layout,
//   },
//   {
//     name: "Contacts",
//     href: "/contacts",
//     icon: Users,
//   },
//   {
//     name: "Automation",
//     href: "/automation",
//     icon: Zap,
//   },
//   {
//     name: "Analytics",
//     href: "/analytics",
//     icon: PieChart,
//   },
//   {
//     name: "Collaboration",
//     href: "/collaboration",
//     icon: Users2,
//   },
//   {
//     name: "Integration",
//     href: "/integration",
//     icon: LinkIcon,
//   },
//   {
//     name: "Settings",
//     href: "/settings",
//     icon: Settings,
//   },
// ]

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: BarChart3,
    roles: ['admin', 'manager', 'user'],
  },
  {
    name: "Marketing",
    icon: Layout,
    roles: ['admin', 'manager'],
    children: [
      {
        name: "Email Marketing",
        href: "/email",
        icon: Mail,
        roles: ['admin', 'manager'],
      },
      {
        name: "WhatsApp Marketing",
        href: "/whatsapp",
        icon: MessageSquare,
        roles: ['admin', 'manager'],
      },
      {
        name: "Social Media",
        href: "/social",
        icon: Share2,
        roles: ['admin', 'manager'],
      },
    ],
  },
  {
    name: "Advertising",
    href: "/advertising",
    icon: Layout,
    roles: ['admin', 'manager'],
  },
  {
    name: "Contacts",
    href: "/contacts",
    icon: Users,
    roles: ['admin', 'manager', 'user'],
  },
  {
    name: "Automation",
    href: "/automation",
    icon: Zap,
    roles: ['admin', 'manager'],
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: PieChart,
    roles: ['admin', 'manager'],
  },
  {
    name: "Collaboration",
    href: "/collaboration",
    icon: Users2,
    roles: ['admin', 'manager', 'user'],
  },
  {
    name: "Integration",
    href: "/integration",
    icon: LinkIcon,
    roles: ['admin'],
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    roles: ['admin'],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <div className="flex h-full flex-col">
            <div className="flex h-[60px] items-center border-b px-6">
              <Link className="flex items-center gap-2 font-semibold" href="/">
                <BarChart3 className="h-6 w-6" />
                <span className="">Marketing CRM</span>
              </Link>
            </div>
            <ScrollArea className="flex-1 px-3">
              <div className="space-y-1 py-2">
                {navigation.map((item) =>
                  item.roles.includes(user?.role || '') && (
                    item.children ? (
                      <div key={item.name}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start font-semibold"
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.name}
                          <ChevronDown className="ml-auto h-4 w-4" />
                        </Button>
                        <div className="ml-4 mt-2 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className={cn(
                                "block rounded-lg px-2 py-1 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800",
                                pathname === child.href
                                  ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                                  : "text-gray-700 dark:text-gray-400"
                              )}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                          pathname === item.href ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50" : ""
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{item.name}</span>
                      </Link>
                    )
                  )
                )}
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="/">
              <BarChart3 className="h-6 w-6" />
              <span className="">Marketing CRM</span>
            </Link>
          </div>
          <ScrollArea className="flex-1 px-3">
            <div className="space-y-1 py-2">
              {navigation.map((item) =>
                item.roles.includes(user?.role || '') && (
                  item.children ? (
                    <div key={item.name}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start font-semibold"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                        <ChevronDown className="ml-auto h-4 w-4" />
                      </Button>
                      <div className="ml-4 mt-2 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={cn(
                              "block rounded-lg px-2 py-1 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800",
                              pathname === child.href
                                ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                                : "text-gray-700 dark:text-gray-400"
                            )}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                        pathname === item.href ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50" : ""
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                  )
                )
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  )
}

