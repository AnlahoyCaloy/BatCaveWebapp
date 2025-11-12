"use client"
import React, { useState } from 'react'

export type RoomType = "study" | "function"


export interface Room { // get from database
  id : number,
  name : string,
  capacity : number,
  reservation : Reservations[]
}

export interface Reservations {
  id : number,
  date : string
  start : string,
  end : string,
  pax : number,
  type : RoomType
}

interface RoomCardProps {
  room : Room,
  onReserve : (roomId : number , r : Omit<Reservations, 'id'>) => { success : boolean , message? : string }
}
// when this fires sends it to 
const RoomCard: React.FC<RoomCardProps> = ({ room, onReserve }) => {
  const [showForm, setShowForm] = useState(false)
  const [date, setDate] = useState('')
  const [start, setStart] = useState('01:00')
  const [end, setEnd] = useState('10:00')
  const [pax, setPax] = useState<number>(1)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [type ,setType] = useState<RoomType>("study")
  

  function handleSubmit(e: React.FormEvent) {
    
    e.preventDefault()

    console.log({date , start , end , pax, type})

    if (!date) {
      setFeedback('Please select a date')
      return;
    }

    const res = onReserve(room.id, { date, start, end, pax , type})
    if (!res.success) {
      setFeedback(res.message || 'Could not reserve')
    } else {
      setFeedback('Reserved successfully')
      setShowForm(false)
    }
  }

  return (
    <div className="room-card p-4 bg-white rounded-md shadow-md" style={{ borderRadius: 12 }}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{room.name}</h3>
          <p className="text-sm text-gray-600">Capacity: {room.capacity} pax (max 20)</p>
          {/* <p className="text-sm text-gray-600">Existing reservations: {room.reservations.length}</p> */}
        </div>
        <div>
          <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => setShowForm(s => !s)}>
            {showForm ? 'Cancel' : 'Reserve'}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-2">
          <div>
            <label className="text-sm">Date</label>
            <input className="block w-full mt-1 p-2 border rounded" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-sm">Start</label>
              <input className="block w-full mt-1 p-2 border rounded" type="time" value={start} onChange={(e) => setStart(e.target.value)} />
            </div>
            <div>
              <label className="text-sm">End</label>
              <input className="block w-full mt-1 p-2 border rounded" type="time" value={end} onChange={(e) => setEnd(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 items-end">
            <div>
              <label className="text-sm">Pax</label>
              <input className="block w-full mt-1 p-2 border rounded" type="number" min={1} max={20} value={pax} onChange={(e) => setPax(Number(e.target.value))} />
            </div>
            <div>
              <label className="text-sm">Type</label>
              <select className='block w-full mt-1 p-2 border rounded' id='reserve-type' name='reserveType' onChange={(e) => setType(e.target.value)}>
                <option value="study">Study</option>
                <option value="function">Function</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded" type="submit">Confirm</button>
            <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowForm(false)}>Close</button>
          </div>
        </form>
      )}

      {feedback && <p className="mt-2 text-sm text-red-600">{feedback}</p>}
      
    </div>
  )
}

export default RoomCard