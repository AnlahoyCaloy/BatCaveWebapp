'use client'
import React, { useState } from 'react'
import Sidebar from './Sidebar'
import AdminHeader from './AdminHeader'
interface AdminOnlyLayoutProps {
  children: React.ReactNode
}

const AdminOnlyLayout: React.FC<AdminOnlyLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar isOpen={sidebarOpen} />

      <div className="flex-1 flex flex-col">
        <AdminHeader onMenuToggle={() => setSidebarOpen((s) => !s)} sidebarOpen={sidebarOpen} />

        <main className="flex-1 overflow-auto ">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminOnlyLayout
