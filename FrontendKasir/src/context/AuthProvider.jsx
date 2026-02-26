// src/context/AuthProvider.jsx
import { useEffect, useState } from "react";
import api from "../api/api";
import authService from "../service/authService";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );

  const [loading, setLoading] = useState(true);

  // 🔥 Inject Token ke Axios
  useEffect(() => {
    if (accessToken) {
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;

      localStorage.setItem("access_token", accessToken);
    } else {
      delete api.defaults.headers.common["Authorization"];
      localStorage.removeItem("access_token");
    }
  }, [accessToken]);

  // 🔥 Sync user ke localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // 🔥 LOGIN
  const login = async (credentials) => {
    const data = await authService.login(credentials);

    setAccessToken(data.access_token);
    setUser(data.user);
  };

  // 🔥 REGISTER
  const register = async (payload) => {
    return await authService.register(payload);
  };

  // 🔥 LOGOUT
  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  };

  // 🔥 AUTO REFRESH
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response?.status === 401 &&
          !error.config._retry
        ) {
          error.config._retry = true;

          try {
            const data = await authService.refresh();

            setAccessToken(data.access_token);

            error.config.headers[
              "Authorization"
            ] = `Bearer ${data.access_token}`;

            return api(error.config);
          } catch (err) {
            logout();
            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  // 🔥 INIT CHECK (hanya restore state)
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}