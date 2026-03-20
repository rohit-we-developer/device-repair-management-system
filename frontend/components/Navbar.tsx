"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getToken, logout } from "@/lib/auth";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token);

    const savedEmail = localStorage.getItem("user_email");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="fixed w-full top-0 z-50 bg-black shadow-md">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* LOGO */}
        <h1 className="text-xl font-bold text-green-400">
          💻 LapCare Hub
        </h1>

        {/* LINKS */}
        <div className="flex items-center space-x-6 text-gray-300 text-sm font-medium">

          <Link href="/" className="hover:text-green-400 transition">
            Home
          </Link>

          <Link href="/services" className="hover:text-green-400 transition">
            Services
          </Link>

          {!isLoggedIn ? (
            <>
              <Link href="/login" className="hover:text-green-400 transition">
                Login
              </Link>

              <Link
                href="/register"
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/my-bookings"
                className="hover:text-green-400 transition"
              >
                My Bookings
              </Link>

              {/* PROFILE */}
              <div className="relative">
                <div
                  onClick={() => setOpen(!open)}
                  className="px-3 py-1 rounded-full bg-green-500 text-white text-sm cursor-pointer"
                >
                  {email || "User"}
                </div>

                {open && (
                  <div className="absolute right-0 mt-2 w-52 bg-white text-black rounded-lg shadow-lg py-2">

                    <p className="px-4 py-2 text-sm border-b">
                      {email}
                    </p>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>

                  </div>
                )}
              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
}