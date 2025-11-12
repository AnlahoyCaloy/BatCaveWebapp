"use client"
import React from 'react'
import '../../app/globals.css'

const Footer : React.FC = () => {
  return (
    <footer className='w-full min-h-[30vh] flex flex-col sm:flex-col flex-wrap justify-center items-center gap-5 p-6'
    style={{ backgroundColor : "var(--background)" }}>
      <div className='w-full flex justify-evenly'>
        <section className='contact-us flex flex-col gap-2 text-center'>
          <p>631234567890</p>
          <p>BatCaveCafé@gmail.com</p>
          <p>Bat Cave Café PH</p>
          <p>BAt Cave Café</p>
        </section>
        <section className='w-full cave-cafe-center flex flex-col items-center text-center md:w-1/2 ' style={{ fontFamily : "var(--font-alegreya)" , fontSize : "20px"}}>
          <h1 className='' style={{ fontSize: "25px", fontFamily : "var(--font-Cinzel)" }}>Bat Cave Café. </h1>
          <p>Batangas State University - Malvar Campus, Poblacion, Malvar, Batangas</p>
          <p>Reviews and Feedbacks</p>
          <p>Terms and Privacy</p>
        </section>
      </div>
    </footer>
  )
}

export default Footer