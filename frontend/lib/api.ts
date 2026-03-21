const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 🔥 COMMON REQUEST HANDLER (IMPORTANT)
async function apiRequest(url: string, options: any = {}) {
  const res = await fetch(`${BASE_URL}${url}`, options);

  const data = await res.json();

  // ❌ error असेल तर throw कर
  if (!res.ok) {
    console.error("API ERROR:", data);
    throw new Error(data.detail || "Something went wrong");
  }

  return data;
}

// 🔥 REGISTER
export function registerUser(data: any) {
  return apiRequest("/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

// 🔥 LOGIN
export function loginUser(data: any) {
  return apiRequest("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

// 🔥 SERVICES (WITH TOKEN)
export function getServices() {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No token found");

  return apiRequest("/services/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// 🔥 BOOK SERVICE (FIXED)
export function bookService(serviceId: string) {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No token found");

  return apiRequest("/booking/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      service_id: serviceId,
      address: "Default Address",
      problem_description: "General Issue",
    }),
  });
}

// 🔥 MY BOOKINGS
export function getMyBookings() {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No token found");

  return apiRequest("/booking/my-bookings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}