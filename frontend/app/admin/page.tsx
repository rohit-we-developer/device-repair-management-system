"use client";

import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, AreaChart, Area
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>({});
  const [bookings, setBookings] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingService, setEditingService] = useState<any>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    estimated_time: "",
  });

  const COLORS = ["#22c55e", "#3b82f6", "#facc15"];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      window.location.href = "/login";
      return;
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const [
        revenueRes,
        ratingRes,
        topServiceRes,
        bookingsRes,
        servicesRes,
        monthlyRes,
        statusRes,
      ] = await Promise.all([
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
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/admin/all`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/graph/monthly-revenue`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/graph/booking-status`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const revenue = await revenueRes.json();
      const rating = await ratingRes.json();
      const topService = await topServiceRes.json();
      const bookingsData = await bookingsRes.json();
      const servicesData = await servicesRes.json();

      let monthly: any[] = [];
      let status: any[] = [];

      if (monthlyRes && monthlyRes.ok) {
        const m = await monthlyRes.json();
        monthly = m.labels.map((label: string, i: number) => ({
          month: label,
          revenue: m.data[i],
        }));
      }

      if (statusRes && statusRes.ok) {
        const s = await statusRes.json();
        status = s.labels.map((label: string, i: number) => ({
          status: label,
          count: s.data[i],
        }));
      }

      setStats({ revenue, rating, topService, monthly, status });
      setBookings(bookingsData);
      setServices(servicesData);

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
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    fetchData();
  };

  const toggleService = async (id: string) => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/services/toggle/${id}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const updated = await res.json();

    setServices((prev: any[]) =>
      prev.map((s) =>
        s.id === updated.id
          ? { ...s, is_active: updated.is_active }
          : s
      )
    );
  };

  const updateService = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/services/${editingService.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          estimated_time: Number(form.estimated_time),
        }),
      }
    );

    const updated = await res.json();

    setServices((prev: any[]) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );

    setEditingService(null);
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

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Revenue</p>
          <h2 className="text-2xl font-bold text-green-600">
            ₹{stats.revenue?.total_revenue || 0}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Average Rating</p>
          <h2 className="text-xl font-bold text-yellow-600">
            ⭐ {stats.rating?.average_rating || 0}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Top Service</p>
          <h2 className="text-xl font-bold text-blue-600">
            {stats.topService?.service || "-"}
          </h2>
        </div>

      </div>

      {/* 🔥 GRAPH SECTION (UPGRADED) */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">

        {/* Revenue */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Revenue Trend</h2>

          <div className="flex justify-center">
            <AreaChart width={400} height={250} data={stats.monthly || []}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#4f46e5"
                fill="#c7d2fe"
                strokeWidth={3}
              />
            </AreaChart>
          </div>
        </div>

        {/* Booking Status */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Booking Status</h2>

          <div className="flex justify-center">
            <PieChart width={300} height={250}>
              <Pie
                data={stats.status || []}
                dataKey="count"
                nameKey="status"
                outerRadius={100}
              >
                {(stats.status || []).map((entry: any, index: number) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>

      </div>

      {/* SERVICES */}
      <h2 className="text-xl font-semibold mb-4 mt-6">Manage Services</h2>

      <div className="grid md:grid-cols-2 gap-4 mb-10">

        {services.map((s: any) => (
          <div key={s.id} className="bg-white p-4 rounded-xl shadow">

            <p className="font-semibold">{s.title}</p>
            <p className="text-sm text-gray-500">₹{s.price}</p>

            <p className="text-xs mt-1">
              Status:
              <span className={s.is_active ? "text-green-600" : "text-red-600"}>
                {s.is_active ? " Active" : " Inactive"}
              </span>
            </p>

            {/* 🔥 FIXED BUTTON ALIGNMENT */}
            <div className="mt-3 flex items-center gap-2">

              <button
                onClick={() => toggleService(s.id)}
                className="bg-gray-700 text-white px-3 py-1 rounded text-sm"
              >
                {s.is_active ? "Deactivate" : "Activate"}
              </button>

              <button
                onClick={() => {
                  setEditingService(s);
                  setForm({
                    title: s.title,
                    description: s.description,
                    price: s.price,
                    estimated_time: s.estimated_time,
                  });
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* BOOKINGS */}
      <h2 className="text-xl font-semibold mb-4">All Bookings</h2>

      <div className="space-y-4">

        {bookings.map((b: any) => (
          <div key={b.id} className="bg-white p-5 rounded-xl shadow">

            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">{b.service_name}</p>
                <p className="text-sm text-gray-500">{b.address}</p>

                <p className="text-xs text-gray-400 mt-1">
                  👤 {b.user_email || "Unknown"}
                </p>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs ${b.status === "assigned"
                ? "bg-yellow-100 text-yellow-700"
                : b.status === "in_progress"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
                }`}>
                {b.status}
              </span>
            </div>

            <div className="mt-4 flex gap-2">

              {b.status === "assigned" && (
                <button
                  onClick={() => updateStatus(b.id, "in_progress")}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Start
                </button>
              )}

              {b.status !== "completed" && (
                <button
                  onClick={() => updateStatus(b.id, "completed")}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Complete
                </button>
              )}

            </div>

          </div>
        ))}

      </div>

      {/* 🔥 EDIT MODAL (NEW) */}
      {editingService && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-[350px] space-y-3">

            <h2 className="font-semibold">Edit Service</h2>

            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border p-2 rounded"
            />

            <input
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border p-2 rounded"
            />

            <input
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full border p-2 rounded"
            />

            <input
              value={form.estimated_time}
              onChange={(e) =>
                setForm({ ...form, estimated_time: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <div className="flex gap-2">
              <button
                onClick={updateService}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setEditingService(null)}
                className="bg-gray-400 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}