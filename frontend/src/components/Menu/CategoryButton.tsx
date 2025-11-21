"use client"
import React from 'react'
import { motion } from 'framer-motion'
import '../../app/globals.css'

interface CategoryProps {
  category? : string
}

const CategoryButton : React.FC<CategoryProps> = ({ category }) => {

  return (
    <motion.div
      className="category-btn cursor-pointer w-[200px] h-[70px] pl-4 items-center flex"
        style={{
        borderRadius: "10px",
        backgroundColor: "var(--color-accent)",
        boxShadow: "var(--shadow-custom)",
        }}
      initial={{ backgroundColor: "var(--color-accent)" }}
      whileHover={{
      backgroundColor: "var(--color-coffee-medium)",
      transition: { duration: 0.2 }, // background changes first
      }}
    >
      <motion.p
        className="font-bold"
        initial={{ color: "var(--color-coffee-dark)" }}
        whileHover={{
          color: "#FFD580", // brighter color for text
          transition: { delay: 0.2, duration: 0.2 }, // delay so text changes after bg
        }}
      >
        {category}
      </motion.p>
    </motion.div>

  )
}

export default CategoryButton