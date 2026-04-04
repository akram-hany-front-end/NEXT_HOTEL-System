"use client";

import React, { useEffect, useState } from "react";
import { useHotelStore } from "@/store/useHotelStore";

const BookedCard = ({ booking }) => {
  const cancelBooking = useHotelStore((state) => state.cancelBooking);

  const [timeLeft, setTimeLeft] = useState(booking.days * 24 * 60 * 60);

  // ⏳ Countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // تحويل الوقت
  const formatTime = () => {
    const days = Math.floor(timeLeft / (60 * 60 * 24));
    const hours = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((timeLeft % (60 * 60)) / 60);

    return `${days}d ${hours}h ${minutes}m`;
  };

  // 💰 Checkout (فاتورة)
  const handleCheckout = () => {
    const total = booking.days * booking.price;

    alert(`
Your Bill:
Client: ${booking.clientName}
Room: ${booking.roomNumber}
Days: ${booking.days}
Total: $${total}
    `);
  };

  return (
    <div className="booked-card-container">

      <h4>{booking.clientName}</h4>
      <h3>ID: {booking.id}</h3>

      <span>Room: {booking.roomNumber}</span>

      <span>⏳ {formatTime()}</span>

      <h3>Phone: {booking.phone || "N/A"}</h3>

      <p>Total: ${booking.days * (booking.price || 0)}</p>

      <div className="buttons-card-container">
        <button onClick={handleCheckout}>Checkout</button>

        <button onClick={() => cancelBooking(booking.id)}>
          Cancel
        </button>
      </div>

    </div>
  );
};

export default BookedCard;