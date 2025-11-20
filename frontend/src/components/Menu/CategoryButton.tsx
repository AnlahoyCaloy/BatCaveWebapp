"use client"
import React from 'react'
import { motion } from 'framer-motion'
import '../../app/globals.css'

interface CategoryProps {
  category? : string
}

const CategoryButton : React.FC<CategoryProps> = ({ category }) => {

  return (
    <motion.div className='category-btn cursor-pointer w-[200px] h-[70px] pl-4 items-center flex'
    style={{ borderRadius : "10px", backgroundColor : "var(--color-accent)", boxShadow : "var(--shadow-custom)" }}
    initial={{ background : "var(--color-accent)" }}
    whileHover={{ background : "var(--color-coffee-dark)" }}
    >
      <motion.p className='font-bold' style={{ color : "var(--color-coffee-dark)" }}>{category}</motion.p>
    </motion.div>
  )
}

export default CategoryButton