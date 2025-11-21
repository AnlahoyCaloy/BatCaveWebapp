"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
interface SearchBarProps {
  placeholder? : string,
  onSearch : (query : string) => void
}

const SearchBar :React.FC<SearchBarProps> = ({placeholder = "Search for Drinks..." , onSearch}) => {

  const [query , setQuery] = useState<string>("")

  const handleQuery = () => {
    onSearch(query)
  }

  function handleKeyPress(e : React.KeyboardEvent<HTMLInputElement>) {
    if(e.key === "Enter") handleQuery();
  }
  
  return (
    <div className='search-bar gap-4 items-center justify-center max-w-[605px] mx-auto flex flex-col sm:flex-row w-full p-10'>
      <section className='input-container flex-1 w-full sm:mr-2'>
        <input
          className='w-full h-[49px] p-4 text-[18px] rounded-[15px] bg-amber-50 shadow-[var(--shadow-custom)] text-black'
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          onKeyDown={handleKeyPress}
        />
      </section>
      <motion.button
        onClick={handleQuery}
        className='search-btn w-full sm:w-[120px] h-[49px] rounded-[15px] bg-[var(--color-coffee-dark)] shadow-[var(--shadow-custom)] text-white font-medium'
      >
        Search
      </motion.button>
    </div>

  )
}

export default SearchBar