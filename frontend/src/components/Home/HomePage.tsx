"use client"
import React, { useEffect, useState } from 'react'
import Section from '../Section';
import HomeSearch from '../SearchBar/HomeSearch';
import CarouselContainer from '../Carousel/CarouselContainer';
import { animationVariant2 } from '@/src/app/page';

const HomePage = () => {
  const [isMobile , setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1185);
    checkMobile() // run oonce bouys
    window.addEventListener('resize' , checkMobile); // resize then callback
    return () => {
      window.removeEventListener('resize', checkMobile); // callback
    }
  }, [])

  return (
    <Section isAnimated={true} animationVariant={animationVariant2} navBarHeight={176} style={{ alignItems : "center", justifyContent : "center"}}> 
        {/* 175 is the height of the navbar */}
        <HomeSearch /> 
          <h1 style={{
            fontFamily : 'var(--font-Cinzel)',
            fontSize : '35px'
          }}>Explore Drinks</h1>
        <CarouselContainer isMobile={isMobile}/>
    </Section>
  )
}

export default HomePage;