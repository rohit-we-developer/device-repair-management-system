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
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

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
          estimated_time: timeNumber
        }),
      }
    );

    if (res.ok) {
      setSuccess(true);
      setForm({ title: "", description: "", price: "", estimated_time: "" });

      setTimeout(() => {
        setSuccess(false);
      }, 2500);
    } else {
      const err = await res.json();
      alert("❌ " + JSON.stringify(err));
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 px-6 pb-12 flex items-center justify-center">

      {/* 🔥 SUCCESS TOAST */}
      {success && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-slideDown z-[9999]">
          ✅ Service Added Successfully!
        </div>
      )}

      {/* 🔥 FORM CARD */}
      <div className="w-full max-w-xl bg-[#0b1220]/80 backdrop-blur-lg border border-gray-800 rounded-2xl shadow-2xl p-8">

        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Add New Service
        </h1>

        <p className="text-gray-400 text-center mb-6 text-sm">
          Create and manage services
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* TITLE */}
          <input
            placeholder="Service Title"
            value={form.title}
            onChange={(e)=>setForm({...form, title:e.target.value})}
            className="w-full p-3 rounded-lg bg-[#020617] border border-gray-700 text-white placeholder-gray-400 focus:border-green-400 focus:shadow-[0_0_10px_rgba(34,197,94,0.4)] outline-none transition"
          />

          {/* DESCRIPTION */}
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e)=>setForm({...form, description:e.target.value})}
            className="w-full p-3 rounded-lg bg-[#020617] border border-gray-700 text-white placeholder-gray-400 focus:border-green-400 focus:shadow-[0_0_10px_rgba(34,197,94,0.4)] outline-none transition"
            rows={3}
          />

          {/* PRICE */}
          <input
            type="number"
            placeholder="Price (₹)"
            value={form.price}
            onChange={(e)=>setForm({...form, price:e.target.value})}
            className="w-full p-3 rounded-lg bg-[#020617] border border-gray-700 text-white placeholder-gray-400 focus:border-green-400 focus:shadow-[0_0_10px_rgba(34,197,94,0.4)] outline-none transition"
          />

          {/* TIME */}
          <input
            type="number"
            placeholder="Estimated Time (hours)"
            value={form.estimated_time}
            onChange={(e)=>setForm({...form, estimated_time:e.target.value})}
            className="w-full p-3 rounded-lg bg-[#020617] border border-gray-700 text-white placeholder-gray-400 focus:border-green-400 focus:shadow-[0_0_10px_rgba(34,197,94,0.4)] outline-none transition"
          />

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition shadow-lg hover:shadow-green-500/40 active:scale-95 flex items-center justify-center gap-2 font-semibold"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding...
              </>
            ) : (
              "Add Service 🚀"
            )}
          </button>

        </form>

      </div>

    </div>
  );
}