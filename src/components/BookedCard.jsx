"use client";

import React, { useEffect, useState } from "react";
import { useHotelStore } from "@/store/useHotelStore";

const BookedCard = ({ booking }) => {
  const cancelBooking = useHotelStore((state) => state.cancelBooking);

  const [timeLeft, setTimeLeft] = useState(0);

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

  return (
    <div className="booked-card-container">
      <h4>{booking.clientName}</h4>
      <h3>ID: {booking.ClintID}</h3>

      <span>Room: {booking.roomNumber}</span>

      <span>⏳ {formatTime()}</span>

      <h3>Phone: {booking.phoneNumber || "There is no Phone Number"}</h3>

      <p>Total: ${booking.days * (booking.price || 0)}</p>
      <p>Check-In: {booking.checkIn}</p>
      <p>Check-Out: {booking.checkOut}</p>

      <div className="buttons-card-container">
        <button onClick={handleCheckout}>Checkout</button>

        <button onClick={() => cancelBooking(booking.id)}>Cancel</button>
      </div>
    </div>
  );
};

export default BookedCard;
