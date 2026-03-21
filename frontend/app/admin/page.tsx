"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>({});
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      window.location.href = "/login";
      return;
    }

    fetchData(); // 🔥 FIX: call added
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const [revenueRes, ratingRes, topServiceRes, bookingsRes] =
        await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/revenue`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/average-rating`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/top-service`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/all-bookings`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

      const revenue = await revenueRes.json();
      const rating = await ratingRes.json();
      const topService = await topServiceRes.json();
      const bookingsData = await bookingsRes.json();

      setStats({ revenue, rating, topService });
      setBookings(bookingsData);

    } catch (err) {
      console.error("ADMIN ERROR:", err);
      alert("Error loading admin data");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    const token = localStorage.getItem("token");

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/booking/update-status/${id}?status=${status}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchData(); // 🔄 refresh
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f9] p-6">

      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* 🔥 STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500">Total Revenue</p>
          <h2 className="text-2xl font-bold text-green-600">
            ₹{stats.revenue?.total || 0}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500">Average Rating</p>
          <h2 className="text-xl font-bold text-yellow-600">
            ⭐ {stats.rating?.average || 0}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500">Top Service</p>
          <h2 className="text-xl font-bold text-blue-600">
            {stats.topService?.name || "-"}
          </h2>
        </div>

      </div>

      {/* 🔥 BOOKINGS CONTROL */}
      <h2 className="text-xl font-semibold mb-4">All Bookings</h2>

      <div className="space-y-4">

        {bookings.map((b: any) => (
          <div key={b.id} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">

            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">{b.service_name}</p>
                <p className="text-sm text-gray-500">{b.address}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  b.status === "assigned"
                    ? "bg-yellow-100 text-yellow-700"
                    : b.status === "in_progress"
                    ? "bg-blue-100 text-blue-700"
                    : b.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {b.status}
              </span>
            </div>

            <div className="mt-4 flex gap-2">

              <button
                onClick={() => updateStatus(b.id, "in_progress")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Start
              </button>

              <button
                onClick={() => updateStatus(b.id, "completed")}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              >
                Complete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}