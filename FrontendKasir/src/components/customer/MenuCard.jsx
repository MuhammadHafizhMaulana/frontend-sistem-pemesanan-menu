import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MenuCard({ menus, qty = 0, onAdd, onRemove }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const goToDetail = () => {
    navigate(`/menu/${menus.slug}`);
  };

  const handleAdd = async (e) => {
    e.stopPropagation();
    if (loading) return;

    // Kalau punya variant → selalu ke detail
    if (menus.is_have_variant) {
      goToDetail();
      return;
    }

    try {
      setLoading(true);
      await onAdd?.();
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (e) => {
    e.stopPropagation();
    if (loading) return;

    try {
      setLoading(true);
      await onRemove?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white rounded-2xl p-3 min-w-38 max-w-50 shrink-0 transition-all duration-200 hover:shadow-lg">
      {/* =============================== */}
      {/* 🔥 CONTROL AREA (TOP RIGHT) */}
      {/* =============================== */}
      <div className="absolute top-2 right-2 z-20">
        {menus.is_have_variant ? (
          // ===== MENU DENGAN VARIANT =====
          qty === 0 ? (
            // Belum ada di cart → tampilkan tombol +
            <button
              onClick={handleAdd}
              className="w-9 h-9 flex items-center justify-center 
                   bg-green-500 text-white rounded-full shadow
                   active:scale-95 transition"
            >
              +
            </button>
          ) : (
            // Sudah ada → tampilkan badge qty
            <div className="bg-green-500  text-white text-xs px-4 py-2 rounded-full font-semibold shadow">
              {qty}
            </div>
          )
        ) : qty === 0 ? (
          // ===== TANPA VARIANT & BELUM ADA =====
          <button
            onClick={handleAdd}
            disabled={loading}
            className="w-9 h-9 flex items-center justify-center 
                 bg-green-500 text-white rounded-full shadow
                 active:scale-95 transition disabled:opacity-50"
          >
            {loading ? "..." : "+"}
          </button>
        ) : (
          // ===== TANPA VARIANT & SUDAH ADA =====
          <div className="flex items-center bg-white rounded-full shadow px-2 py-1 gap-1">
            <button
              onClick={handleRemove}
              disabled={loading}
              className="w-8 h-8 flex items-center justify-center 
                   text-lg font-bold active:scale-95 transition"
            >
              −
            </button>

            <span className="min-w-6 text-center text-sm font-semibold">
              {loading ? "..." : qty}
            </span>

            <button
              onClick={handleAdd}
              disabled={loading}
              className="w-8 h-8 flex items-center justify-center 
                   text-lg font-bold active:scale-95 transition"
            >
              +
            </button>
          </div>
        )}
      </div>

      {/* =============================== */}
      {/* 🔥 CLICKABLE CONTENT ONLY */}
      {/* =============================== */}
      <div onClick={goToDetail} className="cursor-pointer">
        {/* IMAGE */}
        <img
          src={menus.image}
          alt={menus.menu_name}
          className="w-full h-32 object-cover rounded-xl mb-2"
          onError={(e) => {
            e.currentTarget.src = "/default.png";
          }}
        />

        {/* INFO */}
        <h3 className="text-sm font-semibold line-clamp-1">
          {menus.menu_name}
        </h3>

        <p className="text-green-600 font-bold">
          Rp {Number(menus.price || 0).toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}
