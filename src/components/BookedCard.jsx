"use client";

import React, { useEffect, useState } from "react";
import { useHotelStore } from "@/store/useHotelStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScaleBalanced } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom"; // 🔥

const BookedCard = ({ booking }) => {
  const cancelBooking = useHotelStore((state) => state.cancelBooking);
  const updateBooking = useHotelStore((state) => state.updateBooking);

  const [showEdit, setShowEdit] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [mounted, setMounted] = useState(false); // 🔥 مهم

  // ✅ Fix hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // ⏱ Countdown
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const checkout = new Date(booking.checkOut).getTime();
      const diff = Math.floor((checkout - now) / 1000);

      if (diff <= 0) {
        setTimeLeft(0);
        clearInterval(interval);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [booking.checkOut]);

  const formatTime = () => {
    const days = Math.floor(timeLeft / (60 * 60 * 24));
    const hours = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  // ✏️ Edit Form
  const [editForm, setEditForm] = useState({
    clientName: booking.clientName,
    ClintID: booking.ClintID,
    phoneNumber: booking.phoneNumber,
    days: booking.days,
  });

  // 💵 Checkout
  const handleCheckout = () => {
    const total = booking.days * booking.price;
    alert(`
Your Bill:
National ID: ${booking.ClintID}
Client: ${booking.clientName}
Room: ${booking.roomNumber}
Days: ${booking.days}
Check-In: ${booking.checkIn}
Check-Out: ${booking.checkOut}
Phone: ${booking.phoneNumber}
Total: $${total}
    `);
  };

  // 🔄 Update
  const handleUpdate = () => {
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkOutDate.getDate() + Number(editForm.days));

    updateBooking({
      ...booking,
      ...editForm,
      days: Number(editForm.days),
      checkOut: checkOutDate.toISOString().split("T")[0],
    });

    setShowEdit(false);
  };

  return (
    <div className="booked-card-container">
      <h4 className="clint-name-booked">{booking.clientName}</h4>
      <h3 className="clint-id-booked">ID: {booking.ClintID}</h3>
      <span className="room-num-booked">Room: {booking.roomNumber}</span>

      <span className="countdown-booked">
        <FontAwesomeIcon icon={faScaleBalanced} /> {formatTime()}
      </span>

      <h3 className="clint-phone-booked">
        Phone: {booking.phoneNumber || "N/A"}
      </h3>

      <p className="price-booked">
        Total: ${booking.days * (booking.price || 0)}
      </p>

      <p className="checkin-date-booked">
        Check-In: {booking.checkIn}
      </p>

      <p className="checkout-date-booked">
        Check-Out: {booking.checkOut}
      </p>

      <div className="buttons-card-container">
        <button className="checkin-booked" onClick={handleCheckout}>
          Checkout
        </button>

        <button
          className="checkout-booked"
          onClick={() => cancelBooking(booking.id)}
        >
          Cancel
        </button>

        <button
          className="edit-booked"
          onClick={() => setShowEdit(true)}
        >
          Edit
        </button>
      </div>

      {/* 🔥 Portal Popup */}
      {mounted &&
        showEdit &&
        createPortal(
          <div
            className="popup-booked"
            onClick={() => setShowEdit(false)} // close outside
          >
            <div
              className="popup-content-booked"
              onClick={(e) => e.stopPropagation()} // prevent close
            >
              <h2 className="heading-edit">Edit Booking</h2>

              <input
                value={editForm.clientName}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    clientName: e.target.value,
                  })
                }
              />

              <input
                value={editForm.ClintID}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    ClintID: e.target.value,
                  })
                }
              />

              <input
                value={editForm.phoneNumber}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    phoneNumber: e.target.value,
                  })
                }
              />

              <input
                type="number"
                value={editForm.days}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    days: e.target.value,
                  })
                }
              />

              <button
                className="edit-save-btn-booked"
                onClick={handleUpdate}
              >
                Save
              </button>

              <button
                className="edit-cancel-btn-booked"
                onClick={() => setShowEdit(false)}
              >
                Cancel
              </button>
            </div>
          </div>,
          document.body // 🔥 هنا السر
        )}
    </div>
  );
};

export default BookedCard;