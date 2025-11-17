"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import UserShow from './UserShow'
import axios from 'axios'
import { apiPost } from '@/src/api/axios'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'

// WILL ANALYZE THIS MORE IN THE FUTURE 
// WILL USE CONTEXT FOR BETTER STATE MANAGEMENT AND FOR REAL AUTHORIZATION
export enum RoomType {
  Study = "Study" ,
  Function = "Function"
}

export interface Room { // get from database
  id : string,
  name : string,
  capacity : number,
  reservation : Reservations[],
}

enum ReservationStatus {
  Pending = "Pending",
  Ongoing = "Ongoing",
  Completed = "Completed",
  NoShow = "No-show",
  Cancelled = "Cancelled"
}

export interface Reservations {
  id : string,
  userId : string, // foreign key to the users table
  date : string,
  start : string,
  end : string,
  pax : number,
  type : RoomType,
  status : ReservationStatus,
  roomId : string
}

export interface User {
  userId : string,
  name : string,
  phone : string,
}

interface RoomCardProps {
  room : Room,
  onReserve : (roomId : string , r : Omit<Reservations, 'id'>) => { success : boolean , message? : string, reservationId? : string }
}

  const RoomCard: React.FC<RoomCardProps> = ({ room, onReserve }) => {
    const [showReservationForm, setShowReservationForm] = useState(false)
    const [date, setDate] = useState('')
    const [start, setStart] = useState('13:00')
    const [end, setEnd] = useState('22:00')
    const [pax, setPax] = useState<number>(1)
    const [feedback, setFeedback] = useState<string | null>(null)
    const [type, setType] = useState<RoomType>(RoomType.Study)

    const router = useRouter();
    const [userSaved , setUserSaved] = useState(false);
    const [userId, setUserId] = useState<string | null>(() => typeof window !== 'undefined' ? localStorage.getItem('userId') : null)

    const [reservationId, setReservationId] = useState<string | null>(() => typeof window !== 'undefined' ? localStorage.getItem('userId') : null)

    const [reservationData, setReservationData] = useState<Reservations | null>(null);

    const [userData ,setUserData] = useState({});

    async function onSaveUser(userId : string , name : string, phone : string, reservationId : string | null) {
      // localStorage.setItem("reservationId" , reservationId || "")
      // store this in the database
      // const response = await axios.post('http://localhost/BatCave/backend/public/users', {
      //   userId,
      //   name,
      //   phone
      // })
      // setUserData(response);
      const response = await apiPost("/users", { userId , name , phone });
      setUserData(response?.data);
      setUserId(userId);
      setReservationId(reservationId);
      setUserSaved(true);
    }

    useEffect(() => {
      if(userSaved) {
        router.push('/rooms')
      }
    }, [userSaved, router])


    // check if user data exists
    useEffect(() => {
      if(userData) {
        console.log(userData);
      } else {
        console.log("User data not found");
      }
    }, [userData])

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault()
      if (!date) {
        setFeedback('Please select a date')
        return
      }
      if (!userId) {
        setFeedback('Please enter your details first.')
        return
      }

    const res = onReserve(room.id, { date, start, end, pax , type, status : ReservationStatus.Pending, userId, roomId : room.id})
    if (!res.success) {
      setFeedback(res.message || 'Could not reserve')
      setShowReservationForm(true);
    } else {
      if (res.reservationId) {
        localStorage.setItem('reservationId', res.reservationId)
        setReservationId(res.reservationId)
      }
      setFeedback('Reserved successfully')
      setShowReservationForm(false);
    }
  } 

  useEffect(() => {
    if (!userId) return; // don't fetch
    const fetchUserReservation = async () => {
      const response = await apiPost("/reservations-by-user", { userId });
      console.log("fetch response:", response?.data);
      setReservationData(response?.data);
    };
    fetchUserReservation();
  }, [userId]);
  // if user doesnt have infor show this 

  if (!userId) {
    return <UserShow onSaveUser={onSaveUser} />;
  }  
  
  if (userId && reservationData && reservationId) { 
    // fetch from database matching data of reservations and users
    const name = localStorage.getItem("userName")
    const phone = localStorage.getItem("userPhone")
    console.log(reservationData.date)

    return (
      <div className="p-4 bg-gray-100 rounded shadow text-black">
        <h4 className="font-semibold">Welcome , {name}.You are already Reserved.</h4>
        <p>Phone: {phone}</p>
        <p>Your Reservation id is {reservationId}</p>
        <p>Start time of your reservation is {reservationData.start} to {reservationData.end}</p>
      </div>
    )
  } else {
    console.log("Not in ")
  }

  return (
    <div className="room-card w-full max-w-[900px] p-4 text-black rounded-md shadow-md" style={{ borderRadius: 12 , backgroundColor : "var(--color-coffee-dark)", boxShadow : "var(--shadow-custom)"}}>
      <div className="w-full h-[500px] relative rounded overflow-hidden mb-4" style={{ borderRadius: 8 }}>
        <Image
          // src={room.image || '/images/room.png'}
          src={'/images/room.png'}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
    
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{room.name}</h3>
          <p className="text-sm text-black-600">Capacity: {room.capacity} pax (max 20)</p>
          <div className='room-status text-black-600'>{room.reservation.length} reservations</div>
        </div>
        <div>
          <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => setShowReservationForm(s => !s)}>
            {showReservationForm ? 'Cancel' : 'Reserve'}
          </button>
        </div>
      </div>


      {showReservationForm && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="text-sm">Date</label>
            <input
              aria-label="reservation-date"
              className="block w-full mt-1 p-2 border rounded bg-white text-black"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="text-sm">Start</label>
              <input
                aria-label="reservation-start"
                className="block w-full mt-1 p-2 border rounded bg-white text-black"
                type="time"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm">End</label>
              <input
                aria-label="reservation-end"
                className="block w-full mt-1 p-2 border rounded bg-white text-black"
                type="time"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-end">
            <div>
              <label className="text-sm">Pax</label>
              <input
                aria-label="reservation-pax"
                className="block w-full mt-1 p-2 border rounded bg-white text-black"
                type="number"
                min={1}
                max={20}
                value={pax}
                onChange={(e) => setPax(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="text-sm">Type</label>
              <select
                aria-label="reservation-type"
                className='block w-full mt-1 p-2 border rounded bg-white text-black'
                id='reserve-type'
                name='reserveType'
                value={type}
                onChange={(e) => setType(e.target.value as RoomType)}
              >
                <option value={RoomType.Study}>Study</option>
                <option value={RoomType.Function}>Function</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded" type="submit">Confirm</button>
            <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowReservationForm(false)}>Close</button>
          </div>
        </form>
      )}

      {feedback && <p className="mt-2 text-sm text-red-600">{feedback}</p>}
      
    </div>
  )
}

export default RoomCard