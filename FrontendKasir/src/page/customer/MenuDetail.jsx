import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMenus } from "../../hooks/useMenu";
import { useCart } from "../../hooks/useCart";
import LoadingMenuDetail from "../../components/loading/LoadingCustomerDetail";
import CartBar from "../../components/customer/KeranjangBar";
import Header from "../../components/customer/Header";

export default function MenuDetail() {
  const { slug } = useParams();
  const { getMenuBySlug, isLoadingDetail } = useMenus();
  const { addItem, cart } = useCart();

  const [menu, setMenu] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getMenuBySlug(slug);
        setMenu(data);
        setVariants(data.variants || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDetail();
  }, [slug, getMenuBySlug]);

  if (isLoadingDetail)
    return (
      <div>
        <LoadingMenuDetail />
      </div>
    );
  if (!menu) return <div className="p-4">Menu tidak ditemukan</div>;

  const handleAddToCart = async () => {
    if (menu.is_have_variant && !selectedVariant) {
      alert("Pilih varian dulu beb 😘");
      return;
    }

    try {
      await addItem(menu.id, selectedVariant?.id ?? null, qty);
      alert("Berhasil ditambahkan ke keranjang 🛒");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f0e4] flex justify-center">
      <div className="w-full max-w-md bg-white">
      <Header title={menu.menu_name} />
        {/* IMAGE */}
        <img
          src={menu.image}
          alt={menu.menu_name}
          className="w-full h-60 object-cover"
          onError={(e) => {
            e.target.onerror = null; // cegah infinite loop
            e.target.src = "/default.png";
          }}
        />

        <div className="p-4">
          <h1 className="text-xl font-bold">{menu.menu_name}</h1>

          <p className="text-green-600 font-semibold">
            Rp{" "}
            {(menu.price + (selectedVariant?.price || 0)).toLocaleString(
              "id-ID",
            )}
          </p>

          <p className="text-gray-600 text-sm mt-2">{menu.description}</p>

          {/* VARIANT */}
          {menu.is_have_variant && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Pilih Varian</h3>

              <div className="flex flex-col gap-2">
                {variants.map((v) => (
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
                      <span>{v.variant_name}</span>
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
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-2">
              <button onClick={() => qty > 1 && setQty(qty - 1)}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold"
            >
              Tambah ke Keranjang
            </button>
          </div>
        </div>
        {/* CART */}
        <CartBar cart={cart} />
      </div>
    </div>
  );
}
