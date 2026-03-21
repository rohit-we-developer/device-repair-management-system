"use client";

import { useState } from "react";
import { loginUser } from "@/lib/api";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
  
    const res = await loginUser(form);
  
    if (res.access_token) {
      // 🔥 STORE DATA
      localStorage.setItem("token", res.access_token);
      localStorage.setItem("role", res.role); // 🔥 VERY IMPORTANT
      localStorage.setItem("user_email", form.email);
  
      // 🔥 ROLE BASED REDIRECT
      if (res.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/services";
      }
  
    } else {
      alert(res.detail);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef2f7] px-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden"
      >

        {/* LEFT */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">

          <h1 className="text-lg font-semibold text-gray-500 mb-4">
            💻 LapCare Hub
          </h1>

          <h2 className="text-3xl font-bold mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-500 mb-6 text-sm">
            Login to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="relative">
              <input
                required
                className="w-full p-3 pt-5 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onChange={(e)=>setForm({...form,email:e.target.value})}
              />
              <label className="absolute left-3 top-1 text-xs text-gray-500">
                Email
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                required
                className="w-full p-3 pt-5 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onChange={(e)=>setForm({...form,password:e.target.value})}
              />
              <label className="absolute left-3 top-1 text-xs text-gray-500">
                Password
              </label>
            </div>

            <button
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold ${
                loading
                  ? "bg-gray-300"
                  : "bg-yellow-400 hover:bg-yellow-500"
              }`}
            >
              {loading ? "Logging..." : "Login"}
            </button>

          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Don’t have an account?{" "}
            <a href="/register" className="font-semibold text-black">
              Sign up
            </a>
          </p>

        </div>

        {/* RIGHT TEXT */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-yellow-400 to-orange-400 p-12 items-center">

          <div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Welcome Back to <br />
              <span className="text-black">LapCare Hub</span>
            </h2>

            <p className="text-white/90 text-lg mb-6">
              Access your dashboard, track repairs, and manage services easily.
            </p>

            <ul className="space-y-3 text-white text-sm">
              <li>✔ Fast login</li>
              <li>✔ Secure system</li>
              <li>✔ Real-time updates</li>
            </ul>
          </div>
        </div>

      </motion.div>

    </div>
  );
}