'use client'
import React, { useEffect, useState } from 'react'
import { apiGet, apiPost } from '@/src/api/axios'
import { Reservations, ReservationStatus } from '@/src/components/Rooms/RoomCard'
import AdminOnlyLayout from '@/src/components/AdminComponents/AdminOnlyLayout'
// import { EditModal } from '@/src/components/Admin/EditModal'
// import AdminOnlyLayout from '@/src/components/Admin/AdminOnlyLayout'
export const statusOptions: ReservationStatus[] = [
  ReservationStatus.Pending,
  ReservationStatus.Ongoing,
  ReservationStatus.Completed,
  ReservationStatus.NoShow,
  ReservationStatus.Cancelled,
]

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservations[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState<Reservations | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // useEffect(() => {
  //   const fetchReservations = async () => {
  //     setLoading(true)
  //     setError(null)
  //     try {
  //       // try GET first, fallback to POST if necessary
  //       const res = await apiGet('/reservations')
  //       if (res && res.data) {
  //         console.log(res)
  //         setReservations(res.data)
  //       } else {
  //         // fallback - some backends expect POST to fetch all
  //         const r2 = await apiPost('/reservations-all', {})
  //         if (r2 && r2.success && r2.data) setReservations(r2.data)
  //       }
  //     } catch (e) {
  //       console.error(e)
  //       setError('Could not load reservations')
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchReservations()
  //   const checkMobile = () => setIsMobile(window.innerWidth < 768)
  //   checkMobile()
  //   window.addEventListener('resize', checkMobile)
  //   return () => window.removeEventListener('resize', checkMobile)
  // }, [])

  // const onSave = async (updated: Reservations) => {
  //   setLoading(true)
  //   setError(null)
  //   try {
  //     const payload = { ...updated }
  //     const resp = await apiPost('/reservations-update', payload)
  //     if (resp && resp.success) {
  //       setReservations((prev) => prev.map((r) => (r.id === updated.id ? updated : r)))
  //       setEditing(null)
  //     } else {
  //       setError('Failed to update reservation')
  //     }
  //   } catch (err) {
  //     console.error(err)
  //     setError('Failed to update reservation')
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  
  useEffect(() => { 
    const fetchReservations = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await apiGet("/reservations");
        if(res && res.data) {
          const format : Reservations[] = res.data.map((r : Record<string , string | number>) => ({
            id : r.id,
            date : r.date,
            phone : r.phone,
            start : r.start,
            pax : r.pax,
            type : r.type,
            status : r.status,
            roomId : r.room_id,
            userId : r.user_id,
            userName : r.user_name
          }))
          setReservations(format);
        }
      } catch(e) {
        console.log(e)
        setError('Failed to update reservation')
      } finally {
        setLoading(false);
      }
    }

    fetchReservations()
    // check if mobile then change the state to change the vdom
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  function onSave(form : Reservations) {
    try {
      if(form) {

      }
    } catch (e) {
      console.log(e);
    }
    
  }
    
  return (
      <div className="p-6 ">
        <h2 className="text-2xl font-bold mb-4">Reservations</h2>

        {loading && <div className="text-sm text-black">Loading…</div>}
        {error && <div className="text-sm text-red-600 mb-2">{error}</div>}

        {/* Desktop: table; Mobile: stacked cards */}
        {!isMobile ? (
          <div className="text-black overflow-auto bg-white rounded-lg shadow">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">User</th>
                  <th className="px-4 py-2 text-left">Phone</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Time</th>
                  <th className="px-4 py-2 text-left">Pax</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((r) => (
                  <tr key={r.id} className="border-b last:border-b-0 bg-linear-to-r from-amber-600 to-yellow-400">
                    <td className="px-4 py-3 text-sm">{r.id}</td>
                    <td className="px-4 py-3 text-sm">{r.userName || r.userId}</td>
                    <td className="px-4 py-3 text-sm">{r.phone || '-'}</td>
                    <td className="px-4 py-3 text-sm">{r.date}</td>
                    <td className="px-4 py-3 text-sm">{r.start} - {r.end}</td>
                    <td className="px-4 py-3 text-sm">{r.pax}</td>
                    <td className="px-4 py-3 text-sm">{r.type}</td>
                    <td className="px-4 py-3 text-sm">{r.status}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <button
                          className="px-3 py-1 bg-amber-600 text-white rounded text-sm"
                          onClick={() => setEditing(r)}
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="space-y-3">
            {reservations.map((r) => (
              <div key={r.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm text-gray-500">{r.date} • {r.start} - {r.end}</div>
                    <div className="text-lg font-semibold">{r.userName || r.userId}</div>
                    <div className="text-sm text-gray-600">{r.type} • {r.pax} pax</div>
                    <div className="text-sm text-gray-600">Phone: {r.phone || '-'}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-sm font-medium px-2 py-1 rounded bg-amber-100 text-amber-800">{r.status}</div>
                    <button className="px-3 py-1 bg-amber-600 text-white rounded text-sm" onClick={() => setEditing(r)}>Edit</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit modal */}
        {editing && (
          <EditModal
            reservation={editing}
            onClose={() => setEditing(null)}
            onSave={onSave}
          />
        )}
      </div>
  )
}
