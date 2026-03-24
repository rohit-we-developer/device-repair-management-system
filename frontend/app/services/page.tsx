"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getServices, bookService } from "@/lib/api";
import { getToken } from "@/lib/auth";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push("/login");
      return;
    }

    getServices().then((data) => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 px-6 pb-12 relative">

      {/* 🔥 SUCCESS TOAST */}
      {success && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[9999] bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-slideDown">
          ✅ Service Booked Successfully!
        </div>
      )}

      {/* 🔥 TITLE */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
        Our Services
      </h1>

      {/* 🔥 LOADING SKELETON */}
      {loading && (
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-[#0b1220] animate-pulse rounded-xl"></div>
          ))}
        </div>
      )}

      {/* 🔥 EMPTY STATE */}
      {!loading && services.length === 0 && (
        <div className="text-center text-gray-400">
          No services available 😕
        </div>
      )}

      {/* 🔥 SERVICES GRID */}
      {!loading && services.length > 0 && (
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

          {services.map((s: any, i) => (
            <div
              key={s.id}
              className={`relative p-6 rounded-2xl border transition duration-300 group
              ${i === 0
                  ? "bg-gradient-to-br from-green-500/10 to-transparent border-green-500 shadow-lg shadow-green-500/20 scale-[1.02]"
                  : "bg-[#0b1220]/80 border-gray-800 hover:border-green-400 hover:-translate-y-2 hover:shadow-green-500/20"
                }`}
            >

              {/* 🔥 ICON */}
              <div className="text-3xl mb-3">
                {i === 0 && "🖥️"}
                {i === 1 && "🔋"}
                {i === 2 && "🔋"}
                {i === 3 && "🧠"}
                {i === 4 && "🧹"}
                {i === 5 && "💾"}
              </div>

              {/* 🔥 TITLE */}
              <h2 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition">
                {s.title}
              </h2>

              {/* 🔥 DESC */}
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {s.description}
              </p>

              {/* 🔥 PRICE */}
              <p className="text-green-400 text-xl font-bold mb-5">
                ₹{s.price}
              </p>

              {/* 🔥 BUTTON */}
              <button
                onClick={async () => {
                  try {
                    await bookService(s.id);
                    setSuccess(true);
                    setTimeout(() => setSuccess(false), 3000);
                  } catch (err: any) {
                    alert(err.message || "Booking failed");
                  }
                }}
                className="w-full py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 
                hover:from-green-600 hover:to-emerald-600 transition shadow-md 
                hover:shadow-green-500/40 active:scale-95 relative overflow-hidden"
              >
                <span className="relative z-10">Book Now 🚀</span>

                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition"></span>
              </button>

              {/* 🔥 FEATURE TAG */}
              {i === 0 && (
                <div className="absolute top-3 right-3 text-xs bg-green-500 text-white px-2 py-1 rounded">
                  Popular
                </div>
              )}

            </div>
          ))}

        </div>
      )}

    </div>
  );
}