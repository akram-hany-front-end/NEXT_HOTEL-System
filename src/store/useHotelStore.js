import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useHotelStore = create(
  persist(
    (set) => ({
      // الغرف
      rooms: [{ id: 1, number: 1, image: "/img/room1.jpg", price: 200, info: "Cozy room with city view", rating: 4.2, status: "available", }, { id: 2, number: 2, image: "/img/room2.jpg", price: 210, info: "Modern room with smart TV", rating: 4.5, status: "available", }, { id: 3, number: 3, image: "/img/room3.jpg", price: 220, info: "Luxury room with king bed", rating: 4.8, status: "available", }, { id: 4, number: 4, image: "/img/room4.jpg", price: 230, info: "Room with garden view", rating: 4.1, status: "available", }, { id: 5, number: 5, image: "/img/room5.jpg", price: 240, info: "Comfortable room with AC", rating: 4.0, status: "available", }, { id: 6, number: 6, image: "/img/room6.jpg", price: 250, info: "Spacious family room", rating: 4.6, status: "available", }, { id: 7, number: 7, image: "/img/room7.jpg", price: 260, info: "Elegant room with classic style", rating: 4.3, status: "available", }, { id: 8, number: 8, image: "/img/room8.jpg", price: 270, info: "Room with balcony view", rating: 4.7, status: "available", }, { id: 9, number: 9, image: "/img/room9.jpg", price: 280, info: "Budget room with essentials", rating: 3.9, status: "available", }, { id: 10, number: 10, image: "/img/room10.jpg", price: 290, info: "Room with private bathroom", rating: 4.4, status: "available", }, { id: 11, number: 11, image: "/img/rooom1.jpg", price: 300, info: "Minimal design modern room", rating: 4.2, status: "available", }, { id: 12, number: 12, image: "/img/rooom2.jpg", price: 310, info: "Quiet room for business stay", rating: 4.6, status: "available", }, { id: 13, number: 13, image: "/img/rooom3.jpg", price: 320, info: "Bright room with big windows", rating: 4.5, status: "available", }, { id: 14, number: 14, image: "/img/rooom4.jpg", price: 330, info: "Deluxe room with premium decor", rating: 4.9, status: "available", }, { id: 15, number: 15, image: "/img/rooom5.jpg", price: 340, info: "Room with pool access", rating: 4.7, status: "available", }, { id: 16, number: 16, image: "/img/rooom6.jpg", price: 350, info: "Romantic couple room", rating: 4.8, status: "available", }, { id: 17, number: 17, image: "/img/rooom7.jpg", price: 360, info: "Room with free breakfast", rating: 4.4, status: "available", }, { id: 18, number: 18, image: "/img/rooom8.jpg", price: 370, info: "Executive room with workspace", rating: 4.6, status: "available", }, { id: 19, number: 19, image: "/img/rooom9.jpg", price: 380, info: "High-speed internet room", rating: 4.3, status: "available", }, { id: 20, number: 20, image: "/img/rooom10.jpg", price: 390, info: "Large family suite", rating: 4.7, status: "available", }, { id: 21, number: 21, image: "/img/roooom1.jpg", price: 400, info: "Luxury bathroom included", rating: 4.9, status: "available", }, { id: 22, number: 22, image: "/img/roooom2.jpg", price: 410, info: "Classic wooden furniture room", rating: 4.1, status: "available", }, { id: 23, number: 23, image: "/img/roooom3.jpg", price: 420, info: "Room with flat-screen TV", rating: 4.2, status: "available", }, { id: 24, number: 24, image: "/img/roooom4.jpg", price: 430, info: "Affordable and clean room", rating: 3.8, status: "available", }, { id: 25, number: 25, image: "/img/roooom5.jpg", price: 440, info: "Balcony with scenic view", rating: 4.6, status: "available", }, { id: 26, number: 26, image: "/img/roooom6.jpg", price: 450, info: "Extra comfortable bed room", rating: 4.7, status: "available", }, { id: 27, number: 27, image: "/img/roooom7.jpg", price: 460, info: "Room with minibar", rating: 4.3, status: "available", }, { id: 28, number: 28, image: "/img/roooom8.jpg", price: 470, info: "Daily housekeeping service room", rating: 4.5, status: "available", }, { id: 29, number: 29, image: "/img/roooom9.jpg", price: 480, info: "Stylish lighting room", rating: 4.2, status: "available", }, { id: 30, number: 30, image: "/img/roooom10.jpg", price: 500, info: "Peaceful and relaxing room", rating: 4.8, status: "available", },],

      bookings: [],

      // ➕ Add Booking
      addBooking: (booking) =>
        set((state) => ({
          bookings: [...state.bookings, booking],

          rooms: state.rooms.map((room) =>
            room.id === booking.roomId
              ? { ...room, status: "booked" }
              : room
          ),
        })),

      // ❌ Cancel Booking
      cancelBooking: (id) =>
        set((state) => {
          const booking = state.bookings.find((b) => b.id === id);

          return {
            bookings: state.bookings.filter((b) => b.id !== id),

            rooms: state.rooms.map((room) =>
              room.id === booking.roomId
                ? { ...room, status: "available" }
                : room
            ),
          };
        }),

      // ✏️ Update Booking
      updateBooking: (updatedBooking) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === updatedBooking.id ? updatedBooking : b
          ),
        })),
    }),
    {
      name: "hotel-storage", // 🔥 اسم التخزين في localStorage
    }
  )
);