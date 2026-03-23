"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

// 🔥 FONT IMPORT
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 🔥 LOGIN & REGISTER PAGE वर navbar hide
  const hideNavbar = pathname === "/login" || pathname === "/register";

  return (
    <html lang="en">
      <body className={poppins.className}>

        {/* 🔥 Navbar */}
        {!hideNavbar && <Navbar />}

        {/* 🔥 MAIN CONTENT */}
        <main>
          {children}
        </main>

      </body>
    </html>
  );
}