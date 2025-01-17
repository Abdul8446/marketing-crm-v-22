"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'user'
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()  

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    // This is a mock login function. In a real application, you would call your API here.
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@example.com' && password === 'password') {
          const user: User = { id: '1', name: 'Admin User', email, role: 'admin' }
          setUser(user)
          localStorage.setItem('user', JSON.stringify(user))
          resolve()
        } else if (email === 'manager@example.com' && password === 'password') {
          const user: User = { id: '2', name: 'Manager User', email, role: 'manager' }
          setUser(user)
          localStorage.setItem('user', JSON.stringify(user))
          resolve()
        } else if (email === 'user@example.com' && password === 'password') {
          const user: User = { id: '3', name: 'Regular User', email, role: 'user' }
          setUser(user)
          localStorage.setItem('user', JSON.stringify(user))
          resolve()
        } else {
          reject(new Error('Invalid email or password'))
        }
      }, 1000) // Simulate API delay
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

