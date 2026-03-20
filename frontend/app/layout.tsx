"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

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
      <body>

        {/* 🔥 Navbar conditionally */}
        {!hideNavbar && <Navbar />}

        {/* 🔥 Content spacing fix */}
        <div style={{ paddingTop: hideNavbar ? "0px" : "80px" }}>
          {children}
        </div>

      </body>
    </html>
  );
}