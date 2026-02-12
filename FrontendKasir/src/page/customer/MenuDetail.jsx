import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function MenuDetail() {
  const { state } = useLocation();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [qty, setQty] = useState(0);

  if (!state?.menu) return <div>Produk tidak ditemukan</div>;

  const menu = state.menu;
  

  const menuVariants = state.variants?.filter(
    (v) => v.menu_id === menu.id
    
  );
  

  const handleAdd = () => {
    if (menu.has_variant && !selectedVariant) {
      alert("Pilih varian dulu beb 😘");
      return;
    }
    setQty((q) => q + 1);
  };

  const handleRemove = () => {
    if (qty > 0) setQty((q) => q - 1);
  };

  return (
    <div className="min-h-screen bg-[#f4f0e4] flex justify-center">
      <div className="w-full max-w-md bg-white">

        {/* IMAGE */}
        <img
          src={menu.image}
          className="w-full h-60 object-cover"
        />

        <div className="p-4">
          <h1 className="text-xl font-bold">{menu.menu_name}</h1>

          <p className="text-green-600 font-semibold">
            Rp {(menu.price + (selectedVariant?.price || 0))
              .toLocaleString("id-ID")}
          </p>

          <p className="text-gray-600 text-sm mt-2">
            {menu.description}
          </p>

          {/* VARIANT */}
          {menu.has_variant && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Pilih Varian</h3>

              <div className="flex flex-col gap-2">
                {menuVariants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`border rounded-xl p-3 text-left
                      ${
                        selectedVariant?.id === v.id
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200"
                      }`}
                  >
                    <div className="flex justify-between">
                      <span>{v.name}</span>
                      {v.price > 0 && (
                        <span className="text-sm text-gray-500">
                          +Rp {v.price.toLocaleString("id-ID")}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ACTION BAR */}
        <div className="sticky bottom-0 bg-white border-t p-4">
          {qty === 0 ? (
            <button
              onClick={handleAdd}
              className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold"
            >
              + Tambah ke Keranjang
            </button>
          ) : (
            <div className="flex items-center justify-between bg-green-50 rounded-xl px-4 py-3">
              <button onClick={handleRemove}>−</button>
              <span>{qty}</span>
              <button onClick={handleAdd}>+</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
