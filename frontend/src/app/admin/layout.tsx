import React from 'react'
import AdminOnlyLayout from '@/src/components/AdminComponents/AdminOnlyLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin - Bat Cave',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminOnlyLayout>
      {children}
    </AdminOnlyLayout>
  )
}
