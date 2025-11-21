"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import '../../app/globals.css'

export interface MenuCardProps {
  cover: string;
  description: string;
  value: number;
}

const MenuCard: React.FC<MenuCardProps> = ({ cover, description, value }) => {
  return (
    <motion.div
    className="menu-card relative cursor-pointer w-[350px] h-[350px] overflow-hidden rounded-[20px] flex-none"
    style={{ boxShadow: "var(--shadow-custom)", border : "2px solid #783D18"}}
      initial={{ y: 0 }}
      whileHover={{ y: -5 }}
    >
      {/* Image */}
      <Image
        src={cover}
        alt="coffee-img"
        width={500}
        height={500}
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center p-4 gap-3 text-white"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-lg font-semibold">{description}</h2>
        <p className="text-xl font-bold">${value.toFixed(2)}</p>
        <motion.button
          className="bg-[var(--color-coffee-dark)] text-[var(--color-text)] px-6 py-2 rounded-full font-bold"
          whileTap={{ scale: 0.95 }}
        >
          Add to Cart
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default MenuCard
