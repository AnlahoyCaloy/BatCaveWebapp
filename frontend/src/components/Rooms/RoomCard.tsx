"use client"
import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import UserShow from './UserShow'
import { apiPost } from '@/src/api/axios'
import { useRouter } from 'next/navigation'
import ConfirmedReservation from '../ConfirmationCard/ConfirmedReservation'

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
  onReserve: (roomId: string, r: Omit<Reservations, 'id'>) => Promise<{ success: boolean, message?: string, reservationId?: string, newReservation? : Reservations }>
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
  const [userData, setUserData] = useState({})
  const router = useRouter()

  // Load localStorage only on client using useEffect
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId')
    const storedReservationId = localStorage.getItem('reservationId')
    if (storedUserId) setUserId(storedUserId)
    if (storedReservationId) setReservationId(storedReservationId)
  }, [])

  async function onSaveUser(userId: string, name: string, phone: string, reservationId: string | null) {
    const response = await apiPost("/users", { userId, name, phone });
    setUserData(response?.data)
    setUserId(userId)
    setReservationId(reservationId)
    setUserSaved(true)
  }

  useEffect(() => {
    if (userSaved) {
      router.push('/rooms')
    }
  }, [userSaved, router])

  // Fetch reservations for this user
  useEffect(() => {
    if (!userId) return;
    const fetchUserReservation = async () => {
      const response = await apiPost("/reservations-by-user", { userId });
      const formatted = response?.data.map((r: any) => ({
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

  const currentReservation = useMemo(() => {
    if (!reservationData || !reservationId) return null
    return reservationData.find((r) => r.id === reservationId)
  }, [reservationData, reservationId])

  // If userId not loaded yet, show UserShow
  if (userId === null) return <UserShow onSaveUser={onSaveUser} />

  // If reservation data is loading, show placeholder
  if (reservationData === null) return <div>Loading reservations...</div>

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

      setFeedback('Reserved successfully')
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
              <div>Pax left 0/{room.capacity}</div>
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
      )}
    </div>
  )
}

export default RoomCard
