"use client"
import React from 'react'
import { motion, Variants } from 'framer-motion'

type CardLayout = {
  children : React.ReactNode
}

const CardLayout: React.FC<CardLayout> = ({ children }) => {

  const cardAnimation : Variants = {
    hidden : {
      height : 20,
      scale : 0.3,
      opacity : 0.9
    },
    animate : {
      height : 100,
      scale : 1,
      opacity : 1,
      transition : { type : "spring" , stiffness : 400, damping : 25 }
    }

  }

  return (
    <motion.div
    className='w-full h-full flex-col flex items-center'
    variants={cardAnimation}
    initial={"hidden"}
    animate={"animate"}>
      {children}
    </motion.div>
  )
}

export default CardLayout