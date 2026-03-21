"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const router = useRouter();

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = params.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/verify-email?token=${token}`
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.detail);
        }

        setStatus("success");
        setMessage("Email verified successfully 🎉");

        // 🔥 redirect after 3 sec
        setTimeout(() => {
          router.push("/login");
        }, 3000);

      } catch (err: any) {
        setStatus("error");
        setMessage(err.message || "Verification failed");
      }
    };

    verify();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef2f7] px-4">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">

        {status === "loading" && (
          <>
            <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold">Verifying...</h2>
          </>
        )}

        {status === "success" && (
          <>
            <h2 className="text-2xl font-bold text-green-600 mb-3">
              Success 🎉
            </h2>
            <p className="text-gray-600">{message}</p>
            <p className="text-sm text-gray-400 mt-3">
              Redirecting to login...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-2xl font-bold text-red-500 mb-3">
              Error ❌
            </h2>
            <p className="text-gray-600">{message}</p>

            <button
              onClick={() => router.push("/register")}
              className="mt-5 bg-yellow-400 px-5 py-2 rounded-lg font-semibold"
            >
              Try Again
            </button>
          </>
        )}

      </div>

    </div>
  );
}