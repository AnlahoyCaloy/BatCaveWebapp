"use client"
import React from 'react'
import { motion } from 'framer-motion'
interface CategoryProps {
  category? : string
}

const CategoryButton : React.FC<CategoryProps> = (category) => {
  console.log(category)

  return (
    <motion.div className='category-btn cursor-pointer w-[200px] h-[70px] pl-4 items-center flex'
    style={{ borderRadius : "10px", backgroundColor : "var(--color-accent)", boxShadow : "var(--shadow-custom)" }}
    initial={{ y : 0 }}
    whileHover={{ y : -10 }}>
      <p className='font-bold' style={{ color : "var(--color-coffee-dark)" }}>Classic</p>
    </motion.div>
  )
}

export default CategoryButton