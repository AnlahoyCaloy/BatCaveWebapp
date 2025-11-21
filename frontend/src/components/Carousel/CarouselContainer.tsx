"use client"

import React from 'react'
import Carousel from './Carousel'


const CarouselContainer  = ({ isMobile } : { isMobile : boolean }) => {
  return (
    <div className={`carousel-container w-full ${isMobile ? "-z-1" : "z-1"}`}>
      <Carousel parentWidth={700}/>
    </div>
  )
}

export default CarouselContainer