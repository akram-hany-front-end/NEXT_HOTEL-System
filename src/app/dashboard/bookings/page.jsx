"use client";

import BookedCard from "@/components/BookedCard";
import { useHotelStore } from "@/store/useHotelStore";

export default function Page() {
  // ✅ هنا بقى جبنا bookings صح
  const bookings = useHotelStore((state) => state.bookings);

  return (
    <div>
      <h1>In-House</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        bookings.map((booking) => (
          <BookedCard key={booking.id} booking={booking} />
        ))
      )}
    </div>
  );
}