import Input from "../../components/ui/Input";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      await login({
        email: form.email,
        password: form.password,
      });

      // redirect setelah login sukses
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Email atau password salah"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSubmit}>
          <h1 className="font-black my-4 text-3xl text-center text-green-700">
            Login
          </h1>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded-lg">
              {error}
            </div>
          )}

          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Masukkan email"
            icon={UserIcon}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Masukkan password"
            icon={LockClosedIcon}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 mt-4"
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <section className="flex items-center gap-1 justify-center mt-4">
            <p className="m-0 text-sm">Belum punya akun?</p>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-green-700 font-semibold hover:underline text-sm"
            >
              Daftar disini
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}