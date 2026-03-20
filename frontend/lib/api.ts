const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 🔥 REGISTER
export async function registerUser(data: any) {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

// 🔥 LOGIN
export async function loginUser(data: any) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

// 🔥 SERVICES (WITH TOKEN)
export async function getServices() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/services/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

// 🔥 BOOK SERVICE
export async function bookService(serviceId: string) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/booking/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      service_id: serviceId,
      address: "Default Address",
      problem_description: "General Issue"
    }),
  });

  return res.json();
}

// MY-booking-for-user
export async function getMyBookings() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/booking/my-bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}