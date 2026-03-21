"use client";

import { useState } from "react";

export default function AddService() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    estimated_time: ""
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // 🔥 VALIDATION
    if (!form.title || !form.description || !form.price || !form.estimated_time) {
      alert("All fields required");
      return;
    }

    const priceNumber = Number(form.price);
    const timeNumber = Number(form.estimated_time);

    if (isNaN(priceNumber) || isNaN(timeNumber)) {
      alert("Price & Time must be numbers");
      return;
    }

    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/services/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          price: priceNumber,
          estimated_time: timeNumber   // 🔥 FIX
        }),
      }
    );

    if (res.ok) {
      alert("✅ Service added!");
      window.location.href = "/services";
    } else {
      const err = await res.json();
      console.log(err);
      alert("❌ Error: " + JSON.stringify(err));
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">

      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8">

        <h1 className="text-3xl font-bold mb-2 text-center">
          Add New Service
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Create and manage services
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* TITLE */}
          <input
            placeholder="Service Title"
            value={form.title}
            onChange={(e)=>setForm({...form, title:e.target.value})}
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-green-400"
          />

          {/* DESCRIPTION */}
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e)=>setForm({...form, description:e.target.value})}
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-green-400"
          />

          {/* PRICE */}
          <input
            type="number"
            placeholder="Price (₹)"
            value={form.price}
            onChange={(e)=>setForm({...form, price:e.target.value})}
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-green-400"
          />

          {/* 🔥 NEW FIELD */}
          <input
            type="number"
            placeholder="Estimated Time (hours)"
            value={form.estimated_time}
            onChange={(e)=>setForm({...form, estimated_time:e.target.value})}
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-green-400"
          />

          <button
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold ${
              loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? "Adding..." : "Add Service"}
          </button>

        </form>

      </div>

    </div>
  );
}