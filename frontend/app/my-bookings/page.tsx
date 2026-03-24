"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMyBookings } from "@/lib/api";
import { getToken } from "@/lib/auth";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const data = await getMyBookings();
    setBookings(data);
  };

  const cancelBooking = async (id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/cancel/${id}`, {
      method: "PUT",
    });
    fetchBookings();
  };

  const getProgress = (status: string) => {
    switch (status) {
      case "pending":
        return 25;
      case "assigned":
        return 50;
      case "in_progress":
        return 75;
      case "completed":
        return 100;
      case "cancelled":
        return 0;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 px-6 pb-12">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          My Bookings
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          Track your service status easily
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

        {bookings.map((b: any) => (
          <div
            key={b.id}
            className="bg-[#0b1220]/80 border border-gray-800 p-6 rounded-2xl shadow-lg hover:-translate-y-2 hover:shadow-green-500/10 transition duration-300"
          >

            {/* TOP */}
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-semibold text-lg">
                {b.service_name}
              </h2>

              <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400">
                {b.status}
              </span>
            </div>

            {/* DETAILS */}
            <div className="space-y-2 text-sm text-gray-400 mb-5">
              <p>📍 <span className="text-white">{b.address}</span></p>
              <p>🛠 {b.problem_description}</p>
            </div>

            {/* PROGRESS */}
            <div className="w-full bg-gray-800 rounded-full h-1.5 mb-3">
              <div
                className="h-1.5 bg-green-500 rounded-full transition-all"
                style={{ width: `${getProgress(b.status)}%` }}
              ></div>
            </div>

            {/* STATUS */}
            <p className="text-xs text-gray-500 mb-4">
              Status: <span className="text-green-400">{b.status}</span>
            </p>

            {/* ACTION */}
            <div className="flex justify-between items-center">

              {/* SMALL BUTTON */}
              {b.status !== "completed" && b.status !== "cancelled" && (
                <button
                  onClick={() => cancelBooking(b.id)}
                  className="text-xs px-3 py-1.5 rounded-md border border-red-500/30 text-red-400 hover:bg-red-500/10 transition"
                >
                  Cancel
                </button>
              )}

              <span className="text-xs text-gray-500">
                ID: {b.id.slice(0, 6)}
              </span>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}