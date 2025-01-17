import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken?: string
    platform?: string
    user: {
      platformId?: string
      platformName?: string
      platformImage?: string
    } & DefaultSession["user"]
  }

  interface User {
    platform?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    platform?: string
    platformId?: string
    platformName?: string
    platformImage?: string
  }
}   
