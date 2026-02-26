import api from "../api/api";

const authService = {
  login: async (payload) => {
    const res = await api.post("/auth/login", payload);
    return res.data;
  },

  register: async (payload) => {
    const res = await api.post("/auth/register", payload);
    return res.data;
  },

  signin: async (payload) => {
    const res = await api.post("/auth/signin", payload);
    return res.data;
  },

  logout: async () => {
    const res = await api.post("/auth/logout");
    return res.data;
  },

  refresh: async () => {
    const res = await api.post("/auth/refresh");
    return res.data;
  },
};

export default authService;