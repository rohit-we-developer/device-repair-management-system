"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-[#020617] text-white">

      {/* 🔥 PREMIUM GLOW */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 opacity-10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-emerald-400 opacity-10 blur-3xl rounded-full"></div>

      {/* 🔥 HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-28 pb-16 grid md:grid-cols-2 gap-10 items-center">

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Your Trusted Partner for <br />

            <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
              Laptop Repair & Services
            </span>
          </h1>

          <p className="text-gray-400 text-lg mb-8">
            Fast repairs, expert technicians, and affordable pricing.
            Book your service in seconds and track everything online.
          </p>

          <div className="flex gap-4">

            <Link
              href="/services"
              className="bg-green-500 px-6 py-3 rounded-lg hover:bg-green-600 transition shadow-lg hover:shadow-green-500/50 active:scale-95"
            >
              Explore Services
            </Link>

            <Link
              href="/register"
              className="border border-green-500 px-6 py-3 rounded-lg text-green-400 hover:bg-green-500 hover:text-white transition active:scale-95"
            >
              Get Started
            </Link>

            {/* 🔥 CONTACT BUTTON (NEW) */}
            <Link
              href="/contact"
              className="border border-gray-600 px-6 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition active:scale-95"
            >
              Contact
            </Link>

          </div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-green-400 shadow-[0_0_80px_rgba(34,197,94,0.5)]">
            <Image
              src="/hero.jpg"
              alt="Laptop Repair"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

      </section>

      {/* 🔥 STATS */}
      <section className="bg-[#0b1220] border-t border-gray-800 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-6">

          <div className="hover:scale-105 transition">
            <h2 className="text-3xl font-bold text-green-400">500+</h2>
            <p className="text-gray-400">Repairs Done</p>
          </div>

          <div className="hover:scale-105 transition">
            <h2 className="text-3xl font-bold text-green-400">200+</h2>
            <p className="text-gray-400">Happy Clients</p>
          </div>

          <div className="hover:scale-105 transition">
            <h2 className="text-3xl font-bold text-green-400">4.8⭐</h2>
            <p className="text-gray-400">Rating</p>
          </div>

          <div className="hover:scale-105 transition">
            <h2 className="text-3xl font-bold text-green-400">3+ Years</h2>
            <p className="text-gray-400">Experience</p>
          </div>

        </div>
      </section>

      {/* 🔥 SERVICES */}
      <section className="py-16 max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-4">
          Our Services
        </h2>

        <p className="text-gray-400 text-center mb-12">
          Choose from our most popular repair services
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {["Screen Repair", "Battery Replacement", "General Service"].map((title, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-[#0b1220] p-6 rounded-xl border border-gray-800 hover:border-green-400 transition shadow-lg cursor-pointer"
            >
              <Link href="/services">
                <h3 className="text-xl font-semibold mb-2 hover:text-green-400">
                  {title}
                </h3>

                <p className="text-gray-400">
                  Professional and fast {title.toLowerCase()} service.
                </p>
              </Link>
            </motion.div>
          ))}

        </div>
      </section>

      {/* 🔥 CTA */}
      <section className="py-20 text-center border-t border-gray-800">

        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Ready to Fix Your Laptop?
        </h2>

        <p className="mb-6 text-lg text-gray-400">
          Book your service now and get it repaired by experts
        </p>

        <Link
          href="/services"
          className="bg-green-500 px-6 py-3 rounded-lg text-white hover:bg-green-600 transition shadow-lg hover:shadow-green-500/50 active:scale-95"
        >
          Book Now
        </Link>

      </section>

      {/* 🔥 FOOTER */}
      <section className="bg-[#020617] border-t border-gray-800 py-12">

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-gray-400">

          <div>
            <h2 className="text-xl font-bold text-green-400 mb-4">
              💻 LapCare
            </h2>
            <p>
              Fast and reliable laptop repair services at your doorstep.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-green-400">About Us</a></li>
              <li><a href="/terms" className="hover:text-green-400">Terms & Conditions</a></li>
              <li><a href="/privacy" className="hover:text-green-400">Privacy Policy</a></li>

              {/* 🔥 CONTACT LINK (NEW) */}
              <li>
                <Link href="/contact" className="hover:text-green-400">
                  Contact Us
                </Link>
              </li>

            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Services</h3>
            <ul className="space-y-2">
              <li>Screen Repair</li>
              <li>Battery Replacement</li>
              <li>Motherboard Repair</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <p>Email: rwagh0450@gmail.com</p>
            <p>Phone: +91 8626051621</p>
          </div>

        </div>

        <div className="text-center text-gray-500 mt-10 text-sm">
          © 2026 LapCare. All rights reserved.
        </div>

      </section>

    </div>
  );
}