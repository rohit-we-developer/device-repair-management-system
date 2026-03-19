"use client";

import { useState } from "react";
import { loginUser } from "@/lib/api";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await loginUser(form);

    if (res.access_token) {
      localStorage.setItem("token", res.access_token);

      // 🔥 REDIRECT AFTER LOGIN
      window.location.href = "/services";
    } else {
      alert(res.detail);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900">

      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md p-8 rounded-xl w-96 text-white shadow-lg">

        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          placeholder="Email"
          className="w-full p-3 mb-3 rounded bg-black/40 border border-gray-600"
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-black/40 border border-gray-600"
          onChange={(e)=>setForm({...form,password:e.target.value})}
        />

        <button className="w-full bg-green-500 py-3 rounded">
          Login
        </button>

      </form>

    </div>
  );
}