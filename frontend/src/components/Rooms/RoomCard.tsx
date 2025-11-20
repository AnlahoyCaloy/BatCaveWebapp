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
  userName?: string,
  totalPrice : number
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
    date : dayjs().format("YYYY-MM-DD"),
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

  // Percentage of available seats for visual progress bar
  const availabilityPercent = useMemo(() => {
    const cap = room.capacity || 1
    const used = Math.min(paxLeft, cap)
    return Math.max(0, ((cap - used) / cap) * 100)
  }, [room.capacity, paxLeft])


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
  }, [reservationData, reservationId]);

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
      roomId : room.id,
      totalPrice : currentPrice
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
  
  console.log(reservationData)

  return (
    <div className='w-full max-w-[1100px] flex flex-col justify-center items-center'>
      {currentReservation ? (
        <ConfirmedReservation reservationData={[currentReservation]} />
      ) : (
        <div className="room-card bg-gradient-to-b from-amber-900 to-amber-800 w-full p-6 rounded-xl transition hover:shadow-xl" style={{ boxShadow: "var(--shadow-custom)" }}>
          <div className="md:flex md:items-center md:gap-6">
            <div className="md:w-1/2 w-full h-[256px] md:h-48 relative rounded-lg overflow-hidden mb-4 md:mb-0">
              <Image
                src={'/images/room.png'}
                alt={room.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>

            <div className="md:w-1/2 w-full flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-amber-50">{room.name.split('"')}</h3>
                    <p className="text-sm text-amber-200 mt-1">Capacity: <span className="font-semibold">{room.capacity}</span> pax</p>
                    <p className="text-sm text-amber-200 mt-1">{room.reservation.length} total reservation{room.reservation.length !== 1 ? 's' : ''} in this room.</p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-2 bg-amber-700/30 text-amber-50 px-3 py-1 rounded-full">
                      <span className="text-sm">☕</span>
                      <span className="text-xs font-bold">Cozy</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-amber-300">Pax left on {dayjs(form.date).format("MMMM DD, YYYY")}</div>
                    <div className="text-xs text-amber-300">{paxLeft}/{room.capacity}</div>
                  </div>

                  <div className="w-full bg-amber-700/20 rounded-full h-3 mt-2 overflow-hidden">
                    <motion.div initial={{width : "0%" }} animate={{ width : `${availabilityPercent}%`}} transition={{ duration : 1 ,ease : "easeInOut" }} className="h-3 bg-yellow-400 rounded-full"  />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button
                  aria-label='Reserve Button'
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-amber-600 to-yellow-400 text-amber-900 font-bold rounded-lg shadow-lg hover:scale-105 transform transition"
                  onClick={() => setShowReservationForm(s => !s)}
                >
                  {showReservationForm ? 'Cancel' : 'Reserve'}
                </button>

                {/* <button
                  type="button"
                  className="px-3 py-2 border border-amber-600 text-amber-100 rounded-lg hover:bg-amber-700/20 transition"
                  onClick={() => { /* placeholder for future details action */ }
                  {/* Details */}
                {/* </button> */}
              </div>
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

export default RoomCard;
