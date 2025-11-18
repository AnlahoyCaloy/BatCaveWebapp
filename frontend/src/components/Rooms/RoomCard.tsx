"use client"
import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import UserShow from './UserShow'
import { apiPost } from '@/src/api/axios'
import { useRouter } from 'next/navigation'
import ConfirmedReservation from '../ConfirmationCard/ConfirmedReservation'
import { AnimatePresence, motion } from 'framer-motion'
import dayjs from 'dayjs'

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
  const [paxLeft, setPaxLeft] = useState<number>();
  const router = useRouter()

  // Calculate price in real-time
  const currentPrice = useMemo(() => { // useMemo to save compute and render automatically
    const pricePerHour = type === RoomType.Study ? PricePerPax.Study : PricePerPax.Function
    const hoursCount = start && end ? calculateHours(start, end) : 1 // if start and end true then get the difference of the start and end hours then multiply the pax priceperhour and
    return pricePerHour * pax * hoursCount
  }, [pax, type, start, end])

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
      const formatted = response?.data.map((r: Record<string, string | number>) => ({
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
    if (!date) {
      setFeedback('Please select a date')
      return
    }
    if (!userId) {
      setFeedback('Please enter your details first.')
      return
    }
    const res = await onReserve(room.id, { date, start, end, pax, type, status: ReservationStatus.Pending, userId, roomId: room.id })
    if (!res.success) {
      setFeedback(res.message || 'Could not reserve')
      setShowReservationForm(true)
    } else {
      if (res.reservationId) {
        localStorage.setItem('reservationId', res.reservationId)
        setReservationId(res.reservationId)
      }
      if(res.newReservation) {
        await apiPost('/reservations' , res.newReservation)
      }
      setPaxLeft(res.totalPax);
      setFeedback('Reserved successfully');
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type : "spring", stiffness : 300, damping : 25 }}
              className="fixed inset-0 z-2 flex items-center justify-center"
              style={{  }}
            >

              <motion.div
              initial={{ opacity : 0 , backdropFilter : "blur(0px)" }}
              animate={{ opacity : 1, backdropFilter : "blur(20px)" }}
              exit={{ opacity : 0, backdropFilter : "blur(0px)"}}
              transition={{ duration : 1 , ease : "easeInOut"}}
                className="absolute inset-0 bg-black/50"
                onClick={() => setShowReservationForm(false)}
              />

              <motion.form
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity : 0, scale : 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onSubmit={handleSubmit}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-xl mx-4 p-6 bg-[var(--color-coffee-medium)] rounded-xl border-4 border-amber-600 shadow-2xl space-y-4"
              >
                {/* Close button */}
                <button
                  type="button"
                  onClick={() => setShowReservationForm(false)}
                  className="absolute top-3 right-3 text-amber-50 bg-amber-700/30 hover:bg-amber-700/50 rounded-full p-2"
                  aria-label="Close reservation form"
                >
                  ✕
                </button>

                <div className="flex items-center gap-2 mb-4">
                  <h4 className="text-xl font-bold text-amber-100">Reserve Your Perfect Brew Moment</h4>
                </div>

                <div className="h-1 bg-linear-to-r from-amber-600 to-yellow-600 rounded-full"></div>

                <div>
                  <label className="block text-sm font-bold text-amber-100 mb-2 tracking-wide">📅 Date</label>
                  <input
                    aria-label="reservation-date"
                    className="block w-full px-4 py-3 border-2 border-amber-600 rounded-lg bg-amber-50 text-amber-900 placeholder-amber-700 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 transition font-semibold"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-amber-100 mb-2 tracking-wide">⏰ Start Time</label>
                    <input
                      aria-label="reservation-start"
                      className="block w-full px-4 py-3 border-2 border-amber-600 rounded-lg bg-amber-50 text-amber-900 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 transition font-semibold"
                      type="time"
                      value={start}
                      onChange={(e) => setStart(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-amber-100 mb-2 tracking-wide">🕐 End Time</label>
                    <input
                      aria-label="reservation-end"
                      className="block w-full px-4 py-3 border-2 border-amber-600 rounded-lg bg-amber-50 text-amber-900 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 transition font-semibold"
                      type="time"
                      value={end}
                      onChange={(e) => setEnd(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-bold text-amber-100 mb-2 tracking-wide">👥 Number of People</label>
                    <input
                      aria-label="reservation-pax"
                      className="block w-full px-4 py-3 border-2 border-amber-600 rounded-lg bg-amber-50 text-amber-900 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 transition font-semibold"
                      type="number"
                      min={1}
                      max={20}
                      value={pax}
                      onChange={(e) => setPax(Number(e.target.value))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-amber-100 mb-2 tracking-wide">🏷️ Reservation Type</label>
                    <select
                      aria-label="reservation-type"
                      className='block w-full px-4 py-3 border-2 border-amber-600 rounded-lg bg-amber-50 text-amber-900 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 transition font-semibold'
                      id='reserve-type'
                      name='reserveType'
                      value={type}
                      onChange={(e) => setType(e.target.value as RoomType)}
                      required
                    >
                      <option value={RoomType.Study}>📚 Study</option>
                      <option value={RoomType.Function}>🎉 Function</option>
                    </select>
                  </div>
                </div>

                <div className=" border-2 border-amber-400 bg-amber-400/10 rounded-lg p-4 text-center">
                  <p className="text-sm text-amber-100 font-semibold mb-1">Estimated Total Price</p>
                  <p className="text-3xl font-bold text-yellow-300">₱{currentPrice.toLocaleString()}</p>
                  <p className="text-xs text-amber-100 mt-1">({type === RoomType.Study ? '₱50' : '₱1000'}/hour per person)</p>
                </div>

                <div className="h-1 bg-linear-to-r from-amber-600 to-yellow-600 rounded-full mt-6"></div>

                <div className="flex gap-3 pt-4">
                  <button
                    className="flex-1 px-4 py-3 bg-linear-to-r from-amber-600 to-yellow-600 text-white font-bold rounded-lg hover:from-amber-700 hover:to-yellow-700 shadow-lg transform transition hover:scale-105 active:scale-95 text-base tracking-wide"
                    type="submit"
                  >
                    ✓ Brew It!
                  </button>
                  <button
                    type="button"
                    className="flex-1 px-4 py-3 bg-amber-700 text-amber-100 font-bold rounded-lg hover:bg-amber-800 shadow-lg transform transition hover:scale-105 active:scale-95 text-base tracking-wide"
                    onClick={() => setShowReservationForm(false)}
                  >
                    ✕ Cancel
                  </button>
                </div>

              {feedback && (
                <div className={`mt-4 p-4 rounded-lg border-l-4 font-semibold ${feedback.includes('successfully') ? 'bg-green-100 border-green-600 text-green-800' : 'bg-red-100 border-red-600 text-red-800'}`}>
                  <p className="text-sm">{feedback}</p>
                </div>
              )}
              </motion.form>
            </motion.div>
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
