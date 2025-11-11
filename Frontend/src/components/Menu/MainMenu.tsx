"use client"
import React from 'react'
import MenuCard, { MenuCardProps } from './MenuCard'
import { getImagePath } from '../Carousel/ImageGallery'

interface MainMenuProps {
  data : MenuCardProps[]
}

const MainMenu : React.FC<MainMenuProps> = ({ data }) => {
  console.log(data[0].cover)
  return (
    <div className='menu'>
      <h1 className='absolute z-1'>Category</h1>
      <section className='relative w-[1000px] h-[630px] grid grid-cols-2 p-4' style={{ backgroundColor : "var(--color-coffee-dark)", borderRadius : "20px", boxShadow : "var(--shadow-custom)"}}>
        
        {/* <MenuCard />
        <MenuCard />
        <MenuCard />
        <MenuCard />
        <MenuCard />
        <MenuCard /> */}
        {
          data.map((d , i) => {
            const coverPath = getImagePath(d.cover)
            return (
              <MenuCard key={i} cover={coverPath} description={d.description} value={d.value}/>
            )
          })
        }
      </section>
    </div>
  )
}

export default MainMenu