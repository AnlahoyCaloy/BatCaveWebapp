"use client"
import React, { useEffect } from 'react'
import '../../app/globals.css'
import { useState } from 'react'

interface UserShowProps {
  onSaveUser : (userId : string , name : string, phone : string, reservationId : string | null) => void
}

const UserShow : React.FC<UserShowProps> = ({ onSaveUser }) => {
  const [userId , setUserId] = useState<string | null>(() => localStorage.getItem("userId"));
  const [name , setName] = useState(() => localStorage.getItem("userName") || '');
  const [phone , setPhone] = useState(() => localStorage.getItem("userPhone") || '');
  const [message , setMessage] = useState<string | null>(null);
  const [reservationid , setReservationId] = useState<string | null>(() => localStorage.getItem("reservationId"));

  const validatePhone = (phone: string) => {
    // Simple regex for 10-12 digits (adjust for your locale)
    return /^\d{10,12}$/.test(phone)
  }
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone) {
      setMessage('Please enter your name and phone number')
      return
    }

    if(!validatePhone(phone)) {
      setMessage("Phone number must be 10-12 digits")
    }

    const newUserId = `U${Date.now()}` // simple unique ID
    localStorage.setItem('userId', newUserId)
    localStorage.setItem('userName', name)
    localStorage.setItem('userPhone', phone)

    setUserId(newUserId);
    setReservationId(reservationid);
    onSaveUser(newUserId, name, phone, reservationid)
    setMessage('User saved successfully!')
  }

  return (
    <form onSubmit={handleSave} className="p-4 bg-gray-100 rounded shadow flex flex-col gap-5 text-black" style={{
      fontFamily : "var(--font-inter)"
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
      <button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit">Save</button>
      {message && <p className="text-sm text-red-600">{message}</p>}
    </form>
  )
}


export default UserShow