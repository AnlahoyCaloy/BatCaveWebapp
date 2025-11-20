import React from 'react'
import { motion, Variants } from 'framer-motion';
import { ReservationFormState, RoomType, Reservations } from '../Rooms/RoomCard';
import ReservationSidebar from './ReservationSidebar';
import { useState, useEffect } from 'react';
import '../../app/globals.css'
// const [date, setDate] = useState('')
//   const [start, setStart] = useState('13:00')
//   const [end, setEnd] = useState('22:00')
//   const [pax, setPax] = useState<number>(1)
//   const [feedback, setFeedback] = useState<string | null>(null)
//   const [type, setType] = useState<RoomType>(RoomType.Study)

interface ReservationFormProps {
  form : ReservationFormState,
  setForm : React.Dispatch<React.SetStateAction<ReservationFormState>>,
  handleSubmit : (e : React.FormEvent) => void,
  setShowReservationForm : React.Dispatch<React.SetStateAction<boolean>>,
  currentPrice : number,
  roomReservations : Reservations[]
}

const ReservationForm: React.FC<ReservationFormProps> = ({ form , setForm, handleSubmit, setShowReservationForm, currentPrice, roomReservations}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // check if mobile 
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSelectDate = (date: string) => {
    setForm({ ...form, date })
  }


  const reservationVariant : Variants = {
    animate : !isMobile ? { x : -100 , opacity : 1 } : { x : 0 , opacity : 1},
  }

  return (
    <motion.div
      initial={{ opacity : 0 }}
      animate={{ opacity : 1 }}
      exit={{ opacity : 0 }}
      transition={{ type : "spring", stiffness : 300, damping : 25 }}
      className="fixed inset-0 z-2 flex items-center justify-center"
    > 
    {/* goo type sh */}
    

      <motion.div
        initial={{ opacity : 0 , backdropFilter : "blur(0px)" }}
        animate={{ opacity : 1, backdropFilter : "blur(20px)" }}
        exit={{ opacity : 0, backdropFilter : "blur(0px)"}}
        transition={{ duration : 1 , ease : "easeInOut"}}
        className="absolute inset-0 bg-black/50 -z-1"
        onClick={() => setShowReservationForm(false)}
      />

      <motion.form
        initial={{ y: 20, opacity: 0 }}
        animate={ !sidebarOpen ? { y: 20, opacity: 1 } : "animate"}
        exit={{ opacity : 0, scale : 0.9 }}
        variants={reservationVariant}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="reservation-form absolute w-full max-w-xl mx-4 p-6 bg-[var(--color-coffee-medium)] rounded-xl border-4 border-amber-600 shadow-2xl space-y-4"
        // style={{ filter : "url(#goo)" }} // make it gooey
      >
        {/* Sidebar Toggle Button */}
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="top-3 left-3 text-amber-50 bg-amber-700/30 hover:bg-amber-700/50 rounded-full p-2 transition"
          aria-label="Toggle reservation dates sidebar"
          title="View reserved dates"
        >
          📅
        </button>

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
          <label className="block text-sm font-bold text-amber-100 mb-2 tracking-wide">📅Select a Date</label>
          <input
            aria-label="reservation-date"
            className="block w-full px-4 py-3 border-2 border-amber-600 rounded-lg bg-amber-50 text-amber-900 placeholder-amber-700 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 transition font-semibold"
            type="date"
            value={form.date}
            onChange={(e) => setForm({...form , date : e.target.value})}
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
              value={form.start}
              onChange={(e) => setForm({...form , start : e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-amber-100 mb-2 tracking-wide">🕐 End Time</label>
            <input
              aria-label="reservation-end"
              className="block w-full px-4 py-3 border-2 border-amber-600 rounded-lg bg-amber-50 text-amber-900 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 transition font-semibold"
              type="time"
              value={form.end}
              onChange={(e) => setForm({...form , end : e.target.value})}
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
              value={form.pax}
              onChange={(e) => setForm({...form , pax : Number(e.target.value)})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-amber-100 mb-2 tracking-wide">🏷️ Reservation Type</label>
            <select
              aria-label="reservation-type"
              className='block w-full px-4 py-3 border-2 border-amber-600 rounded-lg bg-amber-50 text-amber-900 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 transition font-semibold'
              id='reserve-type'
              // name='reserveType' 
              value={form.type}
              onChange={(e) => setForm({...form , type : e.target.value as RoomType})}
              required
            >
              <option value={RoomType.Study}>📚 Study</option>
              <option value={RoomType.Function}>🎉 Function</option>
            </select>
          </div>
        </div>

        <div className=" border-2 border-amber-400 bg-amber-400/10 rounded-lg p-4 text-center">
          <p className="text-sm text-amber-100 font-semibold mb-1">Estimated Total Price</p>
          <p className="text-3xl font-extrabold text-yellow-300">₱{currentPrice.toLocaleString()}</p>
          <p className="text-xs text-amber-100 mt-1">({form.type === RoomType.Study ? '₱50' : '₱1000'}/hour per person)</p>
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

      {form.feedBack && (
        <div className={`mt-4 p-4 rounded-lg border-l-4 font-semibold ${form.feedBack.includes('successfully') ? 'bg-green-100 border-green-600 text-green-800' : 'bg-red-100 border-red-600 text-red-800'}`}>
          <p className="text-sm">{form.feedBack}</p>
        </div>
      )}
      
      </motion.form>

      {/* Reservation Sidebar */}
      <ReservationSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        reservations={roomReservations}
        onSelectDate={handleSelectDate}
        isMobile={isMobile}
      />
    </motion.div>
  )
}

export default ReservationForm