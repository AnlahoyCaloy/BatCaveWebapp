'use client'
import React, { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reservations } from '../Rooms/RoomCard'
import dayjs from 'dayjs'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css';

interface ReservationSidebarProps {
  isOpen: boolean
  onClose: () => void
  reservations: Reservations[]
  onSelectDate: (date: string) => void
  isMobile: boolean
}

const ReservationSidebar: React.FC<ReservationSidebarProps> = ({
  isOpen,
  onClose,
  reservations,
  onSelectDate,
  isMobile,
}) => {
  // Group reservations by date and calculate total pax
  const dateStats = useMemo(() => {
    // make key, value pair(object?) of {date: string and data{}} of reservation infos
    const stats : Record<string , { totalPax : number; count : number, reservations : Reservations[]; }> = {};
    reservations.map((res) => {
      if(!stats[res.date]) {
        stats[res.date] = { totalPax : 0, count : 0, reservations : [] }
      } // if it doesn't have date 
      stats[res.date].count += 1
      stats[res.date].totalPax += res.pax
      stats[res.date].reservations.push(res)
    })
    return Object.entries(stats) // wrap the stats in an array, becoming an array of objects
    .sort(([dateA] , [dateB]) => dayjs(dateA).diff(dayjs(dateB))) // grabs the keys to the array of stats and compares them to create an order.
    .map(([date , data]) => ({
      date,
      ...data
    })) // for each [date, data] destructure the date and the data and move them in an object 
  }, [reservations]);
  console.log(dateStats)



  const sidebarVariants = {
    hidden: isMobile ? { opacity: 0, y: 100 } : { opacity: 0, x: -100 },
    visible: isMobile ? { opacity: 1, y: 0, x : 0 } : { opacity: 1, x: 375 },
    exit: isMobile ? { opacity: 0, y: 100 } : { opacity: 0, x: -100 },
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <>
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
              <feGaussianBlur in="goo" stdDeviation="1" result="shadow" />
              <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
              <feOffset in="shadow" dx="1" dy="1" result="shadow" />
              <feComposite in2="shadow" in="goo" result="goo" />
              <feComposite in2="goo" in="SourceGraphic" result="mix" />
          </filter>
          <filter id="goo">
              <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
              <feComposite in2="goo" in="SourceGraphic" result="mix" />
            </filter>
          </defs>
        </svg>
    <AnimatePresence>
      
      {isOpen && (
        <>
          {/* Backdrop - only on mobile or always for modal feel */}
          {isMobile && (
            <motion.div
              key="backdrop"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={onClose}
              className="fixed inset-0 bg-black/40 z-1"
              style={{ filter : "url(#goo)" }}
            />
          )}

          {/* Sidebar */}
          <motion.div
            key="sidebar"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`sidebar relative max-w-[400px] w-[350px] max-h-[550px] h-[550px] ${isMobile ? 'z-2' : '-z-1'} bg-gradient-to-b from-amber-900 to-amber-800  text-amber-50 shadow-2xl ${
              isMobile
                ? 'inset-0 mx-4 my-12 rounded-xl max-w-md w-200'
                : 'right-0 top-0 bottom-0 w-96 rounded-r-xl'
            }`}
            // style={{ filter : "url(#goo)" }} //make it gooey 
            
          >
            {/* Header */}
            <div className="p-4 border-b border-amber-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">📅 Reserved Dates</h3>
                <button
                  onClick={onClose}
                  className="text-amber-50 hover:bg-amber-700/50 rounded-full p-2 transition"
                  aria-label="Close sidebar"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Content */}
            <SimpleBar className='max-h-[450px] h-[450px]' style={{ overflowX : "hidden" }}>
            <div className=" gap-2 max-h-[450px] h-[450px] flex flex-col p-4">
              {dateStats.length === 0 ? (
                <div className="text-center text-amber-100 py-8">
                  <p className="text-sm">No reservations yet</p>
                </div>
              ) : (
                dateStats.map((stat, idx) => (
                  <motion.div
                    key={stat.date}
                    initial={{ opacity: 0, x: isMobile ? 0 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => {
                      onSelectDate(stat.date)
                      if (isMobile) onClose()
                    }}
                    className="bg-amber-700/40 border-2 border-amber-600 rounded-lg p-3 cursor-pointer hover:bg-amber-700/60 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-amber-100">
                        📌 {dayjs(stat.date).format('MMM DD, YYYY')}
                      </p>
                      <div className="text-right">
                        <span className="inline-block bg-yellow-500 text-amber-900 font-bold px-2 py-1 rounded text-sm">
                          {stat.totalPax} pax
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-amber-100 space-y-1">
                      <p>📊 {stat.count} reservation{stat.count !== 1 ? 's' : ''}</p>

                      {/* Mini reservation list */}
                      <div className="mt-2 space-y-1">
                        {stat.reservations.slice(0, 2).map((res, ridx) => (
                          <div
                            key={ridx}
                            className="bg-amber-900/50 rounded px-2 py-1 text-xs"
                          >
                            <p className="font-semibold">{res.userName}</p>
                            <p className="text-amber-200">
                              {dayjs(res.date + "T" + res.start).format("h:mm")}pm - {dayjs(res.date + "T" + res.end).format("h:mm")}pm ({res.pax} pax, {res.type})
                            </p>
                          </div>
                        ))}
                        {stat.count > 2 && (
                          <p className="text-xs text-amber-200 italic px-2">
                            +{stat.count - 2} more reservation{stat.count - 2 !== 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
                
            </div>
            </SimpleBar>
            {/* Footer */}
            <div className={`absolute p-4 border-t border-amber-700 bg-amber-900/30 bottom-0 left-30`}>
                  <p className="text-xs text-amber-100 text-center">
                    Total reservations: <span className="font-bold">{reservations.length}</span>
                  </p>
                
                </div>
            
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
    // <div className='flex w-full h-full bg-red-600 z-10 gap-10'>
    //   {
    //     dateStats.map((stats, i) => (
    //       <div key={i} className='flex flex-col gap-10 bg-green-700'>
    //         <div className='flex flex-col'>
    //           <p>{stats.date}</p>,
    //           <p>{stats.totalPax}</p>

    //           <p>{stats.count} reservation{stats.count > 1 ? "s" : ""}</p>
    //         </div>
    //           {
    //             stats.reservations.map((res , i) => (
    //               <div key={i} className='flex gap-10 bg-blue-600'>
    //                 {res.pax} , {res.start} - {res.end}
    //               </div> 
    //             ))
    //           } {
    //             stats.count > 2 && (
    //               <p>

    //               </p>
    //             )
    //           }
    //       </div>
    //     ))
    //   }
    // </div>
    
  )
}

export default ReservationSidebar