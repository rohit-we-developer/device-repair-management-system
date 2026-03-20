"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMyBookings } from "@/lib/api";
import { getToken } from "@/lib/auth";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push("/login");
      return;
    }

    getMyBookings().then(setBookings);
  }, []);

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((b: any) => (
            <div key={b.id} className="bg-white p-4 rounded shadow">

              <p><strong>Status:</strong> {b.status}</p>
              <p><strong>Service ID:</strong> {b.service_id}</p>
              <p><strong>Address:</strong> {b.address}</p>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}