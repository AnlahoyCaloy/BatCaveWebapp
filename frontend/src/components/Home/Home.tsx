"use client"
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [isMobile , setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1185);
    checkMobile() // run oonce bouys
    window.addEventListener('resize' , checkMobile); // resize then callback
    return window.removeEventListener('resize', checkMobile); // callback
  }, [])

  return (
    <div>Home</div>
  )
}

export default Home