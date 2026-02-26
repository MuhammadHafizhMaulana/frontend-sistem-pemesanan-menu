import Input from "../../components/ui/Input";
import {
  UserIcon,
  LockClosedIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    phone_number: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    let { name, value } = e.target;

    // 🔥 Khusus phone: hapus kalau user ketik 0 atau 62 di depan
    if (name === "phone_number") {
      value = value.replace(/^0+/, ""); // hapus 0 di depan
      value = value.replace(/^62/, ""); // hapus 62 kalau diketik lagi
      value = value.replace(/\D/g, ""); // hanya angka
    }

    setForm((prev) => ({
      ...prev,
      [name]: value || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.password_confirmation) {
      return setError("Password tidak cocok");
    }

    try {
      setLoading(true);

      await register({
        name: form.name,
        phone_number: `62${form.phone_number}`,
        email: form.email,
        password: form.password,
        password_confirmation: form.password_confirmation,
      });

      alert("Pendaftaran Berhasil");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mendaftar, coba lagi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSubmit}>
          <h1 className="font-black my-4 text-3xl text-center text-green-700">
            Register
          </h1>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded-lg">
              {error}
            </div>
          )}

          <Input
            label="Nama"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nama lengkap"
            icon={UserIcon}
            required
          />

          {/* 🔥 Custom Phone Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nomor HP</label>

            <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-green-600">
              <PhoneIcon className="w-5 h-5 text-gray-400 mr-2" />

              <span className="text-gray-500 mr-1">+62</span>

              <input
                type="text"
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                placeholder="81234567890"
                className="flex-1 outline-none"
                required
              />
            </div>
          </div>

          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            icon={EnvelopeIcon}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            icon={LockClosedIcon}
            required
          />

          <Input
            label="Konfirmasi Password"
            name="password_confirmation"
            type="password"
            value={form.password_confirmation}
            onChange={handleChange}
            placeholder="Ulangi password"
            icon={LockClosedIcon}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 mt-4"
          >
            {loading ? "Mendaftarkan..." : "Register"}
          </button>

          <section className="flex items-center gap-1 justify-center mt-4">
            <p className="m-0 text-sm">Sudah punya akun?</p>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-green-700 font-semibold hover:underline text-sm"
            >
              Login disini
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}
