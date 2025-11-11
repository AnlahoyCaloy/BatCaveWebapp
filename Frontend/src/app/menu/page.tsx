import MainMenu from '@/src/components/Menu/MainMenu'
import MenuSideBar from '@/src/components/Menu/MenuSideBar'
import Section from '@/src/components/Section'
import React from 'react'
import { coffeeProducts } from '@/src/components/Carousel/Card'

const Menu : React.FC = () => {
  return (
    <div className='menu-container w-full'>
      <Section isAnimated={false}
      style={{ display : "flex" , flexDirection : "row", gap : "30px", justifyContent : "center", marginTop : "70px"}}>
        <div className='menu-sidebar h-full'>
          {/* sidbar component */}
          <MenuSideBar /> {/* for visualization only */}
        </div>

        <div className='main-menu h-full'>
          <MainMenu data={coffeeProducts}/> {/* for visualization only */}
        </div>
      </Section>
    </div>
  )
}

export default Menu