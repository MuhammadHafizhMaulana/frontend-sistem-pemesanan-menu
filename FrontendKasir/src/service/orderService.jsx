import api from "../api/api";

function hanldeError(error) {
  if (error.response) {
    throw new Error(
      error.response.data?.message ||
        error.response.data?.message ||
        "Terjadi kesalahan di server",
    );
  }
  if (error.request) {
    throw new Error("Server tidak merespon. Periksa koneksi anda");
  }

  throw new Error("Terjadi kesalahan tidak diketahui");
}

const orderService = {
  async  getDetailOrder(orderCode){
    try {
      const res = await api.get(`customer/order-history/${orderCode}`);
      return res.data;
    } catch (error) {
      hanldeError(error);
    }
  },

  async getOrderList(){
    try {
      const res = await api.get("customer/order-history");
      return res.data;
    } catch (error) {
      hanldeError(error);
    }
  }
};

export default orderService;