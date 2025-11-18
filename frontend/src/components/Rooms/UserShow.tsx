"use client"
import React, { useEffect } from 'react'
import '../../app/globals.css'
import { useState } from 'react'
import '../../app/globals.css'
import {motion} from 'framer-motion'

interface UserShowProps {
  onSaveUser : (userId : string , name : string, phone : string, reservationId : string | null) => void
}

const UserShow : React.FC<UserShowProps> = ({ onSaveUser }) => {

  const [userId, setUserId] = useState<string | null>(() => 
      typeof window !== "undefined" ? localStorage.getItem("userId") : null
  );

  const [name, setName] = useState(() =>
      typeof window !== "undefined" ? localStorage.getItem("userName") || '' : ''
  );

  const [phone, setPhone] = useState(() =>
      typeof window !== "undefined" ? localStorage.getItem("userPhone") || '' : ''
  );
  const [message , setMessage] = useState<string | null>(null);
  const [reservationid, setReservationId] = useState<string | null>(() => 
    typeof window !== "undefined" ? localStorage.getItem("reservationId") : null
);
  
  const validatePhone = (phone: string) => {
    // Allow various phone formats: 10-15 digits, with optional spaces, hyphens, or parentheses
    return /^[\d\s\-\(\)]{10,15}$/.test(phone.replace(/\D/g, '').trim()) && /\d/.test(phone)
  }
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone) {
      setMessage('Please enter your name and phone number')
      return
    }

    if(!validatePhone(phone)) {
      setMessage("Phone number must be at least 10 digits")
      return
    }

    const newUserId = `U${Date.now()}` // simple unique ID
    localStorage.setItem('userId', newUserId)
    localStorage.setItem('userName', name)
    localStorage.setItem('userPhone', phone)

    setUserId(newUserId);
    setReservationId(reservationid);
    onSaveUser(newUserId, name, phone, reservationid);
    setMessage('User saved successfully!');
  }

  return (
    <form onSubmit={handleSave} className="p-4 rounded shadow flex flex-col gap-5 text-black" style={{
      fontFamily : "var(--font-inter)",
      backgroundColor : "var(--color-coffee-dark)",
      boxShadow : "var(--shadow-custom)"
    }}>
      <h3 className=''>We need basic information for us to allow reservations</h3>
      <h4 className="font-semibold">Enter your details</h4>
      <div>
        <label className="block text-sm mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="block w-full p-2 border rounded"
        />
      </div>
      <motion.button className="px-4 py-2 text-black rounded cursor-pointer" type="submit"
      style={{ backgroundColor : "var(--color-accent)" }}
      initial={{ y : 0 }}
      whileHover={{ y : -7 , boxShadow : "var(--shadow-custom-button)"}}>Save</motion.button>
      {message && <p className="text-sm text-red-600">{message}</p>}
    </form>
  )
}


export default UserShow