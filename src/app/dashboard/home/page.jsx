"use client";
import BookedCard from "@/components/BookedCard";
import { useState } from "react";
import { useHotelStore } from "@/store/useHotelStore";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [roomOpen, setRoomOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const rooms = useHotelStore((state) => state.rooms);
  const addBooking = useHotelStore((state) => state.addBooking);

  const [form, setForm] = useState({
    clientName: "",
    ClintID: "",
    phoneNumber: "",
    roomId: "",
    days: "",
    checkIn: "",
  });

  const handleSubmit = () => {
    const room = rooms.find((r) => r.id == form.roomId);

    const checkInDate = new Date(form.checkIn);

    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkOutDate.getDate() + Number(form.days));

    addBooking({
      id: Date.now(),
      ClintID: form.ClintID,
      clientName: form.clientName,
      phone: form.phoneNumber,
      roomId: room.id,
      roomNumber: room.number,
      price: room.price,
      days: Number(form.days),
      phoneNumber: form.phoneNumber,
      checkIn: form.checkIn,
      checkOut: checkOutDate.toISOString().split("T")[0],
    });

    setShowPopup(false);
  };
  const bookings = useHotelStore((state) => state.bookings);

  return (
    <div className="home-container">
      <div>
        <h1 className="home-welcome-heading">Hotel System</h1>

        <button
          className="home-new-book-btn"
          onClick={() => setShowPopup(true)}
        >
          <FontAwesomeIcon icon={faPlusCircle} /> New Booking
        </button>

        {/* Popup */}
        {showPopup && (
          <div className="popup" onClick={() => setShowPopup(false)}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <h2>New Booking</h2>

              <input
                className="home-popup-clint-name-new-book"
                placeholder="Name"
                onChange={(e) =>
                  setForm({ ...form, clientName: e.target.value })
                }
              />
              <input
                className="home-popup-clint-id-new-book"
                type="number"
                placeholder="ID"
                onChange={(e) => setForm({ ...form, ClintID: e.target.value })}
              />
              <input
                className="home-popup-clint-phone-new-book"
                type="number"
                placeholder="Phone"
                onChange={(e) =>
                  setForm({ ...form, phoneNumber: e.target.value })
                }
              />
              <div className="custom-dropdown">
                <div
                  className="dropdown-selected"
                  onClick={() => setRoomOpen(!roomOpen)}
                >
                  {selectedRoom ? `Room ${selectedRoom.number}` : "Select Room"}
                </div>

                {roomOpen && (
                  <div className="dropdown-list">
                    {rooms
                      .filter((r) => r.status === "available")
                      .map((room) => (
                        <div
                          key={room.id}
                          className="dropdown-item"
                          onClick={() => {
                            setSelectedRoom(room);
                            setForm({ ...form, roomId: room.id });
                            setRoomOpen(false);
                          }}
                        >
                          Room {room.number}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <input
                className="home-popup-days-new-book"
                type="number"
                placeholder="Days"
                onChange={(e) => setForm({ ...form, days: e.target.value })}
              />

              <input
                className="home-popup-checkin-date-new-book"
                type="date"
                onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
              />

              <button onClick={handleSubmit}>Confirm</button>

              <button onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
      <div className="home-in-house-customers">
        {bookings.length === 0 ? (
          <p>No bookings yet</p>
        ) : (
          bookings.map((booking) => (
            <BookedCard key={booking.id} booking={booking} />
          ))
        )}
      </div>
    </div>
  );
}
