"use client"
import React from 'react'
import '../../app/globals.css'
import { useState } from 'react'
import { motion } from 'framer-motion'

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
  const [message, setMessage] = useState<string | null>(null);
  const [reservationid, setReservationId] = useState<string | null>(() => 
    typeof window !== "undefined" ? localStorage.getItem("reservationId") : null
  );
  
  // Validate phone: require exact 11 digits starting with '09' (e.g. 09812238146)
  const validatePhone = (phone: string) => {
    const cleaned = phone.trim()
    const re = /^09\d{9}$/
    return re.test(cleaned)
  }
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone) {
      setMessage('Please enter your name and phone number')
      return
    }

    if (!validatePhone(phone)) {
      setMessage("Phone number must be exactly 11 digits and start with '09' (e.g. 09812238146)")
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
          placeholder="09812238146"
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