'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

interface LayoutClientProps {
  children: React.ReactNode
}

export default function LayoutClient({ children }: LayoutClientProps) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    return null
  }

  return <>{children}</>
}
