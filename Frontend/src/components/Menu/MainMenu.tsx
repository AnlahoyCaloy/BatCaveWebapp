"use client"
import React from 'react'
import MenuCard, { MenuCardProps } from './MenuCard'
import { getImagePath } from '../Carousel/ImageGallery'
import '../../app/globals.css'

interface MainMenuProps {
  data : MenuCardProps[]
}

const MainMenu : React.FC<MainMenuProps> = ({ data }) => {
  console.log(data[0].cover)
  return (
    <div className='menu'>
      
      <section className='menu-container relative w-full h-[650px] grid sm:grid-cols-1 md:grid-cols-2 p-7 gap-4 overflow-auto' style={{ backgroundColor : "var(--color-coffee-dark)", borderRadius : "20px", boxShadow : "var(--shadow-custom)"}}>
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