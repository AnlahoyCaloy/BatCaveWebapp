'use client'
import React, { useState } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
        
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
