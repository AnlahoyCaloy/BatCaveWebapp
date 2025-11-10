"use client"
import React, { useEffect } from 'react'
import { useRef } from 'react'; 
import { ResponsiveContainer, StackedCarousel } from 'react-stacked-center-carousel'
import Card from './Card';
import { coffeeProducts } from './Card';
import { motion } from 'framer-motion'

interface CarouselProps {
  parentWidth : number
}


const Carousel : React.FC<CarouselProps> = ({ parentWidth }) => {
  // uses react-stacked-center-carousel by BotDanny thanks
  const carouselRef = useRef<StackedCarousel | undefined>(undefined);

  useEffect(() => {
    // if(carouselRef) {
    //   console.log(carouselRef.current);
    // }
    console.log(parentWidth)
  }, [])

  return (
    <div style={{ width : "100%", position : "relative" }}>
      <ResponsiveContainer
        carouselRef={carouselRef}
        render={(parentWidth , carouselRef)=> {

          let currentVisibleSlide: number;
          if (parentWidth <= 1440) {
            currentVisibleSlide = 3;
          } else if (parentWidth <= 1080) {
            currentVisibleSlide = 1;
          } else {
            currentVisibleSlide = 5
          }

          return (
            <StackedCarousel 
              ref={carouselRef}
              slideComponent={Card} 
              slideWidth={parentWidth < 800 ? parentWidth - 40 : 400}
              carouselWidth={parentWidth}
              data={coffeeProducts} // goes into the 'Card' Component
              currentVisibleSlide={currentVisibleSlide}
              maxVisibleSlide={5}
              useGrabCursor
              height={500}
            >
            </StackedCarousel>
          )
        }}
      />
      <>
        <button className='bg-[#935935] w-[60px] flex items-center justify-center h-[60px] p-4 absolute ' style={{
          top : "40%",
          cursor : "pointer",
          left : "170px",
          zIndex : "10",
          borderRadius : "50px"
        }} onClick={() => {
          carouselRef.current?.goBack();
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>

        <button className='bg-[#935935] w-[60px] flex items-center justify-center h-[60px] p-4 absolute ' style={{
          top : "40%",
          cursor : "pointer",
          right : "170px",
          zIndex : "10",
          borderRadius : "50px"
        }} onClick={() => {
          carouselRef.current?.goNext(6)
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </>

    </div>
  )
}

export default Carousel 