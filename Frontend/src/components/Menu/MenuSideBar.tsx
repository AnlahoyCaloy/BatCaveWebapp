"use client"
import React from 'react'
import CategoryButton from './CategoryButton'
import '../../app/globals.css'


export const dummyCategories = [ "Specialty Coffees" , "Pastries" , "Snacks" ]

interface SideBarProps {
  categories : string[]
}

const MenuSideBar : React.FC<SideBarProps> = ({ categories }) => {
  return (
    <div className='categories w-full'>
      <section className='w-full' style={{ backgroundColor : "var(--color-coffee-dark)", borderRadius : "20px", boxShadow : "var(--shadow-custom)" }}> 
        <div className='cat-buttons w-full flex flex-col p-8 items-center gap-4'>
          {/* <CategoryButton /> */}
          {
            categories.map((c , i) => (
              <CategoryButton key={i} category={c}/>
            ))
          }
        </div>
      </section>
    </div>
  )
}

export default MenuSideBar