"use client"
import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import UserShow from './UserShow'
import { apiPost } from '@/src/api/axios'
import { useRouter } from 'next/navigation'
import ConfirmedReservation from '../ConfirmationCard/ConfirmedReservation'
import { AnimatePresence, motion } from 'framer-motion'
import dayjs from 'dayjs'
import { reservationOverlap } from './AvailableRooms'
import ReservationForm from '../ConfirmationCard/ReservationForm'

export enum RoomType {
  Study = "Study",
  Function = "Function"
}

export interface Room {
  id: string,
  name: string,
  capacity: number,
  reservation: Reservations[],
}

export enum ReservationStatus {
  Pending = "Pending",
  Ongoing = "Ongoing",
  Completed = "Completed",
  NoShow = "No-show",
  Cancelled = "Cancelled"
}

export interface Reservations {
  id: string,
  userId: string,
  date: string,
  start: string,
  end: string,
  pax: number,
  type: RoomType,
  status: ReservationStatus,
  roomId: string,
  phone?: string,
  userName?: string
}

interface RoomCardProps {
  room: Room,
  onReserve: (roomId: string, r: Omit<Reservations, 'id'>) => Promise<{ success: boolean, message?: string, reservationId?: string, newReservation? : Reservations, totalPax? : number }>
}

export interface ReservationFormState {
  date: string
  start: string
  end: string
  pax: number
  type: RoomType
  feedBack : string | null
}

const enum PricePerPax {
  Study = 50,
  Function = 1000
}

// Helper function to calculate hours between two time strings
const calculateHours = (startTime: string, endTime: string): number => {
  const start = dayjs(`2024-01-01T${startTime}`)
  const end = dayjs(`2024-01-01T${endTime}`)
  
  // If end time is before start time assume next day
  let endTime_ = end
  if (end.isBefore(start)) {
    endTime_ = end.add(1, 'day')
  }
  
  const hours = endTime_.diff(start, 'hour', true)
  return Math.max(1, Math.ceil(hours))
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onReserve }) => {
  const [showReservationForm, setShowReservationForm] = useState(false)
  const [date, setDate] = useState('')
  const [start, setStart] = useState('13:00')
  const [end, setEnd] = useState('22:00')
  const [pax, setPax] = useState<number>(1)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [type, setType] = useState<RoomType>(RoomType.Study)
  const [userSaved, setUserSaved] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [reservationId, setReservationId] = useState<string | null>(null)
  const [reservationData, setReservationData] = useState<Reservations[] | null>(null)
  const [form, setForm] = useState<ReservationFormState>({
    date : "",
    start : "13:00",
    end : "22:00",
    pax : 1,
    type : RoomType.Study,
    feedBack : null
  });

  // const [paxLeft, setPaxLeft] = useState<number>(0);
  const router = useRouter()

  // Calculate price in real-time
  const currentPrice = useMemo(() => { // useMemo to save compute and render automatically
    const pricePerHour = form.type === RoomType.Study ? PricePerPax.Study : PricePerPax.Function
    const hoursCount = form.start && form.end ? calculateHours(form.start, form.end) : 1 // if start and end true then get the difference of the start and end hours then multiply the pax priceperhour and
    return pricePerHour * form.pax * hoursCount
  }, [form])

  const paxLeft = useMemo(() => {
    if(!form.date || !form.start || !form.end) return 0;

    const overlappingStudy = room.reservation.filter(r => 
      r.type === RoomType.Study && 
      r.date === form.date && 
      reservationOverlap(r.start, r.end, form.start, form.end)
    )
    
    const totalPax = overlappingStudy.reduce((sum , curr) => sum + curr.pax, 0) 

    return Math.max(totalPax , 0)
  }, [form , room.reservation])

  // FETCH ALL RESERVATIONS
  // const activeReservations = room.reservation.filter(
  //   r => r.status === ReservationStatus.Pending || r.status === ReservationStatus.Ongoing
  // );

  // Load localStorage only on client using useEffect
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId')
    const storedReservationId = localStorage.getItem('reservationId')
    if (storedUserId) setUserId(storedUserId)
    if (storedReservationId) setReservationId(storedReservationId)
  }, [])

  // SAVE THE USER
  async function onSaveUser(userId: string, name: string, phone: string, reservationId: string | null) {
    await apiPost("/users", { userId, name, phone })
    setUserId(userId)
    setReservationId(reservationId)
    setUserSaved(true)
  }

  useEffect(() => {
    if (userSaved) {
      router.push('/rooms')
    }
  }, [userSaved, router])
 
  // FETCH RESERVATIONS FOR THIS USER
  useEffect(() => {
    if (!userId) return;
    const fetchUserReservation = async () => {
      const response = await apiPost("/reservations-by-user", { userId });
      const formatted = response?.data.map((r: Record<string, string | number>) => ({ // the 
        id: r.id,
        userId: r.user_id,
        date: r.date,
        start: r.start,
        end: r.end,
        pax: r.pax,
        type: r.type,
        status: r.status,
        roomId: r.room_id,
        phone: r.phone,
        userName: r.user_name,
      }))
      setReservationData(formatted)
    }
    fetchUserReservation()
  }, [userId])

  // GET CURRENT RESERVATION
  const currentReservation = useMemo(() => {
    if (!reservationData || !reservationId) return null
    return reservationData.find((r) => r.id === reservationId)
  }, [reservationData, reservationId])

  // If userId not loaded yet, show UserShow
  if (userId === null) return <UserShow onSaveUser={onSaveUser} />

  // If reservation data is loading, show placeholder
  if (reservationData === null) return <div>Loading reservations...</div>

  // INSERT RESERVATIONS
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault() 
    // turn on comment for testing
    if (!form.date) {
      setForm({...form , feedBack : 'Please select a date'})
      return
    }
    if (!userId) {
      setForm({...form , feedBack : 'Please enter your details first.'})
      return
    }
    // const res = await onReserve(room.id, { date, start, end, pax, type, status: ReservationStatus.Pending, userId, roomId: room.id })
    const { feedBack , ...reservationData } = form;
    // remove feedback because interface Reservations doesn't have one.
    const res = await onReserve(room.id , {
      ...reservationData, 
      status : ReservationStatus.Pending, 
      userId, 
      roomId : room.id
    })

    console.log("roomId = ", room.id);

    if (!res.success) {
      setForm({...form , feedBack : res.message || 'Could not reserve'})
      setShowReservationForm(true)
    } else {
      if (res.reservationId) {
        localStorage.setItem('reservationId', res.reservationId)
        setReservationId(res.reservationId)
      }
      if(res.newReservation) {
        await apiPost('/reservations' , res.newReservation)

      }
      // setPaxLeft(res.totalPax);
      setForm({...form , feedBack : 'Reserved successfully'});
      setShowReservationForm(false)
    }
  }
  
  

  return (
    <div className='w-full max-w-[1100px] flex flex-col justify-center items-center'>
      {currentReservation ? (
        <ConfirmedReservation reservationData={[currentReservation]} />
      ) : (
        <div className="room-card w-full p-4 text-black rounded-md shadow-md" style={{ borderRadius: 12, backgroundColor: "var(--color-coffee-dark)", boxShadow: "var(--shadow-custom)" }}>
          <div className="w-full h-[500px] relative rounded overflow-hidden mb-4" style={{ borderRadius: 8 }}>
            <Image
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
              <div>Pax left {paxLeft}/{room.capacity}</div>
            </div>
            <div>
              <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => setShowReservationForm(s => !s)}>
                {showReservationForm ? 'Cancel' : 'Reserve'}
              </button>
            </div>
          </div>


        <AnimatePresence>
          {showReservationForm && (
            <ReservationForm 
            form={form} 
            setForm={setForm} 
            handleSubmit={handleSubmit} 
            setShowReservationForm={setShowReservationForm}
            currentPrice={currentPrice}
            roomReservations={room.reservation}
            />
          )}
        </AnimatePresence>
          {feedback && (
            <div className={`mt-4 p-4 rounded-lg border-l-4 font-semibold ${feedback.includes('successfully') ? 'bg-green-100 border-green-600 text-green-800' : 'bg-red-100 border-red-600 text-red-800'}`}>
              <p className="text-sm">{feedback}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default RoomCard
