import api from "../api/api";

function handleError(error) {
  // Error dari backend (Laravel)
  if (error.response) {
    const data = error.response.data;

    let message = data?.message || "Terjadi kesalahan di server.";

    // Kalau ada detail validation error
    if (data?.errors && typeof data.errors === "object") {
      const detailErrors = Object.values(data.errors).flat().join("\n");

      message = `${message}\n${detailErrors}`;
    }

    throw new Error(message);
  }

  // Request terkirim tapi tidak ada response
  if (error.request) {
    throw new Error("Server tidak merespon. Periksa koneksi anda.");
  }

  // Error lain (JS error, dll)
  throw new Error("Terjadi kesalahan tidak terduga.");
}

const cartService = {
  async getCart() {
    try {
      const res = await api.get("/customer/cart");
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  async add(payload) {
    try {
      const res = await api.post("/customer/cart/add", payload);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  async reduce(cart_item_id) {
    try {
      const res = await api.post("/customer/cart/reduce", {
        cart_item_id,
      });
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  async checkout(payload) {
    try {
      const res = await api.post("/customer/cart/checkout", payload);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
};

export default cartService;
