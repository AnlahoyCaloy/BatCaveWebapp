import MainMenu from '@/src/components/Menu/MainMenu'
import MenuSideBar from '@/src/components/Menu/MenuSideBar'
import Section from '@/src/components/Section'
import React from 'react'
import { coffeeProducts } from '@/src/components/Carousel/Card'
import { dummyCategories } from '@/src/components/Menu/MenuSideBar'


const Menu = () => {
  return (
    <div className='menu-container w-full relative'
    style={{ fontFamily : "var(--font-inter)" }}>
      <Section isAnimated={false}
      style={{ display : "flex", gap : "30px", justifyContent : "center", marginTop : "40px", padding : "20px"}} className='menu-inner-container md:flex-row' >
        <div className='menu-sidebar h-full'>
          {/* sidbar component */}
          <MenuSideBar categories={dummyCategories} /> {/* for visualization only */}
        </div>

        <h1 className='absolute z-1 p-4 w-[210px]'
        style={{ backgroundColor : "var(--color-coffee-medium)", top: "-20px", borderRadius : "25px"}}>Category</h1>

        <div className='main-menu h-full'>
          <MainMenu data={coffeeProducts}/> {/* for visualization only */}
        </div>
      </Section>
    </div>
  )
}

export default Menu