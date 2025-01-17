"use client"

import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from '@/lib/auth-context'
import { SessionProvider } from "next-auth/react"

const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Marketing CRM",
//   description: "A comprehensive marketing CRM solution",
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                  <Header />
                  <main className="flex-1 overflow-y-auto p-6">
                    {children}
                  </main>
                  <Footer />
                </div>
              </div>
            </ThemeProvider>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

