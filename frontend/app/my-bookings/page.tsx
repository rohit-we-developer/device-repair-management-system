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

    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getMyBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          My Bookings
        </h1>
        <p className="text-gray-500 text-sm">
          Track your service requests & current status
        </p>
      </div>

      {/* EMPTY STATE */}
      {bookings.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow text-center">
          <p className="text-gray-500 text-lg">
            🚀 No bookings yet
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {bookings.map((b: any) => (
            <div
              key={b.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100"
            >
              {/* TOP */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg text-gray-800">
                  {b.service_name || "Laptop Service"}
                </h2>

                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    b.status === "assigned"
                      ? "bg-yellow-100 text-yellow-700"
                      : b.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : b.status === "in_progress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {b.status}
                </span>
              </div>

              {/* DETAILS */}
              <div className="space-y-2 text-sm text-gray-600">

                <p>
                  📍 <span className="font-medium">{b.address}</span>
                </p>

                <p>
                  🛠 {b.problem_description}
                </p>

              </div>

              {/* FOOTER */}
              <div className="mt-5 pt-3 border-t text-xs text-gray-400 flex justify-between">
                <span>ID: {b.id.slice(0, 6)}...</span>
                <span>📅 Recent</span>
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}