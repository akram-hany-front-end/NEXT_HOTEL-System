"use client";

import { useHotelStore } from "@/store/useHotelStore";
import RoomCard from "@/components/RoomCard";

export default function RoomsPage() {
 
  const rooms = useHotelStore((state) => state.rooms);

  return (
    <div className="rooms-container">
      <h1>Rooms</h1>

      <div className="rooms-grid">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}