"use client";

import { useState } from "react";
import { registerUser } from "@/lib/api";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name:"",
    email:"",
    phone:"",
    password:"",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e:any)=>{
    e.preventDefault();
    setLoading(true);

    const res = await registerUser(form);
    alert(res.message);

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef2f7] px-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden"
      >

        {/* LEFT FORM */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">

          <h1 className="text-sm font-semibold text-gray-500 mb-3">
            💻 LapCare Hub
          </h1>

          <h2 className="text-2xl font-bold mb-1">
            Create Account
          </h2>

          <p className="text-gray-500 mb-4 text-sm">
            Start your journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">

            {["name","email","phone","password"].map((field)=>(
              <div key={field} className="relative">
                <input
                  type={field === "password" ? "password" : "text"}
                  required
                  className="w-full p-2.5 pt-4 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                  onChange={(e)=>setForm({...form,[field]:e.target.value})}
                />
                <label className="absolute left-3 top-1 text-[10px] text-gray-500 capitalize">
                  {field}
                </label>
              </div>
            ))}

            <button
              disabled={loading}
              className={`w-full py-2.5 rounded-lg text-sm font-semibold ${
                loading
                  ? "bg-gray-300"
                  : "bg-yellow-400 hover:bg-yellow-500"
              }`}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

          </form>

          <p className="text-xs text-gray-500 mt-4 text-center">
            Already have an account?{" "}
            <a href="/login" className="font-semibold text-black">
              Sign in
            </a>
          </p>

          <p className="text-[10px] text-gray-400 mt-3 text-center">
            Terms & Conditions
          </p>

        </div>

        {/* RIGHT TEXT */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-yellow-400 to-orange-400 p-8 items-center">

          <div>
            <h2 className="text-3xl font-bold text-white mb-3 leading-tight">
              Welcome to <br />
              <span className="text-black">LapCare Hub</span>
            </h2>

            <p className="text-white/90 text-sm mb-4">
              Manage your laptop services, repairs, and bookings in one place.
            </p>

            <ul className="space-y-2 text-white text-xs">
              <li>✔ Easy booking</li>
              <li>✔ Track status</li>
              <li>✔ Trusted service</li>
            </ul>
          </div>

        </div>

      </motion.div>

    </div>
  );
}