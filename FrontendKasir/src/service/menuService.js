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

const menuService = {
  async getMenusBasedOnCategory(){
    try {
      const res = await api.get("/customer/menu");
      return res.data;
    } catch (error){
      hanldeError(error);
    }
  },

  async getMenuBySlug(slug){
    try {
      const res = await api.get(`/customer/menu/${slug}`);
      return res.data;
    } catch (error) {
      hanldeError(error)
    }
  },

  async searchMenus(search){
    try {
      const res = await api.get(`/customer/menu/search`, {
        params: {search},
      });
      return res.data;
    } catch (error) {
      hanldeError(error);
    }
  }
};

export default menuService;
