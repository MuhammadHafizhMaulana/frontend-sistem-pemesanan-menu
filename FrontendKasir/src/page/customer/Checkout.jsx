import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import Header from "../../components/customer/Header";
import Input from "../../components/ui/Input";
import { useNavigate } from "react-router-dom";

import {
  UserIcon,
  PhoneIcon,
  PencilSquareIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export default function Checkout() {
  const { checkout, cart, loading } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    guest_name: "",
    phone_number: "",
    email: "",
    table_number: "",
    notes: "",
    payment_type: "Tunai",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      const confirmEmpty = window.confirm("Keranjang kosong. Kembali ke Home?");
      if (confirmEmpty) {
        navigate("/");
      }
      return;
    }

    try {
      const response = await checkout({
        guest_name: form.guest_name,
        phone_number: form.phone_number,
        email: form.email,
        table_number: form.table_number,
        payment_type: form.payment_type,
        notes: form.notes,
      });

      const orderData = response.data;

      if (form.payment_type === "Tunai") {
        navigate(`/waitingPayment/${orderData.order_code}`);
      } else {
        navigate(`/qris-payment/${orderData.order_code}`);
      }
    } catch (error) {
      const confirmFail = window.confirm(`${error.message}\nKembali ke Home?`);

      if (confirmFail) {
        navigate("/");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        <Header title="Checkout" />

        <div className="p-4">
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="space-y-4"
          >
            <Input
              label="Nama Pemesan"
              name="guest_name"
              value={form.guest_name}
              onChange={handleChange}
              placeholder="Nama"
              icon={UserIcon}
              required
            />

            <Input
              label="Nomor Ponsel"
              name="phone_number"
              value={form.phone_number}
              onChange={handleChange}
              placeholder="628xxxx"
              icon={PhoneIcon}
              required
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="email@gmail.com"
              icon={EnvelopeIcon}
              required
            />

            <Input
              label="Nomor Meja"
              name="table_number"
              value={form.table_number}
              onChange={handleChange}
              placeholder="1"
              icon={PencilSquareIcon}
            />

            {/* PAYMENT */}
            <div>
              <label className="text-sm font-medium">Metode Pembayaran</label>
              <select
                name="payment_type"
                value={form.payment_type}
                onChange={handleChange}
                className="w-full mt-1 rounded-xl p-2 border-2 border-gray-200"
              >
                <option value="Tunai">Tunai</option>
                <option value="Non-Tunai">Non-Tunai</option>
              </select>
            </div>

            <Input
              label="Catatan untuk dapur"
              name="notes"
              type="textarea"
              value={form.notes}
              onChange={handleChange}
              placeholder="Contoh: tidak pedas..."
              maxLength={150}
            />

            <button
              type="submit"
              disabled={loading || cart.length === 0}
              className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Memproses..." : "Checkout Sekarang"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
