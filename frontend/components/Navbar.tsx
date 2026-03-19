"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getToken, logout } from "@/lib/auth";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="fixed w-full top-0 z-50 bg-black/60 backdrop-blur-md border-b border-gray-800">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <h1 className="text-xl font-bold text-green-400">
          💻 LapCare Hub
        </h1>

        <div className="space-x-6 text-gray-300">

          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>

          {!isLoggedIn ? (
            <>
              <Link href="/login">Login</Link>
              <Link
                href="/register"
                className="bg-green-500 px-4 py-2 rounded text-white"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded text-white"
            >
              Logout
            </button>
          )}

        </div>

      </div>

    </div>
  );
}