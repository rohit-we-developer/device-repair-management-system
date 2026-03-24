"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    let newErrors: any = {};

    if (!form.name.trim()) newErrors.name = "Name required";
    if (!form.email.includes("@")) newErrors.email = "Valid email required";
    if (form.message.length < 10) newErrors.message = "Message too short";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      await fetch("http://127.0.0.1:8000/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      setSuccess(true);
      setForm({ name: "", email: "", message: "" });

      setTimeout(() => setSuccess(false), 3000);

    } catch {
      alert("Failed to send message");
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-[#020617] flex items-center justify-center px-4 overflow-hidden">

      {/* 🔥 GLOW */}
      <div className="absolute top-20 left-10 w-60 h-60 bg-green-500 opacity-10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-emerald-400 opacity-10 blur-3xl rounded-full"></div>

      {/* 🔥 SUCCESS TOAST */}
      {success && (
  <div className="fixed top-[100px] left-1/2 -translate-x-1/2 z-[9999] 
                  bg-[#0b1220] border border-green-400 text-green-400 
                  px-6 py-3 rounded-xl shadow-lg animate-slideDown">
    ✅ Message sent successfully!
  </div>
)}

      {/* 🔥 BOX */}
      <div className="w-full max-w-2xl bg-[#0b1220]/80 backdrop-blur-lg border border-gray-800 rounded-2xl shadow-2xl p-6 md:p-8">

        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME */}
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 rounded-lg bg-[#020617] border border-gray-700 text-white placeholder-gray-400 focus:border-green-400 focus:shadow-[0_0_10px_rgba(34,197,94,0.4)] outline-none transition"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1 animate-pulse">{errors.name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 rounded-lg bg-[#020617] border border-gray-700 text-white placeholder-gray-400 focus:border-green-400 focus:shadow-[0_0_10px_rgba(34,197,94,0.4)] outline-none transition"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1 animate-pulse">{errors.email}</p>
            )}
          </div>

          {/* MESSAGE */}
          <div>
            <textarea
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full p-3 rounded-lg bg-[#020617] border border-gray-700 text-white placeholder-gray-400 focus:border-green-400 focus:shadow-[0_0_10px_rgba(34,197,94,0.4)] outline-none transition"
              rows={4}
            />
            {errors.message && (
              <p className="text-red-400 text-xs mt-1 animate-pulse">{errors.message}</p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition shadow-lg hover:shadow-green-500/40 active:scale-95 flex items-center justify-center gap-2 font-semibold"
          >
            {success ? (
              "✔ Sent!"
            ) : loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              "Send Message 🚀"
            )}
          </button>

        </form>

      </div>

    </div>
  );
}