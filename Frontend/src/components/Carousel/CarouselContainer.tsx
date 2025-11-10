"use client"

import React from 'react'
import Carousel from './Carousel'

const CarouselContainer = () => {
  return (
    <div className='carousel-container w-full'>
      <Carousel parentWidth={700}/>
    </div>
  )
}

export default CarouselContainer