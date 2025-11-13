"use client"
import React from 'react'
import MenuCard, { MenuCardProps } from './MenuCard'
import { getImagePath } from '../Carousel/ImageGallery'
import '../../app/globals.css'
import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';

interface MainMenuProps {
  data : MenuCardProps[]
}

const MainMenu : React.FC<MainMenuProps> = ({ data }) => {
  console.log(data[0].cover)
  return (
    <div className='menu'>
      <SimpleBar
        style={{ backgroundColor : "var(--color-coffee-dark)", boxShadow : "var(--shadow-custom)", borderRadius : "20px"}}
        autoHide={true}
        className='relative w-full max-w-[1000px] h-[750px] grid sm:grid-cols-1 md:grid-cols-2 gap-4'
      >
        <section className='menu-container relative h-[650px] grid sm:grid-cols-1 md:grid-cols-2 p-7 gap-4' style={{ borderRadius : "20px"}}>
          {
            data.map((d , i) => {
              const coverPath = getImagePath(d.cover)
              return (
                <MenuCard key={i} cover={coverPath} description={d.description} value={d.value}/>
              )
            })
          }
        </section>
      </SimpleBar>
    </div>
  )
}

export default MainMenu