"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import '../../../app/globals.css'
import { usePathname } from 'next/navigation'
const MenuButtons: React.FC = () => {
    const router = useRouter()
    const pathname = usePathname()

    
    const buttons = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'Rooms', path: '/rooms' },
    { label: 'Contact', path: '/contact' },
    ]

    return (
    <div className="menu-buttons flex flex-col sm:flex-row md:flex-col gap-3">
        {buttons.map((btn) => (
        <button
            key={btn.label}
            onClick={() => router.push(btn.path)}
            className="px-4 py-2 bg-gradient-to-r from-amber-800 to-amber-400 text-white rounded-lg hover:bg-amber-500 transition-colors duration-200 text-sm font-semibold"
            style={{ boxShadow : 'var(--shadow-custom)' }}
            >
            {btn.label}
        </button>
        ))}
    </div>
    )
}

export default MenuButtons
