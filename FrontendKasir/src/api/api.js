import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// inject X-Guest-ID otomatis
api.interceptors.request.use((config) => {
  const guestId = localStorage.getItem("guest_id");

  if (guestId) {
    config.headers["X-Guest-ID"] = guestId;
  }

  return config;
});

export default api;
