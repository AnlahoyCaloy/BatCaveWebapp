"use client"
import React from 'react'
import SearchBar from './SearchBar'

const HomeSearch = () => {
  const handleSearch = (query : string) => {
    // should do like a query to the database
  }

  return (
    <div className='h-[180px] flex justify-center items-center w-full'>
      <SearchBar onSearch={handleSearch} placeholder='Search for Drinks...' />      
    </div>
  )
}

export default HomeSearch