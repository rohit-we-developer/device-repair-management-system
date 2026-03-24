"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getToken, logout } from "@/lib/auth";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token);

    const savedEmail = localStorage.getItem("user_email");
    const savedRole = localStorage.getItem("role");

    if (savedEmail) setEmail(savedEmail);
    if (savedRole) setRole(savedRole);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const linkClass = (path: string) =>
    `transition ${
      pathname === path
        ? "text-green-400"
        : "text-gray-300 hover:text-green-400"
    }`;

  const getInitial = () => email?.charAt(0).toUpperCase();

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-lg border-b border-gray-800">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <h1 className="text-xl font-bold text-green-400 tracking-wide">
          💻 LapCare
        </h1>

        {/* MENU */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">

          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/services" className={linkClass("/services")}>Services</Link>

          {!isLoggedIn ? (
            <>
              <Link href="/login" className={linkClass("/login")}>Login</Link>

              <Link
                href="/register"
                className="bg-green-500 px-4 py-2 rounded-lg text-white hover:bg-green-600 transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              {role === "user" && (
                <Link href="/my-bookings" className={linkClass("/my-bookings")}>
                  My Bookings
                </Link>
              )}

              {role === "admin" && (
                <>
                  <Link href="/admin" className={linkClass("/admin")}>
                    Admin
                  </Link>
                  <Link href="/admin/add-service" className={linkClass("/admin/add-service")}>
                    Add Service
                  </Link>
                </>
              )}

              {/* 🔥 PROFILE */}
              <div className="relative">

                <div
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  {/* AVATAR */}
                  <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center font-bold text-sm">
                    {getInitial()}
                  </div>

                  {/* EMAIL SHORT */}
                  <span className="text-gray-300 text-sm max-w-[120px] truncate group-hover:text-green-400 transition">
                    {email}
                  </span>
                </div>

                {/* 🔥 DROPDOWN */}
                {open && (
                  <div className="absolute right-0 mt-3 w-56 bg-[#0b1220]/90 backdrop-blur-lg border border-gray-700 rounded-xl shadow-xl overflow-hidden animate-fadeIn">

                    <div className="px-4 py-3 border-b border-gray-700">
                      <p className="text-sm text-gray-400">Signed in as</p>
                      <p className="text-white text-sm truncate">{email}</p>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 transition"
                    >
                      🚪 Logout
                    </button>

                  </div>
                )}

              </div>
            </>
          )}
        </div>

        {/* MOBILE */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl"
        >
          ☰
        </button>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 bg-black/90 backdrop-blur-lg space-y-4 text-gray-300">

          <Link href="/" className="block">Home</Link>
          <Link href="/services" className="block">Services</Link>

          {!isLoggedIn ? (
            <>
              <Link href="/login" className="block">Login</Link>
              <Link href="/register" className="block text-green-400">Signup</Link>
            </>
          ) : (
            <>
              {role === "user" && (
                <Link href="/my-bookings" className="block">My Bookings</Link>
              )}

              {role === "admin" && (
                <>
                  <Link href="/admin" className="block">Admin</Link>
                  <Link href="/admin/add-service" className="block">Add Service</Link>
                </>
              )}

              <button
                onClick={handleLogout}
                className="block text-left w-full text-red-400"
              >
                Logout
              </button>
            </>
          )}

        </div>
      )}

    </nav>
  );
}