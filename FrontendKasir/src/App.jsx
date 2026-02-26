import { useEffect } from "react";
import AppRoutes from "./routes";
import AuthProvider from "./context/AuthProvider";

export default function App() {
  useEffect(() => {
    let guestId = localStorage.getItem("guest_id");

    if (!guestId) {
      // production better pakai uuid
      guestId = crypto.randomUUID();
      localStorage.setItem("guest_id", guestId);
    }
  }, []);

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}