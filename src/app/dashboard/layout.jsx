"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  return (
    <div className="dashboard">
      
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li><Link className={pathname === "/dashboard/rooms" ? "active" : ""}  href="/dashboard/rooms">Rooms</Link></li>
          <li><Link className={pathname === "/dashboard/bookings" ? "active" : ""}  href="/dashboard/bookings">In-House</Link></li>
          <li ><Link className={pathname === "/dashboard/home" ? "active" : ""} href="/dashboard/home">Home</Link></li>
        </ul>
      </aside>

      <main className="content">
        {children}
      </main>

    </div>
  );
}