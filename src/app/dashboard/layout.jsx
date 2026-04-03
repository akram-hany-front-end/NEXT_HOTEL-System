"use client";
import Link from "next/link";


export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li><Link href="/dashboard/rooms">Rooms</Link></li>
          <li><Link href="/dashboard/bookings">In-House</Link></li>
          <li><Link href="/dashboard/home">Home</Link></li>
        </ul>
      </aside>

      <main className="content">
        {children}
      </main>

    </div>
  );
}