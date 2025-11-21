
import StatCard from '@/src/components/AdminComponents/StatCard'
import React from 'react'
import Link from 'next/link'
import AdminOnlyLayout from '@/src/components/AdminComponents/AdminOnlyLayout'


const Admin = () => {
  return (
      <div className="space-y-6 flex flex-col items-center">
        <header className="flex items-center justify-between gap-10">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="text-sm text-gray-600">Welcome back, Admin</div>
        </header>

        <section className="flex gap-10">
          <StatCard title="Total Reservations" value={128} icon="📅" trend={{ value: 12, isPositive: true }} />
          <StatCard title="Active Users" value={42} icon="👥" trend={{ value: -4, isPositive: false }} />
        </section>

        <section className="bg-[var(--color-coffee-2)] rounded-lg shadow p-4 max-w-[700px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <Link href="/admin/reservations" className="text-sm text-amber-600">View all reservations</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link href="/admin/reservations" className="block p-4 rounded-lg bg-gradient-to-r from-amber-400 to-amber-800 hover:scale-106 transition active:scale-95 text-black">Manage Reservations</Link>
          </div>
        </section>
      </div>
  )
}

export default Admin