import React from 'react'
import { motion } from 'framer-motion'
import { Reservations } from '../Rooms/RoomCard'
import dayjs from 'dayjs'
import CardLayout from './CardLayout'
interface ConfirmationCardProps {
  reservationData : Reservations[] | null
}

enum statusColorMap {
  Pending = 'bg-orange-500 text-white',
  Ongoing = 'bg-yellow-500 text-black',
  Completed = 'bg-green-600 text-white',
  'No-show' = 'bg-red-500 text-white',
  Cancelled = 'bg-gray-500 text-white'
}

const ConfirmationCard: React.FC<ConfirmationCardProps> = ({ reservationData }) => {
  return (
        <CardLayout>
        {
          reservationData?.map((reservation, i) =>{
            const {date, end, id, pax, roomId, start, status, type, userId, phone, userName} = reservation;
            const formattedDate = dayjs(date).format('MMMM DD, YYYY')
            const exactDateStart = dayjs(`${date}T${start}`).format('h:mm')
            const exactDateEnd = dayjs(`${date}T${end}`).format('h:mm')
            const trimmedRoom = roomId.split('"');
  
            return(
              (
              <div key={i} className="p-6 rounded-lg shadow-lg flex flex-col gap-4 max-w-[800px] w-full" style={{ backgroundColor: "var(--color-coffee-dark)", borderLeft: "4px solid #D4A574" }}>
                <div className="mb-4 pb-4" style={{ background : "var(--color-coffee-medium)" , padding : "20px" , borderRadius : "20px" }}>
                  <h3 className="text-xl font-bold text-orange-100 mb-1">☕ Your Reservation Confirmed</h3>
                  <p className="text-sm text-orange-300">Welcome, <span className="font-semibold text-white">{userName}</span></p>
                </div>
                
                <div className="space-y-3 text-gray-100">
                  <div className="flex items-start gap-3">
                    <span className="text-orange-400">📅</span>
                    <div>
                      <p className="text-xs text-gray-400">Date</p>
                      <p className="font-medium">{formattedDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-orange-400">🏠</span>
                    <div>
                      <p className="text-xs text-gray-400">Room</p>
                      <p className="font-medium">{trimmedRoom}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-orange-400">👥</span>
                    <div>
                      <p className="text-xs text-gray-400">Pax</p>
                      <p className="font-medium">{pax} {pax === 1 ? 'person' : 'persons'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-orange-400">⏰</span>
                    <div>
                      <p className="text-xs text-gray-400">Time</p>
                      <p className="font-medium">{exactDateStart} - {exactDateEnd}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-orange-400">📞</span>
                    <div>
                      <p className="text-xs text-gray-400">Contact</p>
                      <p className="font-medium">{phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-orange-700 bg-opacity-50 p-3 rounded" style={{ backgroundColor: "rgba(212, 165, 116, 0.1)" }}>
                  <p className="text-xs text-gray-400">Reservation ID</p>
                  <p className="font-mono text-sm text-orange-300">{id}</p>
                </div>

                <div className='btns flex justify-between items-center'>
                  <motion.div className={`w-fit p-4 rounded-full text-sm font-semibold ${statusColorMap[status] || 'bg-gray-400 text-white'}`}>
                    {status}
                  </motion.div>
                  {/* should have an onclick cancel */}
                  <motion.div className={`w-fit p-4 rounded-full text-sm font-semibold bg-red-600 cursor-pointer`}> 
                    Cancel
                  </motion.div>
                
                </div>  
               
              </div>
              )
            )
          })
        }
        </CardLayout>
      )
}

export default ConfirmationCard