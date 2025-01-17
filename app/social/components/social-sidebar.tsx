"use client"

import { useState, useEffect } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Facebook, Instagram, Linkedin, Twitter, Plus, Calendar, BarChart2, Settings } from 'lucide-react'
import { cn } from "@/lib/utils"
import { ChevronDown, Grid } from 'lucide-react'
import { socialPlatforms } from "@/lib/social-config"
import { useConnectedAccounts } from "@/lib/stores/use-connected-accounts"
import { useFacebookSDK } from '@/lib/facebook-sdk';
import { toast } from "@/components/ui/use-toast"

interface SocialSidebarProps {
  onCreatePost: () => void
}

interface Channel {
  id: string
  name: string
  icon: any
  color: string
  connected: boolean
}

const channels: Channel[] = [
  { id: '1', name: "Facebook", icon: Facebook, color: "text-blue-600", connected: true },
  { id: '2', name: "Instagram", icon: Instagram, color: "text-pink-600", connected: true },
  { id: '3', name: "LinkedIn", icon: Linkedin, color: "text-blue-700", connected: false },
  { id: '4', name: "Twitter", icon: Twitter, color: "text-sky-500", connected: true },
]

interface SocialSidebarProps {
  onCreatePost: () => void
}

export function SocialSidebar({ onCreatePost }: SocialSidebarProps) {
    const { data: session } = useSession()
    const pathname = usePathname()
    const { accounts, addAccount } = useConnectedAccounts()
    const { connectAccount } = useFacebookSDK();

    // Update connected accounts when session changes
    useEffect(() => {
        if (session?.user && session.platform) {
        addAccount({
            id: session.user.platformId as string,
            platform: session.platform as string,
            accountName: session.user.platformName as string,
            profileImage: session.user.platformImage as string,
            accessToken: session.accessToken as string,
        })
        }
    }, [session, addAccount])

    console.log(process.env.FACEBOOK_CLIENT_ID,'CLIENT ID')


    const handleConnect = async (platformId: string) => {
      if (platformId === 'facebook') {
        try {
          const response = await connectAccount();
          console.log('Facebook account connected:', response);
          // Here you would typically send this information to your backend
          // to create or update the user's account
          addAccount({
            id: response.userID,
            platform: 'facebook',
            accountName: 'Facebook User', // You might want to fetch the user's name from the Facebook API
            accessToken: response.accessToken,
          });
          toast({
            title: "Connected to Facebook",
            description: "You have successfully connected your Facebook account.",
          });
        } catch (error) {
          console.error('Facebook connection error:', error);
          toast({
            title: "Facebook Connection Failed",
            description: "There was an error connecting to Facebook. Please try again.",
            variant: "destructive",
          });
        }
      }else{
        await signIn(platformId, { callbackUrl: '/social' })
      }    
    }    
    
    const handleDisconnect = (platform: string) => {
        // signOut({ callbackUrl: '/social' })
        // setConnections(prev => ({ ...prev, [platform]: false }))
    }
    
  return (
    <div className="hidden lg:flex lg:flex-col w-48 border-r bg-background">
      <div className="py-4 pr-4">
        <Button className="w-full" onClick={onCreatePost}>
          <Plus className="mr-2 h-4 w-4" /> Create Post
        </Button>
      </div>
      <ScrollArea className="flex-1 pr-2">
        <div className="space-y-4 py-4">
          <div className="py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Channels
            </h2>
            <div className="space-y-1">
              {/* {channels.map((channel) => (
                <Button
                    key={channel.id}
                    variant="ghost"
                    className={cn(
                    "w-full max-w-[calc(100%-12px)] justify-start whitespace-nowrap relative overflow-hidden group",
                    !channel.connected && "opacity-50"
                    )}
                >
                    <channel.icon className={cn("mr-2 h-4 w-4 shrink-0 z-10", channel.color)} />
                    <div className="absolute left-10 right-0 overflow-hidden max-w-[70%]">
                        <span className="truncate block group-hover:overflow-visible group-hover:-translate-x-5 transition duration-1000">
                            Connect {channel.name}
                        </span>
                    </div>
                </Button>
              ))} */}
               {accounts.map((account) => {
                    const platform = socialPlatforms.find(p => p.id === account.platform)
                    if (!platform) return null

                    const Icon = platform.icon
                    return (
                    <Link key={account.id} href={`/account/${account.platform}`}>
                        <Button
                        variant="ghost"
                        className={cn(
                            "w-full justify-start",
                            pathname === `/account/${account.platform}` && "bg-accent"
                        )}
                        >
                        <Avatar className="h-6 w-6 mr-2">
                            <AvatarImage src={account.profileImage} />
                            <AvatarFallback className={platform.bgColor}>
                            <Icon className={cn("h-4 w-4", platform.color)} />
                            </AvatarFallback>
                        </Avatar>
                        {account.accountName}
                        </Button>
                    </Link>
                    )
                })}

                {socialPlatforms.map((platform) => {
                    const isConnected = accounts.some(a => a.platform === platform.id)
                    if (isConnected) return null

                    return (
                    <Button
                        key={platform.id}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => handleConnect(platform.id)}
                    >
                        <Avatar className="h-6 w-6 mr-2">
                        <AvatarFallback className={platform.bgColor}>
                            <platform.icon className={cn("h-4 w-4", platform.color)} />
                        </AvatarFallback>
                        </Avatar>
                        Connect {platform.name}
                    </Button>
                    )
                })}
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground"
              >
                <ChevronDown className="mr-2 h-4 w-4" />
                Show more channels
              </Button>
            </div>
          </div>
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Tools
            </h2>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Calendar
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <BarChart2 className="mr-2 h-4 w-4" />
                Analytics
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

