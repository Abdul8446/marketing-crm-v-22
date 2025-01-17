"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

export function withAuth(WrappedComponent: React.ComponentType, allowedRoles: string[] = []) {
  return function ProtectedRoute(props: any) {
    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!user) {
        router.push('/login')
      } else if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        router.push('/unauthorized')
      }
    }, [user, router])

    if (!user || (allowedRoles.length > 0 && !allowedRoles.includes(user.role))) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}

