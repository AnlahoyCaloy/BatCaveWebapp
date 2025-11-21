import MainMenu from '@/src/components/Menu/MainMenu'
import MenuSideBar from '@/src/components/Menu/MenuSideBar'
import Section from '@/src/components/Section'
import React from 'react'
import { coffeeProducts } from '@/src/components/Carousel/Card'
import { dummyCategories } from '@/src/components/Menu/MenuSideBar'
import bgImage from '../../../public/images/bg-menu.png'

const Menu = () => {
  return (
    <div className='menu-container w-full relative'
    style={{ 
    fontFamily: "var(--font-inter)",
    backgroundImage: "url('/images/bg-menu.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    position : "absolute",
    top : "130px"
  }}>
      <Section isAnimated={false}
      style={{ display : "flex", gap : "30px", justifyContent : "center", marginTop : "15px", padding : "20px", zIndex : "-1000" , paddingTop : "40px"}} className='menu-inner-container md:flex-row' >
        <div className='menu-sidebar h-full'>
          {/* sidbar component */}
          <MenuSideBar categories={dummyCategories} /> {/* for visualization only */}
        </div>

        <div className='main-menu h-full'>
          <MainMenu data={coffeeProducts}/> {/* for visualization only */}
        </div>
      </Section>
    </div>
  )
}

export default Menu