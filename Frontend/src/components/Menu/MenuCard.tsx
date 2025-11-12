"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import '../../app/globals.css'


export interface MenuCardProps {
  cover : string;
  description: string;
  value: number;
}


const MenuCard : React.FC<MenuCardProps> = ({cover , description ,value}) => {
  return (
    <motion.div className='menu-card cursor-pointer w-full h-full p-6 items-center flex flex-none'
    style={{ borderRadius : "10px", backgroundColor : "var(--color-accent)", boxShadow : "var(--shadow-custom)" }}
    initial={{ y : 0 }}
    whileHover={{ y : -10 }}>
      <section className='inner-menu-card w-full p-1.5 max-w-[450px] aspect-[5/2] flex items-center'>
        <div className='cover-container h-full w-[210px] relative rounded-[25px] overflow-hidden'>
          <Image 
            src={cover} 
            alt='coffee-img' 
            className='object-cover'
            fill
          />
        </div>

        <div className='info flex flex-col justify-center pl-4 gap-2'
        style={{ color : "black" }}>
          <h2 className='text-[17px] font-semibold'>{description}</h2>
          <p className='text-[18px] font-bold'>${value.toFixed(2)}</p>

          <motion.div className='add-to-cart-btn p-4 font-bold'
          style={{ backgroundColor : "var(--color-coffee-dark)", borderRadius : "25px", width : "100%" , height : "full", alignSelf : "end", }}
          initial={{ y : 0 }}
          whileTap={{ y : 0 }}
          whileHover={{ y : -10, boxShadow : "var(--shadow-custom-button)" }}>
            Add to cart
          </motion.div>
        </div>
      </section>

    </motion.div>
  )
}

export default MenuCard