'use client'
import React from 'react'

interface StatCardProps {
  title: string
  value: string | number
  icon: string
  trend?: {
    value: number
    isPositive: boolean
  }
  bgColor?: string
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, bgColor = 'from-amber-500 to-yellow-600' }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow w-full">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className={`w-12 h-12 bg-linear-to-br ${bgColor} rounded-lg flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default StatCard
