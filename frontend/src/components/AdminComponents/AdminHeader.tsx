'use client'
import React from 'react'
import Image from 'next/image'
import brandImage from '../../../public/icons/brandIcon.png'
import ThemeToggle from '@/src/components/ThemeToggle/ThemeToggle'

interface AdminHeaderProps {
  onMenuToggle?: () => void
  sidebarOpen?: boolean
  title?: string
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuToggle, sidebarOpen, title = 'Admin' }) => {
  return (
    <header className="bg-[var(--color-coffee-medium)] border-b border-gray-20 ">
      <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            aria-label="Toggle menu"
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden shadow" style={{ backgroundColor: 'var(--color-coffee-medium)' }}>
              <Image src={brandImage} alt="brand" width={40} height={40} />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-amber-300">{title}</h1>
              <p className="text-xs text-amber-500">Manage reservations, users, and settings</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="relative">
            <input
              className="border px-3 py-2 rounded-md w-56 placeholder-gray-400 text-sm"
              placeholder="Search reservations, users..."
            />
          </div>

          <button className="p-2 rounded-md hover:bg-gray-100 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-md hover:bg-gray-100 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.761 0 5.303.8 7.379 2.163M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-sm text-amber-400 font-semibold">Admin</div>
                <div className="text-xs text-amber-500">admin@batcave.local</div>
              </div>
              <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-sm">A</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
