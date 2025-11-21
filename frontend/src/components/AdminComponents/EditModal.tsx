import React, { useState } from "react"
import { Reservations } from "../Rooms/RoomCard"
import { ReservationStatus } from "../Rooms/RoomCard"
import { statusOptions } from "@/src/app/admin/reservations/page"
import { motion } from 'framer-motion';

interface EditModalProps {
  reservation : Reservations
  onClose : () => void
  onSave : (r : Reservations) => void //post
}

export const EditModal : React.FC<EditModalProps> = ({ reservation, onClose, onSave }) => {
  const [form, setForm] = useState<Reservations>({ ...reservation })

  const overlayVariant = {
    hidden : { opacity : 0 },
    animate : { opacity : 1},
    exit : { opacity : 0 }
  }

  const modalVariant = {
    hidden : { opacity : 0 , scale : 0.9 },
    animate : { opacity : 1 , scale : 1},
    exit : { opacity : 0 , scale : 0.9}
  }
  
  return (
    <motion.div variants={overlayVariant} initial={"hidden"} animate={"animate"} exit={"exit"} className="fixed text-black inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <motion.div variants={modalVariant} initial={"hidden"} animate={"animate"} exit={"exit"} className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 sm:p-6 md:p-8 lg:p-10">
        <h3 className="text-lg font-bold mb-4">Edit Reservation</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold">User Name</label>
            <input className="w-full border px-2 py-2 rounded" value={form.userName || ''} onChange={(e) => setForm({ ...form, userName: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-semibold">Phone</label>
            <input className="w-full border px-2 py-2 rounded" value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-semibold">Date</label>
            <input type="date" className="w-full border px-2 py-2 rounded" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-semibold">Start</label>
            <input type="time" className="w-full border px-2 py-2 rounded" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-semibold">End</label>
            <input type="time" className="w-full border px-2 py-2 rounded" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-semibold">Pax</label>
            <input type="number" min={1} className="w-full border px-2 py-2 rounded" value={form.pax} onChange={(e) => setForm({ ...form, pax: Number(e.target.value) })} />
          </div>
          <div>
            <label className="text-xs font-semibold">Status</label>
            <select className="w-full border px-2 py-2 rounded" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as ReservationStatus })}>
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-3">
      </div>
          <div className="btns flex gap-5">
            <button className="px-4 py-2 rounded border" onClick={onClose}>Close</button>
            <button className="px-4 py-2 rounded bg-amber-600 text-white" onClick={() => onSave(form)}>Save</button>
          </div>
      </motion.div>
    </motion.div>
  )
}