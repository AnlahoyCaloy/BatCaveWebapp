"use client"
import React from 'react'
import { useState } from 'react'

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
    <div className='search-bar flex gap-5 items-center'>
      <section className='input-container '>
        <input
        className='bg-amber-50 shadow-(--shadow-custom) rounded-[15px] h-[49px] p-4 w-[464px] text-[18px] text-black '
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        onKeyDown={handleKeyPress}
        />
      </section>
      <button className='search-btn shadow-(--shadow-custom) bg-amber-800 w-[86px] h-[49px] p-2 rounded-[15px] cursor-pointer'>
        Search
      </button>
    </div>
  )
}

export default SearchBar