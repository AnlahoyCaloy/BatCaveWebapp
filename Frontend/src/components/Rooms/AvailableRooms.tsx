"use client"
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import RoomCard from './RoomCard';
import { Reservations } from './RoomCard';
import { Room } from './RoomCard';
// Business rules implemented (assumptions):
// - Max capacity per room is 20 (enforced on input)
// - Only one reservation can be "exclusive" (type=function) at overlapping times for a given room.
// - Study reservations can share a date as long as total pax for that date does not exceed 20 and there's no overlapping exclusive function.
// - Function reservations are exclusive: if a function reservation exists overlapping a time, no study reservations are allowed during that time (and vice-versa)
// - Reservation times are considered overlapping if they share any time on the same date.
// WILL ANALYZE THIS MORE IN THE FUTURE 

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)


export function withinOperatingHours(start: string, end: string, openTime: string, closeTime: string) {
  const startTime = dayjs(`2000-01-01T${start}`);
  const endTime = dayjs(`2000-01-01T${end}`);
  const open = dayjs(`2000-01-01T${openTime}`);
  const close = dayjs(`2000-01-01T${closeTime}`);

  return startTime.isSameOrAfter(open) && endTime.isSameOrBefore(close);
}

export function reservationOverlap(startA: string, endA: string, startB: string, endB: string) {
  const aStart = dayjs(`2000-01-01T${startA}`);
  const aEnd = dayjs(`2000-01-01T${endA}`);
  const bStart = dayjs(`2000-01-01T${startB}`);
  const bEnd = dayjs(`2000-01-01T${endB}`);

  return aStart.isBefore(bEnd) && aEnd.isAfter(bStart);
}

// room
const initialDummyRoomsFromDatabase : Room[] = [
  {id : 1 , name : "Study Room" , capacity : 20, reservation : []}
]


const AvailableRooms = () => {
  const [timeNow , setTimeNow] = useState(dayjs().format())
  
  const [room , setRoom] = useState
  (initialDummyRoomsFromDatabase);
  const [reservations , setReservations] = useState(room[0].reservation)

  useEffect(() => {
    if(reservations) {
      console.log(reservations)
    }
  })

  // this is what the user inputted
  function onReserve(roomId : number, r : Omit<Reservations , 'id'>) {
    const currentRoom = room.find(room => roomId === room.id);
    // r is if the user inputted something r is the object and omit is remove the id 
    
    if(!currentRoom) {
      return { success : false , message : "Room not found in database"}
    }
  
    const opStart = '13:00' // 1pm
    const opEnd = '22:00' // 10pm

    // first check if its within operating hours
    if(!withinOperatingHours(r.start , r.end, opStart, opEnd)) {
      return { success : false , message : "Time Needs to be within 1pm to 10pm" }
    }

    // then check if the exisisting reservations overlapped with the current reservation input 
    // if same day and overlapping time
    const overlapping = currentRoom.reservation.filter((existingReservation , i) => {
      if(existingReservation.date === r.date && reservationOverlap(existingReservation.start, existingReservation.end , r.start , r.end)) {
        // if true
        return true; // returns the original values that passed the conditional statement
      }
      return false
    })

    console.log(overlapping)
    
    if(r.type === "study") {
      const overlappingfunction = overlapping.filter(o => o.type === "function") 
      if (overlappingfunction.length > 0 ) return {success : false , message : "Can't reserve during a function"}

      const overlappingStudy = currentRoom.reservation.filter(
        o => o.type === "study" && reservationOverlap(o.start , o.end , r.start, r.end) && o.date === r.date
      ) // o is each of the study times that will overlap the input user
      

      const totalPax = overlappingStudy.reduce((sum, current) => sum + current.pax, 0)
      // const totalPax = overlapping
      // .filter(o => o.type === "study")
      // .reduce((sum , current) => sum + current.pax , 0) + r.pax
      // sum up all the reservations overlapping with type study and add the input pax
      if(totalPax + r.pax > currentRoom.capacity) {
        return { success : false  , message : "Pax exceed maximum limit / change the pax "}
      }
    } 

    const newReservation = {id : Date.now() * 100, ...r}

    setReservations([...currentRoom.reservation , newReservation])

    setRoom(prev => // get the roooms
      prev.map(room => { // loop through the rooms 
        if(room.id === roomId) { // if the id of one of the rooms is the same as the one we inputted which is the what we loop through in the return of this whole component
          return {
            ...room, // copy the whole room object  // except the reservation 
            reservation : [...room.reservation , newReservation], // copy the whole reservation of that specific room and add the newReservation object 
          }
        }
        return room;
      })
    )
  }

  return (
    <div>
      {
        <div>
          {

          }
        </div>
      }
        {
          room.map((r , i) => (
            <RoomCard room={r} key={i} onReserve={onReserve}/>
          ))
        }
    </div>
  )
}

export default AvailableRooms