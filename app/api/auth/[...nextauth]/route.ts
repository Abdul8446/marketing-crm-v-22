import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import TwitterProvider from "next-auth/providers/twitter"
import InstagramProvider from "next-auth/providers/instagram"
import LinkedInProvider from "next-auth/providers/linkedin"

const handler = NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture?.data?.url,
          platform: "facebook",
        }
      },
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.id_str,
          name: profile.name,
          email: profile.email,
          image: profile.profile_image_url_https,
          platform: "twitter",
        }
      },
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID!,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          image: profile.profile_picture,
          platform: "instagram",
        }
      },
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.localizedFirstName + " " + profile.localizedLastName,
          email: profile.emailAddress,
          image: profile.profilePicture?.["displayImage~"]?.elements[0]?.identifiers[0]?.identifier,
          platform: "linkedin",
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.platform = account.provider
      }
      if (user) {
        token.platformId = user.id
        token.platformName = user.name
        token.platformImage = user.image
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.platformId = token.platformId
        session.user.platformName = token.platformName
        session.user.platformImage = token.platformImage
        session.accessToken = token.accessToken
        session.platform = token.platform
      }
      return session
    },
  },
  pages: {
    signIn: '/social',
  },
})

export { handler as GET, handler as POST }

