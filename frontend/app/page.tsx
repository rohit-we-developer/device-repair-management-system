import Image from "next/image";
// import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white">


      {/* 🔥 HERO SECTION */}
      <div className="grid md:grid-cols-2 items-center px-10 pt-32 max-w-7xl mx-auto">

        {/* LEFT CONTENT */}
        <div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Your Trusted Partner for <br />

            <span className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
              Laptop Repair & Services
            </span>

          </h1>

          <p className="text-gray-400 mb-8 text-lg">
            Fast repairs, expert technicians, and affordable pricing.
            Book your service in seconds and track everything online.
          </p>

          <div className="flex gap-4">

            <a
              href="/services"
              className="bg-green-500 px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300 shadow-lg hover:shadow-green-500/50"
            >
              Explore Services
            </a>

            <a
              href="/register"
              className="border border-green-500 px-6 py-3 rounded-lg text-green-400 hover:bg-green-500 hover:text-white transition duration-300"
            >
              Get Started
            </a>

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center mt-10 md:mt-0">

          <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-green-400 shadow-lg animate-pulse">

            <Image
              src="/hero.jpg"
              alt="Laptop repair"
              fill
              className="object-cover"
            />

          </div>

        </div>

      </div>

    </div>
  );
}