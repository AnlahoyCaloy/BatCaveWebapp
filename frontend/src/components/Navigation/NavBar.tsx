"use client"
import React, { useEffect, useState } from 'react'
import '../../app/globals.css'
import ActionButtonGroup from './Buttons/ActionButtonGroup'
import Image from 'next/image'
import brandImage from '../../../public/images/bg.png'
import { motion, AnimatePresence } from 'framer-motion'
import MenuButtons from './Buttons/MenuButtons'
import ThemeToggle from '@/src/components/ThemeToggle/ThemeToggle'
import { usePathname } from 'next/navigation'

const NavBar: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo(0, 0)

    const checkMobile = () => setIsMobile(window.innerWidth < 1185)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname])

  return (
    <div className='nav-bar-container flex justify-center'>
      {/* Desktop Navbar */}
      {!isMobile ? (
        <nav className='nav-bar max-w-[1500px] w-full rounded-[100px] z-2 mt-1.5 '>
          <section className='navigation-section flex h-[160px] justify-between px-20 py-4 pb-5'>
            <div className='logo flex w-full max-w-[500px] items-center gap-6 font-extrabold text-[23px]'>
              <div className='' >
                <Image src={brandImage} alt="BatCaveLogo" width={150} height={150}/>
              </div>
              <div className='text-4xl w-full h-full flex items-center'>
                  <span className='opacity-75'>Bat Cave Café.</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <ActionButtonGroup />
              </div>
          </section>
        </nav>
      ) : (
        // Mobile Navbar
        <nav className='w-full text-amber-50 relative z-2'>
          <div className='max-w-[1185px] h-[160px] mx-auto flex items-center justify-between px-4 py-3'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 relative rounded-full overflow-hidden shadow-[var(--shadow-custom)]' style={{ backgroundColor: 'var(--color-coffee-medium)' }}>
                <Image src={brandImage} alt="logo" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className='text-lg font-bold'>Bat Cave</div>
            </div>

            <div className='flex items-center gap-3'>
              <ThemeToggle />
              <button
                aria-label="Open menu"
                onClick={() => setMenuOpen((v) => !v)}
                className='p-2 rounded-md bg-amber-700/20 hover:bg-amber-700/40'
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <AnimatePresence>
            {menuOpen && (
              <>
                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMenuOpen(false)}
                  className="fixed inset-0 bg-black z-100"
                />
                {/* Sidebar Menu */}
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'tween', duration: 0.3 }}
                  className='fixed top-0 left-0 w-64 h-full bg-[var(--color-coffee-dark)] z-100 shadow-lg p-4 flex flex-col'
                >
                  <div className='flex justify-between items-center mb-6'>
                    <span className='text-xl font-bold text-amber-50'>Menu</span>
                    <button onClick={() => setMenuOpen(false)} className='text-amber-50 text-2xl font-bold'>&times;</button>
                  </div>
                  <div className='flex flex-col gap-4'>
                    {/* <ActionButtonGroup /> */}
                    <MenuButtons/>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </nav>
      )}
    </div>
  )
}

export default NavBar