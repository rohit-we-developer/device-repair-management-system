"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getServices } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { bookService } from "@/lib/api";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    // 🔥 PROTECT ROUTE
    if (!token) {
      router.push("/login");
      return;
    }

    // 🔥 FETCH SERVICES
    getServices().then(setServices);
  }, []);

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold text-center mb-10">
        Our Services
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((s: any) => (
          <div
            key={s.id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <h2 className="text-xl font-bold mb-2">{s.title}</h2>
            <p className="text-gray-600">{s.description}</p>

            <p className="mt-4 text-green-600 text-lg font-bold">
              ₹{s.price}
            </p>

            <button
              onClick={async () => {
                const res = await bookService(s.id);
                alert("Service booked!");
              }}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}