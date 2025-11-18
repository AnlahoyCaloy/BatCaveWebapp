"use client"
import React from 'react'
import { motion , Variants } from 'framer-motion'

interface SectionProps {
  children : React.ReactNode,
  color? : string,
  navBarHeight? : number | 0,
  className? : string,
  style? : React.CSSProperties,
  isAnimated : boolean,
  animationVariant? : Variants
}


const Section : React.FC<SectionProps> = ({ children , color , navBarHeight , className, style, isAnimated, animationVariant}) => {

  return (
    <motion.div
    // will change this animation in the future
    variants={animationVariant}
    initial={isAnimated ? "hidden" : isAnimated ? "card" : undefined}
    whileInView={isAnimated ? "scrollView" : undefined}
    viewport={isAnimated ? { once : true , margin : "-200px"} : undefined}
    className={`w-full h-full flex-col flex-1 flex  ${className || ''}`} style={{
      minHeight : `calc(100vh - ${navBarHeight || 0}px)`, // minus the navbars height
      backgroundColor : color,
      ...style,
    }}>
      {children}
    </motion.div>
  )
}

export default Section