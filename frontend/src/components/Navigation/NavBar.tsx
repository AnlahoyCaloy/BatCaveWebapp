"use client"
import React from 'react'
import '../../app/globals.css'
import ActionButtonGroup from './Buttons/ActionButtonGroup'
import Image from 'next/image'
import brandImage from '../../../public/icons/brandIcon.png'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion';


const NavBar : React.FC = () => {
  const [isMobile , setIsMobile] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const checkMobile = () => setIsMobile(window.innerWidth < 1185);
    // run once on mount to set initial state
    checkMobile()
    window.addEventListener('resize' , checkMobile)
    return () => window.removeEventListener('resize', checkMobile)

  }, []); // empty dependency array = run once on mount

  return (
    
    <div className='nav-bar-container flex justify-center'>
      { !isMobile ? (
        <nav className='nav-bar max-w-[1500px] w-full rounded-[100px] z-1 mt-1.5'>
          <section className='navigation-section flex h-[160px] justify-between px-20 py-4 pb-5'>
            <div className={`logo flex w-full max-w-[500px] items-center gap-6 font-extrabold text-[23px]`}>
              <div className='rounded-[100px] shadow-[var(--shadow-custom)]' style={{ backgroundColor : "var(--color-coffee-medium)" }}>
                <Image src={brandImage} alt="BatCaveLogo" width={120} height={120}/>
              </div>
              <div className={`text-4xl w-full h-full flex items-center`}>
                <span>Bat Cave Café.</span>
              </div>
            </div>
            <ActionButtonGroup />
          </section>
        </nav>
      ) : (
        <nav className='w-full text-amber-50 relative z-2'>
          <div className='max-w-[1185px] h-[160px] mx-auto flex items-center justify-between px-4 py-3'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 relative rounded-full overflow-hidden shadow-[var(--shadow-custom)]' style={{ backgroundColor: 'var(--color-coffee-medium)' }}>
                <Image src={brandImage} alt="logo" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className='text-lg font-bold'>Bat Cave</div>
            </div>

            <div className='flex items-center gap-3'>
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

          {/* Slide-down menu for mobile */}
          <motion.div className={`${menuOpen ? 'max-h-[800px] py-4' : 'max-h-0'} overflow-hidden transition-all duration-300 bg-[var(--color-coffee-dark)]`}> 
            <div className='max-w-[1185px] mx-auto px-4'>
              <div className='bg-[var(--color-coffee-medium)] rounded-lg p-3'>
                <ActionButtonGroup />
              </div>
            </div>
          </motion.div>
        </nav>
      ) }
      
      
    </div>
  )
}

export default NavBar;