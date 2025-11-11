"use client"
import React from 'react'
import CategoryButton from './CategoryButton'

const MenuSideBar : React.FC = () => {
  return (
    <div className='categories w-full'>
      <section className='w-[300px] h-[630px]' style={{ backgroundColor : "var(--color-coffee-dark)", borderRadius : "20px", boxShadow : "var(--shadow-custom)" }}> 
        <div className='cat-buttons flex flex-col p-4 pt-8 items-center gap-4'>
          <CategoryButton />
          <CategoryButton />
          <CategoryButton />
          <CategoryButton />
          <CategoryButton />
        </div>
      </section>
    </div>
  )
}

export default MenuSideBar