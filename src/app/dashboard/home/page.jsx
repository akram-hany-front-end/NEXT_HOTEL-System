"use client";

import { useState } from "react";
import { useHotelStore } from "@/store/useHotelStore";
 import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  const rooms = useHotelStore((state) => state.rooms);
  const addBooking = useHotelStore((state) => state.addBooking);

  const [form, setForm] = useState({
    clientName: "",
    ClintID: "",
    phoneNumber: "",
    roomId: "",
    days: "",
  });

  const handleSubmit = () => {
    const room = rooms.find((r) => r.id == form.roomId);

    addBooking({
      id: Date.now(),
      ClintID: form.ClintID,
      clientName: form.clientName,
      roomId: room.id,
      phoneNumber: room.phoneNumber,
      roomNumber: room.number,
      days: form.days,
    });

    setShowPopup(false);
  };

  return (
    <div>
      <h1>Hotel System</h1>

      <button onClick={() => setShowPopup(true)}>
         <FontAwesomeIcon icon={faPlusCircle} /> New Booking
      </button>

      {/* Popup */}
      {showPopup && (
        <div className="popup">

          <div className="popup-content">
            <h2>New Booking</h2>

            <input
              placeholder="Name"
              onChange={(e) =>
                setForm({ ...form, clientName: e.target.value })
              }
            />
             <input
              type="number"
              placeholder="ID"
              onChange={(e) =>
                setForm({ ...form, ClintID: e.target.value })
              }
            />
             <input
              type="number"
              placeholder="Phone"
              onChange={(e) =>
                setForm({ ...form, phoneNumber: e.target.value })
              }
            />


            <select
              onChange={(e) =>
                setForm({ ...form, roomId: e.target.value })
              }
            >
              <option>Room number</option>

              {rooms
                .filter((r) => r.status === "available")
                .map((room) => (
                  <option key={room.id} value={room.id}>
                    Room {room.number}
                  </option>
                ))}
            </select>

            <input
              type="number"
              placeholder="Days"
              onChange={(e) =>
                setForm({ ...form, days: e.target.value })
              }
            />

            <button onClick={handleSubmit}>Confirm</button>

            <button onClick={() => setShowPopup(false)}>
              Cancel
            </button>
          </div>

        </div>
      )}
    </div>
  );
}