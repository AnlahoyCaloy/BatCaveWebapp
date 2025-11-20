
import StatCard from '@/src/components/AdminComponents/StatCard'
import React from 'react'
import Link from 'next/link'
import AdminOnlyLayout from '@/src/components/AdminComponents/AdminOnlyLayout'


const Admin = () => {
  return (
      <div className="space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="text-sm text-gray-600">Welcome back, Admin</div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Reservations" value={128} icon="📅" trend={{ value: 12, isPositive: true }} />
          <StatCard title="Active Users" value={42} icon="👥" trend={{ value: -4, isPositive: false }} />
    
        </section>

        <section className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <Link href="/admin/reservations" className="text-sm text-amber-600">View all reservations</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link href="/admin/reservations" className="block p-4 rounded-lg bg-amber-50 hover:bg-amber-100">Manage Reservations</Link>
          </div>
        </section>
      </div>
  )
}

export default Admin